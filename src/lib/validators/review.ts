/**
 * Educational Review & Rating Validation Schemas — Al-Musnad v8.0
 */

import { z } from "zod";

export const upsertReviewSchema = z.object({
  rating: z.coerce
    .number()
    .int("التقييم يجب أن يكون رقماً صحيحاً")
    .min(1, "أقل تقييم هو نجمة واحدة")
    .max(5, "أعلى تقييم هو 5 نجوم")
    .default(5),
  comment: z
    .string()
    .trim()
    .min(2, "يرجى كتابة تعليق لا يقل عن حرفين")
    .max(2000, "التعليق يجب ألا يتجاوز 2000 حرف"),
  isOfficialDirective: z.boolean().optional(),
  isPrivateToPublisher: z.boolean().optional(),
});

export type UpsertReviewInput = z.infer<typeof upsertReviewSchema>;
