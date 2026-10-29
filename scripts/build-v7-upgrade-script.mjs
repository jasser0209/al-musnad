import fs from "fs";
import path from "path";

const rootDir = "C:\\Users\\Mega-PC\\.gemini\\antigravity\\scratch\\teachers-activity-bank";
const outScript = path.join(rootDir, "apply-musnad-v7-upgrades.mjs");

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
  "src/app/api/grades/route.ts",
  "src/app/api/subjects/route.ts",
  "src/app/api/categories/route.ts",
  "src/components/worksheets/FilterBar.tsx",
  "src/app/(auth)/register/inspector/page.tsx",
];

const filesDict = {};
for (const relPath of filesList) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${fullPath}`);
    process.exit(1);
  }
  filesDict[relPath] = fs.readFileSync(fullPath, "utf8");
}

const scriptContent = `#!/usr/bin/env node
/**
 * ============================================================================
 * Al-Musnad (المسند) — Automated Project Manager Upgrade Script (v7.0)
 * ============================================================================
 * Upgrades 45 files implementing:
 * 1. Complete review & PDF conversion loop for Word/Image DRAFT worksheets.
 * 2. Automatic official taxonomy seeding (ensureOfficialTaxonomySeeded).
 * 3. Strict DRAFT access protection against unauthorized direct URL browsing.
 * 4. URL query param sync in /upload via useSearchParams inside Suspense.
 * 5. Upgraded Curriculum & Administration Explorer with live counters & search.
 * 6. Cleaned FilterBar, unified inspector registration redirect, and updated RLS.
 *
 * Usage:
 *   node apply-musnad-v7-upgrades.mjs
 * ============================================================================
 */

import fs from "fs";
import path from "path";

const files = ${JSON.stringify(filesDict, null, 2)};

console.log("\\n========================================================");
console.log("🚀 Starting Al-Musnad (المسند) v7.0 Upgrade Pipeline...");
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
  console.log(\`✅ [\${updatedCount}/45] Updated: \${relPath}\`);
}

console.log("\\n========================================================");
console.log(\`🎉 Successfully updated all \${updatedCount} files to v7.0!\`);
console.log("Next steps:");
console.log("  1. npx prisma generate");
console.log("  2. npx prisma db push");
console.log("  3. npx tsc --noEmit");
console.log("  4. npm run build");
console.log("========================================================\\n");
`;

fs.writeFileSync(outScript, scriptContent, "utf8");
console.log(`Successfully built ${outScript} with ${Object.keys(filesDict).length} files (${(scriptContent.length / 1024).toFixed(1)} KB)`);
