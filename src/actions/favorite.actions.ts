"use server";

/**
 * Favorite Server Actions
 *
 * Atomically toggles bookmark states and triggers Next.js path cache revalidation.
 */

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { toggleFavorite } from "@/services/favorite.service";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function toggleFavoriteAction(worksheetId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("You must be logged in to favorite worksheets");
  }

  const result = await toggleFavorite(worksheetId, user.id);

  // Invalidate caches
  revalidatePath(`/worksheet/${worksheetId}`);
  revalidatePath("/profile");
  revalidatePath("/browse");

  return { success: true, data: result };
}