import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "./errors";
import type {
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginationMeta,
  ApiErrorDetail,
} from "@/types/api";

/**
 * Returns a standardized 2xx success JSON response.
 */
export function successResponse<T>(
  data: T,
  meta?: PaginationMeta,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };

  return NextResponse.json(body, { status });
}

/**
 * Returns a standardized error JSON response from any thrown exception.
 * Dispatches AppError, Zod validation errors, Prisma database errors, and unknown exceptions.
 */
export function errorResponse(
  error: unknown,
  fallbackStatus: number = 500
): NextResponse<ApiErrorResponse> {
  // 1. Custom Application Errors
  if (error instanceof AppError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && error.details.length > 0 ? { details: error.details } : {}),
      },
    };

    return NextResponse.json(body, { status: error.statusCode });
  }

  // 2. Zod Schema Validation Errors
  if (error instanceof ZodError) {
    const details: ApiErrorDetail[] = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input parameters",
        details,
      },
    };

    return NextResponse.json(body, { status: 400 });
  }

  // 3. Prisma Database Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = Array.isArray(error.meta?.target)
          ? error.meta?.target.join(", ")
          : (error.meta?.target as string | undefined) ?? "field";

        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "CONFLICT",
            message: `A record with this ${target} already exists`,
          },
        };
        return NextResponse.json(body, { status: 409 });
      }

      case "P2025": {
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "The requested record was not found",
          },
        };
        return NextResponse.json(body, { status: 404 });
      }

      case "P2003": {
        const fieldName = (error.meta?.field_name as string | undefined) ?? "foreign key";
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "FOREIGN_KEY_VIOLATION",
            message: `Invalid reference provided for ${fieldName}`,
          },
        };
        return NextResponse.json(body, { status: 400 });
      }

      default: {
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "DATABASE_ERROR",
            message: "A database error occurred",
          },
        };
        return NextResponse.json(body, { status: 500 });
      }
    }
  }

  // 4. Fallback for unhandled or unexpected server errors
  console.error("[Unhandled Exception]:", error);

  const fallbackBody: ApiErrorResponse = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message:
        error instanceof Error ? error.message : "An unexpected server error occurred",
    },
  };

  return NextResponse.json(fallbackBody, { status: fallbackStatus });
}
