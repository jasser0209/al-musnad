"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
  Globe,
  LogIn,
  UserPlus,
  Upload,
  Menu,
  X,
  Bell,
  UserCog,
  CreditCard,
  Settings,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ExternalLink,
  CheckCheck,
  BadgeCheck,
  Library,
  Ghost,
} from "lucide-react";
import {
  UserAvatarWithPresence,
  getPublicPresenceState,
  type PresenceMode,
} from "@/components/ui/UserPresenceIndicator";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAppPreferences, type Locale } from "@/context/AppPreferencesContext";
import type { NotificationItem } from "@/types/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role?: string;
  isVerified?: boolean;
  isBanned?: boolean;
  presenceStatus?: PresenceMode | string;
  lastSeenAt?: string | null;
}

const LANGUAGES: { code: Locale; label: string; short: string }[] = [
  { code: "ar", label: "العربية", short: "AR" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
];

function getRoleUsernameBoxStyle(role?: string, isVerified?: boolean): {
  boxClass: string;
  avatarBgClass: string;
  roleLabel: string;
  roleShortTag: string;
  badgeClass: string;
} {
  if (role === "ADMIN") {
    return {
      boxClass:
        "border-2 border-purple-500/80 bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 hover:border-purple-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white",
      roleLabel: "المشرف العام",
      roleShortTag: "مشرف عام",
      badgeClass:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border border-purple-300 dark:border-purple-700",
    };
  }
  if (role === "MODERATOR") {
    return {
      boxClass:
        "border-2 border-indigo-500/80 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 hover:border-indigo-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white",
      roleLabel: "المسؤول الإداري",
      roleShortTag: "مسؤول",
      badgeClass:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700",
    };
  }
  if (role === "INSPECTOR") {
    if (isVerified) {
      return {
        boxClass:
          "border-2 border-amber-500/80 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 hover:border-amber-600 shadow-sm",
        avatarBgClass: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
        roleLabel: "متفقد معتمد",
        roleShortTag: "متفقد",
        badgeClass:
          "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border border-amber-300 dark:border-amber-700",
      };
    }
    return {
      boxClass:
        "border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-amber-400 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-slate-600 to-slate-700 text-white",
      roleLabel: "حساب قيد توثيق الهوية",
      roleShortTag: "غير موثق",
      badgeClass:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700",
    };
  }
  if (role === "INSTITUTION") {
    if (isVerified) {
      return {
        boxClass:
          "border-2 border-violet-500/80 bg-violet-50/70 dark:bg-violet-950/40 text-violet-950 dark:text-violet-200 hover:border-violet-600 shadow-sm",
        avatarBgClass: "bg-gradient-to-br from-violet-600 to-indigo-600 text-white",
        roleLabel: "مؤسسة معتمدة",
        roleShortTag: "مؤسسة",
        badgeClass:
          "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200 border border-violet-300 dark:border-violet-700",
      };
    }
    return {
      boxClass:
        "border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-violet-400 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-slate-600 to-slate-700 text-white",
      roleLabel: "حساب قيد توثيق الهوية",
      roleShortTag: "غير موثق",
      badgeClass:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700",
    };
  }
  if (role === "STUDENT") {
    return {
      boxClass:
        "border-2 border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 hover:border-emerald-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-emerald-600 to-teal-600 text-white",
      roleLabel: "تلميذ",
      roleShortTag: "تلميذ",
      badgeClass:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700",
    };
  }
  return {
    boxClass:
      "border-2 border-blue-500/80 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 hover:border-blue-600 shadow-sm",
    avatarBgClass: "bg-gradient-to-br from-blue-600 to-cyan-600 text-white",
    roleLabel: isVerified ? "معلم موثق" : "معلم",
    roleShortTag: "معلم",
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-300 dark:border-blue-700",
  };
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const { locale, setLocale, theme, toggleTheme, t, openAuthModal, closeAuthModal } =
    useAppPreferences();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        profileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(target)
      ) {
        setProfileMenuOpen(false);
      }
      if (
        notifMenuOpen &&
        notifMenuRef.current &&
        !notifMenuRef.current.contains(target)
      ) {
        setNotifMenuOpen(false);
      }
      if (
        langMenuOpen &&
        langMenuRef.current &&
        !langMenuRef.current.contains(target)
      ) {
        setLangMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
        setNotifMenuOpen(false);
        setLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideMouseDown);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleOutsideMouseDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [profileMenuOpen, notifMenuOpen, langMenuOpen]);
  const [updatingPresence, setUpdatingPresence] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setNotifications(json.data.notifications || []);
          setUnreadCount(json.data.unreadCount || 0);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleChangePresence = async (nextMode: PresenceMode) => {
    if (!user || updatingPresence) return;
    try {
      setUpdatingPresence(true);
      const res = await fetch("/api/me/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presenceStatus: nextMode }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                presenceStatus: json.data.presenceStatus,
                lastSeenAt: json.data.lastSeenAt,
              }
            : null
        );
      }
    } catch {
      // ignore
    } finally {
      setUpdatingPresence(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && isMounted) {
          const initialUser: UserProfile = {
            id: session.user.id,
            name:
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "عضو المسند",
            email: session.user.email || "",
            avatarUrl: session.user.user_metadata?.avatar_url || null,
            presenceStatus: "ONLINE",
            lastSeenAt: new Date().toISOString(),
          };

          try {
            const res = await fetch("/api/auth/me", { cache: "no-store" });
            if (res.ok) {
              const json = await res.json();
              if (json.success && json.data) {
                initialUser.role = json.data.role;
                initialUser.name = json.data.name || initialUser.name;
                initialUser.avatarUrl =
                  json.data.avatarUrl || initialUser.avatarUrl;
                initialUser.isVerified = json.data.isVerified;
                initialUser.isBanned = json.data.isBanned;
                initialUser.presenceStatus =
                  json.data.presenceStatus || "ONLINE";
                initialUser.lastSeenAt =
                  json.data.lastSeenAt || new Date().toISOString();
              }
            }
          } catch {
            // fallback
          }

          if (isMounted) {
            setUser(initialUser);
            fetchNotifications();
          }
        } else if (isMounted) {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth status error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const updatedUser: UserProfile = {
          id: session.user.id,
          name:
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "عضو المسند",
          email: session.user.email || "",
          avatarUrl: session.user.user_metadata?.avatar_url || null,
          presenceStatus: "ONLINE",
          lastSeenAt: new Date().toISOString(),
        };

        try {
          const res = await fetch("/api/auth/me", { cache: "no-store" });
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data) {
              updatedUser.role = json.data.role;
              updatedUser.name = json.data.name || updatedUser.name;
              updatedUser.avatarUrl =
                json.data.avatarUrl || updatedUser.avatarUrl;
              updatedUser.isVerified = json.data.isVerified;
              updatedUser.isBanned = json.data.isBanned;
              updatedUser.presenceStatus =
                json.data.presenceStatus || "ONLINE";
              updatedUser.lastSeenAt =
                json.data.lastSeenAt || new Date().toISOString();
            }
          }
        } catch {
          // ignore
        }

        setUser(updatedUser);
        fetchNotifications();
      } else {
        setUser(null);
        setNotifications([]);
        setUnreadCount(0);
      }
    });

    // Periodic heartbeat every 3 minutes while active in ONLINE mode
    const heartbeatTimer = setInterval(() => {
      fetch("/api/me/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heartbeat: true }),
      }).catch(() => null);
    }, 3 * 60_000);

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      clearInterval(heartbeatTimer);
    };
  }, []);

  const handleMarkAllNotificationsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // ignore
    }
  };

  const handleSignOut = async () => {
    setProfileMenuOpen(false);
    setNotifMenuOpen(false);
    setMobileMenuOpen(false);
    closeAuthModal();
    setUser(null);

    try {
      void fetch("/api/me/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presenceStatus: "OFFLINE" }),
        keepalive: true,
      }).catch(() => null);
      await supabase.auth.signOut();
    } catch {
      // ignore
    }

    if (typeof window !== "undefined") {
      window.location.replace("/login");
    } else {
      router.push("/login");
    }
  };

  const getNavLinks = () => {
    const base = [
      { label: t.nav.home, href: "/" },
      { label: "مستودع المواد والمستويات", href: "/levels" },
      { label: "النشرات", href: "/#catalog" },
    ];

    if (user?.role === "INSPECTOR") {
      return [
        ...base,
        user.isVerified
          ? { label: "للمتفقدين", href: "/#inspectors-hub" }
          : { label: "توثيق حساب المتفقد", href: "/profile?tab=verification" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "TEACHER") {
      return [
        ...base,
        user.isVerified
          ? { label: "للمعلمين", href: "/#teachers-hub" }
          : { label: "توثيق الحساب", href: "/profile?tab=verification" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "INSTITUTION") {
      return [
        ...base,
        user.isVerified
          ? { label: "للمؤسسات", href: "/#institutions-hub" }
          : { label: "توثيق المؤسسة", href: "/profile?tab=verification" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "ADMIN") {
      return [
        ...base,
        { label: "لوحة المشرف", href: "/admin/dashboard" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "MODERATOR") {
      return [
        ...base,
        { label: "لوحة المسؤول", href: "/moderator/dashboard" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    return [
      ...base,
      { label: "اعرف المزيد", href: "/#learn-more" },
    ];
  };

  const navLinks = getNavLinks();

  const isSupervisoryRole =
    user?.role === "ADMIN" ||
    user?.role === "MODERATOR" ||
    user?.role === "INSPECTOR";

  const roleBoxStyle = getRoleUsernameBoxStyle(user?.role, user?.isVerified);
  const currentPresenceInfo = getPublicPresenceState(
    {
      presenceStatus: user?.presenceStatus,
      lastSeenAt: user?.lastSeenAt,
    },
    true
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3 gap-4">
          {/* Brand Logo: المسند */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                م
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {t.brandTagline}
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/levels" && pathname?.startsWith("/levels"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 transition cursor-pointer"
                title={t.nav.language}
              >
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{locale.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute top-full mt-2 end-0 z-20 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-1.5 space-y-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLocale(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          locale === lang.code
                            ? "bg-blue-600 text-white"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="text-[10px] opacity-80">
                          {lang.short}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 transition cursor-pointer"
              title={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

            {/* Authenticated vs Unauthenticated */}
            {!loading && user ? (
              <div className="flex items-center gap-2.5">
                {user.role !== "STUDENT" && !user.isBanned && (
                  <Link
                    href="/upload"
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t.nav.upload}</span>
                  </Link>
                )}

                {/* Notification Bell Icon */}
                <div className="relative" ref={notifMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifMenuOpen((prev) => !prev);
                      setProfileMenuOpen(false);
                      if (!notifMenuOpen) fetchNotifications();
                    }}
                    className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                    title={t.nav.notifications}
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {notifMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setNotifMenuOpen(false)}
                      />
                      <div className="absolute top-full mt-2 end-0 z-20 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Bell className="w-3.5 h-3.5 text-blue-600" />
                            <span>{t.nav.notifications}</span>
                          </span>
                          {unreadCount > 0 && (
                            <button
                              type="button"
                              onClick={handleMarkAllNotificationsRead}
                              className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                              <span>{t.nav.markAllRead}</span>
                            </button>
                          )}
                        </div>

                        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                          {notifications.length === 0 ? (
                            <div className="py-8 px-4 text-center text-xs text-slate-400">
                              {t.nav.noNotifications}
                            </div>
                          ) : (
                            notifications.map((n) => (
                              <div
                                key={n.id}
                                onClick={() => {
                                  setNotifMenuOpen(false);
                                  if (n.link) router.push(n.link);
                                }}
                                className={`p-3.5 text-start transition cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                                  !n.isRead
                                    ? "bg-blue-50/40 dark:bg-blue-950/20"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                                    {n.title}
                                  </p>
                                  {!n.isRead && (
                                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                  {n.message}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Unified Role-Distinguished Username Box & Dropdown Menu (Full Name + Colored Rank Border) */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen((prev) => !prev);
                      setNotifMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl transition cursor-pointer shrink-0 ${roleBoxStyle.boxClass}`}
                    title={user.name}
                  >
                    <UserAvatarWithPresence
                      name={user.name}
                      avatarUrl={user.avatarUrl}
                      presenceStatus={user.presenceStatus}
                      lastSeenAt={user.lastSeenAt}
                      isSelf={true}
                      size="md"
                      avatarBgClass={roleBoxStyle.avatarBgClass}
                    />
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        profileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setProfileMenuOpen(false)}
                      />
                      <div className="absolute top-full mt-2 end-0 z-20 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2.5 space-y-1">
                        {/* User Summary, Role Hint & Presence Switcher */}
                        <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="truncate">
                              <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                                {user.name}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {user.email}
                              </p>
                            </div>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black shrink-0 ${roleBoxStyle.badgeClass}`}
                              title={`فئة الحساب: ${roleBoxStyle.roleLabel}`}
                            >
                              {roleBoxStyle.roleLabel}
                            </span>
                          </div>

                          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2 border border-slate-200/70 dark:border-slate-700">
                            <span className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-400 mb-1.5">
                              حالة الظهور والاتصال في المنصة:
                            </span>
                            <div className="grid grid-cols-3 gap-1">
                              <button
                                type="button"
                                disabled={updatingPresence}
                                onClick={() => handleChangePresence("ONLINE")}
                                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  (user.presenceStatus || "ONLINE") === "ONLINE"
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-emerald-50"
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>متصل</span>
                              </button>

                              <button
                                type="button"
                                disabled={updatingPresence}
                                onClick={() => handleChangePresence("OFFLINE")}
                                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  user.presenceStatus === "OFFLINE"
                                    ? "bg-slate-700 text-white shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                <span>غير متصل</span>
                              </button>

                              <button
                                type="button"
                                disabled={updatingPresence}
                                onClick={() => handleChangePresence("GHOST")}
                                title="تصفح الموقع دون ظهور أنك متصل"
                                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  user.presenceStatus === "GHOST"
                                    ? "bg-purple-700 text-white shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-purple-50"
                                }`}
                              >
                                <Ghost className="w-3 h-3" />
                                <span>الشبح</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 1. ملفي الشخصي */}
                        <Link
                          href="/profile"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <UserIcon className="w-4 h-4 text-blue-600" />
                          <span>{t.nav.profile}</span>
                        </Link>

                        {/* 2. صفحتي العامة كناشر */}
                        <Link
                          href={`/publisher/${user.id}`}
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <ExternalLink className="w-4 h-4 text-indigo-600" />
                          <span>صفحتي العامة كناشر</span>
                        </Link>

                        {/* 3. شارة الرتبة المدمجة مع لوحة التحكم مباشرة أسفل الملف الشخصي وصفحتي العامة كناشر */}
                        {user.role === "ADMIN" && (
                          <div className="my-1.5 p-2 rounded-2xl bg-gradient-to-l from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/50 dark:via-slate-800 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800/70 space-y-1.5">
                            <Link
                              href="/admin/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white text-xs font-black shadow-sm transition"
                            >
                              <span className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 shrink-0" />
                                <span>مشرف عام • لوحة التحكم</span>
                              </span>
                              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                القمة
                              </span>
                            </Link>
                            <div className="grid grid-cols-2 gap-1 pt-0.5">
                              <Link
                                href="/moderator/dashboard"
                                onClick={() => setProfileMenuOpen(false)}
                                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-indigo-100 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800 transition"
                              >
                                <ShieldAlert className="w-3 h-3" />
                                <span>لوحة المسؤول</span>
                              </Link>
                              <Link
                                href="/inspector/dashboard"
                                onClick={() => setProfileMenuOpen(false)}
                                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-amber-100 text-[10px] font-extrabold text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800 transition"
                              >
                                <BadgeCheck className="w-3 h-3" />
                                <span>لوحة المتفقد</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {user.role === "MODERATOR" && (
                          <div className="my-1.5 p-1.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/70">
                            <Link
                              href="/moderator/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-sm transition"
                            >
                              <span className="flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 shrink-0" />
                                <span>مسؤول إداري • لوحة التحكم</span>
                              </span>
                              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                دخول
                              </span>
                            </Link>
                          </div>
                        )}

                        {user.role === "INSPECTOR" && user.isVerified && (
                          <div className="my-1.5 p-1.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70">
                            <Link
                              href="/inspector/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-black shadow-sm transition"
                            >
                              <span className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 shrink-0" />
                                <span>متفقد معتمد • لوحة التحكم</span>
                              </span>
                              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                دخول
                              </span>
                            </Link>
                          </div>
                        )}

                        <Link
                          href="/levels"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Library className="w-4 h-4 text-blue-600" />
                          <span>مستودع المواد والمستويات</span>
                        </Link>

                        <Link
                          href="/profile?tab=edit"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <UserCog className="w-4 h-4 text-emerald-600" />
                          <span>{t.nav.editProfile}</span>
                        </Link>

                        <Link
                          href="/profile?tab=subscriptions"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <span className="flex items-center gap-2.5">
                            <CreditCard className="w-4 h-4 text-amber-600" />
                            <span>{t.nav.subscriptions}</span>
                          </span>
                          <span className="rounded-md bg-amber-100 dark:bg-amber-950/70 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-800 dark:text-amber-300">
                            قريباً
                          </span>
                        </Link>

                        <Link
                          href="/profile?tab=verification"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <BadgeCheck className="w-4 h-4 text-blue-600" />
                          <span>{t.nav.verification}</span>
                        </Link>

                        <Link
                          href="/profile?tab=settings"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Settings className="w-4 h-4 text-slate-500" />
                          <span>{t.nav.settings}</span>
                        </Link>

                        <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>{t.nav.logout}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : !loading ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 rounded-xl transition cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav.login}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-500/20 transition cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.nav.register}</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() =>
                setLocale(
                  locale === "ar" ? "fr" : locale === "fr" ? "en" : "ar"
                )
              }
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-extrabold text-slate-700 dark:text-slate-200"
            >
              {locale.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-300"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {user ? (
              <>
                <div className={`p-3 rounded-2xl ${roleBoxStyle.boxClass}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <UserAvatarWithPresence
                        name={user.name}
                        avatarUrl={user.avatarUrl}
                        presenceStatus={user.presenceStatus}
                        lastSeenAt={user.lastSeenAt}
                        isSelf={true}
                        size="md"
                        avatarBgClass={roleBoxStyle.avatarBgClass}
                      />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {currentPresenceInfo.statusLabelAr}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black ${roleBoxStyle.badgeClass}`}>
                      {roleBoxStyle.roleLabel}
                    </span>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 dark:text-slate-100"
                >
                  {t.nav.profile}
                </Link>
                <Link
                  href={`/publisher/${user.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-indigo-700 dark:text-indigo-300"
                >
                  صفحتي العامة كناشر
                </Link>

                {/* Merged Supervisory Badge + Control Panel right below Profile & Public Publisher Page */}
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-blue-700 text-white text-xs font-extrabold shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>مشرف عام • لوحة التحكم</span>
                  </Link>
                )}
                {user.role === "MODERATOR" && (
                  <Link
                    href="/moderator/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-extrabold shadow-sm"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>مسؤول إداري • لوحة التحكم</span>
                  </Link>
                )}
                {user.role === "INSPECTOR" && user.isVerified && (
                  <Link
                    href="/inspector/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-extrabold shadow-sm"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    <span>متفقد معتمد • لوحة التحكم</span>
                  </Link>
                )}

                <Link
                  href="/profile?tab=subscriptions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  {t.nav.subscriptions} (سيأتي قريباً)
                </Link>
                <Link
                  href="/profile?tab=verification"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-blue-600 dark:text-blue-400"
                >
                  {t.nav.verification}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-start px-3 py-2 text-sm font-bold text-red-600 rounded-lg"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
                >
                  {t.nav.login}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("register");
                  }}
                  className="py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl"
                >
                  {t.nav.register}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}