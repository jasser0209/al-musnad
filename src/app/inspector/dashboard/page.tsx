"use client";

/**
 * Inspector Dedicated Dashboard (لوحة تحكم المتفقد التربوي) — Al-Musnad v10.0
 *
 * المستوى الأول في سلم الأولوية الرقابية والبيداغوجية (القاعدة):
 * - إذا دخل المشرف العام (`ADMIN`) إلى هذه اللوحة، يظهر له شريط التنقل العلوي `SupervisoryHierarchyBar`
 *   الذي يمكّنه بضغطة زر من الرجوع فوراً إلى «لوحة المشرف العام» أو الانتقال إلى «لوحة المسؤول».
 * - إذا دخل المتفقد التربوي (`INSPECTOR`)، يكتفي بالصلاحيات البيداغوجية الموجودة له فقط في هذه اللوحة الحصرية له
 *   دون أي قدرة على الانتقال إلى لوحة المسؤول أو لوحة المشرف العام.
 */

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Lock,
  Flag,
  Search,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Send,
  Pin,
  X,
} from "lucide-react";
import {
  getInspectorDashboardData,
  toggleWorksheetEndorsementAction,
  addInspectorCommentAction,
  submitInspectorDirectReportToAdminAction,
} from "@/actions/inspector.actions";
import MentionText from "@/components/ui/MentionText";
import SupervisoryHierarchyBar from "@/components/layout/SupervisoryHierarchyBar";

type InspectorDashboardData = Awaited<ReturnType<typeof getInspectorDashboardData>>;
type InspectorWorksheet = InspectorDashboardData["worksheets"][number];

export default function InspectorDashboardPage() {
  const [data, setData] = useState<InspectorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "worksheets" | "my_comments" | "direct_reports"
  >("worksheets");

  const [search, setSearch] = useState("");
  const [endorseFilter, setEndorseFilter] = useState<"ALL" | "ENDORSED" | "UNENDORSED" | "DRAFT">("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Modal for Pinned Top Comment or Private Comment to Publisher
  const [selectedWorksheet, setSelectedWorksheet] = useState<InspectorWorksheet | null>(null);
  const [commentMode, setCommentMode] = useState<"PINNED_PUBLIC" | "PRIVATE_PUBLISHER">("PINNED_PUBLIC");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // Modal for Direct Report to Top Admin
  const [reportTargetWs, setReportTargetWs] = useState<InspectorWorksheet | null>(null);
  const [reportReason, setReportReason] = useState("أخطاء علمية أو بيداغوجية جسيمة تستوجب تدخل المشرف");
  const [reportDetails, setReportDetails] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getInspectorDashboardData();
      setData(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "غير مصرح لك بالدخول إلى لوحة تحكم المتفقد التربوي"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const inspectorExclusiveWorksheets = useMemo(() => {
    if (!data) return [];
    return data.worksheets.filter(
      (ws) => ws.uploader.role === "INSPECTOR"
    );
  }, [data]);

  const filteredWorksheets = useMemo(() => {
    if (!data) return [];
    return data.worksheets.filter((ws) => {
      if (endorseFilter === "ENDORSED" && !ws.isEndorsed) return false;
      if (endorseFilter === "UNENDORSED" && ws.isEndorsed) return false;
      if (endorseFilter === "DRAFT" && ws.status !== "DRAFT") return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const title = (ws.titleAr || ws.title).toLowerCase();
        const uploader = ws.uploader.name.toLowerCase();
        const uname = (ws.uploader.username || "").toLowerCase();
        return title.includes(q) || uploader.includes(q) || uname.includes(q);
      }
      return true;
    });
  }, [data, endorseFilter, search]);

  const handleToggleEndorse = async (worksheetId: string) => {
    try {
      setActionLoadingId(worksheetId);
      await toggleWorksheetEndorsementAction(worksheetId);
      await loadData();
      setBannerMessage("تم تحديث حالة التوثيق البيداغوجي للمنشور بنجاح.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل تحديث التوثيق البيداغوجي");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedWorksheet || !commentText.trim()) return;
    try {
      setSubmittingComment(true);
      await addInspectorCommentAction({
        worksheetId: selectedWorksheet.id,
        comment: commentText.trim(),
        isPrivateToPublisher: commentMode === "PRIVATE_PUBLISHER",
      });
      setBannerMessage(
        commentMode === "PRIVATE_PUBLISHER"
          ? `تم إرسال التعليق الخاص مباشرة إلى الناشر (${selectedWorksheet.uploader.name}) بنجاح.`
          : "تم نشر تعليق المتفقد وتثبيته في صدارة المنشور بنجاح."
      );
      setSelectedWorksheet(null);
      setCommentText("");
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال التعليق");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleSubmitDirectReport = async (e: FormEvent) => {
    e.preventDefault();
    if (!reportTargetWs) return;
    try {
      setSubmittingReport(true);
      await submitInspectorDirectReportToAdminAction({
        targetType: "WORKSHEET",
        targetWorksheetId: reportTargetWs.id,
        targetUserId: reportTargetWs.uploader.id,
        reason: reportReason,
        details: reportDetails,
      });
      setBannerMessage("🚨 تم رفع الإبلاغ المباشر إلى المشرف العام في القمة بنجاح.");
      setReportTargetWs(null);
      setReportDetails("");
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر رفع البلاغ للمشرف");
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-amber-600" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          جاري تحميل لوحة تحكم المتفقد التربوي...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center" dir="rtl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-600" />
          <h1 className="text-lg font-extrabold text-red-900 dark:text-red-200">
            وصول مقيد — لوحة تحكم حصرية للمتفقد التربوي
          </h1>
          <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
            لا يمكن للمسؤول الإداري أو غيره الانتقال إلى لوحة المتفقد؛ كل رتبة تكتفي بالصلاحيات واللوحة المخصصة لها فقط.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/70 pb-16 pt-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Supervisory Hierarchy Bar: Shows Admin Switcher + "Return to Admin Dashboard" ONLY if viewerRole === "ADMIN", otherwise shows Exclusive Inspector Scope Notice */}
        <SupervisoryHierarchyBar
          viewerRole={data.inspector.role}
          currentDashboard="INSPECTOR"
        />

        {/* Header & Priority Hierarchy Indicator */}
        <div className="mb-8 rounded-3xl border border-amber-200/80 bg-gradient-to-l from-amber-50 via-white to-amber-50/40 p-6 shadow-sm dark:border-amber-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                لوحة تحكم المتفقد التربوي ({data.inspector.name})
              </h1>
            </div>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <RefreshCw className="h-4 w-4" />
              تحديث البيانات
            </button>
          </div>

          {/* KPI Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-500">إجمالي المنشورات للرقابة</span>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                {data.stats.totalWorksheets}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                منشورات موثقة بيداغوجياً
              </span>
              <p className="mt-1 text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {data.stats.endorsedWorksheetsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
              <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300">
                تعليقاتي المتصدرة والخاصة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                {data.myComments.length}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300">
                إبلاغاتي المباشرة للمشرف
              </span>
              <p className="mt-1 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
                {data.stats.myDirectReportsCount}
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Top Section for Inspector-Only Publications (للتفاعل بين المتفقدين) */}
        <div className="mb-8 rounded-3xl border-2 border-amber-300/90 bg-white p-6 shadow-sm dark:border-amber-800/70 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100 pb-4 dark:border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                🏅 قسم التفاعل البيداغوجي الخاص بالمتفقدين
              </span>
              <h2 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                منشورات وتوجيهات المتفقدين التربويين ({inspectorExclusiveWorksheets.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                يعرض هذا القسم العلوي جميع المنشورات والوثائق المرفوعة من قِبل المتفقدين التربويين لتسهيل التنسيق والتفاعل المباشر بين هيئة التفقد.
              </p>
            </div>
            <Link
              href="/upload?audience=SAME_ROLE_ONLY"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition"
            >
              + نشر وثيقة خاصة بالمتفقدين
            </Link>
          </div>

          {inspectorExclusiveWorksheets.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
              لا توجد منشورات خاصة بالمتفقدين بعد. بادر بنشر أول توجيه أو وثيقة لزملائك المتفقدين.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inspectorExclusiveWorksheets.slice(0, 6).map((ws) => (
                <Link
                  key={ws.id}
                  href={`/worksheet/${ws.id}`}
                  className="flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 transition hover:border-amber-500 hover:bg-white dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-amber-500"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                      <span>{ws.subject.nameAr} • {ws.grade.nameAr}</span>
                      <span className="rounded-md bg-amber-200/70 dark:bg-amber-950 px-2 py-0.5">
                        {ws.category.nameAr}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2">
                      {ws.titleAr || ws.title}
                    </h3>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>المتفقد: {ws.uploader.name}</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">معاينة ←</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {bannerMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>✓ {bannerMessage}</span>
            <button type="button" onClick={() => setBannerMessage(null)}>✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("worksheets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "worksheets"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <BadgeCheck className="h-4 w-4" />
            توثيق المنشورات والتعليق (في الصدارة / خاص للناشر)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("my_comments")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "my_comments"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Pin className="h-4 w-4" />
            سجل تعليقاتي المتصدرة والخاصة ({data.myComments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("direct_reports")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "direct_reports"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Flag className="h-4 w-4" />
            الإبلاغات المرفوعة مباشرة للمشرف ({data.myReports.length})
          </button>
        </div>

        {/* TAB 1: WORKSHEETS ENDORSEMENT & COMMENTS */}
        {activeTab === "worksheets" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "ALL", label: "الكل" },
                    { key: "ENDORSED", label: "✓ موثق بيداغوجياً" },
                    { key: "UNENDORSED", label: "بانتظار التوثيق البيداغوجي" },
                    { key: "DRAFT", label: "⏳ ملفات وورد/صور قيد التحويل" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setEndorseFilter(f.key)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      endorseFilter === f.key
                        ? "bg-amber-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث في المنشورات أو @username..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-9 text-xs text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">المنشور التربوي</th>
                      <th className="px-4 py-4">الناشر (@username)</th>
                      <th className="px-4 py-4">المستوى / المادة</th>
                      <th className="px-4 py-4">حالة التوثيق البيداغوجي</th>
                      <th className="px-5 py-4 text-left">صلاحيات المتفقد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredWorksheets.map((ws) => {
                      const uname =
                        ws.uploader.username ||
                        `${ws.uploader.email.split("@")[0].toLowerCase()}`;
                      return (
                        <tr key={ws.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4">
                            <Link
                              href={`/worksheet/${ws.id}`}
                              className="font-extrabold text-slate-900 hover:text-amber-600 dark:text-white"
                            >
                              {ws.titleAr || ws.title}
                            </Link>
                            {ws.status === "DRAFT" && (
                              <span className="mr-2 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                                مسودة قيد التحويل لـ PDF
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/publisher/${ws.uploader.id}`}
                              className="font-bold text-slate-800 hover:text-blue-600 dark:text-slate-200"
                            >
                              {ws.uploader.name}
                            </Link>
                            <div>
                              <Link
                                href={`/u/${uname}`}
                                dir="ltr"
                                className="font-mono text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                              >
                                @{uname}
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-300">
                            {ws.grade.nameAr} — {ws.subject.nameAr}
                          </td>
                          <td className="px-4 py-4">
                            {ws.isEndorsed ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                موثق بيداغوجياً
                              </span>
                            ) : (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                غير موثق بعد
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              {/* 1. Endorse Toggle */}
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={() => handleToggleEndorse(ws.id)}
                                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold transition ${
                                  ws.isEndorsed
                                    ? "border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                                }`}
                              >
                                <BadgeCheck className="h-3.5 w-3.5" />
                                {ws.isEndorsed ? "إلغاء التوثيق" : "توثيق المنشور"}
                              </button>

                              {/* 2. Pinned Top Comment */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedWorksheet(ws);
                                  setCommentMode("PINNED_PUBLIC");
                                  setCommentText("");
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                              >
                                <Pin className="h-3.5 w-3.5" />
                                تعليق في الصدارة
                              </button>

                              {/* 3. Private Comment Directly to Publisher */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedWorksheet(ws);
                                  setCommentMode("PRIVATE_PUBLISHER");
                                  setCommentText(`@${uname} `);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-[11px] font-bold text-purple-800 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300"
                              >
                                <Lock className="h-3.5 w-3.5" />
                                تعليق خاص للناشر
                              </button>

                              {/* 4. Direct Report to Admin */}
                              <button
                                type="button"
                                onClick={() => {
                                  setReportTargetWs(ws);
                                  setReportDetails("");
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
                              >
                                <Flag className="h-3.5 w-3.5" />
                                إبلاغ للمشرف
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY PINNED & PRIVATE COMMENTS */}
        {activeTab === "my_comments" && (
          <div className="space-y-3">
            {data.myComments.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                لم تقم بإضافة تعليقات متصدرة أو تعليقات خاصة للناشرين بعد.
              </div>
            ) : (
              data.myComments.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {c.isPrivateToPublisher ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-[11px] font-extrabold text-purple-900 dark:bg-purple-950/70 dark:text-purple-300">
                          <Lock className="h-3.5 w-3.5" />
                          تعليق خاص مباشر إلى الناشر ({c.worksheet.uploader.name})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
                          <Pin className="h-3.5 w-3.5" />
                          تعليق متفقد مثبت في الصدارة
                        </span>
                      )}
                      <Link
                        href={`/worksheet/${c.worksheet.id}`}
                        className="text-xs font-extrabold text-slate-900 hover:text-blue-600 dark:text-white"
                      >
                        على المنشور: {c.worksheet.titleAr || c.worksheet.title}
                      </Link>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString("ar-TN")}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                    <MentionText text={c.comment} />
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: DIRECT REPORTS TO ADMIN */}
        {activeTab === "direct_reports" && (
          <div className="space-y-3">
            {data.myReports.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                لم تقم برفع أي إبلاغات مباشرة إلى المشرف العام بعد.
              </div>
            ) : (
              data.myReports.map((rep) => (
                <div
                  key={rep.id}
                  className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-extrabold text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
                      🚨 إبلاغ مباشر للمشرف العام
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      الحالة: {rep.status === "PENDING" ? "قيد مراجعة المشرف" : "تمت المعالجة"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                    {rep.reason}
                  </p>
                  {rep.details && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {rep.details}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal: Add Pinned Comment OR Private Comment to Publisher */}
      {selectedWorksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {commentMode === "PRIVATE_PUBLISHER"
                  ? "🔒 رفع تعليق خاص مباشرة إلى الناشر"
                  : "📌 إضافة تعليق متفقد يظهر في الصدارة"}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedWorksheet(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setCommentMode("PINNED_PUBLIC")}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  commentMode === "PINNED_PUBLIC"
                    ? "bg-amber-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                📌 تعليق عام في الصدارة
              </button>
              <button
                type="button"
                onClick={() => setCommentMode("PRIVATE_PUBLISHER")}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  commentMode === "PRIVATE_PUBLISHER"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                🔒 تعليق خاص للناشر فقط
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                المنشور: <strong>{selectedWorksheet.titleAr || selectedWorksheet.title}</strong> — الناشر:{" "}
                <strong>{selectedWorksheet.uploader.name}</strong> (يمكنك استخدام <code>@username</code> للإشارة لأي عضو)
              </p>
              <textarea
                rows={4}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  commentMode === "PRIVATE_PUBLISHER"
                    ? "اكتب ملاحظتك البيداغوجية الخاصة الموجهة للناشر مباشرة (لا يراها غيره)..."
                    : "اكتب تعليقك البيداغوجي الذي سيظهر مثبتاً في صدارة التعليقات..."
                }
                className="w-full rounded-2xl border border-slate-300 p-3.5 text-xs text-slate-900 focus:border-amber-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorksheet(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white hover:bg-amber-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  {submittingComment ? "جاري الإرسال..." : "إرسال واعتماد"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Direct Report to Top Admin */}
      {reportTargetWs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-rose-700 dark:text-rose-400">
                🚨 رفع إبلاغ مباشر إلى المشرف العام
              </h3>
              <button
                type="button"
                onClick={() => setReportTargetWs(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitDirectReport} className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                سيصل هذا البلاغ مباشرة إلى إشعارات ولوحة تحكم <strong>المشرف العام</strong> بأولوية قصوى حول المنشور:{" "}
                <strong>{reportTargetWs.titleAr || reportTargetWs.title}</strong>
              </p>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  سبب البلاغ الرقابي *
                </label>
                <input
                  type="text"
                  required
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  تفاصيل وملاحظات المتفقد إلى المشرف
                </label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="اشرح للمشرف العام الإجراء المطلوب..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportTargetWs(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submittingReport}
                  className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  {submittingReport ? "جاري الرفع للمشرف..." : "رفع الإبلاغ للمشرف الآن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}