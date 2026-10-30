"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, ShieldCheck, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { activateInspectorCodeAction } from "@/actions/inspector.actions";

export default function InspectorActivatePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);

  const handleActivate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code.trim()) {
      setError("يرجى إدخال كود التفعيل المقدم من المشرف");
      return;
    }

    try {
      setLoading(true);
      await activateInspectorCodeAction(code);
      setActivated(true);
      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "كود التفعيل غير صالح");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">تفعيل صلاحية المتفقد التربوي</h1>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          بعد التحقق من هويتك من قِبل إدارة المنصة، أدخل الكود السري الممنوح لك لتفعيل شارة المتفقد المعتمد وصلاحية إضافة التوجيهات البيداغوجية.
        </p>

        {activated ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="font-bold text-base">تم تفعيل صلاحية المتفقد بنجاح!</h2>
            <p className="text-xs">تظهر الآن الشارة الرسمية بجانب اسمك في جميع أنحاء المنصة.</p>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="space-y-4 text-right">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                كود التفعيل الخاص بالمتفقد *
              </label>
              <input
                type="text"
                required
                dir="ltr"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="INSP-XXXX-XXXX"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center font-mono text-base font-bold tracking-widest uppercase outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>تفعيل الصلاحية والشارة الرسمية</span>
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لتصفح الأنشطة</span>
          </Link>
        </div>
      </div>
    </main>
  );
}