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

// 1. If PROJECT_HANDOVER.md exists, extract all files automatically
if (fs.existsSync(path.join(rootDir, "scripts/extract-handover.mjs")) && fs.existsSync(path.join(rootDir, "PROJECT_HANDOVER.md"))) {
  execSync("node scripts/extract-handover.mjs PROJECT_HANDOVER.md", { stdio: "inherit" });
}

// 2. Check and auto-fix 2_SECRET_ACCESS_KEY typo in .env
const envPath = path.join(rootDir, ".env");
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, "utf8");
  if (envContent.includes("2_SECRET_ACCESS_KEY") && !envContent.includes("R2_SECRET_ACCESS_KEY")) {
    envContent = envContent.replace(/\b2_SECRET_ACCESS_KEY\b/g, "R2_SECRET_ACCESS_KEY");
    fs.writeFileSync(envPath, envContent, "utf8");
    console.log("🔧 تم تصحيح اسم المتغير في .env تلقائياً من 2_SECRET_ACCESS_KEY إلى R2_SECRET_ACCESS_KEY");
  }
}

// 3. Run verification & TypeScript check
try {
  execSync("node scripts/verify-and-connect.mjs", { stdio: "inherit" });
  execSync("npx prisma generate", { stdio: "inherit" });
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  console.log("✅ اكتملت ترقية وفحص منصة «المسند» v16.0 بنجاح 100%!");
} catch (err) {
  console.warn("⚠️ يرجى التأكد من اتصال قاعدة البيانات وتشغيل `npx prisma generate` و `npm run build`.");
}
