import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import { sendWelcomeEmail } from "@/services/email.service";

const VALID_PORTAL_ROLES = ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"] as const;

function resolveAllowedPublicRole(rawRoleInput?: string | null): Role {
  const clean = String(rawRoleInput || "TEACHER").trim().toUpperCase();
  if (clean === "INSTITUTION") return Role.INSTITUTION;
  if (clean === "INSPECTOR") return Role.INSPECTOR;
  if (clean === "STUDENT") return Role.STUDENT;
  return Role.TEACHER;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const requestedRoleParam = (searchParams.get("role") || "").trim().toUpperCase();

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const authUser = data.user;
      const metaRole = String(authUser.user_metadata?.role || "").trim().toUpperCase();
      const adminEmail = (process.env.ADMIN_EMAIL || "bjasser123@gmail.com").toLowerCase();
      const isPrimaryAdminEmail = authUser.email?.toLowerCase() === adminEmail;

      try {
        let existingUser = await db.user.findUnique({ where: { id: authUser.id } });
        if (!existingUser && authUser.email) {
          existingUser = await db.user.findUnique({ where: { email: authUser.email.toLowerCase() } });
        }

        if (existingUser) {
          if (isPrimaryAdminEmail && existingUser.role !== Role.ADMIN) {
            existingUser = await db.user.update({
              where: { id: existingUser.id },
              data: { role: Role.ADMIN, isVerified: true },
            });
          }

          const createdJustNow = Date.now() - new Date(existingUser.createdAt).getTime() < 25_000;
          if (
            !isPrimaryAdminEmail &&
            !existingUser.isVerified &&
            existingUser.role === Role.TEACHER &&
            createdJustNow &&
            !metaRole &&
            requestedRoleParam &&
            VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&
            requestedRoleParam !== "TEACHER"
          ) {
            const correctedRole = resolveAllowedPublicRole(requestedRoleParam);
            existingUser = await db.user.update({
              where: { id: existingUser.id },
              data: {
                role: correctedRole,
                inspectorPending: correctedRole === Role.INSPECTOR,
              },
            });
            await supabase.auth.updateUser({
              data: { role: correctedRole, inspector_pending: correctedRole === Role.INSPECTOR },
            }).catch(() => null);
          }

          const isLocked = Boolean(existingUser.lockedAt) || (existingUser.failedLoginAttempts ?? 0) >= MAX_LOGIN_PASSWORD_ATTEMPTS;
          if (isLocked || existingUser.isBanned) {
            await supabase.auth.signOut();
            return NextResponse.redirect(`${origin}/login?error=account-locked`);
          }

          // Strict Portal Isolation: Only ADMIN and MODERATOR can log in from any portal.
          const isStaff = existingUser.role === Role.ADMIN || existingUser.role === Role.MODERATOR || isPrimaryAdminEmail;
          if (
            !isStaff &&
            requestedRoleParam &&
            VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&
            existingUser.role !== requestedRoleParam
          ) {
            await supabase.auth.signOut();
            return NextResponse.redirect(
              `${origin}/login?role=${encodeURIComponent(requestedRoleParam)}&error=portal-mismatch&actualRole=${encodeURIComponent(existingUser.role)}`
            );
          }

          void db.user.update({
            where: { id: existingUser.id },
            data: {
              avatarUrl: existingUser.avatarUrl || (authUser.user_metadata?.avatar_url as string) || (authUser.user_metadata?.picture as string) || null,
              lastSeenAt: new Date(),
            },
          }).catch(() => null);

          const dest =
            existingUser.role === Role.ADMIN
              ? "/admin/dashboard"
              : existingUser.role === Role.MODERATOR
              ? "/moderator/dashboard"
              : existingUser.role === Role.INSPECTOR
              ? existingUser.isVerified
                ? "/inspector/dashboard"
                : "/#inspectors-hub"
              : existingUser.role === Role.INSTITUTION
              ? "/#institutions-hub"
              : existingUser.role === Role.TEACHER
              ? "/#teachers-hub"
              : next.startsWith("/")
              ? next
              : "/";

          return NextResponse.redirect(`${origin}${dest}`);
        } else if (authUser.email) {
          const rawRole = requestedRoleParam || metaRole || "TEACHER";
          const assignedRole: Role = isPrimaryAdminEmail ? Role.ADMIN : resolveAllowedPublicRole(rawRole);
          const isInspectorPending = Boolean(authUser.user_metadata?.inspector_pending) || assignedRole === Role.INSPECTOR;
          const baseUsername = authUser.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "");
          const safeUsername = `${baseUsername.length >= 3 ? baseUsername : "user"}_${authUser.id.slice(0, 4)}`;

          await db.user.create({
            data: {
              id: authUser.id,
              email: authUser.email.toLowerCase(),
              username: safeUsername,
              name: (authUser.user_metadata?.full_name as string) || (authUser.user_metadata?.name as string) || authUser.email.split("@")[0],
              avatarUrl: (authUser.user_metadata?.avatar_url as string) || (authUser.user_metadata?.picture as string) || null,
              role: assignedRole,
              isVerified: assignedRole === Role.ADMIN,
              inspectorPending: isInspectorPending,
              presenceStatus: "ONLINE",
              lastSeenAt: new Date(),
            },
          });

          void supabase.auth.updateUser({
            data: { role: assignedRole, inspector_pending: isInspectorPending },
          }).catch(() => null);

          const roleTitles: Record<string, string> = {
            TEACHER: "معلم",
            INSTITUTION: "مؤسسة تربوية",
            STUDENT: "تلميذ",
            INSPECTOR: "متفقد تربوي",
          };
          const userName = (authUser.user_metadata?.full_name as string) || (authUser.user_metadata?.name as string) || safeUsername;
          void sendWelcomeEmail(authUser.email, userName, roleTitles[assignedRole] || assignedRole).catch(() => null);

          const dest =
            assignedRole === Role.ADMIN
              ? "/admin/dashboard"
              : assignedRole === Role.INSPECTOR
              ? "/#inspectors-hub"
              : assignedRole === Role.INSTITUTION
              ? "/#institutions-hub"
              : assignedRole === Role.TEACHER
              ? "/#teachers-hub"
              : "/";

          return NextResponse.redirect(`${origin}${dest}`);
        }
      } catch (dbErr) {
        console.warn("[auth/callback] DB fallback warning:", dbErr);
        const fallbackRole = isPrimaryAdminEmail ? "ADMIN" : metaRole || "TEACHER";
        const isStaffFallback = fallbackRole === "ADMIN" || fallbackRole === "MODERATOR" || isPrimaryAdminEmail;
        if (
          !isStaffFallback &&
          requestedRoleParam &&
          VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&
          fallbackRole !== requestedRoleParam
        ) {
          await supabase.auth.signOut();
          return NextResponse.redirect(
            `${origin}/login?role=${encodeURIComponent(requestedRoleParam)}&error=portal-mismatch&actualRole=${encodeURIComponent(fallbackRole)}`
          );
        }
      }

      const safeNext = next.startsWith("/") ? next : "/";
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
