import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import {
  worksheetFilterSchema,
  createWorksheetSchema,
} from "@/lib/validators/worksheet";
import { listWorksheets, createWorksheet } from "@/services/worksheet.service";
import { uploadFile, uploadThumbnail } from "@/services/storage.service";
import { logPlatformActivity } from "@/services/audit.service";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    let viewerRole: string | null = null;
    let viewerUserId: string | null = null;

    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        viewerUserId = user.id;
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        viewerRole = dbUser?.role || null;
      }
    } catch {
      // Guest caller
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const filters = worksheetFilterSchema.parse(searchParams);
    const result = await listWorksheets(filters, viewerRole, viewerUserId);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    const ip = getClientIp(request);
    const limit = checkRateLimit(`${user.id}:${ip}`, {
      keyPrefix: "upload_worksheet",
      maxRequests: 12,
      windowMs: 10 * 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          message: `لقد تجاوزت الحد المسموح لرفع الملفات، يرجى الانتظار ${limit.retryAfterSeconds} ثانية.`,
          code: "RATE_LIMITED",
          statusCode: 429,
        },
        429
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const thumbnail = formData.get("thumbnail") as File | null;
    const pageCountRaw = formData.get("pageCount") as string | null;
    const metadataRaw = formData.get("metadata") as string | null;

    if (!file) {
      return errorResponse(
        { message: "File is required", code: "MISSING_FILE", statusCode: 400 },
        400
      );
    }

    const metadata = createWorksheetSchema.parse(
      metadataRaw ? JSON.parse(metadataRaw) : {}
    );

    const [uploadResult, thumbnailUrl] = await Promise.all([
      uploadFile(file, user.id),
      thumbnail
        ? uploadThumbnail(thumbnail, user.id).catch(() => undefined)
        : Promise.resolve(undefined),
    ]);

    const parsedPageCount = pageCountRaw ? Number(pageCountRaw) : undefined;

    const worksheet = await createWorksheet({
      ...metadata,
      uploadedBy: user.id,
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
      fileSize: uploadResult.fileSize,
      mimeType: file.type,
      thumbnailUrl,
      pageCount:
        Number.isInteger(parsedPageCount) && parsedPageCount! > 0
          ? parsedPageCount
          : undefined,
    });

    await logPlatformActivity({
      actorId: user.id,
      actorName: worksheet.uploader?.name || user.email || "ناشر",
      actorRole: worksheet.uploader?.role || "TEACHER",
      action: "WORKSHEET_UPLOADED",
      targetType: "WORKSHEET",
      targetId: worksheet.id,
      details: `تم رفع منشور جديد بعنوان «${worksheet.titleAr || worksheet.title}» (${worksheet.status})`,
      ipAddress: ip,
    });

    return successResponse(worksheet, undefined, 201);
  } catch (error) {
    return errorResponse(error);
  }
}