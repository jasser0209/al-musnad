/**
 * Browser-Side Supabase Client
 *
 * Utilizes @supabase/ssr createBrowserClient for client components.
 * Session state is stored in browser cookies for synchronized SSR compatibility.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
