import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";

export async function GET() {
  try {
    await ensureOfficialTaxonomySeeded();
    const categories = await db.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(categories);
  } catch (error) {
    return errorResponse(error);
  }
}