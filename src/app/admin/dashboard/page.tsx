"use client";

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  Users,
  Search,
  UserCog,
  Key,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
  RefreshCw,
  BadgeCheck,
  Flag,
  Headphones,
  Mail,
  Plus,
  Send,
  X,
} from "lucide-react";
import {
  getAdminDashboardData,
  updateWorksheetStatusAdminAction,
  deleteWorksheetAdminAction,
  updateUserRoleAdminAction,
  approveProfileEditAdminAction,
  rejectProfileEditAdminAction,
  toggleBanUserAdminAction,
  unlockUserAccountAdminAction,
  toggleVerifyUserAdminAction,
  createVerificationCodeAdminAction,
  deleteVerificationCodeAdminAction,
} from "@/actions/admin.actions";
import {
  generateInspectorCodeAdminAction,
  toggleWorksheetEndorsementAction,
} from "@/actions/inspector.actions";
import { sendDirectMessageToPublisherAction } from "@/actions/moderator.actions";
import {
  updateReportStatusAdminAction,
  replySupportTicketAdminAction,
} from "@/actions/report-support.actions";
import type { Role } from "@/types";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { UserPresenceBadge } from "@/components/ui/UserPresenceIndicator";
import MentionText from "@/components/ui/MentionText";
import SupervisoryHierarchyBar from "@/components/layout/SupervisoryHierarchyBar";

type AdminData = Awaited<ReturnType<typeof getAdminDashboardData>>;
type AdminTeacher = AdminData["teachers"][number];

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "worksheets" | "teachers" | "codes" | "profile_edits" | "reports" | "support" | "audit"
  >("worksheets");

  const [auditActionFilter, setAuditActionFilter] = useState<string>("ALL");
  const [auditSearch, setAuditSearch] = useState<string>("");

  const [worksheetSearch, setWorksheetSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [teacherSearch, setTeacherSearch] = useState<string>("");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Code Generator State (Exclusive to Admin Dashboard)
  const [newCodeRole, setNewCodeRole] = useState<Role>("INSPECTOR");
  const [newCodeNote, setNewCodeNote] = useState<string>("");
  const [newCodeCount, setNewCodeCount] = useState<number>(1);
  const [creatingCodes, setCreatingCodes] = useState<boolean>(false);

  // Direct Message Modal State
  const [dmTargetUser, setDmTargetUser] = useState<AdminTeacher | null>(null);
  const [dmSubject, setDmSubject] = useState("توجيه مباشر من المشرف العام لمنصة المسند");
  const [dmMessage, setDmMessage] = useState("");
  const [sendingDm, setSendingDm] = useState(false);

  const handleCopyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAdminDashboardData();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "غير مصرح لك بالوصول إلى لوحة تحكم المشرف العام"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredWorksheets = useMemo(() => {
    if (!data) return [];
    return data.worksheets.filter((ws) => {
      const matchesStatus =
        statusFilter === "ALL" ? true : ws.status === statusFilter;
      const title = (ws.titleAr || ws.title).toLowerCase();
      const uploaderName = ws.uploader.name.toLowerCase();
      const uname = (ws.uploader.username || "").toLowerCase();
      const q = worksheetSearch.trim().toLowerCase();
      const matchesSearch =
        !q || title.includes(q) || uploaderName.includes(q) || uname.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [data, worksheetSearch, statusFilter]);

  const filteredTeachers = useMemo(() => {
    if (!data) return [];
    const q = teacherSearch.trim().toLowerCase();
    if (!q) return data.teachers;
    return data.teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        (t.username || "").toLowerCase().includes(q) ||
        (t.school && t.school.toLowerCase().includes(q))
    );
  }, [data, teacherSearch]);

  const filteredAuditLogs = useMemo(() => {
    if (!data?.auditLogs) return [];
    return data.auditLogs.filter((log) => {
      const matchAction =
        auditActionFilter === "ALL" || log.action === auditActionFilter;
      const q = auditSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        log.actorName.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q)) ||
        (log.targetType && log.targetType.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.includes(q));
      return matchAction && matchSearch;
    });
  }, [data?.auditLogs, auditActionFilter, auditSearch]);

  const handleCreateVerificationCodes = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setCreatingCodes(true);
      const created = await createVerificationCodeAdminAction({
        targetRole: newCodeRole,
        note: newCodeNote,
        count: newCodeCount,
      });
      setNewCodeNote("");
      setBannerMessage(`🔑 تم إنشاء وتوليد (${created.length}) كود توثيق جديد بنجاح!`);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل إنشاء أكواد التوثيق");
    } finally {
      setCreatingCodes(false);
    }
  };

  const handleToggleVerifyUser = async (t: AdminTeacher) => {
    try {
      setActionLoadingId(t.id);
      await toggleVerifyUserAdminAction(t.id);
      setBannerMessage(
        !t.isVerified
          ? `🎖️ تم تفعيل شارة التوثيق الرسمية لحساب (${t.name}) بنجاح.`
          : `تم إلغاء شارة التوثيق عن حساب (${t.name}).`
      );
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل تحديث حالة التوثيق");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendDirectMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!dmTargetUser || !dmMessage.trim()) return;
    try {
      setSendingDm(true);
      await sendDirectMessageToPublisherAction({
        targetUserId: dmTargetUser.id,
        subject: dmSubject,
        message: dmMessage,
      });
      setBannerMessage(`✉️ تم إرسال الرسالة المباشرة إلى (${dmTargetUser.name}) بنجاح.`);
      setDmTargetUser(null);
      setDmMessage("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال الرسالة المباشرة");
    } finally {
      setSendingDm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-blue-700" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          جاري تحميل لوحة تحكم المشرف العام...
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
            وصول مقيد — هذه اللوحة حصرية للمشرف العام فقط
          </h1>
          <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
            كل رتبة إشرافية (متفقد أو مسؤول) مخصص لها لوحة تحكم حصرية خاصة بها فقط ولا يمكنها الانتقال إلى لوحات المستويات الأخرى.
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
        <SupervisoryHierarchyBar
          viewerRole={data.admin.role}
          currentDashboard="ADMIN"
        />

        <div className="mb-8 rounded-3xl border border-blue-200/80 bg-gradient-to-l from-blue-50 via-white to-indigo-50/50 p-6 shadow-sm dark:border-blue-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                لوحة تحكم المشرف العام ({data.admin.name})
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={loadData}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                تحديث البيانات
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-500">إجمالي المنشورات</span>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                {data.stats.totalWorksheets}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
              <span className="text-[11px] font-bold text-sky-900 dark:text-sky-300">
                الحسابات الموثقة (حصري)
              </span>
              <p className="mt-1 text-2xl font-extrabold text-sky-700 dark:text-sky-300">
                {data.stats.verifiedUsersCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                أكواد توثيق جاهزة للتوزيع
              </span>
              <p className="mt-1 text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {data.stats.unusedCodesCount}
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300">
                طلبات تعديل الهوية
              </span>
              <p className="mt-1 text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                {data.stats.pendingProfileEditsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300">
                البلاغات المفتوحة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
                {data.stats.pendingReportsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                تذاكر الدعم الفني
              </span>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {data.stats.openTicketsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
              <span className="text-[11px] font-bold text-violet-900 dark:text-violet-300">
                سجلات النشاط والأمن
              </span>
              <p className="mt-1 text-2xl font-extrabold text-violet-700 dark:text-violet-300">
                {data.stats.totalAuditLogsCount ?? data.auditLogs?.length ?? 0}
              </p>
            </div>
          </div>
        </div>

        {bannerMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>{bannerMessage}</span>
            <button type="button" onClick={() => setBannerMessage(null)}>✕</button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("worksheets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "worksheets"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <FileText className="h-4 w-4" />
            إدارة النشرات ({data.worksheets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teachers")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "teachers"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Users className="h-4 w-4" />
            الأعضاء، تفعيل التوثيق، الأدوار والحظر ({data.teachers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("codes")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "codes"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300"
            }`}
          >
            <Key className="h-4 w-4" />
            🔑 إنشاء وإدارة أكواد التوثيق ({data.verificationCodes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("profile_edits")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "profile_edits"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <UserCog className="h-4 w-4" />
            طلبات تعديل الهوية ({data.pendingProfileUsers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "reports"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Flag className="h-4 w-4" />
            البلاغات وإبلاغات المتفقد ({data.stats.pendingReportsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "support"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Headphones className="h-4 w-4" />
            الدعم الفني ({data.stats.openTicketsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "audit"
                ? "bg-violet-700 text-white shadow-sm ring-2 ring-violet-400/50"
                : "bg-violet-50/80 text-violet-900 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            🛡️ سجل النشاطات والأمن ({data.stats.totalAuditLogsCount ?? data.auditLogs?.length ?? 0})
          </button>
        </div>

        {activeTab === "codes" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900/50 dark:bg-slate-900">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white">
                  <Key className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    إنشاء وتوليد أكواد التوثيق الرسمية (حصري للمشرف العام)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    قم بإنشاء أكواد توثيق جديدة وتوزيعها على المتفقدين أو المعلمين أو المؤسسات التربوية لتفعيل شارة التوثيق الرسمية.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleCreateVerificationCodes}
                className="grid grid-cols-1 gap-4 sm:grid-cols-4"
              >
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    الفئة المخصص لها الكود *
                  </label>
                  <select
                    value={newCodeRole}
                    onChange={(e) => setNewCodeRole(e.target.value as Role)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="INSPECTOR">كود متفقد تربوي (INSP-XXXX)</option>
                    <option value="TEACHER">كود توثيق معلم (VERF-XXXX)</option>
                    <option value="INSTITUTION">كود توثيق مؤسسة (INST-XXXX)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    عدد الأكواد المراد إنشاؤها
                  </label>
                  <select
                    value={newCodeCount}
                    onChange={(e) => setNewCodeCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={1}>كود واحد (1)</option>
                    <option value={3}>3 أكواد دفعة واحدة</option>
                    <option value={5}>5 أكواد دفعة واحدة</option>
                    <option value={10}>10 أكواد دفعة واحدة</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    ملاحظة أو اسم الجهة (اختياري)
                  </label>
                  <input
                    type="text"
                    value={newCodeNote}
                    onChange={(e) => setNewCodeNote(e.target.value)}
                    placeholder="تخصيص الكود أو ملاحظة..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={creatingCodes}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-amber-700"
                  >
                    <Plus className="h-4 w-4" />
                    {creatingCodes ? "جاري التوليد..." : "إنشاء الأكواد الآن"}
                  </button>
                </div>
              </form>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">كود التوثيق</th>
                      <th className="px-4 py-4">الفئة المستهدفة</th>
                      <th className="px-4 py-4">الملاحظة</th>
                      <th className="px-4 py-4">الحالة والمستفيد</th>
                      <th className="px-5 py-4 text-left">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.verificationCodes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center text-slate-400">
                          لا توجد أكواد منشأة بعد. استخدم النموذج أعلاه لإنشاء الأكواد.
                        </td>
                      </tr>
                    ) : (
                      data.verificationCodes.map((vc) => (
                        <tr key={vc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4">
                            <span
                              dir="ltr"
                              className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 font-mono text-xs font-black tracking-wider text-amber-900 dark:border-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
                            >
                              {vc.code}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-bold text-slate-700 dark:text-slate-300">
                            {vc.targetRole === "INSPECTOR"
                              ? "متفقد تربوي"
                              : vc.targetRole === "INSTITUTION"
                              ? "مؤسسة تربوية"
                              : "معلم"}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {vc.note || "—"}
                          </td>
                          <td className="px-4 py-4">
                            {vc.isUsed && vc.usedBy ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                ✓ مستخدم بواسطة: {vc.usedBy.name}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                جاهز للاستخدام
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyCode(vc.id, vc.code)}
                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                              >
                                {copiedCodeId === vc.id ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                    تم النسخ
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    نسخ الكود
                                  </>
                                )}
                              </button>
                              {!vc.isUsed && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await deleteVerificationCodeAdminAction(vc.id);
                                    await loadData();
                                  }}
                                  className="rounded-xl bg-rose-50 px-3 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100"
                                >
                                  حذف
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "worksheets" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "ALL", label: `الكل (${data.stats.totalWorksheets})` },
                    { key: "PUBLISHED", label: `منشور (${data.stats.publishedWorksheets})` },
                    { key: "DRAFT", label: `⏳ وورد/صور قيد التحويل (${data.stats.draftWorksheets})` },
                    { key: "ARCHIVED", label: `مؤرشف (${data.stats.archivedWorksheets})` },
                  ] as const
                ).map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setStatusFilter(st.key)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      statusFilter === st.key
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={worksheetSearch}
                onChange={(e) => setWorksheetSearch(e.target.value)}
                placeholder="ابحث في النشرات أو @username..."
                className="w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">المنشور</th>
                      <th className="px-4 py-4">الناشر (@username)</th>
                      <th className="px-4 py-4">المستوى / المادة</th>
                      <th className="px-4 py-4">الحالة والاعتماد</th>
                      <th className="px-5 py-4 text-left">إجراءات المشرف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredWorksheets.map((ws) => {
                      const uname =
                        ws.uploader.username || ws.uploader.email.split("@")[0].toLowerCase();
                      return (
                        <tr key={ws.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4 font-extrabold text-slate-900 dark:text-white">
                            <Link href={`/worksheet/${ws.id}`} className="hover:text-blue-600">
                              {ws.titleAr || ws.title}
                            </Link>
                          </td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/publisher/${ws.uploader.id}`}
                              className="font-bold text-slate-800 hover:underline dark:text-slate-200"
                            >
                              {ws.uploader.name}
                            </Link>
                            <div>
                              <Link
                                href={`/u/${uname}`}
                                dir="ltr"
                                className="font-mono text-[11px] font-bold text-blue-600 hover:underline"
                              >
                                @{uname}
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                            {ws.grade.nameAr} — {ws.subject.nameAr}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {ws.status === "PUBLISHED"
                                  ? "منشور"
                                  : ws.status === "DRAFT"
                                  ? "⏳ مسودة قيد التحويل"
                                  : "مؤرشف"}
                              </span>
                              {ws.isEndorsed && (
                                <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-[10px] font-extrabold text-amber-900">
                                  ✓ موثق بيداغوجياً
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={async () => {
                                  setActionLoadingId(ws.id);
                                  await toggleWorksheetEndorsementAction(ws.id);
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] font-bold text-amber-900 hover:bg-amber-100"
                              >
                                {ws.isEndorsed ? "إلغاء الاعتماد" : "اعتماد بيداغوجي"}
                              </button>
                              {ws.status !== "PUBLISHED" ? (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await updateWorksheetStatusAdminAction(ws.id, "PUBLISHED");
                                    await loadData();
                                  }}
                                  className="rounded-xl bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                                >
                                  نشر
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await updateWorksheetStatusAdminAction(ws.id, "ARCHIVED");
                                    await loadData();
                                  }}
                                  className="rounded-xl bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
                                >
                                  أرشفة
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!window.confirm("حذف المنشور نهائياً؟")) return;
                                  await deleteWorksheetAdminAction(ws.id);
                                  await loadData();
                                }}
                                className="rounded-xl bg-rose-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                              >
                                حذف
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

        {activeTab === "teachers" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <input
                type="search"
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                placeholder="ابحث عن عضو بالاسم، البريد، أو @username..."
                className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">المستخدم (@username)</th>
                      <th className="px-4 py-4">الرتبة في النظام</th>
                      <th className="px-4 py-4">تفعيل التوثيق (حصري للمشرف)</th>
                      <th className="px-4 py-4">كود التوثيق الشخصي</th>
                      <th className="px-5 py-4 text-left">تواصل مباشر / حظر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTeachers.map((t) => {
                      const uname =
                        t.username || t.email.split("@")[0].toLowerCase();
                      return (
                        <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/publisher/${t.id}`}
                                className="font-extrabold text-slate-900 hover:text-blue-600 dark:text-white"
                              >
                                {t.name}
                              </Link>
                              <InspectorBadge role={t.role} isVerified={t.isVerified} isBanned={t.isBanned} size="sm" />
                              <UserPresenceBadge
                                presenceStatus={(t as any).presenceStatus}
                                lastSeenAt={(t as any).lastSeenAt}
                                compact
                              />
                              {((t as any).lockedAt || ((t as any).failedLoginAttempts ?? 0) >= 6) && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 border border-amber-300">
                                  🔒 حساب مقفل (6 محاولات كلمة مرور)
                                </span>
                              )}
                              {t.isBanned && (
                                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-800">
                                  🚫 محظور
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                              <Link
                                href={`/u/${uname}`}
                                dir="ltr"
                                className="font-mono text-[11px] font-bold text-blue-600 hover:underline"
                              >
                                @{uname}
                              </Link>
                              <span className="text-[11px] text-slate-400">• {t.email}</span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <select
                              value={t.role}
                              onChange={async (e) => {
                                const nextRole = e.target.value as Role;
                                await updateUserRoleAdminAction(t.id, nextRole);
                                await loadData();
                              }}
                              className="rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            >
                              <option value="TEACHER">معلم (TEACHER)</option>
                              <option value="INSPECTOR">متفقد تربوي (INSPECTOR)</option>
                              <option value="MODERATOR">مسؤول إداري (MODERATOR)</option>
                              <option value="INSTITUTION">مؤسسة تربوية (INSTITUTION)</option>
                              <option value="STUDENT">تلميذ (STUDENT)</option>
                              <option value="ADMIN">مشرف عام (ADMIN)</option>
                            </select>
                          </td>

                          <td className="px-4 py-4">
                            <button
                              type="button"
                              disabled={actionLoadingId === t.id}
                              onClick={() => handleToggleVerifyUser(t)}
                              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition ${
                                t.isVerified
                                  ? "border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                                  : "bg-sky-600 text-white hover:bg-sky-700"
                              }`}
                            >
                              <BadgeCheck className="h-3.5 w-3.5" />
                              {t.isVerified ? "موثق رسمياً (إلغاء)" : "تفعيل التوثيق الآن"}
                            </button>
                          </td>

                          <td className="px-4 py-4">
                            {t.inspectorCode ? (
                              <div className="flex items-center gap-1.5">
                                <span
                                  dir="ltr"
                                  className="rounded-lg bg-amber-50 px-2 py-1 font-mono text-[11px] font-bold text-amber-900"
                                >
                                  {t.inspectorCode}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyCode(t.id, t.inspectorCode!)}
                                  className="rounded-lg border border-slate-200 p-1 text-slate-600 hover:bg-slate-100"
                                >
                                  {copiedCodeId === t.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={async () => {
                                  await generateInspectorCodeAdminAction(
                                    t.id,
                                    t.role === "INSPECTOR"
                                  );
                                  await loadData();
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] font-bold text-amber-900 hover:bg-amber-100"
                              >
                                <Key className="h-3.5 w-3.5" />
                                إصدار كود خاص
                              </button>
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setDmTargetUser(t);
                                  setDmSubject("رسالة مباشرة من المشرف العام");
                                  setDmMessage(`مرحباً @${uname}، `);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[11px] font-bold text-blue-700 hover:bg-blue-100"
                              >
                                <Mail className="h-3.5 w-3.5" />
                                مراسلة
                              </button>
                              {((t as any).lockedAt ||
                                ((t as any).failedLoginAttempts ?? 0) > 0 ||
                                (t.banReason && t.banReason.includes("قفل"))) && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setActionLoadingId(t.id);
                                    await unlockUserAccountAdminAction(t.id);
                                    setBannerMessage(`🔓 تم فك غلق الحساب وتصفير محاولات كلمة المرور للعضو (${t.name}).`);
                                    await loadData();
                                    setActionLoadingId(null);
                                  }}
                                  className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 px-2.5 py-1.5 text-[11px] font-extrabold text-white shadow-sm"
                                  title="فك قفل الحساب الناتج عن تجاوز 6 محاولات لكلمة المرور"
                                >
                                  🔓 فك غلق الحساب
                                </button>
                              )}
                              {t.role !== "ADMIN" && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await toggleBanUserAdminAction(t.id);
                                    await loadData();
                                  }}
                                  className={`rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-white ${
                                    t.isBanned ? "bg-emerald-600" : "bg-rose-600"
                                  }`}
                                >
                                  {t.isBanned ? "رفع الحظر" : "حظر"}
                                </button>
                              )}
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

        {activeTab === "profile_edits" && (
          <div className="space-y-4">
            {data.pendingProfileUsers.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                لا توجد طلبات تعديل ملفات شخصية معلقة حالياً.
              </div>
            ) : (
              data.pendingProfileUsers.map((u) => {
                const pending = (u.pendingProfileData || {}) as {
                  name?: string;
                  username?: string;
                  school?: string | null;
                  bio?: string | null;
                };
                return (
                  <div
                    key={u.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          طلب تعديل من: {u.name} ({u.email})
                        </h3>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                          الاسم الجديد: <strong>{pending.name || u.name}</strong> • المعرّف:{" "}
                          <strong dir="ltr">@{pending.username || u.username}</strong> • المؤسسة:{" "}
                          <strong>{pending.school || "—"}</strong>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={async () => {
                            await approveProfileEditAdminAction(u.id);
                            await loadData();
                          }}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                        >
                          موافقة واعتماد ✓
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await rejectProfileEditAdminAction(u.id);
                            await loadData();
                          }}
                          className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white"
                        >
                          رفض ✕
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-4">
            {data.reports.map((rep) => (
              <div
                key={rep.id}
                className={`rounded-3xl border p-6 shadow-sm ${
                  rep.isInspectorPriority
                    ? "border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    {rep.isInspectorPriority && (
                      <span className="mb-2 inline-block rounded-full bg-rose-600 px-3 py-1 text-[11px] font-extrabold text-white">
                        🚨 إبلاغ مباشر للمشرف مرفوع من المتفقد التربوي ({rep.reporter.name})
                      </span>
                    )}
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {rep.reason}
                    </p>
                    {rep.details && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {rep.details}
                      </p>
                    )}
                  </div>
                  {rep.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          await updateReportStatusAdminAction(rep.id, "RESOLVED");
                          await loadData();
                        }}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                      >
                        اعتماد المعالجة ✓
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await updateReportStatusAdminAction(rep.id, "DISMISSED");
                          await loadData();
                        }}
                        className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
                      >
                        إغلاق
                      </button>
                    </div>
                  ) : (
                    <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      تمت المعالجة
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "support" && (
          <div className="space-y-4">
            {data.supportTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {t.subject}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {t.name} ({t.email})
                    </p>
                    <p className="mt-3 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <MentionText text={t.message} />
                    </p>
                  </div>
                  <div className="w-full sm:w-80">
                    {t.adminReply ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900">
                        <p className="font-bold">✓ الرد المعتمد:</p>
                        <p className="mt-1">{t.adminReply}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={replyTexts[t.id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                          placeholder="اكتب رد المشرف العام..."
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (!replyTexts[t.id]?.trim()) return;
                            await replySupportTicketAdminAction(
                              t.id,
                              replyTexts[t.id],
                              "ANSWERED"
                            );
                            await loadData();
                          }}
                          className="w-full rounded-xl bg-blue-700 py-2 text-xs font-bold text-white"
                        >
                          إرسال الرد
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "audit" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-violet-200/80 bg-gradient-to-l from-violet-50 via-white to-purple-50/40 p-6 shadow-sm dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-600/30">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      سجل النشاطات الرقابية والأمن المتقدم (Audit Logs)
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      مراقبة حية وشاملة لكافة العمليات الحساسة في المنصة: تفعيل التوثيق، إصدار أكواد التفعيل، الحظر، تعديلات الأدوار، وحذف المحتوى.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-xs font-bold text-violet-800 dark:bg-violet-950/80 dark:text-violet-300">
                    إجمالي الأحداث المسجلة: {data.stats.totalAuditLogsCount ?? data.auditLogs?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                <div className="flex flex-1 flex-wrap items-center gap-2 min-w-[280px]">
                  <div className="relative flex-1">
                    <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="بحث بالفاعل، التفاصيل، أو الـ IP..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-xs font-medium placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={auditActionFilter}
                    onChange={(e) => setAuditActionFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="ALL">جميع العمليات ({data.auditLogs?.length ?? 0})</option>
                    <option value="USER_VERIFIED">🎖️ توثيق الحسابات (USER_VERIFIED)</option>
                    <option value="USER_UNVERIFIED">إلغاء التوثيق (USER_UNVERIFIED)</option>
                    <option value="VERIFICATION_CODE_CREATED">🔑 إنشاء كود توثيق (VERIFICATION_CODE_CREATED)</option>
                    <option value="VERIFICATION_CODE_DELETED">حذف كود توثيق (VERIFICATION_CODE_DELETED)</option>
                    <option value="USER_BANNED">🚫 حظر مستخدم (USER_BANNED)</option>
                    <option value="USER_UNBANNED">رفع الحظر (USER_UNBANNED)</option>
                    <option value="USER_ROLE_CHANGED">تغيير رتبة (USER_ROLE_CHANGED)</option>
                    <option value="PROFILE_APPROVED">موافقة على تعديل ملف (PROFILE_APPROVED)</option>
                    <option value="PROFILE_REJECTED">رفض تعديل ملف (PROFILE_REJECTED)</option>
                    <option value="WORKSHEET_DELETED">🗑️ حذف منشور (WORKSHEET_DELETED)</option>
                    <option value="WORKSHEET_STATUS_CHANGED">تغيير حالة منشور (WORKSHEET_STATUS_CHANGED)</option>
                    <option value="WORKSHEET_ENDORSED">اعتماد بيداغوجي (WORKSHEET_ENDORSED)</option>
                    <option value="WORKSHEET_UNENDORSED">إلغاء اعتماد بيداغوجي (WORKSHEET_UNENDORSED)</option>
                    <option value="DIRECT_MESSAGE_SENT">✉️ رسالة توجيه مباشرة (DIRECT_MESSAGE_SENT)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
                    <tr>
                      <th className="px-4 py-3.5">التاريخ والوقت</th>
                      <th className="px-4 py-3.5">الفاعل (المستخدم والرتبة)</th>
                      <th className="px-4 py-3.5">العملية والنوع</th>
                      <th className="px-4 py-3.5">الهدف</th>
                      <th className="px-4 py-3.5">البيان والتفاصيل</th>
                      <th className="px-4 py-3.5">عنوان IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredAuditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          لا توجد سجلات نشاطات تطابق الفلتر الحالي.
                        </td>
                      </tr>
                    ) : (
                      filteredAuditLogs.map((log) => {
                        const isSecurityAlert =
                          log.action === "USER_BANNED" ||
                          log.action === "WORKSHEET_DELETED" ||
                          log.action === "USER_ROLE_CHANGED";
                        const isSuccessEvent =
                          log.action === "USER_VERIFIED" ||
                          log.action === "WORKSHEET_ENDORSED" ||
                          log.action === "PROFILE_APPROVED" ||
                          log.action === "VERIFICATION_CODE_CREATED";

                        const actionLabelAr =
                          log.action === "USER_VERIFIED"
                            ? "توثيق حساب"
                            : log.action === "USER_UNVERIFIED"
                            ? "إلغاء توثيق"
                            : log.action === "VERIFICATION_CODE_CREATED"
                            ? "إنشاء كود توثيق"
                            : log.action === "VERIFICATION_CODE_DELETED"
                            ? "حذف كود توثيق"
                            : log.action === "USER_BANNED"
                            ? "حظر مستخدم"
                            : log.action === "USER_UNBANNED"
                            ? "رفع الحظر"
                            : log.action === "USER_ROLE_CHANGED"
                            ? "تغيير رتبة"
                            : log.action === "PROFILE_APPROVED"
                            ? "اعتماد ملف"
                            : log.action === "PROFILE_REJECTED"
                            ? "رفض تعديل ملف"
                            : log.action === "WORKSHEET_DELETED"
                            ? "حذف منشور"
                            : log.action === "WORKSHEET_STATUS_CHANGED"
                            ? "تغيير حالة منشور"
                            : log.action === "WORKSHEET_ENDORSED"
                            ? "اعتماد بيداغوجي"
                            : log.action === "WORKSHEET_UNENDORSED"
                            ? "إلغاء اعتماد بيداغوجي"
                            : log.action === "DIRECT_MESSAGE_SENT"
                            ? "رسالة مباشرة"
                            : log.action;

                        return (
                          <tr
                            key={log.id}
                            className={`transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40 ${
                              isSecurityAlert
                                ? "bg-rose-50/20 dark:bg-rose-950/10"
                                : ""
                            }`}
                          >
                            <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                              {new Date(log.createdAt).toLocaleString("ar-TN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-extrabold text-slate-900 dark:text-white">
                                {log.actorName}
                              </div>
                              <span className="inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {log.actorRole}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                                  isSecurityAlert
                                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                                    : isSuccessEvent
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                                }`}
                              >
                                {actionLabelAr}
                              </span>
                              <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                                {log.action}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold dark:bg-slate-800">
                                {log.targetType}
                              </span>
                              {log.targetId && (
                                <div className="mt-0.5 text-[10px] text-slate-400" title={log.targetId}>
                                  {log.targetId.slice(0, 8)}...
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                              <div className="max-w-md font-medium leading-relaxed">
                                {log.details || "—"}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                              {log.ipAddress || "داخلي"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {dmTargetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                ✉️ مراسلة مباشرة من المشرف العام إلى ({dmTargetUser.name})
              </h3>
              <button
                type="button"
                onClick={() => setDmTargetUser(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSendDirectMessage} className="space-y-4">
              <input
                type="text"
                required
                value={dmSubject}
                onChange={(e) => setDmSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <textarea
                rows={4}
                required
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDmTargetUser(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={sendingDm}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-5 py-2 text-xs font-bold text-white"
                >
                  <Send className="h-3.5 w-3.5" />
                  {sendingDm ? "جاري الإرسال..." : "إرسال الآن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}