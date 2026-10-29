"use client";

/**
 * Curriculum & Administration Explorer on the Main Landing Page — Al-Musnad v10.0
 *
 * Updates in v10.0:
 * 1. Fixed administrative category slug check (`administrative` and `administrative-docs` and `administration`)
 *    so administrative documents always appear properly in «قسم الإدارة والمعاملات الإدارية».
 * 2. Added a prominent button to open the dedicated Materials & Levels Repository page (`/levels`)
 *    so clicking to browse Materials/Levels navigates directly to `/levels`.
 */

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Lock,
  Briefcase,
  FolderOpen,
  Plus,
  BadgeCheck,
  ChevronLeft,
  ChevronDown,
  Library,
} from "lucide-react";
import { CURRICULUM_GRADES } from "@/config/constants";
import type { WorksheetWithRelations } from "@/types/api";

interface CurriculumAndAdminExplorerProps {
  worksheets: WorksheetWithRelations[];
  isAuthenticated: boolean;
  viewerRole: string | null;
}

const ADMIN_DOC_TYPES = [
  { key: "ALL", label: "جميع الوثائق الإدارية" },
  { key: "مذكرات ومراسلات", label: "مذكرات ومراسلات إدارية" },
  { key: "جداول الأوقات", label: "جداول الأوقات والتوزيع السنوي" },
  { key: "تقارير ومحاضر", label: "تقارير ومحاضر التفقد والترسيم" },
  { key: "مطالب واستمارات", label: "مطالب واستمارات إدارية للمعلم" },
];

export default function CurriculumAndAdminExplorer({
  worksheets,
  isAuthenticated,
  viewerRole,
}: CurriculumAndAdminExplorerProps) {
  const [levelsExpanded, setLevelsExpanded] = useState<boolean>(true);
  const [selectedAdminType, setSelectedAdminType] = useState<string>("ALL");

  const isAdministrative = (ws: WorksheetWithRelations) =>
    ws.category?.slug === "administrative" ||
    ws.category?.slug === "administrative-docs" ||
    ws.subject?.slug === "administration" ||
    ws.category?.nameAr?.includes("إدارية") ||
    ws.tags?.includes("وثائق إدارية") ||
    ws.tags?.includes("إدارة");

  // Count curriculum worksheets per grade slug
  const gradeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const g of CURRICULUM_GRADES) map[g.slug] = 0;
    for (const ws of worksheets) {
      if (isAdministrative(ws)) continue;
      const slug = ws.grade?.slug;
      if (slug && map[slug] !== undefined) {
        map[slug] += 1;
      }
    }
    return map;
  }, [worksheets]);

  const administrativeFiles = useMemo(() => {
    return worksheets.filter((ws) => {
      if (!isAdministrative(ws)) return false;
      if (selectedAdminType === "ALL") return true;
      const title = `${ws.titleAr || ""} ${ws.title || ""} ${ws.descriptionAr || ""}`;
      return title.includes(selectedAdminType) || ws.tags?.includes(selectedAdminType);
    });
  }, [worksheets, selectedAdminType]);

  const canUpload = isAuthenticated && viewerRole !== "STUDENT";

  return (
    <div id="levels-and-subjects" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 space-y-10 scroll-mt-24">
      {/* ===================================================================== */}
      {/* 1. قسم المستويات الدراسية والمواد (ينقل إلى صفحة المستودع والمواد)      */}
      {/* ===================================================================== */}
      <section
        id="curriculum-levels-section"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          onClick={() => setLevelsExpanded((prev) => !prev)}
          className="cursor-pointer border-b border-slate-100 bg-gradient-to-l from-blue-50/80 via-indigo-50/40 to-transparent px-6 py-5 transition hover:from-blue-100/60 dark:border-slate-800 dark:from-blue-950/40 dark:via-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md shadow-blue-700/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
                    مستودع المستويات الدراسية والمواد
                  </h2>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                    المستويات الدراسية المعتمدة
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  اختر المستوى الدراسي المعتمد للدخول مباشرة إلى مستودع المواد الدراسية والأقسام التربوية الخاصة به.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {!isAuthenticated && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/90 px-3.5 py-2 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
                >
                  <Lock className="h-3.5 w-3.5 shrink-0 text-amber-600" />
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
                </div>
              )}

              <Link
                href="/levels"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition"
              >
                <Library className="h-4 w-4" />
                <span>فتح صفحة مستودع المواد والمستويات ←</span>
              </Link>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <span>{levelsExpanded ? "طي المستويات" : "عرض المستويات"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    levelsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {levelsExpanded && (
          <div className="p-6">
            <div className="mb-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                اضغط على المستوى الدراسي المعتمد للدخول إلى مستودع المواد الدراسية الخاص به:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CURRICULUM_GRADES.map((grade) => {
                const count = gradeCounts[grade.slug] || 0;
                return (
                  <Link
                    key={grade.slug}
                    href={`/levels/${grade.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-blue-500 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-sm transition group-hover:scale-105">
                        {grade.sortOrder}
                      </span>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                          {grade.nameAr}
                        </h3>
                        <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                          مستودع المواد الدراسية • {count} ملف متوفر
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900">
                      <ChevronLeft className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 2. قسم الإدارة والمعاملات والوثائق الإدارية للمعلم                     */}
      {/* ===================================================================== */}
      <section
        id="administration-section"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-24"
      >
        <div className="border-b border-slate-100 bg-gradient-to-l from-amber-50/80 via-orange-50/40 to-transparent px-6 py-5 dark:border-slate-800 dark:from-amber-950/30 dark:via-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md shadow-amber-600/20">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
                  قسم الإدارة والمعاملات الإدارية
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  فضاء مخصص للمعاملات والوثائق الإدارية لدى المعلم والمؤسسة (بعيداً عن التمارين والدروس)
                </p>
              </div>
            </div>

            {canUpload && (
              <Link
                href="/upload?section=administrative"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-700"
              >
                <Plus className="h-4 w-4" />
                نشر وثيقة إدارية
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {ADMIN_DOC_TYPES.map((docType) => {
              const isActive = selectedAdminType === docType.key;
              return (
                <button
                  key={docType.key}
                  type="button"
                  onClick={() => setSelectedAdminType(docType.key)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-amber-600 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {docType.label}
                </button>
              );
            })}
          </div>

          {administrativeFiles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center dark:border-slate-800 dark:bg-slate-950/30">
              <FolderOpen className="mx-auto mb-2 h-8 w-8 text-slate-400" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                لا توجد وثائق إدارية منشورة في هذا التصنيف حالياً
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {administrativeFiles.map((ws) => {
                const title = ws.titleAr || ws.title;
                return (
                  <div
                    key={ws.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/60 px-4 py-3.5 transition hover:border-amber-300 hover:bg-white dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          وثيقة إدارية
                        </span>
                        {ws.isEndorsed && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            <BadgeCheck className="h-3 w-3" />
                            معتمد
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
                        {title}
                      </p>
                    </div>

                    {isAuthenticated ? (
                      <Link
                        href={`/worksheet/${ws.id}`}
                        className="shrink-0 rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-700"
                      >
                        فتح الوثيقة
                      </Link>
                    ) : (
                      <Link
                        href={`/login?redirectTo=/worksheet/${ws.id}`}
                        className="shrink-0 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-900"
                      >
                        تسجيل الدخول
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}