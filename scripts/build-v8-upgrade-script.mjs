import fs from "fs";
import path from "path";

const rootDir = "C:\\Users\\Mega-PC\\.gemini\\antigravity\\scratch\\teachers-activity-bank";
const outScript = path.join(rootDir, "apply-musnad-v8-upgrades.mjs");

const filesList = [
  "prisma/schema.prisma",
  "supabase/sql/triggers.sql",
  "supabase/sql/rls-policies.sql",
  "src/config/constants.ts",
  "src/types/api.ts",
  "src/lib/validators/auth.ts",
  "src/lib/validators/worksheet.ts",
  "src/services/worksheet.service.ts",
  "src/app/api/worksheets/[id]/route.ts",
  "src/app/api/auth/me/route.ts",
  "src/actions/inspector.actions.ts",
  "src/actions/profile.actions.ts",
  "src/actions/publisher.actions.ts",
  "src/actions/report-support.actions.ts",
  "src/actions/admin.actions.ts",
  "src/components/ui/InspectorBadge.tsx",
  "src/context/AppPreferencesContext.tsx",
  "src/components/layout/Navbar.tsx",
  "src/app/(auth)/login/page.tsx",
  "src/app/(auth)/register/page.tsx",
  "src/components/worksheets/WorksheetCard.tsx",
  "src/components/worksheets/WorksheetDetailClient.tsx",
  "src/app/(main)/publisher/[id]/page.tsx",
  "src/app/(main)/profile/page.tsx",
  "src/app/(main)/support/page.tsx",
  "src/app/admin/dashboard/page.tsx",
  "src/app/page.tsx",
  "src/lib/supabase/middleware.ts",
  "src/services/download.service.ts",
  "src/services/favorite.service.ts",
  "src/services/review.service.ts",
  "src/app/api/worksheets/route.ts",
  "src/app/api/worksheets/[id]/reviews/route.ts",
  "src/app/(main)/worksheet/[id]/page.tsx",
  "src/app/(main)/upload/page.tsx",
  "prisma/seed.ts",
  "src/services/storage.service.ts",
  "src/app/layout.tsx",
  "src/components/worksheets/ReviewSection.tsx",
  "src/components/worksheets/CurriculumAndAdminExplorer.tsx",
  "src/lib/validators/review.ts",
  "src/components/ui/MentionText.tsx",
  "src/app/(main)/u/[username]/page.tsx",
  "src/app/api/users/mentions/route.ts",
  "src/actions/moderator.actions.ts",
  "src/app/inspector/dashboard/page.tsx",
  "src/app/moderator/dashboard/page.tsx",
  "src/app/(main)/levels/page.tsx",
  "src/app/(main)/levels/[gradeSlug]/page.tsx",
  "src/app/(main)/levels/[gradeSlug]/subjects/[subjectSlug]/page.tsx",
];

console.log(`Checking ${filesList.length} files for v8.0 upgrade bundle...`);
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
 * Al-Musnad (المسند) — Automated Project Manager Upgrade Script (v8.0)
 * ============================================================================
 * Upgrades 50 files implementing:
 * 1. 3-Tier Supervisory Hierarchy:
 *    - Base: Inspector (/inspector/dashboard) for pedagogical endorsement,
 *            top pinned comments, private direct publisher comments, and direct reports to admin.
 *    - Middle: Moderator (/moderator/dashboard) for deleting worksheets,
 *              banning users, support tickets, and direct publisher messaging.
 *    - Top: Admin (/admin/dashboard) with exclusive user verification toggle
 *           and dashboard code generator (VerificationCode).
 * 2. 3-Stage Multi-page Curriculum Flow:
 *    - / (or /levels): Grade levels only (Years 1-6)
 *    - /levels/[gradeSlug]: Ordered subjects within grade
 *    - /levels/[gradeSlug]/subjects/[subjectSlug]: Subject publications with 5 subdivisions
 *    - Concise guest notice: «وضع الزائر: يمكنك الوصول إلى المحتوى بعد تسجيل الدخول أو إنشاء الحساب.»
 * 3. @username & Mention System:
 *    - Unique @username per user in Prisma and DB
 *    - Live autocomplete in comments and conversations
 *    - MentionText component rendering clickable links to /u/[username] -> /publisher/[id]
 *    - Instant notifications to mentioned users.
 *
 * Usage:
 *   node apply-musnad-v8-upgrades.mjs
 * ============================================================================
 */

import fs from "fs";
import path from "path";

const files = ${JSON.stringify(filesDict, null, 2)};

console.log("\\n========================================================");
console.log("🚀 Starting Al-Musnad (المسند) v8.0 Upgrade Pipeline...");
console.log("========================================================\\n");

let updatedCount = 0;

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.resolve(process.cwd(), relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, "utf8");
  updatedCount++;
  console.log(\`  ✓ [\${updatedCount}/50] Updated: \${relPath}\`);
}

console.log("\\n========================================================");
console.log(\`✨ Successfully upgraded \${updatedCount} files to v8.0!\`);
console.log("========================================================\\n");
`;

fs.writeFileSync(outScript, scriptContent, "utf8");
const stats = fs.statSync(outScript);
console.log(`\n🎉 Successfully generated apply-musnad-v8-upgrades.mjs (${(stats.size / 1024).toFixed(1)} KB) containing all ${filesList.length} files.`);
