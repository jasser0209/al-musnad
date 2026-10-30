/**
 * Database Seed Script — Al-Musnad (المسند) v11.0
 *
 * Seeds:
 * 1. The 6 Primary Grade Levels: السنة الأولى ابتدائي .. السنة السادسة ابتدائي
 * 2. The 9 Academic Subjects + Administrative Section:
 *    الرياضيات، العلوم (الإيقاظ العلمي)، العربية، الفرنسية، الإنجليزية،
 *    التاريخ والجغرافيا، الفنون، التربية الإسلامية، التربية البدنية، والمعاملات الإدارية.
 * 3. The 5 Subject Sub-divisions + Administrative Category:
 *    درس، تمارين، امتحانات، جذاذات، أنشطة تفاعلية، ووثائق ومعاملات إدارية.
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Al-Musnad v11.0 taxonomy...");

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

  console.log("\n🎉 Al-Musnad v11.0 seeding complete!");
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