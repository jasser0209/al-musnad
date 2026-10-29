"use client";

/**
 * SubjectIcon — Expressive Visual Symbol for Each Academic Subject (Al-Musnad v12.0)
 *
 * Replaces raw numeric indices (1..9) inside Subject cards with a meaningful icon
 * that visually represents the subject matter.
 */

import React from "react";
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Languages,
  Globe,
  Compass,
  Palette,
  MoonStar,
  Dumbbell,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface SubjectIconProps {
  slug?: string | null;
  iconName?: string | null;
  className?: string;
}

export default function SubjectIcon({
  slug,
  iconName,
  className = "h-6 w-6",
}: SubjectIconProps) {
  const key = (slug || iconName || "").toLowerCase();

  switch (key) {
    case "math":
    case "calculator":
      return <Calculator className={className} />;
    case "science":
    case "flask-conical":
      return <FlaskConical className={className} />;
    case "arabic":
    case "book-open":
      return <BookOpen className={className} />;
    case "french":
    case "languages":
      return <Languages className={className} />;
    case "english":
    case "globe":
      return <Globe className={className} />;
    case "history-geography":
    case "compass":
      return <Compass className={className} />;
    case "art":
    case "palette":
      return <Palette className={className} />;
    case "islamic-studies":
    case "moon-star":
      return <MoonStar className={className} />;
    case "pe":
    case "dumbbell":
      return <Dumbbell className={className} />;
    case "administration":
    case "briefcase":
      return <Briefcase className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
