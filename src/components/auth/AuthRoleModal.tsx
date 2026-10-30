"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import type { AccountRoleOption } from "@/types/api";

export interface RoleOptionVisual {
  role: AccountRoleOption;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  borderHover: string;
  badgeStyle: string;
  iconBg: string;
}

export const ROLE_VISUAL_CARDS: RoleOptionVisual[] = [
  {
    role: "INSTITUTION",
    icon: Building2,
    gradient: "from-indigo-600 to-violet-700",
    borderHover: "hover:border-indigo-500 dark:hover:border-indigo-400",
    badgeStyle:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    iconBg: "bg-indigo-600 text-white shadow-indigo-500/25",
  },
  {
    role: "INSPECTOR",
    icon: ShieldCheck,
    gradient: "from-amber-500 to-orange-600",
    borderHover: "hover:border-amber-500 dark:hover:border-amber-400",
    badgeStyle:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/25",
  },
  {
    role: "TEACHER",
    icon: BookOpen,
    gradient: "from-blue-600 to-cyan-600",
    borderHover: "hover:border-blue-500 dark:hover:border-blue-400",
    badgeStyle:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    iconBg: "bg-blue-600 text-white shadow-blue-500/25",
  },
  {
    role: "STUDENT",
    icon: GraduationCap,
    gradient: "from-emerald-600 to-teal-600",
    borderHover: "hover:border-emerald-500 dark:hover:border-emerald-400",
    badgeStyle:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    iconBg: "bg-emerald-600 text-white shadow-emerald-500/25",
  },
];

export default function AuthRoleModal() {
  const router = useRouter();
  const { authModalMode, closeAuthModal, openAuthModal, t } = useAppPreferences();

  useEffect(() => {
    if (!authModalMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [authModalMode, closeAuthModal]);

  if (!authModalMode) return null;

  const isLogin = authModalMode === "login";
  const ArrowIcon = t.dir === "rtl" ? ArrowLeft : ArrowRight;

  const handleSelectRole = (role: AccountRoleOption) => {
    const targetPath = isLogin ? `/login?role=${role}` : `/register?role=${role}`;
    closeAuthModal();
    router.push(targetPath);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fadeIn p-4 sm:p-8"
      dir={t.dir}
    >
      {/* Top Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/30">
            م
          </div>
          <div>
            <span className="text-lg font-extrabold text-white block leading-none">
              {t.brandName}
            </span>
            <span className="text-xs text-slate-400">{t.brandTagline}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeAuthModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition cursor-pointer"
        >
          <span>{t.authModal.close}</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Center Content: 4 Full-Screen Portals */}
      <div className="max-w-7xl w-full mx-auto my-auto py-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isLogin ? t.nav.login : t.nav.register}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isLogin ? t.authModal.loginTitle : t.authModal.registerTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isLogin ? t.authModal.loginSubtitle : t.authModal.registerSubtitle}
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
                onClick={() => handleSelectRole(card.role)}
                className={`group relative text-start bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 ${card.borderHover} rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden`}
              >
                <div
                  className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${card.gradient}`}
                />

                <div className="space-y-5 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${card.badgeStyle}`}
                    >
                      {roleText.badge}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${card.iconBg} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {roleText.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {roleText.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>
                    {isLogin ? t.nav.login : t.nav.register} ({roleText.title})
                  </span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => openAuthModal(isLogin ? "register" : "login")}
            className="text-sm font-bold text-blue-300 hover:text-white underline underline-offset-4 transition cursor-pointer"
          >
            {isLogin ? t.authModal.switchToRegister : t.authModal.switchToLogin}
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {t.brandName}
      </div>
    </div>
  );
}