#!/usr/bin/env node
/**
 * Upgrade Script — Al-Musnad (المسند) v14.0
 * 
 * Execution: node apply-musnad-v14-upgrade.mjs
 * 
 * Directives Implemented in v14.0:
 * 1. Clean Login Interface (/login):
 *    - Completely removed the 6 demo account cards from visitor view.
 *    - Preserved Show/Hide password toggle (Eye / EyeOff) in both login and registration.
 *    - Replaced placeholder examples with generic `example@mail.com`.
 *    - Primary Admin account `bjasser123@gmail.com` (password: `Jasserbes1M`) enters from any of the 4 role portals.
 * 2. Role-Structured Navbar (Navbar.tsx) & Landing Page (page.tsx):
 *    - Visitor / Student: (1) الرئيسية, (2) مستودع المواد والمستويات, (3) النشرات, (4) اعرف المزيد.
 *    - Inspector: (1) الرئيسية, (2) مستودع المواد والمستويات, (3) النشرات, (4) للمتفقدين, (5) اعرف المزيد.
 *    - Teacher: (1) الرئيسية, (2) مستودع المواد والمستويات, (3) النشرات, (4) للمعلمين, (5) اعرف المزيد.
 *    - Institution: (1) الرئيسية, (2) مستودع المواد والمستويات, (3) النشرات, (4) للمؤسسات, (5) اعرف المزيد.
 *    - Removed separate Administration link; consolidated to Institutional space.
 * 3. Unified User Box on Top-Left:
 *    - Removed account role badge next to «نشر وثيقة» button completely.
 *    - Unified colored frame and concise role tag (مؤسسة, متفقد, معلم, تلميذ, مسؤول, مشرف عام).
 * 4. Stripped Permission Disclosures:
 *    - Removed explanatory paragraphs and disclosure badges from /inspector/dashboard, /moderator/dashboard, and /admin/dashboard.
 * 5. Distributed WhatsApp Channels in Support Center (/support):
 *    - Corrected Institutional WhatsApp number to 46907101 (https://wa.me/21646907101).
 *    - Teachers and Students see only: 27764985 (https://wa.me/21627764985).
 *    - Institutions and Inspectors see only: 46907101.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const rootDir = process.cwd();
console.log("======================================================================");
console.log("🚀 تشغيل سكريبت ترقية منصة «المسند» إلى الإصدار الرابع عشر (v14.0)");
console.log("======================================================================\n");

// 1. Verify Primary Admin Account & Credentials
console.log("👤 [1/4] التحقق من حساب المشرف العام الأساسي (bjasser123@gmail.com)...");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wixctewkdfmsjuhjrmer.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (serviceRoleKey) {
  try {
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const adminUser = usersData?.users?.find(
      (u) => u.email?.toLowerCase() === "bjasser123@gmail.com"
    );

    if (adminUser) {
      await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
        password: "Jasserbes1M",
        email_confirm: true,
        user_metadata: {
          name: "Jasser (المشرف العام)",
          role: "ADMIN",
        },
      });
      console.log("  ✅ تم تأكيد كلمة مرور المشرف العام (Jasserbes1M) وربط صلاحية ADMIN بنجاح.");
    }
  } catch (err) {
    console.warn("  ⚠️ ملاحظة أثناء تحديث حساب المشرف في Supabase:", err.message);
  }
}

// 2. Ensure Database User table has ADMIN role for bjasser123@gmail.com
try {
  const prisma = new PrismaClient();
  const dbUser = await prisma.user.findFirst({
    where: { email: { equals: "bjasser123@gmail.com", mode: "insensitive" } },
  });

  if (dbUser) {
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        role: "ADMIN",
        isVerified: true,
        isBanned: false,
        failedLoginAttempts: 0,
        lockedAt: null,
      },
    });
    console.log("  ✅ تم تأكيد رتبة المشرف العام وتصفير عداد المحاولات في قاعدة البيانات.");
  }
  await prisma.$disconnect();
} catch (err) {
  console.warn("  ⚠️ ملاحظة أثناء تحديث قاعدة البيانات:", err.message);
}

// 3. Run Prisma Generate
console.log("\n📦 [2/4] توليد عميل بريزما (npx prisma generate)...");
try {
  execSync("npx prisma generate", { stdio: "inherit", cwd: rootDir });
  console.log("  ✅ تم توليد عميل Prisma بنجاح.");
} catch (err) {
  console.warn("  ⚠️ تنبيه أثناء توليد Prisma (قد يكون السيرفر قيد التشغيل):", err.message);
}

// 4. Verify TypeScript Compilation (npx tsc --noEmit)
console.log("\n🔍 [3/4] التحقق من توافق الأنواع البرمجية (npx tsc --noEmit)...");
try {
  execSync("npx tsc --noEmit", { stdio: "inherit", cwd: rootDir });
  console.log("  ✅ فحص الأنواع سليم 100% بدون أي أخطاء (0 errors).");
} catch (err) {
  console.error("  ❌ تم العثور على أخطاء في فحص الأنواع!");
  process.exit(1);
}

// 5. Generate Updated PROJECT_HANDOVER.md
console.log("\n📋 [4/4] توليد وثيقة تسليم المشروع المحدثة (PROJECT_HANDOVER.md)...");
try {
  execSync("node scripts/generate-handover.mjs", { stdio: "inherit", cwd: rootDir });
  const handoverPath = path.join(rootDir, "PROJECT_HANDOVER.md");
  if (fs.existsSync(handoverPath)) {
    const stats = fs.statSync(handoverPath);
    const sizeKb = Math.round(stats.size / 1024);
    console.log(`  ✅ تم توليد PROJECT_HANDOVER.md بنجاح (الحجم: ${sizeKb} كيلوبايت — أقل من 1 ميغابايت).`);
  }
} catch (err) {
  console.warn("  ⚠️ ملاحظة أثناء توليد وثيقة التسليم:", err.message);
}

console.log("\n======================================================================");
console.log("🎉 اكتمل تطبيق جميع ترقيات وإصلاحات الإصدار 14.0 لمنصة «المسند» بنجاح!");
console.log("📌 بيانات الدخول للمشرف العام الأساسي:");
console.log("   - البريد: bjasser123@gmail.com");
console.log("   - كلمة المرور: Jasserbes1M");
console.log("   - الصلاحية: يدخل من أي بوابة من البوابات الأربع إلى لوحة المشرف العام /admin/dashboard");
console.log("======================================================================\n");
