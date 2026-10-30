/**
 * Application Constants & Official Curriculum Structure — Al-Musnad (المسند) v12.0
 */

export const APP_CONFIG = {
  name: "Al-Musnad",
  nameAr: "المسند",
  version: "16.0.0",
  description:
    "Integrated educational platform for institutions, inspectors, teachers, and students.",
  descriptionAr:
    "منصة المسند التربوية المتكاملة للمؤسسات التعليمية، المتفقدين، المسؤولين، المعلمين، والتلاميذ لتبادل واعتماد النشرات والوثائق البيداغوجية والإدارية.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_LOGIN_PASSWORD_ATTEMPTS = 6;

// Allowed MIME types: PDF + Word (.doc, .docx) + Images (.png, .jpg, .jpeg, .webp)
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
] as const;

export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];

export const ALLOWED_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
] as const;

export function isSupportedUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  if ((ALLOWED_FILE_TYPES as readonly string[]).includes(mime)) {
    return true;
  }
  return ALLOWED_FILE_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function isPdfUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return mime === "application/pdf" || name.endsWith(".pdf");
}

export function isWordUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return (
    mime === "application/msword" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".doc") ||
    name.endsWith(".docx")
  );
}

export function isImageUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return (
    mime.startsWith("image/") ||
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp")
  );
}

export function getFileFormatInfo(fileName?: string | null): {
  labelAr: string;
  shortExt: string;
  badgeClass: string;
} {
  const lower = (fileName || "").toLowerCase();
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) {
    return {
      labelAr: "ملف Word",
      shortExt: "DOCX",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    };
  }
  if (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp")
  ) {
    return {
      labelAr: "صورة تعليمية",
      shortExt: "IMG",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    };
  }
  return {
    labelAr: "ملف PDF",
    shortExt: "PDF",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
  };
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

export const STORAGE_BUCKETS = {
  WORKSHEETS: process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets",
} as const;

export const SIGNED_URL_EXPIRY_SECONDS = 3600;

// Official 6 Primary Grade Levels
export const CURRICULUM_GRADES = [
  { id: "g1", name: "Grade 1", nameAr: "السنة الأولى ابتدائي", slug: "grade-1", sortOrder: 1 },
  { id: "g2", name: "Grade 2", nameAr: "السنة الثانية ابتدائي", slug: "grade-2", sortOrder: 2 },
  { id: "g3", name: "Grade 3", nameAr: "السنة الثالثة ابتدائي", slug: "grade-3", sortOrder: 3 },
  { id: "g4", name: "Grade 4", nameAr: "السنة الرابعة ابتدائي", slug: "grade-4", sortOrder: 4 },
  { id: "g5", name: "Grade 5", nameAr: "السنة الخامسة ابتدائي", slug: "grade-5", sortOrder: 5 },
  { id: "g6", name: "Grade 6", nameAr: "السنة السادسة ابتدائي", slug: "grade-6", sortOrder: 6 },
] as const;

// Official Academic Subjects inside every Grade Level
export const CURRICULUM_SUBJECTS = [
  { id: "s1", name: "Mathematics", nameAr: "الرياضيات", slug: "math", color: "#DC2626", icon: "calculator", sortOrder: 1 },
  { id: "s2", name: "Science", nameAr: "العلوم (الإيقاظ العلمي)", slug: "science", color: "#16A34A", icon: "flask-conical", sortOrder: 2 },
  { id: "s3", name: "Arabic", nameAr: "العربية", slug: "arabic", color: "#2563EB", icon: "book-open", sortOrder: 3 },
  { id: "s4", name: "French", nameAr: "الفرنسية", slug: "french", color: "#4F46E5", icon: "languages", sortOrder: 4 },
  { id: "s5", name: "English", nameAr: "الإنجليزية", slug: "english", color: "#9333EA", icon: "globe", sortOrder: 5 },
  { id: "s6", name: "History & Geography", nameAr: "التاريخ والجغرافيا", slug: "history-geography", color: "#D97706", icon: "compass", sortOrder: 6 },
  { id: "s7", name: "Arts", nameAr: "الفنون", slug: "art", color: "#DB2777", icon: "palette", sortOrder: 7 },
  { id: "s8", name: "Islamic Education", nameAr: "التربية الإسلامية", slug: "islamic-studies", color: "#0D9488", icon: "moon-star", sortOrder: 8 },
  { id: "s9", name: "Physical Education", nameAr: "التربية البدنية", slug: "pe", color: "#65A30D", icon: "dumbbell", sortOrder: 9 },
] as const;

// Official 6 Pedagogical Sub-divisions inside every Subject (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى)
export const SUBJECT_SUBDIVISIONS = [
  { id: "c1", name: "Lesson", nameAr: "درس", slug: "lesson", sortOrder: 1 },
  { id: "c2", name: "Exercise", nameAr: "تمرين", slug: "worksheet", sortOrder: 2 },
  { id: "c3", name: "Exam", nameAr: "امتحان", slug: "exam", sortOrder: 3 },
  { id: "c4", name: "Lesson Plan (Fiche)", nameAr: "جذاذة", slug: "lesson-plan", sortOrder: 4 },
  { id: "c5", name: "Interactive Activity", nameAr: "نشاط تفاعلي", slug: "activity", sortOrder: 5 },
  { id: "c6", name: "Other Material", nameAr: "أخرى", slug: "other", sortOrder: 6 },
] as const;

// Administrative Category for «قسم الإدارة»
export const ADMINISTRATIVE_CATEGORY = {
  id: "c7",
  name: "Administrative Documents",
  nameAr: "وثائق ومعاملات إدارية",
  slug: "administrative",
  sortOrder: 7,
} as const;

// Role labels for display across the platform
export const ROLE_LABELS: Record<string, string> = {
  INSTITUTION: "مؤسسة تربوية",
  INSPECTOR: "متفقد تربوي",
  TEACHER: "معلم",
  STUDENT: "تلميذ",
  MODERATOR: "مسؤول إداري",
  ADMIN: "مشرف عام",
};

// Audience display labels
export const AUDIENCE_LABELS: Record<string, { label: string; isRestricted: boolean }> = {
  TEACHERS_ONLY: { label: "للمعلمين فقط (حجب عن التلاميذ)", isRestricted: true },
  SAME_ROLE_ONLY: { label: "لنفس فئة الناشر فقط", isRestricted: true },
  INSTITUTIONS_ONLY: { label: "للمؤسسات فقط", isRestricted: true },
  TEACHERS_AND_STUDENTS: { label: "للمعلمين والتلاميذ", isRestricted: false },
  ALL: { label: "للعموم", isRestricted: false },
};

// ============================================================================
// Private Local Test & Owner Admin Accounts (v14.0 — Hidden from public UI)
// ============================================================================
export interface DemoRoleAccount {
  id: string;
  role: "ADMIN" | "MODERATOR" | "INSPECTOR" | "INSTITUTION" | "TEACHER" | "STUDENT";
  roleTitleAr: string;
  badgeLabelAr: string;
  name: string;
  username: string;
  email: string;
  password: string;
  school: string;
  bio: string;
  isVerified: boolean;
  dashboardHref: string;
}

export const DEMO_ACCOUNT_DEFAULT_PASSWORD = "Musnad@2026";

export const DEMO_ROLE_ACCOUNTS: readonly DemoRoleAccount[] = [
  {
    id: "00000000-0000-4000-8000-000000000000",
    role: "ADMIN",
    roleTitleAr: "المشرف العام",
    badgeLabelAr: "مشرف عام",
    name: "Jasser",
    username: "jasser",
    email: "bjasser123@gmail.com",
    password: "Jasserbes1M",
    school: "إدارة منصة المسند",
    bio: "الحساب الرئيسي للمشرف العام على منصة المسند.",
    isVerified: true,
    dashboardHref: "/admin/dashboard",
  },
  {
    id: "00000000-0000-4000-8000-000000000001",
    role: "ADMIN",
    roleTitleAr: "المشرف العام",
    badgeLabelAr: "مشرف عام",
    name: "عبد الرحمان المنصوري",
    username: "admin",
    email: "admin@musnad.tn",
    password: DEMO_ACCOUNT_DEFAULT_PASSWORD,
    school: "إدارة منصة المسند",
    bio: "حساب المشرف العام للتجربة المحلية.",
    isVerified: true,
    dashboardHref: "/admin/dashboard",
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    role: "MODERATOR",
    roleTitleAr: "المسؤول الإداري",
    badgeLabelAr: "مسؤول",
    name: "سلمى بن علي",
    username: "moderator",
    email: "moderator@musnad.tn",
    password: DEMO_ACCOUNT_DEFAULT_PASSWORD,
    school: "إدارة المتابعة والدعم الفني",
    bio: "حساب المسؤول الإداري للتجربة المحلية.",
    isVerified: true,
    dashboardHref: "/moderator/dashboard",
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    role: "INSPECTOR",
    roleTitleAr: "المتفقد التربوي",
    badgeLabelAr: "متفقد",
    name: "كمال الورتاني",
    username: "inspector",
    email: "inspector@musnad.tn",
    password: DEMO_ACCOUNT_DEFAULT_PASSWORD,
    school: "تفقدية التعليم الابتدائي",
    bio: "حساب المتفقد التربوي للتجربة المحلية.",
    isVerified: true,
    dashboardHref: "/inspector/dashboard",
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    role: "INSTITUTION",
    roleTitleAr: "المؤسسة التربوية",
    badgeLabelAr: "مؤسسة",
    name: "المدرسة الابتدائية النموذجية بالمسند",
    username: "institution",
    email: "institution@musnad.tn",
    password: DEMO_ACCOUNT_DEFAULT_PASSWORD,
    school: "المدرسة الابتدائية النموذجية بالمسند",
    bio: "حساب المؤسسة التربوية للتجربة المحلية.",
    isVerified: true,
    dashboardHref: "/",
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    role: "TEACHER",
    roleTitleAr: "المعلم",
    badgeLabelAr: "معلم",
    name: "محمد أمين التونسي",
    username: "teacher",
    email: "teacher@musnad.tn",
    password: DEMO_ACCOUNT_DEFAULT_PASSWORD,
    school: "مدرسة النجاح الابتدائية",
    bio: "حساب المعلم للتجربة المحلية.",
    isVerified: true,
    dashboardHref: "/",
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    role: "STUDENT",
    roleTitleAr: "التلميذ",
    badgeLabelAr: "تلميذ",
    name: "ياسين بن صالح",
    username: "student",
    email: "student@musnad.tn",
    password: DEMO_ACCOUNT_DEFAULT_PASSWORD,
    school: "مدرسة النجاح الابتدائية — السنة السادسة ابتدائي",
    bio: "حساب التلميذ للتجربة المحلية.",
    isVerified: false,
    dashboardHref: "/",
  },
] as const;

export function findDemoAccountByIdentifier(identifier: string): DemoRoleAccount | undefined {
  const clean = identifier.trim().toLowerCase().replace(/^@/, "");
  return DEMO_ROLE_ACCOUNTS.find(
    (acc) =>
      acc.email.toLowerCase() === clean ||
      acc.username.toLowerCase() === clean ||
      acc.id === clean ||
      acc.role.toLowerCase() === clean
  );
}

export const WHATSAPP_SUPPORT_CHANNELS = {
  teachersAndStudents: {
    titleAr: "الرقم العام للمعلمين والتلاميذ",
    subtitleAr: "مخصص لتواصل المعلمين والتلاميذ مع الدعم الفني عبر الواتساب",
    displayNumber: "27764985",
    internationalNumber: "21627764985",
    whatsappUrl:
      "https://wa.me/21627764985?text=" +
      encodeURIComponent("السلام عليكم، أتواصل معكم من منصة المسند: "),
  },
  institutionsAndInspectors: {
    titleAr: "الرقم الخاص بالمؤسسات التربوية والمتفقدين",
    subtitleAr: "مخصص لتواصل المؤسسات التربوية والسادة المتفقدين عبر الواتساب",
    displayNumber: "46907101",
    internationalNumber: "21646907101",
    whatsappUrl:
      "https://wa.me/21646907101?text=" +
      encodeURIComponent("السلام عليكم، أتواصل معكم من منصة المسند (المؤسسات والمتفقدين): "),
  },
} as const;

// ============================================================================
// Tunisian School Trimesters (الثلاثيات المدرسية — السياق التربوي التونسي v15.0)
// ============================================================================
export interface SchoolTrimester {
  slug: "trimester-1" | "trimester-2" | "trimester-3";
  nameAr: string;
  nameFr: string;
  labelAr: string;
  keywords: readonly string[];
}

export const SCHOOL_TRIMESTERS: readonly SchoolTrimester[] = [
  {
    slug: "trimester-1",
    nameAr: "الثلاثي الأول",
    nameFr: "Trimestre 1",
    labelAr: "الثلاثي الأول (Trimestre 1)",
    keywords: ["الثلاثي الأول", "الثلاثي الاول", "ثلاثي أول", "ثلاثي 1", "Trimestre 1", "trimester-1"],
  },
  {
    slug: "trimester-2",
    nameAr: "الثلاثي الثاني",
    nameFr: "Trimestre 2",
    labelAr: "الثلاثي الثاني (Trimestre 2)",
    keywords: ["الثلاثي الثاني", "ثلاثي ثاني", "ثلاثي 2", "Trimestre 2", "trimester-2"],
  },
  {
    slug: "trimester-3",
    nameAr: "الثلاثي الثالث",
    nameFr: "Trimestre 3",
    labelAr: "الثلاثي الثالث (Trimestre 3)",
    keywords: ["الثلاثي الثالث", "ثلاثي ثالث", "ثلاثي 3", "Trimestre 3", "trimester-3"],
  },
] as const;

// ============================================================================
// School Semesters & Lesson Grouping Engine (تنظيم السداسيات وتجميع نفس الدرس v16.0)
// ============================================================================
export interface SchoolSemester {
  slug: "semester-1" | "semester-2";
  nameAr: string;
  nameFr: string;
  labelAr: string;
  keywords: readonly string[];
}

export const SCHOOL_SEMESTERS: readonly SchoolSemester[] = [
  {
    slug: "semester-1",
    nameAr: "السداسي الأول",
    nameFr: "Semestre 1",
    labelAr: "السداسي الأول (Semestre 1)",
    keywords: [
      "السداسي الأول",
      "السداسي الاول",
      "سداسي أول",
      "سداسي 1",
      "Semestre 1",
      "semester-1",
      "الثلاثي الأول",
    ],
  },
  {
    slug: "semester-2",
    nameAr: "السداسي الثاني",
    nameFr: "Semestre 2",
    labelAr: "السداسي الثاني (Semestre 2)",
    keywords: [
      "السداسي الثاني",
      "سداسي ثاني",
      "سداسي 2",
      "Semestre 2",
      "semester-2",
      "الثلاثي الثاني",
      "الثلاثي الثالث",
    ],
  },
] as const;

/**
 * Normalizes a worksheet's Lesson/Topic title and detects its Semester (`السداسي الأول` / `السداسي الثاني`)
 * so that when multiple teachers upload the same lesson for the same Grade and Subject,
 * they are automatically grouped into a single organized Lesson Section.
 */
export function extractLessonTopicAndSemester(ws: {
  title?: string | null;
  titleAr?: string | null;
  descriptionAr?: string | null;
  tags?: string[] | null;
}): {
  semesterSlug: "semester-1" | "semester-2" | "general";
  semesterLabelAr: string;
  lessonTopicKey: string;
  lessonTopicTitleAr: string;
} {
  const tags = Array.isArray(ws.tags) ? ws.tags : [];
  const combinedText = `${ws.titleAr || ""} ${ws.title || ""} ${ws.descriptionAr || ""} ${tags.join(" ")}`;

  let semesterSlug: "semester-1" | "semester-2" | "general" = "general";
  let semesterLabelAr = "جميع السداسيات";

  for (const sem of SCHOOL_SEMESTERS) {
    if (sem.keywords.some((kw) => combinedText.includes(kw))) {
      semesterSlug = sem.slug;
      semesterLabelAr = sem.nameAr;
      break;
    }
  }

  // Check if an explicit lesson tag `الدرس: ...` was provided during upload
  const explicitLessonTag = tags.find(
    (t) => t.startsWith("الدرس:") || t.startsWith("درس:") || t.startsWith("المحور:")
  );

  let rawTopic = explicitLessonTag
    ? explicitLessonTag.replace(/^(الدرس:|درس:|المحور:)\s*/, "").trim()
    : (ws.titleAr || ws.title || "درس عام").trim();

  // Strip common prefixes/suffixes (teacher names, brackets, category prefixes) to unify identical lessons
  const normalizedTopic = rawTopic
    .replace(/^(درس|تمارين|تمرين|امتحان|فرض|جذاذة|نشاط تفاعلي|إصلاح)\s*(في|حول|درس)?\s*[:\-–—]?\s*/i, "")
    .replace(/\s*[\(\[\-–—]\s*(الأستاذ|أستاذ|المعلم|معلم|مدرسة|إعداد).*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  const finalTitle = normalizedTopic.length >= 2 ? normalizedTopic : rawTopic;
  const lessonTopicKey = finalTitle
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^a-z0-9؀-ۿ\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();

  return {
    semesterSlug,
    semesterLabelAr,
    lessonTopicKey: lessonTopicKey || "general-lesson",
    lessonTopicTitleAr: finalTitle,
  };
}

/**
 * Differential Pedagogical Ranking (الترتيب التفاضلي للمنشورات داخل الدرس والمادة):
 * 1. Endorsed worksheets (`isEndorsed === true`) ALWAYS rise to the top.
 * 2. Then ordered by average rating (`ratingAvg`), downloads (`downloadCount`), and favorites (`favoriteCount`).
 */
export function sortWorksheetsDifferentially<
  T extends {
    isEndorsed?: boolean | null;
    ratingAvg?: number | null;
    downloadCount?: number | null;
    favoriteCount?: number | null;
    createdAt?: Date | string | null;
  }
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aEndorsed = a.isEndorsed ? 1 : 0;
    const bEndorsed = b.isEndorsed ? 1 : 0;
    if (bEndorsed !== aEndorsed) return bEndorsed - aEndorsed;

    const aRating = Number(a.ratingAvg || 0);
    const bRating = Number(b.ratingAvg || 0);
    if (bRating !== aRating) return bRating - aRating;

    const aPop = Number(a.downloadCount || 0) + Number(a.favoriteCount || 0) * 2;
    const bPop = Number(b.downloadCount || 0) + Number(b.favoriteCount || 0) * 2;
    if (bPop !== aPop) return bPop - aPop;

    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}
