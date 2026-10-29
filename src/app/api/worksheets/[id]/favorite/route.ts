/**
 * Worksheet Favorite Route Handler
 *
 * POST /api/worksheets/[id]/favorite -> Protected endpoint that atomically
 * toggles bookmark state and updates denormalized favorite counts.
 */

import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { toggleFavorite } from "@/services/favorite.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    // 1. Enforce authentication
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("You must be logged in to favorite worksheets");
    }

    // 2. Perform atomic toggle
    const result = await toggleFavorite(id, user.id);

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
