"use client";

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Trash2,
  Ban,
  Headphones,
  Flag,
  Mail,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Send,
  X,
  Lock,
} from "lucide-react";
import {
  getModeratorDashboardData,
  deleteWorksheetModeratorAction,
  updateWorksheetStatusModeratorAction,
  toggleBanUserModeratorAction,
  unlockUserAccountModeratorAction,
  replySupportTicketModeratorAction,
  resolveReportModeratorAction,
  sendDirectMessageToPublisherAction,
} from "@/actions/moderator.actions";
import MentionText from "@/components/ui/MentionText";
import { UserPresenceBadge } from "@/components/ui/UserPresenceIndicator";
import SupervisoryHierarchyBar from "@/components/layout/SupervisoryHierarchyBar";

type ModeratorData = Awaited<ReturnType<typeof getModeratorDashboardData>>;
type ModeratorPublisher = ModeratorData["publishers"][number];

export default function ModeratorDashboardPage() {
  const [data, setData] = useState<ModeratorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "worksheets" | "users" | "support" | "reports"
  >("worksheets");

  const [search, setSearch] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  // Direct Message Modal State
  const [dmTargetUser, setDmTargetUser] = useState<ModeratorPublisher | null>(null);
  const [dmSubject, setDmSubject] = useState("رسالة إدارية مباشرة من مسؤول المنصة");
  const [dmMessage, setDmMessage] = useState("");
  const [sendingDm, setSendingDm] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getModeratorDashboardData();
      setData(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "غير مصرح لك بالدخول إلى لوحة تحكم المسؤول"
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
    if (!search.trim()) return data.worksheets;
    const q = search.trim().toLowerCase();
    return data.worksheets.filter(
      (w) =>
        (w.titleAr || w.title).toLowerCase().includes(q) ||
        w.uploader.name.toLowerCase().includes(q) ||
        (w.uploader.username || "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const filteredPublishers = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data.publishers;
    const q = search.trim().toLowerCase();
    return data.publishers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.username || "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const handleDeleteWorksheet = async (id: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف المنشور "${title}" نهائياً؟`)) return;
    try {
      setActionLoadingId(id);
      await deleteWorksheetModeratorAction(id);
      setBannerMessage(`تم حذف المنشور "${title}" بنجاح.`);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل حذف المنشور");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleBan = async (u: ModeratorPublisher) => {
    const reason = !u.isBanned
      ? window.prompt("أدخل سبب حظر المستخدم:", "مخالفة شروط وضوابط النشر في المنصة")
      : undefined;
    if (!u.isBanned && reason === null) return;

    try {
      setActionLoadingId(u.id);
      await toggleBanUserModeratorAction(u.id, reason || undefined);
      setBannerMessage(
        !u.isBanned
          ? `تم حظر المستخدم (${u.name}) بنجاح.`
          : `تم رفع الحظر عن المستخدم (${u.name}).`
      );
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر تغيير حالة الحظر");
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
      setBannerMessage(`✉️ تم إرسال الرسالة المباشرة إلى الناشر (${dmTargetUser.name}) بنجاح.`);
      setDmTargetUser(null);
      setDmMessage("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال الرسالة المباشرة");
    } finally {
      setSendingDm(false);
    }
  };

  const handleReplyTicket = async (ticketId: string) => {
    const text = replyTexts[ticketId] || "";
    if (!text.trim()) return;
    try {
      setActionLoadingId(ticketId);
      await replySupportTicketModeratorAction(ticketId, text, "ANSWERED");
      setBannerMessage("تم إرسال رد الدعم الفني وإغلاق التذكرة.");
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال الرد");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-600" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          جاري تحميل لوحة تحكم المسؤول...
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
            وصول مقيد — لوحة تحكم حصرية للمسؤول الإداري
          </h1>
          <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
            لا يمكن للمتفقد أو غيره الانتقال إلى لوحة المسؤول؛ كل رتبة تكتفي بالصلاحيات واللوحة المخصصة لها فقط.
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
        {/* Supervisory Hierarchy Bar: Shows Admin Switcher + "Return to Admin Dashboard" ONLY if viewerRole === "ADMIN", otherwise shows Exclusive Moderator Scope Notice */}
        <SupervisoryHierarchyBar
          viewerRole={data.moderator.role}
          currentDashboard="MODERATOR"
        />

        {/* Header */}
        <div className="mb-8 rounded-3xl border border-indigo-200/80 bg-gradient-to-l from-indigo-50 via-white to-indigo-50/40 p-6 shadow-sm dark:border-indigo-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                لوحة تحكم المسؤول ({data.moderator.name})
              </h1>
            </div>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <RefreshCw className="h-4 w-4" />
              تحديث
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-500">إجمالي المنشورات</span>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                {data.stats.totalWorksheets}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300">
                المستخدمون المحظورون
              </span>
              <p className="mt-1 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
                {data.stats.bannedUsersCount}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                تذاكر الدعم الفني المفتوحة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {data.stats.openTicketsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                البلاغات قيد المعالجة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {data.stats.pendingReportsCount}
              </p>
            </div>
          </div>
        </div>

        {bannerMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>✓ {bannerMessage}</span>
            <button type="button" onClick={() => setBannerMessage(null)}>✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("worksheets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "worksheets"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Trash2 className="h-4 w-4" />
            حذف وإدارة المنشورات ({data.worksheets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "users"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Ban className="h-4 w-4" />
            حظر المستخدمين والتواصل المباشر مع الناشرين ({data.publishers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "support"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Headphones className="h-4 w-4" />
            إدارة قسم الدعم الفني ({data.stats.openTicketsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "reports"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Flag className="h-4 w-4" />
            معالجة البلاغات ({data.stats.pendingReportsCount})
          </button>
        </div>

        {/* Search Bar for Worksheets & Users */}
        {(activeTab === "worksheets" || activeTab === "users") && (
          <div className="mb-4">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو العنوان أو @username..."
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        )}

        {/* TAB 1: DELETE & MANAGE WORKSHEETS */}
        {activeTab === "worksheets" && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th className="px-5 py-4">المنشور</th>
                    <th className="px-4 py-4">الناشر (@username)</th>
                    <th className="px-4 py-4">المستوى / المادة</th>
                    <th className="px-4 py-4">الحالة</th>
                    <th className="px-5 py-4 text-left">صلاحيات المسؤول</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredWorksheets.map((ws) => {
                    const uname =
                      ws.uploader.username ||
                      ws.uploader.email.split("@")[0].toLowerCase();
                    return (
                      <tr key={ws.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                          <Link href={`/worksheet/${ws.id}`} className="hover:text-indigo-600">
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
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {ws.status === "PUBLISHED"
                              ? "منشور"
                              : ws.status === "DRAFT"
                              ? "مسودة قيد التحويل"
                              : "مؤرشف"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {ws.status !== "PUBLISHED" ? (
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={async () => {
                                  setActionLoadingId(ws.id);
                                  await updateWorksheetStatusModeratorAction(ws.id, "PUBLISHED");
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700"
                              >
                                نشر
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={async () => {
                                  setActionLoadingId(ws.id);
                                  await updateWorksheetStatusModeratorAction(ws.id, "ARCHIVED");
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="rounded-xl bg-amber-100 px-3 py-1.5 text-[11px] font-bold text-amber-900 hover:bg-amber-200"
                              >
                                أرشفة
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={actionLoadingId === ws.id}
                              onClick={() =>
                                handleDeleteWorksheet(ws.id, ws.titleAr || ws.title)
                              }
                              className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-rose-700"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              حذف المنشور
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
        )}

        {/* TAB 2: BAN USERS & DIRECT COMMUNICATION WITH PUBLISHERS */}
        {activeTab === "users" && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th className="px-5 py-4">العضو / الناشر</th>
                    <th className="px-4 py-4">اسم المستخدم (@username)</th>
                    <th className="px-4 py-4">الرتبة والحالة</th>
                    <th className="px-4 py-4">التوثيق الرسمي</th>
                    <th className="px-5 py-4 text-left">التواصل المباشر والحظر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPublishers.map((u) => {
                    const uname =
                      u.username || u.email.split("@")[0].toLowerCase();
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-5 py-4">
                          <Link
                            href={`/publisher/${u.id}`}
                            className="font-extrabold text-slate-900 hover:text-indigo-600 dark:text-white"
                          >
                            {u.name}
                          </Link>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/u/${uname}`}
                            dir="ltr"
                            className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700 hover:underline dark:bg-blue-950/60 dark:text-blue-300"
                          >
                            @{uname}
                          </Link>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {u.role}
                            </span>
                            <UserPresenceBadge
                              presenceStatus={(u as any).presenceStatus}
                              lastSeenAt={(u as any).lastSeenAt}
                              compact
                            />
                            {((u as any).lockedAt || ((u as any).failedLoginAttempts ?? 0) >= 6) && (
                              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-900 border border-amber-300">
                                🔒 مقفل (6 محاولات كلمة مرور)
                              </span>
                            )}
                            {u.isBanned && (
                              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-extrabold text-rose-800">
                                🚫 محظور
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            <Lock className="h-3 w-3" />
                            {u.isVerified ? "موثق (بأمر المشرف)" : "التوثيق حصري للمشرف"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setDmTargetUser(u);
                                setDmSubject("توجيه إداري مباشر من مسؤول المنصة");
                                setDmMessage(`مرحباً @${uname}، `);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              تواصل مباشر مع الناشر
                            </button>

                            {((u as any).lockedAt ||
                              ((u as any).failedLoginAttempts ?? 0) > 0 ||
                              (u.banReason && u.banReason.includes("قفل"))) && (
                              <button
                                type="button"
                                disabled={actionLoadingId === u.id}
                                onClick={async () => {
                                  setActionLoadingId(u.id);
                                  await unlockUserAccountModeratorAction(u.id);
                                  setBannerMessage(`🔓 تم فك غلق الحساب وتصفير محاولات كلمة المرور للعضو (${u.name}).`);
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-sm transition"
                              >
                                🔓 فك غلق الحساب
                              </button>
                            )}
                            {u.role !== "ADMIN" && u.role !== "MODERATOR" && (
                              <button
                                type="button"
                                disabled={actionLoadingId === u.id}
                                onClick={() => handleToggleBan(u)}
                                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white transition ${
                                  u.isBanned
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-rose-600 hover:bg-rose-700"
                                }`}
                              >
                                <Ban className="h-3.5 w-3.5" />
                                {u.isBanned ? "رفع الحظر" : "حظر المستخدم"}
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
        )}

        {/* TAB 3: TECHNICAL SUPPORT MANAGEMENT */}
        {activeTab === "support" && (
          <div className="space-y-4">
            {data.supportTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">
                      {t.category}
                    </span>
                    <h3 className="mt-2 text-sm font-extrabold text-slate-900 dark:text-white">
                      {t.subject}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      المرسل: {t.name} ({t.email})
                    </p>
                    <p className="mt-3 rounded-2xl bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <MentionText text={t.message} />
                    </p>
                  </div>
                  <div className="w-full sm:w-80">
                    {t.adminReply ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <p className="font-extrabold">✓ تم الرد:</p>
                        <p className="mt-1">
                          <MentionText text={t.adminReply} />
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={replyTexts[t.id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                          placeholder="اكتب رد قسم الدعم الفني هنا..."
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <button
                          type="button"
                          disabled={actionLoadingId === t.id}
                          onClick={() => handleReplyTicket(t.id)}
                          className="w-full rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                        >
                          إرسال الرد وإغلاق التذكرة
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: REPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            {data.reports.map((rep) => (
              <div
                key={rep.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    {rep.isInspectorPriority && (
                      <span className="mb-2 inline-block rounded-full bg-rose-100 px-3 py-1 text-[11px] font-extrabold text-rose-800">
                        🚨 إبلاغ ذو أولوية مرفوع من المتفقد
                      </span>
                    )}
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                      السبب: {rep.reason}
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
                          await resolveReportModeratorAction(rep.id, "RESOLVED");
                          await loadData();
                        }}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                      >
                        تمت المعالجة ✓
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await resolveReportModeratorAction(rep.id, "DISMISSED");
                          await loadData();
                        }}
                        className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
                      >
                        تجاهل
                      </button>
                    </div>
                  ) : (
                    <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      تمت المراجعة
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Direct Communication with Publisher */}
      {dmTargetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                ✉️ التواصل المباشر مع الناشر ({dmTargetUser.name})
              </h3>
              <button
                type="button"
                onClick={() => setDmTargetUser(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSendDirectMessage} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  عنوان الرسالة المباشرة *
                </label>
                <input
                  type="text"
                  required
                  value={dmSubject}
                  onChange={(e) => setDmSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  نص الرسالة (تصل مباشرة إلى إشعارات الناشر وتدعم الإشارة بـ @username) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={dmMessage}
                  onChange={(e) => setDmMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
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
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  {sendingDm ? "جاري الإرسال..." : "إرسال للناشر"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}