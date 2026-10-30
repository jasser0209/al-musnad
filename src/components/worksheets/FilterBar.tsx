"use client";

/**
 * Filter & Search Bar Component — Al-Musnad (المسند) v15.0
 *
 * Includes Tunisian School Trimester filtering (`الثلاثي الأول`, `الثلاثي الثاني`, `الثلاثي الثالث`)
 * alongside keyword search, grade level, subject, category, and sorting.
 */

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";
import { SCHOOL_TRIMESTERS } from "@/config/constants";
import type { Grade, Subject, Category } from "@/types/api";

interface FilterBarProps {
  grades: (Grade | { id: string; name: string; nameAr?: string; slug?: string })[];
  subjects: (Subject | { id: string; name: string; nameAr?: string; slug?: string })[];
  categories: (Category | { id: string; name: string; nameAr?: string; slug?: string })[];
}

export default function FilterBar({ grades, subjects, categories }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const currentSubject = searchParams.get("subject") ?? searchParams.get("subjectId") ?? "";
  const currentGrade = searchParams.get("grade") ?? searchParams.get("gradeId") ?? "";
  const currentCategory = searchParams.get("category") ?? searchParams.get("categoryId") ?? "";
  const currentTrimester = searchParams.get("trimester") ?? "";
  const currentSort = searchParams.get("sort") ?? "newest";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === "subject") params.delete("subjectId");
    if (key === "grade") params.delete("gradeId");
    if (key === "category") params.delete("categoryId");

    params.set("page", "1");
    router.push(`/?${params.toString()}#catalog`);
  }

  function resetAllFilters() {
    router.push("/#catalog");
  }

  return (
    <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
      {/* Quick Trimester Pills Bar (الثلاثيات المدرسية التونسية) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>تصفية حسب الثلاثي الدراسي:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => updateFilter("trimester", "")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              !currentTrimester
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            كل الثلاثيات
          </button>
          {SCHOOL_TRIMESTERS.map((tri) => {
            const active = currentTrimester === tri.slug;
            return (
              <button
                key={tri.slug}
                type="button"
                onClick={() => updateFilter("trimester", active ? "" : tri.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700"
                }`}
              >
                {tri.labelAr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 6-Column Filter Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            البحث بالكلمات المفتاحية
          </label>
          <input
            type="search"
            defaultValue={currentSearch}
            placeholder="ابحث عن عنوان الدرس أو التمرين أو الامتحان..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilter("search", (e.target as HTMLInputElement).value);
              }
            }}
            onBlur={(e) => updateFilter("search", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            المستوى الدراسي
          </label>
          <select
            value={currentGrade}
            onChange={(e) => updateFilter("grade", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">جميع المستويات</option>
            {grades.map((g) => (
              <option key={g.id} value={g.slug || g.id}>
                {g.nameAr || g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            المادة الدراسية
          </label>
          <select
            value={currentSubject}
            onChange={(e) => updateFilter("subject", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">جميع المواد</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.slug || s.id}>
                {s.nameAr || s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            الثلاثي الدراسي
          </label>
          <select
            value={currentTrimester}
            onChange={(e) => updateFilter("trimester", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">كل الثلاثيات</option>
            {SCHOOL_TRIMESTERS.map((tri) => (
              <option key={tri.slug} value={tri.slug}>
                {tri.labelAr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            التقسيم / الترتيب
          </label>
          <div className="flex gap-2">
            <select
              value={currentCategory}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-1/2 rounded-xl border border-slate-300 bg-slate-50 px-2 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">النوع</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug || c.id}>
                  {c.nameAr || c.name}
                </option>
              ))}
            </select>

            <select
              value={currentSort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="w-1/2 rounded-xl border border-slate-300 bg-slate-50 px-2 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="newest">الأحدث</option>
              <option value="popular">الأكثر تحميلاً</option>
              <option value="oldest">الأقدم</option>
            </select>
          </div>
        </div>
      </div>

      {(currentSearch || currentSubject || currentGrade || currentCategory || currentTrimester) && (
        <div className="mt-2 flex items-center justify-end border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            type="button"
            onClick={resetAllFilters}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer"
          >
            إعادة تعيين جميع الفلاتر ✕
          </button>
        </div>
      )}
    </div>
  );
}

export { FilterBar };
