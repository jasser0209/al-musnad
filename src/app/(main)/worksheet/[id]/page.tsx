/**
 * Worksheet Detail View Route (Server Component) — Al-Musnad v5.0
 *
 * Route: /worksheet/[id]
 *
 * Enforces:
 * 1. Mandatory Authentication: Unauthenticated visitors are immediately redirected
 *    to `/login?redirectTo=/worksheet/[id]`.
 * 2. Strict Publisher Audience Permission: Calls `getWorksheetById(id, dbUser.role, user.id)`.
 *    If the publisher restricted the worksheet to another account category (`ForbiddenError`),
 *    renders a clear Arabic Audience Restriction Notice instead of exposing the content.
 */

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Lock, ShieldAlert, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getWorksheetById } from "@/services/worksheet.service";
import { ForbiddenError, UnauthorizedError } from "@/lib/utils/errors";
import WorksheetDetailClient from "@/components/worksheets/WorksheetDetailClient";
import type { WorksheetWithRelations } from "@/types";

interface WorksheetPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  props: WorksheetPageProps
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        title: "محتوى محمي للأعضاء | منصة المسند",
        description: "يرجى تسجيل الدخول للوصول إلى النشرات التربوية في منصة المسند.",
      };
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const worksheet = await getWorksheetById(id, dbUser?.role, user.id);
    const title = worksheet.titleAr || worksheet.title;
    return {
      title: `${title} | منصة المسند`,
      description:
        worksheet.descriptionAr ||
        worksheet.description ||
        `نشرة تربوية عبر منصة المسند`,
    };
  } catch {
    return {
      title: "نشرة تربوية | منصة المسند",
      description: "منصة المسند التربوية والبيداغوجية المعتمدة.",
    };
  }
}

export default async function WorksheetDetailPage(props: WorksheetPageProps) {
  const { id } = await props.params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(`/worksheet/${id}`)}`);
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true },
  });

  if (!dbUser) {
    redirect(`/login?redirectTo=${encodeURIComponent(`/worksheet/${id}`)}`);
  }

  let worksheet: (WorksheetWithRelations & { previewUrl?: string }) | null =
    null;
  let forbiddenMessage: string | null = null;

  try {
    worksheet = (await getWorksheetById(
      id,
      dbUser.role,
      dbUser.id
    )) as unknown as (WorksheetWithRelations & { previewUrl?: string });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      redirect(`/login?redirectTo=${encodeURIComponent(`/worksheet/${id}`)}`);
    } else if (error instanceof ForbiddenError) {
      forbiddenMessage = error.message;
    } else {
      notFound();
    }
  }

  if (forbiddenMessage) {
    return (
      <main className="max-w-xl mx-auto px-4 py-20 text-center" dir="rtl">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-3xl p-8 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            هذه النشرة غير متاحة لفئة حسابك
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {forbiddenMessage}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              يعرض حسابك فقط النشرات التي أتاحها الناشرون لفئة حسابك.
            </span>
          </div>
          <div className="pt-2">
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى النشرات المتاحة لحسابي</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!worksheet) {
    notFound();
  }

  return <WorksheetDetailClient initialWorksheet={worksheet} />;
}