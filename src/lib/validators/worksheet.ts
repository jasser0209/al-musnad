import { z } from "zod";
import { WorksheetStatus } from "@prisma/client";
import { uuidSchema, paginationSchema, worksheetSortSchema } from "./common";

export const targetAudienceSchema = z
  .enum([
    "ALL",
    "SAME_ROLE_ONLY",
    "TEACHERS_ONLY",
    "TEACHERS_AND_STUDENTS",
    "INSTITUTIONS_ONLY",
  ])
  .default("TEACHERS_AND_STUDENTS");

export const createWorksheetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "العنوان يجب أن يتكون من 3 أحرف على الأقل")
    .max(255, "العنوان طويل جداً"),
  titleAr: z.string().trim().max(255).optional(),
  description: z.string().trim().max(2000).optional(),
  descriptionAr: z.string().trim().max(2000).optional(),
  categoryId: uuidSchema,
  gradeId: uuidSchema,
  subjectId: uuidSchema,
  audience: targetAudienceSchema,
  pageCount: z.number().int().positive().optional(),
  thumbnailUrl: z.string().optional(),
  tags: z
    .array(z.string().trim().min(1).max(50))
    .max(10, "الحد الأقصى 10 وسوم")
    .default([]),
});

export const updateWorksheetSchema = createWorksheetSchema
  .partial()
  .extend({
    status: z.nativeEnum(WorksheetStatus).optional(),
  });

export const worksheetFilterSchema = paginationSchema.extend({
  search: z.string().trim().max(200).optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  category: z.string().optional(),
  trimester: z.string().optional(),
  audience: targetAudienceSchema.optional(),
  tags: z
    .string()
    .transform((val) => val.split(",").map((t) => t.trim()))
    .optional(),
  sort: worksheetSortSchema,
  status: z.nativeEnum(WorksheetStatus).optional(),
});

export type CreateWorksheetInput = z.infer<typeof createWorksheetSchema>;
export type UpdateWorksheetInput = z.infer<typeof updateWorksheetSchema>;
export type WorksheetFilterInput = z.infer<typeof worksheetFilterSchema>;