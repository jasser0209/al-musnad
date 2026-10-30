import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ArrowRight,
  Lock,
  Library,
} from "lucide-react";
import { CURRICULUM_GRADES, CURRICULUM_SUBJECTS } from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface GradeSubjectsPageProps {
  params: Promise<{ gradeSlug: string }>;
}

export default async function GradeSubjectsPage(props: GradeSubjectsPageProps) {
  const { gradeSlug } = await props.params;

  const gradeInfo = CURRICULUM_GRADES.find((g) => g.slug === gradeSlug);
  if (!gradeInfo) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  const subjectCounts: Record<string, number> = {};
  for (const s of CURRICULUM_SUBJECTS) subjectCounts[s.slug] = 0;

  try {
    await ensureOfficialTaxonomySeeded();
    const worksheetsInGrade = await db.worksheet.findMany({
      where: {
        status: "PUBLISHED",
        grade: { slug: gradeSlug },
      },
      select: {
        subject: { select: { slug: true } },
      },
    });

    for (const w of worksheetsInGrade) {
      const sSlug = w.subject?.slug;
      if (sSlug && subjectCounts[sSlug] !== undefined) {
        subjectCounts[sSlug] += 1;
      }
    }
  } catch {
    // Fallback counts if database is offline
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-700 dark:hover:text-blue-400">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/levels" className="hover:text-blue-700 dark:hover:text-blue-400">
              المستويات الدراسية المعتمدة
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{gradeInfo.nameAr}</span>
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

        {/* Grade Header & Materials Repository Grid */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-600/20">
                <Library className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                  {gradeInfo.nameAr}
                </span>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                  مستودع المواد الدراسية — {gradeInfo.nameAr}
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  اختر المادة الدراسية لتصفح الملفات مصنفة حسب القسم المناسب (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى).
                </p>
              </div>
            </div>

            <Link
              href="/levels"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ArrowRight className="h-4 w-4" />
              العودة للمستويات الدراسية المعتمدة
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_SUBJECTS.map((subj) => {
              const count = subjectCounts[subj.slug] ?? 0;
              return (
                <Link
                  key={subj.slug}
                  href={`/levels/${gradeInfo.slug}/subjects/${subj.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:-translate-y-1 hover:border-indigo-600 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-indigo-500 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      style={{ backgroundColor: subj.color || "#4f46e5" }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition-transform group-hover:scale-105"
                      title={subj.nameAr}
                    >
                      <SubjectIcon slug={subj.slug} className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {subj.nameAr}
                      </h2>
                      <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        درس • تمرين • امتحان • جذاذة • نشاط تفاعلي • أخرى ({count} ملف)
                      </p>
                    </div>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}