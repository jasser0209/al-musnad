"use client";

import React from "react";
import { Ghost } from "lucide-react";

export type PresenceMode = "ONLINE" | "OFFLINE" | "GHOST";

const ACTIVE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function formatOfflineDurationAr(lastSeenAt?: string | Date | null): string {
  if (!lastSeenAt) return "منذ فترة";
  const lastTime = new Date(lastSeenAt).getTime();
  if (Number.isNaN(lastTime)) return "منذ فترة";

  const diffMs = Math.max(0, Date.now() - lastTime);
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return "منذ لحظات";
  if (diffMinutes === 1) return "منذ دقيقة واحدة";
  if (diffMinutes === 2) return "منذ دقيقتين";
  if (diffMinutes <= 10) return `منذ ${diffMinutes} دقائق`;
  if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return "منذ ساعة واحدة";
  if (diffHours === 2) return "منذ ساعتين";
  if (diffHours <= 10) return `منذ ${diffHours} ساعات`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "منذ يوم واحد";
  if (diffDays === 2) return "منذ يومين";
  if (diffDays <= 10) return `منذ ${diffDays} أيام`;
  return `منذ ${diffDays} يوماً`;
}

export function getPublicPresenceState(
  user?: {
    presenceStatus?: string | null;
    lastSeenAt?: string | Date | null;
  } | null,
  isSelf: boolean = false
): {
  isOnlinePublicly: boolean;
  isGhostSelf: boolean;
  statusLabelAr: string;
  durationLabelAr: string | null;
  dotColorClass: string;
} {
  const rawStatus = (user?.presenceStatus || "ONLINE").toUpperCase();
  const lastSeenTime = user?.lastSeenAt
    ? new Date(user.lastSeenAt).getTime()
    : Date.now();
  const isRecentlyActive =
    !Number.isNaN(lastSeenTime) && Date.now() - lastSeenTime <= ACTIVE_WINDOW_MS;

  if (rawStatus === "GHOST") {
    const duration = formatOfflineDurationAr(user?.lastSeenAt);
    if (isSelf) {
      return {
        isOnlinePublicly: false,
        isGhostSelf: true,
        statusLabelAr: "وضع الشبح (تصفح خفي)",
        durationLabelAr: `تظهر للآخرين غير متصل (${duration})`,
        dotColorClass: "bg-slate-400 dark:bg-slate-500",
      };
    }
    return {
      isOnlinePublicly: false,
      isGhostSelf: false,
      statusLabelAr: "غير متصل",
      durationLabelAr: duration,
      dotColorClass: "bg-slate-400 dark:bg-slate-500",
    };
  }

  if (rawStatus === "OFFLINE" || !isRecentlyActive) {
    const duration = formatOfflineDurationAr(user?.lastSeenAt);
    return {
      isOnlinePublicly: false,
      isGhostSelf: false,
      statusLabelAr: "غير متصل",
      durationLabelAr: duration,
      dotColorClass: "bg-slate-400 dark:bg-slate-500",
    };
  }

  return {
    isOnlinePublicly: true,
    isGhostSelf: false,
    statusLabelAr: "متصل الآن",
    durationLabelAr: null,
    dotColorClass: "bg-emerald-500 shadow-sm shadow-emerald-500/50",
  };
}

interface UserAvatarWithPresenceProps {
  name: string;
  avatarUrl?: string | null;
  presenceStatus?: string | null;
  lastSeenAt?: string | Date | null;
  isSelf?: boolean;
  size?: "sm" | "md" | "lg";
  avatarBgClass?: string;
}

export function UserAvatarWithPresence({
  name,
  avatarUrl,
  presenceStatus,
  lastSeenAt,
  isSelf = false,
  size = "md",
  avatarBgClass = "bg-blue-600 text-white",
}: UserAvatarWithPresenceProps) {
  const presence = getPublicPresenceState(
    { presenceStatus, lastSeenAt },
    isSelf
  );

  const dims =
    size === "sm"
      ? "w-7 h-7 text-[11px] rounded-full"
      : size === "lg"
      ? "w-16 h-16 text-2xl rounded-2xl"
      : "w-8 h-8 text-xs rounded-full";

  const dotDims =
    size === "sm"
      ? "w-2.5 h-2.5 -bottom-0.5 right-1/2 translate-x-1/2 border"
      : size === "lg"
      ? "w-4 h-4 -bottom-1 right-1/2 translate-x-1/2 border-2"
      : "w-3 h-3 -bottom-0.5 right-1/2 translate-x-1/2 border-2";

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      title={
        presence.durationLabelAr
          ? `${presence.statusLabelAr} • ${presence.durationLabelAr}`
          : presence.statusLabelAr
      }
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${dims} object-cover border border-slate-200 dark:border-slate-700`}
        />
      ) : (
        <div
          className={`${dims} ${avatarBgClass} font-black flex items-center justify-center shadow-sm`}
        >
          {(name || "م").charAt(0)}
        </div>
      )}

      {/* Small green/gray indicator dot centered right at the bottom of the user picture */}
      <span
        className={`absolute ${dotDims} rounded-full border-white dark:border-slate-900 ${presence.dotColorClass}`}
      />
    </div>
  );
}

export function UserPresenceBadge({
  presenceStatus,
  lastSeenAt,
  isSelf = false,
  compact = false,
}: {
  presenceStatus?: string | null;
  lastSeenAt?: string | Date | null;
  isSelf?: boolean;
  compact?: boolean;
}) {
  const presence = getPublicPresenceState(
    { presenceStatus, lastSeenAt },
    isSelf
  );

  if (presence.isGhostSelf) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-100 border border-slate-700">
        <Ghost className="w-3 h-3 text-purple-400 shrink-0" />
        <span>
          {compact
            ? "وضع الشبح"
            : `وضع الشبح • ${presence.durationLabelAr}`}
        </span>
      </span>
    );
  }

  if (presence.isOnlinePublicly) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span>متصل الآن</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
      <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
      <span>
        {compact
          ? presence.durationLabelAr || "غير متصل"
          : `غير متصل • ${presence.durationLabelAr}`}
      </span>
    </span>
  );
}