/**
 * GET /api/users/mentions?q=... — Lightweight `@username` autocomplete endpoint (Al-Musnad v10.0)
 * Security Fix: Never exposes user email addresses in public JSON responses; protected by rate limiting.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(ip, {
      keyPrefix: "mentions_lookup",
      maxRequests: 40,
      windowMs: 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          code: "RATE_LIMITED",
          message: "تم تجاوز الحد المسموح للطلبات، يرجى الانتظار قليلاً",
          statusCode: 429,
        },
        429
      );
    }

    const q = (request.nextUrl.searchParams.get("q") || "")
      .replace(/^@/, "")
      .trim();

    const users = await db.user.findMany({
      where: q
        ? {
            OR: [
              { username: { contains: q, mode: "insensitive" } },
              { name: { contains: q, mode: "insensitive" } },
              { school: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      take: 8,
      orderBy: [{ isVerified: "desc" }, { followersCount: "desc" }],
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        school: true,
        isVerified: true,
      },
    });

    const formatted = users.map((u) => {
      const fallbackUsername = u.username || `user_${u.id.slice(0, 6)}`;
      return {
        id: u.id,
        name: u.name,
        username: fallbackUsername,
        role: u.role,
        school: u.school,
        isVerified: u.isVerified,
      };
    });

    return successResponse(formatted);
  } catch (error) {
    return errorResponse(error);
  }
}