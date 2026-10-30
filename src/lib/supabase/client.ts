/**
 * Browser-Side Supabase Client — Al-Musnad (المسند) v14.0
 */

import { createBrowserClient } from "@supabase/ssr";
import { findDemoAccountByIdentifier } from "@/config/constants";

function getBrowserCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const regex = new RegExp("(?:^|;\\s*)" + name + "=([^;]+)");
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[1]) : null;
}

function buildBrowserSessionUser() {
  const demoVal = getBrowserCookie("musnad_demo_role");
  if (demoVal) {
    const acc = findDemoAccountByIdentifier(demoVal);
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

  const customVal = getBrowserCookie("musnad_custom_user");
  if (customVal) {
    try {
      const parsed = JSON.parse(decodeURIComponent(customVal));
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

export function isSupabaseConfiguredInBrowser(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return (
    Boolean(url) &&
    Boolean(key) &&
    !url.includes("placeholder.supabase.co") &&
    !url.includes("your-project-ref") &&
    key !== "placeholder-anon-key"
  );
}

export function createSupabaseBrowserClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const client = createBrowserClient(supabaseUrl, supabaseAnonKey);

  const origGetSession = client.auth.getSession.bind(client.auth);
  const origGetUser = client.auth.getUser.bind(client.auth);
  const origSignOut = client.auth.signOut.bind(client.auth);

  client.auth.getSession = (async () => {
    const localUser = buildBrowserSessionUser();
    if (localUser) {
      return {
        data: {
          session: {
            access_token: "local-access-token",
            refresh_token: "local-refresh-token",
            expires_in: 86400,
            token_type: "bearer",
            user: localUser as never,
          },
        },
        error: null,
      };
    }
    try {
      if (isSupabaseConfiguredInBrowser()) {
        return await origGetSession();
      }
    } catch {
      // ignore
    }
    return { data: { session: null }, error: null };
  }) as typeof origGetSession;

  client.auth.getUser = (async (...args: Parameters<typeof origGetUser>) => {
    const localUser = buildBrowserSessionUser();
    if (localUser) {
      return { data: { user: localUser as never }, error: null };
    }
    try {
      if (isSupabaseConfiguredInBrowser()) {
        return await origGetUser(...args);
      }
    } catch {
      // ignore
    }
    return { data: { user: null as never }, error: null };
  }) as typeof origGetUser;

  client.auth.signOut = (async (...args: Parameters<typeof origSignOut>) => {
    if (typeof document !== "undefined") {
      document.cookie = "musnad_demo_role=; path=/; max-age=0; SameSite=Lax";
      document.cookie = "musnad_custom_user=; path=/; max-age=0; SameSite=Lax";
      await fetch("/api/auth/demo-session", { method: "DELETE" }).catch(() => null);
    }
    try {
      if (isSupabaseConfiguredInBrowser()) {
        return await origSignOut(...args);
      }
    } catch {
      // ignore
    }
    return { error: null };
  }) as typeof origSignOut;

  return client;
}
