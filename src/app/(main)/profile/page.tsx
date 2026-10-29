"use client";

/**
 * Member Workspace & Profile Page — Al-Musnad (المسند) v4.0
 *
 * Includes:
 * 1. نشراتي (uploads)
 * 2. المفضلة (favorites)
 * 3. الناشرون المفضلون (favorite_publishers)
 * 4. التحميلات (downloads)
 * 5. تعديل الملف الشخصي — بموافقة المشرف (edit)
 * 6. الاشتراكات (subscriptions)
 * 7. التوثيق (verification) <-- Directly right after Subscriptions!
 *    Allows Teachers, Institutions, and Inspectors to request verification & enter their Admin code.
 * 8. الإعدادات وحذف الحساب (settings) <-- Includes Publisher Account Deletion (`deleteMyAccountAction`).
 */

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  School,
  Upload,
  Heart,
  Download,
  Trash2,
  Loader2,
  ExternalLink,
  UserCog,
  ShieldCheck,
  Key,
  Check,
  CreditCard,
  Settings,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import {
  updateProfileAction,
  updateSubscriptionPlanAction,
  deleteMyAccountAction,
} from "@/actions/profile.actions";
import {
  activateInspectorCodeAction,
  requestIdentityVerificationAction,
} from "@/actions/inspector.actions";
import { getMyFavoritePublishersAction } from "@/actions/publisher.actions";
import InspectorBadge from "@/components/ui/InspectorBadge";
import ArchivedSubscriptionsPlans from "@/components/profile/ArchivedSubscriptionsPlans";
import {
  UserAvatarWithPresence,
  UserPresenceBadge,
  type PresenceMode,
} from "@/components/ui/UserPresenceIndicator";
import { useAppPreferences, type Locale } from "@/context/AppPreferencesContext";
import type { User, WorksheetWithRelations, ApiResponse } from "@/types";

interface ProfileWithCounts extends User {
  _count: {
    worksheets: number;
    favorites: number;
    downloads: number;
  };
}

type TabType =
  | "uploads"
  | "favorites"
  | "favorite_publishers"
  | "downloads"
  | "edit"
  | "subscriptions"
  | "verification"
  | "settings";

const VALID_TABS: TabType[] = [
  "uploads",
  "favorites",
  "favorite_publishers",
  "downloads",
  "edit",
  "subscriptions",
  "verification",
  "settings",
];

function ProfileWorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTabParam = searchParams?.get("tab") as TabType | null;

  const { locale, setLocale, theme, toggleTheme } = useAppPreferences();

  const [profile, setProfile] = useState<ProfileWithCounts | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(
    initialTabParam && VALID_TABS.includes(initialTabParam)
      ? initialTabParam
      : "uploads"
  );

  useEffect(() => {
    if (initialTabParam && VALID_TABS.includes(initialTabParam)) {
      setActiveTab(initialTabParam);
    }
  }, [initialTabParam]);

  const [items, setItems] = useState<WorksheetWithRelations[]>([]);
  const [favPublishers, setFavPublishers] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  // Edit Profile States
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editSchool, setEditSchool] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // Verification Tab States
  const [verifCode, setVerifCode] = useState("");
  const [verifLoading, setVerifLoading] = useState(false);
  const [verifMsg, setVerifMsg] = useState<string | null>(null);
  const [verifErr, setVerifErr] = useState<string | null>(null);

  // Delete Account States
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [planLoading, setPlanLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const json: ApiResponse<ProfileWithCounts> = await res.json();
        if (json.success) {
          setProfile(json.data);
          const pending = json.data.pendingProfileData;
          setEditName(pending?.name || json.data.name || "");
          setEditUsername(pending?.username || json.data.username || "");
          setEditSchool(
            pending?.school !== undefined
              ? pending.school || ""
              : json.data.school || ""
          );
          setEditBio(
            pending?.bio !== undefined
              ? pending.bio || ""
              : json.data.bio || ""
          );
        }
      } finally {
        setLoadingProfile(false);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    async function loadTabItems() {
      if (
        activeTab === "edit" ||
        activeTab === "subscriptions" ||
        activeTab === "verification" ||
        activeTab === "settings"
      ) {
        return;
      }

      if (activeTab === "favorite_publishers") {
        try {
          setLoadingItems(true);
          const pubs = await getMyFavoritePublishersAction();
          setFavPublishers(pubs);
        } finally {
          setLoadingItems(false);
        }
        return;
      }

      try {
        setLoadingItems(true);
        const endpoint =
          activeTab === "uploads"
            ? "/api/me/uploads"
            : activeTab === "favorites"
            ? "/api/me/favorites"
            : "/api/me/downloads";

        const res = await fetch(endpoint);
        const json: ApiResponse<WorksheetWithRelations[]> = await res.json();
        if (json.success) {
          setItems(json.data);
        }
      } finally {
        setLoadingItems(false);
      }
    }
    loadTabItems();
  }, [activeTab]);

  const handleArchiveWorksheet = async (id: string) => {
    if (!confirm("هل أنت متأكد من أرشفة وإخفاء هذه النشرة؟")) return;
    const res = await fetch(`/api/worksheets/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSubmitProfileEditRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditMessage(null);

    if (!editName.trim()) {
      setEditError("الاسم مطلوب ولا يمكن تركه فارغاً");
      return;
    }

    try {
      setEditLoading(true);
      const res = await updateProfileAction({
        name: editName.trim(),
        username: editUsername.trim() || undefined,
        school: editSchool.trim() || undefined,
        bio: editBio.trim() || undefined,
      });

      if (res.pendingApproval) {
        setEditMessage(
          "تم إرسال طلب تعديل ملفك الشخصي بنجاح! سيظهر التعديل للعموم فور موافقة المشرف العام عليه."
        );
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                profileEditStatus: "PENDING",
                pendingProfileData: {
                  name: editName.trim(),
                  username: editUsername.trim(),
                  school: editSchool.trim(),
                  bio: editBio.trim(),
                },
              }
            : null
        );
      } else {
        setEditMessage("تم تحديث بيانات الملف الشخصي بنجاح.");
      }
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "فشل إرسال طلب تحديث البيانات"
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleRequestVerificationCode = async () => {
    try {
      setVerifLoading(true);
      setVerifErr(null);
      await requestIdentityVerificationAction();
      setProfile((prev) => (prev ? { ...prev, inspectorPending: true } : null));
      setVerifMsg(
        "تم إرسال طلب التوثيق إلى المشرف العام. عند التحقق من هويتك سيصدر لك المشرف كود التوثيق الخاص بحسابك."
      );
    } catch (err) {
      setVerifErr(err instanceof Error ? err.message : "تعذر إرسال الطلب");
    } finally {
      setVerifLoading(false);
    }
  };

  const handleActivateVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifErr(null);
    setVerifMsg(null);

    try {
      setVerifLoading(true);
      const res = await activateInspectorCodeAction(verifCode);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              isVerified: true,
              inspectorPending: false,
              role: (res.role as any) || prev.role,
            }
          : null
      );
      setVerifMsg("🎉 تم تأكيد هويتك وتفعيل شارة التوثيق الرسمية على حسابك بنجاح!");
      setVerifCode("");
    } catch (err) {
      setVerifErr(err instanceof Error ? err.message : "كود التوثيق غير صحيح");
    } finally {
      setVerifLoading(false);
    }
  };

  const handleDeleteMyAccount = async () => {
    const confirmed = confirm(
      "تحذير نهائي: هل أنت متأكد من حذف حسابك وجميع نشراتك نهائياً من منصة المسند؟ لا يمكن التراجع عن هذا الإجراء."
    );
    if (!confirmed) return;

    try {
      setDeletingAccount(true);
      await deleteMyAccountAction();
      router.push("/");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر حذف الحساب");
      setDeletingAccount(false);
    }
  };

  const handleSelectPlan = async (planCode: string) => {
    try {
      setPlanLoading(planCode);
      await updateSubscriptionPlanAction(planCode);
      setProfile((prev) =>
        prev ? { ...prev, subscriptionPlan: planCode } : null
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر تحديث الاشتراك");
    } finally {
      setPlanLoading(null);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <p className="text-slate-700 font-bold mb-4">
          يرجى تسجيل الدخول لعرض مساحتك الشخصية في المسند
        </p>
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  const isAccountVerified =
    Boolean(profile.isVerified) || profile.role === "INSPECTOR";

  return (
    <main className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
      {/* Header Profile Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <UserAvatarWithPresence
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            presenceStatus={profile.presenceStatus}
            lastSeenAt={profile.lastSeenAt}
            isSelf={true}
            size="lg"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h1>
              {profile.username && (
                <span
                  dir="ltr"
                  className="rounded-lg bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300"
                >
                  @{profile.username}
                </span>
              )}
              {profile.role === "ADMIN" ||
              profile.role === "MODERATOR" ||
              profile.role === "INSPECTOR" ? (
                <Link
                  href={
                    profile.role === "ADMIN"
                      ? "/admin/dashboard"
                      : profile.role === "MODERATOR"
                      ? "/moderator/dashboard"
                      : "/inspector/dashboard"
                  }
                  className="inline-flex items-center transition hover:opacity-90"
                  title="الانتقال إلى لوحة التحكم الخاصة بك"
                >
                  <InspectorBadge
                    role={profile.role}
                    isVerified={profile.isVerified}
                    isBanned={profile.isBanned}
                    size="md"
                  />
                </Link>
              ) : (
                <InspectorBadge
                  role={profile.role}
                  isVerified={profile.isVerified}
                  isBanned={profile.isBanned}
                  size="md"
                />
              )}
              <Link
                href={`/publisher/${profile.id}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-blue-600 text-xs font-bold transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ملفي العام كناشر</span>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-slate-500">{profile.email}</p>
              <UserPresenceBadge
                presenceStatus={profile.presenceStatus}
                lastSeenAt={profile.lastSeenAt}
                isSelf={true}
              />
            </div>
            <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 p-1.5 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 px-1.5">
                حالة الظهور:
              </span>
              {(
                [
                  { mode: "ONLINE", label: "🟢 متصل" },
                  { mode: "OFFLINE", label: "⚪ غير متصل" },
                  { mode: "GHOST", label: "👻 وضع الشبح (تصفح خفي)" },
                ] as { mode: PresenceMode; label: string }[]
              ).map((opt) => {
                const active =
                  (profile.presenceStatus || "ONLINE") === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    type="button"
                    onClick={async () => {
                      const res = await fetch("/api/me/presence", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ presenceStatus: opt.mode }),
                      });
                      const json = await res.json();
                      if (json.success && json.data) {
                        setProfile((prev) =>
                          prev
                            ? {
                                ...prev,
                                presenceStatus: json.data.presenceStatus,
                                lastSeenAt: json.data.lastSeenAt,
                              }
                            : null
                        );
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {profile.school && (
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-1">
                <School className="w-3.5 h-3.5 text-blue-600" />
                <span>{profile.school}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 self-stretch sm:self-auto justify-around bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {profile._count?.worksheets ?? 0}
            </span>
            <span className="text-xs text-slate-500">نشراتي</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {profile.followersCount ?? 0}
            </span>
            <span className="text-xs text-slate-500">المتابعون</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {profile._count?.favorites ?? 0}
            </span>
            <span className="text-xs text-slate-500">المفضلة</span>
          </div>
        </div>
      </section>

      {profile.profileEditStatus === "PENDING" && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-amber-900 dark:text-amber-200 text-xs font-bold">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              لديك طلب تعديل بيانات شخصية قيد المراجعة حالياً بانتظار موافقة المشرف العام.
            </span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 mb-6 pb-2">
        <button
          onClick={() => setActiveTab("uploads")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "uploads"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>نشراتي</span>
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "favorites"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>النشرات المفضلة</span>
        </button>

        <button
          onClick={() => setActiveTab("favorite_publishers")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "favorite_publishers"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>الناشرون المفضلون</span>
        </button>

        <button
          onClick={() => setActiveTab("downloads")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "downloads"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>سجل التحميلات</span>
        </button>

        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "edit"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <UserCog className="w-4 h-4" />
          <span>تعديل الملف الشخصي</span>
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "subscriptions"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>الاشتراكات</span>
        </button>

        {/* قسم التوثيق مباشرة تحت/بجانب خانة الاشتراكات */}
        <button
          onClick={() => setActiveTab("verification")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "verification"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <BadgeCheck className="w-4 h-4" />
          <span>التوثيق</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "settings"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>الإعدادات</span>
        </button>
      </div>

      {/* TAB: VERIFICATION (قسم التوثيق للمؤسسات والمعلمين والمتفقدين) */}
      {activeTab === "verification" && (
        <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BadgeCheck className="w-6 h-6 text-blue-600" />
                <span>توثيق الهوية والشارة الرسمية في المسند</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                يُتاح لجميع المؤسسات التربوية، المعلمين، والمتفقدين توثيق هويتهم عبر كود سري يمنحه المشرف العام لإضافة شارة التوثيق الرسمية بجانب الاسم.
              </p>
            </div>
            <InspectorBadge
              role={profile.role}
              isVerified={profile.isVerified}
              isBanned={profile.isBanned}
              size="md"
            />
          </div>

          {isAccountVerified ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-200 space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-black text-base">
                حسابك موثق رسمياً في منصة المسند ✓
              </h3>
              <p className="text-xs">
                تظهر شارة التوثيق الرسمية بجانب اسمك في جميع نشراتك وفي ملفك العام كناشر.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {verifMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  {verifMsg}
                </div>
              )}

              {verifErr && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {verifErr}
                </div>
              )}

              {/* Step 1: Request Code from Admin */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    1. طلب كود توثيق الهوية من المشرف العام
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {profile.inspectorPending
                      ? "طلبك قيد المراجعة حالياً لدى المشرف العام."
                      : "أرسل إشعاراً للإدارة لمراجعة بياناتك وإصدار كود التوثيق."}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={Boolean(profile.inspectorPending) || verifLoading}
                  onClick={handleRequestVerificationCode}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white text-xs font-bold transition cursor-pointer shrink-0"
                >
                  {profile.inspectorPending
                    ? "تم إرسال الطلب ✓"
                    : "طلب كود التوثيق"}
                </button>
              </div>

              {/* Step 2: Enter Code */}
              <form
                onSubmit={handleActivateVerificationCode}
                className="space-y-4 pt-2"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    2. أدخل كود التوثيق السري الممنوح لك من المشرف *
                  </label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={verifCode}
                    onChange={(e) => setVerifCode(e.target.value.toUpperCase())}
                    placeholder="VERF-XXXX-XXXX / INSP-XXXX-XXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-mono text-base font-bold tracking-widest uppercase outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {verifLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Key className="w-4 h-4" />
                  )}
                  <span>تأكيد الكود وتفعيل شارة التوثيق</span>
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {/* TAB: EDIT PROFILE */}
      {activeTab === "edit" && (
        <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              طلب تعديل بيانات الملف الشخصي
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              تخضع تعديلات الاسم والمؤسسة والنبذة التعريفية لمراجعة وموافقة المشرف العام قبل نشرها للعموم.
            </p>
          </div>

          {editMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{editMessage}</span>
            </div>
          )}

          {editError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{editError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitProfileEditRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الاسم الكامل / اسم المؤسسة *
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="أدخل الاسم الكامل"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                اسم المستخدم (المعرف الشخصي للإشارة @username)
              </label>
              <div className="relative">
                <span className="text-slate-400 absolute start-3.5 top-2.5 font-mono text-sm font-bold">@</span>
                <input
                  type="text"
                  dir="ltr"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_.]/g, ""))}
                  placeholder="username"
                  className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                المؤسسة التربوية / المدرسة / الدائرة التفقدية
              </label>
              <input
                type="text"
                value={editSchool}
                onChange={(e) => setEditSchool(e.target.value)}
                placeholder="أدخل اسم المؤسسة أو المدرسة"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                النبذة التعريفية للناشر (تظهر للأعضاء في ملفك العام)
              </label>
              <textarea
                rows={4}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="اكتب نبذة عن تخصصك التربوي والمواد التي تنشر فيها..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={editLoading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer"
            >
              {editLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>إرسال التعديلات لموافقة المشرف</span>
            </button>
          </form>
        </section>
      )}

      {/* TAB: SUBSCRIPTIONS (Copied/Preserved & Marked Coming Soon / سيأتي قريباً) */}
      {activeTab === "subscriptions" && (
        <ArchivedSubscriptionsPlans
          currentPlan={profile.subscriptionPlan || "STANDARD"}
          planLoading={planLoading}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* TAB: SETTINGS & ACCOUNT DELETION */}
      {activeTab === "settings" && (
        <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            إعدادات الحساب والواجهة
          </h2>

          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                مظهر المنصة (الوضع النهاري / الليلي)
              </p>
              <p className="text-xs text-slate-500">
                اختر المظهر المريح للقراءة والعمل
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
            >
              {theme === "light"
                ? "تفعيل الوضع الليلي 🌙"
                : "تفعيل الوضع النهاري ☀️"}
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                لغة الواجهة
              </p>
              <p className="text-xs text-slate-500">
                العربية، الفرنسية، أو الإنجليزية
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["ar", "fr", "en"] as Locale[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    locale === l
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Delete Publisher Account Section */}
          <div className="p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900 space-y-3">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>حذف حساب الناشر نهائياً</span>
            </div>
            <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
              حذف حسابك سيؤدي إلى إزالة ملفك الشخصي وجميع النشرات المرتبطة به نهائياً من منصة المسند.
            </p>
            <button
              type="button"
              disabled={deletingAccount}
              onClick={handleDeleteMyAccount}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer"
            >
              {deletingAccount ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>حذف حسابي نهائياً</span>
            </button>
          </div>
        </section>
      )}

      {/* TAB: FAVORITE PUBLISHERS */}
      {activeTab === "favorite_publishers" && (
        <section>
          {loadingItems ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            </div>
          ) : favPublishers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-slate-600 font-medium mb-4">
                لم تقم بإضافة أي ناشر إلى قائمتك المفضلة بعد.
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
              >
                استكشف النشرات والناشرين
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {favPublishers.map((pub) => (
                <Link
                  key={pub.id}
                  href={`/publisher/${pub.id}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-500 transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">
                      {pub.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {pub.name}
                        </p>
                        <InspectorBadge
                          role={pub.role}
                          isVerified={pub.isVerified}
                          isBanned={pub.isBanned}
                          size="sm"
                        />
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {pub.school || "ناشر في منصة المسند"}
                      </p>
                      <p className="text-[11px] text-blue-600 font-semibold mt-1">
                        {pub._count?.worksheets ?? 0} نشرة •{" "}
                        {pub.followersCount ?? 0} متابع
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TABS: UPLOADS / FAVORITES / DOWNLOADS */}
      {(activeTab === "uploads" ||
        activeTab === "favorites" ||
        activeTab === "downloads") && (
        <section>
          {loadingItems ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-slate-600 font-medium mb-4">
                لا توجد نشرات في هذا القسم حتى الآن.
              </p>
              <Link
                href={activeTab === "uploads" ? "/upload" : "/browse"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
              >
                {activeTab === "uploads"
                  ? "انشر أول وثيقة لك"
                  : "تصفح النشرات"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{
                          backgroundColor: ws.subject.color || "#2563EB",
                        }}
                      >
                        {ws.subject.nameAr}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        {ws.grade.nameAr}
                      </span>
                    </div>
                    <Link
                      href={`/worksheet/${ws.id}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-blue-600 line-clamp-2"
                    >
                      {ws.titleAr || ws.title}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs text-slate-500">
                    <span>التحميلات: {ws.downloadCount}</span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/worksheet/${ws.id}`}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 hover:text-blue-600"
                        title="معاينة وتعديل"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {activeTab === "uploads" && (
                        <button
                          onClick={() => handleArchiveWorksheet(ws.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                          title="أرشفة وحذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default function TeacherProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center" dir="rtl">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      }
    >
      <ProfileWorkspaceContent />
    </Suspense>
  );
}