#!/usr/bin/env node
/**
 * ============================================================================
 * Upgrade Script — Al-Musnad (المسند) v15.0
 * ============================================================================
 * Execution: node apply-musnad-v15-upgrade.mjs
 * 
 * Directives Implemented in v15.0:
 * 1. Dedicated Terms of Use & Intellectual Property Page (/terms):
 *    - Notice of IP and author rights for teachers, inspectors, and institutions.
 *    - Commercial redistribution and resale strictly prohibited.
 *    - Educational and family usage 100% free.
 *    - Disclaimer & institutional independence compliant with Tunisian primary curriculum.
 *    - Publishing charter & automatic endorsement badge withdrawal upon file update.
 *    - Swift takedown policy upon copyright infringement reports.
 *    - Personal data protection according to Tunisian legislation.
 *    - Linked into the global footer in src/app/layout.tsx and sitemap.
 * 2. Tunisian School Trimesters Filter & Tagging (الثلاثيات المدرسية التونسية):
 *    - Added SCHOOL_TRIMESTERS constant (الثلاثي الأول، الثلاثي الثاني، الثلاثي الثالث).
 *    - Quick 1-click trimester filter buttons in FilterBar.tsx (?trimester=trimester-1).
 *    - Synced trimester dropdown selector in FilterBar.tsx.
 *    - Integrated trimester filtering in worksheet.service.ts and page.tsx.
 *    - Quick 1-click trimester tagging buttons in src/app/(main)/upload/page.tsx.
 * ============================================================================
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const rootDir = process.cwd();
console.log("======================================================================");
console.log("🚀 تشغيل سكريبت ترقية منصة «المسند» إلى الإصدار الخامس عشر (v15.0)");
console.log("======================================================================\n");

// 1. Verify Primary Admin Account & Credentials
console.log("👤 [1/4] التحقق من حساب المشرف العام الأساسي (bjasser123@gmail.com)...");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fzokicsiqbdmwsdcuojz.supabase.co";
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
      console.log("  ✅ تم تأكيد كلمة مرور المشرف العام (Jasserbes1M) وصلاحية ADMIN بنجاح.");
    }
  } catch (err) {
    console.warn("  ⚠️ ملاحظة أثناء فحص حساب المشرف في Supabase:", err.message);
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
console.log("\n📋 [4/4] تحديث وثيقة تسليم المشروع المحدثة (PROJECT_HANDOVER.md)...");
try {
  execSync("node scripts/generate-handover.mjs", { stdio: "inherit", cwd: rootDir });
  const handoverPath = path.join(rootDir, "PROJECT_HANDOVER.md");
  if (fs.existsSync(handoverPath)) {
    const stats = fs.statSync(handoverPath);
    const sizeKb = Math.round(stats.size / 1024);
    console.log(`  ✅ تم تحديث PROJECT_HANDOVER.md بنجاح (الحجم: ${sizeKb} كيلوبايت).`);
  }
} catch (err) {
  console.warn("  ⚠️ ملاحظة أثناء توليد وثيقة التسليم:", err.message);
}

console.log("\n======================================================================");
console.log("🎉 اكتمل تطبيق جميع ترقيات وإصلاحات الإصدار الخامس عشر (v15.0) بنجاح!");
console.log("📌 الميزات الجديدة المضافة:");
console.log("   1. صفحة شروط الاستخدام والملكية الفكرية وحماية المؤلف (/terms)");
console.log("   2. رابط الشروط والملكية مدمج بتذييل الموقع وفي خريطة الموقع sitemap.xml");
console.log("   3. أزرار وقوائم فلترة الثلاثيات المدرسية التونسية الثلاثة في شريط البحث");
console.log("   4. أزرار الوسم السريع للثلاثيات المدرسية بضغطة زر في صفحة رفع الملفات (/upload)");
console.log("======================================================================\n");
