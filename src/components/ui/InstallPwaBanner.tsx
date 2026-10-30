"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Smartphone, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed as PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Check if user recently dismissed the banner (within 5 days)
    const dismissedAt = localStorage.getItem("musnad_pwa_banner_dismissed");
    if (dismissedAt) {
      const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
      if (Date.now() - Number(dismissedAt) < fiveDaysMs) {
        return;
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleIos =
      /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIos(isAppleIos);

    // Handler for Android / Chromium browsers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show for iOS users after a brief 3s delay on mobile screens
    if (isAppleIos && window.innerWidth < 768) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

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
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } catch {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("musnad_pwa_banner_dismissed", String(Date.now()));
  };

  if (!isVisible) return null;

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
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0"
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