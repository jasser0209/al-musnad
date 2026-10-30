"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  ArrowRight,
  Lock,
  Layers,
} from "lucide-react";

interface SupervisoryHierarchyBarProps {
  viewerRole: string;
  currentDashboard: "ADMIN" | "MODERATOR" | "INSPECTOR";
}

export default function SupervisoryHierarchyBar({
  viewerRole,
  currentDashboard,
}: SupervisoryHierarchyBarProps) {
  // Case 1: Top Administrator (`ADMIN`) — Clean navigation across dashboards
  if (viewerRole === "ADMIN") {
    return (
      <div
        dir="rtl"
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            التنقل الإشرافي (المشرف العام)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentDashboard !== "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1.5 text-xs font-black shadow-sm transition"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>الرجوع إلى لوحة المشرف العام</span>
            </Link>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/admin/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "ADMIN"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>لوحة المشرف العام</span>
            </Link>

            <Link
              href="/moderator/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "MODERATOR"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>لوحة المسؤول</span>
            </Link>

            <Link
              href="/inspector/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "INSPECTOR"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              <span>لوحة المتفقد</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Moderator or Inspector — Strictly isolated without permission disclosure
  return null;
}
