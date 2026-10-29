import fs from 'fs';
import path from 'path';

const markdownPath = 'C:/Users/Mega-PC/.gemini/antigravity/brain/6293896d-5fc8-48d3-84bb-af937dc0f898/.user_uploaded/media_1793273610384_9a64281e.md';
const content = fs.readFileSync(markdownPath, 'utf8');
const lines = content.split(/\r?\n/);

const files = [];
let currentFile = null;
let currentCode = [];
let insideCode = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const headerMatch = line.match(/^###\s+الملف:\s*`([^`]+)`/);
  if (headerMatch) {
    if (currentFile && currentCode.length > 0) {
      files.push({ path: currentFile, code: currentCode.join('\n').trim() });
      currentCode = [];
      insideCode = false;
    }
    currentFile = headerMatch[1].replace(/`/g, '').trim();
    continue;
  }
  
  if (currentFile) {
    if (!insideCode && line.startsWith('```')) {
      insideCode = true;
      continue;
    }
    if (insideCode) {
      if (line.startsWith('```')) {
        let isEnd = false;
        let remainingHasHeader = false;
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].match(/^###\s+الملف:/)) {
            remainingHasHeader = true;
            break;
          }
        }
        if (!remainingHasHeader) {
          isEnd = true;
        } else {
          for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
            if (lines[j].match(/^###\s+الملف:/)) {
              isEnd = true;
              break;
            }
          }
        }

        if (isEnd) {
          files.push({ path: currentFile, code: currentCode.join('\n').trim() });
          currentFile = null;
          currentCode = [];
          insideCode = false;
          continue;
        }
      }
      currentCode.push(line);
    }
  }
}

if (currentFile && currentCode.length > 0) {
  files.push({ path: currentFile, code: currentCode.join('\n').trim() });
}

console.log(`Total parsed files: ${files.length}`);

files.forEach((f, idx) => {
  const lines = f.code.split('\n');
  const lastLine = lines[lines.length - 1].trim();
  if (lastLine.startsWith('```')) {
    console.warn(`WARNING: ${f.path} ends with ${lastLine}`);
  }
});

const outPath = 'C:/Users/Mega-PC/.gemini/antigravity/scratch/teachers-activity-bank/apply-musnad-v6-upgrades.mjs';

let scriptContent = `#!/usr/bin/env node
/**
 * ============================================================================
 * Al-Musnad (المسند) — Automated Project Manager Upgrade Script (v6.0)
 * ============================================================================
 * Upgrades 40 full files:
 * - Grade Level & Academic Subjects Section (CurriculumAndAdminExplorer)
 * - Administration & Administrative Transactions Section (#administration-section)
 * - Unauthenticated Guest Permissions (Guest title-only view + login lock modal)
 * - Clean Registration Form + Post-Signup Thank You & Admin Verification Notice
 * - Complete removal of "في صدارة المادة"
 * - Relocation of Technical Support link to footer banner
 * - Multi-format uploads (Word doc/docx and Images alongside PDF)
 *
 * Usage:
 *   node apply-musnad-v6-upgrades.mjs
 * ============================================================================
 */

import fs from "fs";
import path from "path";

const files = ${JSON.stringify(
  files.reduce((acc, f) => {
    acc[f.path] = f.code;
    return acc;
  }, {}),
  null,
  2
)};

console.log("\\n========================================================");
console.log("🚀 Starting Al-Musnad (المسند) v6.0 Upgrade Pipeline...");
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
  console.log(\`✅ [\${updatedCount}/40] Updated: \${relPath}\`);
}

console.log("\\n========================================================");
console.log(\`🎉 Successfully updated all \${updatedCount} files to v6.0!\`);
console.log("Next steps:");
console.log("  1. npx prisma generate");
console.log("  2. npx prisma db push");
console.log("  3. npx prisma db seed");
console.log("  4. npx tsc --noEmit");
console.log("  5. npm run build");
console.log("========================================================\\n");
`;

fs.writeFileSync(outPath, scriptContent, 'utf8');
console.log(`Regenerated ${outPath} successfully (${fs.statSync(outPath).size} bytes)`);
