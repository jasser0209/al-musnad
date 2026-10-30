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
  const modeParam = (searchParams.get("mode") || "").trim().toLowerCase();

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const authUser = data.user;
      const metaRole = String(authUser.user_metadata?.role || "").trim().toUpperCase();

      try {
        let existingUser = await db.user.findUnique({
          where: { id: authUser.id },
        });

        // If trigger created user moments ago as TEACHER while role was INSPECTOR/INSTITUTION/STUDENT, fix immediately
        if (existingUser) {
          const intendedRole =
            metaRole && VALID_PORTAL_ROLES.includes(metaRole as any)
              ? resolveAllowedPublicRole(metaRole)
              : existingUser.inspectorPending && existingUser.role === Role.TEACHER
              ? Role.INSPECTOR
              : null;

          const createdRecently =
            Date.now() - new Date(existingUser.createdAt).getTime() < 60_000;

          if (
            !existingUser.isVerified &&
            existingUser.role === Role.TEACHER &&
            (intendedRole === Role.INSPECTOR ||
              (createdRecently &&
                requestedRoleParam &&
                VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&
                requestedRoleParam !== "TEACHER"))
          ) {
            const correctedRole =
              intendedRole && intendedRole !== Role.TEACHER
                ? intendedRole
                : resolveAllowedPublicRole(requestedRoleParam);

            existingUser = await db.user.update({
              where: { id: existingUser.id },
              data: {
                role: correctedRole,
                inspectorPending: correctedRole === Role.INSPECTOR,
              },
            });
          }
        }

        if (existingUser) {
          const isLocked =
            Boolean(existingUser.lockedAt) ||
            (existingUser.failedLoginAttempts ?? 0) >= MAX_LOGIN_PASSWORD_ATTEMPTS;

          if (isLocked || existingUser.isBanned) {
            await supabase.auth.signOut();
            return NextResponse.redirect(
              `${origin}/login?error=account-locked`
            );
          }

          // Strict Portal-Specific Login Check:
          // Only ADMIN and MODERATOR can log in from any portal.
          // INSTITUTION, INSPECTOR, TEACHER, and STUDENT must log in from their own portal.
          const isStaff =
            existingUser.role === Role.ADMIN ||
            existingUser.role === Role.MODERATOR ||
            existingUser.email.toLowerCase() === "bjasser123@gmail.com";

          if (
            !isStaff &&
            modeParam !== "register" &&
            requestedRoleParam &&
            VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&
            existingUser.role !== requestedRoleParam
          ) {
            await supabase.auth.signOut();
            return NextResponse.redirect(
              `${origin}/login?role=${encodeURIComponent(
                requestedRoleParam
              )}&error=portal-mismatch&actualRole=${encodeURIComponent(
                existingUser.role
              )}`
            );
          }

          await db.user.update({
            where: { id: existingUser.id },
            data: {
              avatarUrl:
                existingUser.avatarUrl ||
                (authUser.user_metadata?.avatar_url as string) ||
                (authUser.user_metadata?.picture as string) ||
                null,
              lastSeenAt: new Date(),
            },
          });

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
          const rawRole =
            requestedRoleParam ||
            metaRole ||
            "TEACHER";

          const assignedRole: Role =
            authUser.email.toLowerCase() === "bjasser123@gmail.com"
              ? Role.ADMIN
              : resolveAllowedPublicRole(rawRole);

          const isInspectorPending =
            Boolean(authUser.user_metadata?.inspector_pending) ||
            assignedRole === Role.INSPECTOR;

          const baseUsername = authUser.email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9_.]/g, "");
          const safeUsername = `${baseUsername.length >= 3 ? baseUsername : "user"}_${authUser.id.slice(0, 4)}`;

          await db.user.create({
            data: {
              id: authUser.id,
              email: authUser.email,
              username: safeUsername,
              name:
                (authUser.user_metadata?.full_name as string) ||
                (authUser.user_metadata?.name as string) ||
                authUser.email.split("@")[0],
              avatarUrl:
                (authUser.user_metadata?.avatar_url as string) ||
                (authUser.user_metadata?.picture as string) ||
                null,
              role: assignedRole,
              isVerified: assignedRole === Role.ADMIN,
              inspectorPending: isInspectorPending,
              presenceStatus: "ONLINE",
              lastSeenAt: new Date(),
            },
          });

          await supabase.auth
            .updateUser({
              data: {
                role: assignedRole,
                inspector_pending: isInspectorPending,
              },
            })
            .catch(() => null);

          const roleTitles: Record<string, string> = {
            TEACHER: "معلم",
            INSTITUTION: "مؤسسة تربوية",
            STUDENT: "تلميذ",
            INSPECTOR: "متفقد تربوي",
          };
          const userName =
            (authUser.user_metadata?.full_name as string) ||
            (authUser.user_metadata?.name as string) ||
            safeUsername;
          void sendWelcomeEmail(
            authUser.email,
            userName,
            roleTitles[assignedRole] || assignedRole
          ).catch(() => null);

          const dest =
            assignedRole === Role.INSPECTOR
              ? "/#inspectors-hub"
              : assignedRole === Role.INSTITUTION
              ? "/#institutions-hub"
              : assignedRole === Role.TEACHER
              ? "/#teachers-hub"
              : "/";

          return NextResponse.redirect(`${origin}${dest}`);
        }
      } catch {
        // Proceed even if DB sync encountered a transient issue
      }

      const safeNext = next.startsWith("/") ? next : "/";
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
