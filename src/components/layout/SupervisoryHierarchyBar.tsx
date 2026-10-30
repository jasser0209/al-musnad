"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  ArrowRight,
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
  // Only render the 3-dashboard navigation bar for Top Admin (`ADMIN`).
  // For Moderator and Inspector, do NOT render any exposed privilege notice at the top.
  if (viewerRole !== "ADMIN") {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="mb-6 rounded-2xl border border-blue-200 dark:border-blue-800/80 bg-gradient-to-l from-blue-900 via-indigo-900 to-slate-900 text-white p-4 shadow-md"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-amber-300">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-sm font-extrabold text-white">
            التنقل السريع بين لوحات التحكم
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {currentDashboard !== "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 text-xs font-black shadow-sm transition"
            >
              <ArrowRight className="h-4 w-4" />
              <span>الرجوع إلى لوحة المشرف العام</span>
            </Link>
          )}

          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-950/40 p-1.5 border border-white/10">
            <Link
              href="/admin/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "ADMIN"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-100 hover:bg-white/10"
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
                  : "text-blue-100 hover:bg-white/10"
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
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              <span>لوحة المتفقد</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
