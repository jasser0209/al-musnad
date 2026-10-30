import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import { logPlatformActivity } from "@/services/audit.service";
import { sendWelcomeEmail } from "@/services/email.service";
import { Role } from "@prisma/client";

const PORTAL_NAMES_AR: Record<string, string> = {
  INSTITUTION: "فضاء المؤسسات التربوية",
  INSPECTOR: "فضاء المتفقد التربوي",
  TEACHER: "فضاء المعلم والأستاذ",
  STUDENT: "فضاء التلميذ والولي",
  MODERATOR: "لوحة المسؤول الإداري",
  ADMIN: "لوحة المشرف العام",
};

function resolveAllowedPublicRole(rawRoleInput?: string | null): Role {
  const clean = String(rawRoleInput || "TEACHER").trim().toUpperCase();
  if (clean === "INSTITUTION") return Role.INSTITUTION;
  if (clean === "INSPECTOR") return Role.INSPECTOR;
  if (clean === "STUDENT") return Role.STUDENT;
  return Role.TEACHER;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`login-guard:${ip}`, {
      maxRequests: 35,
      windowMs: 60_000,
    });

    if (!rl.allowed) {
      return Response.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT",
            message: "تم تجاوز الحد المسموح للطلبات. يرجى الانتظار دقيقة واحدة.",
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const action = String(body.action || "PRECHECK").toUpperCase();

    // REGISTER_SYNC: Immediately persists the exact selected account category in PostgreSQL upon signup
    if (action === "REGISTER_SYNC") {
      const userId = String(body.userId || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const name = String(body.name || "").trim();
      const rawUsername = String(body.username || "").trim().toLowerCase().replace(/[^a-z0-9_.]/g, "");
      const school = body.school ? String(body.school).trim() : null;
      const studentGrade = body.studentGrade ? String(body.studentGrade).trim() : null;
      const requestedRole = String(body.role || "TEACHER").trim().toUpperCase();

      if (!userId || !email) {
        return successResponse({ synced: false });
      }

      const assignedRole: Role =
        email === "bjasser123@gmail.com"
          ? Role.ADMIN
          : resolveAllowedPublicRole(requestedRole);

      const isInspectorPending = assignedRole === Role.INSPECTOR;
      const baseUname = rawUsername.length >= 3 ? rawUsername : email.split("@")[0].replace(/[^a-z0-9_.]/g, "") || "user";
      let finalUsername = baseUname;

      const existingUname = await db.user.findFirst({
        where: { username: { equals: finalUsername, mode: "insensitive" }, id: { not: userId } },
        select: { id: true },
      });
      if (existingUname) {
        finalUsername = `${baseUname}_${userId.replace(/-/g, "").slice(0, 4)}`;
      }

      const existingCheck = await db.user.findUnique({ where: { id: userId }, select: { id: true, role: true, isVerified: true, createdAt: true } });
      if (existingCheck && (existingCheck.isVerified || Date.now() - new Date(existingCheck.createdAt).getTime() > 45_000)) {
        return successResponse({ synced: true, role: existingCheck.role, isVerified: existingCheck.isVerified });
      }
      const syncedUser = await db.user.upsert({
        where: { id: userId },
        update: { email, name: name || email.split("@")[0], username: finalUsername, school, studentGrade, role: assignedRole, isVerified: assignedRole === Role.ADMIN, inspectorPending: isInspectorPending },
        create: { id: userId, email, name: name || email.split("@")[0], username: finalUsername, school, studentGrade, role: assignedRole, isVerified: assignedRole === Role.ADMIN, inspectorPending: isInspectorPending, presenceStatus: "ONLINE", lastSeenAt: new Date() },
      });

      const roleTitles: Record<string, string> = {
        TEACHER: "معلم",
        INSTITUTION: "مؤسسة تربوية",
        STUDENT: "تلميذ",
        INSPECTOR: "متفقد تربوي",
      };
      void sendWelcomeEmail(
        email,
        syncedUser.name,
        roleTitles[assignedRole] || assignedRole
      ).catch(() => null);

      return successResponse({
        synced: true,
        role: syncedUser.role,
        isVerified: syncedUser.isVerified,
      });
    }

    const rawIdentifier = String(body.identifier || "").trim().toLowerCase();
    const selectedRole = String(body.selectedRole || "").trim().toUpperCase();

    if (!rawIdentifier) {
      return successResponse({ exists: false });
    }

    const isUsername = !rawIdentifier.includes("@") || rawIdentifier.startsWith("@");
    const cleanUsername = rawIdentifier.replace(/^@/, "");

    const isProduction = process.env.NODE_ENV === "production";
    const isDemoAccount =
      rawIdentifier.endsWith("@musnad.tn") ||
      ["admin", "moderator", "inspector", "institution", "teacher", "student"].includes(cleanUsername);

    if (isProduction && isDemoAccount) {
      return successResponse({
        exists: false,
        resolvedEmail: isUsername ? null : rawIdentifier,
        isLocked: false,
        failedAttempts: 0,
        remainingAttempts: MAX_LOGIN_PASSWORD_ATTEMPTS,
        isDemoDisabled: true,
      });
    }

    let user = await db.user.findFirst({
      where: isUsername
        ? { username: { equals: cleanUsername, mode: "insensitive" } }
        : { email: { equals: rawIdentifier, mode: "insensitive" } },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        isVerified: true,
        inspectorPending: true,
        isBanned: true,
        banReason: true,
        failedLoginAttempts: true,
        lockedAt: true,
        lockReason: true,
      },
    });

    if (!user) {
      return successResponse({
        exists: false,
        resolvedEmail: isUsername ? null : rawIdentifier,
        isLocked: false,
        failedAttempts: 0,
        remainingAttempts: MAX_LOGIN_PASSWORD_ATTEMPTS,
      });
    }

    // Auto-heal accounts that were created as INSPECTOR but saved as TEACHER by legacy trigger
    if (!user.isVerified && user.role === Role.TEACHER && user.inspectorPending) {
      try {
        user = await db.user.update({
          where: { id: user.id },
          data: { role: Role.INSPECTOR },
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
            role: true,
            isVerified: true,
            inspectorPending: true,
            isBanned: true,
            banReason: true,
            failedLoginAttempts: true,
            lockedAt: true,
            lockReason: true,
          },
        });
      } catch {
        // ignore
      }
    }

    const currentFailed = user.failedLoginAttempts ?? 0;
    const isAccountLocked =
      Boolean(user.lockedAt) || currentFailed >= MAX_LOGIN_PASSWORD_ATTEMPTS;

    if (action === "PRECHECK") {
      // Check Portal-Specific Login Rule:
      // ADMIN and MODERATOR can log in from ANY portal.
      // INSTITUTION, INSPECTOR, TEACHER, and STUDENT can ONLY log in from their own portal.
      const isStaff =
        user.role === Role.ADMIN ||
        user.role === Role.MODERATOR ||
        user.email.toLowerCase() === "bjasser123@gmail.com";

      const isStandardPortal = ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(
        selectedRole
      );

      const portalMismatch =
        !isStaff && isStandardPortal && user.role !== selectedRole;

      const actualPortalName = PORTAL_NAMES_AR[user.role] || user.role;
      const selectedPortalName = PORTAL_NAMES_AR[selectedRole] || selectedRole;

      return successResponse({
        exists: true,
        resolvedEmail: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isLocked: isAccountLocked,
        isBanned: user.isBanned,
        portalMismatch,
        actualRole: user.role,
        portalMismatchMessage: portalMismatch
          ? `عذراً، هذا الحساب مسجل في «${actualPortalName}» ولا يمكنه تسجيل الدخول من «${selectedPortalName}». يجب على كل فئة تسجيل الدخول من الفضاء المخصص لها فقط.`
          : null,
        failedAttempts: currentFailed,
        remainingAttempts: Math.max(0, MAX_LOGIN_PASSWORD_ATTEMPTS - currentFailed),
        lockMessage: isAccountLocked
          ? "تم تعليق الدخول مؤقتاً لحماية الحساب. يرجى التواصل مع الدعم الفني لتفعيل الحساب."
          : user.isBanned
          ? `🚫 هذا الحساب موقوف حالياً من قِبل الإدارة (${user.banReason || "يرجى التواصل مع المسؤول أو المشرف العام"}).`
          : null,
      });
    }

    if (action === "FAILED_ATTEMPT") {
      const nextAttempts = Math.min(currentFailed + 1, MAX_LOGIN_PASSWORD_ATTEMPTS);
      const shouldLock = nextAttempts >= MAX_LOGIN_PASSWORD_ATTEMPTS;
      const remaining = Math.max(0, MAX_LOGIN_PASSWORD_ATTEMPTS - nextAttempts);

      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: nextAttempts,
          lockedAt: shouldLock ? new Date() : user.lockedAt,
          lockReason: shouldLock
            ? "قفل أمني تلقائي لتجاوز محاولات كلمة المرور"
            : user.lockReason,
          isBanned: shouldLock ? true : user.isBanned,
          banReason: shouldLock
            ? "🔒 حساب مقفل تلقائياً لحماية الحساب"
            : user.banReason,
        },
      });

      if (shouldLock && !isAccountLocked) {
        await logPlatformActivity({
          actorId: user.id,
          actorName: user.name,
          actorRole: user.role,
          action: "USER_ACCOUNT_LOCKED",
          targetType: "USER",
          targetId: user.id,
          details: `تم قفل الحساب (@${user.username || user.email}) تلقائياً لحماية الحساب`,
          ipAddress: ip,
        });

        const staff = await db.user.findMany({
          where: { role: { in: [Role.ADMIN, Role.MODERATOR] } },
          select: { id: true, role: true },
        });

        if (staff.length > 0) {
          await db.notification.createMany({
            data: staff.map((s) => ({
              userId: s.id,
              title: "🔒 قفل حساب عضو تلقائياً",
              message: `تم قفل حساب (${user.name} — ${user.email}) تلقائياً. يمكنك فك قفل الحساب من لوحة التحكم.`,
              link:
                s.role === Role.ADMIN
                  ? "/admin/dashboard?tab=teachers"
                  : "/moderator/dashboard?tab=publishers",
            })),
          });
        }
      }

      return successResponse({
        exists: true,
        isLocked: shouldLock,
        failedAttempts: nextAttempts,
        remainingAttempts: remaining,
        message: shouldLock
          ? "تم تعليق الدخول مؤقتاً لحماية الحساب. يرجى التواصل مع الدعم الفني لتفعيل الحساب."
          : "كلمة المرور المدخلة غير صحيحة، يرجى المحاولة مرة أخرى.",
      });
    }

    if (action === "RESET_SUCCESS") {
      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockedAt: null,
          lockReason: null,
          lastSeenAt: new Date(),
        },
      });
      return successResponse({ reset: true });
    }

    return successResponse({ exists: true, resolvedEmail: user.email });
  } catch (error) {
    return errorResponse(error);
  }
}