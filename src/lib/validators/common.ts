import { z } from "zod";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";

export const uuidSchema = z
  .string()
  .trim()
  .uuid({ message: "Invalid UUID format" });

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

export const worksheetSortSchema = z
  .enum(["newest", "oldest", "popular", "downloads", "title"], {
    errorMap: () => ({
      message:
        "Sort must be one of: 'newest', 'oldest', 'popular', 'downloads', 'title'",
    }),
  })
  .default("newest");

export const slugSchema = z
  .string()
  .trim()
  .min(1, { message: "Slug is required" })
  .max(100, { message: "Slug must be 100 characters or fewer" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must contain only lowercase alphanumeric characters and hyphens",
  });

export const searchSchema = z
  .string()
  .trim()
  .min(1, { message: "Search term cannot be empty" })
  .max(200, { message: "Search term must be 200 characters or fewer" });
