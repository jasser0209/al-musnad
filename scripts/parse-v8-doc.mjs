import fs from "fs";
import path from "path";

const docPath = "C:/Users/Mega-PC/.gemini/antigravity/brain/6293896d-5fc8-48d3-84bb-af937dc0f898/.user_uploaded/media_1793277528431_d8c10921.md";
const rootDir = "C:/Users/Mega-PC/.gemini/antigravity/scratch/teachers-activity-bank";
const content = fs.readFileSync(docPath, "utf8");

const lines = content.split(/\r?\n/);
const files = {};
let currentFile = null;
let currentBuffer = [];
let inCodeBlock = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const headerMatch = line.match(/^### 📄 `([^`]+)`/);
  if (headerMatch) {
    if (currentFile && currentBuffer.length > 0) {
      files[currentFile] = currentBuffer.join("\n");
    }
    currentFile = headerMatch[1].trim();
    currentBuffer = [];
    inCodeBlock = false;
    continue;
  }

  if (currentFile) {
    if (!inCodeBlock && line.startsWith("```")) {
      inCodeBlock = true;
      continue;
    }
    if (inCodeBlock && line.startsWith("```") && currentBuffer.length > 0) {
      files[currentFile] = currentBuffer.join("\n");
      currentFile = null;
      currentBuffer = [];
      inCodeBlock = false;
      continue;
    }
    if (inCodeBlock) {
      currentBuffer.push(line);
    }
  }
}

if (currentFile && currentBuffer.length > 0) {
  files[currentFile] = currentBuffer.join("\n");
}

console.log(`Writing ${Object.keys(files).length} core v8 files from directive doc...`);
for (const [relPath, fContent] of Object.entries(files)) {
  const fullPath = path.join(rootDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, fContent, "utf8");
  console.log(` - Wrote ${relPath} (${fContent.length} bytes)`);
}
