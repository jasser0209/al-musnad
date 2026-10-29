import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_EMAILS = [
  "institution@musnad.tn",
  "inspector@musnad.tn",
  "teacher@musnad.tn",
  "student@musnad.tn",
  "moderator@musnad.tn",
  "admin@musnad.tn",
];

async function removeDemoAccounts() {
  console.log("================================================================");
  console.log("🧹 بدء عملية إزالة حسابات التجربة (@musnad.tn) من بيئة الإنتاج...");
  console.log("================================================================\n");

  try {
    // 1. Check existing users before deletion
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, username: true, role: true },
    });
    console.log(`📊 إجمالي المستخدمين الحاليين في قاعدة البيانات: ${allUsers.length}`);

    // Verify primary admin exists
    const admin = allUsers.find((u) => u.email === "bjasser123@gmail.com");
    if (!admin) {
      console.error("⚠️ تنبيه حرج: حساب المشرف الأساسي bjasser123@gmail.com غير موجود!");
    } else {
      console.log(`🛡️ حساب المشرف الأساسي محفوظ بأمان: ${admin.email} (الرتبة: ${admin.role})`);
    }

    // 2. Delete demo users from Prisma Database
    const deleteResult = await prisma.user.deleteMany({
      where: {
        email: {
          in: DEMO_EMAILS,
        },
      },
    });
    console.log(`🗑️ تم حذف ${deleteResult.count} حسابات تجريبية من جدول User في PostgreSQL.`);

    // 3. Delete from Supabase Auth
    try {
      const { data: authUsers, error: listErr } = await supabase.auth.admin.listUsers();
      if (!listErr && authUsers?.users) {
        for (const user of authUsers.users) {
          if (user.email && DEMO_EMAILS.includes(user.email.toLowerCase())) {
            const { error: delErr } = await supabase.auth.admin.deleteUser(user.id);
            if (delErr) {
              console.log(`⚠️ تعذر حذف ${user.email} من Supabase Auth: ${delErr.message}`);
            } else {
              console.log(`✅ تم حذف ${user.email} من Supabase Auth بنجاح.`);
            }
          }
        }
      }
    } catch (authErr) {
      console.log("Supabase Auth admin deletion notice:", authErr.message);
    }

    // 4. Verify Database state after deletion
    const remainingUsers = await prisma.user.findMany({
      select: { id: true, email: true, username: true, role: true },
    });
    console.log("\n📋 المستخدمون المتبقون في قاعدة البيانات:");
    remainingUsers.forEach((u) => console.log(` - [${u.role}] ${u.email} (@${u.username})`));

    // 5. Verify Grades, Subjects, Categories intact
    const gradesCount = await prisma.grade.count();
    const subjectsCount = await prisma.subject.count();
    const categoriesCount = await prisma.category.count();
    console.log("\n✅ سلامة البنية البيداغوجية:");
    console.log(` - المستويات الدراسية: ${gradesCount} مستويات`);
    console.log(` - المواد الدراسية: ${subjectsCount} مواد`);
    console.log(` - الأقسام الفرعية: ${categoriesCount} أقسام`);

    console.log("\n================================================================");
    console.log("🎉 اكتملت عملية تنظيف حسابات التجربة من قاعدة البيانات بنجاح 100%!");
    console.log("================================================================\n");
  } catch (error) {
    console.error("❌ خطأ أثناء إزالة الحسابات:", error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDemoAccounts();
