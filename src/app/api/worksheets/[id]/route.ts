import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { updateWorksheetSchema } from "@/lib/validators/worksheet";
import {
  getWorksheetById,
  updateWorksheet,
  archiveWorksheet,
  type UpdateWorksheetReplacementFile,
} from "@/services/worksheet.service";
import { uploadFile, uploadThumbnail } from "@/services/storage.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError(
        "لا يمكن الوصول إلى محتوى النشرة إلا بعد تسجيل الدخول بحسابك"
      );
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, role: true },
    });

    if (!dbUser) {
      throw new UnauthorizedError("الحساب غير موجود");
    }

    const worksheet = await getWorksheetById(id, dbUser.role, dbUser.id);
    return successResponse(worksheet);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const contentType = request.headers.get("content-type") || "";
    let validatedData: any = {};
    let replacementFile: UpdateWorksheetReplacementFile | undefined = undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const thumbnail = formData.get("thumbnail") as File | null;
      const pageCountRaw = formData.get("pageCount") as string | null;
      const metadataRaw = formData.get("metadata") as string | null;

      validatedData = updateWorksheetSchema.parse(
        metadataRaw ? JSON.parse(metadataRaw) : {}
      );

      if (file && file.size > 0) {
        const [uploadResult, thumbnailUrl] = await Promise.all([
          uploadFile(file, user.id),
          thumbnail
            ? uploadThumbnail(thumbnail, user.id).catch(() => undefined)
            : Promise.resolve(undefined),
        ]);

        const parsedPageCount = pageCountRaw ? Number(pageCountRaw) : undefined;
        replacementFile = {
          fileUrl: uploadResult.fileUrl,
          fileName: uploadResult.fileName,
          fileSize: uploadResult.fileSize,
          thumbnailUrl,
          pageCount:
            Number.isInteger(parsedPageCount) && parsedPageCount! > 0
              ? parsedPageCount
              : undefined,
        };
      }
    } else {
      const body = await request.json();
      validatedData = updateWorksheetSchema.parse(body);
    }

    const updated = await updateWorksheet(
      id,
      user.id,
      validatedData,
      dbUser?.role,
      replacementFile
    );

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await archiveWorksheet(id, user.id, dbUser?.role);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}