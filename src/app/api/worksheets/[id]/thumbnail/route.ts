import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadThumbnail } from "@/services/storage.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError, NotFoundError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const worksheet = await db.worksheet.findUnique({
      where: { id },
      select: { id: true, thumbnailUrl: true, pageCount: true },
    });

    if (!worksheet) {
      throw new NotFoundError("Worksheet");
    }

    const formData = await request.formData();
    const thumbnailFile = formData.get("thumbnail") as File | null;
    const pageCountRaw = formData.get("pageCount") as string | null;

    if (!thumbnailFile) {
      return successResponse({ thumbnailUrl: worksheet.thumbnailUrl });
    }

    const thumbnailUrl = await uploadThumbnail(thumbnailFile, user.id);
    const parsedPages = pageCountRaw ? Number(pageCountRaw) : undefined;

    const updated = await db.worksheet.update({
      where: { id },
      data: {
        thumbnailUrl,
        ...(parsedPages && parsedPages > 0 && !worksheet.pageCount
          ? { pageCount: parsedPages }
          : {}),
      },
      select: {
        id: true,
        thumbnailUrl: true,
        pageCount: true,
      },
    });

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error);
  }
}