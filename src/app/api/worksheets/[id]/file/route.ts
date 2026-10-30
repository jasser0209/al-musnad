import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { canUserAccessWorksheet } from "@/services/worksheet.service";
import { getSignedDownloadUrl } from "@/services/storage.service";
import { errorResponse } from "@/lib/utils/api-response";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول لمعاينة أو تحميل هذا الملف");
    }

    const [dbUser, worksheet] = await Promise.all([
      db.user.findUnique({
        where: { id: user.id },
        select: { id: true, role: true },
      }),
      db.worksheet.findUnique({
        where: { id },
        select: {
          id: true,
          fileUrl: true,
          fileName: true,
          status: true,
          uploadedBy: true,
          audience: true,
          uploader: { select: { role: true } },
        },
      }),
    ]);

    if (!dbUser) {
      throw new UnauthorizedError("الحساب غير موجود");
    }

    if (!worksheet || worksheet.status === "ARCHIVED") {
      throw new NotFoundError("Worksheet");
    }

    if (
      worksheet.status === "DRAFT" &&
      worksheet.uploadedBy !== dbUser.id &&
      dbUser.role !== "ADMIN" &&
      dbUser.role !== "INSPECTOR"
    ) {
      throw new ForbiddenError(
        "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد."
      );
    }

    if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id)) {
      throw new ForbiddenError(
        "غير مصرح لحسابك بمعاينة أو تحميل هذه النشرة حسب قيود الجمهور."
      );
    }

    const signedUrl = await getSignedDownloadUrl(worksheet.fileUrl, 3600);
    return NextResponse.redirect(signedUrl, { status: 302 });
  } catch (error) {
    return errorResponse(error);
  }
}
