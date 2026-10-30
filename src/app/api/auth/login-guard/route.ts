import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import { logPlatformActivity } from "@/services/audit.service";
import { sendWelcomeEmail } from "@/services/email.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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

    // REGISTER_SYNC: Persists selected account category upon signup with strict security validation
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

      // 1. Session & Identity Verification
      let authedUser: { id: string; email?: string } | null = null;
      try {
        const supabase = await createSupabaseServerClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        authedUser = user;
      } catch {
        // Session might not be set yet if email confirmation is required
      }

      if (authedUser && authedUser.id !== userId) {
        return Response.json(
          {
            success: false,
            error: {
              code: "FORBIDDEN",
              message: "غير مصرح بتعديل بيانات مستخدم آخر",
            },
          },
          { status: 403 }
        );
      }

      // 2. Prevent tampering with existing verified or mature accounts
      const existingDbUser = await db.user.findUnique({
        where: { id: userId },
      });

      if (existingDbUser) {
        const isMatureAccount =
          Date.now() - new Date(existingDbUser.createdAt).getTime() > 60_000;
        if (existingDbUser.isVerified || isMatureAccount) {
          // Account already established; strictly prevent altering role or verified status
          return successResponse({
            synced: true,
            role: existingDbUser.role,
            isVerified: existingDbUser.isVerified,
          });
        }
      }

      const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      const isConfiguredAdmin = Boolean(
        configuredAdminEmail && email === configuredAdminEmail
      );

      const assignedRole: Role = isConfiguredAdmin
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

      const syncedUser = await db.user.upsert({
        where: { id: userId },
        update: {
          email,
          name: name || email.split("@")[0],
          username: finalUsername,
          school,
          studentGrade,
          role: assignedRole,
          isVerified: isConfiguredAdmin,
          inspectorPending: isInspectorPending,
        },
        create: {
          id: userId,
          email,
          name: name || email.split("@")[0],
          username: finalUsername,
          school,
          studentGrade,
          role: assignedRole,
          isVerified: isConfiguredAdmin,
          inspectorPending: isInspectorPending,
          presenceStatus: "ONLINE",
          lastSeenAt: new Date(),
        },
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
      const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      const isStaff =
        user.role === Role.ADMIN ||
        user.role === Role.MODERATOR ||
        Boolean(configuredAdminEmail && user.email.toLowerCase() === configuredAdminEmail);

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
      // Prevent denial-of-service lockout on primary system administrator accounts
      const isAdminAccount = user.role === Role.ADMIN;
      const nextAttempts = Math.min(currentFailed + 1, MAX_LOGIN_PASSWORD_ATTEMPTS);
      const shouldLock = !isAdminAccount && nextAttempts >= MAX_LOGIN_PASSWORD_ATTEMPTS;
      const remaining = isAdminAccount
        ? MAX_LOGIN_PASSWORD_ATTEMPTS
        : Math.max(0, MAX_LOGIN_PASSWORD_ATTEMPTS - nextAttempts);

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
      let authedUser: { id: string } | null = null;
      try {
        const supabase = await createSupabaseServerClient();
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        authedUser = currentUser;
      } catch {
        // ignore
      }

      // Strictly enforce that the user calling RESET_SUCCESS is authenticated as the target user
      if (!authedUser || authedUser.id !== user.id) {
        return Response.json(
          {
            success: false,
            error: {
              code: "UNAUTHORIZED",
              message: "غير مصرح بتصفير محاولات تسجيل الدخول دون جلسة مصادقة نشطة",
            },
          },
          { status: 401 }
        );
      }

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