#!/usr/bin/env node
/**
 * ============================================================================
 * سكريبت الفحص والربط التلقائي للبيئة وقواعد البيانات — منصة المسند (v9.0)
 * ============================================================================
 * الاستخدام:
 *   node scripts/verify-and-connect.mjs
 */

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const envLocalPath = path.join(rootDir, ".env.local");
const envPath = path.join(rootDir, ".env");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const result = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
    result[key] = val;
  }
  return result;
}

const envVars = {
  ...parseEnvFile(envPath),
  ...parseEnvFile(envLocalPath),
  ...process.env,
};

const REQUIRED_KEYS = [
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    desc: "رابط مشروع Supabase (Project URL)",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    desc: "المفتاح العام للمصادقة (Supabase Anon Public Key)",
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    desc: "مفتاح الخدمة الإداري للتخزين السحابي (Supabase Service Role Key)",
  },
  {
    key: "DATABASE_URL",
    desc: "رابط اتصال قاعدة البيانات (PostgreSQL Transaction Pooler - Port 6543)",
  },
  {
    key: "DIRECT_URL",
    desc: "رابط الاتصال المباشر لـ Prisma (PostgreSQL Direct Connection - Port 5432)",
  },
];

console.log("======================================================================");
console.log("🔍 فحص جاهزية الربط الخارجي ومتغيرات البيئة لمنصة «المسند» (v9.0)");
console.log("======================================================================\n");

let missingCount = 0;

for (const item of REQUIRED_KEYS) {
  const val = envVars[item.key];
  const isMissing =
    !val ||
    val.includes("YOUR_PROJECT_REF") ||
    val.includes("placeholder") ||
    val.length < 10;

  if (isMissing) {
    missingCount++;
    console.log(`❌ [ناقص] ${item.key} — ${item.desc}`);
  } else {
    const masked = val.slice(0, 14) + "..." + val.slice(-4);
    console.log(`✅ [مربوط] ${item.key} (${masked})`);
  }
}

console.log("\n----------------------------------------------------------------------");
if (missingCount > 0) {
  console.log(`⚠️ تنبيه: يوجد (${missingCount}) متغيرات بيئية تحتاج إلى تعبئة في ملف .env.local`);
  console.log("📌 افتح ملف .env.local وضع مفاتيح مشروعك من لوحة تحكم Supabase ثم أعد تشغيل:");
  console.log("   1. npx prisma db push");
  console.log("   2. npx prisma db seed");
  console.log("   3. npm run dev");
} else {
  console.log("🎉 ممتاز! جميع مفاتيح الربط الخارجي وقواعد البيانات مهيأة بشكل سليم.");
  console.log("📌 لتزامن الجداول والبيانات الأولية نفّذ الآن:");
  console.log("   npx prisma generate && npx prisma db push && npx prisma db seed");
}
console.log("======================================================================\n");
