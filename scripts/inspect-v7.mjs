import fs from 'fs';

const content = fs.readFileSync('C:/Users/Mega-PC/.gemini/antigravity/brain/6293896d-5fc8-48d3-84bb-af937dc0f898/.user_uploaded/media_1793276122700_40425c0e.md', 'utf8');
const lines = content.split(/\r?\n/);
let currentHeading = '';
let inCode = false;
let codeLines = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('###')) {
    if (currentHeading) {
      console.log(currentHeading + ': ' + codeLines + ' lines');
    }
    currentHeading = line;
    codeLines = 0;
  } else if (line.startsWith('```')) {
    inCode = !inCode;
  } else if (inCode) {
    codeLines++;
  }
}
if (currentHeading) {
  console.log(currentHeading + ': ' + codeLines + ' lines');
}
