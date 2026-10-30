import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const outputFile = path.join(rootDir, "PROJECT_HANDOVER.md");
const outputPart1 = path.join(rootDir, "PROJECT_HANDOVER_PART1.md");
const outputPart2 = path.join(rootDir, "PROJECT_HANDOVER_PART2.md");

// Complete inventory of all 100 project source files (WITHOUT duplicate generated bundle files so total size stays < 800 KB / < 1 MB)
const part1Files = [
  // 1. Configs, Tooling & Automation Scripts
  "package.json",
  "tsconfig.json",
  "next.config.ts",
  "tailwind.config.ts",
  "postcss.config.mjs",
  ".env.example",
  "README.md",
  "apply-musnad-v16-upgrade.mjs",
  "scripts/extract-handover.mjs",
  "scripts/generate-handover.mjs",
  "scripts/verify-and-connect.mjs",
  "scripts/backfill-usernames.mjs",

  // 2. Database Schema, Seed & SQL Policies
  "prisma/schema.prisma",
  "prisma/seed.ts",
  "supabase/sql/rls-policies.sql",
  "supabase/sql/triggers.sql",
  "supabase/sql/setup-complete-supabase.sql",

  // 3. Constants & Types
  "src/config/constants.ts",
  "src/types/api.ts",
  "src/types/index.ts",

  // 4. Libraries, Security & Validators
  "src/lib/db.ts",
  "src/lib/security/rate-limit.ts",
  "src/lib/supabase/client.ts",
  "src/lib/supabase/server.ts",
  "src/lib/supabase/middleware.ts",
  "src/lib/utils/api-response.ts",
  "src/lib/utils/errors.ts",
  "src/lib/utils/pagination.ts",
  "src/lib/utils/pdf-thumbnail.ts",
  "src/lib/validators/auth.ts",
  "src/lib/validators/common.ts",
  "src/lib/validators/worksheet.ts",
  "src/lib/validators/review.ts",

  // 5. Service Layer
  "src/services/worksheet.service.ts",
  "src/services/storage.service.ts",
  "src/services/email.service.ts",
  "src/services/favorite.service.ts",
  "src/services/download.service.ts",
  "src/services/review.service.ts",
  "src/services/audit.service.ts",

  // 6. Edge Middleware & Metadata Routes
  "src/middleware.ts",
  "src/app/manifest.ts",
  "src/app/robots.ts",
  "src/app/sitemap.ts",

  // 7. API Route Handlers
  "src/app/api/auth/callback/route.ts",
  "src/app/api/auth/me/route.ts",
  "src/app/api/auth/resolve-username/route.ts",
  "src/app/api/auth/login-guard/route.ts",
  "src/app/api/me/presence/route.ts",
  "src/app/api/worksheets/route.ts",
  "src/app/api/worksheets/[id]/route.ts",
  "src/app/api/worksheets/[id]/download/route.ts",
  "src/app/api/worksheets/[id]/file/route.ts",
  "src/app/api/worksheets/[id]/thumbnail/route.ts",
  "src/app/api/worksheets/[id]/favorite/route.ts",
  "src/app/api/worksheets/[id]/review/route.ts",
  "src/app/api/worksheets/[id]/reviews/route.ts",
  "src/app/api/grades/route.ts",
  "src/app/api/subjects/route.ts",
  "src/app/api/categories/route.ts",
  "src/app/api/me/favorites/route.ts",
  "src/app/api/me/downloads/route.ts",
  "src/app/api/me/uploads/route.ts",
  "src/app/api/notifications/route.ts",
  "src/app/api/users/mentions/route.ts",
  "src/app/api/health/route.ts",

  // 8. Server Actions
  "src/actions/worksheet.actions.ts",
  "src/actions/favorite.actions.ts",
  "src/actions/profile.actions.ts",
  "src/actions/admin.actions.ts",
  "src/actions/moderator.actions.ts",
  "src/actions/inspector.actions.ts",
  "src/actions/publisher.actions.ts",
  "src/actions/report-support.actions.ts",
];

const part2Files = [
  // 9. Frontend Styles, Context & Shared Components
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/not-found.tsx",
  "src/app/error.tsx",
  "src/context/AppPreferencesContext.tsx",
  "src/components/auth/AuthRoleModal.tsx",
  "src/components/layout/Navbar.tsx",
  "src/components/layout/SupervisoryHierarchyBar.tsx",
  "src/components/ui/InspectorBadge.tsx",
  "src/components/ui/InstallPwaBanner.tsx",
  "src/components/ui/MentionText.tsx",
  "src/components/ui/UserPresenceIndicator.tsx",
  "src/components/ui/SubjectIcon.tsx",
  "src/components/worksheets/RolePersonalizedHub.tsx",
  "src/components/home/PlatformIdentityAndFaqSection.tsx",
  "src/components/profile/ArchivedSubscriptionsPlans.tsx",
  "src/components/worksheets/FilterBar.tsx",
  "src/components/worksheets/WorksheetCard.tsx",
  "src/components/worksheets/WorksheetDetailClient.tsx",
  "src/components/worksheets/ReviewSection.tsx",
  "src/components/worksheets/CurriculumAndAdminExplorer.tsx",

  // 10. Application Pages & Route Views
  "src/app/page.tsx",
  "src/app/(main)/terms/page.tsx",
  "src/app/(main)/browse/page.tsx",
  "src/app/(main)/levels/page.tsx",
  "src/app/(main)/levels/[gradeSlug]/page.tsx",
  "src/app/(main)/levels/[gradeSlug]/subjects/[subjectSlug]/page.tsx",
  "src/app/(main)/worksheet/[id]/page.tsx",
  "src/app/(main)/upload/page.tsx",
  "src/app/(main)/publisher/[id]/page.tsx",
  "src/app/(main)/u/[username]/page.tsx",
  "src/app/(main)/profile/page.tsx",
  "src/app/(main)/support/page.tsx",
  "src/app/(main)/inspector/activate/page.tsx",
  "src/app/(main)/inspector/register/page.tsx",
  "src/app/(auth)/login/page.tsx",
  "src/app/(auth)/register/page.tsx",
  "src/app/(auth)/register/inspector/page.tsx",
  "src/app/inspector/dashboard/page.tsx",
  "src/app/moderator/dashboard/page.tsx",
  "src/app/admin/dashboard/page.tsx",
];

const allFiles = [...part1Files, ...part2Files];

function getLanguage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".ts" || ext === ".tsx") return "typescript";
  if (ext === ".prisma") return "prisma";
  if (ext === ".sql") return "sql";
  if (ext === ".json") return "json";
  if (ext === ".css") return "css";
  if (ext === ".mjs" || ext === ".js") return "javascript";
  if (ext === ".md") return "markdown";
  return "text";
}

const strictHeader = (titleSuffix = "") => `# 🏛️ Project Handover & Master Technical Audit — Al-Musnad (v16.0) ${titleSuffix}
**Project:** Al-Musnad (المسند) — Integrated Educational & Pedagogical Platform  
**Architecture:** Next.js 15 (App Router) + TypeScript + Prisma ORM + PostgreSQL (Supabase) + Cloudflare R2 + Tailwind CSS + Lucide Icons  
**Version:** 15.0.0 (Optimized Handover Archive — Complete Source Code, Security Configs & Commands)  
**Date:** October 2026  
**Primary Admin Account:** \`bjasser123@gmail.com\` (Password: \`Jasserbes1M\` — Role: \`ADMIN\`)  
**Live Production URL:** [https://al-musnad.vercel.app](https://al-musnad.vercel.app)  
**GitHub Repository:** [https://github.com/jasser0209/al-musnad.git](https://github.com/jasser0209/al-musnad.git)  

---

## 🤖 القواعد الصارمة والتعليمات الإلزامية للمشروع (PROJECT ARCHITECTURE & RULES)

أنت المهندس المعماري المسؤول عن تطوير وصيانة منصة **«المسند» (Al-Musnad v15.0)**. عند قراءة هذا الملف أو تنفيذ أي تعديل مستقبلي، **يجب الالتزام الصارم بالقواعد التالية**:

1. **قاعدة الحجم الأقصى (< 1 MB) ومنع التكرار**:
   - الحجم الأقصى لملف \`PROJECT_HANDOVER.md\` يجب أن يبقى دائماً **أقل من 1 ميجابايت (1,000 KB)**.
   - عدم تضمين حزم JSON الضخمة المكررة داخل الملف للحفاظ على خفته وسرعة معالجته.
2. **منع اختصار الأكواد (Zero Truncation Policy)**:
   - يُمنع استخدام تعليقات الاختصار مثل \`// ... rest of code\`. جميع الأكواد المضمنة كاملة وقابلة للتشغيل الفوري.
3. **شروط الاستخدام والملكية الفكرية وحماية المؤلف (/terms)**:
   - كافة الجذاذات والفروض والامتحانات المنشورة ملك فكري لأصحابها من المعلمين والمتفقدين والمؤسسات، ومتاحة مجاناً للاستخدام البيداغوجي غير التجاري.
   - يُحظر إعادة بيع أو تجميع أي محتوى في مطبوعات تجارية مدفوعة دون إذن كتابي مسبق.
   - سحب شارة «معتمد بيداغوجياً» تلقائياً عند قيام الناشر بتعديل أو استبدال الملف المرفق لحين إعادة مراجعته من المتفقد المختص.
   - تطبيق سياسة الحذف الفوري (Takedown Policy) عند الإبلاغ عن أي انتهاك للملكية الفكرية.
4. **نظام الثلاثيات المدرسية التونسية (SCHOOL_TRIMESTERS)**:
   - دعم رسمي للثلاثيات الثلاثة: الثلاثي الأول، الثلاثي الثاني، الثلاثي الثالث.
   - فلاتر سريعة بضغطة زر وقائمة منسدلة متزامنة مع الرابط في \`FilterBar.tsx\` (\`?trimester=trimester-1\`).
   - ربط فلتر الثلاثي بمحرك البحث وقاعدة البيانات في \`worksheet.service.ts\` و \`page.tsx\`.
   - أزرار الوسم السريع للثلاثي بضغطة زر واحدة في صفحة الرفع \`/upload\`.
5. **مربع اسم المستخدم في الشريط العلوي (Navbar.tsx)**:
   - إزالة النص الدال على نوع الحساب من جانب اسم المستخدم ليظهر الاسم كاملاً وواضحاً.
   - الحفاظ التام على تمييز الألوان في إطار وخلفية مربع الاسم حسب الفئة:
     - المشرف العام (\`ADMIN\`): بنفسجي ملكي (Purple).
     - المسؤول الإداري (\`MODERATOR\`): نيلي (Indigo).
     - المتفقد التربوي (\`INSPECTOR\`): ذهبي كهرماني (Amber).
     - المؤسسة التربوية (\`INSTITUTION\`): أرجواني (Violet).
     - المعلم (\`TEACHER\`): أزرق (Blue).
     - التلميذ (\`STUDENT\`): أخضر زمردي (Emerald).
6. **ترويسات الأمان الصارمة (HTTP Security Headers - A+ Rating)**:
   - تطبيق ترويسات الأمان الصارمة في \`next.config.ts\`: \`X-Frame-Options: SAMEORIGIN\`، \`X-Content-Type-Options: nosniff\`، \`Strict-Transport-Security\`، \`Permissions-Policy\`، \`Referrer-Policy\`، \`X-XSS-Protection\`.
   - السماح بمعاينة وثائق PDF والصور بأمان من سحابة Cloudflare R2 و Supabase دون حظر CORS أو Clickjacking.
7. **سحابة التخزين المزدوجة (Cloudflare R2 10GB + Supabase Storage Fallback)**:
   - الاعتماد الأساسي على Cloudflare R2 بسعة 10 جيجابايت مجانية مع بقاء Supabase Storage كخيار احتياطي فوري.
8. **تطبيق الويب التقدمي (PWA)**:
   - ملف مواصفات رسمي \`src/app/manifest.ts\` مع أيقونات 192 و 512 وبنر تثبيت ذكي \`InstallPwaBanner.tsx\`.
9. **محركات البحث وأدوات الويب (SEO & Google Search Console)**:
   - كود التحقق الرسمي لمحرك بحث جوجل في \`src/app/layout.tsx\`.
   - خريطة موقع ديناميكية \`src/app/sitemap.ts\` وملف توجيه الروبوتات \`src/app/robots.ts\`.
10. **خدمة البريد الإلكتروني (Resend)**:
    - \`src/services/email.service.ts\` مع قوالب HTML ترحيبية وإشعارات الدعم والاعتماد البيداغوجي وتراجع آمن (Graceful Fallback).
11. **هرم الإشراف الثلاثي وعزل الصلاحيات الصارم**:
    - المشرف العام (\`ADMIN\`): قمة الهرم والتحكم الإداري الكامل والتبديل بين اللوحات.
    - المسؤول الإداري (\`MODERATOR\`): محصور في \`/moderator/dashboard\`.
    - المتفقد التربوي (\`INSPECTOR\`): محصور في \`/inspector/dashboard\`.

---

## 🛠️ أوامر التشغيل والترقية الرسمية (Official CLI Commands)

- **1. تشغيل سكريبت ترقية الإصدار 15.0 الشامل:**
  \`\`\`bash
  node apply-musnad-v16-upgrade.mjs
  \`\`\`
- **2. فحص سلامة الأنواع البرمجية (TypeScript Check):**
  \`\`\`bash
  npx tsc --noEmit
  \`\`\`
- **3. بناء نسخة الإنتاج الحية (Next.js Production Build):**
  \`\`\`bash
  npm run build
  \`\`\`
- **4. تحديث وثائق التسليم تلقائياً:**
  \`\`\`bash
  node scripts/generate-handover.mjs
  \`\`\`
- **5. الالتزام والمزامنة المباشرة مع GitHub و Vercel:**
  \`\`\`bash
  git add .
  git commit -m "Update project handover documentation"
  git push
  \`\`\`

---
`;

function buildMarkdownForFiles(fileList, titleSuffix, footerNote) {
  let md = strictHeader(titleSuffix);
  md += `\n## 📂 Complete Source Code (${fileList.length} Files)\n`;
  let count = 0;
  for (const relPath of fileList) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }
    let fileContent = fs.readFileSync(fullPath, "utf-8");
    if (relPath.endsWith(".ts") || relPath.endsWith(".tsx")) {
      fileContent = fileContent
        .replace(/\/\*\*[\s\S]*?\*\/\s*/g, "")
        .replace(/\{\/\*[\s\S]*?\*\/\}\s*/g, "");
    }
    const lang = getLanguage(relPath);
    md += `\n### File: \`${relPath}\`\n\n\`\`\`${lang}\n${fileContent}\n\`\`\`\n\n---\n`;
    count++;
  }
  md += `\n*${footerNote} — Total included files: ${count}.*\n`;
  return md;
}

const fullMd = buildMarkdownForFiles(
  allFiles,
  "(Complete Single-File Edition < 1 MB)",
  "End of Master Project Handover Document (v12.0 Complete Single-File Edition)"
);
const part1Md = buildMarkdownForFiles(
  part1Files,
  "— الجزء الأول: البنية التحتية، قاعدة البيانات، الخدمات، الـ API، والـ Server Actions (Part 1 of 2)",
  "نهاية الجزء الأول (Part 1/2) — يتبع في الجزء الثاني (PROJECT_HANDOVER_PART2.md)"
);
const part2Md = buildMarkdownForFiles(
  part2Files,
  "— الجزء الثاني: المكونات، الواجهات، مستودع المواد، ولوحات الإشراف الثلاث (Part 2 of 2)",
  "نهاية الجزء الثاني (Part 2/2) — اكتملت جميع ملفات المشروع"
);

fs.writeFileSync(outputFile, fullMd, "utf-8");
fs.writeFileSync(outputPart1, part1Md, "utf-8");
fs.writeFileSync(outputPart2, part2Md, "utf-8");

console.log(`✅ PROJECT_HANDOVER.md (Complete): ${(Buffer.byteLength(fullMd, "utf8") / 1024).toFixed(1)} KB`);
console.log(`✅ PROJECT_HANDOVER_PART1.md (Backend/Core): ${(Buffer.byteLength(part1Md, "utf8") / 1024).toFixed(1)} KB`);
console.log(`✅ PROJECT_HANDOVER_PART2.md (Frontend/UI): ${(Buffer.byteLength(part2Md, "utf8") / 1024).toFixed(1)} KB`);
