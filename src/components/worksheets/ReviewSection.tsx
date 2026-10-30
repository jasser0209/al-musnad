"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  Star,
  MessageSquare,
  Send,
  Trash2,
  Loader2,
  School,
  User as UserIcon,
  BadgeCheck,
  Pin,
  Lock,
  AtSign,
} from "lucide-react";
import InspectorBadge from "@/components/ui/InspectorBadge";
import MentionText from "@/components/ui/MentionText";

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  isOfficialDirective?: boolean;
  isPrivateToPublisher?: boolean;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    username?: string | null;
    avatarUrl: string | null;
    school: string | null;
    role?: string;
    isVerified?: boolean;
  };
}

interface MentionCandidate {
  id: string;
  name: string;
  username: string;
  role: string;
  school: string | null;
  isVerified: boolean;
}

interface ReviewSectionProps {
  worksheetId: string;
  initialRatingAvg: number;
  initialReviewCount: number;
}

export default function ReviewSection({
  worksheetId,
  initialRatingAvg,
  initialReviewCount,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isPrivateToPublisher, setIsPrivateToPublisher] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [ratingAvg, setRatingAvg] = useState<number>(initialRatingAvg || 0);
  const [reviewCount, setReviewCount] = useState<number>(
    initialReviewCount || 0
  );

  // @username Autocomplete State
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionCandidates, setMentionCandidates] = useState<MentionCandidate[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadReviewsAndUser() {
      try {
        setLoading(true);
        const [revRes, meRes] = await Promise.all([
          fetch(`/api/worksheets/${worksheetId}/reviews`),
          fetch("/api/auth/me").catch(() => null),
        ]);

        const revJson = await revRes.json();
        let myId: string | null = null;

        if (meRes && meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.success && meJson.data?.id) {
            myId = meJson.data.id;
            if (isMounted) setCurrentUserRole(meJson.data.role || null);
          }
        }

        if (isMounted) {
          setCurrentUserId(myId);
          if (revJson.success && Array.isArray(revJson.data)) {
            setReviews(revJson.data);
          }
        }
      } catch {
        // Fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReviewsAndUser();
    return () => {
      isMounted = false;
    };
  }, [worksheetId]);

  // Detect `@` token at the end of comment for live `@username` autocomplete
  useEffect(() => {
    const match = comment.match(/@([a-zA-Z0-9_.]*)$/);
    if (!match) {
      setMentionQuery(null);
      setMentionCandidates([]);
      return;
    }
    const q = match[1];
    setMentionQuery(q);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/users/mentions?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setMentionCandidates(json.data);
        }
      } catch {
        // Ignore
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [comment]);

  const handleInsertMention = (username: string) => {
    const nextText = comment.replace(/@([a-zA-Z0-9_.]*)$/, `@${username} `);
    setComment(nextText);
    setMentionQuery(null);
    setMentionCandidates([]);
  };

  const isInspectorOrStaff =
    currentUserRole === "INSPECTOR" ||
    currentUserRole === "MODERATOR" ||
    currentUserRole === "ADMIN";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUserId) {
      setError("يرجى تسجيل الدخول لإضافة تعليق");
      return;
    }

    if (comment.trim().length < 2) {
      setError("يرجى كتابة تعليق لا يقل عن حرفين");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/worksheets/${worksheetId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          isPrivateToPublisher: isInspectorOrStaff ? isPrivateToPublisher : false,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || "تعذر حفظ التعليق");
        return;
      }

      const savedReview: ReviewItem = json.data;
      setReviews((prev) => {
        const combined = [savedReview, ...prev];
        return combined.sort((a, b) => {
          const aOff = a.isOfficialDirective ? 1 : 0;
          const bOff = b.isOfficialDirective ? 1 : 0;
          if (bOff !== aOff) return bOff - aOff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      });

      setComment("");
      setIsPrivateToPublisher(false);
    } catch {
      setError("حدث خطأ في الاتصال بالخادم");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      setSubmitting(true);
      const res = await fetch(
        `/api/worksheets/${worksheetId}/reviews?reviewId=${reviewId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/60 dark:bg-amber-950/50 dark:text-amber-400">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              التعليقات، التوجيهات البيداغوجية والمناقشات
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              يمكنك الإشارة لأي عضو أو ناشر باستخدام <code dir="ltr" className="font-bold text-blue-600">@username</code>، وبالضغط على الاسم تنتقل مباشرة إلى صفحة الناشر.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5 dark:bg-slate-800">
          <span className="text-xl font-black text-slate-900 dark:text-white">
            {ratingAvg > 0 ? ratingAvg.toFixed(1) : "جديد"}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            ({reviews.length} تعليق)
          </span>
        </div>
      </div>

      {/* Add Comment Form */}
      {currentUserId ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUserRole === "INSPECTOR"
                ? "إضافة تعليق متفقد (في الصدارة أو خاص للناشر)"
                : "أضف تعليقك أو أشر لناشر بـ @username"}
            </h3>

            {/* Inspector / Staff Mode Selector */}
            {isInspectorOrStaff && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPrivateToPublisher(false)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    !isPrivateToPublisher
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Pin className="h-3.5 w-3.5" />
                  تعليق يظهر في الصدارة
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrivateToPublisher(true)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    isPrivateToPublisher
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Lock className="h-3.5 w-3.5" />
                  تعليق خاص مباشرة إلى الناشر
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* Star Rating */}
          {!isPrivateToPublisher && (
            <div className="mt-3 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="rounded-lg p-1 transition hover:scale-110"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        active ? "fill-amber-400 text-amber-400" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Comment Textarea with @username Autocomplete */}
          <div className="relative mt-3">
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                isPrivateToPublisher
                  ? "اكتب تعليقك الخاص الموجه مباشرة إلى الناشر (لا يراه سوى الناشر والطاقم الرقابي)... يمكنك الإشارة بـ @username"
                  : "اكتب تعليقك التربوي... اكتب @ للإشارة إلى أي مستخدم أو ناشر بالـ username"
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />

            {mentionQuery !== null && mentionCandidates.length > 0 && (
              <div className="absolute bottom-full right-0 z-30 mb-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800">
                  اختر مستخدماً للإشارة إليه بـ @username:
                </div>
                {mentionCandidates.map((cand) => (
                  <button
                    key={cand.id}
                    type="button"
                    onClick={() => handleInsertMention(cand.username)}
                    className="flex w-full items-center justify-between px-3.5 py-2 text-right text-xs hover:bg-blue-50 dark:hover:bg-slate-800"
                  >
                    <span className="font-bold text-slate-900 dark:text-white">
                      {cand.name}
                    </span>
                    <span dir="ltr" className="font-mono text-[11px] font-bold text-blue-600">
                      @{cand.username}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setComment((prev) => `${prev}@`)}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
            >
              <AtSign className="h-3.5 w-3.5" />
              إشارة لمستخدم (@username)
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isPrivateToPublisher ? "إرسال التعليق الخاص للناشر" : "نشر التعليق"}
            </button>
          </div>
        </form>
      ) : null}

      {/* Comments List */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500 dark:border-slate-800">
            لا توجد تعليقات بعد. كن أول من يشارك رأيه أو يوجه إشارة بـ @username!
          </div>
        ) : (
          reviews.map((rev) => {
            const isPinned = rev.isOfficialDirective || rev.user.role === "INSPECTOR";
            const isPrivate = Boolean(rev.isPrivateToPublisher);
            const uname =
              rev.user.username ||
              `user_${rev.user.id.slice(0, 5)}`;

            return (
              <div
                key={rev.id}
                className={`rounded-2xl border p-5 transition ${
                  isPrivate
                    ? "border-purple-300 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20"
                    : isPinned
                    ? "border-amber-300 bg-gradient-to-l from-amber-50/70 via-white to-white shadow-sm dark:border-amber-800 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900"
                    : "border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/publisher/${rev.user.id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800 hover:ring-2 hover:ring-blue-500 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {rev.user.name.charAt(0)}
                    </Link>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/publisher/${rev.user.id}`}
                          className="text-sm font-extrabold text-slate-900 hover:text-blue-700 dark:text-white"
                        >
                          {rev.user.name}
                        </Link>
                        <Link
                          href={`/u/${uname}`}
                          dir="ltr"
                          className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-300"
                          title="الانتقال إلى صفحة الناشر"
                        >
                          @{uname}
                        </Link>
                        {isPrivate && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                            <Lock className="h-3 w-3" />
                            تعليق خاص موجه مباشرة للناشر
                          </span>
                        )}
                        {!isPrivate && isPinned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                            <Pin className="h-3 w-3" />
                            تعليق متفقد في الصدارة
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(rev.createdAt).toLocaleDateString("ar-TN")}
                      </span>
                    </div>
                  </div>

                  {(currentUserId === rev.userId ||
                    currentUserRole === "ADMIN" ||
                    currentUserRole === "MODERATOR") && (
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(rev.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      title="حذف التعليق"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  <MentionText text={rev.comment} />
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}