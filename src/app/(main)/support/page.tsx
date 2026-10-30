"use client";

/**
 * Technical Support & Customer Service Center — Al-Musnad (المسند) v12.0
 *
 * Route: /support
 * Includes:
 * 1. One-Click Quick Support Topic Cards (توثيق الحساب، فك قفل الحساب بعد 6 محاولات، مشكلة تقنية، استفسار عام)
 *    that automatically configure and pre-fill the ticket category & subject.
 * 2. Direct Support Ticket Submission Form.
 * 3. Live Ticket History & Official Replies Tracker.
 * 4. Instant Self-Service Help & Troubleshooting Guide.
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
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { WHATSAPP_SUPPORT_CHANNELS } from "@/config/constants";
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
          }
        }
        setMyTickets(tickets);
      } finally {
        setLoadingTickets(false);
      }
    }
    loadUserAndTickets();
  }, []);

  const handleSelectQuickCard = (card: (typeof QUICK_SUPPORT_CARDS)[number]) => {
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
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Headphones className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          مركز الدعم الفني وخدمة الأعضاء — المسند
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          اختر نوع الخدمة السريعة أدناه أو أرسل تذكرة مباشرة لفريق الإشراف والمسؤولين، وتابع الردود الفورية على طلباتك.
        </p>
      </div>

      {/* Quick Service Selection Cards (خيارات الدعم السريعة بخلاف إرسال رسالة عادية) */}
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
              <span>
                تم استلام تذكرتك بنجاح! سيقوم المشرف العام أو المسؤول الإداري بالرد عليك في أقرب وقت.
              </span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل الاسم الكامل"
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل البريد الإلكتروني"
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                نوع الطلب / القسم المختص *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
              >
                <option value="TECHNICAL">دعم فني وتقني / فك قفل الحساب</option>
                <option value="VERIFICATION">توثيق الحسابات والشارات الرسمية</option>
                <option value="SUBSCRIPTIONS">الاشتراكات والباقات</option>
                <option value="CUSTOMER_SERVICE">خدمة الأعضاء واستفسارات عامة</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                عنوان التذكرة *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="أدخل عنوان الطلب باختصار"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                تفاصيل الرسالة *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اشرح استفسارك أو المشكلة التقنية بالتفصيل..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>إرسال التذكرة إلى فريق الدعم</span>
            </button>
          </form>
        </section>

        {/* My Previous Tickets & Self-Service Instant Answers */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>تذاكري السابقة والردود المباشرة</span>
            </h3>

            {loadingTickets ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
            ) : myTickets.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">
                لا توجد تذاكر دعم سابقة مسجلة على حسابك.
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {myTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {t.subject}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === "ANSWERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {t.status === "ANSWERED" ? "تم الرد ✓" : "قيد المعالجة"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {t.message}
                    </p>
                    {t.adminReply && (
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 mt-2">
                        <strong>رد الإدارة:</strong> {t.adminReply}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instant Self-Service Answers */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              💡 حلول وإجابات فورية سريعة
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {SUPPORT_INSTANT_ANSWERS.map((item, idx) => {
                const isOpen = openHelpIdx === idx;
                return (
                  <div key={idx} className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setOpenHelpIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-2 text-right text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 shrink-0 text-blue-600 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <Link
                href="/#faq-section"
                className="text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
              >
                عرض قسم الأسئلة الشائعة الكامل ←
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
