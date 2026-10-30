import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  FileCheck2,
  Lock,
  AlertTriangle,
  BookOpenCheck,
  Flag,
  Headphones,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "شروط الاستخدام والملكية الفكرية | منصة المسند التربوية",
  description:
    "شروط الاستخدام، سياسة حقوق الملكية الفكرية، ميثاق النشر البيداغوجي، وحماية المعطيات الشخصية في منصة المسند التربوية وفق التشريع التونسي.",
};

export default function TermsAndIpPolicyPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-l from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-amber-300 text-xs font-extrabold">
            <Scale className="w-4 h-4" />
            <span>الإطار القانوني والتنظيمي لمنصة المسند</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            شروط الاستخدام وحقوق الملكية الفكرية وحماية المعطيات
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
            يضبط هذا الميثاق القواعد التنظيمية والأخلاقية والقانونية لاستخدام منصة «المسند»، وحقوق الملكية الفكرية للمنشورات التربوية، وحماية المعطيات الشخصية للمعلمين والمتفقدين والمؤسسات والتلاميذ طبقاً للتشريع الجاري به العمل بالجمهورية التونسية.
          </p>
        </div>

        {/* Section 1: Intellectual Property Notice */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                1. إشعار حقوق الملكية الفكرية وحقوق المؤلف
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                حماية الإنتاج البيداغوجي للسادة المعلمين والمتفقدين والمؤسسات التربوية
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • تظل كافة الوثائق المنشورة على منصة «المسند» (من دروس، جذاذات بيداغوجية، تمارين تطبيقية، فروض تقييمية، امتحانات، ووثائق إدارية) <strong>ملكاً فكرياً خالصاً لأصحابها من المعلمين والمتفقدين والمؤسسات التربوية الناشرين لها</strong>.
            </p>
            <p>
              • تُتاح هذه الموارد على المنصة <strong>مجاناً ولغايات تربوية وبيداغوجية وتعليمية غير تجارية حصراً</strong> لفائدة الإطار التربوي والتلاميذ والأولياء.
            </p>
            <p>
              • يُمنع منعاً باتاً استغلال أي ملف أو جذاذة أو امتحان منشور على منصة «المسند» لإعادة بيعه أو تضمينه في مطبوعات أو كتب موازية ذات صبغة تجارية دون ترخيص خطي مسبق من صاحبه الأصلي، وذلك طبقاً لأحكام التشريع التونسي المتعلق بحقوق المؤلف والحقوق المجاورة.
            </p>
          </div>
        </section>

        {/* Section 2: Disclaimer of Independence */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                2. إخلاء المسؤولية والصفة المستقلة للمنصة
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مبادرة تربوية مستقلة متوافقة مع البرامج والمناهج الرسمية التونسية
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • منصة <strong>«المسند»</strong> هي مبادرة وفضاء تربوي رقمي مستقل يهدف إلى تيسير التبادل البيداغوجي وتوثيق الممارسات التربوية الفضلى بين المؤسسات التعليمية، المتفقدين، المعلمين، والتلاميذ.
            </p>
            <p>
              • تستند تقسيمات المستويات الدراسية (من السنة الأولى إلى السنة السادسة ابتدائي)، المواد التعليمية، والثلاثيات المدرسية في المنصة إلى <strong>البرامج والمناهج الرسمية المعتمدة في التعليم الابتدائي بالجمهورية التونسية</strong>، دون أن تدّعي المنصة تمثيل وزارة التربية بصفة إدارية رسمية.
            </p>
            <p>
              • شارة <strong>«معتمد بيداغوجياً»</strong> داخل المنصة تعبّر عن مراجعة وتزكية علمية وبيداغوجية من قِبل المتفقدين التربويين الموثقين داخل مجتمع المنصة لرفع جودة المحتوى المتاح للمعلمين والتلاميذ.
            </p>
          </div>
        </section>

        {/* Section 3: Publishing Charter & Takedown Policy */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Flag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                3. ميثاق النشر وآلية الإبلاغ السريع وحذف المحتوى المخالف
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ضوابط النشر التربوي وحماية الحقوق الفكرية
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • يلتزم كل ناشر على منصة «المسند» برفع محتوى تربوي، بيداغوجي، أو إداري هادف يحترم القيم التربوية وأخلاقيات المهنة، ويخلو من أي مساس بالأشخاص أو المؤسسات.
            </p>
            <p>
              • عند تعديل ملف سبق اعتماده بيداغوجياً، يقوم النظام تلقائياً بإلغاء شارة الاعتماد لحين إعادة مراجعته من طرف المتفقد التربوي ضماناً للمصداقية العلمية.
            </p>
            <p>
              • <strong>آلية الإبلاغ والحذف الفوري:</strong> توفّر المنصة زر <strong>«إبلاغ»</strong> مباشر على كل منشور وحساب؛ وفي حال ثبوت نشر أي وثيقة تنتهك حقوق الملكية الفكرية أو تخالف ميثاق النشر، يتولى المشرف العام أو المسؤول الإداري حذف المنشور فوراً واتخاذ الإجراءات اللازمة إزاء الحساب المخالف.
            </p>
          </div>
        </section>

        {/* Section 4: Personal Data Protection (Tunisia Context) */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                4. حماية المعطيات الشخصية والخصوصية
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                سرية الحسابات وأمن بيانات الأعضاء طبقاً للتشريع التونسي
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              • تحترم منصة «المسند» خصوصية كافة مستخدميها وتلتزم بحماية المعطيات الشخصية طبقاً للتشريع التونسي المتعلق بحماية المعطيات الشخصية.
            </p>
            <p>
              • تُستخدم البيانات المدخلة عند التسجيل (الاسم، البريد الإلكتروني، المؤسسة، والمستوى الدراسي) حصرياً لتشغيل الحساب وتخصيص الفضاء التربوي وتوثيق الهوية، ولا تتم مشاركتها أو بيعها لأي طرف ثالث تحت أي ظرف.
            </p>
            <p>
              • يحق لكل عضو في أي وقت تعديل بياناته الشخصية، تفعيل «وضع الشبح» لإخفاء حالة اتصاله، أو حذف حسابه نهائياً من إعدادات الملف الشخصي.
            </p>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
              لأي استفسار قانوني أو تبليغ عن حقوق ملكية فكرية، يرجى التواصل المباشر مع الإدارة عبر مركز الدعم الفني.
            </span>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/support"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5 transition"
            >
              <Headphones className="w-4 h-4" />
              <span>مركز الدعم الفني</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold inline-flex items-center gap-1.5 transition"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
