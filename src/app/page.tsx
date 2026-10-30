/**
 * Al-Musnad (المسند) — Main Landing, Role-Personalized Workspace & Discovery Page (v12.0)
 *
 * Implements all v12.0 User Directives:
 * 1. Complete Main Navigation Bar for Visitors & Members:
 *    - القائمة الرئيسية (`/`)
 *    - مستودع المواد والمستويات (`/levels`)
 *    - قائمة النشرات (`/#catalog`)
 *    - قسم الإدارة (`/#administration-section` — hidden for `STUDENT`, shown for Teachers, Inspectors & Institutions)
 *    - قسم من نحن وتعريف الهوية (`/#about-us`)
 *    - تفسير مزايا كل فئة من المشتركين (`/#roles-guide`)
 *    - قسم الأسئلة الشائعة (`/#faq-section`)
 * 2. Role-Personalized Top Workspace (`RolePersonalizedHub`):
 *    - Institutions see the exclusive Institution Publications Hub at the top.
 *    - Inspectors see the exclusive Inspector Publications Hub at the top.
 *    - Teachers see the exclusive Teacher Publications Hub at the top.
 *    - Students see their distraction-free Student Study Hub (with Administration removed).
 */

import React, { Suspense } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Sparkles,
  BookCheck,
  Award,
  Library,
  Layers,
  Lock,
  ShieldCheck,
  Compass,
  HelpCircle,
  Users,
  FileText,
  Briefcase,
} from "lucide-react";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  listWorksheets,
  canUserAccessWorksheet,
} from "@/services/worksheet.service";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  ADMINISTRATIVE_CATEGORY,
} from "@/config/constants";
import FilterBar from "@/components/worksheets/FilterBar";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import CurriculumAndAdminExplorer from "@/components/worksheets/CurriculumAndAdminExplorer";
import RolePersonalizedHub from "@/components/worksheets/RolePersonalizedHub";
import PlatformIdentityAndFaqSection from "@/components/home/PlatformIdentityAndFaqSection";
import type { WorksheetSortOption } from "@/types/api";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ROLE_LABELS_AR: Record<string, string> = {
  INSTITUTION: "حساب مؤسسة تربوية",
  INSPECTOR: "حساب متفقد تربوي",
  TEACHER: "حساب معلم",
  STUDENT: "حساب تلميذ",
  MODERATOR: "حساب مسؤول إداري",
  ADMIN: "حساب مشرف عام",
};

const DEMO_WORKSHEETS = [
  {
    id: "demo-fr-1",
    title: "Leçon de lecture et vocabulaire — Français",
    titleAr: "درس القراءة والمفردات الأساسية في اللغة الفرنسية",
    description: "French lesson",
    descriptionAr: "درس متكامل في اللغة الفرنسية للسنة الأولى ابتدائي.",
    fileUrl: "/sample.pdf",
    fileName: "francais-lecon1.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 640,
    pageCount: 3,
    status: "PUBLISHED" as const,
    audience: "ALL" as const,
    isEndorsed: true,
    downloadCount: 210,
    favoriteCount: 75,
    ratingAvg: 4.9,
    reviewCount: 14,
    tags: ["فرنسية", "درس"],
    createdAt: new Date("2026-10-28"),
    updatedAt: new Date("2026-10-28"),
    gradeId: "g1",
    subjectId: "s4",
    categoryId: "c1",
    uploadedBy: "u1",
    grade: CURRICULUM_GRADES[0],
    subject: CURRICULUM_SUBJECTS[3],
    category: SUBJECT_SUBDIVISIONS[0],
    uploader: {
      id: "u1",
      name: "معلم ناشر",
      school: "مدرسة ابتدائية",
      role: "TEACHER",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
  {
    id: "demo-inst-1",
    title: "Institutional Annual Project & Charter",
    titleAr: "مشروع المؤسسة التربوية السنوي وميثاق العمل المشترك بين المدارس",
    description: "Institution publication",
    descriptionAr: "مبادرة تربوية ونموذج تنسيقي مخصص للتفاعل بين المؤسسات التربوية.",
    fileUrl: "/sample.pdf",
    fileName: "institution-project.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 820,
    pageCount: 5,
    status: "PUBLISHED" as const,
    audience: "INSTITUTIONS_ONLY" as const,
    isEndorsed: true,
    downloadCount: 165,
    favoriteCount: 52,
    ratingAvg: 4.9,
    reviewCount: 11,
    tags: ["مؤسسات", "مشروع مؤسسة"],
    createdAt: new Date("2026-10-27"),
    updatedAt: new Date("2026-10-27"),
    gradeId: "g1",
    subjectId: "s3",
    categoryId: "c6",
    uploadedBy: "u2",
    grade: CURRICULUM_GRADES[0],
    subject: CURRICULUM_SUBJECTS[2],
    category: SUBJECT_SUBDIVISIONS[5],
    uploader: {
      id: "u2",
      name: "مؤسسة تربوية نموذجية",
      school: "مدرسة ابتدائية",
      role: "INSTITUTION",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
  {
    id: "demo-fr-3",
    title: "Fiche pédagogique — Français (للمعلمين فقط)",
    titleAr: "جذاذة بيداغوجية وإصلاح تقييم اللغة الفرنسية",
    description: "Teacher fiche",
    descriptionAr: "جذاذة بيداغوجية مخصصة للمعلمين والمتفقدين فقط.",
    fileUrl: "/sample.pdf",
    fileName: "francais-fiche.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 750,
    pageCount: 4,
    status: "PUBLISHED" as const,
    audience: "TEACHERS_ONLY" as const,
    isEndorsed: true,
    downloadCount: 185,
    favoriteCount: 64,
    ratingAvg: 5.0,
    reviewCount: 15,
    tags: ["فرنسية", "جذاذات", "إصلاح"],
    createdAt: new Date("2026-10-27"),
    updatedAt: new Date("2026-10-27"),
    gradeId: "g1",
    subjectId: "s4",
    categoryId: "c4",
    uploadedBy: "u1",
    grade: CURRICULUM_GRADES[0],
    subject: CURRICULUM_SUBJECTS[3],
    category: SUBJECT_SUBDIVISIONS[3],
    uploader: {
      id: "u1",
      name: "متفقد تربوي",
      school: "دائرة التفقد التربوي",
      role: "INSPECTOR",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
  {
    id: "demo-admin-1",
    title: "Teacher Administrative Schedule & Annual Plan",
    titleAr: "نموذج جدول الأوقات والتوزيع السنوي ومحضر الجلسة البيداغوجية",
    description: "Administrative document for teachers",
    descriptionAr: "وثيقة إدارية تنظيمية خاصة بالمعلم والمؤسسة التربوية.",
    fileUrl: "/sample.pdf",
    fileName: "admin-schedule-doc.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 540,
    pageCount: 2,
    status: "PUBLISHED" as const,
    audience: "ALL" as const,
    isEndorsed: true,
    downloadCount: 310,
    favoriteCount: 95,
    ratingAvg: 4.9,
    reviewCount: 22,
    tags: ["وثائق إدارية", "جداول الأوقات", "مذكرات ومراسلات"],
    createdAt: new Date("2026-10-26"),
    updatedAt: new Date("2026-10-26"),
    gradeId: "g1",
    subjectId: "s10",
    categoryId: "c7",
    uploadedBy: "u1",
    grade: CURRICULUM_GRADES[0],
    subject: {
      id: "s10",
      name: "Administration",
      nameAr: "المعاملات والوثائق الإدارية",
      slug: "administration",
      color: "#334155",
      icon: "briefcase",
      sortOrder: 10,
    },
    category: ADMINISTRATIVE_CATEGORY,
    uploader: {
      id: "u1",
      name: "إدارة المسند",
      school: "الدائرة التربوية",
      role: "INSPECTOR",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
];

export default async function HomePage(props: HomePageProps) {
  const resolvedParams = await props.searchParams;

  const page = Number(resolvedParams.page) || 1;
  const search =
    typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;
  const grade =
    typeof resolvedParams.grade === "string" ? resolvedParams.grade : undefined;
  const subject =
    typeof resolvedParams.subject === "string"
      ? resolvedParams.subject
      : undefined;
  const category =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : undefined;
  const trimester =
    typeof resolvedParams.trimester === "string"
      ? resolvedParams.trimester
      : undefined;
  const sort = (
    typeof resolvedParams.sort === "string" ? resolvedParams.sort : "newest"
  ) as WorksheetSortOption;

  let grades: any[] = [...CURRICULUM_GRADES];
  let subjects: any[] = [...CURRICULUM_SUBJECTS];
  let categories: any[] = [...SUBJECT_SUBDIVISIONS, ADMINISTRATIVE_CATEGORY];
  let worksheets: any[] = [];
  let explorerWorksheets: any[] = [];
  let meta = { total: 0, page, limit: 12, totalPages: 1 };
  let isDbConnected = true;

  let viewerUserId: string | null = null;
  let viewerRole: string | null = null;
  let viewerName: string | null = null;
  let viewerStudentGrade: string | null = null;
  let viewerIsVerified: boolean = false;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      viewerUserId = user.id;
      try {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { role: true, name: true, studentGrade: true, isVerified: true },
        });
        viewerRole =
          dbUser?.role ||
          (user.user_metadata?.role as string | undefined) ||
          "TEACHER";
        viewerName =
          dbUser?.name ||
          (user.user_metadata?.name as string | undefined) ||
          null;
        viewerStudentGrade =
          dbUser?.studentGrade ||
          (user.user_metadata?.student_grade as string | undefined) ||
          null;
        viewerIsVerified = Boolean(
          dbUser?.isVerified ||
            viewerRole === "ADMIN" ||
            viewerRole === "MODERATOR"
        );
      } catch {
        viewerRole =
          (user.user_metadata?.role as string | undefined) || "TEACHER";
      }
    }
  } catch {
    // Guest visitor
  }

  const isAuthenticated = Boolean(viewerUserId && viewerRole);

  try {
    const [
      fetchedGrades,
      fetchedSubjects,
      fetchedCategories,
      fetchedCatalog,
      fetchedExplorer,
    ] = await Promise.all([
      db.grade.findMany({ orderBy: { sortOrder: "asc" } }),
      db.subject.findMany({ orderBy: { sortOrder: "asc" } }),
      db.category.findMany({ orderBy: { sortOrder: "asc" } }),
      listWorksheets(
        {
          page,
          limit: 12,
          search,
          grade,
          subject,
          category,
          trimester,
          sort,
        },
        viewerRole,
        viewerUserId,
        viewerIsVerified
      ),
      listWorksheets(
        {
          page: 1,
          limit: 50,
          sort: "newest",
        },
        viewerRole,
        viewerUserId,
        viewerIsVerified
      ),
    ]);

    if (fetchedGrades.length > 0) grades = fetchedGrades;
    if (fetchedSubjects.length > 0) subjects = fetchedSubjects;
    if (fetchedCategories.length > 0) categories = fetchedCategories;
    worksheets = fetchedCatalog.data;
    explorerWorksheets = fetchedExplorer.data;
    meta = fetchedCatalog.meta;
  } catch {
    isDbConnected = false;
    const visibleDemo = isAuthenticated
      ? DEMO_WORKSHEETS.filter((w) =>
          canUserAccessWorksheet(w, viewerRole, viewerUserId)
        )
      : DEMO_WORKSHEETS.filter((w) => w.audience === "ALL");

    worksheets = visibleDemo;
    explorerWorksheets = visibleDemo;
    meta = {
      total: visibleDemo.length,
      page: 1,
      limit: 12,
      totalPages: 1,
    };
  }

  // For Students, also filter out administrative documents from the general catalog
  const displayedCatalogWorksheets =
    viewerRole === "STUDENT"
      ? worksheets.filter(
          (w) =>
            w.category?.slug !== "administrative" &&
            w.subject?.slug !== "administration"
        )
      : worksheets;

  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (grade) params.set("grade", grade);
    if (subject) params.set("subject", subject);
    if (category) params.set("category", category);
    if (trimester) params.set("trimester", trimester);
    if (sort && sort !== "newest") params.set("sort", sort);
    params.set("page", String(targetPage));
    return `/?${params.toString()}`;
  };

  return (
    <div className="space-y-12 pb-16">
      {!isDbConnected && (
        <div
          className="bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-800 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200 flex flex-wrap items-center justify-center gap-2"
          dir="rtl"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>الوضع التجريبي لمنصة المسند:</strong> يتم حالياً عرض البيانات التجريبية للمستويات والمواد والنشرات.
          </span>
        </div>
      )}

      {/* Hero Section: المسند */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-700 via-indigo-800 to-slate-900 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>منصة المسند التربوية والبيداغوجية المعتمدة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            المرجع التربوي الموثوق للمؤسسات، <br className="hidden sm:inline" />
            <span className="text-amber-300">المتفقدين، المعلمين، والتلاميذ</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-base sm:text-lg leading-relaxed font-normal">
            {viewerRole === "STUDENT"
              ? "تصفح مستواك الدراسي، المواد التعليمية، الدروس المبسطة، التمارين التطبيقية، والامتحانات المعتمدة."
              : "تصفح المستويات الدراسية المعتمدة، المواد التعليمية، الجذاذات، التمارين، الامتحانات، وقسم المعاملات الإدارية."}
          </p>

          {/* Main Quick Navigation Menu Bar inside Hero (Well-spaced & Role-Aware) */}
          <div
            dir="rtl"
            className="pt-4 flex flex-wrap justify-center items-center gap-3.5 sm:gap-5"
          >
            <Link
              href="/"
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>الرئيسية</span>
            </Link>

            <Link
              href="/levels"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-400/20 transition transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <Library className="w-4 h-4" />
              <span>{isAuthenticated ? "مستودع المواد" : "مستودع المواد والمستويات"}</span>
            </Link>

            <a
              href="#catalog"
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>النشرات</span>
            </a>

            {viewerRole === "INSPECTOR" && (
              <a
                href="#role-personalized-hub"
                className="px-5 py-3 bg-amber-500/30 hover:bg-amber-500/45 text-amber-200 font-extrabold text-xs sm:text-sm rounded-xl border border-amber-300/40 backdrop-blur-sm transition inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>للمتفقدين</span>
              </a>
            )}

            {viewerRole === "TEACHER" && (
              <a
                href="#role-personalized-hub"
                className="px-5 py-3 bg-blue-500/30 hover:bg-blue-500/45 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-blue-300/40 backdrop-blur-sm transition inline-flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>للمعلمين</span>
              </a>
            )}

            {viewerRole === "INSTITUTION" && (
              <a
                href="#role-personalized-hub"
                className="px-5 py-3 bg-indigo-500/30 hover:bg-indigo-500/45 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-indigo-300/40 backdrop-blur-sm transition inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-amber-300" />
                <span>للمؤسسات</span>
              </a>
            )}

            {(viewerRole === "ADMIN" || viewerRole === "MODERATOR") && (
              <a
                href="#role-personalized-hub"
                className="px-5 py-3 bg-purple-500/30 hover:bg-purple-500/45 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-purple-300/40 backdrop-blur-sm transition inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>فضاءات الفئات</span>
              </a>
            )}

            <a
              href="#learn-more"
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>اعرف المزيد</span>
            </a>
          </div>

          {/* Approved 4 Value Pillars */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-xs text-blue-100">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <BookCheck className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                مراجع متوافقة مع النظام التربوي
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <Award className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                اعتماد من عند أفضل المتفقدين
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <Library className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                مكتبة متنوعة
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <Layers className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                توافق مع جميع المستويات
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 1. الفضاء المخصص حسب فئة المستخدم في أعلى الصفحة (للمؤسسات / المتفقدين / المعلمين / التلاميذ) */}
      {/* =================================================================== */}
      {isAuthenticated && (
        <RolePersonalizedHub
          worksheets={explorerWorksheets as any}
          viewerRole={viewerRole}
          viewerName={viewerName}
          viewerStudentGrade={viewerStudentGrade}
          viewerIsVerified={viewerIsVerified}
        />
      )}

      {/* =================================================================== */}
      {/* 2. مستودع المستويات المعتمدة + قسم الإدارة (مخفي عن التلاميذ)           */}
      {/* =================================================================== */}
      <CurriculumAndAdminExplorer
        worksheets={explorerWorksheets as any}
        isAuthenticated={isAuthenticated}
        viewerRole={viewerRole}
      />

      {/* =================================================================== */}
      {/* 3. قائمة النشرات العامة (#catalog)                                   */}
      {/* =================================================================== */}
      <section
        id="catalog"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  قائمة النشرات التربوية
                </h2>
                {isAuthenticated ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      النشرات المتاحة لـ: {ROLE_LABELS_AR[viewerRole || ""] || viewerRole}
                    </span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                      <Link href="/login" className="underline hover:text-blue-700">
                        تسجيل الدخول
                      </Link>{" "}
                      أو{" "}
                      <Link href="/register" className="underline hover:text-blue-700">
                        إنشاء الحساب
                      </Link>
                      .
                    </span>
                  </span>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                إجمالي الملفات المعروضة:{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {displayedCatalogWorksheets.length}
                </span>{" "}
                ملف تربوي
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            }
          >
            <FilterBar
              grades={grades}
              subjects={
                viewerRole === "STUDENT"
                  ? subjects.filter((s) => s.slug !== "administration")
                  : subjects
              }
              categories={
                viewerRole === "STUDENT"
                  ? categories.filter((c) => c.slug !== "administrative")
                  : categories
              }
            />
          </Suspense>
        </div>

        {displayedCatalogWorksheets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCatalogWorksheets.map((worksheet) => (
              <WorksheetCard
                key={worksheet.id}
                worksheet={worksheet}
                guestTitleOnly={!isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-base">
              لا توجد نشرات مطابقة لخيارات البحث المحددة
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 rounded-lg transition"
            >
              إعادة ضبط الفلاتر
            </Link>
          </div>
        )}

        {meta.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-200 dark:border-slate-800">
            {page > 1 && (
              <Link
                href={buildPageUrl(page - 1)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                الصفحة السابقة
              </Link>
            )}
            {page < meta.totalPages && (
              <Link
                href={buildPageUrl(page + 1)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                الصفحة التالية
              </Link>
            )}
          </div>
        )}
      </section>

      {/* =================================================================== */}
      {/* 4. قسم من نحن + دليل فئات المشتركين والميزات + الأسئلة الشائعة        */}
      {/* =================================================================== */}
      <PlatformIdentityAndFaqSection />
    </div>
  );
}
