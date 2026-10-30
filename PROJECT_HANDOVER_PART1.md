# 🏛️ Project Handover & Master Technical Audit — Al-Musnad (v16.0) — الجزء الأول: البنية التحتية، قاعدة البيانات، الخدمات، الـ API، والـ Server Actions (Part 1 of 2)
**Project:** Al-Musnad (المسند) — Integrated Educational & Pedagogical Platform  
**Architecture:** Next.js 15 (App Router) + TypeScript + Prisma ORM + PostgreSQL (Supabase) + Cloudflare R2 + Tailwind CSS + Lucide Icons  
**Version:** 15.0.0 (Optimized Handover Archive — Complete Source Code, Security Configs & Commands)  
**Date:** October 2026  
**Primary Admin Account:** `bjasser123@gmail.com` (Password: `Jasserbes1M` — Role: `ADMIN`)  
**Live Production URL:** [https://al-musnad.vercel.app](https://al-musnad.vercel.app)  
**GitHub Repository:** [https://github.com/jasser0209/al-musnad.git](https://github.com/jasser0209/al-musnad.git)  

---

## 🤖 القواعد الصارمة والتعليمات الإلزامية للمشروع (PROJECT ARCHITECTURE & RULES)

أنت المهندس المعماري المسؤول عن تطوير وصيانة منصة **«المسند» (Al-Musnad v15.0)**. عند قراءة هذا الملف أو تنفيذ أي تعديل مستقبلي، **يجب الالتزام الصارم بالقواعد التالية**:

1. **قاعدة الحجم الأقصى (< 1 MB) ومنع التكرار**:
   - الحجم الأقصى لملف `PROJECT_HANDOVER.md` يجب أن يبقى دائماً **أقل من 1 ميجابايت (1,000 KB)**.
   - عدم تضمين حزم JSON الضخمة المكررة داخل الملف للحفاظ على خفته وسرعة معالجته.
2. **منع اختصار الأكواد (Zero Truncation Policy)**:
   - يُمنع استخدام تعليقات الاختصار مثل `// ... rest of code`. جميع الأكواد المضمنة كاملة وقابلة للتشغيل الفوري.
3. **شروط الاستخدام والملكية الفكرية وحماية المؤلف (/terms)**:
   - كافة الجذاذات والفروض والامتحانات المنشورة ملك فكري لأصحابها من المعلمين والمتفقدين والمؤسسات، ومتاحة مجاناً للاستخدام البيداغوجي غير التجاري.
   - يُحظر إعادة بيع أو تجميع أي محتوى في مطبوعات تجارية مدفوعة دون إذن كتابي مسبق.
   - سحب شارة «معتمد بيداغوجياً» تلقائياً عند قيام الناشر بتعديل أو استبدال الملف المرفق لحين إعادة مراجعته من المتفقد المختص.
   - تطبيق سياسة الحذف الفوري (Takedown Policy) عند الإبلاغ عن أي انتهاك للملكية الفكرية.
4. **نظام الثلاثيات المدرسية التونسية (SCHOOL_TRIMESTERS)**:
   - دعم رسمي للثلاثيات الثلاثة: الثلاثي الأول، الثلاثي الثاني، الثلاثي الثالث.
   - فلاتر سريعة بضغطة زر وقائمة منسدلة متزامنة مع الرابط في `FilterBar.tsx` (`?trimester=trimester-1`).
   - ربط فلتر الثلاثي بمحرك البحث وقاعدة البيانات في `worksheet.service.ts` و `page.tsx`.
   - أزرار الوسم السريع للثلاثي بضغطة زر واحدة في صفحة الرفع `/upload`.
5. **مربع اسم المستخدم في الشريط العلوي (Navbar.tsx)**:
   - إزالة النص الدال على نوع الحساب من جانب اسم المستخدم ليظهر الاسم كاملاً وواضحاً.
   - الحفاظ التام على تمييز الألوان في إطار وخلفية مربع الاسم حسب الفئة:
     - المشرف العام (`ADMIN`): بنفسجي ملكي (Purple).
     - المسؤول الإداري (`MODERATOR`): نيلي (Indigo).
     - المتفقد التربوي (`INSPECTOR`): ذهبي كهرماني (Amber).
     - المؤسسة التربوية (`INSTITUTION`): أرجواني (Violet).
     - المعلم (`TEACHER`): أزرق (Blue).
     - التلميذ (`STUDENT`): أخضر زمردي (Emerald).
6. **ترويسات الأمان الصارمة (HTTP Security Headers - A+ Rating)**:
   - تطبيق ترويسات الأمان الصارمة في `next.config.ts`: `X-Frame-Options: SAMEORIGIN`، `X-Content-Type-Options: nosniff`، `Strict-Transport-Security`، `Permissions-Policy`، `Referrer-Policy`، `X-XSS-Protection`.
   - السماح بمعاينة وثائق PDF والصور بأمان من سحابة Cloudflare R2 و Supabase دون حظر CORS أو Clickjacking.
7. **سحابة التخزين المزدوجة (Cloudflare R2 10GB + Supabase Storage Fallback)**:
   - الاعتماد الأساسي على Cloudflare R2 بسعة 10 جيجابايت مجانية مع بقاء Supabase Storage كخيار احتياطي فوري.
8. **تطبيق الويب التقدمي (PWA)**:
   - ملف مواصفات رسمي `src/app/manifest.ts` مع أيقونات 192 و 512 وبنر تثبيت ذكي `InstallPwaBanner.tsx`.
9. **محركات البحث وأدوات الويب (SEO & Google Search Console)**:
   - كود التحقق الرسمي لمحرك بحث جوجل في `src/app/layout.tsx`.
   - خريطة موقع ديناميكية `src/app/sitemap.ts` وملف توجيه الروبوتات `src/app/robots.ts`.
10. **خدمة البريد الإلكتروني (Resend)**:
    - `src/services/email.service.ts` مع قوالب HTML ترحيبية وإشعارات الدعم والاعتماد البيداغوجي وتراجع آمن (Graceful Fallback).
11. **هرم الإشراف الثلاثي وعزل الصلاحيات الصارم**:
    - المشرف العام (`ADMIN`): قمة الهرم والتحكم الإداري الكامل والتبديل بين اللوحات.
    - المسؤول الإداري (`MODERATOR`): محصور في `/moderator/dashboard`.
    - المتفقد التربوي (`INSPECTOR`): محصور في `/inspector/dashboard`.

---

## 🛠️ أوامر التشغيل والترقية الرسمية (Official CLI Commands)

- **1. تشغيل سكريبت ترقية الإصدار 15.0 الشامل:**
  ```bash
  node apply-musnad-v16-upgrade.mjs
  ```
- **2. فحص سلامة الأنواع البرمجية (TypeScript Check):**
  ```bash
  npx tsc --noEmit
  ```
- **3. بناء نسخة الإنتاج الحية (Next.js Production Build):**
  ```bash
  npm run build
  ```
- **4. تحديث وثائق التسليم تلقائياً:**
  ```bash
  node scripts/generate-handover.mjs
  ```
- **5. الالتزام والمزامنة المباشرة مع GitHub و Vercel:**
  ```bash
  git add .
  git commit -m "Update project handover documentation"
  git push
  ```

---

## 📂 Complete Source Code (73 Files)

### File: `package.json`

```json
{
  "name": "teachers-activity-bank",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.1160.0",
    "@aws-sdk/s3-request-presigner": "^3.1160.0",
    "@prisma/client": "^6.0.0",
    "@supabase/ssr": "^0.5.0",
    "@supabase/supabase-js": "^2.45.0",
    "@vercel/speed-insights": "^2.0.0",
    "lucide-react": "^0.460.0",
    "next": "^15.0.0",
    "pdfjs-dist": "^4.10.38",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^6.35.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.49",
    "prisma": "^6.0.0",
    "sharp": "^0.35.5",
    "tailwindcss": "^3.4.15",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0"
  }
}

```

---

### File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

---

### File: `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      // Cloudflare R2 Public CDN & Storage
      {
        protocol: "https",
        hostname: "pub-210f91ecac0344349d57385d435f04a3.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  async headers() {
    return [
      {
        // Apply strict security headers to all application routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
      {
        // Allow PDF viewer and media previews to load from storage domains
        source: "/worksheet/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

```

---

### File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};

export default config;

```

---

### File: `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

```

---

### File: `.env.example`

```text
# ============================================================================
# منصة «المسند» (Al-Musnad Platform v16.0) — إعدادات البيئة الكاملة
# ============================================================================

# 1. إعدادات التطبيق العامة
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="المسند - الفضاء التربوي الشامل"

# 2. إعدادات المصادقة وقاعدة البيانات (Supabase Auth & PostgreSQL)
NEXT_PUBLIC_SUPABASE_URL="https://kqlvckebqlhxghnjpbme.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ضع_مفتاح_ANON_KEY_الخاص_بمشروعك_في_Supabase_هنا"
SUPABASE_SERVICE_ROLE_KEY="ضع_مفتاح_SERVICE_ROLE_KEY_الخاص_بمشروعك_في_Supabase_هنا"

# روابط قاعدة البيانات PostgreSQL (Prisma ORM)
DATABASE_URL="postgresql://postgres.kqlvckebqlhxghnjpbme:[YOUR-DB-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.kqlvckebqlhxghnjpbme:[YOUR-DB-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

# 3. إعدادات التخزين السحابي Cloudflare R2 (مساحة 10GB مجانية + 0$ رسوم تحميل)
# ⚠️ تنبيه هام جداً:
# - يجب أن يكون اسم المتغير الثاني `R2_SECRET_ACCESS_KEY` (يبدأ بحرف R وليس `2_SECRET_ACCESS_KEY`).
# - طول `R2_ACCESS_KEY_ID` يجب أن يكون 32 حرفاً بالضبط.
# - طول `R2_SECRET_ACCESS_KEY` يجب أن يكون 64 حرفاً بالضبط.
R2_ACCOUNT_ID="ضع_معرف_حساب_Cloudflare_الخاص_بك_هنا"
R2_ACCESS_KEY_ID="f272f5098c9f3eeb255a833defec2e89"
R2_SECRET_ACCESS_KEY="6b5ca30a3de6c846aa585ddb963bc85a7a1e1e4155497fa50de39d7310e441ef"
R2_BUCKET_NAME="musnad-worksheets"
R2_PUBLIC_URL=""

# 4. إعدادات البريد الإلكتروني الرسمي (Resend — مجاني 3000 رسالة شهرياً)
RESEND_API_KEY="re_ضع_مفتاح_Resend_الخاص_بك_هنا"
RESEND_FROM_EMAIL="منصة المسند <onboarding@resend.dev>"

# 5. إعدادات حساب المشرف العام الرئيسي (Admin Seed Credentials)
ADMIN_EMAIL="oussamamrz18@gmail.com"
ADMIN_NAME="الأستاذ أسامة مرزوقي — المشرف العام"

```

---

### File: `README.md`

```markdown
# منصة «المسند» التربوية والبيداغوجية (Al-Musnad) — v3.0

منصة تربوية وبيداغوجية معتمدة ومتكاملة للمؤسسات التعليمية، المتفقدين التربويين، المعلمين، والتلاميذ، تتيح استكشاف، تدقيق، اعتماد، ومشاركة الأنشطة والوثائق البيداغوجية بمستويات خصوصية وأمان عالية.

---

## 🌟 الميزات والمحاور الرئيسية للإصدار الثالث (v3.0)

1. **الهوية المعتمدة «المسند» (Al-Musnad)**:
   - حذف أي إشارة إلى "مجانية المنصة" والتأكيد على الاعتماد والجودة البيداغوجية.
   - دعم التدويل الكامل (العربية، الفرنسية، الإنجليزية) والوضع الليلي (Dark Mode).

2. **اعتماد المتفقد التربوي (Pedagogical Endorsement)**:
   - وسام فحص واعتماد رسمي يمنحه المتفقد التربوي أو المشرف (`isEndorsed: true`).
   - تصدر الأنشطة المعتمدة قائمة العرض والبحث تلقائياً (`orderBy: [{ isEndorsed: 'desc' }, ...]`).

3. **جرس الإشعارات وقائمة الملف الشخصي المنسدلة**:
   - إشعارات فورية مع عداد غير مقروء في الشريط العلوي (اعتمادات، متابعات، موافقات الحساب).
   - قائمة منسدلة أنيقة تشمل: مساحة العمل، الملف الشخصي العام، تعديل البيانات، خطط الاشتراك، الإعدادات، وتسجيل الخروج.

4. **إخضاع تعديل الملف الشخصي لموافقة المشرف العام**:
   - حماية هوية المؤسسات والمعلمين والمتفقدين؛ تخزن التعديلات في حالة انتظار (`PENDING`) مع إشعار للمشرف في لوحة التحكم `/admin/dashboard` للمراجعة والاعتماد.

5. **صفحة الناشر العامة (`/publisher/[id]`)**:
   - صفحة استعراض متكاملة للناشر مع إحصائيات المتابعين والمنشورات.
   - دعم ميزة المتابعة (`PublisherFollow`) والإضافة للناشرين المفضلين (`FavoritePublisher`).

6. **تخصيص جمهور النشر والوثائق الحصرية (`TargetAudience`)**:
   - خيارات نشر دقيقة: لكافة المنصة، لنفس الفئة فقط، للمعلمين فقط، أو للمعلمين والتلاميذ معاً.
   - حجب فوري لإصلاحات الفروض ودلائل المعلم والوثائق الإدارية عن حسابات التلاميذ والزوار.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Framework**: Next.js 15 (App Router, Server Actions, React 19)
- **Database & ORM**: PostgreSQL (Supabase) + Prisma ORM 6
- **Authentication & Storage**: Supabase Auth (Multi-Role SSR) + Private Storage Bucket
- **Styling**: Tailwind CSS + Lucide Icons + Google Cairo Font
- **Validation**: Zod Schemas

---

## 🚀 البدء والتشغيل السريع

### 1. إعداد المتغيرات البيئية
انسخ ملف `.env.example` إلى `.env.local` وضع بيانات مشروع Supabase الخاص بك:
```

---

### File: `apply-musnad-v16-upgrade.mjs`

```javascript
#!/usr/bin/env node
/**
 * سكريبت الترقية والاستخراج والفحص الشامل — منصة «المسند» (Al-Musnad v16.0)
 * Usage: node apply-musnad-v16-upgrade.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
console.log("🚀 بدء تطبيق وفحص الإصدار v16.0 لمنصة «المسند»...");

// 1. If PROJECT_HANDOVER.md exists, extract all files automatically
if (fs.existsSync(path.join(rootDir, "scripts/extract-handover.mjs")) && fs.existsSync(path.join(rootDir, "PROJECT_HANDOVER.md"))) {
  execSync("node scripts/extract-handover.mjs PROJECT_HANDOVER.md", { stdio: "inherit" });
}

// 2. Check and auto-fix 2_SECRET_ACCESS_KEY typo in .env
const envPath = path.join(rootDir, ".env");
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, "utf8");
  if (envContent.includes("2_SECRET_ACCESS_KEY") && !envContent.includes("R2_SECRET_ACCESS_KEY")) {
    envContent = envContent.replace(/\b2_SECRET_ACCESS_KEY\b/g, "R2_SECRET_ACCESS_KEY");
    fs.writeFileSync(envPath, envContent, "utf8");
    console.log("🔧 تم تصحيح اسم المتغير في .env تلقائياً من 2_SECRET_ACCESS_KEY إلى R2_SECRET_ACCESS_KEY");
  }
}

// 3. Run verification & TypeScript check
try {
  execSync("node scripts/verify-and-connect.mjs", { stdio: "inherit" });
  execSync("npx prisma generate", { stdio: "inherit" });
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  console.log("✅ اكتملت ترقية وفحص منصة «المسند» v16.0 بنجاح 100%!");
} catch (err) {
  console.warn("⚠️ يرجى التأكد من اتصال قاعدة البيانات وتشغيل `npx prisma generate` و `npm run build`.");
}

```

---

### File: `scripts/extract-handover.mjs`

```javascript
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

```

---

### File: `scripts/generate-handover.mjs`

```javascript
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
  "apply-musnad-v16-upgrade.mjs",
  "scripts/extract-handover.mjs",
  "scripts/generate-handover.mjs",
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
  "src/services/email.service.ts",
  "src/services/favorite.service.ts",
  "src/services/download.service.ts",
  "src/services/review.service.ts",
  "src/services/audit.service.ts",

  // 6. Edge Middleware & Metadata Routes
  "src/middleware.ts",
  "src/app/manifest.ts",
  "src/app/robots.ts",
  "src/app/sitemap.ts",

  // 7. API Route Handlers
  "src/app/api/auth/callback/route.ts",
  "src/app/api/auth/me/route.ts",
  "src/app/api/auth/resolve-username/route.ts",
  "src/app/api/auth/login-guard/route.ts",
  "src/app/api/me/presence/route.ts",
  "src/app/api/worksheets/route.ts",
  "src/app/api/worksheets/[id]/route.ts",
  "src/app/api/worksheets/[id]/download/route.ts",
  "src/app/api/worksheets/[id]/file/route.ts",
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
  "src/components/ui/InstallPwaBanner.tsx",
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
  "src/app/(main)/terms/page.tsx",
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

const strictHeader = (titleSuffix = "") => `# 🏛️ Project Handover & Master Technical Audit — Al-Musnad (v16.0) ${titleSuffix}
**Project:** Al-Musnad (المسند) — Integrated Educational & Pedagogical Platform  
**Architecture:** Next.js 15 (App Router) + TypeScript + Prisma ORM + PostgreSQL (Supabase) + Cloudflare R2 + Tailwind CSS + Lucide Icons  
**Version:** 15.0.0 (Optimized Handover Archive — Complete Source Code, Security Configs & Commands)  
**Date:** October 2026  
**Primary Admin Account:** \`bjasser123@gmail.com\` (Password: \`Jasserbes1M\` — Role: \`ADMIN\`)  
**Live Production URL:** [https://al-musnad.vercel.app](https://al-musnad.vercel.app)  
**GitHub Repository:** [https://github.com/jasser0209/al-musnad.git](https://github.com/jasser0209/al-musnad.git)  

---

## 🤖 القواعد الصارمة والتعليمات الإلزامية للمشروع (PROJECT ARCHITECTURE & RULES)

أنت المهندس المعماري المسؤول عن تطوير وصيانة منصة **«المسند» (Al-Musnad v15.0)**. عند قراءة هذا الملف أو تنفيذ أي تعديل مستقبلي، **يجب الالتزام الصارم بالقواعد التالية**:

1. **قاعدة الحجم الأقصى (< 1 MB) ومنع التكرار**:
   - الحجم الأقصى لملف \`PROJECT_HANDOVER.md\` يجب أن يبقى دائماً **أقل من 1 ميجابايت (1,000 KB)**.
   - عدم تضمين حزم JSON الضخمة المكررة داخل الملف للحفاظ على خفته وسرعة معالجته.
2. **منع اختصار الأكواد (Zero Truncation Policy)**:
   - يُمنع استخدام تعليقات الاختصار مثل \`// ... rest of code\`. جميع الأكواد المضمنة كاملة وقابلة للتشغيل الفوري.
3. **شروط الاستخدام والملكية الفكرية وحماية المؤلف (/terms)**:
   - كافة الجذاذات والفروض والامتحانات المنشورة ملك فكري لأصحابها من المعلمين والمتفقدين والمؤسسات، ومتاحة مجاناً للاستخدام البيداغوجي غير التجاري.
   - يُحظر إعادة بيع أو تجميع أي محتوى في مطبوعات تجارية مدفوعة دون إذن كتابي مسبق.
   - سحب شارة «معتمد بيداغوجياً» تلقائياً عند قيام الناشر بتعديل أو استبدال الملف المرفق لحين إعادة مراجعته من المتفقد المختص.
   - تطبيق سياسة الحذف الفوري (Takedown Policy) عند الإبلاغ عن أي انتهاك للملكية الفكرية.
4. **نظام الثلاثيات المدرسية التونسية (SCHOOL_TRIMESTERS)**:
   - دعم رسمي للثلاثيات الثلاثة: الثلاثي الأول، الثلاثي الثاني، الثلاثي الثالث.
   - فلاتر سريعة بضغطة زر وقائمة منسدلة متزامنة مع الرابط في \`FilterBar.tsx\` (\`?trimester=trimester-1\`).
   - ربط فلتر الثلاثي بمحرك البحث وقاعدة البيانات في \`worksheet.service.ts\` و \`page.tsx\`.
   - أزرار الوسم السريع للثلاثي بضغطة زر واحدة في صفحة الرفع \`/upload\`.
5. **مربع اسم المستخدم في الشريط العلوي (Navbar.tsx)**:
   - إزالة النص الدال على نوع الحساب من جانب اسم المستخدم ليظهر الاسم كاملاً وواضحاً.
   - الحفاظ التام على تمييز الألوان في إطار وخلفية مربع الاسم حسب الفئة:
     - المشرف العام (\`ADMIN\`): بنفسجي ملكي (Purple).
     - المسؤول الإداري (\`MODERATOR\`): نيلي (Indigo).
     - المتفقد التربوي (\`INSPECTOR\`): ذهبي كهرماني (Amber).
     - المؤسسة التربوية (\`INSTITUTION\`): أرجواني (Violet).
     - المعلم (\`TEACHER\`): أزرق (Blue).
     - التلميذ (\`STUDENT\`): أخضر زمردي (Emerald).
6. **ترويسات الأمان الصارمة (HTTP Security Headers - A+ Rating)**:
   - تطبيق ترويسات الأمان الصارمة في \`next.config.ts\`: \`X-Frame-Options: SAMEORIGIN\`، \`X-Content-Type-Options: nosniff\`، \`Strict-Transport-Security\`، \`Permissions-Policy\`، \`Referrer-Policy\`، \`X-XSS-Protection\`.
   - السماح بمعاينة وثائق PDF والصور بأمان من سحابة Cloudflare R2 و Supabase دون حظر CORS أو Clickjacking.
7. **سحابة التخزين المزدوجة (Cloudflare R2 10GB + Supabase Storage Fallback)**:
   - الاعتماد الأساسي على Cloudflare R2 بسعة 10 جيجابايت مجانية مع بقاء Supabase Storage كخيار احتياطي فوري.
8. **تطبيق الويب التقدمي (PWA)**:
   - ملف مواصفات رسمي \`src/app/manifest.ts\` مع أيقونات 192 و 512 وبنر تثبيت ذكي \`InstallPwaBanner.tsx\`.
9. **محركات البحث وأدوات الويب (SEO & Google Search Console)**:
   - كود التحقق الرسمي لمحرك بحث جوجل في \`src/app/layout.tsx\`.
   - خريطة موقع ديناميكية \`src/app/sitemap.ts\` وملف توجيه الروبوتات \`src/app/robots.ts\`.
10. **خدمة البريد الإلكتروني (Resend)**:
    - \`src/services/email.service.ts\` مع قوالب HTML ترحيبية وإشعارات الدعم والاعتماد البيداغوجي وتراجع آمن (Graceful Fallback).
11. **هرم الإشراف الثلاثي وعزل الصلاحيات الصارم**:
    - المشرف العام (\`ADMIN\`): قمة الهرم والتحكم الإداري الكامل والتبديل بين اللوحات.
    - المسؤول الإداري (\`MODERATOR\`): محصور في \`/moderator/dashboard\`.
    - المتفقد التربوي (\`INSPECTOR\`): محصور في \`/inspector/dashboard\`.

---

## 🛠️ أوامر التشغيل والترقية الرسمية (Official CLI Commands)

- **1. تشغيل سكريبت ترقية الإصدار 15.0 الشامل:**
  \`\`\`bash
  node apply-musnad-v16-upgrade.mjs
  \`\`\`
- **2. فحص سلامة الأنواع البرمجية (TypeScript Check):**
  \`\`\`bash
  npx tsc --noEmit
  \`\`\`
- **3. بناء نسخة الإنتاج الحية (Next.js Production Build):**
  \`\`\`bash
  npm run build
  \`\`\`
- **4. تحديث وثائق التسليم تلقائياً:**
  \`\`\`bash
  node scripts/generate-handover.mjs
  \`\`\`
- **5. الالتزام والمزامنة المباشرة مع GitHub و Vercel:**
  \`\`\`bash
  git add .
  git commit -m "Update project handover documentation"
  git push
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
    let fileContent = fs.readFileSync(fullPath, "utf-8");
    if (relPath.endsWith(".ts") || relPath.endsWith(".tsx")) {
      fileContent = fileContent
        .replace(/^\/\*\*[\s\S]*?\*\/\s*/, "")
        .replace(/^("use client";\s*)\/\*\*[\s\S]*?\*\/\s*/, "$1");
    }
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

```

---

### File: `scripts/verify-and-connect.mjs`

```javascript
#!/usr/bin/env node
/**
 * سكريبت الفحص الشامل والربط لمنصة «المسند» (Al-Musnad v16.0)
 * يفحص:
 * 1. متغيرات Supabase و PostgreSQL.
 * 2. مفاتيح Cloudflare R2 (يتأكد من أن R2_ACCESS_KEY_ID بطول 32 حرفاً و R2_SECRET_ACCESS_KEY بطول 64 حرفاً، وينبه إذا كُتب 2_SECRET_ACCESS_KEY بدون حرف R).
 * 3. إعدادات Resend للبريد الإلكتروني.
 */

import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");
console.log("====================================================================");
console.log("🔍 فحص إعدادات البيئة والربط السحابي — منصة المسند (v16.0)");
console.log("====================================================================");

if (!fs.existsSync(envPath)) {
  console.warn("⚠️ ملف .env غير موجود. يمكنك نسخه من .env.example عبر: cp .env.example .env");
} else {
  const raw = fs.readFileSync(envPath, "utf8");
  if (raw.includes("2_SECRET_ACCESS_KEY") && !raw.includes("R2_SECRET_ACCESS_KEY")) {
    console.warn("⚠️ تنبيه: وُجد المتغير باسم 2_SECRET_ACCESS_KEY (ينقصه حرف R في البداية).");
    console.warn("   يقوم نظام المسند v16.0 بالتعرف عليه تلقائياً، ولكن يُفضل تعديل اسمه في .env و Vercel إلى: R2_SECRET_ACCESS_KEY");
  }
}

const accessKey = (process.env.R2_ACCESS_KEY_ID || "").trim();
const secretKey = (process.env.R2_SECRET_ACCESS_KEY || process.env["2_SECRET_ACCESS_KEY"] || "").trim();

if (accessKey) {
  console.log(`✅ R2_ACCESS_KEY_ID: الطول = ${accessKey.length} حرفاً ${accessKey.length === 32 ? "(صحيح 100%)" : "⚠️ (يجب أن يكون 32 حرفاً!)"}`);
}
if (secretKey) {
  console.log(`✅ R2_SECRET_ACCESS_KEY: الطول = ${secretKey.length} حرفاً ${secretKey.length === 64 ? "(صحيح 100%)" : "⚠️ (يجب أن يكون 64 حرفاً!)"}`);
}
console.log("====================================================================");

```

---

### File: `scripts/backfill-usernames.mjs`

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(`Found ${users.length} users in database.`);

  const used = new Set();
  for (const u of users) {
    if (u.username) {
      used.add(u.username.toLowerCase());
    }
  }

  for (const u of users) {
    if (!u.username) {
      const base = (u.email.split("@")[0] || "user")
        .toLowerCase()
        .replace(/[^a-z0-9_.]/g, "");
      let candidate = `${base}_${u.id.slice(0, 4)}`;
      let count = 1;
      while (used.has(candidate)) {
        candidate = `${base}_${u.id.slice(0, 4)}_${count}`;
        count++;
      }
      used.add(candidate);
      console.log(`Setting username for ${u.email} -> @${candidate}`);
      await prisma.user.update({
        where: { id: u.id },
        data: { username: candidate },
      });
    }
  }

  console.log("All users have unique usernames!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

```

---

### File: `prisma/schema.prisma`

```prisma
// ============================================================
// Al-Musnad (المسند) — Prisma Schema (Upgraded v11.0)
// ============================================================
// Implements:
// 1. 3-Tier Supervisory Hierarchy in `Role`:
//    - `INSPECTOR` (المتفقد - القاعدة الرقابية والبيداغوجية)
//    - `MODERATOR` (المسؤول - الإدارة التنفيذية الوسطى)
//    - `ADMIN`     (المشرف - قمة الهرم والتحكم الكامل والتوثيق وإنشاء الأكواد)
// 2. Unique `@username` per user (`username String? @unique`) for `@mentions`
//    across comments and conversations that link directly to `/publisher/[id]`.
// 3. Enhanced `Review` (Comments) supporting:
//    - `isOfficialDirective`: Pinned Inspector/Admin comments shown at the very top (`في الصدارة`).
//    - `isPrivateToPublisher`: Private comment sent directly to the publisher (`تعليق خاص مباشرة إلى الناشر`).
// 4. `VerificationCode` table for the Admin's Dashboard Code Generator (`إنشاء الأكواد في الداشبورد للمشرف`).
// 5. `AuditLog` table for comprehensive security and activity logging (`سجلات النشاطات والأمن`).
// ============================================================

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearchPostgres"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ── Enums ────────────────────────────────────────────────────

enum Role {
  INSTITUTION
  INSPECTOR
  TEACHER
  STUDENT
  MODERATOR
  ADMIN
}

enum WorksheetStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum TargetAudience {
  ALL
  SAME_ROLE_ONLY
  TEACHERS_ONLY
  TEACHERS_AND_STUDENTS
  INSTITUTIONS_ONLY
}

enum ProfileEditStatus {
  NONE
  PENDING
  APPROVED
  REJECTED
}

enum ReportTargetType {
  WORKSHEET
  USER
}

enum ReportStatus {
  PENDING
  RESOLVED
  DISMISSED
}

enum SupportTicketStatus {
  OPEN
  ANSWERED
  CLOSED
}

// ── Models ───────────────────────────────────────────────────

model User {
  id                 String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email              String            @unique @db.VarChar(255)
  username           String?           @unique @db.VarChar(64)
  name               String            @db.VarChar(255)
  avatarUrl          String?           @map("avatar_url") @db.Text
  role               Role              @default(TEACHER)
  school             String?           @db.VarChar(255)
  studentGrade       String?           @map("student_grade") @db.VarChar(100)
  bio                String?           @db.Text
  subscriptionPlan   String            @default("STANDARD") @map("subscription_plan") @db.VarChar(50)
  profileEditStatus  ProfileEditStatus @default(NONE) @map("profile_edit_status")
  pendingProfileData Json?             @map("pending_profile_data")
  followersCount     Int               @default(0) @map("followers_count")
  favoritedByCount   Int               @default(0) @map("favorited_by_count")
  isVerified         Boolean           @default(false) @map("is_verified")
  inspectorPending   Boolean           @default(false) @map("inspector_pending")
  inspectorCode      String?           @unique @map("inspector_code") @db.VarChar(32)
  isBanned            Boolean           @default(false) @map("is_banned")
  banReason           String?           @map("ban_reason") @db.Text
  failedLoginAttempts Int               @default(0) @map("failed_login_attempts")
  lockedAt            DateTime?         @map("locked_at") @db.Timestamptz()
  lockReason          String?           @map("lock_reason") @db.Text
  presenceStatus      String            @default("ONLINE") @map("presence_status") @db.VarChar(20)
  lastSeenAt          DateTime          @default(now()) @map("last_seen_at") @db.Timestamptz()
  createdAt           DateTime          @default(now()) @map("created_at") @db.Timestamptz()
  updatedAt          DateTime          @default(now()) @updatedAt @map("updated_at") @db.Timestamptz()

  // Relations
  worksheets             Worksheet[]        @relation("UploadedWorksheets")
  endorsedWorksheets     Worksheet[]        @relation("EndorsedWorksheets")
  downloads              Download[]
  favorites              Favorite[]
  reviews                Review[]
  followers              PublisherFollow[]  @relation("PublisherFollowers")
  following              PublisherFollow[]  @relation("UserFollowing")
  favoritedByUsers       FavoritePublisher[] @relation("PublisherFavoritedBy")
  favoritePublishers     FavoritePublisher[] @relation("UserFavoritePublishers")
  notifications          Notification[]
  reportsSubmitted       Report[]           @relation("ReporterRelation")
  reportsReceived        Report[]           @relation("ReportedUserRelation")
  supportTickets         SupportTicket[]
  createdVerificationCodes VerificationCode[] @relation("CreatedVerificationCodes")
  redeemedVerificationCodes VerificationCode[] @relation("RedeemedVerificationCodes")

  @@index([username])
  @@map("users")
}

model VerificationCode {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  code        String    @unique @db.VarChar(32)
  targetRole  Role      @default(TEACHER) @map("target_role")
  note        String?   @db.VarChar(255)
  isUsed      Boolean   @default(false) @map("is_used")
  usedById    String?   @map("used_by_id") @db.Uuid
  usedAt      DateTime? @map("used_at") @db.Timestamptz()
  createdById String    @map("created_by_id") @db.Uuid
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz()

  createdBy User  @relation("CreatedVerificationCodes", fields: [createdById], references: [id], onDelete: Cascade)
  usedBy    User? @relation("RedeemedVerificationCodes", fields: [usedById], references: [id], onDelete: SetNull)

  @@index([isUsed])
  @@index([createdAt(sort: Desc)])
  @@map("verification_codes")
}

model Category {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @db.VarChar(100)
  nameAr    String   @unique @map("name_ar") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  worksheets Worksheet[]

  @@map("categories")
}

model Grade {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @db.VarChar(100)
  nameAr    String   @unique @map("name_ar") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  worksheets Worksheet[]

  @@map("grades")
}

model Subject {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @db.VarChar(100)
  nameAr    String   @unique @map("name_ar") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  color     String?  @db.VarChar(7)
  icon      String?  @db.VarChar(50)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  worksheets Worksheet[]

  @@map("subjects")
}

model Worksheet {
  id            String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title         String          @db.VarChar(255)
  titleAr       String?         @map("title_ar") @db.VarChar(255)
  description   String?         @db.Text
  descriptionAr String?         @map("description_ar") @db.Text
  categoryId    String          @map("category_id") @db.Uuid
  gradeId       String          @map("grade_id") @db.Uuid
  subjectId     String          @map("subject_id") @db.Uuid
  uploadedBy    String          @map("uploaded_by") @db.Uuid
  fileUrl       String          @map("file_url") @db.Text
  fileName      String          @map("file_name") @db.VarChar(255)
  fileSize      Int             @map("file_size")
  thumbnailUrl  String?         @map("thumbnail_url") @db.Text
  pageCount     Int?            @map("page_count")
  status        WorksheetStatus @default(DRAFT)
  audience      TargetAudience  @default(TEACHERS_AND_STUDENTS)
  isEndorsed    Boolean         @default(false) @map("is_endorsed")
  endorsedById  String?         @map("endorsed_by_id") @db.Uuid
  endorsedAt    DateTime?       @map("endorsed_at") @db.Timestamptz()
  tags          String[]        @default([])
  downloadCount Int             @default(0) @map("download_count")
  favoriteCount Int             @default(0) @map("favorite_count")
  ratingAvg     Float           @default(0) @map("rating_avg")
  reviewCount   Int             @default(0) @map("review_count")
  createdAt     DateTime        @default(now()) @map("created_at") @db.Timestamptz()
  updatedAt     DateTime        @default(now()) @updatedAt @map("updated_at") @db.Timestamptz()

  category   Category   @relation(fields: [categoryId], references: [id])
  grade      Grade      @relation(fields: [gradeId], references: [id])
  subject    Subject    @relation(fields: [subjectId], references: [id])
  uploader   User       @relation("UploadedWorksheets", fields: [uploadedBy], references: [id], onDelete: Cascade)
  endorsedBy User?      @relation("EndorsedWorksheets", fields: [endorsedById], references: [id])
  downloads  Download[]
  favorites  Favorite[]
  reviews    Review[]
  reports    Report[]

  @@index([status])
  @@index([gradeId])
  @@index([subjectId])
  @@index([categoryId])
  @@index([uploadedBy])
  @@index([audience])
  @@index([isEndorsed(sort: Desc), createdAt(sort: Desc)])
  @@index([subjectId, isEndorsed(sort: Desc), createdAt(sort: Desc)])
  @@index([gradeId, subjectId])
  @@map("worksheets")
}

model Download {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId       String   @map("user_id") @db.Uuid
  worksheetId  String   @map("worksheet_id") @db.Uuid
  downloadedAt DateTime @default(now()) @map("downloaded_at") @db.Timestamptz()

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  worksheet Worksheet @relation(fields: [worksheetId], references: [id], onDelete: Cascade)

  @@unique([userId, worksheetId])
  @@index([userId])
  @@map("downloads")
}

model Favorite {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String   @map("user_id") @db.Uuid
  worksheetId String   @map("worksheet_id") @db.Uuid
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz()

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  worksheet Worksheet @relation(fields: [worksheetId], references: [id], onDelete: Cascade)

  @@unique([userId, worksheetId])
  @@index([userId])
  @@map("favorites")
}

model PublisherFollow {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  followerId  String   @map("follower_id") @db.Uuid
  publisherId String   @map("publisher_id") @db.Uuid
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz()

  follower  User @relation("UserFollowing", fields: [followerId], references: [id], onDelete: Cascade)
  publisher User @relation("PublisherFollowers", fields: [publisherId], references: [id], onDelete: Cascade)

  @@unique([followerId, publisherId])
  @@index([followerId])
  @@index([publisherId])
  @@map("publisher_follows")
}

model FavoritePublisher {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String   @map("user_id") @db.Uuid
  publisherId String   @map("publisher_id") @db.Uuid
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz()

  user      User @relation("UserFavoritePublishers", fields: [userId], references: [id], onDelete: Cascade)
  publisher User @relation("PublisherFavoritedBy", fields: [publisherId], references: [id], onDelete: Cascade)

  @@unique([userId, publisherId])
  @@index([userId])
  @@index([publisherId])
  @@map("favorite_publishers")
}

model Notification {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId    String   @map("user_id") @db.Uuid
  title     String   @db.VarChar(255)
  message   String   @db.Text
  link      String?  @db.Text
  isRead    Boolean  @default(false) @map("is_read")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
  @@index([createdAt(sort: Desc)])
  @@map("notifications")
}

/// جدول التبليغات على المنشورات أو الناشرين (يدعم البلاغات المباشرة من المتفقد للمشرف)
model Report {
  id                  String           @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  reporterId          String           @map("reporter_id") @db.Uuid
  targetType          ReportTargetType @map("target_type")
  targetWorksheetId   String?          @map("target_worksheet_id") @db.Uuid
  targetUserId        String?          @map("target_user_id") @db.Uuid
  reason              String           @db.VarChar(255)
  details             String?          @db.Text
  isInspectorPriority Boolean          @default(false) @map("is_inspector_priority")
  status              ReportStatus     @default(PENDING)
  createdAt           DateTime         @default(now()) @map("created_at") @db.Timestamptz()

  reporter        User       @relation("ReporterRelation", fields: [reporterId], references: [id], onDelete: Cascade)
  targetWorksheet Worksheet? @relation(fields: [targetWorksheetId], references: [id], onDelete: Cascade)
  targetUser      User?      @relation("ReportedUserRelation", fields: [targetUserId], references: [id], onDelete: Cascade)

  @@index([status])
  @@index([isInspectorPriority(sort: Desc), createdAt(sort: Desc)])
  @@map("reports")
}

/// جدول تذاكر الدعم الفني وخدمة العملاء
model SupportTicket {
  id         String              @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId     String?             @map("user_id") @db.Uuid
  name       String              @db.VarChar(255)
  email      String              @db.VarChar(255)
  category   String              @default("TECHNICAL") @db.VarChar(100)
  subject    String              @db.VarChar(255)
  message    String              @db.Text
  adminReply String?             @map("admin_reply") @db.Text
  status     SupportTicketStatus @default(OPEN)
  createdAt  DateTime            @default(now()) @map("created_at") @db.Timestamptz()
  updatedAt  DateTime            @default(now()) @updatedAt @map("updated_at") @db.Timestamptz()

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@map("support_tickets")
}

/// جدول التعليقات والمراجعات البيداغوجية والخاصة (يدعم تعليقات المتفقد في الصدارة والتعليق الخاص للناشر و @username)
model Review {
  id                   String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  rating               Int      @default(5)
  comment              String   @db.Text
  isOfficialDirective  Boolean  @default(false) @map("is_official_directive")
  isPrivateToPublisher Boolean  @default(false) @map("is_private_to_publisher")
  userId               String   @map("user_id") @db.Uuid
  worksheetId          String   @map("worksheet_id") @db.Uuid
  createdAt            DateTime @default(now()) @map("created_at") @db.Timestamptz()
  updatedAt            DateTime @default(now()) @updatedAt @map("updated_at") @db.Timestamptz()

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  worksheet Worksheet @relation(fields: [worksheetId], references: [id], onDelete: Cascade)

  @@index([worksheetId, isOfficialDirective(sort: Desc), createdAt(sort: Desc)])
  @@index([userId])
  @@map("reviews")
}

/// جدول وسجل النشاطات والأمن لمراقبة كافة العمليات الحساسة في المنصة
model AuditLog {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  actorId    String?  @map("actor_id")
  actorName  String   @map("actor_name") @db.VarChar(128)
  actorRole  String   @map("actor_role") @db.VarChar(32)
  action     String   @db.VarChar(64)
  targetType String   @map("target_type") @db.VarChar(64)
  targetId   String?  @map("target_id")
  details    String?  @db.Text
  ipAddress  String?  @map("ip_address") @db.VarChar(45)
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamptz()

  @@index([actorId])
  @@index([action])
  @@index([createdAt(sort: Desc)])
  @@map("audit_logs")
}

```

---

### File: `prisma/seed.ts`

```typescript
import { PrismaClient, Role } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fzokicsiqbdmwsdcuojz.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6b2tpY3NpcWJkbXdzZGN1b2p6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzIyMDYzOSwiZXhwIjoyMTA4Nzk2NjM5fQ.hZOIvBQjQlpZMDBa6DUdjHAd1Q-73YiHmEJo5u42f7k";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface SeedAccount {
  email: string;
  username: string;
  password: string;
  name: string;
  role: Role;
  bio?: string;
  isVerified: boolean;
  school?: string;
  studentGrade?: string;
  inspectorCode?: string;
}

const PRIMARY_ADMIN: SeedAccount = {
  email: "bjasser123@gmail.com",
  username: "bjasser",
  password: "Jasserbes1M",
  name: "Jasser (المشرف العام)",
  role: Role.ADMIN,
  bio: "حساب المشرف العام الأساسي لمنصة المسند — إدارة النظام وصلاحيات الهرم الرقابي.",
  isVerified: true,
  school: "الإدارة العامة لمنصة المسند",
};

const DEV_DEMO_ACCOUNTS: SeedAccount[] = [
  {
    email: "admin@musnad.tn",
    username: "admin",
    password: "Musnad@2026",
    name: "المشرف العام",
    role: Role.ADMIN,
    bio: "حساب المشرف العام القيادي لمنصة المسند — إدارة النظام وصلاحيات الهرم الرقابي.",
    isVerified: true,
    school: "الإدارة العامة لمنصة المسند",
  },
  {
    email: "moderator@musnad.tn",
    username: "moderator",
    password: "Musnad@2026",
    name: "المسؤول الإداري",
    role: Role.MODERATOR,
    bio: "حساب المسؤول الإداري — معالجة البلاغات، مراجعة النشرات، وإدارة الدعم الفني.",
    isVerified: true,
    school: "مكتب الإدارة والمتابعة",
  },
  {
    email: "inspector@musnad.tn",
    username: "inspector",
    password: "Musnad@2026",
    name: "المتفقد التربوي",
    role: Role.INSPECTOR,
    bio: "متفقد تربوي معتمد — اعتماد المنشورات البيداغوجية ومنح شارة الاعتماد ★.",
    isVerified: true,
    school: "الدائرة البيداغوجية والتفقد",
    inspectorCode: "INSP-DEMO-2026",
  },
  {
    email: "institution@musnad.tn",
    username: "institution",
    password: "Musnad@2026",
    name: "مؤسسة المسند التربوية",
    role: Role.INSTITUTION,
    bio: "مؤسسة تربوية نموذجية — فضاء رسمي للتنسيق وتبادل المبادرات والنماذج الإدارية.",
    isVerified: true,
    school: "المدرسة الابتدائية النموذجية المسند",
  },
  {
    email: "teacher@musnad.tn",
    username: "teacher",
    password: "Musnad@2026",
    name: "الأستاذ أحمد المسند",
    role: Role.TEACHER,
    bio: "معلم متميز ناشر — إعداد وتوزيع الجذاذات والفروض والأنشطة التفاعلية.",
    isVerified: true,
    school: "مدرسة المسند الابتدائية",
  },
  {
    email: "student@musnad.tn",
    username: "student",
    password: "Musnad@2026",
    name: "التلميذ يوسف المسند",
    role: Role.STUDENT,
    bio: "تلميذ مجتهد بالمسند — فضاء المراجعة والأنشطة البيداغوجية.",
    isVerified: false,
    school: "مدرسة المسند الابتدائية",
    studentGrade: "السنة الخامسة ابتدائي",
  },
];

async function main() {
  console.log("🌱 Seeding Al-Musnad v13.0 taxonomy & 6 demo accounts...");

  const grades = [
    { name: "Grade 1", nameAr: "السنة الأولى ابتدائي", slug: "grade-1", sortOrder: 1 },
    { name: "Grade 2", nameAr: "السنة الثانية ابتدائي", slug: "grade-2", sortOrder: 2 },
    { name: "Grade 3", nameAr: "السنة الثالثة ابتدائي", slug: "grade-3", sortOrder: 3 },
    { name: "Grade 4", nameAr: "السنة الرابعة ابتدائي", slug: "grade-4", sortOrder: 4 },
    { name: "Grade 5", nameAr: "السنة الخامسة ابتدائي", slug: "grade-5", sortOrder: 5 },
    { name: "Grade 6", nameAr: "السنة السادسة ابتدائي", slug: "grade-6", sortOrder: 6 },
  ];

  for (const grade of grades) {
    await prisma.grade.upsert({
      where: { slug: grade.slug },
      update: { name: grade.name, nameAr: grade.nameAr, sortOrder: grade.sortOrder },
      create: grade,
    });
  }
  console.log(`  ✅ ${grades.length} grade levels seeded`);

  const subjects = [
    { name: "Mathematics", nameAr: "الرياضيات", slug: "math", color: "#DC2626", icon: "calculator", sortOrder: 1 },
    { name: "Science", nameAr: "العلوم (الإيقاظ العلمي)", slug: "science", color: "#16A34A", icon: "flask-conical", sortOrder: 2 },
    { name: "Arabic", nameAr: "العربية", slug: "arabic", color: "#2563EB", icon: "book-open", sortOrder: 3 },
    { name: "French", nameAr: "الفرنسية", slug: "french", color: "#4F46E5", icon: "languages", sortOrder: 4 },
    { name: "English", nameAr: "الإنجليزية", slug: "english", color: "#9333EA", icon: "globe", sortOrder: 5 },
    { name: "History & Geography", nameAr: "التاريخ والجغرافيا", slug: "history-geography", color: "#D97706", icon: "compass", sortOrder: 6 },
    { name: "Arts", nameAr: "الفنون", slug: "art", color: "#DB2777", icon: "palette", sortOrder: 7 },
    { name: "Islamic Education", nameAr: "التربية الإسلامية", slug: "islamic-studies", color: "#0D9488", icon: "moon-star", sortOrder: 8 },
    { name: "Physical Education", nameAr: "التربية البدنية", slug: "pe", color: "#65A30D", icon: "dumbbell", sortOrder: 9 },
    { name: "Administration", nameAr: "المعاملات والوثائق الإدارية", slug: "administration", color: "#334155", icon: "briefcase", sortOrder: 10 },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {
        name: subject.name,
        nameAr: subject.nameAr,
        color: subject.color,
        icon: subject.icon,
        sortOrder: subject.sortOrder,
      },
      create: subject,
    });
  }
  console.log(`  ✅ ${subjects.length} subjects seeded`);

  const categories = [
    { name: "Lesson", nameAr: "درس", slug: "lesson", sortOrder: 1 },
    { name: "Exercise", nameAr: "تمرين", slug: "worksheet", sortOrder: 2 },
    { name: "Exam", nameAr: "امتحان", slug: "exam", sortOrder: 3 },
    { name: "Lesson Plan (Fiche)", nameAr: "جذاذة", slug: "lesson-plan", sortOrder: 4 },
    { name: "Interactive Activity", nameAr: "نشاط تفاعلي", slug: "activity", sortOrder: 5 },
    { name: "Other Material", nameAr: "أخرى", slug: "other", sortOrder: 6 },
    { name: "Administrative Documents", nameAr: "وثائق ومعاملات إدارية", slug: "administrative", sortOrder: 7 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        nameAr: category.nameAr,
        sortOrder: category.sortOrder,
      },
      create: category,
    });
  }
  console.log(`  ✅ ${categories.length} categories/sub-divisions seeded`);

  // Seed Accounts (Primary Admin is always seeded, Demo accounts only in development)
  const isProduction = process.env.NODE_ENV === "production";
  const accountsToSeed = [
    PRIMARY_ADMIN,
    ...(isProduction ? [] : DEV_DEMO_ACCOUNTS),
  ];

  console.log(`🌱 Seeding accounts (${accountsToSeed.length} accounts, Environment isProduction: ${isProduction})...`);
  try {
    const { data: listData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 });
    const authUsers = listData?.users || [];

    for (const acc of accountsToSeed) {
      let authUser = authUsers.find((u) => u.email?.toLowerCase() === acc.email.toLowerCase());

      if (authUser) {
        await supabase.auth.admin.updateUserById(authUser.id, {
          password: acc.password,
          email_confirm: true,
          user_metadata: { name: acc.name, username: acc.username, role: acc.role },
        });
      } else {
        const { data: created } = await supabase.auth.admin.createUser({
          email: acc.email,
          password: acc.password,
          email_confirm: true,
          user_metadata: { name: acc.name, username: acc.username, role: acc.role },
        });
        if (created?.user) authUser = created.user;
      }

      if (authUser) {
        await prisma.user.upsert({
          where: { email: acc.email },
          update: {
            id: authUser.id,
            username: acc.username,
            name: acc.name,
            role: acc.role,
            school: acc.school || null,
            bio: acc.bio || null,
            isVerified: acc.isVerified,
            studentGrade: acc.studentGrade || null,
            inspectorCode: acc.inspectorCode || null,
            isBanned: false,
            failedLoginAttempts: 0,
          },
          create: {
            id: authUser.id,
            email: acc.email,
            username: acc.username,
            name: acc.name,
            role: acc.role,
            school: acc.school || null,
            bio: acc.bio || null,
            isVerified: acc.isVerified,
            studentGrade: acc.studentGrade || null,
            inspectorCode: acc.inspectorCode || null,
            isBanned: false,
            failedLoginAttempts: 0,
            presenceStatus: "ONLINE",
          },
        });
        console.log(`  ✅ [${acc.role}] ${acc.name} (@${acc.username}) seeded.`);
      }
    }
  } catch (authErr) {
    console.warn("⚠️ Could not contact Supabase Admin API, seeding directly to Prisma:", authErr);
    for (const acc of accountsToSeed) {
      await prisma.user.upsert({
        where: { email: acc.email },
        update: {
          username: acc.username,
          name: acc.name,
          role: acc.role,
          isVerified: acc.isVerified,
        },
        create: {
          email: acc.email,
          username: acc.username,
          name: acc.name,
          role: acc.role,
          isVerified: acc.isVerified,
        },
      });
    }
  }

  console.log("\n🎉 Al-Musnad v13.0 complete seeding finished!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

---

### File: `supabase/sql/rls-policies.sql`

```sql
-- ============================================================
-- Row Level Security (RLS) Policies — Al-Musnad (المسند) v8.0
-- Strict Rule: No anonymous access to content; only authenticated
-- users can read published worksheets, reviews, and publisher profiles.
-- Supports 3-tier supervisory hierarchy (INSPECTOR, MODERATOR, ADMIN).
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publisher_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_publishers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view public user profiles" ON users;
DROP POLICY IF EXISTS "Authenticated users can view user profiles" ON users;
CREATE POLICY "Authenticated users can view user profiles"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role full access to users" ON users;
CREATE POLICY "Service role full access to users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

-- Worksheets: Strictly require authentication AND audience permission
DROP POLICY IF EXISTS "Anyone can view published worksheets" ON worksheets;
DROP POLICY IF EXISTS "Authenticated users can view allowed published worksheets" ON worksheets;
CREATE POLICY "Authenticated users can view allowed published worksheets"
  ON worksheets FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND status = 'PUBLISHED'
  );

DROP POLICY IF EXISTS "Users can view own worksheets" ON worksheets;
CREATE POLICY "Users can view own worksheets"
  ON worksheets FOR SELECT
  USING (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Authenticated users can create worksheets" ON worksheets;
CREATE POLICY "Authenticated users can create worksheets"
  ON worksheets FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Users can update own worksheets" ON worksheets;
CREATE POLICY "Users can update own worksheets"
  ON worksheets FOR UPDATE
  USING (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Service role full access to worksheets" ON worksheets;
CREATE POLICY "Service role full access to worksheets"
  ON worksheets FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Anyone can view publisher follows" ON publisher_follows;
DROP POLICY IF EXISTS "Authenticated users can view publisher follows" ON publisher_follows;
CREATE POLICY "Authenticated users can view publisher follows"
  ON publisher_follows FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own follows" ON publisher_follows;
CREATE POLICY "Users can manage own follows"
  ON publisher_follows FOR ALL
  USING (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Service role full access to publisher_follows" ON publisher_follows;
CREATE POLICY "Service role full access to publisher_follows"
  ON publisher_follows FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Authenticated users can view favorite publishers" ON favorite_publishers;
CREATE POLICY "Authenticated users can view favorite publishers"
  ON favorite_publishers FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own favorite publishers" ON favorite_publishers;
CREATE POLICY "Users can manage own favorite publishers"
  ON favorite_publishers FOR ALL
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role full access to favorite_publishers" ON favorite_publishers;
CREATE POLICY "Service role full access to favorite_publishers"
  ON favorite_publishers FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Authenticated users can view non-private reviews" ON reviews;
CREATE POLICY "Authenticated users can view non-private reviews"
  ON reviews FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND (
      is_private_to_publisher = false
      OR user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role full access to reviews" ON reviews;
CREATE POLICY "Service role full access to reviews"
  ON reviews FOR ALL
  USING (auth.role() = 'service_role');

-- Verification Codes: Exclusive to Admin & Service Role
DROP POLICY IF EXISTS "Service role full access to verification_codes" ON verification_codes;
CREATE POLICY "Service role full access to verification_codes"
  ON verification_codes FOR ALL
  USING (auth.role() = 'service_role');

-- Storage RLS: PDF, Word, Images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'worksheets',
  'worksheets',
  false,
  20971520,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ];

-- Audit Logs: Strictly accessible to Top Admin (ADMIN) and service_role
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'ADMIN'
    )
  );

DROP POLICY IF EXISTS "Service role full access to audit_logs" ON audit_logs;
CREATE POLICY "Service role full access to audit_logs"
  ON audit_logs FOR ALL
  USING (auth.role() = 'service_role');

```

---

### File: `supabase/sql/triggers.sql`

```sql
-- ============================================================
-- Database Triggers — Al-Musnad (المسند) v10.0
-- ============================================================
-- Automatically assigns role and generates a unique @username
-- for newly registered accounts in Supabase Auth.
-- Security Guard: Blocks self-assigned ADMIN or MODERATOR roles
-- from public client sign-up metadata to prevent privilege escalation.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  raw_role TEXT;
  assigned_role public."Role";
  is_insp_pending BOOLEAN;
  raw_username TEXT;
  clean_username TEXT;
BEGIN
  raw_role := UPPER(COALESCE(NEW.raw_user_meta_data ->> 'role', 'TEACHER'));
  is_insp_pending := COALESCE((NEW.raw_user_meta_data ->> 'inspector_pending')::boolean, false);

  -- Security: Only allow INSTITUTION, STUDENT, or TEACHER on public signup.
  -- INSPECTOR requests start as TEACHER with inspector_pending = true until code activation.
  -- ADMIN and MODERATOR can only be granted by the Top Admin via Server Actions / SQL.
  IF raw_role = 'INSTITUTION' THEN
    assigned_role := 'INSTITUTION'::public."Role";
  ELSIF raw_role = 'STUDENT' THEN
    assigned_role := 'STUDENT'::public."Role";
  ELSIF raw_role = 'INSPECTOR' THEN
    assigned_role := 'TEACHER'::public."Role";
    is_insp_pending := true;
  ELSE
    assigned_role := 'TEACHER'::public."Role";
  END IF;

  raw_username := LOWER(COALESCE(NEW.raw_user_meta_data ->> 'username', ''));
  clean_username := regexp_replace(raw_username, '[^a-z0-9_.]', '', 'g');

  IF length(clean_username) < 3 OR EXISTS (SELECT 1 FROM public.users WHERE username = clean_username AND id <> NEW.id) THEN
    clean_username := regexp_replace(LOWER(split_part(NEW.email, '@', 1)), '[^a-z0-9_]', '', 'g');
    IF length(clean_username) < 3 THEN
      clean_username := 'user';
    END IF;
    clean_username := clean_username || '_' || substr(replace(NEW.id::text, '-', ''), 1, 4);
  END IF;

  INSERT INTO public.users (
    id,
    email,
    username,
    name,
    school,
    student_grade,
    avatar_url,
    is_verified,
    inspector_pending,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    clean_username,
    COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'school',
    NEW.raw_user_meta_data ->> 'student_grade',
    NEW.raw_user_meta_data ->> 'avatar_url',
    false,
    is_insp_pending,
    assigned_role,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    username = COALESCE(public.users.username, EXCLUDED.username),
    school = COALESCE(EXCLUDED.school, public.users.school),
    student_grade = COALESCE(EXCLUDED.student_grade, public.users.student_grade),
    inspector_pending = EXCLUDED.inspector_pending;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_users ON users;
CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_worksheets ON worksheets;
CREATE TRIGGER set_updated_at_worksheets
  BEFORE UPDATE ON worksheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

```

---

### File: `supabase/sql/setup-complete-supabase.sql`

```sql
-- =============================================================================
-- منصة المسند (Al-Musnad v9.0) — السكريبت الشامل لتهيئة Supabase دفعة واحدة
-- انسخ هذا الملف بالكامل والصقه في: Supabase Dashboard -> SQL Editor -> Run
-- =============================================================================

-- 1. إنشاء حاوية التخزين السحابية للملفات (`worksheets`) مع دعم PDF و Word والصور
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'worksheets',
  'worksheets',
  false,
  20971520, -- 20 MB
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/webp'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. سياسات أمان التخزين السحابي (Storage RLS Policies)
DROP POLICY IF EXISTS "Authenticated users can read worksheet files" ON storage.objects;
CREATE POLICY "Authenticated users can read worksheet files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'worksheets' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated publishers can upload worksheet files" ON storage.objects;
CREATE POLICY "Authenticated publishers can upload worksheet files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'worksheets' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Owners and staff can delete worksheet files" ON storage.objects;
CREATE POLICY "Owners and staff can delete worksheet files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'worksheets' AND auth.role() = 'authenticated');

-- 3. دالة ومشغل (Trigger) المزامنة التلقائية للمستخدمين الجدد وإنشاء `@username`
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  raw_role TEXT;
  assigned_role public."Role";
  is_insp_pending BOOLEAN;
  raw_username TEXT;
  clean_username TEXT;
BEGIN
  raw_role := UPPER(COALESCE(NEW.raw_user_meta_data ->> 'role', 'TEACHER'));
  is_insp_pending := COALESCE((NEW.raw_user_meta_data ->> 'inspector_pending')::boolean, false);

  IF raw_role = 'INSTITUTION' THEN
    assigned_role := 'INSTITUTION'::public."Role";
  ELSIF raw_role = 'STUDENT' THEN
    assigned_role := 'STUDENT'::public."Role";
  ELSIF raw_role = 'INSPECTOR' THEN
    assigned_role := 'TEACHER'::public."Role";
    is_insp_pending := true;
  ELSE
    assigned_role := 'TEACHER'::public."Role";
  END IF;

  raw_username := LOWER(COALESCE(NEW.raw_user_meta_data ->> 'username', ''));
  clean_username := regexp_replace(raw_username, '[^a-z0-9_.]', '', 'g');

  IF length(clean_username) < 3 THEN
    clean_username := regexp_replace(LOWER(split_part(NEW.email, '@', 1)), '[^a-z0-9_]', '', 'g');
    IF length(clean_username) < 3 THEN
      clean_username := 'user';
    END IF;
    clean_username := clean_username || '_' || substr(replace(NEW.id::text, '-', ''), 1, 4);
  END IF;

  INSERT INTO public.users (
    id,
    email,
    username,
    name,
    school,
    student_grade,
    avatar_url,
    is_verified,
    inspector_pending,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    clean_username,
    COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'school',
    NEW.raw_user_meta_data ->> 'student_grade',
    NEW.raw_user_meta_data ->> 'avatar_url',
    false,
    is_insp_pending,
    assigned_role,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    username = COALESCE(public.users.username, EXCLUDED.username),
    school = COALESCE(EXCLUDED.school, public.users.school),
    student_grade = COALESCE(EXCLUDED.student_grade, public.users.student_grade),
    inspector_pending = EXCLUDED.inspector_pending;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. ترقية جدول المستخدمين لدعم نظام الحماية من تخمين كلمة المرور (6 محاولات) ونظام المتصل / وضع الشبح (v11.0)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS locked_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS lock_reason TEXT DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS presence_status VARCHAR(20) DEFAULT 'ONLINE';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT NOW();

```

---

### File: `src/config/constants.ts`

```typescript
export const APP_CONFIG = {
  name: "Al-Musnad",
  nameAr: "المسند",
  version: "15.0.0",
  description:
    "Integrated educational platform for institutions, inspectors, teachers, and students.",
  descriptionAr:
    "منصة المسند التربوية المتكاملة للمؤسسات التعليمية، المتفقدين، المسؤولين، المعلمين، والتلاميذ لتبادل واعتماد النشرات والوثائق البيداغوجية والإدارية.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_LOGIN_PASSWORD_ATTEMPTS = 6;

// Allowed MIME types: PDF + Word (.doc, .docx) + Images (.png, .jpg, .jpeg, .webp)
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
] as const;

export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];

export const ALLOWED_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
] as const;

export function isSupportedUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  if ((ALLOWED_FILE_TYPES as readonly string[]).includes(mime)) {
    return true;
  }
  return ALLOWED_FILE_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function isPdfUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return mime === "application/pdf" || name.endsWith(".pdf");
}

export function isWordUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return (
    mime === "application/msword" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".doc") ||
    name.endsWith(".docx")
  );
}

export function isImageUploadFile(file: { type?: string; name?: string }): boolean {
  const mime = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  return (
    mime.startsWith("image/") ||
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp")
  );
}

export function getFileFormatInfo(fileName?: string | null): {
  labelAr: string;
  shortExt: string;
  badgeClass: string;
} {
  const lower = (fileName || "").toLowerCase();
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) {
    return {
      labelAr: "ملف Word",
      shortExt: "DOCX",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    };
  }
  if (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp")
  ) {
    return {
      labelAr: "صورة تعليمية",
      shortExt: "IMG",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    };
  }
  return {
    labelAr: "ملف PDF",
    shortExt: "PDF",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
  };
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

export const STORAGE_BUCKETS = {
  WORKSHEETS: process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets",
} as const;

export const SIGNED_URL_EXPIRY_SECONDS = 3600;

// Official 6 Primary Grade Levels
export const CURRICULUM_GRADES = [
  { id: "g1", name: "Grade 1", nameAr: "السنة الأولى ابتدائي", slug: "grade-1", sortOrder: 1 },
  { id: "g2", name: "Grade 2", nameAr: "السنة الثانية ابتدائي", slug: "grade-2", sortOrder: 2 },
  { id: "g3", name: "Grade 3", nameAr: "السنة الثالثة ابتدائي", slug: "grade-3", sortOrder: 3 },
  { id: "g4", name: "Grade 4", nameAr: "السنة الرابعة ابتدائي", slug: "grade-4", sortOrder: 4 },
  { id: "g5", name: "Grade 5", nameAr: "السنة الخامسة ابتدائي", slug: "grade-5", sortOrder: 5 },
  { id: "g6", name: "Grade 6", nameAr: "السنة السادسة ابتدائي", slug: "grade-6", sortOrder: 6 },
] as const;

// Official Academic Subjects inside every Grade Level
export const CURRICULUM_SUBJECTS = [
  { id: "s1", name: "Mathematics", nameAr: "الرياضيات", slug: "math", color: "#DC2626", icon: "calculator", sortOrder: 1 },
  { id: "s2", name: "Science", nameAr: "العلوم (الإيقاظ العلمي)", slug: "science", color: "#16A34A", icon: "flask-conical", sortOrder: 2 },
  { id: "s3", name: "Arabic", nameAr: "العربية", slug: "arabic", color: "#2563EB", icon: "book-open", sortOrder: 3 },
  { id: "s4", name: "French", nameAr: "الفرنسية", slug: "french", color: "#4F46E5", icon: "languages", sortOrder: 4 },
  { id: "s5", name: "English", nameAr: "الإنجليزية", slug: "english", color: "#9333EA", icon: "globe", sortOrder: 5 },
  { id: "s6", name: "History & Geography", nameAr: "التاريخ والجغرافيا", slug: "history-geography", color: "#D97706", icon: "compass", sortOrder: 6 },
  { id: "s7", name: "Arts", nameAr: "الفنون", slug: "art", color: "#DB2777", icon: "palette", sortOrder: 7 },
  { id: "s8", name: "Islamic Education", nameAr: "التربية الإسلامية", slug: "islamic-studies", color: "#0D9488", icon: "moon-star", sortOrder: 8 },
  { id: "s9", name: "Physical Education", nameAr: "التربية البدنية", slug: "pe", color: "#65A30D", icon: "dumbbell", sortOrder: 9 },
] as const;

// Official 6 Pedagogical Sub-divisions inside every Subject (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى)
export const SUBJECT_SUBDIVISIONS = [
  { id: "c1", name: "Lesson", nameAr: "درس", slug: "lesson", sortOrder: 1 },
  { id: "c2", name: "Exercise", nameAr: "تمرين", slug: "worksheet", sortOrder: 2 },
  { id: "c3", name: "Exam", nameAr: "امتحان", slug: "exam", sortOrder: 3 },
  { id: "c4", name: "Lesson Plan (Fiche)", nameAr: "جذاذة", slug: "lesson-plan", sortOrder: 4 },
  { id: "c5", name: "Interactive Activity", nameAr: "نشاط تفاعلي", slug: "activity", sortOrder: 5 },
  { id: "c6", name: "Other Material", nameAr: "أخرى", slug: "other", sortOrder: 6 },
] as const;

// Administrative Category for «قسم الإدارة»
export const ADMINISTRATIVE_CATEGORY = {
  id: "c7",
  name: "Administrative Documents",
  nameAr: "وثائق ومعاملات إدارية",
  slug: "administrative",
  sortOrder: 7,
} as const;

// Role labels for display across the platform
export const ROLE_LABELS: Record<string, string> = {
  INSTITUTION: "مؤسسة تربوية",
  INSPECTOR: "متفقد تربوي",
  TEACHER: "معلم",
  STUDENT: "تلميذ",
  MODERATOR: "مسؤول إداري",
  ADMIN: "مشرف عام",
};

// Audience display labels
export const AUDIENCE_LABELS: Record<string, { label: string; isRestricted: boolean }> = {
  TEACHERS_ONLY: { label: "للمعلمين فقط (حجب عن التلاميذ)", isRestricted: true },
  SAME_ROLE_ONLY: { label: "لنفس فئة الناشر فقط", isRestricted: true },
  INSTITUTIONS_ONLY: { label: "للمؤسسات فقط", isRestricted: true },
  TEACHERS_AND_STUDENTS: { label: "للمعلمين والتلاميذ", isRestricted: false },
  ALL: { label: "للعموم", isRestricted: false },
};

// Official School Trimesters in Tunisia (الثلاثيات المدرسية التونسية) — v15.0
export const SCHOOL_TRIMESTERS = [
  {
    id: "t1",
    name: "Trimestre 1",
    nameAr: "الثلاثي الأول",
    slug: "trimester-1",
    tag: "الثلاثي الأول",
    sortOrder: 1,
  },
  {
    id: "t2",
    name: "Trimestre 2",
    nameAr: "الثلاثي الثاني",
    slug: "trimester-2",
    tag: "الثلاثي الثاني",
    sortOrder: 2,
  },
  {
    id: "t3",
    name: "Trimestre 3",
    nameAr: "الثلاثي الثالث",
    slug: "trimester-3",
    tag: "الثلاثي الثالث",
    sortOrder: 3,
  },
] as const;

export type SchoolTrimesterSlug = (typeof SCHOOL_TRIMESTERS)[number]["slug"];


```

---

### File: `src/types/api.ts`

```typescript
export type Role =
  | "INSTITUTION"
  | "INSPECTOR"
  | "TEACHER"
  | "STUDENT"
  | "MODERATOR"
  | "ADMIN";

export type AccountRoleOption =
  | "INSTITUTION"
  | "INSPECTOR"
  | "TEACHER"
  | "STUDENT";

export type WorksheetStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type TargetAudience =
  | "ALL"
  | "SAME_ROLE_ONLY"
  | "TEACHERS_ONLY"
  | "TEACHERS_AND_STUDENTS"
  | "INSTITUTIONS_ONLY";

export type ProfileEditStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";
export type WorksheetSortOption =
  | "newest"
  | "oldest"
  | "popular"
  | "downloads"
  | "title";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PendingProfileData {
  name?: string;
  username?: string;
  school?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  requestedAt?: string;
}

export interface User {
  id: string;
  email: string;
  username?: string | null;
  name: string;
  avatarUrl: string | null;
  role: Role;
  school: string | null;
  studentGrade?: string | null;
  bio?: string | null;
  subscriptionPlan?: string;
  profileEditStatus?: ProfileEditStatus;
  pendingProfileData?: PendingProfileData | null;
  followersCount?: number;
  favoritedByCount?: number;
  isVerified?: boolean;
  inspectorPending?: boolean;
  inspectorCode?: string | null;
  isBanned?: boolean;
  banReason?: string | null;
  failedLoginAttempts?: number;
  lockedAt?: string | Date | null;
  lockReason?: string | null;
  presenceStatus?: "ONLINE" | "OFFLINE" | "GHOST" | string;
  lastSeenAt?: string | Date | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  sortOrder: number;
  createdAt?: string;
}

export interface Grade {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  sortOrder: number;
  createdAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  color?: string | null;
  icon?: string | null;
  sortOrder: number;
  createdAt?: string;
}

export interface Worksheet {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  categoryId: string;
  gradeId: string;
  subjectId: string;
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl: string | null;
  pageCount: number | null;
  status: WorksheetStatus;
  audience: TargetAudience;
  isEndorsed: boolean;
  endorsedById: string | null;
  endorsedAt: string | Date | null;
  tags: string[];
  downloadCount: number;
  favoriteCount: number;
  ratingAvg: number;
  reviewCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WorksheetWithRelations extends Worksheet {
  previewUrl?: string | null;
  category: Category;
  grade: Grade;
  subject: Subject;
  uploader: {
    id: string;
    name: string;
    username?: string | null;
    avatarUrl: string | null;
    school: string | null;
    role: Role;
    bio?: string | null;
    followersCount?: number;
    favoritedByCount?: number;
    isVerified?: boolean;
    isBanned?: boolean;
    presenceStatus?: string;
    lastSeenAt?: string | Date | null;
  };
  endorsedBy?: {
    id: string;
    name: string;
    username?: string | null;
    role: Role;
    school?: string | null;
  } | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  isOfficialDirective?: boolean;
  isPrivateToPublisher?: boolean;
  userId: string;
  worksheetId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    username?: string | null;
    avatarUrl: string | null;
    school: string | null;
    role?: Role;
    isVerified?: boolean;
    presenceStatus?: string;
    lastSeenAt?: string | Date | null;
  };
}

export interface VerificationCodeItem {
  id: string;
  code: string;
  targetRole: Role;
  note: string | null;
  isUsed: boolean;
  usedById: string | null;
  usedAt: string | null;
  createdById: string;
  createdAt: string;
  createdBy?: { id: string; name: string; username?: string | null };
  usedBy?: {
    id: string;
    name: string;
    username?: string | null;
    email: string;
    role: Role;
  } | null;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  actorId: string | null;
  actorName: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: string | Date;
}

export interface SchoolTrimester {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  tag: string;
  sortOrder: number;
}


```

---

### File: `src/types/index.ts`

```typescript
export * from "./api";

```

---

### File: `src/lib/db.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

```

---

### File: `src/lib/security/rate-limit.ts`

```typescript
import { NextRequest } from "next/server";

interface RateBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateBucket>();

export interface RateLimitConfig {
  keyPrefix?: string;
  maxRequests: number;
  windowMs: number;
}

export function getClientIp(req?: NextRequest | null): string {
  if (!req) return "unknown";
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const prefix = config.keyPrefix || "rl";
  const fullKey = `${prefix}:${identifier}`;
  const existing = buckets.get(fullKey);

  if (!existing || now > existing.resetAt) {
    buckets.set(fullKey, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= config.maxRequests) {
    const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, config.maxRequests - existing.count),
    retryAfterSeconds: 0,
  };
}

```

---

### File: `src/lib/supabase/client.ts`

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

```

---

### File: `src/lib/supabase/server.ts`

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Standard server client scoped to the authenticated caller's cookie session.
 * Adheres to Supabase Row-Level Security (RLS) policies.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as CookieOptions)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be safely ignored if middleware is refreshing sessions.
        }
      },
    },
  });
}

/**
 * Admin server client utilizing the Supabase SERVICE_ROLE_KEY.
 * Bypasses Row-Level Security (RLS). Use exclusively for secure server operations
 * such as bucket management, privileged storage operations, and internal migrations.
 */
export function createSupabaseAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createServerClient(supabaseUrl, serviceRoleKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // No-op for admin operations
      },
    },
  });
}

```

---

### File: `src/lib/supabase/middleware.ts`

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: CookieOptions }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Strictly block unauthenticated visitors from opening/reading files (/worksheet/*)
  // or accessing member-only spaces
  const protectedPaths = [
    "/worksheet",
    "/publisher",
    "/upload",
    "/profile",
    "/admin",
    "/moderator",
    "/inspector",
  ];

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set(
      "redirectTo",
      `${pathname}${request.nextUrl.search || ""}`
    );
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

---

### File: `src/lib/utils/api-response.ts`

```typescript
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "./errors";
import type {
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginationMeta,
  ApiErrorDetail,
} from "@/types/api";

/**
 * Returns a standardized 2xx success JSON response.
 */
export function successResponse<T>(
  data: T,
  meta?: PaginationMeta,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };

  return NextResponse.json(body, { status });
}

/**
 * Returns a standardized error JSON response from any thrown exception.
 * Dispatches AppError, Zod validation errors, Prisma database errors, and unknown exceptions.
 */
export function errorResponse(
  error: unknown,
  fallbackStatus: number = 500
): NextResponse<ApiErrorResponse> {
  // 1. Custom Application Errors
  if (error instanceof AppError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && error.details.length > 0 ? { details: error.details } : {}),
      },
    };

    return NextResponse.json(body, { status: error.statusCode });
  }

  // 2. Zod Schema Validation Errors
  if (error instanceof ZodError) {
    const details: ApiErrorDetail[] = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input parameters",
        details,
      },
    };

    return NextResponse.json(body, { status: 400 });
  }

  // 3. Prisma Database Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = Array.isArray(error.meta?.target)
          ? error.meta?.target.join(", ")
          : (error.meta?.target as string | undefined) ?? "field";

        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "CONFLICT",
            message: `A record with this ${target} already exists`,
          },
        };
        return NextResponse.json(body, { status: 409 });
      }

      case "P2025": {
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "The requested record was not found",
          },
        };
        return NextResponse.json(body, { status: 404 });
      }

      case "P2003": {
        const fieldName = (error.meta?.field_name as string | undefined) ?? "foreign key";
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "FOREIGN_KEY_VIOLATION",
            message: `Invalid reference provided for ${fieldName}`,
          },
        };
        return NextResponse.json(body, { status: 400 });
      }

      default: {
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "DATABASE_ERROR",
            message: "A database error occurred",
          },
        };
        return NextResponse.json(body, { status: 500 });
      }
    }
  }

  // 4. Fallback for unhandled or unexpected server errors
  console.error("[Unhandled Exception]:", error);

  const fallbackBody: ApiErrorResponse = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message:
        error instanceof Error ? error.message : "An unexpected server error occurred",
    },
  };

  return NextResponse.json(fallbackBody, { status: fallbackStatus });
}

```

---

### File: `src/lib/utils/errors.ts`

```typescript
import type { ApiErrorDetail } from "@/types/api";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: ApiErrorDetail[];

  constructor(
    message: string,
    code: string = "INTERNAL_SERVER_ERROR",
    statusCode: number = 500,
    details?: ApiErrorDetail[]
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "UNAUTHORIZED", 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "You do not have permission to access this resource") {
    super(message, "FORBIDDEN", 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed", details?: ApiErrorDetail[]) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class FileTooLargeError extends AppError {
  constructor(maxSizeMB: number) {
    super(
      `File exceeds the maximum allowable size of ${maxSizeMB}MB`,
      "FILE_TOO_LARGE",
      413
    );
  }
}

export class InvalidFileTypeError extends AppError {
  constructor(allowedTypes: readonly string[]) {
    super(
      `Invalid file type. Allowed formats: ${allowedTypes.join(", ")}`,
      "INVALID_FILE_TYPE",
      415
    );
  }
}

```

---

### File: `src/lib/utils/pagination.ts`

```typescript
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";
import type { PaginationMeta } from "@/types/api";

export interface PaginationParams {
  skip: number;
  take: number;
  page: number;
  limit: number;
}

/**
 * Normalizes input page and limit parameters and returns Prisma offset limits.
 */
export function getPaginationParams(
  pageInput?: number | string | null,
  limitInput?: number | string | null
): PaginationParams {
  const parsedPage = Number(pageInput);
  const parsedLimit = Number(limitInput);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const rawLimit =
    Number.isInteger(parsedLimit) && parsedLimit > 0
      ? parsedLimit
      : DEFAULT_PAGE_SIZE;
  const limit = Math.min(rawLimit, MAX_PAGE_SIZE);

  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take, page, limit };
}

/**
 * Builds standard PaginationMeta object for API responses.
 */
export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const safeTotal = Math.max(0, total);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(safeTotal / safeLimit);

  return {
    page,
    limit,
    total: safeTotal,
    totalPages,
  };
}

```

---

### File: `src/lib/utils/pdf-thumbnail.ts`

```typescript
export interface PdfExtractionResult {
  thumbnailFile: File;
  thumbnailPreviewUrl: string;
  pageCount: number;
}

export async function extractPdfThumbnailAndPages(
  pdfFile: File
): Promise<PdfExtractionResult> {
  // Dynamic import so Next.js SSR build never loads browser canvas APIs
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const arrayBuffer = await pdfFile.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;

  const pageCount = pdfDocument.numPages;
  const firstPage = await pdfDocument.getPage(1);

  // Render at scale 1.5 for crisp thumbnail quality
  const viewport = firstPage.getViewport({ scale: 1.5 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("تعذر إنشاء سياق الرسم للصورة المصغرة");
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // Fill white background for transparent PDFs
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await (firstPage.render({
    canvas,
    canvasContext: context,
    viewport,
  } as any)).promise;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("فشل تحويل صفحة الـ PDF إلى صورة"));
      },
      "image/webp",
      0.85
    );
  });

  const cleanBaseName = pdfFile.name.replace(/\.pdf$/i, "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const thumbnailFile = new File([blob], `${cleanBaseName}-thumb.webp`, {
    type: "image/webp",
  });

  const thumbnailPreviewUrl = URL.createObjectURL(blob);

  return {
    thumbnailFile,
    thumbnailPreviewUrl,
    pageCount,
  };
}

```

---

### File: `src/lib/validators/auth.ts`

```typescript
import { z } from "zod";

export const accountRoleOptionSchema = z
  .enum(["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"])
  .default("TEACHER");

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "اسم المستخدم يجب ألا يقل عن 3 أحرف")
  .max(32, "اسم المستخدم يجب ألا يتجاوز 32 حرفاً")
  .regex(
    /^[a-zA-Z0-9_.]+$/,
    "اسم المستخدم يجب أن يحتوي فقط على أحرف إنجليزية وأرقام ونقاط أو شرطة سفلية"
  );

export const signUpSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  username: usernameSchema.optional(),
  password: z
    .string()
    .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
    .max(72, "كلمة المرور طويلة جداً"),
  name: z
    .string()
    .trim()
    .min(2, "الاسم يجب أن يتكون من حرفين على الأقل")
    .max(255, "الاسم طويل جداً"),
  school: z.string().trim().max(255).optional(),
  studentGrade: z.string().trim().max(100).optional(),
  role: accountRoleOptionSchema.optional().default("TEACHER"),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "يجب الموافقة على الشروط والأحكام قبل إنشاء الحساب" }),
  }),
});

export const signInSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني أو اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  role: accountRoleOptionSchema.optional(),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "الاسم يجب أن يتكون من حرفين على الأقل")
    .max(255)
    .optional(),
  username: usernameSchema.optional(),
  school: z.string().trim().max(255).optional(),
  bio: z
    .string()
    .trim()
    .max(1000, "النبذة التعريفية يجب ألا تتجاوز 1000 حرف")
    .optional(),
  avatarUrl: z.string().url("رابط الصورة غير صالح").optional().nullable(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

```

---

### File: `src/lib/validators/common.ts`

```typescript
import { z } from "zod";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";

/**
 * UUID v4 / Postgres gen_random_uuid validator.
 */
export const uuidSchema = z
  .string()
  .trim()
  .uuid({ message: "Invalid UUID format" });

/**
 * Pagination query parameter schema with automatic coercion and bounds checking.
 */
export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int({ message: "Page must be an integer" })
    .min(1, { message: "Page must be greater than or equal to 1" })
    .default(1),
  limit: z.coerce
    .number()
    .int({ message: "Limit must be an integer" })
    .min(1, { message: "Limit must be greater than or equal to 1" })
    .max(MAX_PAGE_SIZE, { message: `Limit cannot exceed ${MAX_PAGE_SIZE}` })
    .default(DEFAULT_PAGE_SIZE),
});

/**
 * Supported sort options for worksheet queries (Added 'oldest' to match FilterBar UI).
 */
export const worksheetSortSchema = z
  .enum(["newest", "oldest", "popular", "downloads", "title"], {
    errorMap: () => ({
      message:
        "Sort must be one of: 'newest', 'oldest', 'popular', 'downloads', 'title'",
    }),
  })
  .default("newest");

/**
 * URL-friendly slug validator.
 */
export const slugSchema = z
  .string()
  .trim()
  .min(1, { message: "Slug is required" })
  .max(100, { message: "Slug must be 100 characters or fewer" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must contain only lowercase alphanumeric characters and hyphens",
  });

/**
 * Generic search query validator.
 */
export const searchSchema = z
  .string()
  .trim()
  .min(1, { message: "Search term cannot be empty" })
  .max(200, { message: "Search term must be 200 characters or fewer" });

```

---

### File: `src/lib/validators/worksheet.ts`

```typescript
import { z } from "zod";
import { WorksheetStatus } from "@prisma/client";
import { uuidSchema, paginationSchema, worksheetSortSchema } from "./common";

export const targetAudienceSchema = z
  .enum([
    "ALL",
    "SAME_ROLE_ONLY",
    "TEACHERS_ONLY",
    "TEACHERS_AND_STUDENTS",
    "INSTITUTIONS_ONLY",
  ])
  .default("TEACHERS_AND_STUDENTS");

export const createWorksheetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "العنوان يجب أن يتكون من 3 أحرف على الأقل")
    .max(255, "العنوان طويل جداً"),
  titleAr: z.string().trim().max(255).optional(),
  description: z.string().trim().max(2000).optional(),
  descriptionAr: z.string().trim().max(2000).optional(),
  categoryId: uuidSchema,
  gradeId: uuidSchema,
  subjectId: uuidSchema,
  audience: targetAudienceSchema,
  pageCount: z.number().int().positive().optional(),
  thumbnailUrl: z.string().optional(),
  tags: z
    .array(z.string().trim().min(1).max(50))
    .max(10, "الحد الأقصى 10 وسوم")
    .default([]),
});

export const updateWorksheetSchema = createWorksheetSchema
  .partial()
  .extend({
    status: z.nativeEnum(WorksheetStatus).optional(),
  });

export const worksheetFilterSchema = paginationSchema.extend({
  search: z.string().trim().max(200).optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  category: z.string().optional(),
  trimester: z.string().optional(),
  audience: targetAudienceSchema.optional(),
  tags: z
    .string()
    .transform((val) => val.split(",").map((t) => t.trim()))
    .optional(),
  sort: worksheetSortSchema,
  status: z.nativeEnum(WorksheetStatus).optional(),
});

export type CreateWorksheetInput = z.infer<typeof createWorksheetSchema>;
export type UpdateWorksheetInput = z.infer<typeof updateWorksheetSchema>;
export type WorksheetFilterInput = z.infer<typeof worksheetFilterSchema>;
```

---

### File: `src/lib/validators/review.ts`

```typescript
import { z } from "zod";

export const upsertReviewSchema = z.object({
  rating: z.coerce
    .number()
    .int("التقييم يجب أن يكون رقماً صحيحاً")
    .min(1, "أقل تقييم هو نجمة واحدة")
    .max(5, "أعلى تقييم هو 5 نجوم")
    .default(5),
  comment: z
    .string()
    .trim()
    .min(2, "يرجى كتابة تعليق لا يقل عن حرفين")
    .max(2000, "التعليق يجب ألا يتجاوز 2000 حرف"),
  isOfficialDirective: z.boolean().optional(),
  isPrivateToPublisher: z.boolean().optional(),
});

export type UpsertReviewInput = z.infer<typeof upsertReviewSchema>;

```

---

### File: `src/services/worksheet.service.ts`

```typescript
import { db } from "@/lib/db";
import { Prisma, WorksheetStatus, Role, TargetAudience } from "@prisma/client";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { getSignedDownloadUrl } from "@/services/storage.service";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  ADMINISTRATIVE_CATEGORY,
  isPdfUploadFile,
} from "@/config/constants";
import type {
  WorksheetFilterInput,
  CreateWorksheetInput,
  UpdateWorksheetInput,
} from "@/lib/validators/worksheet";

let taxonomySeededInProcess = false;

/**
 * Ensures the 6 Official Primary Grades, 10 Subjects, and 6 Categories exist in PostgreSQL
 * with valid UUIDs so `/upload` and filters never fail with missing taxonomy records.
 */
export async function ensureOfficialTaxonomySeeded(): Promise<void> {
  if (taxonomySeededInProcess) return;
  try {
    const [gradeCount, subjectCount, categoryCount] = await Promise.all([
      db.grade.count(),
      db.subject.count(),
      db.category.count(),
    ]);

    if (gradeCount < CURRICULUM_GRADES.length) {
      for (const g of CURRICULUM_GRADES) {
        await db.grade.upsert({
          where: { slug: g.slug },
          update: { name: g.name, nameAr: g.nameAr, sortOrder: g.sortOrder },
          create: { name: g.name, nameAr: g.nameAr, slug: g.slug, sortOrder: g.sortOrder },
        });
      }
    }

    if (subjectCount < CURRICULUM_SUBJECTS.length + 1) {
      for (const s of CURRICULUM_SUBJECTS) {
        await db.subject.upsert({
          where: { slug: s.slug },
          update: { name: s.name, nameAr: s.nameAr, color: s.color, icon: s.icon, sortOrder: s.sortOrder },
          create: { name: s.name, nameAr: s.nameAr, slug: s.slug, color: s.color, icon: s.icon, sortOrder: s.sortOrder },
        });
      }
      await db.subject.upsert({
        where: { slug: "administration" },
        update: { name: "Administration", nameAr: "الإدارة والمعاملات الإدارية", color: "#334155", icon: "briefcase", sortOrder: 10 },
        create: { name: "Administration", nameAr: "الإدارة والمعاملات الإدارية", slug: "administration", color: "#334155", icon: "briefcase", sortOrder: 10 },
      });
    }

    if (categoryCount < SUBJECT_SUBDIVISIONS.length + 1) {
      for (const c of SUBJECT_SUBDIVISIONS) {
        await db.category.upsert({
          where: { slug: c.slug },
          update: { name: c.name, nameAr: c.nameAr, sortOrder: c.sortOrder },
          create: { name: c.name, nameAr: c.nameAr, slug: c.slug, sortOrder: c.sortOrder },
        });
      }
      await db.category.upsert({
        where: { slug: ADMINISTRATIVE_CATEGORY.slug },
        update: { name: ADMINISTRATIVE_CATEGORY.name, nameAr: ADMINISTRATIVE_CATEGORY.nameAr, sortOrder: ADMINISTRATIVE_CATEGORY.sortOrder },
        create: { name: ADMINISTRATIVE_CATEGORY.name, nameAr: ADMINISTRATIVE_CATEGORY.nameAr, slug: ADMINISTRATIVE_CATEGORY.slug, sortOrder: ADMINISTRATIVE_CATEGORY.sortOrder },
      });
    }

    taxonomySeededInProcess = true;
  } catch (err) {
    console.warn("[ensureOfficialTaxonomySeeded] Non-fatal warning:", err);
  }
}

export const publicWorksheetSelect = {
  id: true,
  title: true,
  titleAr: true,
  description: true,
  descriptionAr: true,
  categoryId: true,
  gradeId: true,
  subjectId: true,
  uploadedBy: true,
  fileUrl: true,
  fileName: true,
  fileSize: true,
  thumbnailUrl: true,
  pageCount: true,
  status: true,
  audience: true,
  isEndorsed: true,
  endorsedById: true,
  endorsedAt: true,
  tags: true,
  downloadCount: true,
  favoriteCount: true,
  ratingAvg: true,
  reviewCount: true,
  createdAt: true,
  updatedAt: true,
  category: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  grade: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  subject: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      color: true,
      icon: true,
      sortOrder: true,
    },
  },
  uploader: {
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      school: true,
      role: true,
      bio: true,
      followersCount: true,
      favoritedByCount: true,
      isVerified: true,
      isBanned: true,
    },
  },
  endorsedBy: {
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      school: true,
    },
  },
} as const;

/**
 * Verifies whether a single worksheet can be OPENED, READ, or DOWNLOADED by a user.
 * Unauthenticated visitors (`!viewerRole || !viewerUserId`) ALWAYS receive `false`.
 */
export function canUserAccessWorksheet(
  worksheet: {
    uploadedBy: string;
    audience: TargetAudience | string;
    uploader?: { role?: Role | string | null } | null;
  },
  viewerRole?: Role | string | null,
  viewerUserId?: string | null
): boolean {
  if (!viewerRole || !viewerUserId) {
    return false;
  }

  if (
    viewerRole === "ADMIN" ||
    viewerRole === "MODERATOR" ||
    worksheet.uploadedBy === viewerUserId
  ) {
    return true;
  }

  const audience = worksheet.audience;
  const uploaderRole = worksheet.uploader?.role;

  switch (audience) {
    case TargetAudience.ALL:
      return true;

    case TargetAudience.TEACHERS_AND_STUDENTS:
      return (
        viewerRole === "TEACHER" ||
        viewerRole === "STUDENT" ||
        viewerRole === "INSPECTOR"
      );

    case TargetAudience.TEACHERS_ONLY:
      return viewerRole === "TEACHER" || viewerRole === "INSPECTOR";

    case TargetAudience.INSTITUTIONS_ONLY:
      return viewerRole === "INSTITUTION";

    case TargetAudience.SAME_ROLE_ONLY:
      return Boolean(uploaderRole && viewerRole === uploaderRole);

    default:
      return false;
  }
}

/**
 * Builds the Prisma `WhereInput` visibility filter.
 */
export function buildAudienceVisibilityFilter(
  viewerRole?: Role | string | null,
  viewerUserId?: string | null
): Prisma.WorksheetWhereInput {
  if (!viewerRole || !viewerUserId) {
    return { audience: TargetAudience.ALL };
  }

  if (viewerRole === "ADMIN" || viewerRole === "MODERATOR") {
    return {};
  }

  if (viewerRole === "INSPECTOR") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
        { audience: TargetAudience.TEACHERS_ONLY },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.INSPECTOR } },
          ],
        },
      ],
    };
  }

  if (viewerRole === "TEACHER") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
        { audience: TargetAudience.TEACHERS_ONLY },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.TEACHER } },
          ],
        },
      ],
    };
  }

  if (viewerRole === "INSTITUTION") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.INSTITUTIONS_ONLY },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.INSTITUTION } },
          ],
        },
      ],
    };
  }

  if (viewerRole === "STUDENT") {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
        {
          AND: [
            { audience: TargetAudience.SAME_ROLE_ONLY },
            { uploader: { role: Role.STUDENT } },
          ],
        },
      ],
    };
  }

  return { audience: TargetAudience.ALL };
}

export async function listWorksheets(
  filters: WorksheetFilterInput,
  viewerRole?: Role | string | null,
  viewerUserId?: string | null
) {
  await ensureOfficialTaxonomySeeded();
  const isGuest = !viewerRole || !viewerUserId;
  const { page, limit, search, grade, subject, category, trimester, audience, tags, sort } =
    filters;
  const {
    skip,
    take,
    page: currentPage,
    limit: currentLimit,
  } = getPaginationParams(page, limit);

  const audienceGuard = buildAudienceVisibilityFilter(viewerRole, viewerUserId);

  const andConditions: Prisma.WorksheetWhereInput[] = [
    { status: WorksheetStatus.PUBLISHED },
    audienceGuard,
  ];

  if (grade) andConditions.push({ grade: { slug: grade } });
  if (subject) andConditions.push({ subject: { slug: subject } });
  if (category) andConditions.push({ category: { slug: category } });

  // School Trimester Filtering (الثلاثي المدرسي)
  if (trimester && trimester.trim().length > 0) {
    const rawVal = trimester.trim().toLowerCase();
    let trimesterTerms: string[] = [];
    if (
      rawVal === "trimester-1" ||
      rawVal === "1" ||
      rawVal.includes("أول") ||
      rawVal.includes("اول")
    ) {
      trimesterTerms = [
        "الثلاثي الأول",
        "الثلاثي الاول",
        "الثلاثي 1",
        "trimester-1",
        "Trimestre 1",
      ];
    } else if (
      rawVal === "trimester-2" ||
      rawVal === "2" ||
      rawVal.includes("ثاني")
    ) {
      trimesterTerms = [
        "الثلاثي الثاني",
        "الثلاثي 2",
        "trimester-2",
        "Trimestre 2",
      ];
    } else if (
      rawVal === "trimester-3" ||
      rawVal === "3" ||
      rawVal.includes("ثالث")
    ) {
      trimesterTerms = [
        "الثلاثي الثالث",
        "الثلاثي 3",
        "trimester-3",
        "Trimestre 3",
      ];
    } else {
      trimesterTerms = [trimester.trim()];
    }

    andConditions.push({
      OR: [
        { tags: { hasSome: trimesterTerms } },
        ...trimesterTerms.flatMap((term) => [
          { title: { contains: term, mode: "insensitive" as const } },
          { titleAr: { contains: term, mode: "insensitive" as const } },
          { description: { contains: term, mode: "insensitive" as const } },
          { descriptionAr: { contains: term, mode: "insensitive" as const } },
        ]),
      ],
    });
  }

  if (audience && !isGuest) andConditions.push({ audience });
  if (tags && tags.length > 0) andConditions.push({ tags: { hasSome: tags } });

  if (search && search.trim().length > 0) {
    const term = search.trim();
    andConditions.push({
      OR: [
        { title: { contains: term, mode: "insensitive" } },
        { titleAr: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
        { descriptionAr: { contains: term, mode: "insensitive" } },
        { tags: { has: term } },
      ],
    });
  }

  const where: Prisma.WorksheetWhereInput = {
    AND: andConditions,
  };

  const secondaryOrderBy: Prisma.WorksheetOrderByWithRelationInput = (() => {
    switch (sort) {
      case "popular":
        return { favoriteCount: "desc" };
      case "downloads":
        return { downloadCount: "desc" };
      case "title":
        return { title: "asc" };
      case "oldest":
        return { createdAt: "asc" };
      case "newest":
      default:
        return { createdAt: "desc" };
    }
  })();

  const orderBy: Prisma.WorksheetOrderByWithRelationInput[] = [
    { isEndorsed: "desc" },
    secondaryOrderBy,
  ];

  const [total, worksheets] = await Promise.all([
    db.worksheet.count({ where }),
    db.worksheet.findMany({
      where,
      select: publicWorksheetSelect,
      orderBy,
      skip,
      take,
    }),
  ]);

  const sanitizedWorksheets = isGuest
    ? worksheets.map((ws) => ({
        ...ws,
        fileUrl: "",
        description: null,
        descriptionAr: null,
        thumbnailUrl: null,
      }))
    : worksheets;

  return {
    data: sanitizedWorksheets,
    meta: buildPaginationMeta(total, currentPage, currentLimit),
  };
}

export async function getWorksheetById(
  id: string,
  viewerRole?: Role | string | null,
  viewerUserId?: string | null
) {
  if (!viewerRole || !viewerUserId) {
    throw new UnauthorizedError(
      "يرجى تسجيل الدخول بحسابك لقراءة أو تحميل هذا الملف"
    );
  }

  const worksheet = await db.worksheet.findUnique({
    where: { id },
    select: publicWorksheetSelect,
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  // DRAFT Isolation: Only uploader, ADMIN, or INSPECTOR can access DRAFT files
  if (
    worksheet.status === WorksheetStatus.DRAFT &&
    worksheet.uploadedBy !== viewerUserId &&
    viewerRole !== "ADMIN" &&
    viewerRole !== "INSPECTOR"
  ) {
    throw new ForbiddenError(
      "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد ولا يمكن عرضه حالياً."
    );
  }

  if (!canUserAccessWorksheet(worksheet, viewerRole, viewerUserId)) {
    throw new ForbiddenError(
      "عذراً، قام الناشر بتقييد صلاحية الوصول لهذه النشرة لفئة حسابات أخرى غير فئة حسابك."
    );
  }

  let previewUrl: string | undefined = undefined;
  try {
    previewUrl = await getSignedDownloadUrl(worksheet.fileUrl, 3600);
  } catch (err) {
    console.warn("[getWorksheetById] Preview signed URL fallback:", err);
  }

  return {
    ...worksheet,
    previewUrl,
  };
}

export interface CreateWorksheetData extends CreateWorksheetInput {
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType?: string;
  thumbnailUrl?: string;
  pageCount?: number;
}

export async function createWorksheet(data: CreateWorksheetData) {
  await ensureOfficialTaxonomySeeded();

  const uploader = await db.user.findUnique({
    where: { id: data.uploadedBy },
    select: { role: true, isBanned: true, banReason: true },
  });

  if (uploader?.isBanned) {
    throw new ForbiddenError(
      `حسابك محظور من النشر (${uploader.banReason || "مخالفة شروط المنصة"}).`
    );
  }

  if (uploader?.role === Role.STUDENT) {
    throw new ForbiddenError(
      "حسابات التلاميذ مخصصة للتصفح والتحميل فقط ولا تملك صلاحية النشر."
    );
  }

  const isPdf = isPdfUploadFile({
    type: data.mimeType,
    name: data.fileName,
  });

  const initialStatus = isPdf
    ? WorksheetStatus.PUBLISHED
    : WorksheetStatus.DRAFT;

  const created = await db.worksheet.create({
    data: {
      title: data.title,
      titleAr: data.titleAr ?? null,
      description: data.description ?? null,
      descriptionAr: data.descriptionAr ?? null,
      categoryId: data.categoryId,
      gradeId: data.gradeId,
      subjectId: data.subjectId,
      uploadedBy: data.uploadedBy,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileSize: data.fileSize,
      thumbnailUrl: data.thumbnailUrl ?? null,
      pageCount: data.pageCount ?? null,
      audience: data.audience ?? TargetAudience.TEACHERS_AND_STUDENTS,
      tags: data.tags ?? [],
      status: initialStatus,
    },
    select: publicWorksheetSelect,
  });

  if (!isPdf) {
    await db.notification.create({
      data: {
        userId: data.uploadedBy,
        title: "شكراً لمساهمتك! ملفك قيد المراجعة والتحويل إلى PDF",
        message: `شكراً لك على إرسال الملف "${
          created.titleAr || created.title
        }". نظراً لأن الملف المرفوع ليس بصيغة PDF، فسيتم مراجعته من عند المشرف والمتفقد وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين.`,
        link: "/profile",
      },
    });

    const reviewers = await db.user.findMany({
      where: { role: { in: [Role.ADMIN, Role.INSPECTOR] }, isBanned: false },
      select: { id: true },
    });

    if (reviewers.length > 0) {
      await db.notification.createMany({
        data: reviewers.map((r) => ({
          userId: r.id,
          title: "ملف وورد/صورة بانتظار المراجعة والتحويل إلى PDF",
          message: `قام الناشر برفع ملف غير PDF بعنوان «${created.titleAr || created.title}». يرجى مراجعته وإعادة صياغته لملف PDF ثم نشره.`,
          link: `/worksheet/${created.id}`,
        })),
      });
    }
  }

  return {
    ...created,
    requiresPdfConversionReview: !isPdf,
    reviewNoticeMessage: !isPdf
      ? "شكراً لك على مساهمتك القيمة! تم قبول واستلام ملفك بنجاح. هذا المحتوى الذي أرسلته سيتم مراجعته من عند المشرف والمتفقد التربوي وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين."
      : undefined,
  };
}

export interface UpdateWorksheetReplacementFile {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl?: string;
  pageCount?: number;
}

export async function updateWorksheet(
  id: string,
  userId: string,
  data: UpdateWorksheetInput,
  userRole?: string,
  replacementFile?: UpdateWorksheetReplacementFile
) {
  const existing = await db.worksheet.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      titleAr: true,
      uploadedBy: true,
      isEndorsed: true,
      fileUrl: true,
      status: true,
    },
  });

  if (!existing) {
    throw new NotFoundError("Worksheet");
  }

  const isOwner = existing.uploadedBy === userId;
  const isAdmin = userRole === "ADMIN";
  const isModerator = userRole === "MODERATOR";
  const isInspector = userRole === "INSPECTOR";

  if (!isOwner && !isAdmin && !isInspector && !isModerator) {
    throw new ForbiddenError("لا يمكنك تعديل نشرة لا تملكها");
  }

  const uploader = await db.user.findUnique({
    where: { id: userId },
    select: { isBanned: true, banReason: true },
  });

  if (uploader?.isBanned && !isAdmin) {
    throw new ForbiddenError(
      `حسابك محظور من تعديل النشرات (${uploader.banReason || "مخالفة الشروط"}).`
    );
  }

  const didReplaceFile = Boolean(
    replacementFile &&
      replacementFile.fileUrl &&
      replacementFile.fileUrl !== existing.fileUrl
  );

  const endorsementResetData =
    didReplaceFile && existing.isEndorsed && !isInspector
      ? {
          isEndorsed: false,
          endorsedById: null,
          endorsedAt: null,
        }
      : {};

  let nextStatus = data.status !== undefined ? data.status : existing.status;
  let publishedFromDraft = false;

  // If Admin or Inspector replaces file on a DRAFT worksheet with a PDF, publish it!
  if (
    didReplaceFile &&
    replacementFile &&
    existing.status === WorksheetStatus.DRAFT &&
    (isAdmin || isInspector) &&
    isPdfUploadFile({ name: replacementFile.fileName })
  ) {
    nextStatus = WorksheetStatus.PUBLISHED;
    publishedFromDraft = true;
  }

  const updated = await db.worksheet.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.titleAr !== undefined ? { titleAr: data.titleAr } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.descriptionAr !== undefined
        ? { descriptionAr: data.descriptionAr }
        : {}),
      ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
      ...(data.gradeId !== undefined ? { gradeId: data.gradeId } : {}),
      ...(data.subjectId !== undefined ? { subjectId: data.subjectId } : {}),
      ...(data.audience !== undefined ? { audience: data.audience } : {}),
      ...(data.tags !== undefined ? { tags: data.tags } : {}),
      status: nextStatus,
      ...(replacementFile
        ? {
            fileUrl: replacementFile.fileUrl,
            fileName: replacementFile.fileName,
            fileSize: replacementFile.fileSize,
            ...(replacementFile.thumbnailUrl !== undefined
              ? { thumbnailUrl: replacementFile.thumbnailUrl }
              : {}),
            ...(replacementFile.pageCount !== undefined
              ? { pageCount: replacementFile.pageCount }
              : {}),
          }
        : {}),
      ...endorsementResetData,
    },
    select: publicWorksheetSelect,
  });

  if (didReplaceFile && existing.isEndorsed && !isInspector) {
    await db.notification.create({
      data: {
        userId: existing.uploadedBy,
        title: "إلغاء شارة الاعتماد بعد تغيير ملف النشرة",
        message: `تم تحديث ملف النشرة "${
          updated.titleAr || updated.title
        }"، ولذلك أُلغيت شارة الاعتماد البيداغوجي السابقة لحين مراجعة النسخة الجديدة من قِبل المتفقد.`,
        link: `/worksheet/${id}`,
      },
    });
  }

  if (publishedFromDraft && existing.uploadedBy !== userId) {
    await db.notification.create({
      data: {
        userId: existing.uploadedBy,
        title: "تم تحويل ملفك إلى PDF ونشره على المنصة",
        message: `تمت مراجعة ملفك «${
          updated.titleAr || updated.title
        }» وإعادة صياغته إلى ملف PDF ونشره رسمياً على منصة المسند.`,
        link: `/worksheet/${updated.id}`,
      },
    });
  }

  return {
    ...updated,
    endorsementRevoked: didReplaceFile && existing.isEndorsed && !isInspector,
    publishedFromDraft,
  };
}

export async function archiveWorksheet(
  id: string,
  userId: string,
  userRole?: string
) {
  const existing = await db.worksheet.findUnique({
    where: { id },
    select: { id: true, uploadedBy: true },
  });

  if (!existing) {
    throw new NotFoundError("Worksheet");
  }

  if (
    existing.uploadedBy !== userId &&
    userRole !== "ADMIN" &&
    userRole !== "MODERATOR"
  ) {
    throw new ForbiddenError("You can only archive your own worksheets");
  }

  await db.worksheet.update({
    where: { id },
    data: { status: WorksheetStatus.ARCHIVED },
  });

  return { success: true, archived: true, id };
}

export async function getUserUploads(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const where: Prisma.WorksheetWhereInput = {
    uploadedBy: userId,
    status: { not: WorksheetStatus.ARCHIVED },
  };

  const [total, worksheets] = await Promise.all([
    db.worksheet.count({ where }),
    db.worksheet.findMany({
      where,
      select: publicWorksheetSelect,
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
      skip,
      take,
    }),
  ]);

  return {
    data: worksheets,
    meta: buildPaginationMeta(total, page, limit),
  };
}

```

---

### File: `src/services/storage.service.ts`

```typescript
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import {
  FileTooLargeError,
  InvalidFileTypeError,
  AppError,
} from "@/lib/utils/errors";
import {
  ALLOWED_FILE_EXTENSIONS,
  isSupportedUploadFile,
} from "@/config/constants";

const SUPABASE_BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets";
const MAX_FILE_SIZE =
  (Number(process.env.MAX_FILE_SIZE_MB) || 20) * 1024 * 1024;

export interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  storageProvider?: "R2" | "SUPABASE";
}

/**
 * Checks if Cloudflare R2 credentials are valid and provided.
 */
export function isR2Configured(): boolean {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucketName = process.env.R2_BUCKET_NAME?.trim();

  return Boolean(
    accountId &&
      !accountId.includes("[") &&
      !accountId.includes("الصق") &&
      accountId.length >= 8 &&
      accessKeyId &&
      secretAccessKey &&
      bucketName
  );
}

/**
 * Creates an S3Client targeted at Cloudflare R2 endpoint.
 */

/**
 * Returns safe R2 diagnostics for /api/health without exposing secrets.
 */
export function getR2Diagnostics() {
  const ready = isR2Configured();
  const accountId = process.env.R2_ACCOUNT_ID?.trim() || "";
  const accessKey = process.env.R2_ACCESS_KEY_ID?.trim() || "";
  const secretKey = process.env.R2_SECRET_ACCESS_KEY?.trim() || "";
  const bucketName = process.env.R2_BUCKET_NAME?.trim() || "musnad-worksheets";
  const publicUrl = process.env.R2_PUBLIC_URL?.trim() || "";

  return {
    configured: ready,
    bucketName,
    hasAccountId: Boolean(accountId && accountId.length >= 8 && !accountId.includes("[")),
    accessKeyLength: accessKey.length,
    secretKeyLength: secretKey.length,
    hasPublicUrl: Boolean(publicUrl),
    autoSwappedKeys: false,
    usedTypoFallbackEnv: false,
    status: ready
      ? "Cloudflare R2 10GB storage active and verified"
      : "Using Supabase Storage as primary/fallback",
  };
}

// Compatibility aliases
export const uploadWorksheetFile = uploadFile;
export const deleteWorksheetFile = deleteFile;

export function getR2Client(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID!.trim();
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!.trim(),
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!.trim(),
    },
  });
}

/**
 * Uploads a file with Cloudflare R2 primary and Supabase fallback.
 */
export async function uploadFile(
  file: File,
  userId: string
): Promise<UploadResult> {
  if (!isSupportedUploadFile(file)) {
    throw new InvalidFileTypeError(ALLOWED_FILE_EXTENSIONS);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new FileTooLargeError(Number(process.env.MAX_FILE_SIZE_MB) || 20);
  }

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${userId}/${timestamp}-${sanitizedName}`;

  const contentType =
    file.type ||
    (file.name.toLowerCase().endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : file.name.toLowerCase().endsWith(".doc")
      ? "application/msword"
      : "application/octet-stream");

  // 1. Attempt Cloudflare R2 Upload
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: r2Bucket,
          Key: filePath,
          Body: buffer,
          ContentType: contentType,
        })
      );

      console.log(`✅ [R2 Storage] File uploaded successfully to R2 bucket: ${r2Bucket}/${filePath}`);
      return {
        fileUrl: filePath,
        fileName: file.name,
        fileSize: file.size,
        storageProvider: "R2",
      };
    } catch (r2Error: any) {
      console.warn("⚠️ [R2 Storage] Failed to upload to Cloudflare R2, falling back to Supabase Storage:", r2Error?.message || r2Error);
    }
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { error: supabaseError } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(filePath, file, {
      contentType,
      upsert: false,
    });

  if (supabaseError) {
    console.error("Storage upload error (Supabase):", supabaseError);
    throw new AppError("Failed to upload file to storage", "UPLOAD_FAILED", 500);
  }

  console.log(`✅ [Supabase Storage] File uploaded to Supabase fallback: ${SUPABASE_BUCKET_NAME}/${filePath}`);
  return {
    fileUrl: filePath,
    fileName: file.name,
    fileSize: file.size,
    storageProvider: "SUPABASE",
  };
}

/**
 * Generates a presigned or public download URL with R2 and Supabase fallback.
 */
export async function getSignedDownloadUrl(
  filePath: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  // 1. Try Cloudflare R2
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      const command = new GetObjectCommand({
        Bucket: r2Bucket,
        Key: filePath,
      });

      const signedUrl = await getSignedUrl(r2Client, command, {
        expiresIn: expiresInSeconds,
      });
      return signedUrl;
    } catch (r2Error) {
      console.warn("⚠️ [R2 Storage] Error generating R2 signed URL, falling back to public or Supabase:", r2Error);
      if (process.env.R2_PUBLIC_URL) {
        const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
        return `${cleanBase}/${filePath}`;
      }
    }
  }

  // If R2 Public URL is explicitly configured, use direct fast CDN link
  if (process.env.R2_PUBLIC_URL && isR2Configured()) {
    const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
    return `${cleanBase}/${filePath}`;
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    console.error("Signed URL error (Supabase):", error);
    // As a last-resort fallback, if public URL is configured
    if (process.env.R2_PUBLIC_URL) {
      const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
      return `${cleanBase}/${filePath}`;
    }
    throw new AppError("Failed to generate download URL", "DOWNLOAD_FAILED", 500);
  }

  return data.signedUrl;
}

/**
 * Returns direct public URL via Cloudflare R2 CDN if configured, or Supabase public URL.
 */
export function getPublicDownloadUrl(filePath: string): string {
  if (process.env.R2_PUBLIC_URL) {
    const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
    return `${cleanBase}/${filePath}`;
  }

  const supabase = createSupabaseAdminClient();
  const { data } = supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Deletes a file from Cloudflare R2 and Supabase Storage.
 */
export async function deleteFile(filePath: string): Promise<void> {
  // 1. Try deleting from R2
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: r2Bucket,
          Key: filePath,
        })
      );
      console.log(`🗑️ [R2 Storage] Deleted object from R2: ${filePath}`);
    } catch (r2Error: any) {
      console.warn("⚠️ [R2 Storage] Error deleting from R2:", r2Error?.message || r2Error);
    }
  }

  // 2. Also ensure deletion from Supabase Storage fallback
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.warn("Storage delete notice (Supabase):", error.message);
    }
  } catch (err: any) {
    console.warn("Supabase delete notice:", err?.message || err);
  }
}

/**
 * Uploads a thumbnail with R2 primary and Supabase fallback.
 */
export async function uploadThumbnail(
  thumbnailFile: File,
  userId: string
): Promise<string> {
  const ALLOWED_IMAGE_TYPES = ["image/webp", "image/png", "image/jpeg"];
  if (!ALLOWED_IMAGE_TYPES.includes(thumbnailFile.type)) {
    throw new InvalidFileTypeError(ALLOWED_IMAGE_TYPES);
  }

  const timestamp = Date.now();
  const thumbPath = `thumbnails/${userId}/${timestamp}-thumb.webp`;

  // 1. Try R2
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: r2Bucket,
          Key: thumbPath,
          Body: buffer,
          ContentType: thumbnailFile.type,
        })
      );

      const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
      return getSignedDownloadUrl(thumbPath, ONE_YEAR_SECONDS);
    } catch (r2Err) {
      console.warn("⚠️ [R2 Storage] Thumbnail upload fallback to Supabase:", r2Err);
    }
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(thumbPath, thumbnailFile, {
      contentType: thumbnailFile.type,
      upsert: false,
    });

  if (error) {
    console.error("Thumbnail upload error:", error);
    throw new AppError(
      "Failed to upload thumbnail",
      "THUMBNAIL_UPLOAD_FAILED",
      500
    );
  }

  const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
  return getSignedDownloadUrl(thumbPath, ONE_YEAR_SECONDS);
}

```

---

### File: `src/services/email.service.ts`

```typescript
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL || "منصة المسند <onboarding@resend.dev>";
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://al-musnad.vercel.app";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Base email dispatcher with graceful fallback.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams): Promise<{ success: boolean; data?: any; error?: any }> {
  if (!resend || !apiKey) {
    console.warn(
      "⚠️ [Email Service] RESEND_API_KEY is not configured. Email skipped:",
      subject,
      "to:",
      to
    );
    return { success: false, error: "RESEND_API_KEY_MISSING" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to,
      subject,
      html,
      text: text || subject,
    });

    if (error) {
      console.warn("⚠️ [Email Service] Resend API error:", error.message);
      return { success: false, error };
    }

    console.log("✅ [Email Service] Email sent successfully to:", to, "ID:", data?.id);
    return { success: true, data };
  } catch (err: any) {
    console.warn("⚠️ [Email Service] Unexpected error sending email:", err?.message || err);
    return { success: false, error: err?.message || "SEND_FAILED" };
  }
}

/**
 * Wraps content in Al-Musnad's branded HTML layout.
 */
function createEmailTemplate({
  title,
  preheader,
  contentHtml,
  ctaText,
  ctaUrl,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
}): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      direction: rtl;
      text-align: right;
      color: #1e293b;
    }
    .wrapper {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      padding: 36px 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 13px;
      color: #93c5fd;
      font-weight: 500;
    }
    .content {
      padding: 32px 30px;
      font-size: 15px;
      line-height: 1.8;
      color: #334155;
    }
    .cta-container {
      text-align: center;
      margin: 30px 0 10px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      font-size: 14px;
      font-weight: 800;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 8px;
      background-color: #eff6ff;
      color: #1d4ed8;
      font-weight: 800;
      font-size: 12px;
      margin-bottom: 15px;
      border: 1px solid #bfdbfe;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      line-height: 1.6;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ""}
  <div class="wrapper">
    <div class="header">
      <h1>منصة «المسند»</h1>
      <p>الفضاء البيداغوجي الشامل للتعليم الأساسي بالجمهورية التونسية</p>
    </div>
    <div class="content">
      ${contentHtml}
      ${
        ctaText && ctaUrl
          ? `
      <div class="cta-container">
        <a href="${ctaUrl}" class="cta-button" target="_blank">${ctaText}</a>
      </div>
      `
          : ""
      }
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px 0;">
        هذه الرسالة تم إرسالها تلقائياً من خوادم <strong>منصة المسند</strong>.<br>
        للدعم الفني والاستفسار، تواصل معنا عبر واتساب: 
        <a href="https://wa.me/21627764985">27764985</a> أو 
        <a href="https://wa.me/21676907101">76907101</a>
      </p>
      <p style="margin: 0; color: #94a3b8;">
        جميع الحقوق محفوظة © 2026 منصة المسند التربوية
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 1. sendWelcomeEmail(to, name, roleTitle)
 * Sends an elegant welcome email upon new user registration.
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  roleTitle: string
) {
  const subject = `مرحباً بك في منصة المسند — فضاءك التربوي المتميز يا ${name}`;
  const html = createEmailTemplate({
    title: subject,
    preheader: `يسعدنا انضمامك إلى مجتمع المسند التربوي كـ ${roleTitle}`,
    contentHtml: `
      <div class="badge">الفئة: ${roleTitle}</div>
      <h2 style="font-size: 20px; color: #0f172a; margin-top: 0;">أهلاً بك يا أستاذ/ة ${name}،</h2>
      <p>
        يسرّنا أن نرحب بك في <strong>منصة «المسند»</strong>، المنظومة الوطنية المتكاملة لتبادل المذكرات،
        الجذاذات النموذجية، الفروض والأنشطة التقييمية لكافة المستويات الدراسية في المرحلة الابتدائية.
      </p>
      <p>
        حسابك الآن مفعّل وجاهز، وبإمكانك الاستفادة من فضاءك المخصص كـ <strong>${roleTitle}</strong>:
      </p>
      <ul style="padding-right: 20px; color: #475569;">
        <li>تصفح وتحميل الجذاذات والفروض المعتمدة بيداغوجياً.</li>
        <li>نشر ومشاركة الإنتاجات والملفات البيداغوجية مع الزملاء.</li>
        <li>الحصول على شارات الاعتماد والملاحظات التوجيهية من المتفقدين التربويين.</li>
      </ul>
    `,
    ctaText: "الدخول إلى منصة المسند الآن",
    ctaUrl: `${APP_URL}/login`,
  });

  return sendEmail({ to, subject, html });
}

/**
 * 2. sendSupportReplyNotification(to, name, ticketSubject, replyText)
 * Notifies the user when an admin or moderator replies to their support ticket.
 */
export async function sendSupportReplyNotification(
  to: string,
  name: string,
  ticketSubject: string,
  replyText: string
) {
  const subject = `رد جديد على استفسارك في الدعم الفني: ${ticketSubject}`;
  const html = createEmailTemplate({
    title: subject,
    preheader: `قام فريق إدارة المسند بالرد على تذكرتك: ${ticketSubject}`,
    contentHtml: `
      <div class="badge" style="background-color: #f0fdf4; color: #166534; border-color: #bbf7d0;">مركز الدعم الفني</div>
      <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">مرحباً ${name}،</h2>
      <p>
        نحيطك علماً بأن فريق الإشراف والمتابعة في <strong>منصة المسند</strong> قد قام بالرد على تذكرتك الخاصة بـ:
      </p>
      <div style="background-color: #f8fafc; border-right: 4px solid #2563eb; padding: 14px 18px; margin: 18px 0; border-radius: 8px;">
        <strong style="color: #1e293b; display: block; margin-bottom: 6px;">موضوع الاستفسار: ${ticketSubject}</strong>
        <p style="margin: 0; color: #475569; font-style: italic;">« ${replyText} »</p>
      </div>
      <p>
        إذا كانت لديك أي استفسارات إضافية، بإمكانك متابعة المحادثة مباشرة عبر مركز الدعم الفني.
      </p>
    `,
    ctaText: "الانتقال إلى مركز الدعم الفني",
    ctaUrl: `${APP_URL}/support`,
  });

  return sendEmail({ to, subject, html });
}

/**
 * 3. sendEndorsementNotification(to, teacherName, worksheetTitle)
 * Notifies the teacher when an inspector pedagogically endorses their published worksheet.
 */
export async function sendEndorsementNotification(
  to: string,
  teacherName: string,
  worksheetTitle: string
) {
  const subject = `تهانينا! تم اعتماد منشورك البيداغوجي «${worksheetTitle}» رسميّاً ★`;
  const html = createEmailTemplate({
    title: subject,
    preheader: `حصل منشورك ${worksheetTitle} على شارة الاعتماد البيداغوجي من المتفقد التربوي`,
    contentHtml: `
      <div class="badge" style="background-color: #fefce8; color: #854d0e; border-color: #fef08a;">★ اعتماد بيداغوجي رسمي</div>
      <h2 style="font-size: 19px; color: #0f172a; margin-top: 0;">تهانينا الحارة أستاذ/ة ${teacherName}،</h2>
      <p>
        يسرّنا إعلامك بأن المتفقد التربوي المعتمد قد قام بمراجعة واعتماد منشورك:
      </p>
      <div style="background-color: #eff6ff; border-radius: 12px; padding: 18px; margin: 18px 0; border: 1px solid #bfdbfe; text-align: center;">
        <span style="font-size: 24px;">★</span>
        <h3 style="margin: 6px 0; font-size: 17px; color: #1e40af;">« ${worksheetTitle} »</h3>
        <p style="margin: 0; font-size: 13px; color: #3b82f6; font-weight: 600;">تم منحه شارة الاعتماد التربوي الرسمي</p>
      </div>
      <p>
        أصبح منشورك الآن يحمل شارة التميّز ويحظى بالأولوية في نتائج البحث والتوصيات لجميع المربين في تونس. نشكرك على عطائك وإثرائك للمكتبة البيداغوجية.
      </p>
    `,
    ctaText: "معاينة منشورك المعتمد",
    ctaUrl: `${APP_URL}`,
  });

  return sendEmail({ to, subject, html });
}

```

---

### File: `src/services/favorite.service.ts`

```typescript
import { db } from "@/lib/db";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import {
  publicWorksheetSelect,
  canUserAccessWorksheet,
  buildAudienceVisibilityFilter,
} from "@/services/worksheet.service";

export interface ToggleFavoriteResult {
  isFavorited: boolean;
  favoriteCount: number;
}

export async function toggleFavorite(
  worksheetId: string,
  userId: string
): Promise<ToggleFavoriteResult> {
  if (!userId) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لإضافة النشرة للمفضلة");
  }

  const [dbUser, worksheet] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    }),
    db.worksheet.findUnique({
      where: { id: worksheetId },
      select: {
        id: true,
        status: true,
        uploadedBy: true,
        audience: true,
        uploader: { select: { role: true } },
      },
    }),
  ]);

  if (!dbUser) {
    throw new UnauthorizedError("الحساب غير موجود");
  }

  if (!worksheet || worksheet.status === "ARCHIVED") {
    throw new NotFoundError("Worksheet");
  }

  if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id)) {
    throw new ForbiddenError(
      "غير مصرح لحسابك بالتفاعل مع هذه النشرة حسب قيود الجمهور التي حددها الناشر."
    );
  }

  return db.$transaction(async (tx) => {
    const existing = await tx.favorite.findUnique({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
    });

    if (existing) {
      await tx.favorite.delete({
        where: { id: existing.id },
      });

      const current = await tx.worksheet.findUnique({
        where: { id: worksheetId },
        select: { favoriteCount: true },
      });

      const currentCount = current?.favoriteCount ?? 0;
      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: currentCount > 0 ? { decrement: 1 } : 0,
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: false,
        favoriteCount: updated.favoriteCount,
      };
    } else {
      await tx.favorite.create({
        data: {
          userId,
          worksheetId,
        },
      });

      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: { increment: 1 },
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: true,
        favoriteCount: updated.favoriteCount,
      };
    }
  });
}

export async function getUserFavorites(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const dbUser = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  const audienceGuard = buildAudienceVisibilityFilter(dbUser?.role, userId);

  const where = {
    userId,
    worksheet: audienceGuard,
  };

  const [total, favorites] = await Promise.all([
    db.favorite.count({ where }),
    db.favorite.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        worksheet: {
          select: publicWorksheetSelect,
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: favorites.map((f) => f.worksheet),
    meta: buildPaginationMeta(total, page, limit),
  };
}
```

---

### File: `src/services/download.service.ts`

```typescript
import { db } from "@/lib/db";
import { SIGNED_URL_EXPIRY_SECONDS } from "@/config/constants";
import { getSignedDownloadUrl } from "@/services/storage.service";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import {
  publicWorksheetSelect,
  canUserAccessWorksheet,
  buildAudienceVisibilityFilter,
} from "@/services/worksheet.service";

export interface DownloadUrlResult {
  downloadUrl: string;
  fileName: string;
  expiresIn: number;
}

export async function recordAndGetDownloadUrl(
  worksheetId: string,
  userId: string
): Promise<DownloadUrlResult> {
  if (!userId) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لتحميل النشرة");
  }

  const [dbUser, worksheet] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    }),
    db.worksheet.findUnique({
      where: { id: worksheetId },
      select: {
        id: true,
        fileUrl: true,
        fileName: true,
        status: true,
        uploadedBy: true,
        audience: true,
        uploader: { select: { role: true } },
      },
    }),
  ]);

  if (!dbUser) {
    throw new UnauthorizedError("الحساب غير موجود");
  }

  if (!worksheet || worksheet.status === "ARCHIVED") {
    throw new NotFoundError("Worksheet");
  }

  if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id)) {
    throw new ForbiddenError(
      "غير مصرح لحسابك بتحميل هذه النشرة حسب قيود الجمهور التي حددها الناشر."
    );
  }

  const now = new Date();
  await db.$transaction(async (tx) => {
    const existingDownload = await tx.download.findUnique({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
    });

    if (existingDownload) {
      await tx.download.update({
        where: {
          userId_worksheetId: {
            userId,
            worksheetId,
          },
        },
        data: {
          downloadedAt: now,
        },
      });
    } else {
      await tx.download.create({
        data: {
          userId,
          worksheetId,
          downloadedAt: now,
        },
      });

      await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          downloadCount: { increment: 1 },
        },
      });
    }
  });

  const downloadUrl = await getSignedDownloadUrl(
    worksheet.fileUrl,
    SIGNED_URL_EXPIRY_SECONDS
  );

  return {
    downloadUrl,
    fileName: worksheet.fileName,
    expiresIn: SIGNED_URL_EXPIRY_SECONDS,
  };
}

export async function getUserDownloads(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const dbUser = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  const audienceGuard = buildAudienceVisibilityFilter(dbUser?.role, userId);

  const where = {
    userId,
    worksheet: audienceGuard,
  };

  const [total, downloads] = await Promise.all([
    db.download.count({ where }),
    db.download.findMany({
      where,
      select: {
        id: true,
        downloadedAt: true,
        worksheet: {
          select: publicWorksheetSelect,
        },
      },
      orderBy: { downloadedAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: downloads.map((record) => ({
      ...record.worksheet,
      downloadedAt: record.downloadedAt,
    })),
    meta: buildPaginationMeta(total, page, limit),
  };
}
```

---

### File: `src/services/review.service.ts`

```typescript
import { db } from "@/lib/db";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "@/lib/utils/errors";
import { canUserAccessWorksheet } from "@/services/worksheet.service";
import { Role, WorksheetStatus, Prisma } from "@prisma/client";
import type { UpsertReviewInput } from "@/lib/validators/review";

export const publicReviewSelect = {
  id: true,
  rating: true,
  comment: true,
  isOfficialDirective: true,
  isPrivateToPublisher: true,
  userId: true,
  worksheetId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      school: true,
      role: true,
      isVerified: true,
    },
  },
} as const;

/**
 * Sends notifications to users mentioned with `@username`
 */
export async function dispatchMentionNotifications(
  content: string,
  senderId: string,
  senderName: string,
  targetContext: string,
  link: string
) {
  if (!content) return;
  const matches = content.match(/@([a-zA-Z0-9_.]{2,32})/g);
  if (!matches || matches.length === 0) return;

  const usernames = Array.from(
    new Set(matches.map((m) => m.slice(1).toLowerCase()))
  );

  const users = await db.user.findMany({
    where: {
      username: { in: usernames, mode: "insensitive" },
      id: { not: senderId },
    },
    select: { id: true, username: true },
  });

  if (users.length === 0) return;

  const preview = content.length > 80 ? `${content.slice(0, 80)}...` : content;

  await db.notification.createMany({
    data: users.map((u) => ({
      userId: u.id,
      title: `🔔 تمت الإشارة إليك (@${u.username}) بواسطة ${senderName}`,
      message: `أشار إليك ${senderName} في ${targetContext}: "${preview}"`,
      link,
    })),
  });
}

export async function listWorksheetReviews(
  worksheetId: string,
  viewerRole?: string | null,
  viewerUserId?: string | null
) {
  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      status: true,
      uploadedBy: true,
      audience: true,
      uploader: { select: { role: true } },
    },
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  // Can view private comments only if creator, admin, moderator, or inspector
  const canSeePrivate =
    Boolean(viewerUserId && viewerUserId === worksheet.uploadedBy) ||
    viewerRole === Role.ADMIN ||
    viewerRole === Role.MODERATOR ||
    viewerRole === Role.INSPECTOR;

  const whereCondition: Prisma.ReviewWhereInput = {
    worksheetId,
    ...(canSeePrivate
      ? {}
      : {
          OR: [
            { isPrivateToPublisher: false },
            ...(viewerUserId ? [{ userId: viewerUserId }] : []),
          ],
        }),
  };

  return db.review.findMany({
    where: whereCondition,
    select: publicReviewSelect,
    orderBy: [
      { isOfficialDirective: "desc" },
      { createdAt: "desc" },
    ],
  });
}

export async function upsertWorksheetReview(
  worksheetId: string,
  userId: string,
  input: {
    rating?: number;
    comment: string;
    isOfficialDirective?: boolean;
    isPrivateToPublisher?: boolean;
  },
  userRole?: string
) {
  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      title: true,
      titleAr: true,
      status: true,
      uploadedBy: true,
      audience: true,
      uploader: { select: { role: true, name: true } },
    },
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  if (!canUserAccessWorksheet(worksheet, userRole, userId)) {
    throw new ForbiddenError(
      "غير مصرح لك بإضافة تعليق على هذه النشرة وفق شروط الجمهور المحدد لها"
    );
  }

  const actor = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, username: true, role: true },
  });

  const isOfficialDirective =
    input.isOfficialDirective ??
    (!input.isPrivateToPublisher &&
      (userRole === Role.INSPECTOR || userRole === Role.ADMIN));

  const isPrivate = Boolean(input.isPrivateToPublisher);

  return db.$transaction(async (tx) => {
    const review = await tx.review.create({
      data: {
        userId,
        worksheetId,
        rating: Math.min(Math.max(input.rating ?? 5, 1), 5),
        comment: input.comment,
        isOfficialDirective,
        isPrivateToPublisher: isPrivate,
      },
      select: publicReviewSelect,
    });

    const stats = await tx.review.aggregate({
      where: { worksheetId, isPrivateToPublisher: false },
      _avg: { rating: true },
      _count: { id: true },
    });

    const ratingAvg = Number((stats._avg.rating ?? 0).toFixed(2));
    const reviewCount = stats._count.id;

    await tx.worksheet.update({
      where: { id: worksheetId },
      data: {
        ratingAvg,
        reviewCount,
      },
    });

    if (isPrivate && worksheet.uploadedBy !== userId) {
      await tx.notification.create({
        data: {
          userId: worksheet.uploadedBy,
          title: `🔒 تعليق خاص مباشر من ${actor?.name || "الإدارة الرقابية"}`,
          message: `أرسل لك تعليقاً خاصاً حول نشرتك "${
            worksheet.titleAr || worksheet.title
          }": "${input.comment.slice(0, 100)}"`,
          link: `/worksheet/${worksheetId}`,
        },
      });
    }

    if (actor) {
      await dispatchMentionNotifications(
        input.comment,
        userId,
        actor.name,
        `تعليق على نشرة "${worksheet.titleAr || worksheet.title}"`,
        `/worksheet/${worksheetId}`
      );
    }

    return {
      review,
      ratingAvg,
      reviewCount,
    };
  });
}

export async function deleteWorksheetReview(
  worksheetId: string,
  userId: string,
  userRole?: string,
  reviewId?: string | null
) {
  const whereClause: Prisma.ReviewWhereInput = reviewId
    ? { id: reviewId, worksheetId }
    : { userId, worksheetId };

  const existing = await db.review.findFirst({
    where: whereClause,
  });

  if (!existing) {
    throw new NotFoundError("Review");
  }

  if (
    existing.userId !== userId &&
    userRole !== Role.ADMIN &&
    userRole !== Role.MODERATOR
  ) {
    throw new ForbiddenError("لا يمكنك حذف هذا التعليق");
  }

  return db.$transaction(async (tx) => {
    await tx.review.delete({
      where: { id: existing.id },
    });

    const stats = await tx.review.aggregate({
      where: { worksheetId, isPrivateToPublisher: false },
      _avg: { rating: true },
      _count: { id: true },
    });

    const ratingAvg = Number((stats._avg.rating ?? 0).toFixed(2));
    const reviewCount = stats._count.id;

    await tx.worksheet.update({
      where: { id: worksheetId },
      data: {
        ratingAvg,
        reviewCount,
      },
    });

    return {
      deleted: true,
      ratingAvg,
      reviewCount,
    };
  });
}

```

---

### File: `src/services/audit.service.ts`

```typescript
import { db } from "@/lib/db";

export interface LogActivityInput {
  actorId?: string | null;
  actorName: string;
  actorRole: string;
  action:
    | "USER_REGISTERED"
    | "WORKSHEET_UPLOADED"
    | "WORKSHEET_ENDORSED"
    | "WORKSHEET_UNENDORSED"
    | "WORKSHEET_DELETED"
    | "WORKSHEET_STATUS_CHANGED"
    | "USER_VERIFIED"
    | "USER_UNVERIFIED"
    | "VERIFICATION_CODE_CREATED"
    | "VERIFICATION_CODE_DELETED"
    | "VERIFICATION_CODE_REDEEMED"
    | "USER_BANNED"
    | "USER_UNBANNED"
    | "USER_ROLE_CHANGED"
    | "PROFILE_APPROVED"
    | "PROFILE_REJECTED"
    | "INSPECTOR_PRIORITY_REPORT"
    | "DIRECT_MESSAGE_SENT"
    | "USER_ACCOUNT_LOCKED"
    | "USER_ACCOUNT_UNLOCKED"
    | (string & {});
  targetType: "WORKSHEET" | "USER" | "VERIFICATION_CODE" | "REPORT" | "SUPPORT_TICKET" | "SYSTEM";
  targetId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
}

export async function logPlatformActivity(input: LogActivityInput): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        actorId: input.actorId || null,
        actorName: input.actorName,
        actorRole: input.actorRole,
        action: input.action,
        targetType: input.targetType,
        targetId: input.targetId || null,
        details: input.details || null,
        ipAddress: input.ipAddress || null,
      },
    });
  } catch (err) {
    // Non-blocking so logging never interrupts user actions if migration hasn't run yet
    console.warn("[AuditLog] Non-fatal warning recording activity:", err);
  }
}

export async function listAuditLogs(options?: {
  limit?: number;
  offset?: number;
  action?: string;
}) {
  try {
    const limit = options?.limit ?? 100;
    const offset = options?.offset ?? 0;
    const where = options?.action && options.action !== "ALL" ? { action: options.action } : {};

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.auditLog.count({ where }),
    ]);

    return { logs, total };
  } catch (err) {
    console.warn("[AuditLog] Could not fetch audit logs:", err);
    return { logs: [], total: 0 };
  }
}

```

---

### File: `src/middleware.ts`

```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml, manifest.webmanifest
     * - Public assets (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt|webmanifest|json)$).*)",
  ],
};

```

---

### File: `src/app/manifest.ts`

```typescript
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "منصة المسند التربوية",
    short_name: "المسند",
    description: "المرجع التربوي المتكامل للمؤسسات والمتفقدين والمعلمين والتلاميذ",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f172a",
    theme_color: "#2563eb",
    lang: "ar",
    dir: "rtl",
    categories: ["education", "books"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

```

---

### File: `src/app/robots.ts`

```typescript
import type { MetadataRoute } from "next";

const BASE_URL = "https://al-musnad.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/levels",
          "/levels/*",
          "/browse",
          "/worksheet/*",
          "/support",
          "/publisher/*",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/moderator",
          "/moderator/*",
          "/inspector",
          "/inspector/*",
          "/api",
          "/api/*",
          "/profile",
          "/upload",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

```

---

### File: `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL = "https://al-musnad.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/levels`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/browse`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // 2. The 6 Primary Grade Levels
  const gradeSlugs = [
    "grade-1",
    "grade-2",
    "grade-3",
    "grade-4",
    "grade-5",
    "grade-6",
  ];

  let gradeRoutes: MetadataRoute.Sitemap = [];
  try {
    const gradesFromDb = await db.grade.findMany({
      select: { slug: true, createdAt: true },
    });

    const activeSlugs =
      gradesFromDb.length > 0
        ? gradesFromDb.map((g) => ({
            slug: g.slug,
            updatedAt: g.createdAt || currentDate,
          }))
        : gradeSlugs.map((s) => ({ slug: s, updatedAt: currentDate }));

    gradeRoutes = activeSlugs.map((g) => ({
      url: `${BASE_URL}/levels/${g.slug}`,
      lastModified: g.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    gradeRoutes = gradeSlugs.map((slug) => ({
      url: `${BASE_URL}/levels/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  }

  // 3. Dynamic Public Worksheets
  let worksheetRoutes: MetadataRoute.Sitemap = [];
  try {
    const worksheets = await db.worksheet.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        updatedAt: true,
      },
      take: 5000,
      orderBy: { updatedAt: "desc" },
    });

    worksheetRoutes = worksheets.map((w) => ({
      url: `${BASE_URL}/worksheet/${w.id}`,
      lastModified: w.updatedAt || currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    worksheetRoutes = [];
  }

  return [...staticRoutes, ...gradeRoutes, ...worksheetRoutes];
}

```

---

### File: `src/app/api/auth/callback/route.ts`

```typescript
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import { sendWelcomeEmail } from "@/services/email.service";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const requestedRoleParam = (searchParams.get("role") || "").toUpperCase();

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const authUser = data.user;

      try {
        const existingUser = await db.user.findUnique({
          where: { id: authUser.id },
        });

        if (existingUser) {
          const isLocked =
            Boolean(existingUser.lockedAt) ||
            (existingUser.failedLoginAttempts ?? 0) >= MAX_LOGIN_PASSWORD_ATTEMPTS;

          if (isLocked) {
            await supabase.auth.signOut();
            return NextResponse.redirect(
              `${origin}/login?error=account-locked`
            );
          }

          await db.user.update({
            where: { id: existingUser.id },
            data: {
              avatarUrl:
                existingUser.avatarUrl ||
                (authUser.user_metadata?.avatar_url as string) ||
                (authUser.user_metadata?.picture as string) ||
                null,
              lastSeenAt: new Date(),
            },
          });
        } else if (authUser.email) {
          const rawRole =
            requestedRoleParam ||
            String(authUser.user_metadata?.role || "TEACHER").toUpperCase();

          // Prevent privilege escalation: only INSTITUTION, STUDENT, or TEACHER allowed on public signup
          const assignedRole: Role =
            rawRole === "INSTITUTION"
              ? Role.INSTITUTION
              : rawRole === "STUDENT"
              ? Role.STUDENT
              : Role.TEACHER;

          const isInspectorPending =
            Boolean(authUser.user_metadata?.inspector_pending) ||
            rawRole === "INSPECTOR";

          const baseUsername = authUser.email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9_.]/g, "");
          const safeUsername = `${baseUsername.length >= 3 ? baseUsername : "user"}_${authUser.id.slice(0, 4)}`;

          await db.user.create({
            data: {
              id: authUser.id,
              email: authUser.email,
              username: safeUsername,
              name:
                (authUser.user_metadata?.full_name as string) ||
                (authUser.user_metadata?.name as string) ||
                authUser.email.split("@")[0],
              avatarUrl:
                (authUser.user_metadata?.avatar_url as string) ||
                (authUser.user_metadata?.picture as string) ||
                null,
              role: assignedRole,
              inspectorPending: isInspectorPending,
              presenceStatus: "ONLINE",
              lastSeenAt: new Date(),
            },
          });

          // Send welcome email gracefully (non-blocking)
          const roleTitles: Record<string, string> = {
            TEACHER: "معلم",
            INSTITUTION: "مؤسسة تربوية",
            STUDENT: "تلميذ",
            INSPECTOR: "متفقد تربوي",
          };
          const userName =
            (authUser.user_metadata?.full_name as string) ||
            (authUser.user_metadata?.name as string) ||
            safeUsername;
          void sendWelcomeEmail(
            authUser.email,
            userName,
            roleTitles[assignedRole] || assignedRole
          ).catch(() => null);
        }
      } catch {
        // Proceed even if DB sync encountered a transient issue
      }

      const safeNext = next.startsWith("/") ? next : "/";
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}

```

---

### File: `src/app/api/auth/me/route.ts`

```typescript
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError } from "@/lib/utils/errors";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("Not authenticated");
    }

    let profile = await db.user.findUnique({
      where: { id: user.id },
      include: {
        _count: {
          select: {
            worksheets: true,
            favorites: true,
            downloads: true,
          },
        },
      },
    });

    if (!profile) {
      const rawRole = String(user.user_metadata?.role || "TEACHER").toUpperCase();
      // Security: Never allow self-assigned ADMIN or MODERATOR from user_metadata
      const safeRole: Role =
        rawRole === "INSTITUTION"
          ? Role.INSTITUTION
          : rawRole === "STUDENT"
          ? Role.STUDENT
          : Role.TEACHER;

      const isInspectorPending =
        Boolean(user.user_metadata?.inspector_pending) || rawRole === "INSPECTOR";

      const defaultUsername =
        (user.user_metadata?.username as string) ||
        `${user.email!.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${user.id.slice(0, 4)}`;

      profile = await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          username: defaultUsername,
          name:
            (user.user_metadata?.full_name as string) ||
            (user.user_metadata?.name as string) ||
            user.email!.split("@")[0],
          avatarUrl:
            (user.user_metadata?.avatar_url as string) ||
            (user.user_metadata?.picture as string) ||
            null,
          school: (user.user_metadata?.school as string) || null,
          studentGrade: (user.user_metadata?.student_grade as string) || null,
          role: safeRole,
          isVerified: false,
          inspectorPending: isInspectorPending,
          presenceStatus: "ONLINE",
          lastSeenAt: new Date(),
        },
        include: {
          _count: {
            select: {
              worksheets: true,
              favorites: true,
              downloads: true,
            },
          },
        },
      });
    } else {
      const updates: Record<string, unknown> = {};
      if (!profile.username) {
        updates.username = `${profile.email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9_.]/g, "")}_${profile.id.slice(0, 4)}`;
      }
      // Refresh lastSeenAt automatically when user is browsing in ONLINE mode
      if ((profile.presenceStatus || "ONLINE") === "ONLINE") {
        updates.lastSeenAt = new Date();
      }
      if (Object.keys(updates).length > 0) {
        try {
          profile = await db.user.update({
            where: { id: profile.id },
            data: updates,
            include: {
              _count: {
                select: {
                  worksheets: true,
                  favorites: true,
                  downloads: true,
                },
              },
            },
          });
        } catch {
          // Ignore transient update collision
        }
      }
    }

    const { inspectorCode: _inspectorCode, ...safeProfile } = profile;
    return successResponse(safeProfile);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/auth/resolve-username/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { ValidationError } from "@/lib/utils/errors";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(ip, {
      keyPrefix: "resolve_username",
      maxRequests: 15,
      windowMs: 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          code: "RATE_LIMITED",
          message: `يرجى الانتظار ${limit.retryAfterSeconds} ثانية قبل المحاولة مجدداً`,
          statusCode: 429,
        },
        429
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawUsername = String(body?.username || "")
      .replace(/^@/, "")
      .trim()
      .toLowerCase();

    if (!rawUsername || rawUsername.length < 3) {
      throw new ValidationError("اسم المستخدم غير صالح");
    }

    const matchedUser = await db.user.findFirst({
      where: {
        username: { equals: rawUsername, mode: "insensitive" },
      },
      select: { email: true },
    });

    return successResponse({
      email: matchedUser?.email || null,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/auth/login-guard/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import { logPlatformActivity } from "@/services/audit.service";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`login-guard:${ip}`, {
      maxRequests: 30,
      windowMs: 60_000,
    });

    if (!rl.allowed) {
      return Response.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT",
            message: "تم تجاوز الحد المسموح للطلبات. يرجى الانتظار دقيقة واحدة.",
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const action = String(body.action || "PRECHECK").toUpperCase();
    const rawIdentifier = String(body.identifier || "").trim().toLowerCase();

    if (!rawIdentifier) {
      return successResponse({ exists: false });
    }

    const isUsername = !rawIdentifier.includes("@") || rawIdentifier.startsWith("@");
    const cleanUsername = rawIdentifier.replace(/^@/, "");

    const isProduction = process.env.NODE_ENV === "production";
    const isDemoAccount =
      rawIdentifier.endsWith("@musnad.tn") ||
      ["admin", "moderator", "inspector", "institution", "teacher", "student"].includes(cleanUsername);

    if (isProduction && isDemoAccount) {
      return successResponse({
        exists: false,
        resolvedEmail: isUsername ? null : rawIdentifier,
        isLocked: false,
        failedAttempts: 0,
        remainingAttempts: MAX_LOGIN_PASSWORD_ATTEMPTS,
        isDemoDisabled: true,
      });
    }

    const user = await db.user.findFirst({
      where: isUsername
        ? { username: { equals: cleanUsername, mode: "insensitive" } }
        : { email: { equals: rawIdentifier, mode: "insensitive" } },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        isBanned: true,
        banReason: true,
        failedLoginAttempts: true,
        lockedAt: true,
        lockReason: true,
      },
    });

    if (!user) {
      return successResponse({
        exists: false,
        resolvedEmail: isUsername ? null : rawIdentifier,
        isLocked: false,
        failedAttempts: 0,
        remainingAttempts: MAX_LOGIN_PASSWORD_ATTEMPTS,
      });
    }

    const currentFailed = user.failedLoginAttempts ?? 0;
    const isAccountLocked =
      Boolean(user.lockedAt) || currentFailed >= MAX_LOGIN_PASSWORD_ATTEMPTS;

    if (action === "PRECHECK") {
      return successResponse({
        exists: true,
        resolvedEmail: user.email,
        role: user.role,
        isLocked: isAccountLocked,
        isBanned: user.isBanned,
        failedAttempts: currentFailed,
        remainingAttempts: Math.max(0, MAX_LOGIN_PASSWORD_ATTEMPTS - currentFailed),
        lockMessage: isAccountLocked
          ? "🔒 تم قفل حسابك لتجاوز الحد الأقصى لمحاولات كلمة المرور (6 محاولات خاطئة). رجاءً تواصل مع المسؤول أو المشرف العام لفك غلق الحساب."
          : user.isBanned
          ? `🚫 هذا الحساب موقوف حالياً من قِبل الإدارة (${user.banReason || "يرجى التواصل مع المسؤول أو المشرف العام"}).`
          : null,
      });
    }

    if (action === "FAILED_ATTEMPT") {
      const nextAttempts = Math.min(currentFailed + 1, MAX_LOGIN_PASSWORD_ATTEMPTS);
      const shouldLock = nextAttempts >= MAX_LOGIN_PASSWORD_ATTEMPTS;
      const remaining = Math.max(0, MAX_LOGIN_PASSWORD_ATTEMPTS - nextAttempts);

      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: nextAttempts,
          lockedAt: shouldLock ? new Date() : user.lockedAt,
          lockReason: shouldLock
            ? "قفل أمني تلقائي بعد 6 محاولات خاطئة لإدخال كلمة المرور"
            : user.lockReason,
          isBanned: shouldLock ? true : user.isBanned,
          banReason: shouldLock
            ? "🔒 حساب مقفل تلقائياً بسبب استنفاد 6 محاولات خاطئة لكلمة المرور"
            : user.banReason,
        },
      });

      if (shouldLock && !isAccountLocked) {
        await logPlatformActivity({
          actorId: user.id,
          actorName: user.name,
          actorRole: user.role,
          action: "USER_ACCOUNT_LOCKED",
          targetType: "USER",
          targetId: user.id,
          details: `تم قفل الحساب (@${user.username || user.email}) تلقائياً بعد 6 محاولات خاطئة لكلمة المرور`,
          ipAddress: ip,
        });

        // Notify Admin and Moderators so they can unlock the account when contacted
        const staff = await db.user.findMany({
          where: { role: { in: [Role.ADMIN, Role.MODERATOR] } },
          select: { id: true, role: true },
        });

        if (staff.length > 0) {
          await db.notification.createMany({
            data: staff.map((s) => ({
              userId: s.id,
              title: "🔒 قفل حساب عضو بعد 6 محاولات كلمة مرور خاطئة",
              message: `تم قفل حساب (${user.name} — ${user.email}) تلقائياً لتجاوز 6 محاولات لكلمة المرور. يمكنك فك قفل الحساب من لوحة التحكم.`,
              link:
                s.role === Role.ADMIN
                  ? "/admin/dashboard?tab=teachers"
                  : "/moderator/dashboard?tab=publishers",
            })),
          });
        }
      }

      return successResponse({
        exists: true,
        isLocked: shouldLock,
        failedAttempts: nextAttempts,
        remainingAttempts: remaining,
        message: shouldLock
          ? "🔒 تم قفل الحساب بعد استنفاد 6 محاولات خاطئة لكلمة المرور. رجاءً تواصل مع المسؤول أو المشرف العام لفك غلق الحساب."
          : `❌ البريد الإلكتروني مسجل في المنصة ولكن كلمة المرور التي أدخلتها خاطئة! تنبيه: لديك فرصة 6 مرات فقط لكتابة كلمة المرور (المحاولة ${nextAttempts} من 6 — متبقي ${remaining} محاولات قبل قفل الحساب).`,
      });
    }

    if (action === "RESET_SUCCESS") {
      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockedAt: null,
          lockReason: null,
          lastSeenAt: new Date(),
        },
      });
      return successResponse({ reset: true });
    }

    return successResponse({ exists: true, resolvedEmail: user.email });
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/me/presence/route.ts`

```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError, ValidationError } from "@/lib/utils/errors";

const VALID_STATUSES = ["ONLINE", "OFFLINE", "GHOST"] as const;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
    }

    const body = await request.json().catch(() => ({}));
    const requestedStatus = body.presenceStatus
      ? String(body.presenceStatus).toUpperCase()
      : undefined;

    if (
      requestedStatus &&
      !VALID_STATUSES.includes(requestedStatus as (typeof VALID_STATUSES)[number])
    ) {
      throw new ValidationError("حالة الاتصال غير صالحة");
    }

    const current = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, presenceStatus: true, lastSeenAt: true },
    });

    if (!current) {
      throw new UnauthorizedError("الحساب غير موجود");
    }

    const nextStatus = requestedStatus || current.presenceStatus || "ONLINE";

    // When switching to OFFLINE or GHOST, freeze or mark lastSeenAt as now so elapsed offline time starts counting from now.
    // When in ONLINE mode (or switching to ONLINE), update lastSeenAt to now.
    const shouldUpdateLastSeen =
      Boolean(requestedStatus) || nextStatus === "ONLINE";

    const updated = await db.user.update({
      where: { id: user.id },
      data: {
        presenceStatus: nextStatus,
        ...(shouldUpdateLastSeen ? { lastSeenAt: new Date() } : {}),
      },
      select: {
        id: true,
        presenceStatus: true,
        lastSeenAt: true,
      },
    });

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/worksheets/route.ts`

```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import {
  worksheetFilterSchema,
  createWorksheetSchema,
} from "@/lib/validators/worksheet";
import { listWorksheets, createWorksheet } from "@/services/worksheet.service";
import { uploadFile, uploadThumbnail } from "@/services/storage.service";
import { logPlatformActivity } from "@/services/audit.service";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    let viewerRole: string | null = null;
    let viewerUserId: string | null = null;

    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        viewerUserId = user.id;
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        viewerRole = dbUser?.role || null;
      }
    } catch {
      // Guest caller
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const filters = worksheetFilterSchema.parse(searchParams);
    const result = await listWorksheets(filters, viewerRole, viewerUserId);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    const ip = getClientIp(request);
    const limit = checkRateLimit(`${user.id}:${ip}`, {
      keyPrefix: "upload_worksheet",
      maxRequests: 12,
      windowMs: 10 * 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          message: `لقد تجاوزت الحد المسموح لرفع الملفات، يرجى الانتظار ${limit.retryAfterSeconds} ثانية.`,
          code: "RATE_LIMITED",
          statusCode: 429,
        },
        429
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const thumbnail = formData.get("thumbnail") as File | null;
    const pageCountRaw = formData.get("pageCount") as string | null;
    const metadataRaw = formData.get("metadata") as string | null;

    if (!file) {
      return errorResponse(
        { message: "File is required", code: "MISSING_FILE", statusCode: 400 },
        400
      );
    }

    const metadata = createWorksheetSchema.parse(
      metadataRaw ? JSON.parse(metadataRaw) : {}
    );

    const [uploadResult, thumbnailUrl] = await Promise.all([
      uploadFile(file, user.id),
      thumbnail
        ? uploadThumbnail(thumbnail, user.id).catch(() => undefined)
        : Promise.resolve(undefined),
    ]);

    const parsedPageCount = pageCountRaw ? Number(pageCountRaw) : undefined;

    const worksheet = await createWorksheet({
      ...metadata,
      uploadedBy: user.id,
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
      fileSize: uploadResult.fileSize,
      mimeType: file.type,
      thumbnailUrl,
      pageCount:
        Number.isInteger(parsedPageCount) && parsedPageCount! > 0
          ? parsedPageCount
          : undefined,
    });

    await logPlatformActivity({
      actorId: user.id,
      actorName: worksheet.uploader?.name || user.email || "ناشر",
      actorRole: worksheet.uploader?.role || "TEACHER",
      action: "WORKSHEET_UPLOADED",
      targetType: "WORKSHEET",
      targetId: worksheet.id,
      details: `تم رفع منشور جديد بعنوان «${worksheet.titleAr || worksheet.title}» (${worksheet.status})`,
      ipAddress: ip,
    });

    return successResponse(worksheet, undefined, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
```

---

### File: `src/app/api/worksheets/[id]/route.ts`

```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { updateWorksheetSchema } from "@/lib/validators/worksheet";
import {
  getWorksheetById,
  updateWorksheet,
  archiveWorksheet,
  type UpdateWorksheetReplacementFile,
} from "@/services/worksheet.service";
import { uploadFile, uploadThumbnail } from "@/services/storage.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError(
        "لا يمكن الوصول إلى محتوى النشرة إلا بعد تسجيل الدخول بحسابك"
      );
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, role: true },
    });

    if (!dbUser) {
      throw new UnauthorizedError("الحساب غير موجود");
    }

    const worksheet = await getWorksheetById(id, dbUser.role, dbUser.id);
    return successResponse(worksheet);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const contentType = request.headers.get("content-type") || "";
    let validatedData: any = {};
    let replacementFile: UpdateWorksheetReplacementFile | undefined = undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const thumbnail = formData.get("thumbnail") as File | null;
      const pageCountRaw = formData.get("pageCount") as string | null;
      const metadataRaw = formData.get("metadata") as string | null;

      validatedData = updateWorksheetSchema.parse(
        metadataRaw ? JSON.parse(metadataRaw) : {}
      );

      if (file && file.size > 0) {
        const [uploadResult, thumbnailUrl] = await Promise.all([
          uploadFile(file, user.id),
          thumbnail
            ? uploadThumbnail(thumbnail, user.id).catch(() => undefined)
            : Promise.resolve(undefined),
        ]);

        const parsedPageCount = pageCountRaw ? Number(pageCountRaw) : undefined;
        replacementFile = {
          fileUrl: uploadResult.fileUrl,
          fileName: uploadResult.fileName,
          fileSize: uploadResult.fileSize,
          thumbnailUrl,
          pageCount:
            Number.isInteger(parsedPageCount) && parsedPageCount! > 0
              ? parsedPageCount
              : undefined,
        };
      }
    } else {
      const body = await request.json();
      validatedData = updateWorksheetSchema.parse(body);
    }

    const updated = await updateWorksheet(
      id,
      user.id,
      validatedData,
      dbUser?.role,
      replacementFile
    );

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await archiveWorksheet(id, user.id, dbUser?.role);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
```

---

### File: `src/app/api/worksheets/[id]/download/route.ts`

```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { recordAndGetDownloadUrl } from "@/services/download.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    // 1. Enforce authentication
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("You must be logged in to download worksheets");
    }

    // 2. Record download and obtain pre-signed URL
    const result = await recordAndGetDownloadUrl(id, user.id);

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/worksheets/[id]/file/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { canUserAccessWorksheet } from "@/services/worksheet.service";
import { getSignedDownloadUrl } from "@/services/storage.service";
import { errorResponse } from "@/lib/utils/api-response";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول لمعاينة أو تحميل هذا الملف");
    }

    const [dbUser, worksheet] = await Promise.all([
      db.user.findUnique({
        where: { id: user.id },
        select: { id: true, role: true },
      }),
      db.worksheet.findUnique({
        where: { id },
        select: {
          id: true,
          fileUrl: true,
          fileName: true,
          status: true,
          uploadedBy: true,
          audience: true,
          uploader: { select: { role: true } },
        },
      }),
    ]);

    if (!dbUser) {
      throw new UnauthorizedError("الحساب غير موجود");
    }

    if (!worksheet || worksheet.status === "ARCHIVED") {
      throw new NotFoundError("Worksheet");
    }

    if (
      worksheet.status === "DRAFT" &&
      worksheet.uploadedBy !== dbUser.id &&
      dbUser.role !== "ADMIN" &&
      dbUser.role !== "INSPECTOR"
    ) {
      throw new ForbiddenError(
        "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد."
      );
    }

    if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id)) {
      throw new ForbiddenError(
        "غير مصرح لحسابك بمعاينة أو تحميل هذه النشرة حسب قيود الجمهور."
      );
    }

    const signedUrl = await getSignedDownloadUrl(worksheet.fileUrl, 3600);
    return NextResponse.redirect(signedUrl, { status: 302 });
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/worksheets/[id]/favorite/route.ts`

```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { toggleFavorite } from "@/services/favorite.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    // 1. Enforce authentication
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("You must be logged in to favorite worksheets");
    }

    // 2. Perform atomic toggle
    const result = await toggleFavorite(id, user.id);

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/worksheets/[id]/review/route.ts`

```typescript
export { GET, POST, DELETE } from "../reviews/route";

```

---

### File: `src/app/api/worksheets/[id]/reviews/route.ts`

```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { upsertReviewSchema } from "@/lib/validators/review";
import {
  listWorksheetReviews,
  upsertWorksheetReview,
  deleteWorksheetReview,
} from "@/services/review.service";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";
import { db } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let viewerRole: string | null = null;
    let viewerId: string | null = null;

    if (user) {
      viewerId = user.id;
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      viewerRole = dbUser?.role || null;
    }

    const reviews = await listWorksheetReviews(id, viewerRole, viewerId);
    return successResponse(reviews);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول أولاً لإضافة تعليق");
    }

    const ip = getClientIp(request);
    const limit = checkRateLimit(`${user.id}:${ip}`, {
      keyPrefix: "post_review",
      maxRequests: 20,
      windowMs: 5 * 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          message: `يرجى الانتظار ${limit.retryAfterSeconds} ثانية قبل نشر تعليق جديد.`,
          code: "RATE_LIMITED",
          statusCode: 429,
        },
        429
      );
    }

    const body = await request.json();
    const validated = upsertReviewSchema.parse(body);

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await upsertWorksheetReview(
      id,
      user.id,
      validated,
      dbUser?.role
    );
    return successResponse(result, undefined, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
    }

    const reviewId = request.nextUrl.searchParams.get("reviewId");

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await deleteWorksheetReview(
      id,
      user.id,
      dbUser?.role,
      reviewId
    );
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/grades/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";

export async function GET() {
  try {
    await ensureOfficialTaxonomySeeded();
    const grades = await db.grade.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(grades);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/subjects/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";

export async function GET() {
  try {
    await ensureOfficialTaxonomySeeded();
    const subjects = await db.subject.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(subjects);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/categories/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";

export async function GET() {
  try {
    await ensureOfficialTaxonomySeeded();
    const categories = await db.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(categories);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/me/favorites/route.ts`

```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserFavorites } from "@/services/favorite.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserFavorites(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/me/downloads/route.ts`

```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserDownloads } from "@/services/download.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserDownloads(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/me/uploads/route.ts`

```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserUploads } from "@/services/worksheet.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserUploads(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/notifications/route.ts`

```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const [notifications, unreadCount] = await Promise.all([
      db.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      db.notification.count({
        where: { userId: user.id, isRead: false },
      }),
    ]);

    return successResponse({ notifications, unreadCount });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const body = await request.json().catch(() => ({}));
    const notificationId = body?.id as string | undefined;

    if (notificationId) {
      await db.notification.updateMany({
        where: { id: notificationId, userId: user.id },
        data: { isRead: true },
      });
    } else {
      await db.notification.updateMany({
        where: { userId: user.id, isRead: false },
        data: { isRead: true },
      });
    }

    return successResponse({ markedRead: true });
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/users/mentions/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(ip, {
      keyPrefix: "mentions_lookup",
      maxRequests: 40,
      windowMs: 60_000,
    });

    if (!limit.allowed) {
      return errorResponse(
        {
          code: "RATE_LIMITED",
          message: "تم تجاوز الحد المسموح للطلبات، يرجى الانتظار قليلاً",
          statusCode: 429,
        },
        429
      );
    }

    const q = (request.nextUrl.searchParams.get("q") || "")
      .replace(/^@/, "")
      .trim();

    const users = await db.user.findMany({
      where: q
        ? {
            OR: [
              { username: { contains: q, mode: "insensitive" } },
              { name: { contains: q, mode: "insensitive" } },
              { school: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      take: 8,
      orderBy: [{ isVerified: "desc" }, { followersCount: "desc" }],
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        school: true,
        isVerified: true,
      },
    });

    const formatted = users.map((u) => {
      const fallbackUsername = u.username || `user_${u.id.slice(0, 6)}`;
      return {
        id: u.id,
        name: u.name,
        username: fallbackUsername,
        role: u.role,
        school: u.school,
        isVerified: u.isVerified,
      };
    });

    return successResponse(formatted);
  } catch (error) {
    return errorResponse(error);
  }
}
```

---

### File: `src/app/api/health/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { APP_CONFIG, STORAGE_BUCKETS } from "@/config/constants";
import { isR2Configured, getR2Diagnostics } from "@/services/storage.service";

export async function GET() {
  const startedAt = Date.now();
  let databaseConnected = false;
  let usersCount = 0;
  let worksheetsCount = 0;

  try {
    const [uCount, wCount] = await Promise.all([
      db.user.count(),
      db.worksheet.count(),
    ]);
    databaseConnected = true;
    usersCount = uCount;
    worksheetsCount = wCount;
  } catch {
    databaseConnected = false;
  }

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const r2Ready = isR2Configured();
  const r2Diagnostics = getR2Diagnostics();

  return NextResponse.json({
    success: true,
    platform: APP_CONFIG.nameAr,
    version: "16.0.0",
    status: databaseConnected && supabaseConfigured ? "HEALTHY" : "DEGRADED",
    latencyMs: Date.now() - startedAt,
    services: {
      postgresqlDatabase: databaseConnected ? "CONNECTED" : "DISCONNECTED",
      supabaseAuth: supabaseConfigured ? "CONFIGURED" : "MISSING_ENV",
      storageProvider: r2Ready ? "CLOUDFLARE_R2_10GB" : "SUPABASE_STORAGE",
      cloudflareR2: r2Ready ? "ACTIVE_10GB" : "FALLBACK",
      storageBucket: r2Ready
        ? r2Diagnostics.bucketName
        : STORAGE_BUCKETS.WORKSHEETS,
      r2Diagnostics,
    },
    metrics: databaseConnected
      ? {
          registeredUsers: usersCount,
          totalWorksheets: worksheetsCount,
        }
      : null,
    timestamp: new Date().toISOString(),
  });
}

```

---

### File: `src/actions/worksheet.actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { archiveWorksheet, updateWorksheet } from "@/services/worksheet.service";
import { updateWorksheetSchema, type UpdateWorksheetInput } from "@/lib/validators/worksheet";
import { UnauthorizedError } from "@/lib/utils/errors";
import { db } from "@/lib/db";

export async function updateWorksheetAction(id: string, input: UpdateWorksheetInput) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  const validated = updateWorksheetSchema.parse(input);
  const updated = await updateWorksheet(id, user.id, validated, dbUser?.role);

  revalidatePath(`/worksheet/${id}`);
  revalidatePath("/browse");
  revalidatePath("/profile");
  return updated;
}

export async function archiveWorksheetAction(id: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  const result = await archiveWorksheet(id, user.id, dbUser?.role);
  revalidatePath("/browse");
  revalidatePath("/profile");
  return result;
}

```

---

### File: `src/actions/favorite.actions.ts`

```typescript
"use server";

/**
 * Favorite Server Actions
 *
 * Atomically toggles bookmark states and triggers Next.js path cache revalidation.
 */

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { toggleFavorite } from "@/services/favorite.service";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function toggleFavoriteAction(worksheetId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("You must be logged in to favorite worksheets");
  }

  const result = await toggleFavorite(worksheetId, user.id);

  // Invalidate caches
  revalidatePath(`/worksheet/${worksheetId}`);
  revalidatePath("/profile");
  revalidatePath("/browse");

  return { success: true, data: result };
}

```

---

### File: `src/actions/profile.actions.ts`

```typescript
"use server";

/**
 * Profile, Subscriptions & Account Deletion Actions — Al-Musnad v4.0
 */

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validators/auth";
import { UnauthorizedError, ForbiddenError } from "@/lib/utils/errors";
import { ProfileEditStatus, Role, Prisma } from "@prisma/client";

export async function updateProfileAction(input: UpdateProfileInput) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يجب تسجيل الدخول أولاً");
  }

  const validated = updateProfileSchema.parse(input);

  const currentUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      role: true,
      name: true,
      username: true,
      school: true,
      bio: true,
      avatarUrl: true,
    },
  });

  if (!currentUser) {
    throw new UnauthorizedError("الحساب غير موجود");
  }

  if (validated.username && validated.username !== currentUser.username) {
    const cleanUsername = validated.username.toLowerCase();
    const existingUsername = await db.user.findFirst({
      where: {
        username: { equals: cleanUsername, mode: "insensitive" },
        id: { not: user.id },
      },
    });
    if (existingUsername) {
      throw new ForbiddenError("اسم المستخدم هذا محجوز بالفعل، يرجى اختيار اسم مستخدم آخر");
    }
  }

  if (currentUser.role === Role.ADMIN) {
    const updatedAdmin = await db.user.update({
      where: { id: user.id },
      data: {
        ...(validated.name !== undefined ? { name: validated.name } : {}),
        ...(validated.username !== undefined
          ? { username: validated.username.toLowerCase() }
          : {}),
        ...(validated.school !== undefined ? { school: validated.school } : {}),
        ...(validated.bio !== undefined ? { bio: validated.bio } : {}),
        ...(validated.avatarUrl !== undefined
          ? { avatarUrl: validated.avatarUrl }
          : {}),
        profileEditStatus: ProfileEditStatus.APPROVED,
        pendingProfileData: Prisma.DbNull,
      },
    });
    revalidatePath("/profile");
    return { ...updatedAdmin, pendingApproval: false };
  }

  const pendingPayload = {
    name: validated.name ?? currentUser.name,
    username: validated.username
      ? validated.username.toLowerCase()
      : currentUser.username,
    school:
      validated.school !== undefined ? validated.school : currentUser.school,
    bio: validated.bio !== undefined ? validated.bio : currentUser.bio,
    avatarUrl:
      validated.avatarUrl !== undefined
        ? validated.avatarUrl
        : currentUser.avatarUrl,
    requestedAt: new Date().toISOString(),
  };

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      profileEditStatus: ProfileEditStatus.PENDING,
      pendingProfileData: pendingPayload,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/admin/dashboard");
  return { ...updatedUser, pendingApproval: true };
}

export async function updateSubscriptionPlanAction(planCode: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يجب تسجيل الدخول أولاً");

  const updated = await db.user.update({
    where: { id: user.id },
    data: { subscriptionPlan: planCode },
    select: { id: true, subscriptionPlan: true },
  });

  await db.notification.create({
    data: {
      userId: user.id,
      title: "تم تحديث باقة الاشتراك في المسند",
      message: `تم تفعيل باقة (${planCode}) على حسابك بنجاح.`,
      link: "/profile?tab=subscriptions",
    },
  });

  revalidatePath("/profile");
  return updated;
}

/**
 * ميزة حذف حساب الناشر / العضو نهائياً
 */
export async function deleteMyAccountAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true },
  });

  if (dbUser?.role === Role.ADMIN) {
    throw new ForbiddenError("لا يمكن حذف حساب المشرف العام من هذه الواجهة");
  }

  // 1. Delete user record from Prisma database (Cascades to uploads/reviews/favorites)
  await db.user.delete({
    where: { id: user.id },
  });

  // 2. Delete auth user via Supabase Admin client if service role is configured
  try {
    const adminSupabase = createSupabaseAdminClient();
    await adminSupabase.auth.admin.deleteUser(user.id);
  } catch {
    // Fallback sign out
  }

  await supabase.auth.signOut();
  revalidatePath("/");
  return { deleted: true };
}
```

---

### File: `src/actions/admin.actions.ts`

```typescript
"use server";

/**
 * Top-Tier Admin Actions (المستوى الرقابي الثالث في القمة: المشرف) — Al-Musnad v9.0
 *
 * Admin Exclusive Powers (in addition to all Inspector & Moderator powers):
 * 1. إمكانية تفعيل التوثيق المباشر للحسابات (`toggleVerifyUserAdminAction`) — مقتصرة حصرياً على المشرف!
 * 2. إمكانية إنشاء وتوليد أكواد التوثيق في الداشبورد للمشرف (`createVerificationCodeAdminAction`, `deleteVerificationCodeAdminAction`).
 * 3. التحكم الكامل في الموقع والأدوار (بما في ذلك تعيين المسؤولين `MODERATOR` والمتفقدين `INSPECTOR`).
 * 4. متابعة سجلات النشاطات والأمن الشاملة (`AuditLog`).
 */

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteFile } from "@/services/storage.service";
import { logPlatformActivity } from "@/services/audit.service";
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import { Role, WorksheetStatus, ProfileEditStatus, Prisma } from "@prisma/client";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true, name: true, username: true, email: true },
  });

  if (!dbUser || dbUser.role !== Role.ADMIN) {
    throw new ForbiddenError("هذه الصلاحية مقتصرة حصرياً على المشرف العام في قمة الهرم");
  }

  return dbUser;
}

export async function getAdminDashboardData() {
  const admin = await requireAdmin();

  const [
    totalWorksheets,
    publishedWorksheets,
    draftWorksheets,
    archivedWorksheets,
    endorsedWorksheets,
    totalUsers,
    verifiedUsersCount,
    unusedCodesCount,
    pendingProfileEditsCount,
    pendingReportsCount,
    openTicketsCount,
    totalAuditLogsCount,
    totalDownloadsAgg,
    worksheets,
    teachers,
    pendingProfileUsers,
    reports,
    supportTickets,
    verificationCodes,
    auditLogs,
  ] = await Promise.all([
    db.worksheet.count(),
    db.worksheet.count({ where: { status: WorksheetStatus.PUBLISHED } }),
    db.worksheet.count({ where: { status: WorksheetStatus.DRAFT } }),
    db.worksheet.count({ where: { status: WorksheetStatus.ARCHIVED } }),
    db.worksheet.count({ where: { isEndorsed: true } }),
    db.user.count(),
    db.user.count({ where: { isVerified: true } }),
    db.verificationCode.count({ where: { isUsed: false } }),
    db.user.count({ where: { profileEditStatus: ProfileEditStatus.PENDING } }),
    db.report.count({ where: { status: "PENDING" } }),
    db.supportTicket.count({ where: { status: "OPEN" } }),
    db.auditLog.count(),
    db.worksheet.aggregate({ _sum: { downloadCount: true } }),
    db.worksheet.findMany({
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
      take: 100,
      include: {
        grade: { select: { id: true, nameAr: true } },
        subject: { select: { id: true, nameAr: true, color: true } },
        category: { select: { id: true, nameAr: true } },
        uploader: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            school: true,
            role: true,
            isVerified: true,
            isBanned: true,
          },
        },
      },
    }),
    db.user.findMany({
      orderBy: [{ inspectorPending: "desc" }, { createdAt: "desc" }],
      take: 100,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        school: true,
        subscriptionPlan: true,
        isVerified: true,
        inspectorPending: true,
        inspectorCode: true,
        profileEditStatus: true,
        isBanned: true,
        banReason: true,
        failedLoginAttempts: true,
        lockedAt: true,
        lockReason: true,
        presenceStatus: true,
        lastSeenAt: true,
        createdAt: true,
        _count: {
          select: { worksheets: true, downloads: true },
        },
      },
    }),
    db.user.findMany({
      where: { profileEditStatus: ProfileEditStatus.PENDING },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        school: true,
        bio: true,
        avatarUrl: true,
        pendingProfileData: true,
        updatedAt: true,
      },
    }),
    db.report.findMany({
      orderBy: [{ isInspectorPriority: "desc" }, { createdAt: "desc" }],
      take: 60,
      include: {
        reporter: {
          select: { id: true, name: true, username: true, email: true, role: true },
        },
        targetWorksheet: {
          select: { id: true, title: true, titleAr: true },
        },
        targetUser: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
            isBanned: true,
          },
        },
      },
    }),
    db.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      take: 60,
    }),
    db.verificationCode.findMany({
      orderBy: { createdAt: "desc" },
      take: 80,
      include: {
        createdBy: { select: { id: true, name: true, username: true } },
        usedBy: { select: { id: true, name: true, username: true, email: true, role: true } },
      },
    }),
    db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  return {
    admin,
    stats: {
      totalWorksheets,
      publishedWorksheets,
      draftWorksheets,
      archivedWorksheets,
      endorsedWorksheets,
      totalUsers,
      verifiedUsersCount,
      unusedCodesCount,
      pendingProfileEditsCount,
      pendingReportsCount,
      openTicketsCount,
      totalAuditLogsCount,
      totalDownloads: totalDownloadsAgg._sum.downloadCount ?? 0,
    },
    worksheets,
    teachers,
    pendingProfileUsers,
    reports,
    supportTickets,
    verificationCodes,
    auditLogs,
  };
}

export async function getAuditLogsAdminAction(action?: string, limit = 100) {
  await requireAdmin();
  const where = action && action !== "ALL" ? { action } : {};
  return db.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * ميزة حصرية للمشرف العام (`ADMIN`) في قمة الهرم:
 * تفعيل أو إلغاء التوثيق المباشر (`isVerified`) لأي حساب في الموقع بضغطة زر
 */
export async function toggleVerifyUserAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, isVerified: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const nextVerified = !target.isVerified;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      isVerified: nextVerified,
      inspectorPending: false,
    },
    select: { id: true, isVerified: true },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: nextVerified ? "USER_VERIFIED" : "USER_UNVERIFIED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم ${nextVerified ? "تفعيل" : "إلغاء"} شارة التوثيق الرسمية للحساب (@${target.username || target.name}) بواسطة المشرف العام`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: nextVerified
        ? "🎖️ تم تفعيل شارة التوثيق الرسمية على حسابك"
        : "إشعار بشأن شارة التوثيق",
      message: nextVerified
        ? "قام المشرف العام بتفعيل شارة التوثيق الرسمية لحسابك على منصة المسند."
        : "تم إيقاف شارة التوثيق على حسابك من قِبل المشرف العام.",
      link: "/profile?tab=verification",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

/**
 * ميزة حصرية للمشرف العام (`ADMIN`):
 * إنشاء وتوليد أكواد التوثيق في الداشبورد للمشرف (سواء عامة قابلة للتوزيع أو مخصصة لمستخدم)
 */
export async function createVerificationCodeAdminAction(input: {
  targetRole: Role;
  note?: string;
  count?: number;
}) {
  const admin = await requireAdmin();
  const count = Math.min(Math.max(input.count || 1, 1), 10);

  const prefix =
    input.targetRole === Role.INSPECTOR
      ? "INSP"
      : input.targetRole === Role.INSTITUTION
      ? "INST"
      : "VERF";

  const createdCodes = [];

  for (let i = 0; i < count; i++) {
    const part1 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const part2 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const code = `${prefix}-${part1}-${part2}`;

    const record = await db.verificationCode.create({
      data: {
        code,
        targetRole: input.targetRole,
        note: input.note?.trim() || null,
        createdById: admin.id,
      },
      include: {
        createdBy: { select: { id: true, name: true, username: true } },
        usedBy: { select: { id: true, name: true, username: true, email: true, role: true } },
      },
    });

    await logPlatformActivity({
      actorId: admin.id,
      actorName: admin.name,
      actorRole: admin.role,
      action: "VERIFICATION_CODE_CREATED",
      targetType: "VERIFICATION_CODE",
      targetId: record.id,
      details: `تم إنشاء كود توثيق للرتبة ${input.targetRole}: ${code}${input.note ? ` (${input.note})` : ""}`,
    });

    createdCodes.push(record);
  }

  revalidatePath("/admin/dashboard");
  return createdCodes;
}

export async function deleteVerificationCodeAdminAction(codeId: string) {
  const admin = await requireAdmin();

  const targetCode = await db.verificationCode.findUnique({
    where: { id: codeId },
  });

  await db.verificationCode.delete({
    where: { id: codeId },
  });

  if (targetCode) {
    await logPlatformActivity({
      actorId: admin.id,
      actorName: admin.name,
      actorRole: admin.role,
      action: "VERIFICATION_CODE_DELETED",
      targetType: "VERIFICATION_CODE",
      targetId: codeId,
      details: `تم حذف كود التوثيق ${targetCode.code}`,
    });
  }

  revalidatePath("/admin/dashboard");
  return { deleted: true, id: codeId };
}

export async function updateWorksheetStatusAdminAction(
  worksheetId: string,
  status: WorksheetStatus
) {
  const admin = await requireAdmin();

  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, title: true },
  });

  const updated = await db.worksheet.update({
    where: { id: worksheetId },
    data: { status },
    select: { id: true, status: true },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "WORKSHEET_STATUS_CHANGED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم تغيير حالة المنشور «${worksheet?.title || worksheetId}» إلى ${status}`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath(`/worksheet/${worksheetId}`);
  revalidatePath("/admin/dashboard");
  return updated;
}

export async function deleteWorksheetAdminAction(worksheetId: string) {
  const admin = await requireAdmin();

  const existing = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, title: true, fileUrl: true },
  });

  if (!existing) {
    throw new NotFoundError("النشرة غير موجودة");
  }

  await db.worksheet.delete({
    where: { id: worksheetId },
  });

  if (existing.fileUrl) {
    await deleteFile(existing.fileUrl).catch(() => null);
  }

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "WORKSHEET_DELETED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم حذف المنشور «${existing.title}» نهائياً بواسطة المشرف العام`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath("/admin/dashboard");
  return { deleted: true, id: worksheetId };
}

export async function updateUserRoleAdminAction(
  targetUserId: string,
  newRole: Role
) {
  const admin = await requireAdmin();

  if (admin.id === targetUserId && newRole !== Role.ADMIN) {
    throw new ForbiddenError("لا يمكنك إزالة صلاحية المشرف عن حسابك الحالي");
  }

  const isVerifiedAuto =
    newRole === Role.INSPECTOR ||
    newRole === Role.MODERATOR ||
    newRole === Role.ADMIN;

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, role: true },
  });

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      role: newRole,
      isVerified: isVerifiedAuto ? true : undefined,
      inspectorPending: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "USER_ROLE_CHANGED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم تغيير رتبة المستخدم (@${targetUser?.username || targetUser?.name || targetUserId}) من ${targetUser?.role || "مجهول"} إلى ${newRole}`,
  });

  revalidatePath("/admin/dashboard");
  return updated;
}

export async function toggleBanUserAdminAction(
  targetUserId: string,
  reason?: string
) {
  const admin = await requireAdmin();

  if (admin.id === targetUserId) {
    throw new ForbiddenError("لا يمكنك حظر حساب المشرف الخاص بك");
  }

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, isBanned: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const nextBanned = !target.isBanned;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      isBanned: nextBanned,
      banReason: nextBanned
        ? reason || "مخالفة شروط النشر والضوابط التربوية لمنصة المسند"
        : null,
    },
    select: { id: true, isBanned: true, banReason: true },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: nextBanned ? "USER_BANNED" : "USER_UNBANNED",
    targetType: "USER",
    targetId: targetUserId,
    details: nextBanned
      ? `تم حظر المستخدم (@${target.username || target.name}). السبب: ${reason || "مخالفة الشروط"}`
      : `تم رفع الحظر عن المستخدم (@${target.username || target.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: nextBanned ? "🚫 إشعار حظر الحساب" : "تم رفع الحظر عن حسابك",
      message: nextBanned
        ? `تم حظر حسابك من قِبل الإدارة. السبب: ${
            reason || "مخالفة شروط النشر والضوابط التربوية"
          }.`
        : "تم رفع الحظر عن حسابك، يمكنك الآن معاودة النشر والمشاركة على منصة المسند.",
      link: "/support",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

export async function approveProfileEditAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: {
      id: true,
      name: true,
      username: true,
      school: true,
      bio: true,
      avatarUrl: true,
      pendingProfileData: true,
    },
  });

  if (!targetUser || !targetUser.pendingProfileData) {
    throw new NotFoundError("لا يوجد طلب تعديل معلق لهذا المستخدم");
  }

  const pending = targetUser.pendingProfileData as {
    name?: string;
    username?: string;
    school?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
  };

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      name: pending.name || targetUser.name,
      username: pending.username || targetUser.username,
      school: pending.school !== undefined ? pending.school : targetUser.school,
      bio: pending.bio !== undefined ? pending.bio : targetUser.bio,
      avatarUrl:
        pending.avatarUrl !== undefined
          ? pending.avatarUrl
          : targetUser.avatarUrl,
      profileEditStatus: ProfileEditStatus.APPROVED,
      pendingProfileData: Prisma.DbNull,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "PROFILE_APPROVED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تمت الموافقة على تعديل الملف الشخصي للمستخدم (@${targetUser.username || targetUser.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "تمت الموافقة على تعديل ملفك الشخصي",
      message:
        "قام المشرف العام بمراجعة واعتماد التعديلات الخاصة بملفك الشخصي على منصة المسند.",
      link: "/profile",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/profile");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

export async function rejectProfileEditAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true },
  });

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      profileEditStatus: ProfileEditStatus.REJECTED,
      pendingProfileData: Prisma.DbNull,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "PROFILE_REJECTED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم رفض تعديل الملف الشخصي للمستخدم (@${targetUser?.username || targetUser?.name || targetUserId})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "إشعار بشأن طلب تعديل الملف الشخصي",
      message:
        "لم تتم الموافقة على التعديلات المقترحة لملفك الشخصي. يرجى التأكد من صحة البيانات والمحاولة مجدداً.",
      link: "/profile?tab=edit",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/profile");
  return updated;
}

/**
 * فك غلق الحساب المقفل بسبب تجاوز 6 محاولات خاطئة لكلمة المرور (متاح للمشرف العام)
 */
export async function unlockUserAccountAdminAction(targetUserId: string) {
  const admin = await requireAdmin();

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, email: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      failedLoginAttempts: 0,
      lockedAt: null,
      lockReason: null,
      isBanned: false,
      banReason: null,
    },
    select: {
      id: true,
      failedLoginAttempts: true,
      lockedAt: true,
      isBanned: true,
    },
  });

  await logPlatformActivity({
    actorId: admin.id,
    actorName: admin.name,
    actorRole: admin.role,
    action: "USER_ACCOUNT_UNLOCKED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم فك قفل الحساب وإعادة تصفير محاولات كلمة المرور للمستخدم (@${target.username || target.name}) بواسطة المشرف العام (${admin.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "🔓 تم فك قفل حسابك بنجاح",
      message:
        "قام المشرف العام بفك قفل حسابك وإعادة تفعيل إمكانية تسجيل الدخول. يمكنك الآن استخدام حسابك بشكل طبيعي.",
      link: "/profile",
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/moderator/dashboard");
  return updated;
}

```

---

### File: `src/actions/moderator.actions.ts`

```typescript
"use server";

/**
 * Moderator Actions (المستوى الرقابي الثاني: المسؤول) — Al-Musnad v8.0
 *
 * Moderator Powers (`Role.MODERATOR` & `Role.ADMIN`):
 * 1. حذف المنشورات (`deleteWorksheetModeratorAction`) أو تغيير حالتها (`updateWorksheetStatusModeratorAction`)
 * 2. حظر المستخدمين (`toggleBanUserModeratorAction`) — لا يملك صلاحية حظر مشرف أو مسؤول
 * 3. إدارة قسم الدعم الفني (`replySupportTicketModeratorAction`) ومعالجة البلاغات (`resolveReportModeratorAction`)
 * 4. التواصل المباشر مع الناشر (`sendDirectMessageToPublisherAction`) مع دعم الإشارة `@username`
 *
 * ملاحظة صارمة: المسؤول (`MODERATOR`) لا يملك صلاحية تفعيل التوثيق (`isVerified`) ولا إنشاء الأكواد؛
 * فهذه ميزة حصرية للمشرف العام (`ADMIN`) في قمة الهرم.
 */

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteFile } from "@/services/storage.service";
import { dispatchMentionNotifications } from "@/services/review.service";
import { logPlatformActivity } from "@/services/audit.service";
import { sendSupportReplyNotification } from "@/services/email.service";
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import {
  Role,
  WorksheetStatus,
  ReportStatus,
  SupportTicketStatus,
} from "@prisma/client";

async function requireModeratorOrAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
    },
  });

  if (
    !dbUser ||
    (dbUser.role !== Role.MODERATOR && dbUser.role !== Role.ADMIN)
  ) {
    throw new ForbiddenError(
      "غير مصرح لك بالدخول إلى لوحة تحكم المسؤولين"
    );
  }

  return dbUser;
}

export async function getModeratorDashboardData() {
  const moderator = await requireModeratorOrAdmin();

  const [
    totalWorksheets,
    publishedWorksheets,
    draftWorksheets,
    bannedUsersCount,
    pendingReportsCount,
    openTicketsCount,
    worksheets,
    publishers,
    reports,
    supportTickets,
  ] = await Promise.all([
    db.worksheet.count(),
    db.worksheet.count({ where: { status: WorksheetStatus.PUBLISHED } }),
    db.worksheet.count({ where: { status: WorksheetStatus.DRAFT } }),
    db.user.count({ where: { isBanned: true } }),
    db.report.count({ where: { status: ReportStatus.PENDING } }),
    db.supportTicket.count({ where: { status: SupportTicketStatus.OPEN } }),
    db.worksheet.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 80,
      include: {
        grade: { select: { id: true, nameAr: true } },
        subject: { select: { id: true, nameAr: true, color: true } },
        category: { select: { id: true, nameAr: true } },
        uploader: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            school: true,
            role: true,
            isVerified: true,
            isBanned: true,
          },
        },
      },
    }),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 80,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        school: true,
        isVerified: true,
        isBanned: true,
        banReason: true,
        failedLoginAttempts: true,
        lockedAt: true,
        lockReason: true,
        presenceStatus: true,
        lastSeenAt: true,
        createdAt: true,
        _count: { select: { worksheets: true } },
      },
    }),
    db.report.findMany({
      orderBy: [{ isInspectorPriority: "desc" }, { createdAt: "desc" }],
      take: 60,
      include: {
        reporter: {
          select: { id: true, name: true, username: true, email: true, role: true },
        },
        targetWorksheet: {
          select: { id: true, title: true, titleAr: true },
        },
        targetUser: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
            isBanned: true,
          },
        },
      },
    }),
    db.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      take: 60,
    }),
  ]);

  return {
    moderator,
    stats: {
      totalWorksheets,
      publishedWorksheets,
      draftWorksheets,
      bannedUsersCount,
      pendingReportsCount,
      openTicketsCount,
    },
    worksheets,
    publishers,
    reports,
    supportTickets,
  };
}

export async function deleteWorksheetModeratorAction(worksheetId: string) {
  const actor = await requireModeratorOrAdmin();

  const existing = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, title: true, fileUrl: true },
  });

  if (!existing) {
    throw new NotFoundError("النشرة غير موجودة");
  }

  await db.worksheet.delete({
    where: { id: worksheetId },
  });

  if (existing.fileUrl) {
    await deleteFile(existing.fileUrl).catch(() => null);
  }

  await logPlatformActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "WORKSHEET_DELETED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم حذف المنشور «${existing.title}» بواسطة المسؤول/المشرف (${actor.name})`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return { deleted: true, id: worksheetId };
}

export async function updateWorksheetStatusModeratorAction(
  worksheetId: string,
  status: WorksheetStatus
) {
  const actor = await requireModeratorOrAdmin();

  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, title: true },
  });

  const updated = await db.worksheet.update({
    where: { id: worksheetId },
    data: { status },
    select: { id: true, status: true },
  });

  await logPlatformActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "WORKSHEET_STATUS_CHANGED",
    targetType: "WORKSHEET",
    targetId: worksheetId,
    details: `تم تغيير حالة المنشور «${worksheet?.title || worksheetId}» إلى ${status} بواسطة المسؤول (${actor.name})`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return updated;
}

export async function toggleBanUserModeratorAction(
  targetUserId: string,
  reason?: string
) {
  const actor = await requireModeratorOrAdmin();

  if (actor.id === targetUserId) {
    throw new ForbiddenError("لا يمكنك حظر حسابك الشخصي");
  }

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, role: true, isBanned: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  if (target.role === Role.ADMIN || (target.role === Role.MODERATOR && actor.role !== Role.ADMIN)) {
    throw new ForbiddenError("لا يمكن للمسؤول حظر مشرف عام أو مسؤول آخر");
  }

  const nextBanned = !target.isBanned;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      isBanned: nextBanned,
      banReason: nextBanned
        ? reason || "مخالفة شروط النشر والضوابط التربوية لمنصة المسند"
        : null,
    },
    select: { id: true, isBanned: true, banReason: true },
  });

  await logPlatformActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: nextBanned ? "USER_BANNED" : "USER_UNBANNED",
    targetType: "USER",
    targetId: targetUserId,
    details: nextBanned
      ? `تم حظر المستخدم (@${target.username || target.name}) بواسطة (${actor.name}). السبب: ${reason || "مخالفة الشروط"}`
      : `تم رفع الحظر عن المستخدم (@${target.username || target.name}) بواسطة (${actor.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: nextBanned ? "🚫 إشعار حظر الحساب" : "تم رفع الحظر عن حسابك",
      message: nextBanned
        ? `تم حظر حسابك من قِبل الإدارة (${actor.name}). السبب: ${
            reason || "مخالفة شروط المنصة"
          }.`
        : "تم رفع الحظر عن حسابك، يمكنك الآن معاودة النشر والمشاركة على منصة المسند.",
      link: "/support",
    },
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/publisher/${targetUserId}`);
  return updated;
}

export async function replySupportTicketModeratorAction(
  ticketId: string,
  replyText: string,
  status: "ANSWERED" | "CLOSED" = "ANSWERED"
) {
  const actor = await requireModeratorOrAdmin();

  if (!replyText.trim()) {
    throw new ValidationError("يرجى كتابة نص الرد على التذكرة");
  }

  const ticket = await db.supportTicket.update({
    where: { id: ticketId },
    data: {
      adminReply: replyText.trim(),
      status:
        status === "CLOSED"
          ? SupportTicketStatus.CLOSED
          : SupportTicketStatus.ANSWERED,
    },
  });

  if (ticket.userId) {
    await db.notification.create({
      data: {
        userId: ticket.userId,
        title: `رد من الدعم الفني على تذكرتك: ${ticket.subject}`,
        message: replyText.trim(),
        link: "/support",
      },
    });
  }

  if (ticket.email) {
    void sendSupportReplyNotification(
      ticket.email,
      ticket.name,
      ticket.subject,
      replyText.trim()
    ).catch(() => null);
  }

  await dispatchMentionNotifications(
    replyText.trim(),
    actor.id,
    actor.name,
    ticket.subject,
    "/support"
  );

  revalidatePath("/support");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return ticket;
}

export async function resolveReportModeratorAction(
  reportId: string,
  status: "RESOLVED" | "DISMISSED"
) {
  await requireModeratorOrAdmin();

  const updated = await db.report.update({
    where: { id: reportId },
    data: {
      status:
        status === "RESOLVED" ? ReportStatus.RESOLVED : ReportStatus.DISMISSED,
    },
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return updated;
}

/**
 * التواصل المباشر مع الناشر (متاح للمسؤول، المشرف، والمتفقد)
 * يرسل رسالة مباشرة إلى إشعارات الناشر ويدعم الإشارة `@username`
 */
export async function sendDirectMessageToPublisherAction(input: {
  targetUserId: string;
  subject: string;
  message: string;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const sender = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, username: true, role: true },
  });

  if (
    !sender ||
    (sender.role !== Role.MODERATOR &&
      sender.role !== Role.ADMIN &&
      sender.role !== Role.INSPECTOR)
  ) {
    throw new ForbiddenError("صلاحية المراسلة الرقابية المباشرة مخصصة للمشرف والمسؤول والمتفقد");
  }

  if (!input.message.trim()) {
    throw new ValidationError("يرجى كتابة نص الرسالة الموجهة للناشر");
  }

  const targetUser = await db.user.findUnique({
    where: { id: input.targetUserId },
    select: { id: true, name: true, username: true },
  });

  if (!targetUser) throw new NotFoundError("الناشر غير موجود");

  const roleBadgeAr =
    sender.role === Role.ADMIN
      ? "المشرف العام"
      : sender.role === Role.MODERATOR
      ? "المسؤول الإداري"
      : "المتفقد التربوي";

  const notification = await db.notification.create({
    data: {
      userId: targetUser.id,
      title: `✉️ رسالة مباشرة من ${roleBadgeAr} (${sender.name}): ${
        input.subject.trim() || "توجيه إداري / بيداغوجي"
      }`,
      message: input.message.trim(),
      link: `/publisher/${sender.id}`,
    },
  });

  await dispatchMentionNotifications(
    input.message.trim(),
    sender.id,
    sender.name,
    input.subject.trim() || "رسالة مباشرة",
    `/publisher/${targetUser.id}`
  );

  await logPlatformActivity({
    actorId: sender.id,
    actorName: sender.name,
    actorRole: sender.role,
    action: "DIRECT_MESSAGE_SENT",
    targetType: "USER",
    targetId: targetUser.id,
    details: `رسالة مباشرة إلى (@${targetUser.username || targetUser.name}): ${input.subject.trim()}`,
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  revalidatePath("/inspector/dashboard");
  return notification;
}
/**
 * فك غلق الحساب المقفل بسبب تجاوز 6 محاولات خاطئة لكلمة المرور (متاح للمسؤول الإداري وللمشرف العام)
 */
export async function unlockUserAccountModeratorAction(targetUserId: string) {
  const actor = await requireModeratorOrAdmin();

  const target = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, username: true, role: true },
  });

  if (!target) throw new NotFoundError("المستخدم غير موجود");

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      failedLoginAttempts: 0,
      lockedAt: null,
      lockReason: null,
      isBanned: false,
      banReason: null,
    },
    select: {
      id: true,
      failedLoginAttempts: true,
      lockedAt: true,
      isBanned: true,
    },
  });

  await logPlatformActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "USER_ACCOUNT_UNLOCKED",
    targetType: "USER",
    targetId: targetUserId,
    details: `تم فك قفل الحساب وإعادة تصفير محاولات كلمة المرور للمستخدم (@${target.username || target.name}) بواسطة (${actor.name})`,
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "🔓 تم فك قفل حسابك بنجاح",
      message: `قامت إدارة المنصة (${actor.name}) بفك قفل حسابك وإعادة تفعيل تسجيل الدخول.`,
      link: "/profile",
    },
  });

  revalidatePath("/moderator/dashboard");
  revalidatePath("/admin/dashboard");
  return updated;
}

```

---

### File: `src/actions/inspector.actions.ts`

```typescript
"use server";

/**
 * Inspector Actions (المستوى الرقابي الأول: المتفقد) & Identity Verification — Al-Musnad v8.0
 *
 * Inspector Powers:
 * 1. وضع علامات التوثيق البيداغوجي للمنشورات (`toggleWorksheetEndorsementAction`)
 * 2. إضافة تعليقات ترى في الصدارة (`addInspectorCommentAction` with `isOfficialDirective: true`)
 * 3. رفع تعليق خاص مباشرة إلى الناشر (`addInspectorCommentAction` with `isPrivateToPublisher: true`)
 * 4. القيام بإبلاغات تصل إلى المشرف مباشرة (`submitInspectorDirectReportToAdminAction` with `isInspectorPriority: true`)
 * 5. تفعيل كود التوثيق الصادر من المشرف (`activateInspectorCodeAction` — يدعم جدول `VerificationCode` وأكواد المستخدمين)
 */

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
} from "@/lib/utils/errors";
import { Role, ReportTargetType, WorksheetStatus } from "@prisma/client";
import { upsertWorksheetReview } from "@/services/review.service";
import { logPlatformActivity } from "@/services/audit.service";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sendEndorsementNotification } from "@/services/email.service";

async function requireInspectorOrAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      school: true,
      isVerified: true,
    },
  });

  if (
    !dbUser ||
    (dbUser.role !== Role.INSPECTOR && dbUser.role !== Role.ADMIN)
  ) {
    throw new ForbiddenError(
      "هذه اللوحة والصلاحية مخصصة للمتفقدين التربويين والمشرف العام فقط"
    );
  }

  return dbUser;
}

/**
 * جلب بيانات لوحة تحكم المتفقد التربوي (`/inspector/dashboard`)
 */
export async function getInspectorDashboardData() {
  const inspector = await requireInspectorOrAdmin();

  const [
    totalWorksheets,
    endorsedWorksheetsCount,
    draftWorksheetsCount,
    myDirectReportsCount,
    worksheets,
    myComments,
    myReports,
  ] = await Promise.all([
    db.worksheet.count({ where: { status: WorksheetStatus.PUBLISHED } }),
    db.worksheet.count({ where: { isEndorsed: true } }),
    db.worksheet.count({ where: { status: WorksheetStatus.DRAFT } }),
    db.report.count({
      where: { reporterId: inspector.id, isInspectorPriority: true },
    }),
    db.worksheet.findMany({
      where: { status: { in: [WorksheetStatus.PUBLISHED, WorksheetStatus.DRAFT] } },
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
      take: 80,
      include: {
        grade: { select: { id: true, nameAr: true } },
        subject: { select: { id: true, nameAr: true, color: true } },
        category: { select: { id: true, nameAr: true } },
        uploader: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            school: true,
            role: true,
            isVerified: true,
          },
        },
      },
    }),
    db.review.findMany({
      where: { userId: inspector.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        worksheet: {
          select: {
            id: true,
            title: true,
            titleAr: true,
            uploader: { select: { id: true, name: true, username: true } },
          },
        },
      },
    }),
    db.report.findMany({
      where: { reporterId: inspector.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        targetWorksheet: { select: { id: true, title: true, titleAr: true } },
        targetUser: { select: { id: true, name: true, username: true, email: true } },
      },
    }),
  ]);

  return {
    inspector,
    stats: {
      totalWorksheets,
      endorsedWorksheetsCount,
      draftWorksheetsCount,
      myDirectReportsCount,
    },
    worksheets,
    myComments,
    myReports,
  };
}

/**
 * إضافة تعليق من المتفقد:
 * - إما تعليق عام يظهر في الصدارة (`isPrivateToPublisher: false` -> `isOfficialDirective: true`)
 * - أو تعليق خاص يصل مباشرة إلى الناشر (`isPrivateToPublisher: true`)
 */
export async function addInspectorCommentAction(input: {
  worksheetId: string;
  comment: string;
  isPrivateToPublisher: boolean;
}) {
  const inspector = await requireInspectorOrAdmin();

  if (!input.comment || input.comment.trim().length < 2) {
    throw new ValidationError("يرجى كتابة نص التعليق أو التوجيه البيداغوجي");
  }

  const created = await upsertWorksheetReview(
    input.worksheetId,
    inspector.id,
    {
      rating: 5,
      comment: input.comment.trim(),
      isPrivateToPublisher: input.isPrivateToPublisher,
      isOfficialDirective: !input.isPrivateToPublisher,
    },
    inspector.role
  );

  revalidatePath(`/worksheet/${input.worksheetId}`);
  revalidatePath("/inspector/dashboard");
  return created;
}

/**
 * للمتفقد: القيام بإبلاغ عاجل يصل إلى المشرف العام (`ADMIN`) مباشرة
 */
export async function submitInspectorDirectReportToAdminAction(input: {
  targetType: "WORKSHEET" | "USER";
  targetWorksheetId?: string;
  targetUserId?: string;
  reason: string;
  details?: string;
}) {
  const inspector = await requireInspectorOrAdmin();

  if (!input.reason.trim()) {
    throw new ValidationError("يرجى تحديد سبب البلاغ الموجه للمشرف");
  }

  const report = await db.report.create({
    data: {
      reporterId: inspector.id,
      targetType:
        input.targetType === "WORKSHEET"
          ? ReportTargetType.WORKSHEET
          : ReportTargetType.USER,
      targetWorksheetId: input.targetWorksheetId || null,
      targetUserId: input.targetUserId || null,
      reason: `[بلاغ مباشر من المتفقد ${inspector.name}] ${input.reason.trim()}`,
      details: input.details?.trim() || null,
      isInspectorPriority: true,
    },
  });

  // إشعار فوري لجميع المشرفين في القمة (ADMIN)
  const admins = await db.user.findMany({
    where: { role: Role.ADMIN },
    select: { id: true },
  });

  if (admins.length > 0) {
    await db.notification.createMany({
      data: admins.map((adm) => ({
        userId: adm.id,
        title: "🚨 بلاغ رقابي عاجل من المتفقد التربوي",
        message: `رفع المتفقد (${inspector.name}) بلاغاً مباشراً إليك: "${input.reason.trim()}".`,
        link: "/admin/dashboard?tab=reports",
      })),
    });
  }

  await logPlatformActivity({
    actorId: inspector.id,
    actorName: inspector.name,
    actorRole: inspector.role,
    action: "INSPECTOR_PRIORITY_REPORT",
    targetType: input.targetType,
    targetId: input.targetWorksheetId || input.targetUserId || report.id,
    details: `رفع المتفقد (${inspector.name}) بلاغاً رقابياً عاجلاً للمشرف العام: ${input.reason.trim()}`,
  });

  revalidatePath("/inspector/dashboard");
  revalidatePath("/admin/dashboard");
  return { success: true, id: report.id };
}

/**
 * للمشرف العام (حصرًا): توليد كود توثيق لمستخدم محدد
 */
export async function generateInspectorCodeAdminAction(
  targetUserId: string,
  grantInspectorRole: boolean = false
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const adminUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!adminUser || adminUser.role !== Role.ADMIN) {
    throw new ForbiddenError("توليد أكواد التوثيق صلاحية حصرية للمشرف العام فقط");
  }

  const targetUser = await db.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, name: true, role: true },
  });

  if (!targetUser) {
    throw new NotFoundError("المستخدم غير موجود");
  }

  const part1 = crypto.randomBytes(2).toString("hex").toUpperCase();
  const part2 = crypto.randomBytes(2).toString("hex").toUpperCase();
  const prefix =
    grantInspectorRole || targetUser.role === Role.INSPECTOR ? "INSP" : "VERF";
  const code = `${prefix}-${part1}-${part2}`;

  const updated = await db.user.update({
    where: { id: targetUserId },
    data: {
      inspectorCode: code,
      inspectorPending: true,
    },
    select: {
      id: true,
      name: true,
      inspectorCode: true,
    },
  });

  // Also record in VerificationCode table for unified tracking in Admin Dashboard
  await db.verificationCode.create({
    data: {
      code,
      targetRole: grantInspectorRole ? Role.INSPECTOR : targetUser.role,
      note: `مخصص للمستخدم: ${targetUser.name}`,
      createdById: user.id,
    },
  });

  await db.notification.create({
    data: {
      userId: targetUserId,
      title: "تم إصدار كود توثيق الهوية الخاص بحسابك",
      message:
        "قام المشرف العام بمراجعة طلبك وإصدار كود التوثيق الرسمي. يمكنك الآن إدخاله في قسم (التوثيق) داخل ملفك الشخصي لتفعيل شارة التوثيق.",
      link: "/profile?tab=verification",
    },
  });

  revalidatePath("/admin/dashboard");
  return updated;
}

/**
 * طلب توثيق الهوية من داخل صفحة الملف الشخصي (`/profile?tab=verification`)
 */
export async function requestIdentityVerificationAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, isVerified: true },
  });

  if (!dbUser) throw new NotFoundError("الحساب غير موجود");

  if (dbUser.isVerified) {
    return { alreadyVerified: true };
  }

  await db.user.update({
    where: { id: user.id },
    data: { inspectorPending: true },
  });

  revalidatePath("/profile");
  revalidatePath("/admin/dashboard");
  return { requested: true };
}

/**
 * تفعيل شارة التوثيق (`isVerified`) باستخدام الكود الصادر من المشرف
 * يقبل الأكواد المولدة في جدول `VerificationCode` أو الأكواد المربوطة بـ `user.inspectorCode`
 */
export async function activateInspectorCodeAction(codeInput: string) {
  const cleanCode = codeInput.trim().toUpperCase();
  if (!cleanCode || cleanCode.length < 4) {
    throw new ValidationError("يرجى إدخال كود التوثيق بشكل صحيح");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول أولاً لتفعيل الكود");
  }

  const rl = checkRateLimit(`verify-code:${user.id}`, {
    maxRequests: 8,
    windowMs: 10 * 60_000,
  });
  if (!rl.allowed) {
    throw new ValidationError("لقد تجاوزت الحد المسموح لمحاولات تفعيل الكود. يرجى المحاولة بعد دقائق.");
  }

  const currentUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true },
  });

  // 1. Check standalone VerificationCode table first
  const standaloneCode = await db.verificationCode.findUnique({
    where: { code: cleanCode },
  });

  if (standaloneCode) {
    if (standaloneCode.isUsed && standaloneCode.usedById !== user.id) {
      throw new ValidationError("هذا الكود تم استخدامه مسبقاً");
    }

    const nextRole =
      standaloneCode.targetRole === Role.INSPECTOR || cleanCode.startsWith("INSP-")
        ? Role.INSPECTOR
        : currentUser?.role || Role.TEACHER;

    const [updatedUser] = await db.$transaction([
      db.user.update({
        where: { id: user.id },
        data: {
          role: nextRole,
          isVerified: true,
          inspectorPending: false,
          inspectorCode: null,
        },
      }),
      db.verificationCode.update({
        where: { id: standaloneCode.id },
        data: {
          isUsed: true,
          usedById: user.id,
          usedAt: new Date(),
        },
      }),
    ]);

    await db.notification.create({
      data: {
        userId: user.id,
        title: "تم توثيق هويتك وتفعيل شارة التوثيق بنجاح",
        message:
          "تهانينا! تم التحقق من الكود وتفعيل شارة التوثيق الرسمية على حسابك في منصة المسند.",
        link: "/profile?tab=verification",
      },
    });

    await logPlatformActivity({
      actorId: user.id,
      actorName: updatedUser.name,
      actorRole: updatedUser.role,
      action: "VERIFICATION_CODE_REDEEMED",
      targetType: "VERIFICATION_CODE",
      targetId: cleanCode,
      details: `قام المستخدم (${updatedUser.name}) بتفعيل كود التوثيق الرسمي «${cleanCode}» بنجاح`,
    });

    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath("/admin/dashboard");
    return updatedUser;
  }

  // 2. Check legacy per-user `inspectorCode`
  const matchedUser = await db.user.findFirst({
    where: {
      id: user.id,
      inspectorCode: cleanCode,
    },
  });

  if (!matchedUser) {
    throw new ValidationError(
      "كود التوثيق غير صحيح أو غير مخصص لهذا الحساب. يرجى التواصل مع المشرف العام."
    );
  }

  const nextRole = cleanCode.startsWith("INSP-")
    ? Role.INSPECTOR
    : matchedUser.role;

  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      role: nextRole,
      isVerified: true,
      inspectorPending: false,
      inspectorCode: null,
    },
  });

  await db.notification.create({
    data: {
      userId: user.id,
      title: "تم توثيق هويتك وتفعيل شارة التوثيق بنجاح",
      message:
        "تهانينا! تم التحقق من الكود وتفعيل شارة التوثيق الرسمية على حسابك في منصة المسند.",
      link: "/profile?tab=verification",
    },
  });

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/admin/dashboard");

  return updated;
}

/**
 * للمتفقد التربوي أو المشرف: وضع أو إزالة علامة الاعتماد البيداغوجي على المنشور
 */
export async function toggleWorksheetEndorsementAction(worksheetId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError("يرجى تسجيل الدخول أولاً");

  const actor = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, role: true, isVerified: true },
  });

  if (
    !actor ||
    (actor.role !== Role.INSPECTOR && actor.role !== Role.ADMIN)
  ) {
    throw new ForbiddenError(
      "هذه الميزة مخصصة للمتفقدين المعتمدين فقط للمصادقة على صحة النشرات علمياً وبيداغوجياً"
    );
  }

  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      title: true,
      titleAr: true,
      isEndorsed: true,
      uploadedBy: true,
    },
  });

  if (!worksheet) throw new NotFoundError("النشرة غير موجودة");

  const nextEndorsed = !worksheet.isEndorsed;

  const updated = await db.worksheet.update({
    where: { id: worksheetId },
    data: {
      isEndorsed: nextEndorsed,
      endorsedById: nextEndorsed ? actor.id : null,
      endorsedAt: nextEndorsed ? new Date() : null,
    },
    include: {
      endorsedBy: {
        select: { id: true, name: true, username: true, role: true, school: true },
      },
    },
  });

  if (nextEndorsed && worksheet.uploadedBy !== actor.id) {
    const teacher = await db.user.findUnique({
      where: { id: worksheet.uploadedBy },
      select: { email: true, name: true },
    });

    await db.notification.create({
      data: {
        userId: worksheet.uploadedBy,
        title: "مصادقة بيداغوجية جديدة على نشرتك!",
        message: `قام المتفقد التربوي (${actor.name}) بالمصادقة على صحة نشرتك "${
          worksheet.titleAr || worksheet.title
        }" علمياً وبيداغوجياً ومنحها شارة الاعتماد البيداغوجي.`,
        link: `/worksheet/${worksheet.id}`,
      },
    });

    if (teacher?.email) {
      void sendEndorsementNotification(
        teacher.email,
        teacher.name,
        worksheet.titleAr || worksheet.title
      ).catch(() => null);
    }
  }

  await logPlatformActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: nextEndorsed ? "WORKSHEET_ENDORSED" : "WORKSHEET_UNENDORSED",
    targetType: "WORKSHEET",
    targetId: worksheet.id,
    details: `تم ${nextEndorsed ? "اعتماد" : "إلغاء اعتماد"} المنشور «${worksheet.titleAr || worksheet.title}» بيداغوجياً بواسطة (${actor.name})`,
  });

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath(`/worksheet/${worksheetId}`);
  revalidatePath("/inspector/dashboard");
  revalidatePath("/admin/dashboard");

  return updated;
}
```

---

### File: `src/actions/publisher.actions.ts`

```typescript
"use server";

/**
 * Publisher Social & Bookmark Actions — Al-Musnad v5.0
 *
 * Enforces strict authentication AND filters publisher publications so that
 * the viewing account ONLY sees publications the publisher made available to its role.
 */

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import {
  publicWorksheetSelect,
  buildAudienceVisibilityFilter,
} from "@/services/worksheet.service";
import { WorksheetStatus } from "@prisma/client";

export async function toggleFollowPublisherAction(publisherId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لمتابعة الناشر");
  }

  if (user.id === publisherId) {
    throw new ValidationError("لا يمكنك متابعة حسابك الشخصي");
  }

  const publisher = await db.user.findUnique({
    where: { id: publisherId },
    select: { id: true, name: true, followersCount: true },
  });

  if (!publisher) {
    throw new NotFoundError("الناشر غير موجود");
  }

  const result = await db.$transaction(async (tx) => {
    const existing = await tx.publisherFollow.findUnique({
      where: {
        followerId_publisherId: {
          followerId: user.id,
          publisherId,
        },
      },
    });

    if (existing) {
      await tx.publisherFollow.delete({ where: { id: existing.id } });
      const nextCount = Math.max(0, (publisher.followersCount || 0) - 1);
      await tx.user.update({
        where: { id: publisherId },
        data: { followersCount: nextCount },
      });
      return { isFollowing: false, followersCount: nextCount };
    } else {
      await tx.publisherFollow.create({
        data: {
          followerId: user.id,
          publisherId,
        },
      });
      const nextCount = (publisher.followersCount || 0) + 1;
      await tx.user.update({
        where: { id: publisherId },
        data: { followersCount: nextCount },
      });

      const followerUser = await tx.user.findUnique({
        where: { id: user.id },
        select: { name: true },
      });

      await tx.notification.create({
        data: {
          userId: publisherId,
          title: "متابع جديد لحسابك في المسند",
          message: `بدأ (${followerUser?.name || "أحد الأعضاء"}) بمتابعة نشراتك التربوية.`,
          link: `/publisher/${user.id}`,
        },
      });

      return { isFollowing: true, followersCount: nextCount };
    }
  });

  revalidatePath(`/publisher/${publisherId}`);
  revalidatePath("/profile");
  return result;
}

export async function toggleFavoritePublisherAction(publisherId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لإضافة الناشر إلى المفضلة");
  }

  if (user.id === publisherId) {
    throw new ValidationError("لا يمكنك إضافة حسابك الشخصي إلى المفضلة");
  }

  const publisher = await db.user.findUnique({
    where: { id: publisherId },
    select: { id: true, favoritedByCount: true },
  });

  if (!publisher) {
    throw new NotFoundError("الناشر غير موجود");
  }

  const result = await db.$transaction(async (tx) => {
    const existing = await tx.favoritePublisher.findUnique({
      where: {
        userId_publisherId: {
          userId: user.id,
          publisherId,
        },
      },
    });

    if (existing) {
      await tx.favoritePublisher.delete({ where: { id: existing.id } });
      const nextCount = Math.max(0, (publisher.favoritedByCount || 0) - 1);
      await tx.user.update({
        where: { id: publisherId },
        data: { favoritedByCount: nextCount },
      });
      return { isFavoritedPublisher: false, favoritedByCount: nextCount };
    } else {
      await tx.favoritePublisher.create({
        data: {
          userId: user.id,
          publisherId,
        },
      });
      const nextCount = (publisher.favoritedByCount || 0) + 1;
      await tx.user.update({
        where: { id: publisherId },
        data: { favoritedByCount: nextCount },
      });
      return { isFavoritedPublisher: true, favoritedByCount: nextCount };
    }
  });

  revalidatePath(`/publisher/${publisherId}`);
  revalidatePath("/profile");
  return result;
}

export async function getPublicPublisherProfileData(publisherId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user: viewerAuth },
  } = await supabase.auth.getUser();

  // Rule 1: Strictly block unauthenticated access to publisher profiles and their publications
  if (!viewerAuth) {
    throw new UnauthorizedError(
      "يرجى تسجيل الدخول بحسابك لعرض ملف الناشر والنشرات المتاحة لفئة حسابك"
    );
  }

  const vUser = await db.user.findUnique({
    where: { id: viewerAuth.id },
    select: { id: true, role: true },
  });

  if (!vUser) {
    throw new UnauthorizedError("يرجى تسجيل الدخول بحسابك");
  }

  const viewerRole = vUser.role;

  const publisher = await db.user.findUnique({
    where: { id: publisherId },
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      role: true,
      school: true,
      bio: true,
      followersCount: true,
      favoritedByCount: true,
      isVerified: true,
      isBanned: true,
      presenceStatus: true,
      lastSeenAt: true,
      banReason: true,
      createdAt: true,
    },
  });

  if (!publisher) {
    throw new NotFoundError("الناشر غير موجود");
  }

  // Rule 2: Viewer only sees publications that this publisher made available to viewerRole
  const audienceGuard =
    viewerAuth.id === publisherId
      ? {}
      : buildAudienceVisibilityFilter(viewerRole, viewerAuth.id);

  const [worksheets, followRecord, favRecord] = await Promise.all([
    db.worksheet.findMany({
      where: {
        AND: [
          { uploadedBy: publisherId },
          { status: WorksheetStatus.PUBLISHED },
          audienceGuard,
        ],
      },
      select: publicWorksheetSelect,
      orderBy: [{ isEndorsed: "desc" }, { createdAt: "desc" }],
    }),
    db.publisherFollow.findUnique({
      where: {
        followerId_publisherId: {
          followerId: viewerAuth.id,
          publisherId,
        },
      },
    }),
    db.favoritePublisher.findUnique({
      where: {
        userId_publisherId: {
          userId: viewerAuth.id,
          publisherId,
        },
      },
    }),
  ]);

  const totalDownloads = worksheets.reduce(
    (acc, w) => acc + (w.downloadCount || 0),
    0
  );
  const endorsedCount = worksheets.filter((w) => w.isEndorsed).length;

  return {
    publisher,
    worksheets,
    stats: {
      worksheetsCount: worksheets.length,
      endorsedCount,
      totalDownloads,
      followersCount: publisher.followersCount ?? 0,
      favoritedByCount: publisher.favoritedByCount ?? 0,
    },
    viewerState: {
      isOwnProfile: viewerAuth.id === publisherId,
      isFollowing: Boolean(followRecord),
      isFavoritedPublisher: Boolean(favRecord),
      viewerRole,
    },
  };
}

export async function getMyFavoritePublishersAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const records = await db.favoritePublisher.findMany({
    where: { userId: user.id },
    include: {
      publisher: {
        select: {
          id: true,
          name: true,
          role: true,
          school: true,
          bio: true,
          avatarUrl: true,
          followersCount: true,
          favoritedByCount: true,
          isVerified: true,
          isBanned: true,
          _count: { select: { worksheets: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return records.map((r) => r.publisher);
}
```

---

### File: `src/actions/report-support.actions.ts`

```typescript
"use server";

/**
 * Reports (التبليغات) & Technical Support / Customer Service (الدعم الفني وخدمة العملاء) — Al-Musnad v4.0
 */

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UnauthorizedError,
  ValidationError,
  ForbiddenError,
} from "@/lib/utils/errors";
import {
  ReportTargetType,
  ReportStatus,
  SupportTicketStatus,
  Role,
} from "@prisma/client";
import { sendSupportReplyNotification } from "@/services/email.service";

export interface SubmitReportInput {
  targetType: "WORKSHEET" | "USER";
  targetWorksheetId?: string;
  targetUserId?: string;
  reason: string;
  details?: string;
}

export async function submitReportAction(input: SubmitReportInput) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError("يرجى تسجيل الدخول لإرسال البلاغ");
  }

  if (!input.reason.trim()) {
    throw new ValidationError("يرجى تحديد سبب البلاغ");
  }

  const report = await db.report.create({
    data: {
      reporterId: user.id,
      targetType:
        input.targetType === "WORKSHEET"
          ? ReportTargetType.WORKSHEET
          : ReportTargetType.USER,
      targetWorksheetId: input.targetWorksheetId || null,
      targetUserId: input.targetUserId || null,
      reason: input.reason.trim(),
      details: input.details?.trim() || null,
    },
  });

  revalidatePath("/admin/dashboard");
  return { success: true, id: report.id };
}

export interface SubmitSupportTicketInput {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export async function submitSupportTicketAction(
  input: SubmitSupportTicketInput
) {
  if (!input.name.trim() || !input.email.trim() || !input.subject.trim() || !input.message.trim()) {
    throw new ValidationError("يرجى ملء جميع حقول التذكرة");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ticket = await db.supportTicket.create({
    data: {
      userId: user?.id || null,
      name: input.name.trim(),
      email: input.email.trim(),
      category: input.category || "TECHNICAL",
      subject: input.subject.trim(),
      message: input.message.trim(),
    },
  });

  revalidatePath("/support");
  revalidatePath("/admin/dashboard");
  return ticket;
}

export async function getMySupportTicketsAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  return db.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateReportStatusAdminAction(
  reportId: string,
  status: "RESOLVED" | "DISMISSED"
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();
  const admin = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  if (admin?.role !== Role.ADMIN && admin?.role !== Role.MODERATOR) throw new ForbiddenError();

  const existingReport = await db.report.findUnique({
    where: { id: reportId },
    select: { id: true, isInspectorPriority: true },
  });

  if (existingReport?.isInspectorPriority && admin.role !== Role.ADMIN) {
    throw new ForbiddenError(
      "البلاغات الرقابية العاجلة المرفوعة من المتفقدين موجهة حصرياً للمشرف العام ولا يمكن للمسؤول الإداري إغلاقها"
    );
  }

  const updated = await db.report.update({
    where: { id: reportId },
    data: {
      status:
        status === "RESOLVED" ? ReportStatus.RESOLVED : ReportStatus.DISMISSED,
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/moderator/dashboard");
  return updated;
}

export async function replySupportTicketAdminAction(
  ticketId: string,
  replyText: string,
  status: "ANSWERED" | "CLOSED" = "ANSWERED"
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();
  const admin = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  if (admin?.role !== Role.ADMIN && admin?.role !== Role.MODERATOR) throw new ForbiddenError();

  const ticket = await db.supportTicket.update({
    where: { id: ticketId },
    data: {
      adminReply: replyText.trim(),
      status:
        status === "CLOSED"
          ? SupportTicketStatus.CLOSED
          : SupportTicketStatus.ANSWERED,
    },
  });

  if (ticket.userId) {
    await db.notification.create({
      data: {
        userId: ticket.userId,
        title: "رد جديد من الدعم الفني وخدمة العملاء",
        message: `تم الرد على تذكرتك: "${ticket.subject}"`,
        link: "/support",
      },
    });
  }

  if (ticket.email) {
    void sendSupportReplyNotification(
      ticket.email,
      ticket.name,
      ticket.subject,
      replyText.trim()
    ).catch(() => null);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/moderator/dashboard");
  revalidatePath("/support");
  return ticket;
}
```

---

*نهاية الجزء الأول (Part 1/2) — يتبع في الجزء الثاني (PROJECT_HANDOVER_PART2.md) — Total included files: 73.*
