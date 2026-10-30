import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Plus,
  FileText,
  FolderOpen,
} from "lucide-react";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
} from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { listWorksheets } from "@/services/worksheet.service";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface SubjectPublicationsPageProps {
  params: Promise<{ gradeSlug: string; subjectSlug: string }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function SubjectPublicationsPage(
  props: SubjectPublicationsPageProps
) {
  const { gradeSlug, subjectSlug } = await props.params;
  const sp = await props.searchParams;
  const activeCategorySlug = sp.category || "ALL";
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
  if (user) {
    try {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      viewerRole = dbUser?.role || "TEACHER";
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
        limit: 50,
        grade: gradeSlug,
        subject: subjectSlug,
        search: searchQuery || undefined,
        sort: "newest",
      },
      viewerRole,
      user?.id
    );
    allSubjectWorksheets = result.data;
  } catch {
    allSubjectWorksheets = [];
  }

  // Group files into their exact pedagogical section (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى)
  const validSlugs = new Set(SUBJECT_SUBDIVISIONS.map((s) => s.slug));
  const groupedBySection: Record<string, any[]> = {};
  for (const sub of SUBJECT_SUBDIVISIONS) {
    groupedBySection[sub.slug] = [];
  }

  for (const ws of allSubjectWorksheets) {
    const cSlug = ws.category?.slug;
    if (cSlug && validSlugs.has(cSlug as any)) {
      groupedBySection[cSlug].push(ws);
    } else {
      groupedBySection["other"].push(ws);
    }
  }

  const displayedWorksheets =
    activeCategorySlug === "ALL"
      ? allSubjectWorksheets
      : groupedBySection[activeCategorySlug] || [];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-700">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/levels" className="hover:text-blue-700">
              المستويات الدراسية المعتمدة
            </Link>
            <span>/</span>
            <Link
              href={`/levels/${gradeInfo.slug}`}
              className="hover:text-blue-700"
            >
              {gradeInfo.nameAr}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">
              {subjectInfo.nameAr}
            </span>
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

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
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
                  ملفات وأقسام مادة «{subjectInfo.nameAr}»
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  كل ملف يحمل اسم المادة والسنة الدراسية ونوع الملف، ومرتب في القسم المناسب له (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى).
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

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link
              href={`/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}`}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeCategorySlug === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              جميع الأقسام ({allSubjectWorksheets.length})
            </Link>
            {SUBJECT_SUBDIVISIONS.map((sub) => {
              const active = activeCategorySlug === sub.slug;
              const secCount = groupedBySection[sub.slug]?.length ?? 0;
              return (
                <Link
                  key={sub.slug}
                  href={`/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}?category=${sub.slug}`}
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
        </div>

        {displayedWorksheets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-14 text-center dark:border-slate-800 dark:bg-slate-900">
            <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              لا توجد ملفات مرفوعة في هذا القسم حالياً
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              كن أول من يثري مادة «{subjectInfo.nameAr}» ({gradeInfo.nameAr}) بنشر ملف تربوي جديد.
            </p>
          </div>
        ) : activeCategorySlug === "ALL" ? (
          <div className="space-y-8">
            {SUBJECT_SUBDIVISIONS.map((sub) => {
              const sectionFiles = groupedBySection[sub.slug] || [];
              if (sectionFiles.length === 0) return null;
              return (
                <section
                  key={sub.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        قسم: {sub.nameAr}
                      </h2>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-extrabold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {sectionFiles.length} ملف
                      </span>
                    </div>
                    <Link
                      href={`/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}?category=${sub.slug}`}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      عرض هذا القسم فقط ←
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sectionFiles.map((ws) => (
                      <WorksheetCard
                        key={ws.id}
                        worksheet={ws}
                        guestTitleOnly={!isAuthenticated}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedWorksheets.map((ws) => (
              <WorksheetCard
                key={ws.id}
                worksheet={ws}
                guestTitleOnly={!isAuthenticated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
