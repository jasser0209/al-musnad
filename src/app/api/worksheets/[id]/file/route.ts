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

function inferMimeType(fileName: string): string {
  const lower = (fileName || "").toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".docx"))
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (lower.endsWith(".doc")) return "application/msword";
  return "application/octet-stream";
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
        select: { id: true, role: true, isVerified: true },
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
      !(dbUser.role === "INSPECTOR" && dbUser.isVerified)
    ) {
      throw new ForbiddenError(
        "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد."
      );
    }

    if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, dbUser.isVerified)) {
      if (canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, true) && !dbUser.isVerified) {
        throw new ForbiddenError('عذراً، هذا الملف حساس وموجه داخلياً لفئة حسابك الموثقين فقط. يرجى إثبات وتوثيق هويتك أولاً للوصول إليه.');
      }
      throw new ForbiddenError(
        "غير مصرح لحسابك بمعاينة أو تحميل هذه النشرة حسب قيود الجمهور."
      );
    }

    const signedUrl = await getSignedDownloadUrl(worksheet.fileUrl, 3600);
    const disposition =
      request.nextUrl.searchParams.get("disposition") === "attachment"
        ? "attachment"
        : "inline";
    const forceRedirect = request.nextUrl.searchParams.get("redirect") === "1";
    const shouldStream = !forceRedirect;

    if (shouldStream) {
      try {
        const upstream = await fetch(signedUrl);
        if (upstream.ok && upstream.body) {
          const contentType = inferMimeType(worksheet.fileName);
          const encodedName = encodeURIComponent(worksheet.fileName || "document.pdf");
          const headers: Record<string, string> = {
            "Content-Type": contentType,
            "Content-Disposition": `${disposition}; filename*=UTF-8''${encodedName}`,
            "Cache-Control": "private, max-age=1800",
          };
          const contentLength = upstream.headers.get("content-length");
          if (contentLength) {
            headers["Content-Length"] = contentLength;
          }
          return new NextResponse(upstream.body, {
            status: 200,
            headers,
          });
        }
      } catch (streamError) {
        console.warn("[FileRoute] Stream error on primary URL:", streamError);
      }
    }

    return NextResponse.redirect(signedUrl, { status: 302 });
  } catch (error) {
    return errorResponse(error);
  }
}
