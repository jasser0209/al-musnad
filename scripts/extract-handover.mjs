#!/usr/bin/env node
/**
 * Extracts all source files from PROJECT_HANDOVER.md (or PART1 + PART2) directly to disk.
 * Usage: node scripts/extract-handover.mjs [PROJECT_HANDOVER.md]
 */
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const inputFiles = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : ["PROJECT_HANDOVER.md", "PROJECT_HANDOVER_PART1.md", "PROJECT_HANDOVER_PART2.md"].filter((f) =>
      fs.existsSync(path.join(rootDir, f))
    );

const pattern = /### File: `([^`]+)`\s*\n+```[^\n]*\n([\s\S]*?)\n```/g;
let totalExtracted = 0;

for (const file of inputFiles) {
  const fullInput = path.resolve(rootDir, file);
  if (!fs.existsSync(fullInput)) continue;
  const markdown = fs.readFileSync(fullInput, "utf8");
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    const [, relPath, code] = match;
    const targetPath = path.join(rootDir, relPath.replace(/\\/g, "/"));
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, code, "utf8");
    totalExtracted++;
  }
}

console.log(`✅ تم استخراج وتثبيت ${totalExtracted} ملفاً برمجياً بنجاح 100%!`);