"use client";

/**
 * MentionText Component — Al-Musnad v8.0
 *
 * Automatically detects any `@username` in comments, reviews, or messages
 * and renders it as an interactive clickable badge that navigates to `/u/[username]`
 * which redirects straight to the Publisher's Profile Page (`/publisher/[id]`).
 */

import React from "react";
import Link from "next/link";

interface MentionTextProps {
  text: string;
  className?: string;
}

const MENTION_SPLIT_REGEX = /(@[a-zA-Z0-9_.]{2,32})/g;

export default function MentionText({ text, className = "" }: MentionTextProps) {
  if (!text) return null;

  const parts = text.split(MENTION_SPLIT_REGEX);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part.startsWith("@") && part.length >= 3) {
          const cleanUsername = part.slice(1).toLowerCase();
          return (
            <Link
              key={`${cleanUsername}-${idx}`}
              href={`/u/${encodeURIComponent(cleanUsername)}`}
              dir="ltr"
              className="mx-0.5 inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-xs font-bold text-blue-700 underline-offset-2 transition hover:bg-blue-100 hover:underline dark:bg-blue-950/70 dark:text-blue-300 dark:hover:bg-blue-900/80"
              title={`الانتقال إلى صفحة الناشر ${part}`}
            >
              {part}
            </Link>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
}