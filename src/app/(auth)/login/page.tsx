"use client";

/**
 * Multi-Role Login Page — Al-Musnad (المسند) v11.0
 *
 * Implements:
 * 1. Pressing `Enter` after typing email/username and password immediately submits login.
 * 2. Smart Password Check & 6-Attempt Lockout Protection (`/api/auth/login-guard`):
 *    - Checks if the email/@username is registered on the platform.
 *    - If registered and password is wrong, displays a clear error stating that the email is
 *      registered on the site but the password is incorrect, along with the 6-attempt warning
 *      counter (`المحاولة X من 6 — متبقي Y محاولات`).
 *    - On the 6th failed password attempt, locks the account automatically and instructs the
 *      user to contact the Administrator (المشرف العام) or Moderator (المسؤول الإداري).
 * 3. Continue with Google OAuth (`المتابعة باستخدام حساب جوجل`).
 */

import React, { useState, useEffect, FormEvent, KeyboardEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldAlert,
  Headphones,
  CornerDownLeft,
} from "lucide-react";
import { createSupabaseBrowserClient, isSupabaseConfiguredInBrowser } from "@/lib/supabase/client";
import { signInSchema } from "@/lib/validators/auth";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { ROLE_VISUAL_CARDS } from "@/components/auth/AuthRoleModal";
import { MAX_LOGIN_PASSWORD_ATTEMPTS, findDemoAccountByIdentifier } from "@/config/constants";
import type { AccountRoleOption } from "@/types/api";

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
  const roleParam = searchParams
    ?.get("role")
    ?.toUpperCase() as AccountRoleOption | undefined;

  const { t } = useAppPreferences();

  const [selectedRole, setSelectedRole] = useState<AccountRoleOption | null>(
    roleParam &&
      ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleParam)
      ? roleParam
      : null
  );

  useEffect(() => {
    if (
      roleParam &&
      ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleParam)
    ) {
      setSelectedRole(roleParam);
    }
  }, [roleParam]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === "account-locked"
      ? "🔒 تم قفل حسابك لتجاوز الحد الأقصى لمحاولات كلمة المرور (6 محاولات). رجاءً تواصل مع المسؤول أو المشرف العام لفك قفل الحساب."
      : null
  );
  const [isAccountLocked, setIsAccountLocked] = useState<boolean>(
    errorParam === "account-locked"
  );
  const [remainingAttempts, setRemainingAttempts] = useState<number>(
    MAX_LOGIN_PASSWORD_ATTEMPTS
  );

  const executeLogin = async () => {
    if (loading) return;
    setError(null);

    const parsed = signInSchema.safeParse({
      email,
      password,
      role: selectedRole || "TEACHER",
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "البيانات المدخلة غير صحيحة");
      return;
    }

    try {
      setLoading(true);
      const rawIdentifier = parsed.data.email.trim();

      // Allow Owner Admin (bjasser123@gmail.com / Jasserbes1M) and local test accounts to log in from ANY portal
      const matchedAccount = findDemoAccountByIdentifier(rawIdentifier);
      if (matchedAccount && parsed.data.password === matchedAccount.password) {
        const res = await fetch("/api/auth/demo-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: matchedAccount.email }),
        });
        const json = await res.json();
        if (json.success) {
          // Also attempt real Supabase login in background if configured
          if (isSupabaseConfiguredInBrowser()) {
            const supabase = createSupabaseBrowserClient();
            await supabase.auth
              .signInWithPassword({
                email: matchedAccount.email,
                password: parsed.data.password,
              })
              .catch(() => null);
          }
          const targetUrl =
            redirectTo && redirectTo !== "/"
              ? redirectTo
              : json.data?.redirectTo || matchedAccount.dashboardHref || "/";
          router.push(targetUrl);
          router.refresh();
          return;
        }
      }

      // Step 1: Pre-check if email/username is registered and whether account is locked
      let loginEmail = rawIdentifier;
      let existsInDb = false;

      try {
        const preRes = await fetch("/api/auth/login-guard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "PRECHECK",
            identifier: rawIdentifier,
          }),
        });
        const preJson = await preRes.json();
        if (preJson.success && preJson.data) {
          existsInDb = Boolean(preJson.data.exists);
          if (preJson.data.resolvedEmail) {
            loginEmail = preJson.data.resolvedEmail;
          }
          if (typeof preJson.data.remainingAttempts === "number") {
            setRemainingAttempts(preJson.data.remainingAttempts);
          }
          if (preJson.data.isLocked || preJson.data.isBanned) {
            setIsAccountLocked(true);
            setError(
              preJson.data.lockMessage ||
                "🔒 هذا الحساب مقفل حالياً. رجاءً تواصل مع المسؤول أو المشرف العام لفك قفل الحساب."
            );
            return;
          }
        }
      } catch {
        // Fallback if guard endpoint is unreachable
      }

      // Step 2: Attempt Supabase Auth login
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: parsed.data.password,
      });

      if (authError) {
        if (existsInDb) {
          // Email IS registered on the site, so the password entered is definitely wrong!
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
                  "❌ كلمة المرور خاطئة لهذا الحساب المسجل. تنبيه: لديك 6 محاولات كحد أقصى قبل قفل الحساب."
              );
              return;
            }
          } catch {
            // fallback
          }
          setError(
            "❌ البريد الإلكتروني مسجل في المنصة ولكن كلمة المرور خاطئة! تنبيه: لديك فرصة 6 مرات فقط لكتابة كلمة المرور قبل قفل الحساب."
          );
          return;
        }

        setError(
          "هذا البريد الإلكتروني أو المعرف غير مسجل في المنصة، أو أن البيانات غير صحيحة."
        );
        return;
      }

      // Step 3: Reset failed attempts counter on successful login
      await fetch("/api/auth/login-guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RESET_SUCCESS",
          identifier: loginEmail,
        }),
      }).catch(() => null);

      router.push(redirectTo);
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
      const { data, error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: `${window.location.origin}/api/auth/callback?role=${encodeURIComponent(
            roleToPass
          )}&next=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });
      if (oauthErr || !data?.url || data.url.includes("placeholder.supabase.co")) {
        setError("خدمة الدخول عبر Google تتطلب ربط مفاتيح Google OAuth في إعدادات Supabase.");
        setGoogleLoading(false);
        return;
      }
      if (window.top && window.top !== window.self) {
        window.top.location.href = data.url;
      } else {
        window.location.assign(data.url);
      }
    } catch {
      setError("تعذر بدء تسجيل الدخول باستخدام حساب Google.");
      setGoogleLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="max-w-7xl w-full mx-auto py-8 px-4 space-y-8" dir={t.dir}>
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t.authModal.loginTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.authModal.loginSubtitle}
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
                onClick={() => setSelectedRole(card.role)}
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

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {t.authModal.switchToRegister}
          </Link>
        </p>
      </div>
    );
  }

  const activeCard =
    ROLE_VISUAL_CARDS.find((c) => c.role === selectedRole) ||
    ROLE_VISUAL_CARDS[2];
  const ActiveIcon = activeCard.icon;
  const roleCopy = t.roles[selectedRole];

  return (
    <div
      className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg"
      dir={t.dir}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {t.authModal.changeRoleBtn}:
          </span>
          <button
            type="button"
            onClick={() => setSelectedRole(null)}
            className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>عرض البوابات الأربع</span>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ROLE_VISUAL_CARDS.map((card) => {
            const Icon = card.icon;
            const active = selectedRole === card.role;
            return (
              <button
                key={card.role}
                type="button"
                onClick={() => setSelectedRole(card.role)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {t.roles[card.role].title
                    .replace("حساب ", "")
                    .replace("Espace ", "")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-md ${activeCard.iconBg}`}
        >
          <ActiveIcon className="w-7 h-7" />
        </div>
        <span
          className={`px-3 py-0.5 rounded-full text-[11px] font-bold border mb-2 ${activeCard.badgeStyle}`}
        >
          {roleCopy.badge}
        </span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          {t.nav.login} — {roleCopy.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {roleCopy.subtitle}
        </p>
      </div>

      {/* Security Warning Banner: 6 Password Attempts Policy */}
      <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50/80 dark:border-amber-900/60 dark:bg-amber-950/30 px-4 py-2.5 flex items-center justify-between gap-2 text-[11px] font-bold text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            حماية الحساب: لديك فرصة <strong>6 محاولات فقط</strong> لكتابة كلمة المرور قبل قفل الحساب تلقائياً.
          </span>
        </div>
        <span className="shrink-0 rounded-lg bg-amber-200/70 dark:bg-amber-900/70 px-2 py-0.5 font-extrabold">
          متبقي: {remainingAttempts}/6
        </span>
      </div>

      {error && (
        <div className="mb-5 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-xs space-y-2.5">
          <div className="flex items-start gap-2 font-bold leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
          {isAccountLocked && (
            <div className="pt-2 border-t border-red-200/80 dark:border-red-800/80 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold">
                لطلب فك القفل من المشرف العام أو المسؤول الإداري:
              </span>
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 px-3 py-1.5 text-[11px] font-extrabold text-white transition"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>التواصل مع الإدارة</span>
              </Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.authForm.emailLabel}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
            <input
              type="text"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDownEnter}
              placeholder="أدخل البريد الإلكتروني أو @username"
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              {t.authForm.passwordLabel}
            </label>
            <span className="text-[10px] font-semibold text-slate-400 inline-flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" />
              اضغط Enter للدخول الفوري
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDownEnter}
              placeholder="أدخل كلمة المرور ثم اضغط Enter"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{t.authForm.submitLogin} (Enter ↵)</span>
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        <span className="text-xs text-slate-400">{t.authForm.orDivider}</span>
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
        <span>{t.authForm.googleContinue}</span>
      </button>

      <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-6">
        <Link
          href={`/register?role=${selectedRole}`}
          className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
        >
          {t.authModal.switchToRegister}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-[82vh] flex items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </main>
  );
}
