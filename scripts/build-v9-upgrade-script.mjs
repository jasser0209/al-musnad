import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const outScriptV11 = path.join(rootDir, "apply-musnad-v12-upgrade.mjs");
const outScriptV10 = path.join(rootDir, "apply-musnad-v10-upgrade.mjs");

const filesList = [
  // 1. Prisma & Database Policies
  "prisma/schema.prisma",
  "supabase/sql/triggers.sql",
  "supabase/sql/rls-policies.sql",
  "supabase/sql/setup-complete-supabase.sql",

  // 2. Constants & Types
  "src/config/constants.ts",
  "src/types/api.ts",

  // 3. Validators
  "src/lib/validators/auth.ts",
  "src/lib/validators/common.ts",
  "src/lib/validators/worksheet.ts",
  "src/lib/validators/review.ts",

  // 4. Services
  "src/services/worksheet.service.ts",
  "src/services/download.service.ts",
  "src/services/favorite.service.ts",
  "src/services/review.service.ts",
  "src/services/storage.service.ts",
  "src/services/audit.service.ts",

  // 5. Security & Middleware
  "src/lib/security/rate-limit.ts",
  "src/lib/supabase/middleware.ts",

  // 6. Server Actions
  "src/actions/inspector.actions.ts",
  "src/actions/moderator.actions.ts",
  "src/actions/profile.actions.ts",
  "src/actions/publisher.actions.ts",
  "src/actions/report-support.actions.ts",
  "src/actions/admin.actions.ts",

  // 7. UI, Presence, Profile & Layout Components
  "src/components/ui/InspectorBadge.tsx",
  "src/components/ui/MentionText.tsx",
  "src/components/ui/UserPresenceIndicator.tsx",
  "src/components/ui/SubjectIcon.tsx",
  "src/components/worksheets/RolePersonalizedHub.tsx",
  "src/components/home/PlatformIdentityAndFaqSection.tsx",
  "src/components/profile/ArchivedSubscriptionsPlans.tsx",
  "src/context/AppPreferencesContext.tsx",
  "src/components/layout/Navbar.tsx",
  "src/components/layout/SupervisoryHierarchyBar.tsx",
  "src/components/worksheets/FilterBar.tsx",
  "src/components/worksheets/WorksheetCard.tsx",
  "src/components/worksheets/WorksheetDetailClient.tsx",
  "src/components/worksheets/ReviewSection.tsx",
  "src/components/worksheets/CurriculumAndAdminExplorer.tsx",

  // 8. Auth Pages
  "src/app/(auth)/login/page.tsx",
  "src/app/(auth)/register/page.tsx",

  // 9. Main Application Pages
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/(main)/publisher/[id]/page.tsx",
  "src/app/(main)/profile/page.tsx",
  "src/app/(main)/support/page.tsx",
  "src/app/(main)/worksheet/[id]/page.tsx",
  "src/app/(main)/upload/page.tsx",
  "src/app/(main)/u/[username]/page.tsx",
  "src/app/(main)/levels/page.tsx",
  "src/app/(main)/levels/[gradeSlug]/page.tsx",
  "src/app/(main)/levels/[gradeSlug]/subjects/[subjectSlug]/page.tsx",

  // 10. Dedicated Dashboards (3-Tier Supervisory Hierarchy)
  "src/app/inspector/dashboard/page.tsx",
  "src/app/moderator/dashboard/page.tsx",
  "src/app/admin/dashboard/page.tsx",

  // 11. API Route Handlers
  "src/app/api/auth/callback/route.ts",
  "src/app/api/auth/me/route.ts",
  "src/app/api/auth/resolve-username/route.ts",
  "src/app/api/auth/login-guard/route.ts",
  "src/app/api/me/presence/route.ts",
  "src/app/api/worksheets/route.ts",
  "src/app/api/worksheets/[id]/route.ts",
  "src/app/api/worksheets/[id]/reviews/route.ts",
  "src/app/api/users/mentions/route.ts",
  "src/app/api/health/route.ts",

  // 12. Seed & Config & Verification Scripts
  "prisma/seed.ts",
  "next.config.ts",
  "scripts/verify-and-connect.mjs",
  "scripts/extract-handover.mjs",
  ".env.example",
];

console.log(`Checking ${filesList.length} files for v12.0 upgrade bundle...`);
const filesDict = {};
let missing = 0;

for (const relPath of filesList) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing file: ${relPath}`);
    missing++;
  } else {
    filesDict[relPath] = fs.readFileSync(fullPath, "utf8");
  }
}

if (missing > 0) {
  console.error(`Found ${missing} missing files. Aborting build.`);
  process.exit(1);
}

const scriptContent = `#!/usr/bin/env node
/**
 * ============================================================================
 * Al-Musnad (المسند) — Master Architecture, Security & UX Upgrade Script (v12.0)
 * ============================================================================
 * Contains ${filesList.length} complete, un-truncated files for Version 11.0 including:
 * 1. Security Hardening & 6-Strike Password Lockout Guard (/api/auth/login-guard):
 *    - Checks if email/@username is registered; warns user of 6-attempt limit;
 *      locks account after 6 failed password attempts; enables Admin & Moderator account unlock.
 * 2. Enter-Key Instant Login & Full Google OAuth 2.0 Integration (/api/auth/callback).
 * 3. 6-Section File Classification & Filtering (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى):
 *    - Every file displays Subject + Grade Level + Section + File Type (PDF/Word/Image).
 *    - Simplified /levels to show Approved Grade Levels only, with Materials Repository inside each Grade.
 * 4. Member Online / Offline / Ghost Mode (وضع الشبح) & Green/Gray Dot under User Avatar:
 *    - Small green dot when connected, gray dot + elapsed time when offline, and Ghost Mode browsing.
 * 5. Role-Colored Username Box & Merged Badge + Control Panel inside Navbar Dropdown.
 * 6. Subscriptions Section Marked "سيأتي قريباً" with Preserved Copy of Plans Archive.
 * ============================================================================
 */

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
console.log("======================================================================");
console.log("🚀 تطبيق ترقية منصة «المسند» الشاملة (الإصدار الثاني عشر v12.0)");
console.log("======================================================================\\n");

const files = ${JSON.stringify(filesDict, null, 2)};

let writtenCount = 0;
for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(rootDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, "utf8");
  writtenCount++;
}

console.log(\`✅ تم تحديث وتثبيت كافة ملفات الإصدار الثاني عشر v12.0 (\${writtenCount} ملفاً) بنجاح 100% دون أي اختصار!\`);
console.log("\\nالخطوات التالية الموصى بها:");
console.log("1. npx prisma generate");
console.log("2. npx prisma db push");
console.log("3. npx prisma db seed");
console.log("4. npm run build\\n");
`;

fs.writeFileSync(outScriptV11, scriptContent, "utf8");
fs.writeFileSync(outScriptV10, scriptContent, "utf8");
console.log(`Successfully built ${outScriptV11} (${(scriptContent.length / 1024).toFixed(1)} KB) containing all ${filesList.length} files.`);
