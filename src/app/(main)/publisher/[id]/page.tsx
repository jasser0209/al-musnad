"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  School,
  Heart,
  FileText,
  BadgeCheck,
  UserPlus,
  UserCheck,
  Loader2,
  Calendar,
  ArrowRight,
  Flag,
  Ban,
  X,
} from "lucide-react";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { UserAvatarWithPresence, UserPresenceBadge } from "@/components/ui/UserPresenceIndicator";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import {
  getPublicPublisherProfileData,
  toggleFollowPublisherAction,
  toggleFavoritePublisherAction,
} from "@/actions/publisher.actions";
import { submitReportAction } from "@/actions/report-support.actions";

type PublisherData = Awaited<ReturnType<typeof getPublicPublisherProfileData>>;

export default function PublicPublisherProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const publisherId = params?.id;

  const [data, setData] = useState<PublisherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);

  const [isFavPublisher, setIsFavPublisher] = useState(false);
  const [favoritedByCount, setFavoritedByCount] = useState(0);
  const [favLoading, setFavLoading] = useState(false);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("انتحال صفة تربوية أو مؤسسة");
  const [reportDetails, setReportDetails] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    if (!publisherId) return;
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await getPublicPublisherProfileData(publisherId);
        if (isMounted) {
          setData(res);
          setIsFollowing(res.viewerState.isFollowing);
          setFollowersCount(res.stats.followersCount);
          setIsFavPublisher(res.viewerState.isFavoritedPublisher);
          setFavoritedByCount(res.stats.favoritedByCount);
        }
      } catch (err) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "تعذر تحميل ملف الناشر";
          if (msg.includes("تسجيل الدخول")) {
            router.replace(`/login?redirectTo=${encodeURIComponent(`/publisher/${publisherId}`)}`);
            return;
          }
          setError(msg);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [publisherId]);

  const handleToggleFollow = async () => {
    if (!publisherId || followLoading) return;
    try {
      setFollowLoading(true);
      const res = await toggleFollowPublisherAction(publisherId);
      setIsFollowing(res.isFollowing);
      setFollowersCount(res.followersCount);
    } catch (err) {
      if (err instanceof Error && err.message.includes("تسجيل الدخول")) {
        router.push(`/login?redirectTo=/publisher/${publisherId}`);
      } else {
        alert(err instanceof Error ? err.message : "تعذر تنفيذ العملية");
      }
    } finally {
      setFollowLoading(false);
    }
  };

  const handleToggleFavPublisher = async () => {
    if (!publisherId || favLoading) return;
    try {
      setFavLoading(true);
      const res = await toggleFavoritePublisherAction(publisherId);
      setIsFavPublisher(res.isFavoritedPublisher);
      setFavoritedByCount(res.favoritedByCount);
    } catch (err) {
      if (err instanceof Error && err.message.includes("تسجيل الدخول")) {
        router.push(`/login?redirectTo=/publisher/${publisherId}`);
      } else {
        alert(err instanceof Error ? err.message : "تعذر تنفيذ العملية");
      }
    } finally {
      setFavLoading(false);
    }
  };

  const handleReportPublisher = async (e: FormEvent) => {
    e.preventDefault();
    if (!publisherId) return;
    try {
      setReportLoading(true);
      await submitReportAction({
        targetType: "USER",
        targetUserId: publisherId,
        reason: reportReason,
        details: reportDetails,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setIsReportOpen(false);
        setReportSuccess(false);
        setReportDetails("");
      }, 1800);
    } catch (err) {
      alert(err instanceof Error ? err.message : "يرجى تسجيل الدخول لإرسال البلاغ");
    } finally {
      setReportLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4" dir="rtl">
        <p className="text-slate-800 dark:text-white font-bold text-lg">
          {error || "الملف الشخصي للناشر غير متاح"}
        </p>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للنشرات</span>
        </Link>
      </div>
    );
  }

  const { publisher, worksheets, stats, viewerState } = data;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      {publisher.isBanned && (
        <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-900 flex items-center gap-3">
          <Ban className="w-6 h-6 text-red-600 shrink-0" />
          <div className="text-xs">
            <p className="font-black text-sm">هذا الناشر محظور حالياً من قِبل إدارة المنصة</p>
            {publisher.banReason && <p className="mt-0.5">السبب: {publisher.banReason}</p>}
          </div>
        </div>
      )}

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {publisher.name.charAt(0)}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {publisher.role === "INSTITUTION"
                    ? publisher.name
                    : `أ. ${publisher.name}`}
                </h1>
                <InspectorBadge
                  role={publisher.role}
                  isVerified={publisher.isVerified}
                  isBanned={publisher.isBanned}
                  size="md"
                />
                <UserPresenceBadge
                  presenceStatus={(publisher as any).presenceStatus}
                  lastSeenAt={(publisher as any).lastSeenAt}
                />
                {publisher.username && (
                  <span
                    dir="ltr"
                    className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300"
                  >
                    @{publisher.username}
                  </span>
                )}
              </div>

              {publisher.school && (
                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                  <School className="w-4 h-4 text-blue-600" />
                  <span>{publisher.school}</span>
                </p>
              )}

              {publisher.bio && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {publisher.bio}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    عضو في المسند منذ{" "}
                    {new Date(publisher.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {viewerState.isOwnProfile ? (
              <Link
                href="/profile?tab=edit"
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white text-xs font-bold transition"
              >
                تعديل ملفي الشخصي
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  disabled={followLoading}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                    isFollowing
                      ? "bg-slate-900 dark:bg-slate-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {followLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isFollowing ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span>{isFollowing ? "متابَع ✓" : "+ متابعة الناشر"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleFavPublisher}
                  disabled={favLoading}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 transition cursor-pointer ${
                    isFavPublisher
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavPublisher ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>
                    {isFavPublisher ? "الناشر في مفضلتي" : "إضافة للمفضلة"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="p-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                  title="الإبلاغ عن هذا الناشر"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5">
            <span className="text-xs text-slate-500 block">النشرات</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {stats.worksheetsCount}
            </span>
          </div>
          <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-3.5 border border-amber-200/60">
            <span className="text-xs text-amber-800 dark:text-amber-300 block">
              معتمد من المتفقد
            </span>
            <span className="text-xl font-black text-amber-600 flex items-center justify-center gap-1">
              <BadgeCheck className="w-5 h-5" />
              {stats.endorsedCount}
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5">
            <span className="text-xs text-slate-500 block">المتابعون</span>
            <span className="text-xl font-black text-blue-600">
              {followersCount}
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5">
            <span className="text-xs text-slate-500 block">في مفضلة الأعضاء</span>
            <span className="text-xl font-black text-rose-600">
              {favoritedByCount}
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-500 block">إجمالي التحميلات</span>
            <span className="text-xl font-black text-emerald-600">
              {stats.totalDownloads}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>نشرات وأعمال الناشر ({worksheets.length})</span>
        </h2>

        {worksheets.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500">
            لا توجد نشرات متاحة للعرض في هذا الملف حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheets.map((ws) => (
              <WorksheetCard key={ws.id} worksheet={ws as any} />
            ))}
          </div>
        )}
      </section>

      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-600" />
                <span>إرسال بلاغ عن هذا الناشر</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-2xl font-bold text-xs">
                تم استلام بلاغك بنجاح وستقوم الإدارة بمراجعته فوراً.
              </div>
            ) : (
              <form onSubmit={handleReportPublisher} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    سبب البلاغ *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="انتحال صفة تربوية أو مؤسسة">
                      انتحال صفة تربوية أو مؤسسة
                    </option>
                    <option value="نشر محتوى مخالف للضوابط التربوية">
                      نشر محتوى مخالف للضوابط التربوية
                    </option>
                    <option value="معلومات مضللة في الملف الشخصي">
                      معلومات مضللة في الملف الشخصي
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تفاصيل إضافية
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="أضف تفاصيل البلاغ للإدارة..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={reportLoading}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    {reportLoading ? "جاري الإرسال..." : "إرسال البلاغ"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}