import { db } from "@/lib/db";
import { Prisma, WorksheetStatus, Role, TargetAudience } from "@prisma/client";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { getSignedDownloadUrl } from "@/services/storage.service";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  ADMINISTRATIVE_CATEGORY,
  isPdfUploadFile,
} from "@/config/constants";
import type {
  WorksheetFilterInput,
  CreateWorksheetInput,
  UpdateWorksheetInput,
} from "@/lib/validators/worksheet";

let taxonomySeededInProcess = false;

/**
 * Ensures the 6 Official Primary Grades, 10 Subjects, and 6 Categories exist in PostgreSQL
 * with valid UUIDs so `/upload` and filters never fail with missing taxonomy records.
 */
export async function ensureOfficialTaxonomySeeded(): Promise<void> {
  if (taxonomySeededInProcess) return;
  try {
    const [gradeCount, subjectCount, categoryCount] = await Promise.all([
      db.grade.count(),
      db.subject.count(),
      db.category.count(),
    ]);

    if (gradeCount < CURRICULUM_GRADES.length) {
      for (const g of CURRICULUM_GRADES) {
        await db.grade.upsert({
          where: { slug: g.slug },
          update: { name: g.name, nameAr: g.nameAr, sortOrder: g.sortOrder },
          create: { name: g.name, nameAr: g.nameAr, slug: g.slug, sortOrder: g.sortOrder },
        });
      }
    }

    if (subjectCount < CURRICULUM_SUBJECTS.length + 1) {
      for (const s of CURRICULUM_SUBJECTS) {
        await db.subject.upsert({
          where: { slug: s.slug },
          update: { name: s.name, nameAr: s.nameAr, color: s.color, icon: s.icon, sortOrder: s.sortOrder },
          create: { name: s.name, nameAr: s.nameAr, slug: s.slug, color: s.color, icon: s.icon, sortOrder: s.sortOrder },
        });
      }
      await db.subject.upsert({
        where: { slug: "administration" },
        update: { name: "Administration", nameAr: "الإدارة والمعاملات الإدارية", color: "#334155", icon: "briefcase", sortOrder: 10 },
        create: { name: "Administration", nameAr: "الإدارة والمعاملات الإدارية", slug: "administration", color: "#334155", icon: "briefcase", sortOrder: 10 },
      });
    }

    if (categoryCount < SUBJECT_SUBDIVISIONS.length + 1) {
      for (const c of SUBJECT_SUBDIVISIONS) {
        await db.category.upsert({
          where: { slug: c.slug },
          update: { name: c.name, nameAr: c.nameAr, sortOrder: c.sortOrder },
          create: { name: c.name, nameAr: c.nameAr, slug: c.slug, sortOrder: c.sortOrder },
        });
      }
      await db.category.upsert({
        where: { slug: ADMINISTRATIVE_CATEGORY.slug },
        update: { name: ADMINISTRATIVE_CATEGORY.name, nameAr: ADMINISTRATIVE_CATEGORY.nameAr, sortOrder: ADMINISTRATIVE_CATEGORY.sortOrder },
        create: { name: ADMINISTRATIVE_CATEGORY.name, nameAr: ADMINISTRATIVE_CATEGORY.nameAr, slug: ADMINISTRATIVE_CATEGORY.slug, sortOrder: ADMINISTRATIVE_CATEGORY.sortOrder },
      });
    }

    taxonomySeededInProcess = true;
  } catch (err) {
    console.warn("[ensureOfficialTaxonomySeeded] Non-fatal warning:", err);
  }
}

export const publicWorksheetSelect = {
  id: true,
  title: true,
  titleAr: true,
  description: true,
  descriptionAr: true,
  categoryId: true,
  gradeId: true,
  subjectId: true,
  uploadedBy: true,
  fileUrl: true,
  fileName: true,
  fileSize: true,
  thumbnailUrl: true,
  pageCount: true,
  status: true,
  audience: true,
  isEndorsed: true,
  endorsedById: true,
  endorsedAt: true,
  tags: true,
  downloadCount: true,
  favoriteCount: true,
  ratingAvg: true,
  reviewCount: true,
  createdAt: true,
  updatedAt: true,
  category: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  grade: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  subject: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      color: true,
      icon: true,
      sortOrder: true,
    },
  },
  uploader: {
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      school: true,
      role: true,
      bio: true,
      followersCount: true,
      favoritedByCount: true,
      isVerified: true,
      isBanned: true,
    },
  },
  endorsedBy: {
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      school: true,
    },
  },
} as const;

/**
 * Verifies whether a single worksheet can be OPENED, READ, or DOWNLOADED by a user.
 * Unauthenticated visitors (`!viewerRole || !viewerUserId`) ALWAYS receive `false`.
 */
export function canUserAccessWorksheet(
  worksheet: {
    uploadedBy: string;
    audience: TargetAudience | string;
    uploader?: { role?: Role | string | null } | null;
  },
  viewerRole?: Role | string | null,
  viewerUserId?: string | null,
  viewerIsVerified?: boolean | null
): boolean {
  if (!viewerRole || !viewerUserId) {
    return false;
  }

  if (
    viewerRole === "ADMIN" ||
    viewerRole === "MODERATOR" ||
    worksheet.uploadedBy === viewerUserId
  ) {
    return true;
  }

  const audience = worksheet.audience;
  const uploaderRole = worksheet.uploader?.role;
  const isVerifiedMember = Boolean(viewerIsVerified);

  // Strict Identity Verification Gate (v16.0):
  // Unverified Inspector, Teacher, or Institution accounts CANNOT access internal/sensitive
  // role-restricted files (`TEACHERS_ONLY`, `INSTITUTIONS_ONLY`, `SAME_ROLE_ONLY`) until verified!
  if (!isVerifiedMember) {
    return (
      audience === TargetAudience.ALL ||
      audience === TargetAudience.TEACHERS_AND_STUDENTS
    );
  }

  switch (audience) {
    case TargetAudience.ALL:
      return true;

    case TargetAudience.TEACHERS_AND_STUDENTS:
      return (
        viewerRole === "TEACHER" ||
        viewerRole === "STUDENT" ||
        viewerRole === "INSPECTOR" ||
        viewerRole === "INSTITUTION"
      );

    case TargetAudience.TEACHERS_ONLY:
      return isVerifiedMember && (viewerRole === "TEACHER" || viewerRole === "INSPECTOR");

    case TargetAudience.INSTITUTIONS_ONLY:
      return isVerifiedMember && viewerRole === "INSTITUTION";

    case TargetAudience.SAME_ROLE_ONLY:
      return Boolean(isVerifiedMember && uploaderRole && viewerRole === uploaderRole);

    default:
      return false;
  }
}

/**
 * Builds the Prisma `WhereInput` visibility filter.
 */
export function buildAudienceVisibilityFilter(
  viewerRole?: Role | string | null,
  viewerUserId?: string | null,
  viewerIsVerified?: boolean | null
): Prisma.WorksheetWhereInput {
  if (!viewerRole || !viewerUserId) {
    return { audience: TargetAudience.ALL };
  }

  if (viewerRole === "ADMIN" || viewerRole === "MODERATOR") {
    return {};
  }

  // Strict Identity Verification Gate (v16.0):
  // Unverified Inspector, Teacher, or Institution accounts can only list public/general files
  // and their own uploads until their identity is verified (`isVerified === true`).
  if (!viewerIsVerified) {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
      ],
    };
  }

  if (viewerRole === "INSPECTOR") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
        { audience: TargetAudience.TEACHERS_ONLY },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.INSPECTOR } },
          ],
        },
      ],
    };
  }

  if (viewerRole === "TEACHER") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
        { audience: TargetAudience.TEACHERS_ONLY },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.TEACHER } },
          ],
        },
      ],
    };
  }

  if (viewerRole === "INSTITUTION") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.INSTITUTIONS_ONLY },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.INSTITUTION } },
          ],
        },
      ],
    };
  }

  if (viewerRole === "STUDENT") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.STUDENT } },
          ],
        },
      ],
    };
  }

  return { audience: TargetAudience.ALL };
}

export async function listWorksheets(
  filters: WorksheetFilterInput,
  viewerRole?: Role | string | null,
  viewerUserId?: string | null,
  viewerIsVerified?: boolean | null
) {
  await ensureOfficialTaxonomySeeded();
  const isGuest = !viewerRole || !viewerUserId;

  let resolvedVerified = viewerIsVerified;
  if (!isGuest && resolvedVerified === undefined && viewerUserId) {
    try {
      const u = await db.user.findUnique({
        where: { id: viewerUserId },
        select: { isVerified: true, role: true },
      });
      resolvedVerified = Boolean(
        u?.isVerified || u?.role === "ADMIN" || u?.role === "MODERATOR"
      );
    } catch {
      resolvedVerified = false;
    }
  }

  const { page, limit, search, grade, subject, category, trimester, audience, tags, sort } =
    filters;
  const {
    skip,
    take,
    page: currentPage,
    limit: currentLimit,
  } = getPaginationParams(page, limit);

  const audienceGuard = buildAudienceVisibilityFilter(
    viewerRole,
    viewerUserId,
    resolvedVerified
  );

  const andConditions: Prisma.WorksheetWhereInput[] = [
    { status: WorksheetStatus.PUBLISHED },
    audienceGuard,
  ];

  if (grade) andConditions.push({ grade: { slug: grade } });
  if (subject) andConditions.push({ subject: { slug: subject } });
  if (category) andConditions.push({ category: { slug: category } });

  // School Trimester Filtering (الثلاثي المدرسي)
  if (trimester && trimester.trim().length > 0) {
    const rawVal = trimester.trim().toLowerCase();
    let trimesterTerms: string[] = [];
    if (
      rawVal === "trimester-1" ||
      rawVal === "1" ||
      rawVal.includes("أول") ||
      rawVal.includes("اول")
    ) {
      trimesterTerms = [
        "الثلاثي الأول",
        "الثلاثي الاول",
        "الثلاثي 1",
        "trimester-1",
        "Trimestre 1",
      ];
    } else if (
      rawVal === "trimester-2" ||
      rawVal === "2" ||
      rawVal.includes("ثاني")
    ) {
      trimesterTerms = [
        "الثلاثي الثاني",
        "الثلاثي 2",
        "trimester-2",
        "Trimestre 2",
      ];
    } else if (
      rawVal === "trimester-3" ||
      rawVal === "3" ||
      rawVal.includes("ثالث")
    ) {
      trimesterTerms = [
        "الثلاثي الثالث",
        "الثلاثي 3",
        "trimester-3",
        "Trimestre 3",
      ];
    } else {
      trimesterTerms = [trimester.trim()];
    }

    andConditions.push({
      OR: [
        { tags: { hasSome: trimesterTerms } },
        ...trimesterTerms.flatMap((term) => [
          { title: { contains: term, mode: "insensitive" as const } },
          { titleAr: { contains: term, mode: "insensitive" as const } },
          { description: { contains: term, mode: "insensitive" as const } },
          { descriptionAr: { contains: term, mode: "insensitive" as const } },
        ]),
      ],
    });
  }

  if (audience && !isGuest) andConditions.push({ audience });
  if (tags && tags.length > 0) andConditions.push({ tags: { hasSome: tags } });

  if (search && search.trim().length > 0) {
    const term = search.trim();
    andConditions.push({
      OR: [
        { title: { contains: term, mode: "insensitive" } },
        { titleAr: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
        { descriptionAr: { contains: term, mode: "insensitive" } },
        { tags: { has: term } },
      ],
    });
  }

  const where: Prisma.WorksheetWhereInput = {
    AND: andConditions,
  };

  const secondaryOrderBy: Prisma.WorksheetOrderByWithRelationInput = (() => {
    switch (sort) {
      case "popular":
        return { favoriteCount: "desc" };
      case "downloads":
        return { downloadCount: "desc" };
      case "title":
        return { title: "asc" };
      case "oldest":
        return { createdAt: "asc" };
      case "newest":
      default:
        return { createdAt: "desc" };
    }
  })();

  const orderBy: Prisma.WorksheetOrderByWithRelationInput[] = [
    { isEndorsed: "desc" },
    secondaryOrderBy,
  ];

  const [total, worksheets] = await Promise.all([
    db.worksheet.count({ where }),
    db.worksheet.findMany({
      where,
      select: publicWorksheetSelect,
      orderBy,
      skip,
      take,
    }),
  ]);

  const sanitizedWorksheets = isGuest
    ? worksheets.map((ws) => ({
        ...ws,
        fileUrl: "",
        description: null,
        descriptionAr: null,
        thumbnailUrl: null,
      }))
    : worksheets;

  return {
    data: sanitizedWorksheets,
    meta: buildPaginationMeta(total, currentPage, currentLimit),
  };
}

export async function getWorksheetById(
  id: string,
  viewerRole?: Role | string | null,
  viewerUserId?: string | null,
  viewerIsVerified?: boolean | null
) {
  if (!viewerRole || !viewerUserId) {
    throw new UnauthorizedError(
      "يرجى تسجيل الدخول بحسابك لقراءة أو تحميل هذا الملف"
    );
  }

  let resolvedVerified = viewerIsVerified;
  if (resolvedVerified === undefined) {
    try {
      const u = await db.user.findUnique({
        where: { id: viewerUserId },
        select: { isVerified: true, role: true },
      });
      resolvedVerified = Boolean(
        u?.isVerified || u?.role === "ADMIN" || u?.role === "MODERATOR"
      );
    } catch {
      resolvedVerified = false;
    }
  }

  const worksheet = await db.worksheet.findUnique({
    where: { id },
    select: publicWorksheetSelect,
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  // DRAFT Isolation: Only uploader, ADMIN, or VERIFIED INSPECTOR can access DRAFT files
  if (
    worksheet.status === WorksheetStatus.DRAFT &&
    worksheet.uploadedBy !== viewerUserId &&
    viewerRole !== "ADMIN" &&
    !(viewerRole === "INSPECTOR" && resolvedVerified)
  ) {
    throw new ForbiddenError(
      "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد الموثق."
    );
  }

  if (!canUserAccessWorksheet(worksheet, viewerRole, viewerUserId, resolvedVerified)) {
    if (
      !resolvedVerified &&
      (viewerRole === "INSPECTOR" ||
        viewerRole === "TEACHER" ||
        viewerRole === "INSTITUTION")
    ) {
      throw new ForbiddenError(
        "هذا الملف مخصص داخلياً للأعضاء الموثقين في هذه الفئة. يرجى إثبات هويتك وتوثيق حسابك من المشرف العام للوصول إلى الملفات الخاصة."
      );
    }
    throw new ForbiddenError(
      "عذراً، قام الناشر بتقييد صلاحية الوصول لهذه النشرة لفئة حسابات أخرى غير فئة حسابك."
    );
  }

  let previewUrl: string | undefined = undefined;
  try {
    previewUrl = await getSignedDownloadUrl(worksheet.fileUrl, 3600);
  } catch (err) {
    console.warn("[getWorksheetById] Preview signed URL fallback:", err);
  }

  return {
    ...worksheet,
    previewUrl,
  };
}

export interface CreateWorksheetData extends CreateWorksheetInput {
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType?: string;
  thumbnailUrl?: string;
  pageCount?: number;
}

export async function createWorksheet(data: CreateWorksheetData) {
  await ensureOfficialTaxonomySeeded();

  const uploader = await db.user.findUnique({
    where: { id: data.uploadedBy },
    select: { role: true, isVerified: true, isBanned: true, banReason: true },
  });

  if (uploader?.isBanned) {
    throw new ForbiddenError(
      `حسابك محظور من النشر (${uploader.banReason || "مخالفة شروط المنصة"}).`
    );
  }

  if (uploader?.role === Role.STUDENT) {
    throw new ForbiddenError(
      "حسابات التلاميذ مخصصة للتصفح والتحميل فقط ولا تملك صلاحية النشر."
    );
  }

  const isPdf = isPdfUploadFile({
    type: data.mimeType,
    name: data.fileName,
  });

  const initialStatus = isPdf
    ? WorksheetStatus.PUBLISHED
    : WorksheetStatus.DRAFT;

  const created = await db.worksheet.create({
    data: {
      title: data.title,
      titleAr: data.titleAr ?? null,
      description: data.description ?? null,
      descriptionAr: data.descriptionAr ?? null,
      categoryId: data.categoryId,
      gradeId: data.gradeId,
      subjectId: data.subjectId,
      uploadedBy: data.uploadedBy,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileSize: data.fileSize,
      thumbnailUrl: data.thumbnailUrl ?? null,
      pageCount: data.pageCount ?? null,
      audience:
        uploader?.isVerified ||
        uploader?.role === Role.ADMIN ||
        uploader?.role === Role.MODERATOR
          ? data.audience ?? TargetAudience.TEACHERS_AND_STUDENTS
          : data.audience === TargetAudience.ALL
          ? TargetAudience.ALL
          : TargetAudience.TEACHERS_AND_STUDENTS,
      tags: data.tags ?? [],
      status: initialStatus,
    },
    select: publicWorksheetSelect,
  });

  if (!isPdf) {
    await db.notification.create({
      data: {
        userId: data.uploadedBy,
        title: "شكراً لمساهمتك! ملفك قيد المراجعة والتحويل إلى PDF",
        message: `شكراً لك على إرسال الملف "${
          created.titleAr || created.title
        }". نظراً لأن الملف المرفوع ليس بصيغة PDF، فسيتم مراجعته من عند المشرف والمتفقد وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين.`,
        link: "/profile",
      },
    });

    const reviewers = await db.user.findMany({
      where: { role: { in: [Role.ADMIN, Role.INSPECTOR] }, isBanned: false },
      select: { id: true },
    });

    if (reviewers.length > 0) {
      await db.notification.createMany({
        data: reviewers.map((r) => ({
          userId: r.id,
          title: "ملف وورد/صورة بانتظار المراجعة والتحويل إلى PDF",
          message: `قام الناشر برفع ملف غير PDF بعنوان «${created.titleAr || created.title}». يرجى مراجعته وإعادة صياغته لملف PDF ثم نشره.`,
          link: `/worksheet/${created.id}`,
        })),
      });
    }
  }

  return {
    ...created,
    requiresPdfConversionReview: !isPdf,
    reviewNoticeMessage: !isPdf
      ? "شكراً لك على مساهمتك القيمة! تم قبول واستلام ملفك بنجاح. هذا المحتوى الذي أرسلته سيتم مراجعته من عند المشرف والمتفقد التربوي وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين."
      : undefined,
  };
}

export interface UpdateWorksheetReplacementFile {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl?: string;
  pageCount?: number;
}

export async function updateWorksheet(
  id: string,
  userId: string,
  data: UpdateWorksheetInput,
  userRole?: string,
  replacementFile?: UpdateWorksheetReplacementFile
) {
  const existing = await db.worksheet.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      titleAr: true,
      uploadedBy: true,
      isEndorsed: true,
      fileUrl: true,
      status: true,
    },
  });

  if (!existing) {
    throw new NotFoundError("Worksheet");
  }

  const isOwner = existing.uploadedBy === userId;
  const isAdmin = userRole === "ADMIN";
  const isModerator = userRole === "MODERATOR";
  const isInspector = userRole === "INSPECTOR";

  if (!isOwner && !isAdmin && !isInspector && !isModerator) {
    throw new ForbiddenError("لا يمكنك تعديل نشرة لا تملكها");
  }

  const uploader = await db.user.findUnique({
    where: { id: userId },
    select: { isBanned: true, banReason: true },
  });

  if (uploader?.isBanned && !isAdmin) {
    throw new ForbiddenError(
      `حسابك محظور من تعديل النشرات (${uploader.banReason || "مخالفة الشروط"}).`
    );
  }

  const didReplaceFile = Boolean(
    replacementFile &&
      replacementFile.fileUrl &&
      replacementFile.fileUrl !== existing.fileUrl
  );

  const endorsementResetData =
    didReplaceFile && existing.isEndorsed && !isInspector
      ? {
          isEndorsed: false,
          endorsedById: null,
          endorsedAt: null,
        }
      : {};

  const canChangeWorksheetStatus = isAdmin || isModerator || isInspector;
  let nextStatus = canChangeWorksheetStatus && data.status !== undefined ? data.status : existing.status;
  let publishedFromDraft = false;

  // If Admin or Inspector replaces file on a DRAFT worksheet with a PDF, publish it!
  if (
    didReplaceFile &&
    replacementFile &&
    existing.status === WorksheetStatus.DRAFT &&
    (isAdmin || isInspector) &&
    isPdfUploadFile({ name: replacementFile.fileName })
  ) {
    nextStatus = WorksheetStatus.PUBLISHED;
    publishedFromDraft = true;
  }

  const updated = await db.worksheet.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.titleAr !== undefined ? { titleAr: data.titleAr } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.descriptionAr !== undefined
        ? { descriptionAr: data.descriptionAr }
        : {}),
      ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
      ...(data.gradeId !== undefined ? { gradeId: data.gradeId } : {}),
      ...(data.subjectId !== undefined ? { subjectId: data.subjectId } : {}),
      ...(data.audience !== undefined ? { audience: data.audience } : {}),
      ...(data.tags !== undefined ? { tags: data.tags } : {}),
      status: nextStatus,
      ...(replacementFile
        ? {
            fileUrl: replacementFile.fileUrl,
            fileName: replacementFile.fileName,
            fileSize: replacementFile.fileSize,
            ...(replacementFile.thumbnailUrl !== undefined
              ? { thumbnailUrl: replacementFile.thumbnailUrl }
              : {}),
            ...(replacementFile.pageCount !== undefined
              ? { pageCount: replacementFile.pageCount }
              : {}),
          }
        : {}),
      ...endorsementResetData,
    },
    select: publicWorksheetSelect,
  });

  if (didReplaceFile && existing.isEndorsed && !isInspector) {
    await db.notification.create({
      data: {
        userId: existing.uploadedBy,
        title: "إلغاء شارة الاعتماد بعد تغيير ملف النشرة",
        message: `تم تحديث ملف النشرة "${
          updated.titleAr || updated.title
        }"، ولذلك أُلغيت شارة الاعتماد البيداغوجي السابقة لحين مراجعة النسخة الجديدة من قِبل المتفقد.`,
        link: `/worksheet/${id}`,
      },
    });
  }

  if (publishedFromDraft && existing.uploadedBy !== userId) {
    await db.notification.create({
      data: {
        userId: existing.uploadedBy,
        title: "تم تحويل ملفك إلى PDF ونشره على المنصة",
        message: `تمت مراجعة ملفك «${
          updated.titleAr || updated.title
        }» وإعادة صياغته إلى ملف PDF ونشره رسمياً على منصة المسند.`,
        link: `/worksheet/${updated.id}`,
      },
    });
  }

  return {
    ...updated,
    endorsementRevoked: didReplaceFile && existing.isEndorsed && !isInspector,
    publishedFromDraft,
  };
}

export async function archiveWorksheet(
  id: string,
  userId: string,
  userRole?: string
) {
  const existing = await db.worksheet.findUnique({
    where: { id },
    select: { id: true, uploadedBy: true },
  });

  if (!existing) {
    throw new NotFoundError("Worksheet");
  }

  if (
    existing.uploadedBy !== userId &&
    userRole !== "ADMIN" &&
    userRole !== "MODERATOR"
  ) {
    throw new ForbiddenError("You can only archive your own worksheets");
  }

  await db.worksheet.update({
    where: { id },
    data: { status: WorksheetStatus.ARCHIVED },
  });

  return { success: true, archived: true, id };
}

export async function getUserUploads(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const where: Prisma.WorksheetWhereInput = {
    uploadedBy: userId,
    status: { not: WorksheetStatus.ARCHIVED },
  };

  const [total, worksheets] = await Promise.all([
    db.worksheet.count({ where }),
    db.worksheet.findMany({
      where,
      select: publicWorksheetSelect,
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
      skip,
      take,
    }),
  ]);

  return {
    data: worksheets,
    meta: buildPaginationMeta(total, page, limit),
  };
}