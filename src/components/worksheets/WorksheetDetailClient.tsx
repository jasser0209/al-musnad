"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  Heart,
  FileText,
  User as UserIcon,
  School,
  Calendar,
  ExternalLink,
  ArrowRight,
  Share2,
  Check,
  Loader2,
  Tag,
  Star,
  BadgeCheck,
  Lock,
  Users,
  UserPlus,
  Edit3,
  Flag,
  AlertTriangle,
  X,
} from "lucide-react";
import ReviewSection from "@/components/worksheets/ReviewSection";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { toggleWorksheetEndorsementAction } from "@/actions/inspector.actions";
import { submitReportAction } from "@/actions/report-support.actions";
import { extractPdfThumbnailAndPages } from "@/lib/utils/pdf-thumbnail";
import type { WorksheetWithRelations, ApiResponse, TargetAudience } from "@/types";
import type { DownloadUrlResult } from "@/services/download.service";
import type { ToggleFavoriteResult } from "@/services/favorite.service";

interface WorksheetDetailClientProps {
  initialWorksheet: WorksheetWithRelations;
}

const AUDIENCE_LABELS: Record<string, string> = {
  TEACHERS_ONLY: "خاص بالمعلمين والمتفقدين فقط (إصلاح / مذكرة)",
  SAME_ROLE_ONLY: "خاص بنفس فئة الناشر فقط",
  INSTITUTIONS_ONLY: "خاص بالمؤسسات التربوية فقط",
  TEACHERS_AND_STUDENTS: "متاح للمعلمين والتلاميذ",
  ALL: "متاح لجميع منتسبي المسند",
};

export default function WorksheetDetailClient({
  initialWorksheet,
}: WorksheetDetailClientProps) {
  const router = useRouter();

  const [worksheet, setWorksheet] =
    useState<WorksheetWithRelations>(initialWorksheet);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(
    initialWorksheet.favoriteCount
  );
  const [favLoading, setFavLoading] = useState<boolean>(false);

  const [isEndorsed, setIsEndorsed] = useState<boolean>(
    Boolean(initialWorksheet.isEndorsed)
  );
  const [endorseLoading, setEndorseLoading] = useState<boolean>(false);
  const [viewerRole, setViewerRole] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);

  const [downloadCount, setDownloadCount] = useState<number>(
    initialWorksheet.downloadCount
  );
  const [downloading, setDownloading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Edit Worksheet Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(
    initialWorksheet.titleAr || initialWorksheet.title
  );
  const [editDesc, setEditDesc] = useState(
    initialWorksheet.descriptionAr || initialWorksheet.description || ""
  );
  const [editAudience, setEditAudience] = useState<TargetAudience>(
    initialWorksheet.audience || "TEACHERS_AND_STUDENTS"
  );
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [confirmedFileLossWarning, setConfirmedFileLossWarning] =
    useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  // Report Modal States
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("خطأ علمي أو بيداغوجي في المحتوى");
  const [reportDetails, setReportDetails] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function checkViewerState() {
      try {
        const [favRes, meRes] = await Promise.all([
          fetch("/api/me/favorites").catch(() => null),
          fetch("/api/auth/me").catch(() => null),
        ]);

        if (favRes && favRes.ok) {
          const json = await favRes.json();
          if (json.success && Array.isArray(json.data)) {
            const favorited = json.data.some((f: any) => f.id === worksheet.id);
            if (isMounted) setIsFavorited(favorited);
          }
        }

        if (meRes && meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.success && meJson.data && isMounted) {
            setViewerRole(meJson.data.role || null);
            setViewerId(meJson.data.id || null);
          }
        }
      } catch {
        // ignore
      }
    }

    checkViewerState();
    return () => {
      isMounted = false;
    };
  }, [worksheet.id]);

  const handleToggleEndorsement = async () => {
    if (endorseLoading) return;
    try {
      setEndorseLoading(true);
      const res = await toggleWorksheetEndorsementAction(worksheet.id);
      setIsEndorsed(res.isEndorsed);
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر تحديث حالة الاعتماد");
    } finally {
      setEndorseLoading(false);
    }
  };

  const handleSaveWorksheetEdit = async (e: FormEvent) => {
    e.preventDefault();

    // If replacing the PDF file while endorsed, require explicit warning confirmation
    if (replacementFile && isEndorsed && !confirmedFileLossWarning) {
      alert(
        "تنبيه: يجب تأكيد علمك بأن استبدال ملف الـ PDF سيؤدي إلى إلغاء شارة التوثيق/الاعتماد الحالية حتى يعيد المتفقد مراجعة الملف الجديد."
      );
      return;
    }

    try {
      setSavingEdit(true);

      const metadata = {
        title: editTitle.trim(),
        titleAr: editTitle.trim(),
        description: editDesc.trim() || undefined,
        descriptionAr: editDesc.trim() || undefined,
        audience: editAudience,
      };

      let res: Response;
      if (replacementFile) {
        const formData = new FormData();
        formData.append("file", replacementFile);
        try {
          const extracted = await extractPdfThumbnailAndPages(replacementFile);
          formData.append("thumbnail", extracted.thumbnailFile);
          formData.append("pageCount", String(extracted.pageCount));
        } catch {
          // ignore thumbnail extraction error
        }
        formData.append("metadata", JSON.stringify(metadata));

        res = await fetch(`/api/worksheets/${worksheet.id}`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        // Metadata-only update: preserves isEndorsed!
        res = await fetch(`/api/worksheets/${worksheet.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metadata),
        });
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "فشل تعديل النشرة");
      }

      setWorksheet((prev) => ({
        ...prev,
        ...json.data,
        previewUrl: prev.previewUrl,
      }));
      setIsEndorsed(Boolean(json.data.isEndorsed));
      setIsEditOpen(false);
      setReplacementFile(null);
      setConfirmedFileLossWarning(false);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "حدث خطأ أثناء حفظ التعديلات");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleSubmitReport = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setReportLoading(true);
      await submitReportAction({
        targetType: "WORKSHEET",
        targetWorksheetId: worksheet.id,
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

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await fetch(`/api/worksheets/${worksheet.id}/download`);
      if (res.status === 401) {
        router.push(`/login?redirectTo=/worksheet/${worksheet.id}`);
        return;
      }

      const json: ApiResponse<DownloadUrlResult> = await res.json();
      if (!json.success) {
        alert(json.error.message || "فشل في استخراج رابط التحميل");
        return;
      }

      setDownloadCount((prev) => prev + 1);
      window.open(json.data.downloadUrl, "_blank", "noopener,noreferrer");
    } catch {
      alert("حدث خطأ أثناء الاتصال بالخادم لتحميل الملف");
    } finally {
      setDownloading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (favLoading) return;
    try {
      setFavLoading(true);
      const res = await fetch(`/api/worksheets/${worksheet.id}/favorite`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push(`/login?redirectTo=/worksheet/${worksheet.id}`);
        return;
      }

      const json: ApiResponse<ToggleFavoriteResult> = await res.json();
      if (json.success) {
        setIsFavorited(json.data.isFavorited);
        setFavoriteCount(json.data.favoriteCount);
      }
    } catch {
      alert("تعذر تحديث حالة المفضلة");
    } finally {
      setFavLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("تم نسخ الرابط: " + window.location.href);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} كيلوبايت`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} ميجابايت`;
  };

  const displayTitle = worksheet.titleAr || worksheet.title;
  const displayDesc = worksheet.descriptionAr || worksheet.description;
  const subjectColor = worksheet.subject?.color || "#2563EB";
  const canEndorse = viewerRole === "INSPECTOR" || viewerRole === "ADMIN";
  const isOwnerOrAdmin =
    (viewerId && viewerId === worksheet.uploadedBy) || viewerRole === "ADMIN";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex items-center justify-between gap-2 text-sm text-slate-500 mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/browse"
            className="hover:text-blue-600 inline-flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4" />
            النشرات
          </Link>
          <span>/</span>
          <span>{worksheet.grade?.nameAr || worksheet.grade?.name}</span>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
            {displayTitle}
          </span>
        </div>

        {/* Report & Edit Quick Actions */}
        <div className="flex items-center gap-2">
          {isOwnerOrAdmin && (
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>تعديل النشرة</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
            title="الإبلاغ عن هذه النشرة"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>إبلاغ</span>
          </button>
        </div>
      </nav>

      {/* Official Inspector Endorsement Banner */}
      {isEndorsed && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-amber-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-black text-amber-900 dark:text-amber-300">
                نشرة معتمدة علمياً وبيداغوجياً من المتفقد التربوي
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-200/80 mt-0.5">
                تم التحقق من سلامة المحتوى العلمي والبيداغوجي لهذه النشرة في مادة ({worksheet.subject?.nameAr}).
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-extrabold shrink-0">
            اعتماد رسمي ★
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Right Column: Embedded PDF Viewer & Reviews */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {(() => {
            const rawPreviewUrl = worksheet.previewUrl || "";
            const hasBroken64CharKey =
              rawPreviewUrl.includes("r2.cloudflarestorage.com") &&
              rawPreviewUrl.includes("X-Amz-Credential=") &&
              (rawPreviewUrl
                .split("X-Amz-Credential=")[1]
                ?.split("%2F")[0]
                ?.split("/")[0]?.length || 32) !== 32;
            const effectivePreviewUrl =
              !rawPreviewUrl || hasBroken64CharKey
                ? `/api/worksheets/${worksheet.id}/file?disposition=inline`
                : rawPreviewUrl;

            const lowerFileName = (worksheet.fileName || "").toLowerCase();
            const isImageFile =
              lowerFileName.endsWith(".png") ||
              lowerFileName.endsWith(".jpg") ||
              lowerFileName.endsWith(".jpeg") ||
              lowerFileName.endsWith(".webp") ||
              lowerFileName.endsWith(".gif");
            const isPdfFile = lowerFileName.endsWith(".pdf") || (!isImageFile && !lowerFileName.endsWith(".doc") && !lowerFileName.endsWith(".docx"));

            return (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>معاينة مباشرة لملف النشرة ({worksheet.fileName})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={effectivePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 inline-flex items-center gap-1 transition"
                    >
                      <span>فتح في نافذة مستقلة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-1 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloading ? "جاري التحضير..." : "تحميل الملف"}</span>
                    </button>
                  </div>
                </div>

                {isImageFile ? (
                  <div className="p-4 sm:p-6 bg-slate-900 flex flex-col items-center justify-center min-h-[380px]">
                    <img
                      src={effectivePreviewUrl}
                      alt={displayTitle}
                      className="max-h-[680px] w-auto object-contain rounded-xl shadow-lg border border-slate-700 bg-white"
                    />
                  </div>
                ) : isPdfFile ? (
                  <div className="w-full h-[540px] sm:h-[680px] bg-slate-100">
                    <object
                      data={`${effectivePreviewUrl}#toolbar=1&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <iframe
                        src={`${effectivePreviewUrl}#toolbar=1&navpanes=0`}
                        title={displayTitle}
                        className="w-full h-full bg-slate-100"
                      />
                    </object>
                  </div>
                ) : (
                  <div className="h-[420px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/40 p-8 text-center">
                    <FileText className="w-16 h-16 text-slate-400 mb-3" />
                    <p className="text-slate-700 dark:text-slate-200 font-semibold mb-1">
                      هذا الملف بصيغة مستند ({worksheet.fileName})
                    </p>
                    <p className="text-sm text-slate-500 max-w-md mb-4">
                      اضغط على زر &quot;تحميل الملف&quot; لتنزيل النسخة الكاملة على جهازك.
                    </p>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold inline-flex items-center gap-2 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل الملف الآن</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          <ReviewSection
            worksheetId={worksheet.id}
            initialRatingAvg={worksheet.ratingAvg ?? 0}
            initialReviewCount={worksheet.reviewCount ?? 0}
          />
        </section>

        {/* Left Column */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: subjectColor }}
              >
                {worksheet.subject?.nameAr || worksheet.subject?.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                {worksheet.grade?.nameAr || worksheet.grade?.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                {worksheet.category?.nameAr || worksheet.category?.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1">
                {worksheet.audience === "TEACHERS_ONLY" ? (
                  <Lock className="w-3 h-3 text-rose-600" />
                ) : (
                  <Users className="w-3 h-3 text-emerald-600" />
                )}
                <span>
                  {AUDIENCE_LABELS[worksheet.audience] ||
                    AUDIENCE_LABELS.TEACHERS_AND_STUDENTS}
                </span>
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {displayTitle}
            </h1>

            {displayDesc && (
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {displayDesc}
              </p>
            )}

            {/* Inspector Endorsement Action Button */}
            {canEndorse && (
              <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 dark:text-amber-300">
                  <BadgeCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>صلاحية المتفقد التربوي: الاعتماد العلمي والبيداغوجي</span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleEndorsement}
                  disabled={endorseLoading}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                    isEndorsed
                      ? "bg-white text-amber-800 border border-amber-400 hover:bg-amber-100"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  }`}
                >
                  {endorseLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BadgeCheck className="w-4 h-4" />
                  )}
                  <span>
                    {isEndorsed
                      ? "معتمد علمياً وبيداغوجياً ✓ (اضغط لإلغاء العلامة)"
                      : "تأكيد الصحة العلمية والبيداغوجية للنشرة"}
                  </span>
                </button>
              </div>
            )}

            {/* Download, Favorite, Share Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold flex items-center justify-center gap-2.5 shadow-sm transition cursor-pointer"
              >
                {downloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span>
                  {downloading ? "جاري تجهيز الرابط..." : "تحميل مباشر (PDF)"}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleToggleFavorite}
                  disabled={favLoading}
                  className={`py-2.5 px-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    isFavorited
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>{isFavorited ? "في المفضلة" : "حفظ بالمفضلة"}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>مشاركة</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">التحميلات</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {downloadCount}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">التفضيلات</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {favoriteCount}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">التقييم</span>
                <span className="font-bold text-amber-600 flex items-center justify-center gap-0.5 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>
                    {worksheet.ratingAvg > 0
                      ? worksheet.ratingAvg.toFixed(1)
                      : "جديد"}
                  </span>
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">حجم الملف</span>
                <span className="font-bold text-slate-800 dark:text-white text-[11px] truncate">
                  {formatFileSize(worksheet.fileSize)}
                </span>
              </div>
            </div>

            {/* Publisher Card */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Link
                      href={`/publisher/${worksheet.uploader?.id || worksheet.uploadedBy}`}
                      className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-blue-600 truncate"
                    >
                      {worksheet.uploader?.name || "ناشر"}
                    </Link>
                    {worksheet.uploader?.username && (
                      <Link
                        href={`/u/${worksheet.uploader.username}`}
                        dir="ltr"
                        className="font-mono text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        @{worksheet.uploader.username}
                      </Link>
                    )}
                    <InspectorBadge
                      role={worksheet.uploader?.role}
                      isVerified={worksheet.uploader?.isVerified}
                      isBanned={worksheet.uploader?.isBanned}
                      size="sm"
                    />
                  </div>
                  {worksheet.uploader?.school && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 truncate mt-0.5">
                      <School className="w-3.5 h-3.5" />
                      <span>{worksheet.uploader.school}</span>
                    </p>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(worksheet.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>

              <Link
                href={`/publisher/${worksheet.uploader?.id || worksheet.uploadedBy}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>عرض ملف الناشر الكامل، متابعته، وإضافته للمفضلة</span>
              </Link>
            </div>

            {worksheet.tags && worksheet.tags.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {worksheet.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/browse?search=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Modal 1: Edit Worksheet (with Endorsement Loss Warning on File Change) */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>تعديل بيانات النشرة أو استبدال الملف</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorksheetEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان النشرة (لا يؤثر تعديله على شارة التوثيق/الاعتماد) *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وصف النشرة (لا يؤثر تعديله على شارة التوثيق/الاعتماد)
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  جمهور النشر المستهدف
                </label>
                <select
                  value={editAudience}
                  onChange={(e) =>
                    setEditAudience(e.target.value as TargetAudience)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                >
                  <option value="TEACHERS_AND_STUDENTS">
                    للمعلمين والتلاميذ معاً (تمارين وأنشطة)
                  </option>
                  <option value="TEACHERS_ONLY">
                    للمعلمين والمتفقدين فقط (إصلاح ومذكرات)
                  </option>
                  <option value="SAME_ROLE_ONLY">نفس فئة الناشر فقط</option>
                  <option value="ALL">عام لجميع الفئات</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  استبدال ملف الـ PDF ومحتواه (اختياري)
                </label>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setReplacementFile(f);
                    setConfirmedFileLossWarning(false);
                  }}
                  className="w-full text-xs text-slate-600 file:me-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>

              {/* Mandatory Warning Banner if replacing file on an Endorsed worksheet */}
              {replacementFile && isEndorsed && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-400 text-amber-900 dark:text-amber-200 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs font-extrabold">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>
                      تحذير هام قبل تأكيد التعديل: تغيير ملف النشرة ومحتواه سيؤدي إلى فقدان شارة الاعتماد البيداغوجي الحالية حتى يعيد المتفقد مراجعة الملف الجديد!
                    </span>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedFileLossWarning}
                      onChange={(e) =>
                        setConfirmedFileLossWarning(e.target.checked)
                      }
                      className="w-4 h-4 rounded text-amber-600"
                    />
                    <span>
                      أعي ذلك وأوافق على استبدال الملف وإعادة تقديمه للمراجعة
                    </span>
                  </label>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {savingEdit ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>تأكيد وحفظ التعديل</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Report Publication */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-600" />
                <span>إرسال بلاغ عن هذه النشرة</span>
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
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    سبب البلاغ *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="خطأ علمي أو بيداغوجي في المحتوى">
                      خطأ علمي أو بيداغوجي في المحتوى
                    </option>
                    <option value="محتوى غير مطابق للمستوى أو المادة">
                      محتوى غير مطابق للمستوى أو المادة
                    </option>
                    <option value="انتهاك حقوق الملكية الفكرية">
                      انتهاك حقوق الملكية الفكرية
                    </option>
                    <option value="ملف تالف أو غير واضح">
                      ملف تالف أو غير واضح
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تفاصيل إضافية (اختياري)
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="وضّح الملاحظة للإدارة..."
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
