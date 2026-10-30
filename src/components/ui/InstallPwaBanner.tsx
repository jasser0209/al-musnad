"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Download, X, Smartphone, Share } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const SESSION_DISMISSED_KEY = "musnad_pwa_dismissed_session";
const INSTALLED_PERMANENT_KEY = "musnad_pwa_installed";

// In-memory guard so SPA route transitions never re-show the banner once dismissed
let dismissedInCurrentVisit = false;

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const isDismissedRef = useRef<boolean>(false);

  const checkIsDismissedOrInstalled = useCallback((): boolean => {
    if (dismissedInCurrentVisit || isDismissedRef.current) return true;
    if (typeof window === "undefined") return true;

    try {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      if (isStandalone) return true;

      if (localStorage.getItem(INSTALLED_PERMANENT_KEY) === "1") {
        return true;
      }

      if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") {
        dismissedInCurrentVisit = true;
        isDismissedRef.current = true;
        return true;
      }
    } catch {
      // Ignore storage access errors
    }

    return false;
  }, []);

  const markDismissedForSession = useCallback(() => {
    dismissedInCurrentVisit = true;
    isDismissedRef.current = true;
    setIsVisible(false);
    setShowIosGuide(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
      // Remove legacy localStorage key if present so session-based rule applies cleanly
      localStorage.removeItem("musnad_pwa_banner_dismissed");
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // If user logs out ("SIGNED_OUT"), reset session dismissal so it can appear again on next login/visit
      if (event === "SIGNED_OUT") {
        dismissedInCurrentVisit = false;
        isDismissedRef.current = false;
        try {
          sessionStorage.removeItem(SESSION_DISMISSED_KEY);
        } catch {
          // Ignore
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (checkIsDismissedOrInstalled()) {
      setIsVisible(false);
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleIos =
      /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIos(isAppleIos);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Crucial guard: never re-show if user already clicked "لاحقاً" or "X" during this session!
      if (checkIsDismissedOrInstalled()) {
        setIsVisible(false);
        return;
      }
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      dismissedInCurrentVisit = true;
      isDismissedRef.current = true;
      setIsVisible(false);
      try {
        localStorage.setItem(INSTALLED_PERMANENT_KEY, "1");
        sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
      } catch {
        // Ignore
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    let iosTimer: ReturnType<typeof setTimeout> | null = null;
    if (isAppleIos && window.innerWidth < 768) {
      iosTimer = setTimeout(() => {
        if (!checkIsDismissedOrInstalled()) {
          setIsVisible(true);
        }
      }, 3000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, [checkIsDismissedOrInstalled]);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        try {
          localStorage.setItem(INSTALLED_PERMANENT_KEY, "1");
        } catch {
          // Ignore
        }
      }
      // Hide for the rest of the session whether accepted or dismissed
      markDismissedForSession();
      setDeferredPrompt(null);
    } catch {
      markDismissedForSession();
    }
  };

  const handleDismiss = () => {
    markDismissedForSession();
  };

  if (!isVisible || checkIsDismissedOrInstalled()) return null;

  return (
    <div
      role="banner"
      aria-label="تثبيت تطبيق المسند"
      className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:end-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-blue-500/30 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-md shadow-blue-500/20 shrink-0">
              م
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>تطبيق منصة المسند</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-1.5 py-0.5 rounded-full border border-blue-500/30">
                  PWA
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                ثبّت التطبيق على هاتفك لتصفح أسرع والوصول المباشر للوثائق
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="إغلاق التنبيه"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showIosGuide && (
          <div className="bg-slate-800/80 p-3 rounded-xl text-xs text-blue-200 border border-blue-500/20 space-y-1.5 animate-in fade-in">
            <p className="font-bold flex items-center gap-1.5 text-white">
              <Share className="w-3.5 h-3.5 text-blue-400" />
              <span>خطوات التثبيت على iPhone:</span>
            </p>
            <p className="text-[11px] leading-relaxed text-slate-300">
              1. اضغط على زر المشاركة (Share) في أسفل متصفح Safari.
              <br />
              2. انزل للأسفل واختر <strong>«إضافة إلى الشاشة الرئيسية»</strong> (Add to Home Screen).
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
          >
            {isIos ? (
              <>
                <Smartphone className="w-4 h-4" />
                <span>طريقة التثبيت على iPhone</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>تثبيت التطبيق الآن</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            لاحقاً
          </button>
        </div>
      </div>
    </div>
  );
}
