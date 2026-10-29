"use client";

/**
 * Technical Support & Customer Service Center — Al-Musnad (المسند) v13.0
 *
 * Route: /support
 * Implements:
 * 1. Two Role-Dedicated WhatsApp Direct Support Channels (معلمين وتلاميذ / مؤسسات ومتفقدين):
 *    - خط المعلمين والتلاميذ: 27764985 (https://wa.me/21627764985)
 *    - خط المؤسسات التربوية والمتفقدين: 76907101 (https://wa.me/21676907101)
 * 2. One-Click Quick Support Topic Cards (فك القفل بعد 6 محاولات، توثيق الهوية، استفسارات، مقترحات).
 * 3. Direct Support Ticket Submission Form.
 * 4. Live Ticket History & Official Replies Tracker.
 * 5. Instant Self-Service Help & Troubleshooting Guide.
 */

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  Headphones,
  Send,
  CheckCircle2,
  MessageSquare,
  Loader2,
  Mail,
  User as UserIcon,
  HelpCircle,
  BadgeCheck,
  Unlock,
  FileWarning,
  Sparkles,
  ChevronDown,
  PhoneCall,
  Building2,
  ExternalLink,
} from "lucide-react";
import {
  submitSupportTicketAction,
  getMySupportTicketsAction,
} from "@/actions/report-support.actions";

const QUICK_SUPPORT_CARDS = [
  {
    id: "unlock",
    category: "TECHNICAL",
    title: "🔓 طلب فك قفل الحساب (6 محاولات كلمة مرور)",
    desc: "إذا قُفل حسابك بعد 6 محاولات خاطئة لكلمة المرور، اضغط هنا لمراسلة المشرف أو المسؤول لفك القفل.",
    defaultSubject: "طلب فك قفل حسابي بعد استنفاد محاولات كلمة المرور",
    icon: Unlock,
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  },
  {
    id: "verify",
    category: "VERIFICATION",
    title: "🎖️ طلب توثيق الهوية والشارة الرسمية",
    desc: "للمعلمين والمؤسسات والمتفقدين الراغبين في التثبت من الهوية والحصول على كود التوثيق الرسمي.",
    defaultSubject: "طلب التثبت من الهوية والحصول على كود التوثيق الرسمي",
    icon: BadgeCheck,
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  {
    id: "upload-help",
    category: "TECHNICAL",
    title: "📄 مساعدة في رفع أو تحويل ملفات Word/PDF",
    desc: "استفسار حول مراجعة ملفات وورد أو الصور وتحويلها إلى PDF أو تصنيفها داخل المواد.",
    defaultSubject: "استفسار بخصوص رفع وتحويل ملف تربوي",
    icon: FileWarning,
    badgeClass: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800",
  },
  {
    id: "general",
    category: "CUSTOMER_SERVICE",
    title: "💬 اقتراح تطوير أو استفسار عام",
    desc: "تواصل مباشر مع إدارة منصة المسند لتقديم مقترحات التحسين أو الاستفسارات التربوية.",
    defaultSubject: "مقترح / استفسار عام لإدارة منصة المسند",
    icon: Sparkles,
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
];

const SUPPORT_INSTANT_ANSWERS = [
  {
    q: "كيف أستعيد الدخول إذا تم قفل حسابي بعد 6 محاولات كلمة مرور؟",
    a: "اختر بطاقة «طلب فك قفل الحساب» أعلاه واكتب بريدك الإلكتروني أو معرفك @username، وسيقوم المشرف العام أو المسؤول الإداري بفك غلق حسابك وتصفير العداد فوراً من لوحة التحكم.",
  },
  {
    q: "أين أدخل كود التوثيق السري بعد استلامه من المشرف العام؟",
    a: "انتقل إلى «ملفي الشخصي» ثم افتح تبويب «التوثيق»، وأدخل الكود (مثل VERF-XXXX أو INSP-XXXX) لتفعيل شارة التوثيق الرسمية فوراً.",
  },
  {
    q: "لماذا يظهر ملفي بصيغة Word أو صورة في حالة مراجعة؟",
    a: "حفاظاً على جودة العرض لجميع المستخدمين، يتم استلام ملفات Word والصور ومراجعتها من قِبل المتفقد أو المشرف لتحويلها إلى صيغة PDF موحدة ومعتمدة.",
  },
];

export default function SupportAndCustomerServicePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [category, setCategory] = useState("TECHNICAL");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [openHelpIdx, setOpenHelpIdx] = useState<number | null>(0);

  useEffect(() => {
    async function loadUserAndTickets() {
      try {
        const [meRes, tickets] = await Promise.all([
          fetch("/api/auth/me").catch(() => null),
          getMySupportTicketsAction().catch(() => []),
        ]);
        if (meRes && meRes.ok) {
          const json = await meRes.json();
          if (json.success && json.data) {
            setName(json.data.name || "");
            setEmail(json.data.email || "");
            setUserRole(json.data.role || null);
          }
        }
        setMyTickets(tickets);
      } catch {
        // ignore
      } finally {
        setLoadingTickets(false);
      }
    }
    loadUserAndTickets();
  }, []);

  const handleSelectQuickCard = (card: typeof QUICK_SUPPORT_CARDS[0]) => {
    setCategory(card.category);
    setSubject(card.defaultSubject);
    setSubmittedSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmittedSuccess(false);

    try {
      setSubmitting(true);
      const created = await submitSupportTicketAction({
        name,
        email,
        category,
        subject,
        message,
      });
      setSubmittedSuccess(true);
      setSubject("");
      setMessage("");
      setMyTickets((prev) => [created, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر إرسال التذكرة");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" dir="rtl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Headphones className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          مركز الدعم الفني وخدمة الأعضاء — المسند
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          تواصل معنا مباشرة عبر قنوات الواتساب الرسمية المخصصة أو أرسل تذكرة دعم مباشر لفريق الإشراف.
        </p>
      </div>

      {/* WhatsApp Direct Support Channels (الإصدار v14.0) */}
      {(() => {
        const isStaff = userRole === "ADMIN" || userRole === "MODERATOR";
        const isInstitutionOrInspector =
          userRole === "INSTITUTION" || userRole === "INSPECTOR";
        const showTeacherStudent = !isInstitutionOrInspector || isStaff;
        const showInstitution = isInstitutionOrInspector || isStaff;

        return (
          <section
            className={`grid gap-5 ${
              showTeacherStudent && showInstitution
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 max-w-2xl mx-auto w-full"
            }`}
          >
            {/* Channel 1: Teachers & Students (27764985) */}
            {showTeacherStudent && (
              <a
                href="https://wa.me/21627764985?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D9%85%D8%B3%D9%86%D8%AF%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D8%B9%D8%A8%D8%B1%20%D8%AE%D8%B7%20%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%86%20%D9%88%D8%A7%D9%84%D8%AA%D9%84%D8%A7%D9%85%D9%8A%D8%B0%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/20 p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition flex items-start gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 group-hover:scale-105 transition">
                  <PhoneCall className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700">
                      خط المعلمين والتلاميذ
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      واتساب فوري <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    الرقم العام للمعلمين والتلاميذ
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    للاستفسارات العامة، التوجيه البيداغوجي، المساعدة في رفع وتحميل المذكرات، ودعم التلاميذ.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-sm font-black text-emerald-700 dark:text-emerald-300" dir="ltr">
                    <span>+216 27 764 985</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      WhatsApp: 27764985
                    </span>
                  </div>
                </div>
              </a>
            )}

            {/* Channel 2: Institutions & Inspectors (46907101) */}
            {showInstitution && (
              <a
                href="https://wa.me/21646907101?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D9%85%D8%B3%D9%86%D8%AF%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D8%B9%D8%A8%D8%B1%20%D8%AE%D8%B7%20%D8%A7%D9%84%D9%85%D8%A4%D8%B3%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9%20%D9%88%D8%A7%D9%84%D9%85%D8%AA%D9%81%D9%82%D8%AF%D9%8A%D9%86%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border-2 border-indigo-300 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/20 p-6 shadow-sm hover:shadow-md hover:border-indigo-500 transition flex items-start gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition">
                  <Building2 className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700">
                      خط المؤسسات والمتفقدين
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                      واتساب فوري <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    الرقم المخصص للمؤسسات التربوية والمتفقدين
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    للتنسيق الإداري والمؤسساتي، توثيق اعتماد المتفقدين والمدارس، واستلام أكواد التوثيق.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-sm font-black text-indigo-700 dark:text-indigo-300" dir="ltr">
                    <span>+216 46 907 101</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      WhatsApp: 46907101
                    </span>
                  </div>
                </div>
              </a>
            )}
          </section>
        );
      })()}

      {/* Quick Service Selection Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_SUPPORT_CARDS.map((card) => {
          const Icon = card.icon;
          const isSelected = subject === card.defaultSubject;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleSelectQuickCard(card)}
              className={`text-right rounded-2xl border-2 p-4 transition cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-md"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400"
              }`}
            >
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold ${card.badgeClass}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>خدمة سريعة</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400">
                اختيار وتعبئة الطلب تلقائياً ←
              </span>
            </button>
          );
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Submit Ticket Form */}
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>إرسال رسالة أو تذكرة دعم مباشر للإدارة</span>
          </h2>

          {submittedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>تم إرسال تذكرتك بنجاح! سيتم مراجعتها والرد عليها من قِبل الإدارة في أقرب وقت.</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك الثلاثي أو صفة الحساب"
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  البريد الإلكتروني للرد
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  تصنيف الطلب
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TECHNICAL">مشكلة تقنية / فك قفل الحساب</option>
                  <option value="VERIFICATION">طلب توثيق رسمي أو كود متفقد</option>
                  <option value="INAPPROPRIATE_CONTENT">إبلاغ عن محتوى أو انتهاك حقوق</option>
                  <option value="CUSTOMER_SERVICE">استفسار عام أو اقتراح تطوير</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  موضوع الطلب
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="عنوان مختصر للطلب"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                تفاصيل الرسالة أو المشكلة
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل طلبك بدقة، مع ذكر المعرف @username أو رقم الهاتف إن لزم..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري إرسال التذكرة...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>إرسال التذكرة إلى إدارة المنصة</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* Live Ticket History & Instant FAQ Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live User Tickets Tracker */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>سجل تذاكري وردود الإدارة</span>
            </h2>

            {loadingTickets ? (
              <div className="py-6 flex items-center justify-center text-xs text-slate-400 gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري تحميل التذاكر...</span>
              </div>
            ) : myTickets.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
                لا توجد تذاكر سابقة مسجلة بهذا البريد الإلكتروني.
              </p>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {myTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white truncate">
                        {t.subject}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          t.status === "RESOLVED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : t.status === "IN_PROGRESS"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        }`}
                      >
                        {t.status === "RESOLVED"
                          ? "تم الحل ✓"
                          : t.status === "IN_PROGRESS"
                          ? "قيد المعالجة"
                          : "جديدة"}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2">
                      {t.message}
                    </p>

                    {t.response && (
                      <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-blue-800 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/40 p-2 rounded-xl">
                        <strong className="block mb-0.5">رد الإدارة:</strong>
                        {t.response}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick FAQ Accordion */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>إجابات فورية لأكثر الاستفسارات تكراراً</span>
            </h2>

            <div className="space-y-2">
              {SUPPORT_INSTANT_ANSWERS.map((item, idx) => {
                const isOpen = openHelpIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenHelpIdx(isOpen ? null : idx)}
                      className="w-full p-3 text-right text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3 pt-0 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
