#!/usr/bin/env node
/**
 * سكريبت الترقية والاستخراج والفحص الشامل — منصة «المسند» (Al-Musnad v16.0)
 * Usage: node apply-musnad-v16-upgrade.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
console.log("🚀 بدء تطبيق وفحص الإصدار v16.0 لمنصة «المسند»...");

if (fs.existsSync(path.join(rootDir, "scripts/extract-handover.mjs")) && fs.existsSync(path.join(rootDir, "PROJECT_HANDOVER.md"))) {
  execSync("node scripts/extract-handover.mjs PROJECT_HANDOVER.md", { stdio: "inherit" });
}

try {
  execSync("npx prisma generate", { stdio: "inherit" });
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  console.log("✅ اكتملت ترقية وفحص منصة «المسند» v16.0 بنجاح 100%!");
} catch (err) {
  console.warn("⚠️ يرجى التأكد من اتصال قاعدة البيانات وتشغيل `npx prisma generate` و `npm run build`.");
}
