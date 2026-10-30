import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { upsertReviewSchema } from "@/lib/validators/review";
import {
  listWorksheetReviews,
  upsertWorksheetReview,
  deleteWorksheetReview,
} from "@/services/review.service";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";
import { db } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let viewerRole: string | null = null;
    let viewerId: string | null = null;

    if (user) {
      viewerId = user.id;
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      viewerRole = dbUser?.role || null;
    }

    const reviews = await listWorksheetReviews(id, viewerRole, viewerId);
    return successResponse(reviews);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول أولاً لإضافة تعليق");
    }

    const ip = getClientIp(request);
    const limit = checkRateLimit(`${user.id}:${ip}`, {
      keyPrefix: "post_review",
      maxRequests: 20,
      windowMs: 5 * 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          message: `يرجى الانتظار ${limit.retryAfterSeconds} ثانية قبل نشر تعليق جديد.`,
          code: "RATE_LIMITED",
          statusCode: 429,
        },
        429
      );
    }

    const body = await request.json();
    const validated = upsertReviewSchema.parse(body);

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await upsertWorksheetReview(
      id,
      user.id,
      validated,
      dbUser?.role
    );
    return successResponse(result, undefined, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
    }

    const reviewId = request.nextUrl.searchParams.get("reviewId");

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await deleteWorksheetReview(
      id,
      user.id,
      dbUser?.role,
      reviewId
    );
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
