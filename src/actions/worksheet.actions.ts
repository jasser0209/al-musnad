"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { archiveWorksheet, updateWorksheet } from "@/services/worksheet.service";
import { updateWorksheetSchema, type UpdateWorksheetInput } from "@/lib/validators/worksheet";
import { UnauthorizedError } from "@/lib/utils/errors";
import { db } from "@/lib/db";

export async function updateWorksheetAction(id: string, input: UpdateWorksheetInput) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  const validated = updateWorksheetSchema.parse(input);
  const updated = await updateWorksheet(id, user.id, validated, dbUser?.role);

  revalidatePath(`/worksheet/${id}`);
  revalidatePath("/browse");
  revalidatePath("/profile");
  return updated;
}

export async function archiveWorksheetAction(id: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  const result = await archiveWorksheet(id, user.id, dbUser?.role);
  revalidatePath("/browse");
  revalidatePath("/profile");
  return result;
}