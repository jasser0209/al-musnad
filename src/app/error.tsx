"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-3xl flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-900 shadow-sm">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            واجه النظام مشكلة أثناء معالجة طلبك على منصة «المسند». يرجى إعادة المحاولة أو العودة للرئيسية.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}