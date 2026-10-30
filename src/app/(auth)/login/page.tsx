"use client";

import React, {
  useState,
  FormEvent,
  KeyboardEvent,
  Suspense,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signInSchema } from "@/lib/validators/auth";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { ROLE_VISUAL_CARDS } from "@/components/auth/AuthRoleModal";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import type { AccountRoleOption } from "@/types/api";

const PORTAL_NAMES_AR: Record<string, string> = {
  INSTITUTION: "فضاء المؤسسات التربوية",
  INSPECTOR: "فضاء المتفقد التربوي",
  TEACHER: "فضاء المعلم والأستاذ",
  STUDENT: "فضاء التلميذ والولي",
  MODERATOR: "لوحة المسؤول الإداري",
  ADMIN: "لوحة المشرف العام",
};

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo") || "/";
  const errorParam = searchParams?.get("error");
  const roleParam = searchParams?.get("role");
  const actualRoleParam = searchParams?.get("actualRole");

  const { t } = useAppPreferences();

  const [selectedRole, setSelectedRole] = useState<string | null>(
    roleParam ? roleParam.toUpperCase() : null
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedPortalRole, setSuggestedPortalRole] = useState<string | null>(null);

  const [isAccountLocked, setIsAccountLocked] = useState<boolean>(
    errorParam === "account-locked"
  );
  const [, setRemainingAttempts] = useState<number>(
    MAX_LOGIN_PASSWORD_ATTEMPTS
  );

  useEffect(() => {
    if (roleParam) setSelectedRole(roleParam.toUpperCase());
  }, [roleParam]);

  useEffect(() => {
    if (errorParam === "portal-mismatch" && actualRoleParam) {
      const actualUpper = actualRoleParam.toUpperCase();
      setSuggestedPortalRole(actualUpper);
      setError(
        `عذراً، هذا الحساب مسجل في «${
          PORTAL_NAMES_AR[actualUpper] || actualUpper
        }» ولا يمكنه تسجيل الدخول من هذا الفضاء. يجب على كل فئة تسجيل الدخول من الفضاء الخاص بها فقط.`
      );
    } else if (errorParam === "account-locked") {
      setIsAccountLocked(true);
      setError("تم تعليق الدخول مؤقتاً لحماية الحساب. يرجى التواصل مع الدعم الفني لتفعيل الحساب.");
    } else if (errorParam === "account-not-found") {
      setError(
        "هذا الحساب غير موجود أو تم حذفه مسبقاً. عند حذف الحساب أو عدم وجوده، يجب عليك إعادة إنشاء حساب جديد أولاً."
      );
    }
  }, [errorParam, actualRoleParam]);

  const executeLogin = async (
    overrideEmail?: string,
    overridePassword?: string,
    overrideRole?: string
  ) => {
    if (loading) return;
    setError(null);
    setSuggestedPortalRole(null);

    const portalRole = (overrideRole || selectedRole || "").toUpperCase();
    if (!portalRole) {
      setError("يرجى اختيار الفضاء المخصص لنوع حسابك أولاً.");
      return;
    }

    const emailToUse = overrideEmail || email;
    const passwordToUse = overridePassword || password;
    const rawInput = emailToUse.trim().toLowerCase();

    const isProduction = process.env.NODE_ENV === "production";
    const isMusnadDemo =
      rawInput.endsWith("@musnad.tn") ||
      ["admin", "moderator", "inspector", "institution", "teacher", "student"].includes(
        rawInput.replace(/^@/, "")
      );

    if (isProduction && isMusnadDemo) {
      setError(
        "حسابات التجربة (@musnad.tn) محصورة في بيئة التطوير المحلية فقط، وليست متاحة في بيئة الإنتاج."
      );
      return;
    }

    const parsed = signInSchema.safeParse({
      email: emailToUse,
      password: passwordToUse,
      role: ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(portalRole)
        ? (portalRole as any)
        : undefined,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "البيانات المدخلة غير صحيحة");
      return;
    }

    try {
      setLoading(true);
      const rawIdentifier = parsed.data.email.trim();

      // Step 1: Pre-check if email/username is registered, whether account is locked,
      // and whether the user is logging in from their rightful portal!
      let loginEmail = rawIdentifier;
      let resolvedRole = portalRole;
      let resolvedVerified = false;
      let existsInDb = false;

      try {
        const preRes = await fetch("/api/auth/login-guard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "PRECHECK",
            identifier: rawIdentifier,
            selectedRole: portalRole,
          }),
        });
        const preJson = await preRes.json();
        if (preJson.success && preJson.data) {
          existsInDb = Boolean(preJson.data.exists);
          if (preJson.data.resolvedEmail) {
            loginEmail = preJson.data.resolvedEmail;
          }
          if (preJson.data.role) {
            resolvedRole = preJson.data.role;
          }
          resolvedVerified = Boolean(preJson.data.isVerified);
          if (typeof preJson.data.remainingAttempts === "number") {
            setRemainingAttempts(preJson.data.remainingAttempts);
          }
          if (preJson.data.isLocked || preJson.data.isBanned) {
            setIsAccountLocked(true);
            setError(
              preJson.data.lockMessage ||
                "هذا الحساب موقوف مؤقتاً. يرجى التواصل مع الدعم الفني."
            );
            return;
          }

          // Block deleted or non-existent accounts immediately so they must register first
          const isPrimaryAdminCheck =
            rawIdentifier.toLowerCase() === "bjasser123@gmail.com" ||
            rawIdentifier.toLowerCase() === "bjasser" ||
            rawIdentifier.toLowerCase() === "@bjasser";

          if (!existsInDb && !isPrimaryAdminCheck) {
            setError(
              "هذا الحساب غير مسجل في المنصة أو تم حذفه مسبقاً. يجب عليك إنشاء حساب جديد أولاً من صفحة إنشاء الحساب."
            );
            return;
          }

          // Strict Portal-Specific Login Enforcement:
          // Only ADMIN and MODERATOR can log in from any portal.
          if (preJson.data.portalMismatch) {
            if (preJson.data.actualRole) {
              setSuggestedPortalRole(preJson.data.actualRole);
            }
            setError(
              preJson.data.portalMismatchMessage ||
                "عذراً، لا يمكنك تسجيل الدخول من هذا الفضاء. يرجى الدخول من الفضاء المخصص لنوع حسابك."
            );
            return;
          }
        }
      } catch {
        // Fallback
      }

      // Step 2: Attempt Supabase Auth login
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: parsed.data.password,
      });

      if (authError) {
        if (existsInDb) {
          try {
            const failRes = await fetch("/api/auth/login-guard", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "FAILED_ATTEMPT",
                identifier: loginEmail,
              }),
            });
            const failJson = await failRes.json();
            if (failJson.success && failJson.data) {
              setIsAccountLocked(Boolean(failJson.data.isLocked));
              if (typeof failJson.data.remainingAttempts === "number") {
                setRemainingAttempts(failJson.data.remainingAttempts);
              }
              setError(
                failJson.data.message ||
                  "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى."
              );
              return;
            }
          } catch {
            // fallback
          }
          setError(
            "كلمة المرور المدخلة غير صحيحة، يرجى المحاولة مرة أخرى."
          );
          return;
        }

        setError(
          "هذا البريد الإلكتروني أو المعرف غير مسجل في المنصة، أو أن البيانات غير صحيحة."
        );
        return;
      }

      // Step 3: Verify synced profile role from /api/auth/me (catches accounts that were not in DB before login)
      try {
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        if (meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.success && meJson.data) {
            resolvedRole = meJson.data.role || resolvedRole;
            resolvedVerified = Boolean(meJson.data.isVerified);

            const isStaff =
              resolvedRole === "ADMIN" ||
              resolvedRole === "MODERATOR" ||
              loginEmail.toLowerCase() === "bjasser123@gmail.com";

            if (
              !isStaff &&
              ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(portalRole) &&
              resolvedRole !== portalRole
            ) {
              await supabase.auth.signOut();
              setSuggestedPortalRole(resolvedRole);
              setError(
                `عذراً، هذا الحساب مسجل في «${
                  PORTAL_NAMES_AR[resolvedRole] || resolvedRole
                }» ولا يمكنه تسجيل الدخول من «${
                  PORTAL_NAMES_AR[portalRole] || portalRole
                }». يجب على كل حساب تسجيل الدخول من الفضاء المخصص لفئته فقط.`
              );
              return;
            }
          }
        }
      } catch {
        // ignore
      }

      // Step 4: Reset failed attempts counter on successful login
      await fetch("/api/auth/login-guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RESET_SUCCESS",
          identifier: loginEmail,
        }),
      }).catch(() => null);

      const isAdminAccount =
        loginEmail.toLowerCase() === "bjasser123@gmail.com" ||
        loginEmail.toLowerCase() === "admin@musnad.tn" ||
        resolvedRole === "ADMIN";

      const targetDestination = isAdminAccount
        ? "/admin/dashboard"
        : resolvedRole === "MODERATOR"
        ? "/moderator/dashboard"
        : resolvedRole === "INSPECTOR"
        ? resolvedVerified
          ? "/inspector/dashboard"
          : "/#inspectors-hub"
        : resolvedRole === "INSTITUTION"
        ? redirectTo && redirectTo !== "/"
          ? redirectTo
          : "/#institutions-hub"
        : resolvedRole === "TEACHER"
        ? redirectTo && redirectTo !== "/"
          ? redirectTo
          : "/#teachers-hub"
        : redirectTo;

      router.push(targetDestination);
      router.refresh();
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await executeLogin();
  };

  const handleKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (email.trim() && password) {
        void executeLogin();
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      const supabase = createSupabaseBrowserClient();
      const roleToPass = selectedRole || "TEACHER";
      const callbackUrl = `${window.location.origin}/api/auth/callback?role=${encodeURIComponent(
        roleToPass
      )}&mode=login&next=${encodeURIComponent(redirectTo)}`;

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
          "مزود Google غير مفعّل في إعدادات Supabase الحالية أو تعذر الاتصال به. يرجى تسجيل الدخول بالبريد الإلكتروني وكلمة المرور."
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
      setError("تعذر بدء تسجيل الدخول بحساب Google. يرجى استخدام البريد الإلكتروني وكلمة المرور.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto py-8 px-4 space-y-8" dir={t.dir}>
      {!selectedRole ? (
        <div className="space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {t.authModal.loginTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              اختر الفضاء الخاص بنوع حسابك لتسجيل الدخول (يُسمح لكل حساب بالدخول من فضائه الخاص فقط)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLE_VISUAL_CARDS.map((card) => {
              const Icon = card.icon;
              const roleText = t.roles[card.role];
              return (
                <button
                  key={card.role}
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuggestedPortalRole(null);
                    setSelectedRole(card.role);
                  }}
                  className={`group relative text-start bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 ${card.borderHover} rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${card.gradient}`}
                  />
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${card.badgeStyle}`}
                      >
                        {roleText.badge}
                      </span>
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${card.iconBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {roleText.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {roleText.subtitle}
                    </p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 text-xs font-extrabold text-blue-600 dark:text-blue-400">
                    {t.authModal.continueBtn} →
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setSuggestedPortalRole(null);
                setSelectedRole(null);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span>←</span>
              <span>تغيير الفضاء المحدد</span>
            </button>
            <span className="text-xs font-black text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
              {selectedRole === "ADMIN"
                ? "مشرف عام"
                : selectedRole === "MODERATOR"
                ? "مسؤول إداري"
                : t.roles[selectedRole as AccountRoleOption]?.badge || selectedRole}
            </span>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {t.nav.login} —{" "}
              {selectedRole === "ADMIN"
                ? "المشرف العام"
                : selectedRole === "MODERATOR"
                ? "المسؤول الإداري"
                : t.roles[selectedRole as AccountRoleOption]?.title || selectedRole}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {selectedRole === "ADMIN"
                ? "إدارة النظام والتحكم الشامل"
                : selectedRole === "MODERATOR"
                ? "معالجة البلاغات وإدارة المحتوى"
                : t.roles[selectedRole as AccountRoleOption]?.subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-red-300 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div className="space-y-2 flex-1">
                <p>{error}</p>
                {suggestedPortalRole &&
                  ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(
                    suggestedPortalRole
                  ) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole(suggestedPortalRole);
                        setError(null);
                        setSuggestedPortalRole(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-black transition cursor-pointer"
                    >
                      <span>
                        الانتقال إلى {PORTAL_NAMES_AR[suggestedPortalRole] || suggestedPortalRole}
                      </span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                {isAccountLocked && (
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-1 text-[11px] font-black text-red-800 dark:text-red-200 underline mt-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>مراسلة الدعم الفني لفك قفل الحساب فوراً ←</span>
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.authForm.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDownEnter}
                  placeholder="example@mail.com"
                  className="w-full ps-10 pe-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.authForm.passwordLabel}
                </label>
                <Link
                  href="/support"
                  className="text-[11px] text-blue-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDownEnter}
                  placeholder="••••••••"
                  className="w-full ps-10 pe-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute end-3.5 top-3.5 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{t.authForm.submitLogin} (Enter ↵)</span>
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
            <span className="text-[11px] font-bold text-slate-400">أو</span>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          </div>

          <button
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-extrabold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer shadow-sm"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <GoogleIcon />
            )}
            <span>تسجيل الدخول بحساب Google</span>
          </button>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
            <Link
              href={`/register?role=${selectedRole}`}
              className="font-black text-blue-600 dark:text-blue-400 hover:underline"
            >
              ليس لديك حساب في هذا الفضاء؟ أنشئ حسابك الآن ←
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-[82vh] flex items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-xs text-slate-400">جاري تحميل واجهة الدخول...</p>
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </main>
  );
}