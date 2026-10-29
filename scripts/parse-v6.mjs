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
      files.push({ path: currentFile, code: currentCode.join('\n') });
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
        let nextIsHeader = false;
        for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
          if (lines[j].match(/^###\s+الملف:/)) {
            nextIsHeader = true;
            break;
          }
        }
        if (nextIsHeader || i === lines.length - 1) {
          files.push({ path: currentFile, code: currentCode.join('\n') });
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
  files.push({ path: currentFile, code: currentCode.join('\n') });
}

console.log(`Successfully parsed ${files.length} files from directives!`);
files.forEach((f, idx) => {
  const fileLines = f.code.split('\n');
  console.log(`${idx + 1}. ${f.path} [${fileLines.length} lines, ${f.code.length} bytes]`);
});
