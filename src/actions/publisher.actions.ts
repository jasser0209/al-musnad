"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import {
  publicWorksheetSelect,
  buildAudienceVisibilityFilter,
} from "@/services/worksheet.service";
import { WorksheetStatus } from "@prisma/client";

export async function toggleFollowPublisherAction(publisherId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لمتابعة الناشر");
  }

  if (user.id === publisherId) {
    throw new ValidationError("لا يمكنك متابعة حسابك الشخصي");
  }

  const publisher = await db.user.findUnique({
    where: { id: publisherId },
    select: { id: true, name: true, followersCount: true },
  });

  if (!publisher) {
    throw new NotFoundError("الناشر غير موجود");
  }

  const result = await db.$transaction(async (tx) => {
    const existing = await tx.publisherFollow.findUnique({
      where: {
        followerId_publisherId: {
          followerId: user.id,
          publisherId,
        },
      },
    });

    if (existing) {
      await tx.publisherFollow.delete({ where: { id: existing.id } });
      const nextCount = Math.max(0, (publisher.followersCount || 0) - 1);
      await tx.user.update({
        where: { id: publisherId },
        data: { followersCount: nextCount },
      });
      return { isFollowing: false, followersCount: nextCount };
    } else {
      await tx.publisherFollow.create({
        data: {
          followerId: user.id,
          publisherId,
        },
      });
      const nextCount = (publisher.followersCount || 0) + 1;
      await tx.user.update({
        where: { id: publisherId },
        data: { followersCount: nextCount },
      });

      const followerUser = await tx.user.findUnique({
        where: { id: user.id },
        select: { name: true },
      });

      await tx.notification.create({
        data: {
          userId: publisherId,
          title: "متابع جديد لحسابك في المسند",
          message: `بدأ (${followerUser?.name || "أحد الأعضاء"}) بمتابعة نشراتك التربوية.`,
          link: `/publisher/${user.id}`,
        },
      });

      return { isFollowing: true, followersCount: nextCount };
    }
  });

  revalidatePath(`/publisher/${publisherId}`);
  revalidatePath("/profile");
  return result;
}

export async function toggleFavoritePublisherAction(publisherId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لإضافة الناشر إلى المفضلة");
  }

  if (user.id === publisherId) {
    throw new ValidationError("لا يمكنك إضافة حسابك الشخصي إلى المفضلة");
  }

  const publisher = await db.user.findUnique({
    where: { id: publisherId },
    select: { id: true, favoritedByCount: true },
  });

  if (!publisher) {
    throw new NotFoundError("الناشر غير موجود");
  }

  const result = await db.$transaction(async (tx) => {
    const existing = await tx.favoritePublisher.findUnique({
      where: {
        userId_publisherId: {
          userId: user.id,
          publisherId,
        },
      },
    });

    if (existing) {
      await tx.favoritePublisher.delete({ where: { id: existing.id } });
      const nextCount = Math.max(0, (publisher.favoritedByCount || 0) - 1);
      await tx.user.update({
        where: { id: publisherId },
        data: { favoritedByCount: nextCount },
      });
      return { isFavoritedPublisher: false, favoritedByCount: nextCount };
    } else {
      await tx.favoritePublisher.create({
        data: {
          userId: user.id,
          publisherId,
        },
      });
      const nextCount = (publisher.favoritedByCount || 0) + 1;
      await tx.user.update({
        where: { id: publisherId },
        data: { favoritedByCount: nextCount },
      });
      return { isFavoritedPublisher: true, favoritedByCount: nextCount };
    }
  });

  revalidatePath(`/publisher/${publisherId}`);
  revalidatePath("/profile");
  return result;
}

export async function getPublicPublisherProfileData(publisherId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user: viewerAuth },
  } = await supabase.auth.getUser();

  // Rule 1: Strictly block unauthenticated access to publisher profiles and their publications
  if (!viewerAuth) {
    throw new UnauthorizedError(
      "يرجى تسجيل الدخول بحسابك لعرض ملف الناشر والنشرات المتاحة لفئة حسابك"
    );
  }

  const vUser = await db.user.findUnique({
    where: { id: viewerAuth.id },
    select: { id: true, role: true, isVerified: true },
  });

  if (!vUser) {
    throw new UnauthorizedError("يرجى تسجيل الدخول بحسابك");
  }

  const viewerRole = vUser.role;

  const publisher = await db.user.findUnique({
    where: { id: publisherId },
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      role: true,
      school: true,
      bio: true,
      followersCount: true,
      favoritedByCount: true,
      isVerified: true,
      isBanned: true,
      presenceStatus: true,
      lastSeenAt: true,
      banReason: true,
      createdAt: true,
    },
  });

  if (!publisher) {
    throw new NotFoundError("الناشر غير موجود");
  }

  // Rule 2: Viewer only sees publications that this publisher made available to viewerRole
  const audienceGuard =
    viewerAuth.id === publisherId
      ? {}
      : buildAudienceVisibilityFilter(viewerRole, viewerAuth.id, vUser.isVerified);

  const [worksheets, followRecord, favRecord] = await Promise.all([
    db.worksheet.findMany({
      where: {
        AND: [
          { uploadedBy: publisherId },
          { status: WorksheetStatus.PUBLISHED },
          audienceGuard,
        ],
      },
      select: publicWorksheetSelect,
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
    }),
    db.publisherFollow.findUnique({
      where: {
        followerId_publisherId: {
          followerId: viewerAuth.id,
          publisherId,
        },
      },
    }),
    db.favoritePublisher.findUnique({
      where: {
        userId_publisherId: {
          userId: viewerAuth.id,
          publisherId,
        },
      },
    }),
  ]);

  const totalDownloads = worksheets.reduce(
    (acc, w) => acc + (w.downloadCount || 0),
    0
  );
  const endorsedCount = worksheets.filter((w) => w.isEndorsed).length;

  return {
    publisher,
    worksheets,
    stats: {
      worksheetsCount: worksheets.length,
      endorsedCount,
      totalDownloads,
      followersCount: publisher.followersCount ?? 0,
      favoritedByCount: publisher.favoritedByCount ?? 0,
    },
    viewerState: {
      isOwnProfile: viewerAuth.id === publisherId,
      isFollowing: Boolean(followRecord),
      isFavoritedPublisher: Boolean(favRecord),
      viewerRole,
    },
  };
}

export async function getMyFavoritePublishersAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const records = await db.favoritePublisher.findMany({
    where: { userId: user.id },
    include: {
      publisher: {
        select: {
          id: true,
          name: true,
          role: true,
          school: true,
          bio: true,
          avatarUrl: true,
          followersCount: true,
          favoritedByCount: true,
          isVerified: true,
          isBanned: true,
          _count: { select: { worksheets: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return records.map((r) => r.publisher);
}