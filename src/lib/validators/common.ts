import { z } from "zod";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";

/**
 * UUID v4 / Postgres gen_random_uuid validator.
 */
export const uuidSchema = z
  .string()
  .trim()
  .uuid({ message: "Invalid UUID format" });

/**
 * Pagination query parameter schema with automatic coercion and bounds checking.
 */
export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int({ message: "Page must be an integer" })
    .min(1, { message: "Page must be greater than or equal to 1" })
    .default(1),
  limit: z.coerce
    .number()
    .int({ message: "Limit must be an integer" })
    .min(1, { message: "Limit must be greater than or equal to 1" })
    .max(MAX_PAGE_SIZE, { message: `Limit cannot exceed ${MAX_PAGE_SIZE}` })
    .default(DEFAULT_PAGE_SIZE),
});

/**
 * Supported sort options for worksheet queries (Added 'oldest' to match FilterBar UI).
 */
export const worksheetSortSchema = z
  .enum(["newest", "oldest", "popular", "downloads", "title"], {
    errorMap: () => ({
      message:
        "Sort must be one of: 'newest', 'oldest', 'popular', 'downloads', 'title'",
    }),
  })
  .default("newest");

/**
 * URL-friendly slug validator.
 */
export const slugSchema = z
  .string()
  .trim()
  .min(1, { message: "Slug is required" })
  .max(100, { message: "Slug must be 100 characters or fewer" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must contain only lowercase alphanumeric characters and hyphens",
  });

/**
 * Generic search query validator.
 */
export const searchSchema = z
  .string()
  .trim()
  .min(1, { message: "Search term cannot be empty" })
  .max(200, { message: "Search term must be 200 characters or fewer" });