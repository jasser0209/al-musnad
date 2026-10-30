import { db } from "@/lib/db";
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

export interface ToggleFavoriteResult {
  isFavorited: boolean;
  favoriteCount: number;
}

export async function toggleFavorite(
  worksheetId: string,
  userId: string
): Promise<ToggleFavoriteResult> {
  if (!userId) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لإضافة النشرة للمفضلة");
  }

  const [dbUser, worksheet] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    }),
    db.worksheet.findUnique({
      where: { id: worksheetId },
      select: {
        id: true,
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

  if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id)) {
    throw new ForbiddenError(
      "غير مصرح لحسابك بالتفاعل مع هذه النشرة حسب قيود الجمهور التي حددها الناشر."
    );
  }

  return db.$transaction(async (tx) => {
    const existing = await tx.favorite.findUnique({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
    });

    if (existing) {
      await tx.favorite.delete({
        where: { id: existing.id },
      });

      const current = await tx.worksheet.findUnique({
        where: { id: worksheetId },
        select: { favoriteCount: true },
      });

      const currentCount = current?.favoriteCount ?? 0;
      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: currentCount > 0 ? { decrement: 1 } : 0,
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: false,
        favoriteCount: updated.favoriteCount,
      };
    } else {
      await tx.favorite.create({
        data: {
          userId,
          worksheetId,
        },
      });

      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: { increment: 1 },
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: true,
        favoriteCount: updated.favoriteCount,
      };
    }
  });
}

export async function getUserFavorites(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const dbUser = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  const audienceGuard = buildAudienceVisibilityFilter(dbUser?.role, userId);

  const where = {
    userId,
    worksheet: audienceGuard,
  };

  const [total, favorites] = await Promise.all([
    db.favorite.count({ where }),
    db.favorite.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        worksheet: {
          select: publicWorksheetSelect,
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: favorites.map((f) => f.worksheet),
    meta: buildPaginationMeta(total, page, limit),
  };
}