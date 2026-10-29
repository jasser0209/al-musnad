/**
 * POST /api/me/presence — Member Online / Offline / Ghost Mode & Heartbeat API (Al-Musnad v11.0)
 *
 * Allows authenticated members to:
 * 1. Switch their presence status between:
 *    - `ONLINE` (متصل — green indicator dot)
 *    - `OFFLINE` (غير متصل — gray indicator dot + time since offline)
 *    - `GHOST` (وضع الشبح 👻 — browse the platform invisibly while appearing offline to others)
 * 2. Send periodic heartbeat updates while active on the site so `lastSeenAt` stays accurate.
 */

import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError, ValidationError } from "@/lib/utils/errors";

const VALID_STATUSES = ["ONLINE", "OFFLINE", "GHOST"] as const;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
    }

    const body = await request.json().catch(() => ({}));
    const requestedStatus = body.presenceStatus
      ? String(body.presenceStatus).toUpperCase()
      : undefined;

    if (
      requestedStatus &&
      !VALID_STATUSES.includes(requestedStatus as (typeof VALID_STATUSES)[number])
    ) {
      throw new ValidationError("حالة الاتصال غير صالحة");
    }

    const current = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, presenceStatus: true, lastSeenAt: true },
    });

    if (!current) {
      throw new UnauthorizedError("الحساب غير موجود");
    }

    const nextStatus = requestedStatus || current.presenceStatus || "ONLINE";

    // When switching to OFFLINE or GHOST, freeze or mark lastSeenAt as now so elapsed offline time starts counting from now.
    // When in ONLINE mode (or switching to ONLINE), update lastSeenAt to now.
    const shouldUpdateLastSeen =
      Boolean(requestedStatus) || nextStatus === "ONLINE";

    const updated = await db.user.update({
      where: { id: user.id },
      data: {
        presenceStatus: nextStatus,
        ...(shouldUpdateLastSeen ? { lastSeenAt: new Date() } : {}),
      },
      select: {
        id: true,
        presenceStatus: true,
        lastSeenAt: true,
      },
    });

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error);
  }
}
