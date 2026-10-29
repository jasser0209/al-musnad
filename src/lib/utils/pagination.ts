/**
 * Pagination Utility Functions
 *
 * Provides offset calculation for Prisma (`skip` / `take`) and
 * generates standardized pagination metadata.
 */

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";
import type { PaginationMeta } from "@/types/api";

export interface PaginationParams {
  skip: number;
  take: number;
  page: number;
  limit: number;
}

/**
 * Normalizes input page and limit parameters and returns Prisma offset limits.
 */
export function getPaginationParams(
  pageInput?: number | string | null,
  limitInput?: number | string | null
): PaginationParams {
  const parsedPage = Number(pageInput);
  const parsedLimit = Number(limitInput);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const rawLimit =
    Number.isInteger(parsedLimit) && parsedLimit > 0
      ? parsedLimit
      : DEFAULT_PAGE_SIZE;
  const limit = Math.min(rawLimit, MAX_PAGE_SIZE);

  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take, page, limit };
}

/**
 * Builds standard PaginationMeta object for API responses.
 */
export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const safeTotal = Math.max(0, total);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(safeTotal / safeLimit);

  return {
    page,
    limit,
    total: safeTotal,
    totalPages,
  };
}
