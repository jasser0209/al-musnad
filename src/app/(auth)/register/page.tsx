"use client";

/**
 * Upgraded Multi-Role Registration Page — Al-Musnad (المسند) v6.0
 *
 * Implements all Project Manager v6.0 Directives:
 * 1. Removed all verification code alerts, banners, and code activation links
 *    from the registration form so the user creates their account normally.
 * 2. After registration succeeds, displays a dedicated Thank You screen thanking
 *    the user for registering and informing them that identity verification
 *    (which grants broader privileges and the official verification badge)
 *    takes place after communicating with the Administrator (`المشرف`).
 * 3. Preserves Show/Hide password toggle, mandatory Student Grade Level,
 *    mandatory Terms & Conditions checkbox, and zero example names in placeholders.
 */

import React, { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Building2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  ArrowLeft,
  Headphones,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signUpSchema } from "@/lib/validators/auth";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { ROLE_VISUAL_CARDS } from "@/components/auth/AuthRoleModal";
import type { AccountRoleOption } from "@/types/api";

const STUDENT_GRADE_OPTIONS = [
  "السنة الأولى ابتدائي",
  "السنة الثانية ابتدائي",
  "السنة الثالثة ابتدائي",
  "السنة الرابعة ابتدائي",
  "السنة الخامسة ابتدائي",
  "السنة السادسة ابتدائي",
];

function RegisterContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams
    ?.get("role")
    ?.toUpperCase() as AccountRoleOption | undefined;

  const { t } = useAppPreferences();

  const [selectedRole, setSelectedRole] = useState<AccountRoleOption>(
    roleParam &&
      ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleParam)
      ? roleParam
      : "TEACHER"
  );

  useEffect(() => {
    if (
      roleParam &&
      ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleParam)
    ) {
      setSelectedRole(roleParam);
    }
  }, [roleParam]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      const supabase = createSupabaseBrowserClient();
      const callbackUrl = `${window.location.origin}/api/auth/callback?role=${encodeURIComponent(
        selectedRole
      )}&next=/`;

      const { data, error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (oauthErr) {
        setError(
          "مزود Google غير مفعّل في إعدادات Supabase الحالية أو تعذر الاتصال به. يرجى إنشاء الحساب باستخدام النموذج المباشر أدناه."
        );
        setGoogleLoading(false);
        return;
      }

      if (data?.url) {
        if (window.top && window.top !== window.self) {
          window.top.location.href = data.url;
        } else {
          window.location.href = data.url;
        }
      }
    } catch {
      setError("تعذر بدء التسجيل بحساب Google. يرجى إكمال التسجيل بالنموذج المباشر أدناه.");
      setGoogleLoading(false);
    }
  };
  const [error, setError] = useState<string | null>(null);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const activeCard =
    ROLE_VISUAL_CARDS.find((c) => c.role === selectedRole) ||
    ROLE_VISUAL_CARDS[2];
  const ActiveIcon = activeCard.icon;
  const roleCopy = t.roles[selectedRole];

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      (selectedRole === "INSTITUTION" || selectedRole === "INSPECTOR") &&
      !school.trim()
    ) {
      setError(roleCopy.orgLabel);
      return;
    }

    if (selectedRole === "STUDENT" && !studentGrade.trim()) {
      setError("يرجى اختيار المستوى الدراسي للتلميذ (حقل إجباري)");
      return;
    }

    if (!acceptedTerms) {
      setError("يجب الموافقة على الشروط والأحكام قبل إنشاء الحساب");
      return;
    }

    const parsed = signUpSchema.safeParse({
      name,
      username: username.trim() || undefined,
      email,
      password,
      school:
        selectedRole === "STUDENT"
          ? [school.trim(), studentGrade.trim()].filter(Boolean).join(" — ")
          : school.trim() || undefined,
      studentGrade: selectedRole === "STUDENT" ? studentGrade.trim() : undefined,
      role: selectedRole,
      acceptedTerms: true,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "يرجى التأكد من صحة البيانات");
      return;
    }

    try {
      setLoading(true);
      const fallbackUname =
        parsed.data.username ||
        `${parsed.data.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}`;

      const supabase = createSupabaseBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: {
            name: parsed.data.name,
            username: fallbackUname,
            school: parsed.data.school,
            student_grade: parsed.data.studentGrade,
            role: selectedRole,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Show the Post-Registration Thank You & Identity Verification Notice Screen
      setRegisteredSuccessfully(true);
    } catch {
      setError("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  if (registeredSuccessfully) {
    return (
      <div className="max-w-xl w-full mx-auto" dir={t.dir}>
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
              تم إنشاء الحساب بنجاح
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              شكراً لك على التسجيل في منصة المسند!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              مرحباً بك <strong>{name}</strong> في فضاء ({roleCopy.title}). يمكنك الآن الدخول إلى حسابك والاستفادة من خدمات المنصة.
            </p>
          </div>

          {/* Post-Registration Note on Identity Verification */}
          <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-start space-y-2">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-extrabold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>ملاحظة حول إثبات الهوية وعلامة التوثيق</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-200/90 leading-relaxed">
              إن عملية إثبات الهوية — التي تمنح حسابك صلاحيات أكبر وتضيف لك <strong>علامة التوثيق الرسمية</strong> — تتم بعد التواصل مع المشرف للتثبت من الهوية وإعطائك علامة التوثيق.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>الدخول إلى المنصة الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/support"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center justify-center gap-2 transition"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>التواصل مع المشرف لإثبات الهوية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8" dir={t.dir}>
      {/* Top 4-Role Selector Cards */}
      <div className="space-y-3 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {t.authModal.registerTitle}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          اختر نوع الحساب المناسب لك وأكمل البيانات الأساسية للتسجيل في المنصة
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {ROLE_VISUAL_CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = selectedRole === card.role;
            const cardText = t.roles[card.role];

            return (
              <button
                key={card.role}
                type="button"
                onClick={() => setSelectedRole(card.role)}
                className={`relative text-start p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 shadow-md"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {cardText.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {cardText.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Registration Form Card (Zero code alerts or verification warnings during signup) */}
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${activeCard.iconBg}`}
          >
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border mb-1 ${activeCard.badgeStyle}`}
            >
              {roleCopy.badge}
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {roleCopy.title}
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {roleCopy.nameLabel}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={roleCopy.namePlaceholder}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              اسم المستخدم (المعرف الشخصي للإشارة @username)
            </label>
            <div className="relative">
              <span className="text-slate-400 absolute start-3.5 top-2.5 font-mono text-sm font-bold">@</span>
              <input
                type="text"
                value={username}
                dir="ltr"
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_.]/g, ""))}
                placeholder="username"
                className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {selectedRole === "STUDENT" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.authForm.studentGradeLabel}
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
                <select
                  required
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">{t.authForm.studentGradePlaceholder}</option>
                  {STUDENT_GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {roleCopy.orgLabel}
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type="text"
                required={
                  selectedRole === "INSTITUTION" || selectedRole === "INSPECTOR"
                }
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder={roleCopy.orgPlaceholder}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.authForm.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.authForm.passwordLabel} ({t.authForm.passwordHint})
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full ps-10 pe-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute end-3 top-2.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.authForm.termsLabel}{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-blue-600 font-bold underline cursor-pointer"
                >
                  (عرض الشروط والأحكام)
                </button>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>
              {t.authForm.submitRegister} ({roleCopy.title})
            </span>
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          <span className="text-xs text-slate-400">أو التسجيل السريع عبر</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        </div>

        <button
          type="button"
          disabled={googleLoading}
          onClick={handleGoogleRegister}
          className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-extrabold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer shadow-sm"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
            </svg>
          )}
          <span>التسجيل أو المتابعة باستخدام حساب جوجل (Google)</span>
        </button>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
          <Link
            href={`/login?role=${selectedRole}`}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {t.authModal.switchToLogin}
          </Link>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base border-b pb-3 border-slate-100 dark:border-slate-800">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>شروط وأحكام استخدام منصة المسند</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed max-h-72 overflow-y-auto">
              <p>
                1. <strong>الموثوقية التربوية:</strong> يلتزم جميع الناشرين بنشر محتوى علمي وبيداغوجي سليم يتوافق مع البرامج الرسمية.
              </p>
              <p>
                2. <strong>إثبات الهوية والتوثيق:</strong> يُنشأ الحساب بشكل عادي ومباشر، وتتم عملية إثبات الهوية للحصول على صلاحيات أكبر وعلامة التوثيق بعد التواصل مع المشرف للتثبت من الهوية.
              </p>
              <p>
                3. <strong>تعديل النشرات المعتمدة:</strong> في حال حصول النشرة على شارة اعتماد من المتفقد، فإن تعديل العنوان أو الوصف لا يؤثر على الشارة، بينما استبدال الملف يلغي شارة الاعتماد تلقائياً لحين إعادة المراجعة.
              </p>
              <p>
                4. <strong>احترام الملكية الفكرية والضوابط:</strong> يحق لإدارة المنصة حظر أي حساب أو حذف أي منشور يثبت انتهاكه لحقوق النشر أو ضوابط المنصة.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAcceptedTerms(true);
                  setShowTermsModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                قرأت وأوافق على الشروط
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        }
      >
        <RegisterContent />
      </Suspense>
    </main>
  );
}