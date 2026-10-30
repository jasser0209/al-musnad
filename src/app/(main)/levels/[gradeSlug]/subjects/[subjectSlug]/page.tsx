import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Plus,
  FileText,
  FolderOpen,
  Calendar,
  Award,
  Layers,
} from "lucide-react";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  SCHOOL_SEMESTERS,
  extractLessonTopicAndSemester,
  sortWorksheetsDifferentially,
} from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { listWorksheets } from "@/services/worksheet.service";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface SubjectPublicationsPageProps {
  params: Promise<{ gradeSlug: string; subjectSlug: string }>;
  searchParams: Promise<{
    category?: string;
    semester?: string;
    lesson?: string;
    search?: string;
  }>;
}

export default async function SubjectPublicationsPage(
  props: SubjectPublicationsPageProps
) {
  const { gradeSlug, subjectSlug } = await props.params;
  const sp = await props.searchParams;
  const activeCategorySlug = sp.category || "ALL";
  const activeSemesterSlug = sp.semester || "ALL";
  const activeLessonKey = sp.lesson || "ALL";
  const searchQuery = sp.search || "";

  const gradeInfo = CURRICULUM_GRADES.find((g) => g.slug === gradeSlug);
  const subjectInfo = CURRICULUM_SUBJECTS.find((s) => s.slug === subjectSlug);

  if (!gradeInfo || !subjectInfo) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let viewerRole: string | null = null;
  let viewerIsVerified = false;
  if (user) {
    try {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { role: true, isVerified: true },
      });
      viewerRole = dbUser?.role || "TEACHER";
      viewerIsVerified = Boolean(
        dbUser?.isVerified || viewerRole === "ADMIN" || viewerRole === "MODERATOR"
      );
    } catch {
      viewerRole = "TEACHER";
    }
  }

  const isAuthenticated = Boolean(user && viewerRole);

  let allSubjectWorksheets: any[] = [];
  try {
    const result = await listWorksheets(
      {
        page: 1,
        limit: 100,
        grade: gradeSlug,
        subject: subjectSlug,
        search: searchQuery || undefined,
        sort: "newest",
      },
      viewerRole,
      user?.id,
      viewerIsVerified
    );
    allSubjectWorksheets = sortWorksheetsDifferentially(result.data);
  } catch {
    allSubjectWorksheets = [];
  }

  const enrichedWorksheets = allSubjectWorksheets.map((ws) => ({
    ...ws,
    _meta: extractLessonTopicAndSemester(ws),
  }));

  const semesterFilteredWorksheets =
    activeSemesterSlug === "ALL"
      ? enrichedWorksheets
      : enrichedWorksheets.filter(
          (ws) =>
            ws._meta.semesterSlug === activeSemesterSlug ||
            ws._meta.semesterSlug === "general"
        );

  const validSlugs = new Set(SUBJECT_SUBDIVISIONS.map((s) => s.slug));
  const groupedBySection: Record<string, any[]> = {};
  for (const sub of SUBJECT_SUBDIVISIONS) {
    groupedBySection[sub.slug] = [];
  }

  for (const ws of semesterFilteredWorksheets) {
    const cSlug = ws.category?.slug;
    if (cSlug && validSlugs.has(cSlug as any)) {
      groupedBySection[cSlug].push(ws);
    } else {
      groupedBySection["other"].push(ws);
    }
  }

  const categoryFilteredWorksheets =
    activeCategorySlug === "ALL"
      ? semesterFilteredWorksheets
      : groupedBySection[activeCategorySlug] || [];

  const lessonGroupsMap = new Map<
    string,
    {
      key: string;
      titleAr: string;
      semesterLabelAr: string;
      items: any[];
      endorsedCount: number;
    }
  >();

  for (const ws of categoryFilteredWorksheets) {
    const key = ws._meta.lessonTopicKey;
    const existing = lessonGroupsMap.get(key);
    if (existing) {
      existing.items.push(ws);
      if (ws.isEndorsed) existing.endorsedCount += 1;
    } else {
      lessonGroupsMap.set(key, {
        key,
        titleAr: ws._meta.lessonTopicTitleAr,
        semesterLabelAr: ws._meta.semesterLabelAr,
        items: [ws],
        endorsedCount: ws.isEndorsed ? 1 : 0,
      });
    }
  }

  const lessonGroups = Array.from(lessonGroupsMap.values())
    .map((grp) => ({
      ...grp,
      items: sortWorksheetsDifferentially(grp.items),
    }))
    .sort((a, b) => {
      if (b.endorsedCount !== a.endorsedCount) return b.endorsedCount - a.endorsedCount;
      return b.items.length - a.items.length;
    });

  const visibleLessonGroups =
    activeLessonKey === "ALL"
      ? lessonGroups
      : lessonGroups.filter((g) => g.key === activeLessonKey);

  const buildFilterHref = (next: {
    category?: string;
    semester?: string;
    lesson?: string;
  }) => {
    const params = new URLSearchParams();
    const cat = next.category ?? activeCategorySlug;
    const sem = next.semester ?? activeSemesterSlug;
    const les = next.lesson ?? activeLessonKey;
    if (cat && cat !== "ALL") params.set("category", cat);
    if (sem && sem !== "ALL") params.set("semester", sem);
    if (les && les !== "ALL") params.set("lesson", les);
    if (searchQuery) params.set("search", searchQuery);
    const qs = params.toString();
    return `/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-700">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/levels" className="hover:text-blue-700">
              المستويات الدراسية المعتمدة
            </Link>
            <span>/</span>
            <Link href={`/levels/${gradeInfo.slug}`} className="hover:text-blue-700">
              {gradeInfo.nameAr}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{subjectInfo.nameAr}</span>
          </nav>

          {!isAuthenticated && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              <span>
                وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                <Link href="/login" className="underline">
                  تسجيل الدخول
                </Link>{" "}
                أو{" "}
                <Link href="/register" className="underline">
                  إنشاء الحساب
                </Link>
                .
              </span>
            </div>
          )}
        </div>

        {/* Subject Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <div
                style={{ backgroundColor: subjectInfo.color || "#2563EB" }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
              >
                <SubjectIcon slug={subjectInfo.slug} className="h-7 w-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {gradeInfo.nameAr} • {subjectInfo.nameAr}
                </span>
                <h1 className="mt-1.5 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                  مادة «{subjectInfo.nameAr}»
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  تصفح الدروس والتمارين والامتحانات والجذاذات منظمة حسب السداسي والمحاور التعليمية.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={`/levels/${gradeInfo.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <ArrowRight className="h-4 w-4" />
                العودة لمستودع المواد
              </Link>
              {isAuthenticated && viewerRole !== "STUDENT" && (
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4" />
                  إضافة ملف في هذه المادة
                </Link>
              )}
            </div>
          </div>

          {/* 1. Semester Tabs (`السداسي الأول` / `السداسي الثاني`) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>السداسي الدراسي:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={buildFilterHref({ semester: "ALL", lesson: "ALL" })}
                className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
                  activeSemesterSlug === "ALL"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                كل السداسيات ({enrichedWorksheets.length})
              </Link>
              {SCHOOL_SEMESTERS.map((sem) => {
                const isAct = activeSemesterSlug === sem.slug;
                return (
                  <Link
                    key={sem.slug}
                    href={buildFilterHref({ semester: sem.slug, lesson: "ALL" })}
                    className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
                      isAct
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {sem.nameAr}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 2. Pedagogical Sub-divisions Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={buildFilterHref({ category: "ALL", lesson: "ALL" })}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeCategorySlug === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              جميع الأقسام ({semesterFilteredWorksheets.length})
            </Link>
            {SUBJECT_SUBDIVISIONS.map((sub) => {
              const active = activeCategorySlug === sub.slug;
              const secCount = groupedBySection[sub.slug]?.length ?? 0;
              return (
                <Link
                  key={sub.slug}
                  href={buildFilterHref({ category: sub.slug, lesson: "ALL" })}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-blue-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  قسم: {sub.nameAr} ({secCount})
                </Link>
              );
            })}
          </div>

          {/* 3. Lesson Topic Index */}
          {lessonGroups.length > 1 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600 dark:text-slate-300">
                <Layers className="h-4 w-4 text-amber-500" />
                <span>فهرس الدروس والمحاور:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={buildFilterHref({ lesson: "ALL" })}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold border transition ${
                    activeLessonKey === "ALL"
                      ? "bg-amber-500 text-slate-950 border-amber-500 font-black"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  كل الدروس ({lessonGroups.length})
                </Link>
                {lessonGroups.map((grp) => (
                  <Link
                    key={grp.key}
                    href={buildFilterHref({
                      lesson: activeLessonKey === grp.key ? "ALL" : grp.key,
                    })}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold border transition inline-flex items-center gap-1.5 ${
                      activeLessonKey === grp.key
                        ? "bg-amber-500 text-slate-950 border-amber-500 font-black shadow-sm"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-400"
                    }`}
                  >
                    <FolderOpen className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>{grp.titleAr}</span>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-black">
                      {grp.items.length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Organized Lesson Sections */}
        {visibleLessonGroups.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-14 text-center dark:border-slate-800 dark:bg-slate-900">
            <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              لا توجد ملفات مرفوعة في هذا القسم حالياً
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              كن أول من يثري مادة «{subjectInfo.nameAr}» ({gradeInfo.nameAr}) بنشر ملف تربوي جديد.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {visibleLessonGroups.map((grp) => (
              <section
                key={grp.key}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300">
                      <FolderOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">
                          {grp.titleAr}
                        </h2>
                        <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-extrabold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                          {grp.items.length} {grp.items.length === 1 ? "ملف" : "ملفات"}
                        </span>
                        {grp.endorsedCount > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-xs font-black text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300">
                            <Award className="h-3.5 w-3.5 text-amber-600" />
                            <span>{grp.endorsedCount} معتمد بيداغوجياً</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {grp.semesterLabelAr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {grp.items.map((ws) => (
                    <WorksheetCard
                      key={ws.id}
                      worksheet={ws}
                      guestTitleOnly={!isAuthenticated}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}