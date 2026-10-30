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
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 sm:p-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
          <Clock className="h-8 w-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 px-4 py-1 text-xs font-black text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 mb-4">
          <Clock className="h-3.5 w-3.5" />
          <span>سيأتي قريباً • Coming Soon</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          قسم الاشتراكات والباقات
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          هذا القسم قيد الإعداد والتطوير وسيكون متاحاً لجميع الأعضاء قريباً.
        </p>
      </div>
    </section>
  );
}
