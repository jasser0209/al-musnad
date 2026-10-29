/**
 * GET /api/auth/callback — OAuth 2.0 (Google) & Email Confirmation Callback (Al-Musnad v11.0)
 *
 * Handles:
 * 1. "المتابعة باستخدام حساب جوجل" (Continue with Google) & "التسجيل باستخدام حساب جوجل" (Sign up with Google).
 * 2. Automatically creates or syncs the user profile in Prisma (`public.users`) with Google name,
 *    Google avatar (`avatar_url` / `picture`), unique `@username`, and selected role (`?role=...`).
 * 3. Enforces account lockout check (`failedLoginAttempts >= 6` or `lockedAt != null`).
 */

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const requestedRoleParam = (searchParams.get("role") || "").toUpperCase();

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const authUser = data.user;

      try {
        const existingUser = await db.user.findUnique({
          where: { id: authUser.id },
        });

        if (existingUser) {
          const isLocked =
            Boolean(existingUser.lockedAt) ||
            (existingUser.failedLoginAttempts ?? 0) >= MAX_LOGIN_PASSWORD_ATTEMPTS;

          if (isLocked) {
            await supabase.auth.signOut();
            return NextResponse.redirect(
              `${origin}/login?error=account-locked`
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
        } else if (authUser.email) {
          const rawRole =
            requestedRoleParam ||
            String(authUser.user_metadata?.role || "TEACHER").toUpperCase();

          // Prevent privilege escalation: only INSTITUTION, STUDENT, or TEACHER allowed on public signup
          const assignedRole: Role =
            rawRole === "INSTITUTION"
              ? Role.INSTITUTION
              : rawRole === "STUDENT"
              ? Role.STUDENT
              : Role.TEACHER;

          const isInspectorPending =
            Boolean(authUser.user_metadata?.inspector_pending) ||
            rawRole === "INSPECTOR";

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
              inspectorPending: isInspectorPending,
              presenceStatus: "ONLINE",
              lastSeenAt: new Date(),
            },
          });
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
