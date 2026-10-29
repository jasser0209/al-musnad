"use server";

/**
 * Reports (التبليغات) & Technical Support / Customer Service (الدعم الفني وخدمة العملاء) — Al-Musnad v4.0
 */

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UnauthorizedError,
  ValidationError,
  ForbiddenError,
} from "@/lib/utils/errors";
import {
  ReportTargetType,
  ReportStatus,
  SupportTicketStatus,
  Role,
} from "@prisma/client";
import { sendSupportReplyNotification } from "@/services/email.service";

export interface SubmitReportInput {
  targetType: "WORKSHEET" | "USER";
  targetWorksheetId?: string;
  targetUserId?: string;
  reason: string;
  details?: string;
}

export async function submitReportAction(input: SubmitReportInput) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لإرسال البلاغ");
  }

  if (!input.reason.trim()) {
    throw new ValidationError("يرجى تحديد سبب البلاغ");
  }

  const report = await db.report.create({
    data: {
      reporterId: user.id,
      targetType:
        input.targetType === "WORKSHEET"
          ? ReportTargetType.WORKSHEET
          : ReportTargetType.USER,
      targetWorksheetId: input.targetWorksheetId || null,
      targetUserId: input.targetUserId || null,
      reason: input.reason.trim(),
      details: input.details?.trim() || null,
    },
  });

  revalidatePath("/admin/dashboard");
  return { success: true, id: report.id };
}

export interface SubmitSupportTicketInput {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export async function submitSupportTicketAction(
  input: SubmitSupportTicketInput
) {
  if (!input.name.trim() || !input.email.trim() || !input.subject.trim() || !input.message.trim()) {
    throw new ValidationError("يرجى ملء جميع حقول التذكرة");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ticket = await db.supportTicket.create({
    data: {
      userId: user?.id || null,
      name: input.name.trim(),
      email: input.email.trim(),
      category: input.category || "TECHNICAL",
      subject: input.subject.trim(),
      message: input.message.trim(),
    },
  });

  revalidatePath("/support");
  revalidatePath("/admin/dashboard");
  return ticket;
}

export async function getMySupportTicketsAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  return db.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateReportStatusAdminAction(
  reportId: string,
  status: "RESOLVED" | "DISMISSED"
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();
  const admin = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  if (admin?.role !== Role.ADMIN && admin?.role !== Role.MODERATOR) throw new ForbiddenError();

  const existingReport = await db.report.findUnique({
    where: { id: reportId },
    select: { id: true, isInspectorPriority: true },
  });

  if (existingReport?.isInspectorPriority && admin.role !== Role.ADMIN) {
    throw new ForbiddenError(
      "البلاغات الرقابية العاجلة المرفوعة من المتفقدين موجهة حصرياً للمشرف العام ولا يمكن للمسؤول الإداري إغلاقها"
    );
  }

  const updated = await db.report.update({
    where: { id: reportId },
    data: {
      status:
        status === "RESOLVED" ? ReportStatus.RESOLVED : ReportStatus.DISMISSED,
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/moderator/dashboard");
  return updated;
}

export async function replySupportTicketAdminAction(
  ticketId: string,
  replyText: string,
  status: "ANSWERED" | "CLOSED" = "ANSWERED"
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();
  const admin = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  if (admin?.role !== Role.ADMIN && admin?.role !== Role.MODERATOR) throw new ForbiddenError();

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
        title: "رد جديد من الدعم الفني وخدمة العملاء",
        message: `تم الرد على تذكرتك: "${ticket.subject}"`,
        link: "/support",
      },
    });
  }

  if (ticket.email) {
    void sendSupportReplyNotification(
      ticket.email,
      ticket.name,
      ticket.subject,
      replyText.trim()
    ).catch(() => null);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/support");
  return ticket;
}