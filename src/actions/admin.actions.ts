"use server";

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteFile } from "@/services/storage.service";
import { logPlatformActivity } from "@/services/audit.service";
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import { Role, WorksheetStatus, ProfileEditStatus, Prisma } from "@prisma/client";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true, name: true, username: true, email: true },
  });

  if (!dbUser || dbUser.role !== Role.ADMIN) {
    throw new ForbiddenError("هذه الصلاحية مقتصرة حصرياً على المشرف العام في قمة الهرم");
  }

  return dbUser;
}

export async function getAdminDashboardData() {
  const admin = await requireAdmin();

  const [
    totalWorksheets,
    publishedWorksheets,
    draftWorksheets,
    archivedWorksheets,
    endorsedWorksheets,
    totalUsers,
    verifiedUsersCount,
    unusedCodesCount,
    pendingProfileEditsCount,
    pendingReportsCount,
    openTicketsCount,
    totalAuditLogsCount,
    totalDownloadsAgg,
    worksheets,
    teachers,
    pendingProfileUsers,
    reports,
    supportTickets,
    verificationCodes,
    auditLogs,
  ] = await Promise.all([
    db.worksheet.count(),
    db.worksheet.count({ where: { status: WorksheetStatus.PUBLISHED } }),
    db.worksheet.count({ where: { status: WorksheetStatus.DRAFT } }),
    db.worksheet.count({ where: { status: WorksheetStatus.ARCHIVED } }),
    db.worksheet.count({ where: { isEndorsed: true } }),
    db.user.count(),
    db.user.count({ where: { isVerified: true } }),
    db.verificationCode.count({ where: { isUsed: false } }),
    db.user.count({ where: { profileEditStatus: ProfileEditStatus.PENDING } }),
    db.report.count({ where: { status: "PENDING" } }),
    db.supportTicket.count({ where: { status: "OPEN" } }),
    db.auditLog.count(),
    db.worksheet.aggregate({ _sum: { downloadCount: true } }),
    db.worksheet.findMany({
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
      take: 100,
      include: {
        grade: { select: { id: true, nameAr: true } },
        subject: { select: { id: true, nameAr: true, color: true } },
        category: { select: { id: true, nameAr: true } },
        uploader: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            school: true,
            role: true,
            isVerified: true,
            isBanned: true,
          },
        },
      },
    }),
    db.user.findMany({
      orderBy: [{ inspectorPending: "desc" }, { createdAt: "desc" }],
      take: 100,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        school: true,
        subscriptionPlan: true,
        isVerified: true,
        inspectorPending: true,
        inspectorCode: true,
        profileEditStatus: true,
        isBanned: true,
        banReason: true,
        failedLoginAttempts: true,
        lockedAt: true,
        lockReason: true,
        presenceStatus: true,
        lastSeenAt: true,
        createdAt: true,
        _count: {
          select: { worksheets: true, downloads: true },
        },
      },
    }),
    db.user.findMany({
      where: { profileEditStatus: ProfileEditStatus.PENDING },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        school: true,
        bio: true,
        avatarUrl: true,
        pendingProfileData: true,
        updatedAt: true,
      },
    }),
    db.report.findMany({
      orderBy: [{ isInspectorPriority: "desc" }, { createdAt: "desc" }],
      take: 60,
      include: {
        reporter: {
          select: { id: true, name: true, username: true, email: true, role: true },
        },
        targetWorksheet: {
          select: { id: true, title: true, titleAr: true },
        },
        targetUser: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
            isBanned: true,
          },
        },
      },
    }),
    db.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      take: 60,
    }),
    db.verificationCode.findMany({
      orderBy: { createdAt: "desc" },
      take: 80,
      include: {
        createdBy: { select: { id: true, name: true, username: true } },
        usedBy: { select: { id: true, name: true, username: true, email: true, role: true } },
      },
    }),
    db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  return {
    admin,
    stats: {
      totalWorksheets,
      publishedWorksheets,
      draftWorksheets,
      archivedWorksheets,
      endorsedWorksheets,
      totalUsers,
      verifiedUsersCount,
      unusedCodesCount,
      pendingProfileEditsCount,
      pendingReportsCount,
      openTicketsCount,
      totalAuditLogsCount,
      totalDownloads: totalDownloadsAgg._sum.downloadCount ?? 0,
    },
    worksheets,
    teachers,
    pendingProfileUsers,
    reports,
    supportTickets,
    verificationCodes,
    auditLogs,
  };
}

export async function getAuditLogsAdminAction(action?: string, limit = 100) {
  await requireAdmin();
  const where = action && action !== "ALL" ? { action } : {};
  return db.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * ميزة حصرية للمشرف العام (`ADMIN`) في قمة الهرم:
 * تفعيل أو إلغاء التوثيق المباشر (`isVerified`) لأي حساب في الموقع بضغطة زر
 */
export async function toggleVerifyUserAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, isVerified: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const nextVerified = !target.isVerified;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      isVerified: nextVerified,
      inspectorPending: false,
    },
    select: { id: true, isVerified: true },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: nextVerified ? "USER_VERIFIED" : "USER_UNVERIFIED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم ${nextVerified ? "تفعيل" : "إلغاء"} شارة التوثيق الرسمية للحساب (@${target.username || target.name}) بواسطة المشرف العام`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: nextVerified
        ? "🎖️ تم تفعيل شارة التوثيق الرسمية على حسابك"
        : "إشعار بشأن شارة التوثيق",
      message: nextVerified
        ? "قام المشرف العام بتفعيل شارة التوثيق الرسمية لحسابك على منصة المسند."
        : "تم إيقاف شارة التوثيق على حسابك من قِبل المشرف العام.",
      link: "/profile?tab=verification",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

/**
 * ميزة حصرية للمشرف العام (`ADMIN`):
 * إنشاء وتوليد أكواد التوثيق في الداشبورد للمشرف (سواء عامة قابلة للتوزيع أو مخصصة لمستخدم)
 */
export async function createVerificationCodeAdminAction(input: {
  targetRole: Role;
  note?: string;
  count?: number;
}) {
  const admin = await requireAdmin();
  const count = Math.min(Math.max(input.count || 1, 1), 10);

  const prefix =
    input.targetRole === Role.INSPECTOR
      ? "INSP"
      : input.targetRole === Role.INSTITUTION
      ? "INST"
      : "VERF";

  const createdCodes = [];

  for (let i = 0; i < count; i++) {
    const part1 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const part2 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const code = `${prefix}-${part1}-${part2}`;

    const record = await db.verificationCode.create({
      data: {
        code,
        targetRole: input.targetRole,
        note: input.note?.trim() || null,
        createdById: admin.id,
      },
      include: {
        createdBy: { select: { id: true, name: true, username: true } },
        usedBy: { select: { id: true, name: true, username: true, email: true, role: true } },
      },
    });

    await logPlatformActivity({
      actorId: admin.id,
      actorName: admin.name,
      actorRole: admin.role,
      action: "VERIFICATION_CODE_CREATED",
      targetType: "VERIFICATION_CODE",
      targetId: record.id,
      details: `تم إنشاء كود توثيق للرتبة ${input.targetRole}: ${code}${input.note ? ` (${input.note})` : ""}`,
    });

    createdCodes.push(record);
  }

  revalidatePath("/admin/dashboard");
  return createdCodes;
}

export async function deleteVerificationCodeAdminAction(codeId: string) {
  const admin = await requireAdmin();

  const targetCode = await db.verificationCode.findUnique({
    where: { id: codeId },
  });

  await db.verificationCode.delete({
    where: { id: codeId },
  });

  if (targetCode) {
    await logPlatformActivity({
      actorId: admin.id,
      actorName: admin.name,
      actorRole: admin.role,
      action: "VERIFICATION_CODE_DELETED",
      targetType: "VERIFICATION_CODE",
      targetId: codeId,
      details: `تم حذف كود التوثيق ${targetCode.code}`,
    });
  }

  revalidatePath("/admin/dashboard");
  return { deleted: true, id: codeId };
}

export async function updateWorksheetStatusAdminAction(
  worksheetId: string,
  status: WorksheetStatus
) {
  const admin = await requireAdmin();

  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, title: true },
  });

  const updated = await db.worksheet.update({
    where: { id: worksheetId },
    data: { status },
    select: { id: true, status: true },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "WORKSHEET_STATUS_CHANGED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم تغيير حالة المنشور «${worksheet?.title || worksheetId}» إلى ${status}`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath(`/worksheet/${worksheetId}`);
  revalidatePath("/admin/dashboard");
  return updated;
}

export async function deleteWorksheetAdminAction(worksheetId: string) {
  const admin = await requireAdmin();

  const existing = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, title: true, fileUrl: true },
  });

  if (!existing) {
    throw new NotFoundError("النشرة غير موجودة");
  }

  await db.worksheet.delete({
    where: { id: worksheetId },
  });

  if (existing.fileUrl) {
    await deleteFile(existing.fileUrl).catch(() => null);
  }

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "WORKSHEET_DELETED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم حذف المنشور «${existing.title}» نهائياً بواسطة المشرف العام`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath("/admin/dashboard");
  return { deleted: true, id: worksheetId };
}

export async function updateUserRoleAdminAction(
  targetUserId: string,
  newRole: Role
) {
  const admin = await requireAdmin();

  if (admin.id === targetUserId && newRole !== Role.ADMIN) {
    throw new ForbiddenError("لا يمكنك إزالة صلاحية المشرف عن حسابك الحالي");
  }

  const isVerifiedAuto =
    newRole === Role.INSPECTOR ||
    newRole === Role.MODERATOR ||
    newRole === Role.ADMIN;

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, role: true },
  });

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      role: newRole,
      isVerified: isVerifiedAuto ? true : undefined,
      inspectorPending: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "USER_ROLE_CHANGED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم تغيير رتبة المستخدم (@${targetUser?.username || targetUser?.name || targetUserId}) من ${targetUser?.role || "مجهول"} إلى ${newRole}`,
  });

  revalidatePath("/admin/dashboard");
  return updated;
}

export async function toggleBanUserAdminAction(
  targetUserId: string,
  reason?: string
) {
  const admin = await requireAdmin();

  if (admin.id === targetUserId) {
    throw new ForbiddenError("لا يمكنك حظر حساب المشرف الخاص بك");
  }

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, isBanned: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const nextBanned = !target.isBanned;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      isBanned: nextBanned,
      banReason: nextBanned
        ? reason || "مخالفة شروط النشر والضوابط التربوية لمنصة المسند"
        : null,
    },
    select: { id: true, isBanned: true, banReason: true },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: nextBanned ? "USER_BANNED" : "USER_UNBANNED",
    targetType: "USER",
    targetId: targetUserId,
    details: nextBanned
      ? `تم حظر المستخدم (@${target.username || target.name}). السبب: ${reason || "مخالفة الشروط"}`
      : `تم رفع الحظر عن المستخدم (@${target.username || target.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: nextBanned ? "🚫 إشعار حظر الحساب" : "تم رفع الحظر عن حسابك",
      message: nextBanned
        ? `تم حظر حسابك من قِبل الإدارة. السبب: ${
            reason || "مخالفة شروط النشر والضوابط التربوية"
          }.`
        : "تم رفع الحظر عن حسابك، يمكنك الآن معاودة النشر والمشاركة على منصة المسند.",
      link: "/support",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

export async function approveProfileEditAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: {
      id: true,
      name: true,
      username: true,
      school: true,
      bio: true,
      avatarUrl: true,
      pendingProfileData: true,
    },
  });

  if (!targetUser || !targetUser.pendingProfileData) {
    throw new NotFoundError("لا يوجد طلب تعديل معلق لهذا المستخدم");
  }

  const pending = targetUser.pendingProfileData as {
    name?: string;
    username?: string;
    school?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
  };

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      name: pending.name || targetUser.name,
      username: pending.username || targetUser.username,
      school: pending.school !== undefined ? pending.school : targetUser.school,
      bio: pending.bio !== undefined ? pending.bio : targetUser.bio,
      avatarUrl:
        pending.avatarUrl !== undefined
          ? pending.avatarUrl
          : targetUser.avatarUrl,
      profileEditStatus: ProfileEditStatus.APPROVED,
      pendingProfileData: Prisma.DbNull,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "PROFILE_APPROVED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تمت الموافقة على تعديل الملف الشخصي للمستخدم (@${targetUser.username || targetUser.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "تمت الموافقة على تعديل ملفك الشخصي",
      message:
        "قام المشرف العام بمراجعة واعتماد التعديلات الخاصة بملفك الشخصي على منصة المسند.",
      link: "/profile",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/profile");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

export async function rejectProfileEditAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true },
  });

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      profileEditStatus: ProfileEditStatus.REJECTED,
      pendingProfileData: Prisma.DbNull,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "PROFILE_REJECTED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم رفض تعديل الملف الشخصي للمستخدم (@${targetUser?.username || targetUser?.name || targetUserId})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "إشعار بشأن طلب تعديل الملف الشخصي",
      message:
        "لم تتم الموافقة على التعديلات المقترحة لملفك الشخصي. يرجى التأكد من صحة البيانات والمحاولة مجدداً.",
      link: "/profile?tab=edit",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/profile");
  return updated;
}

/**
 * فك غلق الحساب المقفل بسبب تجاوز 6 محاولات خاطئة لكلمة المرور (متاح للمشرف العام)
 */
export async function unlockUserAccountAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, email: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      failedLoginAttempts: 0,
      lockedAt: null,
      lockReason: null,
      isBanned: false,
      banReason: null,
    },
    select: {
      id: true,
      failedLoginAttempts: true,
      lockedAt: true,
      isBanned: true,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "USER_ACCOUNT_UNLOCKED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم فك قفل الحساب وإعادة تصفير محاولات كلمة المرور للمستخدم (@${target.username || target.name}) بواسطة المشرف العام (${admin.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "🔓 تم فك قفل حسابك بنجاح",
      message:
        "قام المشرف العام بفك قفل حسابك وإعادة تفعيل إمكانية تسجيل الدخول. يمكنك الآن استخدام حسابك بشكل طبيعي.",
      link: "/profile",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/moderator/dashboard");
  return updated;
}