/**
 * POST /api/auth/resolve-username — Securely resolves a @username to an email for login
 * Protected by sliding-window rate limiting to prevent username/email enumeration.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { ValidationError } from "@/lib/utils/errors";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(ip, {
      keyPrefix: "resolve_username",
      maxRequests: 15,
      windowMs: 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          code: "RATE_LIMITED",
          message: `يرجى الانتظار ${limit.retryAfterSeconds} ثانية قبل المحاولة مجدداً`,
          statusCode: 429,
        },
        429
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawUsername = String(body?.username || "")
      .replace(/^@/, "")
      .trim()
      .toLowerCase();

    if (!rawUsername || rawUsername.length < 3) {
      throw new ValidationError("اسم المستخدم غير صالح");
    }

    const matchedUser = await db.user.findFirst({
      where: {
        username: { equals: rawUsername, mode: "insensitive" },
      },
      select: { email: true },
    });

    return successResponse({
      email: matchedUser?.email || null,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
