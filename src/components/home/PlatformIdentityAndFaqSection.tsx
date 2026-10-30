"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Target,
  Layers,
  Lock,
  Users,
  Compass,
  FileText,
} from "lucide-react";

const SUBSCRIBER_ROLES_GUIDE = [
  {
    role: "INSTITUTION",
    badge: "الركن المؤسساتي",
    title: "1. حساب المؤسسات التربوية (المدارس والمعاهد)",
    subtitle: "فضاء رسمي للتنسيق المؤسساتي وتبادل النماذج التربوية والإدارية",
    icon: Building2,
    accentBg: "bg-indigo-600",
    borderClass: "border-indigo-200 dark:border-indigo-900/60",
    badgeClass: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
    features: [
      "قسم حصري في أعلى الواجهة («ملتقى نشرات المؤسسات») للتفاعل المباشر بين المؤسسات التربوية ونشر المحتوى الهادف.",
      "إمكانية نشر وثائق ومبادرات موجهة حصرياً للمؤسسات الزميلة أو عامة لمعلمي وتلاميذ المؤسسة.",
      "الحصول على شارة «مؤسسة تربوية موثقة رسمياً» بعد التثبت من الهوية مع المشرف العام.",
      "صفحة عامة رسمية للمؤسسة تعرض كافة إصداراتها، عدد المتابعين، وإحصائيات التحميل.",
      "الوصول الكامل إلى قسم الإدارة والمعاملات الإدارية والنماذج الرسمية.",
    ],
  },
  {
    role: "INSPECTOR",
    badge: "الركن الرقابي والبيداغوجي",
    title: "2. حساب المتفقدين التربويين",
    subtitle: "إشراف علمي وبيداغوجي مباشر واعتماد رسمي للنشرات التربوية",
    icon: Award,
    accentBg: "bg-amber-500",
    borderClass: "border-amber-200 dark:border-amber-900/60",
    badgeClass: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
    features: [
      "قسم علوي مخصص («منشورات المتفقدين فقط») لتبادل التوجيهات وشبكات التقييم والتفاعل البيداغوجي بين المتفقدين.",
      "لوحة تحكم رقابية حصرية (/inspector/dashboard) لمراجعة المنشورات ومنح «شارة الاعتماد البيداغوجي ★».",
      "إضافة توجيهات بيداغوجية رسمية تُثبّت في صدارة التعليقات، أو إرسال ملاحظات توجيهية خاصة للناشر وحده.",
      "تحويل الملفات المرفوعة بصيغة Word أو صور إلى ملفات PDF معتمدة وجاهزة للتحميل.",
      "قناة إبلاغ رقابي عاجل تصل مباشرة إلى المشرف العام في قمة الهرم.",
    ],
  },
  {
    role: "TEACHER",
    badge: "الركن التعليمي والإبداعي",
    title: "3. حساب المعلمين والأساتذة",
    subtitle: "بيئة مهنية متكاملة للنشر التربوي، الجذاذات، والوثائق الإدارية",
    icon: BookOpenCheck,
    accentBg: "bg-blue-600",
    borderClass: "border-blue-200 dark:border-blue-900/60",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    features: [
      "قسم علوي مخصص في واجهة المعلم («مستودع منشورات المعلمين») يجمع الجذاذات، التوزيعات، وإصلاحات الامتحانات.",
      "ميزة حجب الملفات عن التلاميذ (للمعلمين فقط) عند نشر إصلاح الفروض أو المذكرات البيداغوجية الخاصة بالمعلم.",
      "نشر الملفات في الأقسام الستة لكل مادة (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى) بصيغ PDF أو Word أو صور.",
      "الوصول الكامل إلى «قسم الإدارة والمعاملات الإدارية» (جداول الأوقات، المذكرات، تقارير الترسيم، والمطالب).",
      "بناء ملف ناشر عام موثق مع إحصائيات التحميل والتقييمات والتفاعل عبر الإشارة @username.",
    ],
  },
  {
    role: "STUDENT",
    badge: "ركن التفوق والمراجعة",
    title: "4. حساب التلاميذ",
    subtitle: "واجهة دراسية ذكية ومبسطة خالية من التعقيدات الإدارية",
    icon: GraduationCap,
    accentBg: "bg-emerald-600",
    borderClass: "border-emerald-200 dark:border-emerald-900/60",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    features: [
      "فضاء مراجعة ذكي مخصص لمستوى التلميذ الدراسي في أعلى الصفحة يعرض الدروس والتمارين والامتحانات والأنشطة التفاعلية.",
      "واجهة نقية ومبسطة: يتم إخفاء «قسم الإدارة والمعاملات الإدارية» والملفات الخاصة بالمعلمين تلقائياً لتركيز التلميذ على دراسته.",
      "معاينة وتحميل فوري للملفات المعتمدة بيداغوجياً من قِبل المتفقدين التربويين.",
      "إمكانية حفظ الدروس والامتحانات في «قائمة المفضلة» للرجوع إليها سريعاً أيام المراجعة والامتحانات.",
      "متابعة المعلمين والمؤسسات التربوية المفضلة والتفاعل في النقاشات التعليمية.",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "كيف تضمن منصة «المسند» جودة وصحة الملفات التربوية المنشورة؟",
    a: "تعتمد المنصة نظام إشراف ثلاثي المستويات (المتفقد التربوي، المسؤول الإداري، والمشرف العام). يقوم المتفقدون التربويون المعتمدون بمراجعة النشرات ومنحها «شارة الاعتماد البيداغوجي ★» مع كتابة توجيهات رسمية، كما يتم تحويل ملفات Word والصور إلى ملفات PDF منسقة بعد مراجعتها.",
  },
  {
    q: "كيف يتم تنظيم الملفات داخل مستودع المستويات والمواد؟",
    a: "عند الدخول إلى «مستودع المواد والمستويات» تختار أولاً المستوى الدراسي المعتمد (من السنة الأولى إلى السادسة ابتدائي)، وداخله تجد مستودع المواد الدراسية مميزاً برموز بصرية لكل مادة، وداخل كل مادة تتوزع الملفات بدقة في 6 أقسام: (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، وأخرى).",
  },
  {
    q: "هل يستطيع التلميذ رؤية إصلاح الامتحانات أو قسم الإدارة الخاص بالمعلم؟",
    a: "لا؛ عندما يختار المعلم جمهور النشر «للمعلمين فقط»، يقوم النظام بحجب الملف برمجياً عن جميع حسابات التلاميذ والزوار. كما أن «قسم الإدارة والمعاملات الإدارية» منزوع تماماً من واجهة التلميذ ومقتصر على المعلمين والمتفقدين والمؤسسات.",
  },
  {
    q: "كيف أحصل على شارة التوثيق الرسمية على حسابي؟",
    a: "يمكنك التسجيل في الموقع بشكل عادي، ثم الانتقال إلى تبويب «التوثيق» في ملفك الشخصي وإرسال طلب توثيق الهوية، أو التواصل مع المشرف العام عبر قسم الدعم الفني ليمنحك كود التوثيق السري (VERF-... أو INSP-...) الذي يفعّل الشارة الرسمية فوراً.",
  },
  {
    q: "ما هي خاصية «وضع الشبح» وحالة الاتصال في المنصة؟",
    a: "يتيح لك النظام من القائمة المنسدلة لاسمك أو من ملفك الشخصي تحديد حالتك: «متصل» (نقطة خضراء أسفل صورتك)، أو «غير متصل» (نقطة رمادية مع عرض مدة آخر ظهور)، أو «وضع الشبح 👻» الذي يمكّنك من تصفح الموقع بالكامل دون أن يظهر للآخرين أنك متصل.",
  },
  {
    q: "ماذا يحدث إذا نسيت كلمة المرور أو أخطأت في كتابتها 6 مرات؟",
    a: "لحماية حسابات الأعضاء من محاولات التخمين، ينبهك النظام عند كل محاولة خاطئة بعدد المحاولات المتبقية من أصل 6 محاولات. وفي حال استنفاد 6 محاولات خاطئة يُقفل الحساب مؤقتاً، ويمكنك مراسلة المشرف العام أو المسؤول الإداري عبر قسم الدعم الفني لفك غلق الحساب بضغطة زر.",
  },
];

type LearnMoreTab = "ALL" | "ABOUT" | "ROLES" | "FAQ";

export default function PlatformIdentityAndFaqSection() {
  const [activeTab, setActiveTab] = useState<LearnMoreTab>("ALL");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div
      id="learn-more"
      dir="rtl"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24"
    >
      <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 p-6 sm:p-8 text-center shadow-sm space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 px-4 py-1 text-xs font-black text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
          <Compass className="h-3.5 w-3.5" />
          <span>الدليل الشامل لمنصة المسند • اعرف المزيد</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          اعرف المزيد عن منصة «المسند» التربوية
        </h2>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          فضاء تعليمي موحد يجمع رسالة المنصة، دليل مزايا واختصاصات كل فئة مستخدم، وإجابات الأسئلة الشائعة في مكان واحد.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "ALL"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            الكل المدمج
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ABOUT")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "ABOUT"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            من نحن والرسالة
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ROLES")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "ROLES"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            مزايا الفئات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("FAQ")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "FAQ"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            الأسئلة الشائعة
          </button>
        </div>
      </div>

      {(activeTab === "ALL" || activeTab === "ABOUT") && (
        <section
          id="about-us"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-24"
        >
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800">
              <Sparkles className="h-3.5 w-3.5" />
              <span>من نحن • الهوية والرسالة التربوية</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              هوية منصة «المسند» وما تؤدي إليه في المنظومة التربوية
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>«المسند»</strong> هي منصة تربوية وبيداغوجية رقمية تشاركية صُممت لتكون الحاضنة المرجعية الموثوقة للعمل التربوي والإداري. تجمع المنصة بين <strong>المؤسسات التربوية، المتفقدين، المعلمين، والتلاميذ</strong> في بيئة منظمة تحفظ الملكية الفكرية للناشر وتضمن للتلميذ والمعلم الوصول السريع إلى المعلومة المعتمدة.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                توحيد وتوثيق المرجع التربوي
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                إنهاء تشتت الملفات التعليمية عبر تصنيف كل وثيقة بدقة حسب السنة الدراسية، المادة، ونوع القسم (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                الاعتماد البيداغوجي الرسمي
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                تمكين المتفقدين التربويين من المصادقة العلمية على النشرات ومنحها شارة الاعتماد البيداغوجي وتقديم التوجيهات المباشرة للناشرين.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                تكامل الأدوار وتخصيص الواجهة
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                تخصيص تجربة كل عضو بحسب صفته؛ فالمؤسسات تتفاعل في ملتقاها، والمتفقدون في فضائهم، والمعلمون في مستودعهم المهني، والتلاميذ في مكتبتهم الدراسية.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                حماية الخصوصية وأمان متقدم
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                منظومة محمية بنظام أمان متقدم يحفظ خصوصية المذكرات والامتحانات الخاصة بالمعلمين ويحمي الحسابات من الاختراق.
              </p>
            </div>
          </div>
        </section>
      )}

      {(activeTab === "ALL" || activeTab === "ROLES") && (
        <section id="roles-guide" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Lock className="h-3.5 w-3.5" />
              <span>دليل فئات المشتركين ومزايا العضوية</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ما هي الخصائص والميزات التي ستحصل عليها عند التسجيل؟
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              تعرّف بالتفصيل على الواجهة المخصصة والصلاحيات الحصرية الممنوحة لكل فئة من الفئات في منصة «المسند»:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SUBSCRIBER_ROLES_GUIDE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  className={`flex flex-col justify-between rounded-3xl border-2 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md dark:bg-slate-900 ${item.borderClass}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md ${item.accentBg}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                      {item.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/register?role=${item.role}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
                    >
                      <span>الانضمام بهذا الحساب الآن</span>
                      <span>←</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(activeTab === "ALL" || activeTab === "FAQ") && (
        <section
          id="faq-section"
          className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-24 space-y-6"
        >
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>إجابات واضحة • الأسئلة الشائعة</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              الأسئلة الأكثر تكراراً حول منصة «المسند»
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              كل ما تحتاج لمعرفته حول طريقة تنظيم المواد، آليات التوثيق، وصلاحيات فئات الحسابات.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40 transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-right transition hover:bg-slate-100/60 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200/60 px-4 sm:px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
