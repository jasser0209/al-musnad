"use client";

import React, { useState, useEffect, DragEvent, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Image as ImageIcon,
  Users,
  Lock,
  Ban,
  Briefcase,
  BookOpen,
  Sparkles,
  Calendar,
} from "lucide-react";
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  isSupportedUploadFile,
  isPdfUploadFile,
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  ADMINISTRATIVE_CATEGORY,
  SCHOOL_TRIMESTERS,
  SCHOOL_SEMESTERS,
} from "@/config/constants";
import { extractPdfThumbnailAndPages } from "@/lib/utils/pdf-thumbnail";
import type {
  Grade,
  Subject,
  Category,
  ApiResponse,
  WorksheetWithRelations,
  TargetAudience,
} from "@/types";

export default function UploadWorksheetPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isBanned, setIsBanned] = useState(false);
  const [banReason, setBanReason] = useState<string | null>(null);

  const [grades, setGrades] = useState<Grade[]>(
    CURRICULUM_GRADES as unknown as Grade[]
  );
  const [subjects, setSubjects] = useState<Subject[]>(
    CURRICULUM_SUBJECTS as unknown as Subject[]
  );
  const [categories, setCategories] = useState<Category[]>([
    ...(SUBJECT_SUBDIVISIONS as unknown as Category[]),
    ADMINISTRATIVE_CATEGORY as unknown as Category,
  ]);

  const [sectionType, setSectionType] = useState<"curriculum" | "administrative">(
    "curriculum"
  );

  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [extractingThumb, setExtractingThumb] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [titleAr, setTitleAr] = useState<string>("");
  const [descriptionAr, setDescriptionAr] = useState<string>("");
  const [gradeId, setGradeId] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [audience, setAudience] = useState<TargetAudience>("ALL");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTrimester, setSelectedTrimester] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  function handleToggleSemester(semTag: string) {
    if (selectedSemester === semTag) {
      setSelectedSemester("");
      setTags((prev) =>
        prev.filter((t) => !SCHOOL_SEMESTERS.some((s) => s.tag === t))
      );
    } else {
      setSelectedSemester(semTag);
      setTags((prev) => {
        const withoutSem = prev.filter(
          (t) => !SCHOOL_SEMESTERS.some((s) => s.tag === t)
        );
        return [...withoutSem, semTag];
      });
    }
  }

  function handleToggleTrimester(trimesterTag: string) {
    if (selectedTrimester === trimesterTag) {
      setSelectedTrimester("");
      setTags((prev) =>
        prev.filter(
          (t) => !SCHOOL_TRIMESTERS.some((st) => st.tag === t)
        )
      );
    } else {
      setSelectedTrimester(trimesterTag);
      setTags((prev) => {
        const withoutTrimesters = prev.filter(
          (t) => !SCHOOL_TRIMESTERS.some((st) => st.tag === t)
        );
        return [...withoutTrimesters, trimesterTag];
      });
    }
  }

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nonPdfThankYouMessage, setNonPdfThankYouMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const audParam = sp.get("audience")?.toUpperCase();
      if (
        audParam &&
        ["ALL", "TEACHERS_AND_STUDENTS", "TEACHERS_ONLY", "SAME_ROLE_ONLY", "INSTITUTIONS_ONLY"].includes(audParam)
      ) {
        setAudience(audParam as TargetAudience);
      }
      if (sp.get("section") === "administrative") {
        setSectionType("administrative");
      }
    }
    async function initPage() {
      try {
        setCheckingAuth(true);
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        if (meRes.status === 401) {
          router.replace("/login?redirectTo=/upload");
          return;
        }
        const meJson = await meRes.json();
        if (!meJson.success || !meJson.data) {
          router.replace("/login?redirectTo=/upload");
          return;
        }

        setUserRole(meJson.data.role);
        setIsBanned(Boolean(meJson.data.isBanned));
        setBanReason(meJson.data.banReason || null);

        const [gRes, sRes, cRes] = await Promise.all([
          fetch("/api/grades"),
          fetch("/api/subjects"),
          fetch("/api/categories"),
        ]);
        const [gJson, sJson, cJson] = await Promise.all([
          gRes.json() as Promise<ApiResponse<Grade[]>>,
          sRes.json() as Promise<ApiResponse<Subject[]>>,
          cRes.json() as Promise<ApiResponse<Category[]>>,
        ]);

        if (gJson.success && gJson.data.length > 0) setGrades(gJson.data);
        if (sJson.success && sJson.data.length > 0) setSubjects(sJson.data);
        if (cJson.success && cJson.data.length > 0) setCategories(cJson.data);
      } catch {
        // Fallback to constants if offline
      } finally {
        setCheckingAuth(false);
      }
    }
    initPage();
  }, [router]);

  const validateAndSetFile = async (selected: File) => {
    setError(null);
    if (!isSupportedUploadFile(selected)) {
      setError(
        "يُسمح برفع ملفات PDF، أو ملفات وورد (.doc, .docx)، أو الصور (.png, .jpg, .webp)."
      );
      return;
    }
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setError(
        `حجم الملف يتجاوز الحد الأقصى المسموح به (${MAX_FILE_SIZE_MB} ميجابايت).`
      );
      return;
    }

    setFile(selected);
    if (!titleAr) {
      setTitleAr(
        selected.name
          .replace(/\.(pdf|docx?|png|jpe?g|webp)$/i, "")
          .replace(/[-_]/g, " ")
      );
    }

    if (isPdfUploadFile(selected)) {
      try {
        setExtractingThumb(true);
        const extracted = await extractPdfThumbnailAndPages(selected);
        setThumbnailFile(extracted.thumbnailFile);
        setThumbnailPreview(extracted.thumbnailPreviewUrl);
        setPageCount(extracted.pageCount);
      } catch {
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setPageCount(null);
      } finally {
        setExtractingThumb(false);
      }
    } else if (selected.type.startsWith("image/")) {
      setThumbnailFile(selected);
      setThumbnailPreview(URL.createObjectURL(selected));
      setPageCount(1);
    } else {
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setPageCount(null);
    }
  };

  const handleClearFile = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setPageCount(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) validateAndSetFile(selected);
  };

  const handleAddTag = () => {
    const clean = tagInput.trim();
    if (clean && !tags.includes(clean) && tags.length < 10) {
      setTags([...tags, clean]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("يرجى اختيار الملف أولاً (PDF أو وورد أو صورة)");
      return;
    }

    const effectiveGradeId =
      sectionType === "administrative"
        ? gradeId || grades[0]?.id || ""
        : gradeId;
    const effectiveSubjectId =
      sectionType === "administrative"
        ? subjects.find((s) => s.slug === "administration")?.id ||
          subjectId ||
          subjects[0]?.id ||
          ""
        : subjectId;
    const effectiveCategoryId =
      sectionType === "administrative"
        ? categories.find((c) => c.slug === "administrative")?.id ||
          categoryId ||
          categories[0]?.id ||
          ""
        : categoryId;

    if (
      !titleAr.trim() ||
      !effectiveGradeId ||
      !effectiveSubjectId ||
      !effectiveCategoryId
    ) {
      setError("يرجى ملء جميع الحقول الأساسية (العنوان، المستوى، المادة، والتقسيم)");
      return;
    }

    const isPdf = isPdfUploadFile(file);

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("file", file);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      if (pageCount) {
        formData.append("pageCount", String(pageCount));
      }

      const finalTags =
        sectionType === "administrative" && !tags.includes("وثائق إدارية")
          ? ["وثائق إدارية", ...tags]
          : tags;

      const metadata = {
        title: titleAr.trim(),
        titleAr: titleAr.trim(),
        description: descriptionAr.trim() || undefined,
        descriptionAr: descriptionAr.trim() || undefined,
        gradeId: effectiveGradeId,
        subjectId: effectiveSubjectId,
        categoryId: effectiveCategoryId,
        audience,
        tags: finalTags,
      };
      formData.append("metadata", JSON.stringify(metadata));

      const res = await fetch("/api/worksheets", {
        method: "POST",
        body: formData,
      });

      const json: ApiResponse<
        WorksheetWithRelations & {
          requiresPdfConversionReview?: boolean;
          reviewNoticeMessage?: string;
        }
      > = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(!json.success ? json.error.message : "فشل رفع الملف");
      }

      // If uploaded file is NOT a PDF (Word or Image), show the Thank You & Admin/Inspector Review screen!
      if (!isPdf || json.data.requiresPdfConversionReview) {
        setNonPdfThankYouMessage(
          json.data.reviewNoticeMessage ||
            "شكراً لك على مساهمتك القيمة في منصة المسند! تم قبول واستلام ملفك بنجاح. هذا المحتوى الذي أرسلته سيتم مراجعته من عند المشرف والمتفقد التربوي وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين."
        );
        return;
      }

      router.push(`/worksheet/${json.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء رفع الملف");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (nonPdfThankYouMessage) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تم استلام ملفك بنجاح — شكراً لك!</span>
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              شكراً جزيلاً على مساهمتك التربوية!
            </h1>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm leading-relaxed font-semibold">
            {nonPdfThankYouMessage}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/profile"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
            >
              الانتقال إلى ملفي الشخصي
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isBanned) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 space-y-4">
          <Ban className="w-12 h-12 text-red-600 mx-auto" />
          <h1 className="text-xl font-extrabold text-red-900">
            حسابك محظور من نشر المحتوى
          </h1>
          <p className="text-sm text-red-700">
            {banReason || "تم إيقاف صلاحية النشر لهذا الحساب لمخالفة شروط المنصة."}
          </p>
          <Link
            href="/support"
            className="inline-block px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold"
          >
            التواصل مع الدعم الفني
          </Link>
        </div>
      </main>
    );
  }

  if (userRole === "STUDENT") {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 space-y-4">
          <Lock className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="text-xl font-extrabold text-slate-900">
            النشر مخصص للمؤسسات والمتفقدين والمعلمين
          </h1>
          <p className="text-sm text-slate-600">
            حساب التلميذ مخصص لتصفح وتحميل الدروس والتمارين والامتحانات المتاحة للتلاميذ.
          </p>
          <Link
            href="/#levels-and-subjects"
            className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            تصفح المستويات والمواد
          </Link>
        </div>
      </main>
    );
  }

  const isSelectedFileNonPdf = Boolean(file && !isPdfUploadFile(file));

  return (
    <main className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            نشر ملف جديد (PDF، ملف وورد، أو صورة)
          </h1>
          <p className="text-sm text-slate-500">
            اختر القسم (المستويات والمواد أو قسم الإدارة)، وارفع ملفك بصيغة PDF أو Word أو صورة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSectionType("curriculum")}
            className={`p-4 rounded-2xl border-2 text-start transition cursor-pointer flex items-center gap-3 ${
              sectionType === "curriculum"
                ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-white"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <BookOpen className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <div className="font-extrabold text-sm">
                قسم المستوى الدراسي والمواد
              </div>
              <div className="text-[11px] text-slate-500">
                درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSectionType("administrative")}
            className={`p-4 rounded-2xl border-2 text-start transition cursor-pointer flex items-center gap-3 ${
              sectionType === "administrative"
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <Briefcase className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <div className="font-extrabold text-sm">
                قسم الإدارة والمعاملات الإدارية
              </div>
              <div className="text-[11px] text-slate-500">
                وثائق ومعاملات إدارية للمعلم بعيدة عن التمارين والدروس
              </div>
            </div>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              ملف النشرة (يُقبل PDF، ملف وورد Word، أو صورة — بحد أقصى {MAX_FILE_SIZE_MB} ميجابايت) *
            </label>

            {!file ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
                  isDragging
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300 hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <UploadCloud className="w-12 h-12 text-blue-600 mb-3" />
                  <span className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                    اسحب وأفلت ملف PDF أو وورد (Word) أو صورة هنا، أو اضغط للاختيار
                  </span>
                  <span className="text-xs text-slate-500">
                    إذا رفعت صورة أو ملف وورد، سيتم قبوله ومراجعته من المشرف والمتفقد وإعادة صياغته لملف PDF.
                  </span>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0 w-full">
                    <div className="w-20 h-24 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                      {extractingThumb ? (
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                      ) : thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="معاينة"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-1">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>تم إرفاق الملف بنجاح</span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>
                          الحجم: {(file.size / (1024 * 1024)).toFixed(2)} ميجابايت
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white transition self-end sm:self-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isSelectedFileNonPdf && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold leading-relaxed">
                    ملاحظة: الملف الذي اخترته هو (ملف وورد / صورة) وليس PDF. سنقبل منك الملف بكل سرور، وسيتم مراجعته من عند المشرف والمتفقد وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين.
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {sectionType === "administrative"
                ? "عنوان الوثيقة / المعاملة الإدارية *"
                : "عنوان الدرس / الملف *"}
            </label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={255}
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder={
                sectionType === "administrative"
                  ? "أدخل عنوان الوثيقة الإدارية"
                  : "أدخل عنوان الدرس أو التمرين أو الجذاذة"
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:border-blue-600 outline-none text-sm"
            />
          </div>

          {sectionType === "curriculum" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  المستوى الدراسي *
                </label>
                <select
                  required
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">اختر المستوى...</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  المادة الدراسية *
                </label>
                <select
                  required
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">اختر المادة...</option>
                  {subjects
                    .filter((s) => s.slug !== "administration")
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nameAr}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  نوع الملف / القسم التربوي داخل المادة (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى) *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">اختر التقسيم...</option>
                  {categories
                    .filter((c) => c.slug !== "administrative")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {/* السداسي الدراسي */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200">
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>وسم السداسي الدراسي (تجميع دروس المادة)</span>
              </label>
              {(selectedSemester || tags.some((t) => SCHOOL_SEMESTERS.some((ss) => ss.tag === t))) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSemester("");
                    setTags((prev) =>
                      prev.filter((t) => !SCHOOL_SEMESTERS.some((ss) => ss.tag === t))
                    );
                  }}
                  className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  إلغاء وسم السداسي ✕
                </button>
              )}
            </div>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
              اختر السداسي الدراسي لتجميع منشورات نفس الدرس مع بقية المعلمين بترتيب تفاضلي:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {SCHOOL_SEMESTERS.map((sem) => {
                const isSelected = selectedSemester === sem.tag || tags.includes(sem.tag);
                return (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => handleToggleSemester(sem.tag)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer text-center ${
                      isSelected
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm ring-2 ring-amber-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-amber-800/60 hover:border-amber-500"
                    }`}
                  >
                    {sem.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>وسم الثلاثي المدرسي (اختيار سريع بضغطة زر)</span>
              </label>
              {(selectedTrimester || tags.some((t) => SCHOOL_TRIMESTERS.some((st) => st.tag === t))) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrimester("");
                    setTags((prev) =>
                      prev.filter((t) => !SCHOOL_TRIMESTERS.some((st) => st.tag === t))
                    );
                  }}
                  className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  إلغاء وسم الثلاثي ✕
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              اختر الثلاثي لوسم الملف بيداغوجياً وتيسير عثور المعلمين والتلاميذ عليه في الفلترة والبحث:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {SCHOOL_TRIMESTERS.map((trim) => {
                const isSelected = selectedTrimester === trim.tag || tags.includes(trim.tag);
                return (
                  <button
                    key={trim.id}
                    type="button"
                    onClick={() => handleToggleTrimester(trim.tag)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer text-center ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                    }`}
                  >
                    {trim.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-blue-950 dark:text-blue-200">
              <Users className="w-4 h-4 text-blue-600" />
              <span>تحديد جمهور النشر *</span>
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as TargetAudience)}
              className="w-full px-4 py-3 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-blue-600"
            >
              <option value="ALL">
                نشر للجميع (يظهر اسم الملف للزوار، ويُقرأ ويُحمّل من جميع الحسابات)
              </option>
              <option value="TEACHERS_AND_STUDENTS">
                للمعلمين والتلاميذ (تمارين ودروس)
              </option>
              <option value="TEACHERS_ONLY">
                للمعلمين والمتفقدين فقط — مخفي عن التلاميذ (مثل الإصلاح والجذاذات)
              </option>
              <option value="SAME_ROLE_ONLY">
                حصر النشرة داخل نفس فئة حسابي فقط
              </option>
              <option value="INSTITUTIONS_ONLY">
                للمؤسسات التربوية فقط
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              وصف مختصر (اختياري)
            </label>
            <textarea
              rows={3}
              maxLength={2000}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              placeholder="أضف وصفاً مختصراً لمحتوى الملف..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:border-blue-600 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              الكلمات المفتاحية (اختياري)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="أضف وسم..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                إضافة
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => {
                        if (t === selectedTrimester) setSelectedTrimester("");
                        setTags(tags.filter((item) => item !== t));
                      }}
                      className="hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || extractingThumb}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري رفع الملف...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>
                  {isSelectedFileNonPdf
                    ? "إرسال الملف للمراجعة وإعادة الصياغة لـ PDF"
                    : "نشر الملف الآن"}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}