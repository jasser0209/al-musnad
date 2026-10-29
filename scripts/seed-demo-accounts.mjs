/**
 * Seed 6 Demo Accounts for Al-Musnad v13.0
 * 
 * Accounts:
 * 1. ADMIN:       admin@musnad.tn       / @admin       / Musnad@2026
 * 2. MODERATOR:   moderator@musnad.tn   / @moderator   / Musnad@2026
 * 3. INSPECTOR:   inspector@musnad.tn   / @inspector   / Musnad@2026
 * 4. INSTITUTION: institution@musnad.tn / @institution / Musnad@2026
 * 5. TEACHER:     teacher@musnad.tn     / @teacher     / Musnad@2026
 * 6. STUDENT:     student@musnad.tn     / @student     / Musnad@2026
 */

import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fzokicsiqbdmwsdcuojz.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6b2tpY3NpcWJkbXdzZGN1b2p6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzIyMDYzOSwiZXhwIjoyMTA4Nzk2NjM5fQ.hZOIvBQjQlpZMDBa6DUdjHAd1Q-73YiHmEJo5u42f7k";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const prisma = new PrismaClient();

export const DEMO_ACCOUNTS = [
  {
    email: "admin@musnad.tn",
    username: "admin",
    password: "Musnad@2026",
    name: "المشرف العام",
    role: "ADMIN",
    bio: "حساب المشرف العام القيادي لمنصة المسند — إدارة النظام وصلاحيات الهرم الرقابي.",
    isVerified: true,
    school: "الإدارة العامة لمنصة المسند",
  },
  {
    email: "moderator@musnad.tn",
    username: "moderator",
    password: "Musnad@2026",
    name: "المسؤول الإداري",
    role: "MODERATOR",
    bio: "حساب المسؤول الإداري — معالجة البلاغات، مراجعة النشرات، وإدارة الدعم الفني.",
    isVerified: true,
    school: "مكتب الإدارة والمتابعة",
  },
  {
    email: "inspector@musnad.tn",
    username: "inspector",
    password: "Musnad@2026",
    name: "المتفقد التربوي",
    role: "INSPECTOR",
    bio: "متفقد تربوي معتمد — اعتماد المنشورات البيداغوجية ومنح شارة الاعتماد ★.",
    isVerified: true,
    school: "الدائرة البيداغوجية والتفقد",
    inspectorCode: "INSP-DEMO-2026",
  },
  {
    email: "institution@musnad.tn",
    username: "institution",
    password: "Musnad@2026",
    name: "مؤسسة المسند التربوية",
    role: "INSTITUTION",
    bio: "مؤسسة تربوية نموذجية — فضاء رسمي للتنسيق وتبادل المبادرات والنماذج الإدارية.",
    isVerified: true,
    school: "المدرسة الابتدائية النموذجية المسند",
  },
  {
    email: "teacher@musnad.tn",
    username: "teacher",
    password: "Musnad@2026",
    name: "الأستاذ أحمد المسند",
    role: "TEACHER",
    bio: "معلم متميز ناشر — إعداد وتوزيع الجذاذات والفروض والأنشطة التفاعلية.",
    isVerified: true,
    school: "مدرسة المسند الابتدائية",
  },
  {
    email: "student@musnad.tn",
    username: "student",
    password: "Musnad@2026",
    name: "التلميذ يوسف المسند",
    role: "STUDENT",
    bio: "تلميذ مجتهد بالمسند — فضاء المراجعة والأنشطة البيداغوجية.",
    isVerified: false,
    school: "مدرسة المسند الابتدائية",
    studentGrade: "السنة الخامسة ابتدائي",
  },
];

export async function seedDemoAccounts() {
  console.log("🚀 جاري تهيئة وبذر حسابات التجربة الـ 6 لمنصة المسند...");

  const { data: listData, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 100,
  });

  if (listError) {
    console.error("❌ فشل الاتصال بواجهة Supabase Auth Admin:", listError.message);
    throw listError;
  }

  const existingAuthUsers = listData?.users || [];

  for (const account of DEMO_ACCOUNTS) {
    let authUser = existingAuthUsers.find(
      (u) => u.email?.toLowerCase() === account.email.toLowerCase()
    );

    if (authUser) {
      console.log(`🔄 تحديث كلمة المرور للحساب ${account.email}...`);
      const { data: updated, error: updateErr } = await supabase.auth.admin.updateUserById(
        authUser.id,
        {
          password: account.password,
          email_confirm: true,
          user_metadata: {
            name: account.name,
            username: account.username,
            role: account.role,
          },
        }
      );
      if (updateErr) {
        console.warn(`⚠️ تعذر تحديث الحساب ${account.email}:`, updateErr.message);
      } else if (updated.user) {
        authUser = updated.user;
      }
    } else {
      console.log(`➕ إنشاء حساب جديد في Supabase Auth: ${account.email}...`);
      const { data: created, error: createErr } = await supabase.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: {
          name: account.name,
          username: account.username,
          role: account.role,
        },
      });
      if (createErr) {
        console.error(`❌ فشل إنشاء ${account.email}:`, createErr.message);
        continue;
      }
      authUser = created.user;
    }

    if (!authUser) continue;

    // Upsert user in PostgreSQL Prisma DB
    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        id: authUser.id,
        username: account.username,
        name: account.name,
        role: account.role,
        school: account.school || null,
        bio: account.bio || null,
        isVerified: account.isVerified,
        studentGrade: account.studentGrade || null,
        inspectorCode: account.inspectorCode || null,
        isBanned: false,
        failedLoginAttempts: 0,
        lockedAt: null,
      },
      create: {
        id: authUser.id,
        email: account.email,
        username: account.username,
        name: account.name,
        role: account.role,
        school: account.school || null,
        bio: account.bio || null,
        isVerified: account.isVerified,
        studentGrade: account.studentGrade || null,
        inspectorCode: account.inspectorCode || null,
        isBanned: false,
        failedLoginAttempts: 0,
        presenceStatus: "ONLINE",
      },
    });

    console.log(`  ✅ [${account.role}] ${account.name} (@${account.username}) -> جاهز 100%`);
  }

  console.log("\n🎉 اكتملت تهيئة وبذر جميع حسابات التجربة الـ 6 بنجاح تام!");
}

if (process.argv[1]?.endsWith("seed-demo-accounts.mjs")) {
  seedDemoAccounts()
    .catch((err) => {
      console.error("❌ خطأ أثناء البذر:", err);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
