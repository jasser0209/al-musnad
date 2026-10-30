import { db } from "@/lib/db";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { canUserAccessWorksheet } from "@/services/worksheet.service";
import { Role, WorksheetStatus, Prisma } from "@prisma/client";
import type { UpsertReviewInput } from "@/lib/validators/review";

export const publicReviewSelect = {
  id: true,
  rating: true,
  comment: true,
  isOfficialDirective: true,
  isPrivateToPublisher: true,
  userId: true,
  worksheetId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      school: true,
      role: true,
      isVerified: true,
    },
  },
} as const;

export async function dispatchMentionNotifications(
  content: string,
  senderId: string,
  senderName: string,
  targetContext: string,
  link: string
) {
  if (!content) return;
  const matches = content.match(/@([a-zA-Z0-9_.]{2,32})/g);
  if (!matches || matches.length === 0) return;

  const usernames = Array.from(
    new Set(matches.map((m) => m.slice(1).toLowerCase()))
  );

  const users = await db.user.findMany({
    where: {
      username: { in: usernames, mode: "insensitive" },
      id: { not: senderId },
    },
    select: { id: true, username: true },
  });

  if (users.length === 0) return;

  const preview = content.length > 80 ? `${content.slice(0, 80)}...` : content;

  await db.notification.createMany({
    data: users.map((u) => ({
      userId: u.id,
      title: `🔔 تمت الإشارة إليك (@${u.username}) بواسطة ${senderName}`,
      message: `أشار إليك ${senderName} في ${targetContext}: "${preview}"`,
      link,
    })),
  });
}

export async function listWorksheetReviews(
  worksheetId: string,
  viewerRole?: string | null,
  viewerUserId?: string | null
) {
  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      status: true,
      uploadedBy: true,
      audience: true,
      uploader: { select: { role: true } },
    },
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  // Can view private comments only if creator, admin, moderator, or inspector
  const canSeePrivate =
    Boolean(viewerUserId && viewerUserId === worksheet.uploadedBy) ||
    viewerRole === Role.ADMIN ||
    viewerRole === Role.MODERATOR ||
    viewerRole === Role.INSPECTOR;

  const whereCondition: Prisma.ReviewWhereInput = {
    worksheetId,
    ...(canSeePrivate
      ? {}
      : {
          OR: [
            { isPrivateToPublisher: false },
            ...(viewerUserId ? [{ userId: viewerUserId }] : []),
          ],
        }),
  };

  return db.review.findMany({
    where: whereCondition,
    select: publicReviewSelect,
    orderBy: [
      { isOfficialDirective: "desc" },
      { createdAt: "desc" },
    ],
  });
}

export async function upsertWorksheetReview(
  worksheetId: string,
  userId: string,
  input: {
    rating?: number;
    comment: string;
    isOfficialDirective?: boolean;
    isPrivateToPublisher?: boolean;
  },
  userRole?: string
) {
  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      title: true,
      titleAr: true,
      status: true,
      uploadedBy: true,
      audience: true,
      uploader: { select: { role: true, name: true } },
    },
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  const actor = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, username: true, role: true, isVerified: true },
  });

  if (!canUserAccessWorksheet(worksheet, actor?.role || userRole, userId, actor?.isVerified)) {
    throw new ForbiddenError(
      "غير مصرح لك بإضافة تعليق على هذه النشرة قبل إثبات هوية حسابك أو وفق شروط الجمهور المحدد لها"
    );
  }

  const isVerifiedInspectorOrAdmin =
    userRole === Role.ADMIN ||
    (userRole === Role.INSPECTOR && Boolean(actor?.isVerified));

  const isOfficialDirective =
    isVerifiedInspectorOrAdmin &&
    (input.isOfficialDirective ?? !input.isPrivateToPublisher);

  const isPrivate = Boolean(input.isPrivateToPublisher);

  return db.$transaction(async (tx) => {
    const review = await tx.review.create({
      data: {
        userId,
        worksheetId,
        rating: Math.min(Math.max(input.rating ?? 5, 1), 5),
        comment: input.comment,
        isOfficialDirective,
        isPrivateToPublisher: isPrivate,
      },
      select: publicReviewSelect,
    });

    const stats = await tx.review.aggregate({
      where: { worksheetId, isPrivateToPublisher: false },
      _avg: { rating: true },
      _count: { id: true },
    });

    const ratingAvg = Number((stats._avg.rating ?? 0).toFixed(2));
    const reviewCount = stats._count.id;

    await tx.worksheet.update({
      where: { id: worksheetId },
      data: {
        ratingAvg,
        reviewCount,
      },
    });

    if (isPrivate && worksheet.uploadedBy !== userId) {
      await tx.notification.create({
        data: {
          userId: worksheet.uploadedBy,
          title: `🔒 تعليق خاص مباشر من ${actor?.name || "الإدارة الرقابية"}`,
          message: `أرسل لك تعليقاً خاصاً حول نشرتك "${
            worksheet.titleAr || worksheet.title
          }": "${input.comment.slice(0, 100)}"`,
          link: `/worksheet/${worksheetId}`,
        },
      });
    }

    if (actor) {
      await dispatchMentionNotifications(
        input.comment,
        userId,
        actor.name,
        `تعليق على نشرة "${worksheet.titleAr || worksheet.title}"`,
        `/worksheet/${worksheetId}`
      );
    }

    return {
      review,
      ratingAvg,
      reviewCount,
    };
  });
}

export async function deleteWorksheetReview(
  worksheetId: string,
  userId: string,
  userRole?: string,
  reviewId?: string | null
) {
  const whereClause: Prisma.ReviewWhereInput = reviewId
    ? { id: reviewId, worksheetId }
    : { userId, worksheetId };

  const existing = await db.review.findFirst({
    where: whereClause,
  });

  if (!existing) {
    throw new NotFoundError("Review");
  }

  if (
    existing.userId !== userId &&
    userRole !== Role.ADMIN &&
    userRole !== Role.MODERATOR
  ) {
    throw new ForbiddenError("لا يمكنك حذف هذا التعليق");
  }

  return db.$transaction(async (tx) => {
    await tx.review.delete({
      where: { id: existing.id },
    });

    const stats = await tx.review.aggregate({
      where: { worksheetId, isPrivateToPublisher: false },
      _avg: { rating: true },
      _count: { id: true },
    });

    const ratingAvg = Number((stats._avg.rating ?? 0).toFixed(2));
    const reviewCount = stats._count.id;

    await tx.worksheet.update({
      where: { id: worksheetId },
      data: {
        ratingAvg,
        reviewCount,
      },
    });

    return {
      deleted: true,
      ratingAvg,
      reviewCount,
    };
  });
}
