import { db } from "@/lib/db";
import { SIGNED_URL_EXPIRY_SECONDS } from "@/config/constants";
import { getSignedDownloadUrl } from "@/services/storage.service";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import {
  publicWorksheetSelect,
  canUserAccessWorksheet,
  buildAudienceVisibilityFilter,
} from "@/services/worksheet.service";

export interface DownloadUrlResult {
  downloadUrl: string;
  fileName: string;
  expiresIn: number;
}

export async function recordAndGetDownloadUrl(
  worksheetId: string,
  userId: string
): Promise<DownloadUrlResult> {
  if (!userId) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لتحميل النشرة");
  }

  const [dbUser, worksheet] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, isVerified: true },
    }),
    db.worksheet.findUnique({
      where: { id: worksheetId },
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

  if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, dbUser.isVerified)) {
    throw new ForbiddenError(
      "غير مصرح لحسابك بتحميل هذه النشرة حسب قيود الجمهور التي حددها الناشر."
    );
  }

  const now = new Date();
  await db.$transaction(async (tx) => {
    const existingDownload = await tx.download.findUnique({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
    });

    if (existingDownload) {
      await tx.download.update({
        where: {
          userId_worksheetId: {
            userId,
            worksheetId,
          },
        },
        data: {
          downloadedAt: now,
        },
      });
    } else {
      await tx.download.create({
        data: {
          userId,
          worksheetId,
          downloadedAt: now,
        },
      });

      await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          downloadCount: { increment: 1 },
        },
      });
    }
  });

  const downloadUrl = await getSignedDownloadUrl(
    worksheet.fileUrl,
    SIGNED_URL_EXPIRY_SECONDS
  );

  return {
    downloadUrl,
    fileName: worksheet.fileName,
    expiresIn: SIGNED_URL_EXPIRY_SECONDS,
  };
}

export async function getUserDownloads(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const dbUser = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, isVerified: true },
  });

  const audienceGuard = buildAudienceVisibilityFilter(dbUser?.role, userId, dbUser?.isVerified);

  const where = {
    userId,
    worksheet: audienceGuard,
  };

  const [total, downloads] = await Promise.all([
    db.download.count({ where }),
    db.download.findMany({
      where,
      select: {
        id: true,
        downloadedAt: true,
        worksheet: {
          select: publicWorksheetSelect,
        },
      },
      orderBy: { downloadedAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: downloads.map((record) => ({
      ...record.worksheet,
      downloadedAt: record.downloadedAt,
    })),
    meta: buildPaginationMeta(total, page, limit),
  };
}