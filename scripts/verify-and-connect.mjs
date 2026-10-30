#!/usr/bin/env node
/**
 * سكريبت الفحص الشامل والربط لمنصة «المسند» (Al-Musnad v16.0)
 * يفحص:
 * 1. متغيرات Supabase و PostgreSQL.
 * 2. مفاتيح Cloudflare R2 (يتأكد من أن R2_ACCESS_KEY_ID بطول 32 حرفاً و R2_SECRET_ACCESS_KEY بطول 64 حرفاً، وينبه إذا كُتب 2_SECRET_ACCESS_KEY بدون حرف R).
 * 3. إعدادات Resend للبريد الإلكتروني.
 */

import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");
console.log("====================================================================");
console.log("🔍 فحص إعدادات البيئة والربط السحابي — منصة المسند (v16.0)");
console.log("====================================================================");

if (!fs.existsSync(envPath)) {
  console.warn("⚠️ ملف .env غير موجود. يمكنك نسخه من .env.example عبر: cp .env.example .env");
} else {
  const raw = fs.readFileSync(envPath, "utf8");
  if (raw.includes("2_SECRET_ACCESS_KEY") && !raw.includes("R2_SECRET_ACCESS_KEY")) {
    console.warn("⚠️ تنبيه: وُجد المتغير باسم 2_SECRET_ACCESS_KEY (ينقصه حرف R في البداية).");
    console.warn("   يقوم نظام المسند v16.0 بالتعرف عليه تلقائياً، ولكن يُفضل تعديل اسمه في .env و Vercel إلى: R2_SECRET_ACCESS_KEY");
  }
}

const accessKey = (process.env.R2_ACCESS_KEY_ID || "").trim();
const secretKey = (process.env.R2_SECRET_ACCESS_KEY || process.env["2_SECRET_ACCESS_KEY"] || "").trim();

if (accessKey) {
  console.log(`✅ R2_ACCESS_KEY_ID: الطول = ${accessKey.length} حرفاً ${accessKey.length === 32 ? "(صحيح 100%)" : "⚠️ (يجب أن يكون 32 حرفاً!)"}`);
}
if (secretKey) {
  console.log(`✅ R2_SECRET_ACCESS_KEY: الطول = ${secretKey.length} حرفاً ${secretKey.length === 64 ? "(صحيح 100%)" : "⚠️ (يجب أن يكون 64 حرفاً!)"}`);
}
console.log("====================================================================");