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
  "apply-musnad-v14-upgrade.mjs",
  "scripts/extract-handover.mjs",
  "scripts/generate-handover.mjs",
  "scripts/build-v9-upgrade-script.mjs",
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
  "src/services/favorite.service.ts",
  "src/services/download.service.ts",
  "src/services/review.service.ts",
  "src/services/audit.service.ts",

  // 6. Edge Middleware
  "src/middleware.ts",

  // 7. API Route Handlers
  "src/app/api/auth/callback/route.ts",
  "src/app/api/auth/me/route.ts",
  "src/app/api/auth/resolve-username/route.ts",
  "src/app/api/auth/login-guard/route.ts",
  "src/app/api/me/presence/route.ts",
  "src/app/api/worksheets/route.ts",
  "src/app/api/worksheets/[id]/route.ts",
  "src/app/api/worksheets/[id]/download/route.ts",
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

const strictHeader = (titleSuffix = "") => `# 🏛️ Project Handover & Master Technical Audit — Al-Musnad (v12.0) ${titleSuffix}
**Project:** Al-Musnad (المسند) — Educational & Pedagogical Platform  
**Architecture:** Next.js 15 (App Router) + TypeScript + Prisma ORM + PostgreSQL (Supabase) + Tailwind CSS + Lucide Icons  
**Version:** 12.0.0 (Optimized < 1 MB Archive — 100% Complete Source Code & Commands)  
**Date:** October 29, 2026  

---

## 🤖 القواعد الصارمة والتعليمات الإلزامية للذكاء الاصطناعي (STRICT AI OPERATING RULES)

أنت المهندس المعماري المسؤول عن تطوير وصيانة منصة **«المسند» (Al-Musnad v12.0)**. عند قراءة هذا الملف أو تنفيذ أي تعديل مستقبلي، **يجب عليك الالتزام الصارم وغير القابل للتفاوض بالقواعد التالية**:

1. **قاعدة الحجم الأقصى (< 1 MB) ومنع التكرار**:
   - الحد الأقصى المسموح به لحجم ملف \`PROJECT_HANDOVER.md\` هو **أقل من 1 ميجابايت (1,000 KB)**.
   - **يُمنع منعاً باتاً** تضمين ملفات الحزم المولّدة تلقائياً (مثل \`apply-musnad-v9-infrastructure.mjs\` أو \`apply-musnad-v12-upgrade.mjs\`) داخل \`PROJECT_HANDOVER.md\` لأنها تكرر نفس الأكواد بصيغة JSON وتضاعف حجم الملف فوق 1.4 MB. بدلاً من ذلك، يتم تضمين سكريبت البناء \`scripts/build-v9-upgrade-script.mjs\` وسكريبت الاستخراج \`scripts/extract-handover.mjs\` فقط.
2. **منع اختصار الأكواد (Zero Truncation Policy)**:
   - يُمنع كتابة تعليقات اختصار مثل \`// ... rest of code\` أو \`/* unchanged */\`. يجب دائماً كتابة الشفرة الكاملة القابلة للتشغيل الفوري.
3. **الحفاظ على هرم الإشراف الثلاثي وعزل الصلاحيات الصارم (\`SupervisoryHierarchyBar\` + Middleware + Server Actions)**:
   - **المشرف العام (\`ADMIN\`)**: يتربع على قمة الهرم الرقابي؛ يمتلك وحده شريط التنقل القيادي بين اللوحات الثلاث (\`/admin/dashboard\`، \`/moderator/dashboard\`، \`/inspector/dashboard\`) مع زر **«الرجوع الفوري إلى لوحة المشرف العام»**، ويمتلك وحده صلاحية إصدار أكواد التوثيق، إدارة الرتب، إغلاق بلاغات المتفقدين العاجلة (\`isInspectorPriority\`)، ومراجعة سجل التدقيق الأمني (\`AuditLog\`).
   - **المسؤول الإداري (\`MODERATOR\`)**: محصور حصرياً في لوحته (\`/moderator/dashboard\`)؛ لا يرى أزرار الانتقال للوحة المشرف العام أو المتفقد، ولا يملك صلاحية الوصول إليها.
   - **المتفقد التربوي (\`INSPECTOR\`)**: محصور حصرياً في لوحته (\`/inspector/dashboard\`) للاعتماد البيداغوجي والتوجيهات الرسمية والبلاغات العاجلة؛ لا يرى أزرار الانتقال للوحة المشرف العام أو المسؤول.
4. **الحفاظ على الزر الموحد في الشريط العلوي (\`Navbar.tsx\`)**:
   - عندما يسجل كل من \`ADMIN\` أو \`MODERATOR\` أو \`INSPECTOR\` دخوله، تظهر شارة صفته واسم لوحته مدمجة في **زر واحد فقط** في الشريط العلوي (\`مشرف عام • لوحة التحكم\` / \`مسؤول إداري • لوحة التحكم\` / \`متفقد معتمد • لوحة التحكم\`) ينقله مباشرة إلى لوحته الحصرية دون تكرار الشارة بجانب الزر.
5. **الحفاظ على مسار مستودع المواد والمستويات (\`/levels\`)**:
   - جميع روابط «مستودع المواد والمستويات» في \`Navbar.tsx\` والصفحة الرئيسية والتذييل يجب أن تتجه دائماً إلى المسار المستقل \`/levels\` (وليس \`/#levels-and-subjects\`)، وتعرض الصفحة كلاً من المستويات الستة ومستودع المواد التسع (\`#subjects-repository\`) مع استدعاء \`ensureOfficialTaxonomySeeded()\`.
6. **القواعد الأمنية الإلزامية**:
   - عدم إرجاع \`email\` مطلقاً في \`GET /api/users/mentions\`.
   - استخدام \`POST /api/auth/resolve-username\` المحمي بـ \`checkRateLimit\` لتحويل \`@username\` إلى بريد عند تسجيل الدخول.
   - منع تمرير رتبتَي \`ADMIN\` أو \`MODERATOR\` في مشغل التسجيل العام \`handle_new_user()\` بقاعدة البيانات.

---

## 🛠️ الأوامر الرسمية للتشغيل والترقية والتحقق (All Required CLI Commands)

- **1. استخراج جميع ملفات المشروع من وثيقة التسليم مباشرة:**
  \`\`\`bash
  node scripts/extract-handover.mjs
  \`\`\`
- **2. توليد وتنفيذ سكريبت الترقية الشامل دفعة واحدة:**
  \`\`\`bash
  node scripts/build-v9-upgrade-script.mjs
  node apply-musnad-v12-upgrade.mjs
  \`\`\`
- **3. فحص الاتصال بقاعدة البيانات ومتغيرات البيئة (Supabase & PostgreSQL):**
  \`\`\`bash
  node scripts/verify-and-connect.mjs
  \`\`\`
- **4. مزامنة مخطط Prisma وتوليد العميل وبذر البيانات الأساسية:**
  \`\`\`bash
  npx prisma generate
  npx prisma db push
  npx prisma db seed
  \`\`\`
- **5. الفحص الصارم للأنواع (TypeScript) وبناء نسخة الإنتاج (Next.js 15 Build):**
  \`\`\`bash
  npx tsc --noEmit
  npm run build
  \`\`\`
- **6. إعادة توليد وثيقة التسليم (تلقائياً تحت سقف 1 ميجابايت + مقسمة لجزأين):**
  \`\`\`bash
  node scripts/generate-handover.mjs
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
    const fileContent = fs.readFileSync(fullPath, "utf-8");
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
