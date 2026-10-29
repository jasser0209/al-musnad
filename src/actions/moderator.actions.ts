"use server";

/**
 * Moderator Actions (المستوى الرقابي الثاني: المسؤول) — Al-Musnad v8.0
 *
 * Moderator Powers (`Role.MODERATOR` & `Role.ADMIN`):
 * 1. حذف المنشورات (`deleteWorksheetModeratorAction`) أو تغيير حالتها (`updateWorksheetStatusModeratorAction`)
 * 2. حظر المستخدمين (`toggleBanUserModeratorAction`) — لا يملك صلاحية حظر مشرف أو مسؤول
 * 3. إدارة قسم الدعم الفني (`replySupportTicketModeratorAction`) ومعالجة البلاغات (`resolveReportModeratorAction`)
 * 4. التواصل المباشر مع الناشر (`sendDirectMessageToPublisherAction`) مع دعم الإشارة `@username`
 *
 * ملاحظة صارمة: المسؤول (`MODERATOR`) لا يملك صلاحية تفعيل التوثيق (`isVerified`) ولا إنشاء الأكواد؛
 * فهذه ميزة حصرية للمشرف العام (`ADMIN`) في قمة الهرم.
 */

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteFile } from "@/services/storage.service";
import { dispatchMentionNotifications } from "@/services/review.service";
import { logPlatformActivity } from "@/services/audit.service";
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import {
  Role,
  WorksheetStatus,
  ReportStatus,
  SupportTicketStatus,
} from "@prisma/client";

async function requireModeratorOrAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
    },
  });

  if (
    !dbUser ||
    (dbUser.role !== Role.MODERATOR && dbUser.role !== Role.ADMIN)
  ) {
    throw new ForbiddenError(
      "غير مصرح لك بالدخول إلى لوحة تحكم المسؤولين"
    );
  }

  return dbUser;
}

export async function getModeratorDashboardData() {
  const moderator = await requireModeratorOrAdmin();

  const [
    totalWorksheets,
    publishedWorksheets,
    draftWorksheets,
    bannedUsersCount,
    pendingReportsCount,
    openTicketsCount,
    worksheets,
    publishers,
    reports,
    supportTickets,
  ] = await Promise.all([
    db.worksheet.count(),
    db.worksheet.count({ where: { status: WorksheetStatus.PUBLISHED } }),
    db.worksheet.count({ where: { status: WorksheetStatus.DRAFT } }),
    db.user.count({ where: { isBanned: true } }),
    db.report.count({ where: { status: ReportStatus.PENDING } }),
    db.supportTicket.count({ where: { status: SupportTicketStatus.OPEN } }),
    db.worksheet.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 80,
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
      orderBy: { createdAt: "desc" },
      take: 80,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        school: true,
        isVerified: true,
        isBanned: true,
        banReason: true,
        failedLoginAttempts: true,
        lockedAt: true,
        lockReason: true,
        presenceStatus: true,
        lastSeenAt: true,
        createdAt: true,
        _count: { select: { worksheets: true } },
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
  ]);

  return {
    moderator,
    stats: {
      totalWorksheets,
      publishedWorksheets,
      draftWorksheets,
      bannedUsersCount,
      pendingReportsCount,
      openTicketsCount,
    },
    worksheets,
    publishers,
    reports,
    supportTickets,
  };
}

export async function deleteWorksheetModeratorAction(worksheetId: string) {
  const actor = await requireModeratorOrAdmin();

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
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "WORKSHEET_DELETED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم حذف المنشور «${existing.title}» بواسطة المسؤول/المشرف (${actor.name})`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return { deleted: true, id: worksheetId };
}

export async function updateWorksheetStatusModeratorAction(
  worksheetId: string,
  status: WorksheetStatus
) {
  const actor = await requireModeratorOrAdmin();

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
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "WORKSHEET_STATUS_CHANGED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم تغيير حالة المنشور «${worksheet?.title || worksheetId}» إلى ${status} بواسطة المسؤول (${actor.name})`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return updated;
}

export async function toggleBanUserModeratorAction(
  targetUserId: string,
  reason?: string
) {
  const actor = await requireModeratorOrAdmin();

  if (actor.id === targetUserId) {
    throw new ForbiddenError("لا يمكنك حظر حسابك الشخصي");
  }

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, role: true, isBanned: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  if (target.role === Role.ADMIN || (target.role === Role.MODERATOR && actor.role !== Role.ADMIN)) {
    throw new ForbiddenError("لا يمكن للمسؤول حظر مشرف عام أو مسؤول آخر");
  }

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
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: nextBanned ? "USER_BANNED" : "USER_UNBANNED",
    targetType: "USER",
    targetId: targetUserId,
    details: nextBanned
      ? `تم حظر المستخدم (@${target.username || target.name}) بواسطة (${actor.name}). السبب: ${reason || "مخالفة الشروط"}`
      : `تم رفع الحظر عن المستخدم (@${target.username || target.name}) بواسطة (${actor.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: nextBanned ? "🚫 إشعار حظر الحساب" : "تم رفع الحظر عن حسابك",
      message: nextBanned
        ? `تم حظر حسابك من قِبل الإدارة (${actor.name}). السبب: ${
            reason || "مخالفة شروط المنصة"
          }.`
        : "تم رفع الحظر عن حسابك، يمكنك الآن معاودة النشر والمشاركة على منصة المسند.",
      link: "/support",
    },
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

export async function replySupportTicketModeratorAction(
  ticketId: string,
  replyText: string,
  status: "ANSWERED" | "CLOSED" = "ANSWERED"
) {
  const actor = await requireModeratorOrAdmin();

  if (!replyText.trim()) {
    throw new ValidationError("يرجى كتابة نص الرد على التذكرة");
  }

  const ticket = await db.supportTicket.update({
    where: { id: ticketId },
    data: {
      adminReply: replyText.trim(),
      status:
        status === "CLOSED"
          ? SupportTicketStatus.CLOSED
          : SupportTicketStatus.ANSWERED,
    },
  });

  if (ticket.userId) {
    await db.notification.create({
      data: {
        userId: ticket.userId,
        title: `رد من الدعم الفني على تذكرتك: ${ticket.subject}`,
        message: replyText.trim(),
        link: "/support",
      },
    });
  }

  await dispatchMentionNotifications(
    replyText.trim(),
    actor.id,
    actor.name,
    ticket.subject,
    "/support"
  );

  revalidatePath("/support");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return ticket;
}

export async function resolveReportModeratorAction(
  reportId: string,
  status: "RESOLVED" | "DISMISSED"
) {
  await requireModeratorOrAdmin();

  const updated = await db.report.update({
    where: { id: reportId },
    data: {
      status:
        status === "RESOLVED" ? ReportStatus.RESOLVED : ReportStatus.DISMISSED,
    },
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return updated;
}

/**
 * التواصل المباشر مع الناشر (متاح للمسؤول، المشرف، والمتفقد)
 * يرسل رسالة مباشرة إلى إشعارات الناشر ويدعم الإشارة `@username`
 */
export async function sendDirectMessageToPublisherAction(input: {
  targetUserId: string;
  subject: string;
  message: string;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const sender = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, username: true, role: true },
  });

  if (
    !sender ||
    (sender.role !== Role.MODERATOR &&
      sender.role !== Role.ADMIN &&
      sender.role !== Role.INSPECTOR)
  ) {
    throw new ForbiddenError("صلاحية المراسلة الرقابية المباشرة مخصصة للمشرف والمسؤول والمتفقد");
  }

  if (!input.message.trim()) {
    throw new ValidationError("يرجى كتابة نص الرسالة الموجهة للناشر");
  }

  const targetUser = await db.user.findUnique({
    where: { id: input.targetUserId },
    select: { id: true, name: true, username: true },
  });

  if (!targetUser) throw new NotFoundError("الناشر غير موجود");

  const roleBadgeAr =
    sender.role === Role.ADMIN
      ? "المشرف العام"
      : sender.role === Role.MODERATOR
      ? "المسؤول الإداري"
      : "المتفقد التربوي";

  const notification = await db.notification.create({
    data: {
      userId: targetUser.id,
      title: `✉️ رسالة مباشرة من ${roleBadgeAr} (${sender.name}): ${
        input.subject.trim() || "توجيه إداري / بيداغوجي"
      }`,
      message: input.message.trim(),
      link: `/publisher/${sender.id}`,
    },
  });

  await dispatchMentionNotifications(
    input.message.trim(),
    sender.id,
    sender.name,
    input.subject.trim() || "رسالة مباشرة",
    `/publisher/${targetUser.id}`
  );

  await logPlatformActivity({
    actorId: sender.id,
    actorName: sender.name,
    actorRole: sender.role,
    action: "DIRECT_MESSAGE_SENT",
    targetType: "USER",
    targetId: targetUser.id,
    details: `رسالة مباشرة إلى (@${targetUser.username || targetUser.name}): ${input.subject.trim()}`,
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  revalidatePath("/inspector/dashboard");
  return notification;
}
/**
 * فك غلق الحساب المقفل بسبب تجاوز 6 محاولات خاطئة لكلمة المرور (متاح للمسؤول الإداري وللمشرف العام)
 */
export async function unlockUserAccountModeratorAction(targetUserId: string) {
  const actor = await requireModeratorOrAdmin();

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, role: true },
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
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "USER_ACCOUNT_UNLOCKED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم فك قفل الحساب وإعادة تصفير محاولات كلمة المرور للمستخدم (@${target.username || target.name}) بواسطة (${actor.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "🔓 تم فك قفل حسابك بنجاح",
      message: `قامت إدارة المنصة (${actor.name}) بفك قفل حسابك وإعادة تفعيل تسجيل الدخول.`,
      link: "/profile",
    },
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return updated;
}
