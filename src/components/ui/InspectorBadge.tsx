import React from "react";
import { BadgeCheck, BookOpen, GraduationCap, Ban, ShieldAlert, ShieldCheck } from "lucide-react";
import type { Role } from "@/types";

interface InspectorBadgeProps {
  role?: Role | string;
  isVerified?: boolean;
  isBanned?: boolean;
  size?: "sm" | "md";
}

export default function InspectorBadge({
  role,
  isVerified,
  isBanned,
  size = "sm",
}: InspectorBadgeProps) {
  // 1. Publisher Ban Badge
  if (isBanned) {
    return (
      <span
        title="هذا الحساب محظور حالياً من النشر لمخالفة ضوابط المنصة"
        className={`inline-flex items-center gap-1 rounded-full bg-red-600 text-white font-extrabold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <Ban className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>حساب محظور</span>
      </span>
    );
  }

  // 2. Admin Badge (قمة الهرم)
  if (role === "ADMIN") {
    return (
      <span
        title="المشرف العام لمنصة المسند"
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <ShieldCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>مشرف عام</span>
      </span>
    );
  }

  // 3. Moderator Badge (المسؤول الإداري)
  if (role === "MODERATOR") {
    return (
      <span
        title="مسؤول إداري معتمد بالمنصة"
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <ShieldAlert className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>مسؤول إداري</span>
      </span>
    );
  }

  // 4. Certified Inspector Badge — STRICTLY EXCLUSIVE to verified Inspectors (isVerified === true)
  if (role === "INSPECTOR") {
    if (isVerified) {
      return (
        <span
          title="متفقد تربوي معتمد للإشراف والمصادقة البيداغوجية"
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-sm select-none ${
            size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          <BadgeCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
          <span>متفقد معتمد</span>
        </span>
      );
    }
    return null;
  }

  // 5. Educational Institution Badge — STRICTLY EXCLUSIVE to verified Institutions (isVerified === true)
  if (role === "INSTITUTION") {
    if (isVerified) {
      return (
        <span
          title="مؤسسة تربوية موثقة رسمياً بكود معتمد في المسند"
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-sm select-none ${
            size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          <BadgeCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
          <span>مؤسسة معتمدة</span>
        </span>
      );
    }
    return null;
  }

  // 6. Teacher Badge — Appears immediately upon login ("معلم"), and upgrades to "معلم موثق" when verified
  if (role === "TEACHER") {
    if (isVerified) {
      return (
        <span
          title="معلم موثق رسمياً بكود معتمد في المسند"
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-sm select-none ${
            size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          <BadgeCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
          <span>معلم موثق</span>
        </span>
      );
    }
    return (
      <span
        title="حساب معلم"
        className={`inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <BookOpen className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>معلم</span>
      </span>
    );
  }

  // 7. Student Badge — Appears immediately upon login ("تلميذ")
  if (role === "STUDENT") {
    return (
      <span
        title="حساب تلميذ"
        className={`inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <GraduationCap className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>تلميذ</span>
      </span>
    );
  }

  return null;
}