"use client";

/**
 * RolePersonalizedHub — Tailored Top Workspace & Exclusive Role Feeds (Al-Musnad v12.0)
 *
 * Implements the User Directives for Role-Based Interface Personalization:
 * 1. `INSTITUTION` (المؤسسات التربوية):
 *    - Dedicated top section («قسم نشرات المؤسسات التربوية») displaying publications
 *      specifically for/by institutions (`INSTITUTIONS_ONLY`, `SAME_ROLE_ONLY` by institutions,
 *      or institutional publications) so institutions can interact and share purposeful content.
 * 2. `INSPECTOR` (المتفقدون التربويون):
 *    - Dedicated top section («قسم منشورات المتفقدين فقط») displaying publications
 *      exclusively for/by inspectors to facilitate pedagogical collaboration among inspectors.
 * 3. `TEACHER` (المعلمون):
 *    - Dedicated top section («قسم منشورات المعلمين») displaying all teacher-specific
 *      publications (`TEACHERS_ONLY`, fiches/lesson plans, exam keys, and peer resources).
 * 4. `STUDENT` (التلاميذ):
 *    - Dedicated distraction-free Student Study Hub («فضاء التلميذ للمراجعة والتفوق»)
 *      with zero administrative clutter, focused on lessons, exercises, exams, and activities.
 * 5. `ADMIN` / `MODERATOR`:
 *    - Can switch across all 4 role hubs to supervise and inspect each community space.
 */

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  BookOpenCheck,
  GraduationCap,
  Plus,
  Sparkles,
  Users,
  FileText,
  Briefcase,
  ShieldCheck,
  Layers,
} from "lucide-react";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import { CURRICULUM_GRADES } from "@/config/constants";
import type { WorksheetWithRelations } from "@/types/api";

interface RolePersonalizedHubProps {
  worksheets: WorksheetWithRelations[];
  viewerRole: string | null;
  viewerName?: string | null;
  viewerStudentGrade?: string | null;
}

type HubRoleTab = "INSTITUTION" | "INSPECTOR" | "TEACHER" | "STUDENT";

export default function RolePersonalizedHub({
  worksheets,
  viewerRole,
  viewerName,
  viewerStudentGrade,
}: RolePersonalizedHubProps) {
  const isStaff = viewerRole === "ADMIN" || viewerRole === "MODERATOR";

  const initialHub: HubRoleTab =
    viewerRole === "INSTITUTION"
      ? "INSTITUTION"
      : viewerRole === "INSPECTOR"
      ? "INSPECTOR"
      : viewerRole === "STUDENT"
      ? "STUDENT"
      : "TEACHER";

  const [activeHub, setActiveHub] = useState<HubRoleTab>(initialHub);
  const [subFilter, setSubFilter] = useState<string>("ALL");
  const [selectedStudentGradeSlug, setSelectedStudentGradeSlug] =
    useState<string>(() => {
      if (viewerStudentGrade) {
        const matched = CURRICULUM_GRADES.find(
          (g) =>
            g.nameAr === viewerStudentGrade || g.slug === viewerStudentGrade
        );
        if (matched) return matched.slug;
      }
      return "ALL";
    });

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash === "#institutions-hub") setActiveHub("INSTITUTION");
        else if (hash === "#inspectors-hub") setActiveHub("INSPECTOR");
        else if (hash === "#teachers-hub") setActiveHub("TEACHER");
        else if (hash === "#student-hub") setActiveHub("STUDENT");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // 1. Institution-specific publications
  const institutionWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isInstOnly = ws.audience === "INSTITUTIONS_ONLY";
      const isInstSameRole =
        ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role === "INSTITUTION";
      const isUploadedByInst = ws.uploader?.role === "INSTITUTION";

      if (subFilter === "EXCLUSIVE") {
        return isInstOnly || isInstSameRole;
      }
      return isInstOnly || isInstSameRole || isUploadedByInst;
    });
  }, [worksheets, subFilter]);

  // 2. Inspector-specific publications
  const inspectorWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isInspSameRole =
        ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role === "INSPECTOR";
      const isUploadedByInsp = ws.uploader?.role === "INSPECTOR";
      const isEndorsedDirective =
        ws.isEndorsed && ws.audience === "TEACHERS_ONLY";

      if (subFilter === "EXCLUSIVE") {
        return isInspSameRole || isUploadedByInsp;
      }
      return isInspSameRole || isUploadedByInsp || isEndorsedDirective;
    });
  }, [worksheets, subFilter]);

  // 3. Teacher-specific publications
  const teacherWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isTeachersOnly = ws.audience === "TEACHERS_ONLY";
      const isTeacherSameRole =
        ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role === "TEACHER";
      const isFiche = ws.category?.slug === "lesson-plan";
      const isTeacherUpload = ws.uploader?.role === "TEACHER";

      if (subFilter === "TEACHERS_ONLY") return isTeachersOnly || isTeacherSameRole;
      if (subFilter === "FICHES") return isFiche;
      if (subFilter === "EXAMS") return ws.category?.slug === "exam";
      return isTeachersOnly || isTeacherSameRole || isFiche || isTeacherUpload;
    });
  }, [worksheets, subFilter]);

  // 4. Student-specific publications (Strictly excludes administrative & teacher/institution-only files)
  const studentWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isAdminDoc =
        ws.category?.slug === "administrative" ||
        ws.subject?.slug === "administration";
      if (isAdminDoc) return false;
      if (
        ws.audience === "TEACHERS_ONLY" ||
        ws.audience === "INSTITUTIONS_ONLY" ||
        (ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role !== "STUDENT")
      ) {
        return false;
      }
      if (
        selectedStudentGradeSlug !== "ALL" &&
        ws.grade?.slug !== selectedStudentGradeSlug
      ) {
        return false;
      }
      if (subFilter !== "ALL" && ws.category?.slug !== subFilter) {
        return false;
      }
      return true;
    });
  }, [worksheets, selectedStudentGradeSlug, subFilter]);

  if (!viewerRole) return null;

  return (
    <section
      id="role-personalized-hub"
      dir="rtl"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {/* Staff Switcher (Allows ADMIN / MODERATOR to inspect all 4 Role Hubs) */}
      {isStaff && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-200 bg-purple-50/70 px-4 py-3 dark:border-purple-900/60 dark:bg-purple-950/30">
          <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900 dark:text-purple-200">
            <ShieldCheck className="h-4 w-4 text-purple-600" />
            <span>معاينة الفضاءات المخصصة حسب فئة المستخدم (صلاحية المشرف/المسؤول):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { key: "INSTITUTION", label: "🏛️ فضاء المؤسسات" },
                { key: "INSPECTOR", label: "🏅 فضاء المتفقدين" },
                { key: "TEACHER", label: "👨‍🏫 فضاء المعلمين" },
                { key: "STUDENT", label: "🎓 فضاء التلاميذ" },
              ] as { key: HubRoleTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveHub(tab.key);
                  setSubFilter("ALL");
                }}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                  activeHub === tab.key
                    ? "bg-purple-700 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-purple-100 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* A. INSTITUTION HUB (قسم نشرات المؤسسات للمؤسسات للتفاعل المشترك)      */}
      {/* =================================================================== */}
      {activeHub === "INSTITUTION" && (
        <div id="institutions-hub" className="overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white shadow-md dark:border-indigo-900/60 dark:bg-slate-900 scroll-mt-24">
          <div className="border-b border-indigo-100 bg-gradient-to-l from-indigo-50 via-blue-50/40 to-white px-6 py-6 dark:border-slate-800 dark:from-indigo-950/50 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-0.5 text-[11px] font-extrabold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    <Sparkles className="h-3 w-3" />
                    فضاء حصري للمؤسسات التربوية فقط
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    ملتقى ومستودع نشرات المؤسسات التربوية
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    قسم مخصص لمنشورات المؤسسات التربوية لتبادل النماذج الإدارية والبيداغوجية والتفاعل الهادف بين المدارس والمعاهد.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/upload?audience=INSTITUTIONS_ONLY"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>نشر محتوى خاص بالمؤسسات</span>
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "ALL"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-indigo-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                جميع منشورات المؤسسات ({institutionWorksheets.length})
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("EXCLUSIVE")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "EXCLUSIVE"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-indigo-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                نشرات حصرية بين المؤسسات فقط
              </button>
            </div>
          </div>

          <div className="p-6">
            {institutionWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <Building2 className="mx-auto mb-2 h-9 w-9 text-indigo-400" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد نشرات مؤسساتية في هذا التبويب حالياً
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  بادر بنشر أول وثيقة أو مبادرة تربوية باسم مؤسستك للتفاعل مع المؤسسات الزميلة.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {institutionWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* B. INSPECTOR HUB (قسم خاص بمنشورات المتفقدين في أعلى الصفحة)          */}
      {/* =================================================================== */}
      {activeHub === "INSPECTOR" && (
        <div id="inspectors-hub" className="overflow-hidden rounded-3xl border-2 border-amber-300 bg-white shadow-md dark:border-amber-800/70 dark:bg-slate-900 scroll-mt-24">
          <div className="border-b border-amber-100 bg-gradient-to-l from-amber-50 via-orange-50/30 to-white px-6 py-6 dark:border-slate-800 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/25">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    <Sparkles className="h-3 w-3" />
                    الفضاء التشاركي الخاص بالمتفقدين التربويين
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    منشورات وتوجيهات هيئة التفقد التربوي
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    قسم علوي مخصص للمنشورات والوثائق التي تخص المتفقدين فقط لتسهيل التنسيق والتفاعل البيداغوجي بين المتفقدين.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/upload?audience=SAME_ROLE_ONLY"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-amber-600"
                >
                  <Plus className="h-4 w-4" />
                  <span>نشر وثيقة خاصة بالمتفقدين</span>
                </Link>
                <Link
                  href="/inspector/dashboard"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-xs font-extrabold text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-slate-800 dark:text-amber-300"
                >
                  <span>لوحة تحكم المتفقد ←</span>
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "ALL"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                جميع منشورات وتوجيهات المتفقدين ({inspectorWorksheets.length})
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("EXCLUSIVE")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "EXCLUSIVE"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                منشورات حصرية بين المتفقدين فقط
              </button>
            </div>
          </div>

          <div className="p-6">
            {inspectorWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <Award className="mx-auto mb-2 h-9 w-9 text-amber-500" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد منشورات خاصة بالمتفقدين في هذا التبويب حالياً
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  يمكنك نشر شبكات التقييم، تقارير التفقد النموذجية، أو التوجيهات البيداغوجية لمشاركتها مع زملائك المتفقدين.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inspectorWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* C. TEACHER HUB (قسم في الأعلى للمعلم فيه جميع المنشورات الخاصة بالمعلمين) */}
      {/* =================================================================== */}
      {activeHub === "TEACHER" && (
        <div id="teachers-hub" className="overflow-hidden rounded-3xl border-2 border-blue-200 bg-white shadow-md dark:border-blue-900/60 dark:bg-slate-900 scroll-mt-24">
          <div className="border-b border-blue-100 bg-gradient-to-l from-blue-50 via-indigo-50/30 to-white px-6 py-6 dark:border-slate-800 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                  <BookOpenCheck className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 text-[11px] font-extrabold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    <Users className="h-3 w-3" />
                    الفضاء المهني الخاص بالمعلمين
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    مستودع منشورات ومذكرات المعلمين
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    يجمع هذا القسم كافة المنشورات التي تخص المعلمين (الجذاذات البيداغوجية، إصلاح الفروض والامتحانات المحجوبة عن التلاميذ، والتوزيعات السنوية).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/upload?audience=TEACHERS_ONLY"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>نشر جذاذة أو إصلاح (خاص بالمعلمين)</span>
                </Link>
                <a
                  href="#administration-section"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Briefcase className="h-3.5 w-3.5 text-amber-600" />
                  <span>الوثائق الإدارية للمعلم</span>
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "ALL"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                جميع منشورات المعلمين ({teacherWorksheets.length})
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("TEACHERS_ONLY")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "TEACHERS_ONLY"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                🔒 خاص بالمعلمين فقط (محجوب عن التلاميذ)
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("FICHES")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "FICHES"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                📋 الجذاذات والمخططات البيداغوجية
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("EXAMS")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "EXAMS"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                📝 الفروض والاختبارات التقييمية
              </button>
            </div>
          </div>

          <div className="p-6">
            {teacherWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <FileText className="mx-auto mb-2 h-9 w-9 text-blue-400" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد منشورات مطابقة لهذا الفلتر حالياً
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teacherWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* D. STUDENT HUB (واجهة التلميذ المخصصة بدون قسم الإدارة)                */}
      {/* =================================================================== */}
      {activeHub === "STUDENT" && (
        <div
          id="student-hub"
          className="overflow-hidden rounded-3xl border-2 border-emerald-200 bg-white shadow-md dark:border-emerald-900/60 dark:bg-slate-900 scroll-mt-24"
        >
          <div className="border-b border-emerald-100 bg-gradient-to-l from-emerald-50 via-teal-50/30 to-white px-6 py-6 dark:border-slate-800 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Sparkles className="h-3 w-3" />
                    فضاء التلميذ الذكي للمراجعة والتفوق
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    مرحباً بك{viewerName ? ` يا ${viewerName}` : ""} في مكتبتك الدراسية
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    واجهة مبسطة مخصصة للتلاميذ تضم الدروس المبسطة، التمارين التطبيقية، الامتحانات، والأنشطة التفاعلية حسب مستواك الدراسي.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedStudentGradeSlug}
                  onChange={(e) => setSelectedStudentGradeSlug(e.target.value)}
                  className="rounded-xl border border-emerald-300 bg-white px-3.5 py-2 text-xs font-extrabold text-emerald-900 outline-none dark:border-emerald-800 dark:bg-slate-800 dark:text-emerald-200"
                >
                  <option value="ALL">جميع المستويات الدراسية</option>
                  {CURRICULUM_GRADES.map((g) => (
                    <option key={g.slug} value={g.slug}>
                      {g.nameAr}
                    </option>
                  ))}
                </select>
                {selectedStudentGradeSlug !== "ALL" && (
                  <Link
                    href={`/levels/${selectedStudentGradeSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>فتح مواد هذا المستوى ←</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { key: "ALL", label: `كل ملفات المراجعة (${studentWorksheets.length})` },
                { key: "lesson", label: "📖 الدروس والملخصات" },
                { key: "worksheet", label: "✍️ التمارين التطبيقية" },
                { key: "exam", label: "📝 فروض وامتحانات المراجعة" },
                { key: "activity", label: "🎮 الأنشطة التفاعلية" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSubFilter(t.key)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                    subFilter === t.key
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-emerald-50 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {studentWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <GraduationCap className="mx-auto mb-2 h-9 w-9 text-emerald-500" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد ملفات في هذا القسم حالياً
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studentWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
