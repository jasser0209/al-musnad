import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Scale,
  Lock,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Sparkles,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "شروط الاستخدام وميثاق الملكية الفكرية | منصة المسند",
  description:
    "ميثاق شروط الاستخدام وحماية حقوق المؤلف والملكية الفكرية للمربين والمؤسسات في منصة المسند التربوية بالجمهورية التونسية.",
  alternates: {
    canonical: "https://al-musnad.vercel.app/terms",
  },
};

export default function TermsAndIpPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">شروط الاستخدام والملكية الفكرية</span>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-bold border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>ميثاق قانوني وبيداغوجي ملزم — الإصدار 15.0</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              شروط الاستخدام وميثاق الملكية الفكرية وحماية المؤلف
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              الإطار التنظيمي والأخلاقي لمنصة «المسند» لضمان حقوق السادة المربين والمتفقدين والمؤسسات وحماية أمان البيانات والمحتوى البيداغوجي الموجه لأبنائنا التلاميذ.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-blue-200">
              <span>تاريخ آخر تحيين: أكتوبر 2026</span>
              <span>•</span>
              <span>الجمهورية التونسية</span>
            </div>
          </div>
        </div>

        {/* Section 1: Intellectual Property & Author Rights */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                1. إشعار حقوق الملكية الفكرية وحقوق المؤلف
              </h2>
              <p className="text-xs text-slate-500">حماية إنتاج المربين المعلمين والمتفقدين والمؤسسات التربوية</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              تؤكد منصة <strong>«المسند»</strong> أن جميع الجذاذات البيداغوجية، مذكرات الدروس، التمارين، أوراق العمل، الفروض، الامتحانات، والتوزيعات المنشورة في المنصة تظل ملكاً فكرياً وأدبياً حصرياً لأصحابها ومؤلفيها من السادة <strong>المعلمين والمتفقدين التربويين والمؤسسات التربوية</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>الاستخدام البيداغوجي المسموح به:</span>
                </div>
                <p className="text-xs text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed">
                  يُتاح تحميل ومعاينة وطباعة كافة الوثائق مجاناً لغايات التدريس داخل الأقسام التعليمية والدعم والمراجعة المنزلية للتلاميذ وأوليائهم دون أي رسوم.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>الحظر التجاري الصارم:</span>
                </div>
                <p className="text-xs text-rose-900/90 dark:text-rose-300/90 leading-relaxed">
                  يُحظر حظراً تاماً وقانونياً نسخ أو إعادة تجميع أو بيع محتويات المنصة في مطبوعات ورقية أو كراسات أو منصات مدفوعة الأجر بهدف تحقيق ربح مادي دون إذن كتابي موثق ومسبق من صاحب العمل.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Disclaimer & Institutional Independence */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                2. إخلاء المسؤولية والاستقلالية البيداغوجية
              </h2>
              <p className="text-xs text-slate-500">التوافق مع البرامج الرسمية التونسية</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              منصة <strong>«المسند»</strong> هي مبادرة تربوية رقمية مستقلة تهدف إلى تعزيز المحتوى التربوي التونسي وتيسير المبادلات البيداغوجية والإدارية بين مختلف أطراف العملية التعليمية (المؤسسات، المتفقدون، المعلمون، والتلاميذ).
            </p>
            <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              📌 <strong>التوافق مع البرامج الرسمية:</strong> نحرص في كافة المستويات الدراسية الستة والمواد التعليمية على الالتزام الكامل بالمناهج والبرامج الرسمية المقررة من وزارة التربية بالجمهورية التونسية، مع التأكيد على أن المنصة فضاء تعاوني رقمي حر وليست إدارة رسمية تابعة للوزارة.
            </p>
          </div>
        </div>

        {/* Section 3: Publishing Charter & Takedown Policy */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                3. ميثاق النشر وآلية الإبلاغ والحذف الفوري
              </h2>
              <p className="text-xs text-slate-500">ضوابط الاعتماد وسحب الشارات والبلاغات</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>معايير جودة المحتوى:</strong> يلتزم كل ناشر بعدم تحميل أي ملفات مسيئة أو منتهكة للآداب العامة، أو ذات أبعاد تجارية بحتة لا علاقة لها بالعمل التربوي.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>سحب شارة الاعتماد التلقائي:</strong> عند قيام الناشر بتعديل أو استبدال الملف المرفق في أي وثيقة حاصلة على شارة <em>«معتمد بيداغوجياً»</em>، يقوم النظام تلقائياً بسحب الشارة مؤقتاً لحين إعادة مراجعة الملف وتدقيقه من قبل المتفقد التربوي المختص لضمان سلامة المحتوى المحدث.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>آلية الإبلاغ والحذف الفوري (Takedown Policy):</strong> تلتزم إدارة المنصة بحجب وحذف أي وثيقة يتبين وجود تعدٍّ فيها على حقوق مؤلف أو ناشر آخر فور إخطارنا بذلك، مع إمكانية اتخاذ تدابير انضباطية تشمل تعليق الحساب المخالف.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4: Data Protection & Privacy */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                4. حماية المعطيات الشخصية والخصوصية
              </h2>
              <p className="text-xs text-slate-500">حماية بيانات المستخدمين طبقاً للتشريع التونسي</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              تولي منصة «المسند» أهمية قصوى لحماية سرية وأمان البيانات الشخصية للمربين والمتفقدين والمؤسسات والتلاميذ طبقاً لمقتضيات التشريع التونسي المتعلق بحماية المعطيات الشخصية.
            </p>
            <p>
              لا نقوم ببيع أو مشاركة عناوين البريد الإلكتروني أو أرقام الهواتف أو البيانات الحساسة مع أي أطراف ثالثة أو شركات إعلانية، وتُستخدم بيانات الحساب حصرياً لأغراض التوثيق وتسهيل التواصل البيداغوجي وتأمين الدخول.
            </p>
          </div>
        </div>

        {/* Contact Support & Infringement Reporting Callout */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/50 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              هل لديك استفسار أو ترغب في الإبلاغ عن انتهاك للملكية؟
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              فريق الدعم الفني والمشرف العام جاهزون لمعالجة كافة الطلبات والبلاغات على مدار الساعة.
            </p>
          </div>
          <Link
            href="/support"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition shrink-0"
          >
            <Headphones className="w-4 h-4" />
            <span>التواصل مع الدعم الفني</span>
          </Link>
        </div>
      </div>
    </div>
  );
}