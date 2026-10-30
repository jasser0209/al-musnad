import { PrismaClient, Role } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fzokicsiqbdmwsdcuojz.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6b2tpY3NpcWJkbXdzZGN1b2p6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzIyMDYzOSwiZXhwIjoyMTA4Nzk2NjM5fQ.hZOIvBQjQlpZMDBa6DUdjHAd1Q-73YiHmEJo5u42f7k";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface SeedAccount {
  email: string;
  username: string;
  password: string;
  name: string;
  role: Role;
  bio?: string;
  isVerified: boolean;
  school?: string;
  studentGrade?: string;
  inspectorCode?: string;
}

const PRIMARY_ADMIN: SeedAccount = {
  email: "bjasser123@gmail.com",
  username: "bjasser",
  password: "Jasserbes1M",
  name: "Jasser",
  role: Role.ADMIN,
  bio: "حساب المشرف العام الأساسي لمنصة المسند — إدارة النظام وصلاحيات الهرم الرقابي.",
  isVerified: true,
  school: "الإدارة العامة لمنصة المسند",
};

const DEV_DEMO_ACCOUNTS: SeedAccount[] = [
  {
    email: "admin@musnad.tn",
    username: "admin",
    password: "Musnad@2026",
    name: "المشرف العام",
    role: Role.ADMIN,
    bio: "حساب المشرف العام القيادي لمنصة المسند — إدارة النظام وصلاحيات الهرم الرقابي.",
    isVerified: true,
    school: "الإدارة العامة لمنصة المسند",
  },
  {
    email: "moderator@musnad.tn",
    username: "moderator",
    password: "Musnad@2026",
    name: "المسؤول الإداري",
    role: Role.MODERATOR,
    bio: "حساب المسؤول الإداري — معالجة البلاغات، مراجعة النشرات، وإدارة الدعم الفني.",
    isVerified: true,
    school: "مكتب الإدارة والمتابعة",
  },
  {
    email: "inspector@musnad.tn",
    username: "inspector",
    password: "Musnad@2026",
    name: "المتفقد التربوي",
    role: Role.INSPECTOR,
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
    role: Role.INSTITUTION,
    bio: "مؤسسة تربوية نموذجية — فضاء رسمي للتنسيق وتبادل المبادرات والنماذج الإدارية.",
    isVerified: true,
    school: "المدرسة الابتدائية النموذجية المسند",
  },
  {
    email: "teacher@musnad.tn",
    username: "teacher",
    password: "Musnad@2026",
    name: "أحمد المسند",
    role: Role.TEACHER,
    bio: "معلم متميز ناشر — إعداد وتوزيع الجذاذات والفروض والأنشطة التفاعلية.",
    isVerified: true,
    school: "مدرسة المسند الابتدائية",
  },
  {
    email: "student@musnad.tn",
    username: "student",
    password: "Musnad@2026",
    name: "يوسف المسند",
    role: Role.STUDENT,
    bio: "تلميذ مجتهد بالمسند — فضاء المراجعة والأنشطة البيداغوجية.",
    isVerified: false,
    school: "مدرسة المسند الابتدائية",
    studentGrade: "السنة الخامسة ابتدائي",
  },
];

async function main() {
  console.log("🌱 Seeding Al-Musnad v13.0 taxonomy & 6 demo accounts...");

  const grades = [
    { name: "Grade 1", nameAr: "السنة الأولى ابتدائي", slug: "grade-1", sortOrder: 1 },
    { name: "Grade 2", nameAr: "السنة الثانية ابتدائي", slug: "grade-2", sortOrder: 2 },
    { name: "Grade 3", nameAr: "السنة الثالثة ابتدائي", slug: "grade-3", sortOrder: 3 },
    { name: "Grade 4", nameAr: "السنة الرابعة ابتدائي", slug: "grade-4", sortOrder: 4 },
    { name: "Grade 5", nameAr: "السنة الخامسة ابتدائي", slug: "grade-5", sortOrder: 5 },
    { name: "Grade 6", nameAr: "السنة السادسة ابتدائي", slug: "grade-6", sortOrder: 6 },
  ];

  for (const grade of grades) {
    await prisma.grade.upsert({
      where: { slug: grade.slug },
      update: { name: grade.name, nameAr: grade.nameAr, sortOrder: grade.sortOrder },
      create: grade,
    });
  }
  console.log(`  ✅ ${grades.length} grade levels seeded`);

  const subjects = [
    { name: "Mathematics", nameAr: "الرياضيات", slug: "math", color: "#DC2626", icon: "calculator", sortOrder: 1 },
    { name: "Science", nameAr: "العلوم (الإيقاظ العلمي)", slug: "science", color: "#16A34A", icon: "flask-conical", sortOrder: 2 },
    { name: "Arabic", nameAr: "العربية", slug: "arabic", color: "#2563EB", icon: "book-open", sortOrder: 3 },
    { name: "French", nameAr: "الفرنسية", slug: "french", color: "#4F46E5", icon: "languages", sortOrder: 4 },
    { name: "English", nameAr: "الإنجليزية", slug: "english", color: "#9333EA", icon: "globe", sortOrder: 5 },
    { name: "History & Geography", nameAr: "التاريخ والجغرافيا", slug: "history-geography", color: "#D97706", icon: "compass", sortOrder: 6 },
    { name: "Arts", nameAr: "الفنون", slug: "art", color: "#DB2777", icon: "palette", sortOrder: 7 },
    { name: "Islamic Education", nameAr: "التربية الإسلامية", slug: "islamic-studies", color: "#0D9488", icon: "moon-star", sortOrder: 8 },
    { name: "Physical Education", nameAr: "التربية البدنية", slug: "pe", color: "#65A30D", icon: "dumbbell", sortOrder: 9 },
    { name: "Administration", nameAr: "المعاملات والوثائق الإدارية", slug: "administration", color: "#334155", icon: "briefcase", sortOrder: 10 },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {
        name: subject.name,
        nameAr: subject.nameAr,
        color: subject.color,
        icon: subject.icon,
        sortOrder: subject.sortOrder,
      },
      create: subject,
    });
  }
  console.log(`  ✅ ${subjects.length} subjects seeded`);

  const categories = [
    { name: "Lesson", nameAr: "درس", slug: "lesson", sortOrder: 1 },
    { name: "Exercise", nameAr: "تمرين", slug: "worksheet", sortOrder: 2 },
    { name: "Exam", nameAr: "امتحان", slug: "exam", sortOrder: 3 },
    { name: "Lesson Plan (Fiche)", nameAr: "جذاذة", slug: "lesson-plan", sortOrder: 4 },
    { name: "Interactive Activity", nameAr: "نشاط تفاعلي", slug: "activity", sortOrder: 5 },
    { name: "Other Material", nameAr: "أخرى", slug: "other", sortOrder: 6 },
    { name: "Administrative Documents", nameAr: "وثائق ومعاملات إدارية", slug: "administrative", sortOrder: 7 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        nameAr: category.nameAr,
        sortOrder: category.sortOrder,
      },
      create: category,
    });
  }
  console.log(`  ✅ ${categories.length} categories/sub-divisions seeded`);

  // Seed Accounts (Primary Admin is always seeded, Demo accounts only in development)
  const isProduction = process.env.NODE_ENV === "production";
  const accountsToSeed = [
    PRIMARY_ADMIN,
    ...(isProduction ? [] : DEV_DEMO_ACCOUNTS),
  ];

  console.log(`🌱 Seeding accounts (${accountsToSeed.length} accounts, Environment isProduction: ${isProduction})...`);
  try {
    const { data: listData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 });
    const authUsers = listData?.users || [];

    for (const acc of accountsToSeed) {
      let authUser = authUsers.find((u) => u.email?.toLowerCase() === acc.email.toLowerCase());

      if (authUser) {
        await supabase.auth.admin.updateUserById(authUser.id, {
          password: acc.password,
          email_confirm: true,
          user_metadata: { name: acc.name, username: acc.username, role: acc.role },
        });
      } else {
        const { data: created } = await supabase.auth.admin.createUser({
          email: acc.email,
          password: acc.password,
          email_confirm: true,
          user_metadata: { name: acc.name, username: acc.username, role: acc.role },
        });
        if (created?.user) authUser = created.user;
      }

      if (authUser) {
        await prisma.user.upsert({
          where: { email: acc.email },
          update: {
            id: authUser.id,
            username: acc.username,
            name: acc.name,
            role: acc.role,
            school: acc.school || null,
            bio: acc.bio || null,
            isVerified: acc.isVerified,
            studentGrade: acc.studentGrade || null,
            inspectorCode: acc.inspectorCode || null,
            isBanned: false,
            failedLoginAttempts: 0,
          },
          create: {
            id: authUser.id,
            email: acc.email,
            username: acc.username,
            name: acc.name,
            role: acc.role,
            school: acc.school || null,
            bio: acc.bio || null,
            isVerified: acc.isVerified,
            studentGrade: acc.studentGrade || null,
            inspectorCode: acc.inspectorCode || null,
            isBanned: false,
            failedLoginAttempts: 0,
            presenceStatus: "ONLINE",
          },
        });
        console.log(`  ✅ [${acc.role}] ${acc.name} (@${acc.username}) seeded.`);
      }
    }
  } catch (authErr) {
    console.warn("⚠️ Could not contact Supabase Admin API, seeding directly to Prisma:", authErr);
    for (const acc of accountsToSeed) {
      await prisma.user.upsert({
        where: { email: acc.email },
        update: {
          username: acc.username,
          name: acc.name,
          role: acc.role,
          isVerified: acc.isVerified,
        },
        create: {
          email: acc.email,
          username: acc.username,
          name: acc.name,
          role: acc.role,
          isVerified: acc.isVerified,
        },
      });
    }
  }

  console.log("\n🎉 Al-Musnad v16.0 complete seeding finished!");
  try {
    await prisma.user.updateMany({
      where: { role: Role.TEACHER, inspectorPending: true },
      data: { role: Role.INSPECTOR },
    });
  } catch {}
  try {
    await prisma.user.updateMany({
      where: { role: Role.TEACHER, inspectorPending: true },
      data: { role: Role.INSPECTOR },
    });
  } catch {}
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
