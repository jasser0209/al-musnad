/**
 * Auth & Profile Validation Schemas — Al-Musnad v8.0
 */

import { z } from "zod";

export const accountRoleOptionSchema = z
  .enum(["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"])
  .default("TEACHER");

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "اسم المستخدم يجب ألا يقل عن 3 أحرف")
  .max(32, "اسم المستخدم يجب ألا يتجاوز 32 حرفاً")
  .regex(
    /^[a-zA-Z0-9_.]+$/,
    "اسم المستخدم يجب أن يحتوي فقط على أحرف إنجليزية وأرقام ونقاط أو شرطة سفلية"
  );

export const signUpSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  username: usernameSchema.optional(),
  password: z
    .string()
    .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
    .max(72, "كلمة المرور طويلة جداً"),
  name: z
    .string()
    .trim()
    .min(2, "الاسم يجب أن يتكون من حرفين على الأقل")
    .max(255, "الاسم طويل جداً"),
  school: z.string().trim().max(255).optional(),
  studentGrade: z.string().trim().max(100).optional(),
  role: accountRoleOptionSchema.optional().default("TEACHER"),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "يجب الموافقة على الشروط والأحكام قبل إنشاء الحساب" }),
  }),
});

export const signInSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني أو اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  role: accountRoleOptionSchema.optional(),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "الاسم يجب أن يتكون من حرفين على الأقل")
    .max(255)
    .optional(),
  username: usernameSchema.optional(),
  school: z.string().trim().max(255).optional(),
  bio: z
    .string()
    .trim()
    .max(1000, "النبذة التعريفية يجب ألا تتجاوز 1000 حرف")
    .optional(),
  avatarUrl: z.string().url("رابط الصورة غير صالح").optional().nullable(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
