import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ChevronLeft,
  Lock,
  ArrowRight,
  FolderOpen,
} from "lucide-react";
import { CURRICULUM_GRADES } from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";

export default async function GradeLevelsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  const countMap: Record<string, number> = {};

  try {
    await ensureOfficialTaxonomySeeded();
    const gradesInDb = await db.grade.findMany({
      include: {
        _count: { select: { worksheets: { where: { status: "PUBLISHED" } } } },
      },
    });

    for (const g of gradesInDb) {
      countMap[g.slug] = g._count.worksheets;
    }
  } catch {
    // Fallback counts if database is offline
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 dark:text-slate-400"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الصفحة الرئيسية
          </Link>

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

        {/* Approved Grade Levels Only */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20 shrink-0">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400">
                البوابة المنهجية للمستويات والمواد الدراسية
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                المستويات الدراسية المعتمدة
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اختر المستوى الدراسي للدخول مباشرة إلى مستودع المواد الدراسية والأقسام البيداغوجية الخاصة به.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_GRADES.map((grade) => {
              const count = countMap[grade.slug] ?? 0;
              return (
                <Link
                  key={grade.slug}
                  href={`/levels/${grade.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all hover:-translate-y-1 hover:border-blue-600 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-500"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white shadow-md">
                      {grade.sortOrder}
                    </span>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                        {grade.nameAr}
                      </h2>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <FolderOpen className="h-3.5 w-3.5 text-blue-600" />
                        <span>مستودع المواد الدراسية • {count} ملف</span>
                      </p>
                    </div>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
