/**
 * Server-Side Supabase Clients — Al-Musnad (المسند) v14.0
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { findDemoAccountByIdentifier } from "@/config/constants";

function buildSessionUserFromCookies(demoCookie?: string, customCookie?: string) {
  if (demoCookie) {
    const acc = findDemoAccountByIdentifier(demoCookie);
    if (acc) {
      return {
        id: acc.id,
        aud: "authenticated",
        role: "authenticated",
        email: acc.email,
        email_confirmed_at: new Date().toISOString(),
        user_metadata: {
          name: acc.name,
          username: acc.username,
          role: acc.role,
          school: acc.school,
          avatar_url: null,
        },
        app_metadata: {
          provider: "email",
          role: acc.role,
        },
        created_at: new Date().toISOString(),
      };
    }
  }
  if (customCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(customCookie));
      if (parsed && parsed.email) {
        return {
          id: parsed.id || "00000000-0000-4000-8000-000000000099",
          aud: "authenticated",
          role: "authenticated",
          email: parsed.email,
          email_confirmed_at: new Date().toISOString(),
          user_metadata: {
            name: parsed.name,
            username: parsed.username,
            role: parsed.role,
            school: parsed.school,
            avatar_url: null,
          },
          app_metadata: {
            provider: "email",
            role: parsed.role,
          },
          created_at: new Date().toISOString(),
        };
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const demoRoleCookie = cookieStore.get("musnad_demo_role")?.value;
  const customUserCookie = cookieStore.get("musnad_custom_user")?.value;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const client = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as CookieOptions)
          );
        } catch {
          // Safely ignored in Server Components
        }
      },
    },
  });

  const cookieUser = buildSessionUserFromCookies(demoRoleCookie, customUserCookie);
  if (cookieUser) {
    const origGetUser = client.auth.getUser.bind(client.auth);
    const origGetSession = client.auth.getSession.bind(client.auth);

    client.auth.getUser = (async (...args: Parameters<typeof origGetUser>) => {
      try {
        if (!supabaseUrl.includes("placeholder.supabase.co")) {
          const real = await origGetUser(...args);
          if (real?.data?.user) return real;
        }
      } catch {
        // fallback to cookieUser
      }
      return {
        data: { user: cookieUser as never },
        error: null,
      };
    }) as typeof origGetUser;

    client.auth.getSession = (async () => {
      try {
        if (!supabaseUrl.includes("placeholder.supabase.co")) {
          const real = await origGetSession();
          if (real?.data?.session) return real;
        }
      } catch {
        // fallback to cookieUser
      }
      return {
        data: {
          session: {
            access_token: "local-access-token",
            refresh_token: "local-refresh-token",
            expires_in: 86400,
            token_type: "bearer",
            user: cookieUser as never,
          },
        },
        error: null,
      };
    }) as typeof origGetSession;
  }

  return client;
}

export function createSupabaseAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}
