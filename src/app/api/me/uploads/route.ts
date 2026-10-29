import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserUploads } from "@/services/worksheet.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserUploads(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}
