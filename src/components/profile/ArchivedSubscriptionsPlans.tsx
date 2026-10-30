"use client";

import React from "react";
import { Clock } from "lucide-react";

export const PRESERVED_SUBSCRIPTION_PLANS = [
  {
    code: "STANDARD",
    title: "الباقة الأساسية",
    price: "اشتراك أساسي",
    features: [
      "تصفح ومعاينة النشرات التربوية",
      "متابعة الناشرين وإضافتهم للمفضلة",
      "نشر الوثائق مع تحديد جمهور النشر",
    ],
  },
  {
    code: "PRO_EDUCATOR",
    title: "باقة المعلم المتميز (Pro)",
    price: "اشتراك سنوي للمعلمين",
    features: [
      "تحميل غير محدود لكافة المذكرات والإصلاحات",
      "أولوية عرض النشرات في ملف ناشر موثق",
      "إحصائيات تفصيلية لتحميلات وتفاعل الزملاء",
    ],
  },
  {
    code: "INSTITUTION_PLUS",
    title: "باقة المؤسسات والمدارس",
    price: "اشتراك مؤسساتي شامل",
    features: [
      "فضاء رسمي باسم المؤسسة التربوية",
      "نشر موجه لمعلمي وتلاميذ المؤسسة",
      "اعتماد وتوثيق مباشر مع المتفقدين التربويين",
    ],
  },
] as const;

interface ArchivedSubscriptionsPlansProps {
  currentPlan?: string;
  planLoading?: string | null;
  onSelectPlan?: (planCode: string) => void;
}

export default function ArchivedSubscriptionsPlans(
  _props: ArchivedSubscriptionsPlansProps
) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 sm:p-14 shadow-sm text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
          <Clock className="w-8 h-8" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-4 py-1 text-xs font-extrabold text-amber-800 dark:text-amber-300">
          قسم الاشتراكات
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          سيأتي قريباً
        </h2>
      </div>
    </div>
  );
}
