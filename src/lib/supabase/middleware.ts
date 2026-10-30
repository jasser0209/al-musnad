/**
 * Supabase Auth Middleware Helper — Al-Musnad (المسند) v6.0
 *
 * Rules:
 * - Unauthenticated guests CAN visit `/` and `/browse` (to browse Grade Levels,
 *   Subjects, Sub-divisions, and see the titles of `audience === "ALL"` files)
 *   and `/support` (located at the bottom of the page).
 * - Unauthenticated guests CANNOT enter `/worksheet/*` (reading/downloading files),
 *   `/publisher/*`, `/upload`, `/profile`, `/admin/*`, or `/inspector/*`.
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { findDemoAccountByIdentifier } from "@/config/constants";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: CookieOptions }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const demoRoleCookie = request.cookies.get("musnad_demo_role")?.value;
  const customUserCookie = request.cookies.get("musnad_custom_user")?.value;
  const demoAccount = demoRoleCookie ? findDemoAccountByIdentifier(demoRoleCookie) : undefined;

  let user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null = null;
  if (demoAccount) {
    user = {
      id: demoAccount.id,
      email: demoAccount.email,
      user_metadata: {
        name: demoAccount.name,
        username: demoAccount.username,
        role: demoAccount.role,
      },
    };
  } else if (customUserCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(customUserCookie));
      if (parsed && parsed.email) {
        user = {
          id: parsed.id || "00000000-0000-4000-8000-000000000099",
          email: parsed.email,
          user_metadata: {
            name: parsed.name,
            username: parsed.username,
            role: parsed.role,
          },
        };
      }
    } catch {
      user = null;
    }
  } else if (!supabaseUrl.includes("placeholder.supabase.co")) {
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      user = null;
    }
  }

  // Strictly block unauthenticated visitors from opening/reading files (/worksheet/*)
  // or accessing member-only spaces
  const protectedPaths = [
    "/worksheet",
    "/publisher",
    "/upload",
    "/profile",
    "/admin",
    "/moderator",
    "/inspector",
  ];

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set(
      "redirectTo",
      `${pathname}${request.nextUrl.search || ""}`
    );
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}