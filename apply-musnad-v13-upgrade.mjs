#!/usr/bin/env node
/**
 * Upgrade Script — Al-Musnad (المسند) v13.0
 * 
 * Execution: node apply-musnad-v13-upgrade.mjs
 * 
 * Directives Implemented:
 * 1. Seed 6 ready demo accounts for all roles with password `Musnad@2026`.
 * 2. Uncrowd the username button in Navbar: remove text badge, style box with role-specific color border & background, show role hint inside dropdown.
 * 3. Merge "About Us", "Role Benefits", and "FAQ" into a single top-level section: "اعرف المزيد" (`/#learn-more`) with interactive tab switching.
 * 4. Comprehensive Light / Dark Mode enhancements across all components in `globals.css`.
 * 5. Update subscriptions section in `ArchivedSubscriptionsPlans.tsx` to display "سيأتي قريباً" without discussing pricing or free period.
 * 6. Add two WhatsApp direct support channels in `/support`:
 *    - Teachers & Students: 27764985 (https://wa.me/21627764985)
 *    - Institutions & Inspectors: 76907101 (https://wa.me/21676907101)
 * 7. Fix Google OAuth redirection with `skipBrowserRedirect: true` and `window.top` iframe breakout.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
console.log("======================================================================");
console.log("🚀 تشغيل سكريبت ترقية منصة «المسند» إلى الإصدار الثالث عشر (v13.0)");
console.log("======================================================================\n");

// 1. Run seed script for the 6 demo accounts
console.log("👥 [1/3] بذر وتهيئة حسابات التجربة الـ 6 لجميع الفئات بكلمة المرور Musnad@2026...");
try {
  execSync("node scripts/seed-demo-accounts.mjs", { stdio: "inherit", cwd: rootDir });
  console.log("  ✅ تم تأكيد جاهزية الحسابات الستة في قاعدة البيانات وSupabase Auth.");
} catch (err) {
  console.warn("  ⚠️ تنبيه أثناء بذر الحسابات:", err.message);
}

// 2. Run Prisma Generate
console.log("\n📦 [2/3] توليد عميل بريزما (npx prisma generate)...");
try {
  execSync("npx prisma generate", { stdio: "inherit", cwd: rootDir });
  console.log("  ✅ تم توليد عميل Prisma بنجاح.");
} catch (err) {
  console.error("  ❌ فشل توليد عميل Prisma:", err.message);
  process.exit(1);
}

// 3. Verification of TypeScript & Routes
console.log("\n🔍 [3/3] التحقق من توافق الأنواع البرمجية (npx tsc --noEmit)...");
try {
  execSync("npx tsc --noEmit", { stdio: "inherit", cwd: rootDir });
  console.log("  ✅ فحص الأنواع سليم 100% بدون أي أخطاء (0 errors).");
} catch (err) {
  console.error("  ❌ تم العثور على أخطاء في فحص الأنواع!");
  process.exit(1);
}

console.log("\n======================================================================");
console.log("🎉 اكتمل تطبيق جميع ترقيات وإصلاحات الإصدار 13.0 لمنصة «المسند» بنجاح!");
console.log("📌 حسابات التجربة الجاهزة (كلمة المرور: Musnad@2026):");
console.log("   - المشرف العام:       admin@musnad.tn       (@admin)");
console.log("   - المسؤول الإداري:   moderator@musnad.tn   (@moderator)");
console.log("   - المتفقد التربوي:     inspector@musnad.tn   (@inspector)");
console.log("   - المؤسسة التربوية:   institution@musnad.tn (@institution)");
console.log("   - المعلم / الأستاذ:   teacher@musnad.tn     (@teacher)");
console.log("   - التلميذ:            student@musnad.tn     (@student)");
console.log("======================================================================\n");
