"use server";

/**
 * Inspector Actions (المستوى الرقابي الأول: المتفقد) & Identity Verification — Al-Musnad v8.0
 *
 * Inspector Powers:
 * 1. وضع علامات التوثيق البيداغوجي للمنشورات (`toggleWorksheetEndorsementAction`)
 * 2. إضافة تعليقات ترى في الصدارة (`addInspectorCommentAction` with `isOfficialDirective: true`)
 * 3. رفع تعليق خاص مباشرة إلى الناشر (`addInspectorCommentAction` with `isPrivateToPublisher: true`)
 * 4. القيام بإبلاغات تصل إلى المشرف مباشرة (`submitInspectorDirectReportToAdminAction` with `isInspectorPriority: true`)
 * 5. تفعيل كود التوثيق الصادر من المشرف (`activateInspectorCodeAction` — يدعم جدول `VerificationCode` وأكواد المستخدمين)
 */

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
} from "@/lib/utils/errors";
import { Role, ReportTargetType, WorksheetStatus } from "@prisma/client";
import { upsertWorksheetReview } from "@/services/review.service";
import { logPlatformActivity } from "@/services/audit.service";
import { checkRateLimit } from "@/lib/security/rate-limit";

async function requireInspectorOrAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      school: true,
      isVerified: true,
    },
  });

  if (
    !dbUser ||
    (dbUser.role !== Role.INSPECTOR && dbUser.role !== Role.ADMIN)
  ) {
    throw new ForbiddenError(
      "هذه اللوحة والصلاحية مخصصة للمتفقدين التربويين والمشرف العام فقط"
    );
  }

    // Strict Security Guard: Unverified Inspector CANNOT access Inspector Dashboard or Inspector Powers
  if (dbUser.role === Role.INSPECTOR && !dbUser.isVerified) {
    throw new ForbiddenError(
      "حسابك كمتفقد تربوي قيد انتظار إثبات الهوية. لضمان أمان المنصة وحماية الصلاحيات الرقابية والملفات الداخلية، لا يمكن لحساب المتفقد الجديد الوصول إلى ميزات المتفقد أو لوحة التحكم إلا بعد إثبات الهوية عبر كود التفعيل الرسمي (/inspector/activate) أو توثيق الحساب من قِبل المشرف العام."
    );
  }

  return dbUser;
}

/**
 * جلب بيانات لوحة تحكم المتفقد التربوي (`/inspector/dashboard`)
 */
export async function getInspectorDashboardData() {
  const inspector = await requireInspectorOrAdmin();

  const [
    totalWorksheets,
    endorsedWorksheetsCount,
    draftWorksheetsCount,
    myDirectReportsCount,
    worksheets,
    myComments,
    myReports,
  ] = await Promise.all([
    db.worksheet.count({ where: { status: WorksheetStatus.PUBLISHED } }),
    db.worksheet.count({ where: { isEndorsed: true } }),
    db.worksheet.count({ where: { status: WorksheetStatus.DRAFT } }),
    db.report.count({
      where: { reporterId: inspector.id, isInspectorPriority: true },
    }),
    db.worksheet.findMany({
      where: { status: { in: [WorksheetStatus.PUBLISHED, WorksheetStatus.DRAFT] } },
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
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
          },
        },
      },
    }),
    db.review.findMany({
      where: { userId: inspector.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        worksheet: {
          select: {
            id: true,
            title: true,
            titleAr: true,
            uploader: { select: { id: true, name: true, username: true } },
          },
        },
      },
    }),
    db.report.findMany({
      where: { reporterId: inspector.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        targetWorksheet: { select: { id: true, title: true, titleAr: true } },
        targetUser: { select: { id: true, name: true, username: true, email: true } },
      },
    }),
  ]);

  return {
    inspector,
    stats: {
      totalWorksheets,
      endorsedWorksheetsCount,
      draftWorksheetsCount,
      myDirectReportsCount,
    },
    worksheets,
    myComments,
    myReports,
  };
}

/**
 * إضافة تعليق من المتفقد:
 * - إما تعليق عام يظهر في الصدارة (`isPrivateToPublisher: false` -> `isOfficialDirective: true`)
 * - أو تعليق خاص يصل مباشرة إلى الناشر (`isPrivateToPublisher: true`)
 */
export async function addInspectorCommentAction(input: {
  worksheetId: string;
  comment: string;
  isPrivateToPublisher: boolean;
}) {
  const inspector = await requireInspectorOrAdmin();

  if (!input.comment || input.comment.trim().length < 2) {
    throw new ValidationError("يرجى كتابة نص التعليق أو التوجيه البيداغوجي");
  }

  const created = await upsertWorksheetReview(
    input.worksheetId,
    inspector.id,
    {
      rating: 5,
      comment: input.comment.trim(),
      isPrivateToPublisher: input.isPrivateToPublisher,
      isOfficialDirective: !input.isPrivateToPublisher,
    },
    inspector.role
  );

  revalidatePath(`/worksheet/${input.worksheetId}`);
  revalidatePath("/inspector/dashboard");
  return created;
}

/**
 * للمتفقد: القيام بإبلاغ عاجل يصل إلى المشرف العام (`ADMIN`) مباشرة
 */
export async function submitInspectorDirectReportToAdminAction(input: {
  targetType: "WORKSHEET" | "USER";
  targetWorksheetId?: string;
  targetUserId?: string;
  reason: string;
  details?: string;
}) {
  const inspector = await requireInspectorOrAdmin();

  if (!input.reason.trim()) {
    throw new ValidationError("يرجى تحديد سبب البلاغ الموجه للمشرف");
  }

  const report = await db.report.create({
    data: {
      reporterId: inspector.id,
      targetType:
        input.targetType === "WORKSHEET"
          ? ReportTargetType.WORKSHEET
          : ReportTargetType.USER,
      targetWorksheetId: input.targetWorksheetId || null,
      targetUserId: input.targetUserId || null,
      reason: `[بلاغ مباشر من المتفقد ${inspector.name}] ${input.reason.trim()}`,
      details: input.details?.trim() || null,
      isInspectorPriority: true,
    },
  });

  // إشعار فوري لجميع المشرفين في القمة (ADMIN)
  const admins = await db.user.findMany({
    where: { role: Role.ADMIN },
    select: { id: true },
  });

  if (admins.length > 0) {
    await db.notification.createMany({
      data: admins.map((adm) => ({
        userId: adm.id,
        title: "🚨 بلاغ رقابي عاجل من المتفقد التربوي",
        message: `رفع المتفقد (${inspector.name}) بلاغاً مباشراً إليك: "${input.reason.trim()}".`,
        link: "/admin/dashboard?tab=reports",
      })),
    });
  }

  await logPlatformActivity({
    actorId: inspector.id,
    actorName: inspector.name,
    actorRole: inspector.role,
    action: "INSPECTOR_PRIORITY_REPORT",
    targetType: input.targetType,
    targetId: input.targetWorksheetId || input.targetUserId || report.id,
    details: `رفع المتفقد (${inspector.name}) بلاغاً رقابياً عاجلاً للمشرف العام: ${input.reason.trim()}`,
  });

  revalidatePath("/inspector/dashboard");
  revalidatePath("/admin/dashboard");
  return { success: true, id: report.id };
}

/**
 * للمشرف العام (حصرًا): توليد كود توثيق لمستخدم محدد
 */
export async function generateInspectorCodeAdminAction(
  targetUserId: string,
  grantInspectorRole: boolean = false
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const adminUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!adminUser || adminUser.role !== Role.ADMIN) {
    throw new ForbiddenError("توليد أكواد التوثيق صلاحية حصرية للمشرف العام فقط");
  }

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, role: true },
  });

  if (!targetUser) {
    throw new NotFoundError("المستخدم غير موجود");
  }

  const part1 = crypto.randomBytes(2).toString("hex").toUpperCase();
  const part2 = crypto.randomBytes(2).toString("hex").toUpperCase();
  const prefix =
    grantInspectorRole || targetUser.role === Role.INSPECTOR ? "INSP" : "VERF";
  const code = `${prefix}-${part1}-${part2}`;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      inspectorCode: code,
      inspectorPending: true,
    },
    select: {
      id: true,
      name: true,
      inspectorCode: true,
    },
  });

  // Also record in VerificationCode table for unified tracking in Admin Dashboard
  await db.verificationCode.create({
    data: {
      code,
      targetRole: grantInspectorRole ? Role.INSPECTOR : targetUser.role,
      note: `مخصص للمستخدم: ${targetUser.name}`,
      createdById: user.id,
    },
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "تم إصدار كود توثيق الهوية الخاص بحسابك",
      message:
        "قام المشرف العام بمراجعة طلبك وإصدار كود التوثيق الرسمي. يمكنك الآن إدخاله في قسم (التوثيق) داخل ملفك الشخصي لتفعيل شارة التوثيق.",
      link: "/profile?tab=verification",
    },
  });

  revalidatePath("/admin/dashboard");
  return updated;
}

/**
 * طلب توثيق الهوية من داخل صفحة الملف الشخصي (`/profile?tab=verification`)
 */
export async function requestIdentityVerificationAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, isVerified: true },
  });

  if (!dbUser) throw new NotFoundError("الحساب غير موجود");

  if (dbUser.isVerified) {
    return { alreadyVerified: true };
  }

  await db.user.update({
    where: { id: user.id },
    data: { inspectorPending: true },
  });

  revalidatePath("/profile");
  revalidatePath("/admin/dashboard");
  return { requested: true };
}

/**
 * تفعيل شارة التوثيق (`isVerified`) باستخدام الكود الصادر من المشرف
 * يقبل الأكواد المولدة في جدول `VerificationCode` أو الأكواد المربوطة بـ `user.inspectorCode`
 */
export async function activateInspectorCodeAction(codeInput: string) {
  const cleanCode = codeInput.trim().toUpperCase();
  if (!cleanCode || cleanCode.length < 4) {
    throw new ValidationError("يرجى إدخال كود التوثيق بشكل صحيح");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً لتفعيل الكود");
  }

  const rl = checkRateLimit(`verify-code:${user.id}`, {
    maxRequests: 8,
    windowMs: 10 * 60_000,
  });
  if (!rl.allowed) {
    throw new ValidationError("لقد تجاوزت الحد المسموح لمحاولات تفعيل الكود. يرجى المحاولة بعد دقائق.");
  }

  const currentUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true },
  });

  // 1. Check standalone VerificationCode table first
  const standaloneCode = await db.verificationCode.findUnique({
    where: { code: cleanCode },
  });

  if (standaloneCode) {
    if (standaloneCode.isUsed && standaloneCode.usedById !== user.id) {
      throw new ValidationError("هذا الكود تم استخدامه مسبقاً");
    }

    const nextRole =
      standaloneCode.targetRole === Role.INSPECTOR || cleanCode.startsWith("INSP-")
        ? Role.INSPECTOR
        : currentUser?.role || Role.TEACHER;

    const [updatedUser] = await db.$transaction([
      db.user.update({
        where: { id: user.id },
        data: {
          role: nextRole,
          isVerified: true,
          inspectorPending: false,
          inspectorCode: null,
        },
      }),
      db.verificationCode.update({
        where: { id: standaloneCode.id },
        data: {
          isUsed: true,
          usedById: user.id,
          usedAt: new Date(),
        },
      }),
    ]);

    await db.notification.create({
      data: {
        userId: user.id,
        title: "تم توثيق هويتك وتفعيل شارة التوثيق بنجاح",
        message:
          "تهانينا! تم التحقق من الكود وتفعيل شارة التوثيق الرسمية على حسابك في منصة المسند.",
        link: "/profile?tab=verification",
      },
    });

    await logPlatformActivity({
      actorId: user.id,
      actorName: updatedUser.name,
      actorRole: updatedUser.role,
      action: "VERIFICATION_CODE_REDEEMED",
      targetType: "VERIFICATION_CODE",
      targetId: cleanCode,
      details: `قام المستخدم (${updatedUser.name}) بتفعيل كود التوثيق الرسمي «${cleanCode}» بنجاح`,
    });

    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath("/admin/dashboard");
    return updatedUser;
  }

  // 2. Check legacy per-user `inspectorCode`
  const matchedUser = await db.user.findFirst({
    where: {
      id: user.id,
      inspectorCode: cleanCode,
    },
  });

  if (!matchedUser) {
    throw new ValidationError(
      "كود التوثيق غير صحيح أو غير مخصص لهذا الحساب. يرجى التواصل مع المشرف العام."
    );
  }

  const nextRole = cleanCode.startsWith("INSP-")
    ? Role.INSPECTOR
    : matchedUser.role;

  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      role: nextRole,
      isVerified: true,
      inspectorPending: false,
      inspectorCode: null,
    },
  });

  await db.notification.create({
    data: {
      userId: user.id,
      title: "تم توثيق هويتك وتفعيل شارة التوثيق بنجاح",
      message:
        "تهانينا! تم التحقق من الكود وتفعيل شارة التوثيق الرسمية على حسابك في منصة المسند.",
      link: "/profile?tab=verification",
    },
  });

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/admin/dashboard");

  return updated;
}

/**
 * للمتفقد التربوي أو المشرف: وضع أو إزالة علامة الاعتماد البيداغوجي على المنشور
 */
export async function toggleWorksheetEndorsementAction(worksheetId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const actor = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, role: true, isVerified: true },
  });

  if (
    !actor ||
    (actor.role !== Role.INSPECTOR && actor.role !== Role.ADMIN)
  ) {
    throw new ForbiddenError(
      "هذه الميزة مخصصة للمتفقدين المعتمدين فقط للمصادقة على صحة النشرات علمياً وبيداغوجياً"
    );
  }

  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      title: true,
      titleAr: true,
      isEndorsed: true,
      uploadedBy: true,
    },
  });

  if (actor.role === Role.INSPECTOR && !actor.isVerified) {
    throw new ForbiddenError(
      "يجب إثبات هويتك وتوثيق حسابك كمتفقد تربوي أولاً قبل المصادقة على النشرات ومنح شارة الاعتماد البيداغوجي"
    );
  }

  if (!worksheet) throw new NotFoundError("النشرة غير موجودة");

  const nextEndorsed = !worksheet.isEndorsed;

  const updated = await db.worksheet.update({
    where: { id: worksheetId },
    data: {
      isEndorsed: nextEndorsed,
      endorsedById: nextEndorsed ? actor.id : null,
      endorsedAt: nextEndorsed ? new Date() : null,
    },
    include: {
      endorsedBy: {
        select: { id: true, name: true, username: true, role: true, school: true },
      },
    },
  });

  if (nextEndorsed && worksheet.uploadedBy !== actor.id) {
    await db.notification.create({
      data: {
        userId: worksheet.uploadedBy,
        title: "مصادقة بيداغوجية جديدة على نشرتك!",
        message: `قام المتفقد التربوي (${actor.name}) بالمصادقة على صحة نشرتك "${
          worksheet.titleAr || worksheet.title
        }" علمياً وبيداغوجياً ومنحها شارة الاعتماد البيداغوجي.`,
        link: `/worksheet/${worksheet.id}`,
      },
    });
  }

  await logPlatformActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: nextEndorsed ? "WORKSHEET_ENDORSED" : "WORKSHEET_UNENDORSED",
    targetType: "WORKSHEET",
    targetId: worksheet.id,
    details: `تم ${nextEndorsed ? "اعتماد" : "إلغاء اعتماد"} المنشور «${worksheet.titleAr || worksheet.title}» بيداغوجياً بواسطة (${actor.name})`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath(`/worksheet/${worksheetId}`);
  revalidatePath("/inspector/dashboard");
  revalidatePath("/admin/dashboard");

  return updated;
}