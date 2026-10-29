import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function createIconSvg(size) {
  const rx = Math.round(size * 0.22); // Modern squircle rounded corners
  const fontSize = Math.round(size * 0.58);
  const textY = Math.round(size * 0.64);
  const glowRadius = Math.round(size * 0.42);

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="45%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <radialGradient id="innerGlow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="${Math.max(2, Math.round(size * 0.02))}" stdDeviation="${Math.max(2, Math.round(size * 0.025))}" flood-color="#0f172a" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Background Squircle -->
  <rect x="0" y="0" width="${size}" height="${size}" rx="${rx}" fill="url(#blueGradient)" />
  <rect x="0" y="0" width="${size}" height="${size}" rx="${rx}" fill="url(#innerGlow)" />

  <!-- Arabic Letter "م" (Al-Musnad) -->
  <text 
    x="50%" 
    y="${textY}" 
    text-anchor="middle" 
    fill="#ffffff" 
    font-family="'Cairo', 'Noto Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif" 
    font-size="${fontSize}px" 
    font-weight="900"
    filter="url(#subtleShadow)"
  >م</text>
</svg>
  `.trim();
}

async function generate() {
  console.log("🎨 جاري توليد أيقونات تطبيق الويب التقدمي (PWA) لمنصة «المسند»...");

  const targets = [
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "icon-maskable.png", size: 512 },
  ];

  for (const t of targets) {
    const svg = createIconSvg(t.size);
    const outputPath = path.join(publicDir, t.name);
    await sharp(Buffer.from(svg))
      .resize(t.size, t.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);
    console.log(` ✅ تم توليد: public/${t.name} (${t.size}x${t.size}px)`);
  }

  console.log("\n🎉 اكتمل توليد كافة أيقونات PWA بنجاح!");
}

generate().catch((err) => {
  console.error("❌ فشل توليد الأيقونات:", err);
  process.exit(1);
});
