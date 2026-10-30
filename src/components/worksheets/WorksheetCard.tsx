"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, Lock, Users, FileText, FolderOpen } from "lucide-react";
import type { WorksheetWithRelations } from "@/types/api";
import { getFileFormatInfo } from "@/config/constants";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { UserAvatarWithPresence } from "@/components/ui/UserPresenceIndicator";

interface WorksheetCardProps {
  worksheet: WorksheetWithRelations;
  guestTitleOnly?: boolean;
}

const AUDIENCE_LABELS: Record<string, { label: string; isRestricted: boolean }> = {
  TEACHERS_ONLY: { label: "للمعلمين فقط (إصلاح / مذكرة)", isRestricted: true },
  SAME_ROLE_ONLY: { label: "خاص بنفس فئة الناشر", isRestricted: true },
  INSTITUTIONS_ONLY: { label: "خاص بالمؤسسات", isRestricted: true },
  TEACHERS_AND_STUDENTS: { label: "للمعلمين والتلاميذ", isRestricted: false },
  ALL: { label: "متاح للجميع", isRestricted: false },
};

export default function WorksheetCard({
  worksheet,
  guestTitleOnly = false,
}: WorksheetCardProps) {
  const router = useRouter();
  const [favoriteCount, setFavoriteCount] = useState(
    worksheet.favoriteCount ?? (worksheet as any).favoritesCount ?? 0
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const hasValidThumbnail = Boolean(
    worksheet.thumbnailUrl &&
      !thumbError &&
      !(worksheet.thumbnailUrl.includes('X-Amz-Credential=') &&
        (worksheet.thumbnailUrl.split('X-Amz-Credential=')[1]?.split('%2F')[0]?.split('/')[0]?.length || 32) !== 32)
  );

  const title = worksheet.titleAr || worksheet.title;
  const subjectColor = worksheet.subject?.color || "#2563EB";
  const downloadCount =
    worksheet.downloadCount ?? (worksheet as any).downloadsCount ?? 0;
  const audienceInfo =
    AUDIENCE_LABELS[worksheet.audience || "TEACHERS_AND_STUDENTS"] ||
    AUDIENCE_LABELS.TEACHERS_AND_STUDENTS;
  const formatInfo = getFileFormatInfo(worksheet.fileName);
  const categoryNameAr = worksheet.category?.nameAr || "درس";

  // Guest Title-Only View: Shows the file title & full classification badges (Subject + Grade + Section + File Type)
  if (guestTitleOnly) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span
              className="px-2.5 py-0.5 rounded-md font-bold text-white"
              style={{ backgroundColor: subjectColor }}
            >
              {worksheet.subject?.nameAr || "مادة دراسية"}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              {worksheet.grade?.nameAr || "السنة الدراسية"}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/70 dark:border-blue-800">
              قسم: {categoryNameAr}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold border text-[10px] ${formatInfo.badgeClass}`}
            >
              {formatInfo.labelAr}
            </span>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-relaxed">
              {title}
            </h3>
          </div>
        </div>

        <Link
          href={`/login?redirectTo=${encodeURIComponent(`/worksheet/${worksheet.id}`)}`}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition"
        >
          <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>سجّل الدخول لقراءة أو تحميل الملف</span>
        </Link>
      </div>
    );
  }

  const handleQuickFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isToggling) return;

    try {
      setIsToggling(true);
      const res = await fetch(`/api/worksheets/${worksheet.id}/favorite`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push(`/login?redirectTo=/worksheet/${worksheet.id}`);
        return;
      }

      const json = await res.json();
      if (json.success) {
        setIsFavorited(json.data.isFavorited);
        setFavoriteCount(json.data.favoriteCount);
      }
    } catch (err) {
      console.error("Quick favorite error:", err);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div
      className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        worksheet.isEndorsed
          ? "border-2 border-amber-400 shadow-md shadow-amber-500/10"
          : "border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300"
      }`}
    >
      <div>
        {worksheet.isEndorsed && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white px-3.5 py-1.5 text-[11px] font-extrabold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              <span>توثيق واعتماد بيداغوجي من المتفقد</span>
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
              معتمد ★
            </span>
          </div>
        )}

        <Link
          href={`/worksheet/${worksheet.id}`}
          className="block relative overflow-hidden"
        >
          {hasValidThumbnail ? (
            <img
              src={worksheet.thumbnailUrl!}
              alt={title}
              onError={() => setThumbError(true)}
              className="w-full h-44 object-cover group-hover:scale-102 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-40 flex flex-col justify-between p-4 relative text-white"
              style={{
                background: `linear-gradient(135deg, ${subjectColor} 0%, #1e293b 100%)`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs font-extrabold inline-flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>قسم: {categoryNameAr}</span>
                </span>
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-md text-[10px] font-black tracking-wider">
                  {formatInfo.shortExt}
                </span>
              </div>

              <div className="font-extrabold text-base line-clamp-2 leading-snug drop-shadow-sm">
                {title}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleQuickFavorite}
            disabled={isToggling}
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-sm ${
              isFavorited
                ? "bg-white text-rose-600 shadow-rose-500/20"
                : "bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600"
            }`}
            title={isFavorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <span className="text-base leading-none">
              {isFavorited ? "♥" : "♡"}
            </span>
          </button>
        </Link>

        <div className="p-4 space-y-3">
          {/* Mandatory Classification Badges: المادة + السنة الدراسية + القسم التربوي + نوع الملف */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span
              className="px-2 py-0.5 rounded-md font-bold text-white"
              style={{ backgroundColor: subjectColor }}
            >
              {worksheet.subject?.nameAr || "المادة"}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              {worksheet.grade?.nameAr || "السنة الدراسية"}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/70 dark:border-blue-800">
              {categoryNameAr}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold border text-[10px] ${formatInfo.badgeClass}`}
            >
              {formatInfo.labelAr}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold inline-flex items-center gap-1 text-[10px] ${
                audienceInfo.isRestricted
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {audienceInfo.isRestricted ? (
                <Lock className="w-2.5 h-2.5" />
              ) : (
                <Users className="w-2.5 h-2.5" />
              )}
              <span>{audienceInfo.label}</span>
            </span>
          </div>

          <Link href={`/worksheet/${worksheet.id}`} className="block">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm hover:text-blue-600 transition line-clamp-2 leading-relaxed">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {worksheet.descriptionAr ||
              worksheet.description ||
              "نشرة تعليمية وبيداغوجية عبر منصة المسند."}
          </p>
        </div>
      </div>

      <div className="px-4 py-3 bg-slate-50/70 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <Link
          href={`/publisher/${worksheet.uploader?.id || worksheet.uploadedBy}`}
          className="flex items-center gap-2 min-w-0 hover:text-blue-600 transition"
        >
          <UserAvatarWithPresence
            name={worksheet.uploader?.name || "ناشر"}
            avatarUrl={worksheet.uploader?.avatarUrl}
            presenceStatus={(worksheet.uploader as any)?.presenceStatus}
            lastSeenAt={(worksheet.uploader as any)?.lastSeenAt}
            size="sm"
          />
          <span className="truncate max-w-[95px] font-bold text-slate-700 dark:text-slate-200 hover:underline">
            {worksheet.uploader?.name || "ناشر"}
          </span>
          <InspectorBadge
            role={worksheet.uploader?.role}
            isVerified={worksheet.uploader?.isVerified}
            isBanned={worksheet.uploader?.isBanned}
            size="sm"
          />
        </Link>

        <div className="flex items-center gap-2.5 font-semibold text-slate-400 shrink-0">
          <span className="flex items-center gap-0.5" title="متوسط التقييم">
            <span className="text-amber-400">★</span>
            <span className="text-slate-600 dark:text-slate-300">
              {worksheet.ratingAvg > 0 ? worksheet.ratingAvg.toFixed(1) : "جديد"}
            </span>
          </span>
          <span className="flex items-center gap-0.5" title="عدد التحميلات">
            <span>⬇</span>
            <span className="text-slate-600 dark:text-slate-300">
              {downloadCount}
            </span>
          </span>
          <span className="flex items-center gap-0.5" title="عدد التفضيلات">
            <span className="text-rose-500">♥</span>
            <span className="text-slate-600 dark:text-slate-300">
              {favoriteCount}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
