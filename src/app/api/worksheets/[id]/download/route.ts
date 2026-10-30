import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { recordAndGetDownloadUrl } from "@/services/download.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
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
      throw new UnauthorizedError("You must be logged in to download worksheets");
    }

    // 2. Record download and obtain pre-signed URL
    const result = await recordAndGetDownloadUrl(id, user.id);

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}