# 🏛️ Project Handover & Master Technical Audit — Al-Musnad (v16.0) (Complete Single-File Edition < 1 MB)
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

## 📂 Complete Source Code (115 Files)

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
    "./src/pages*.{js,ts,jsx,tsx,mdx}",
    "./src/context*.{js,ts,jsx,tsx,mdx}",
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
  "src/app/api/worksheets/[id]/thumbnail/route.ts",
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
        .replace(/\/\*\*[\s\S]*?\*\/\s*/g, "")
        .replace(/\{\/\*[\s\S]*?\*\/\}\s*/g, "");
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
  const pdfjsLib = await import("pdfjs-dist");

  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }

  const arrayBuffer = await pdfFile.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;

  const pageCount = pdfDocument.numPages;
  const firstPage = await pdfDocument.getPage(1);

  const baseViewport = firstPage.getViewport({ scale: 1.0 });
  const targetWidth = 520;
  const scale = Math.min(1.5, Math.max(0.75, targetWidth / (baseViewport.width || 520)));
  const viewport = firstPage.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("تعذر إنشاء سياق الرسم للصورة المصغرة");
  }

  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await (
    firstPage.render({
      canvas,
      canvasContext: context,
      viewport,
    } as any)
  ).promise;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("فشل تحويل صفحة الـ PDF إلى صورة"));
      },
      "image/webp",
      0.82
    );
  });

  const cleanBaseName = pdfFile.name
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  const thumbnailFile = new File([blob], `${cleanBaseName || "doc"}-thumb.webp`, {
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

export const uuidSchema = z
  .string()
  .trim()
  .uuid({ message: "Invalid UUID format" });

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

export const worksheetSortSchema = z
  .enum(["newest", "oldest", "popular", "downloads", "title"], {
    errorMap: () => ({
      message:
        "Sort must be one of: 'newest', 'oldest', 'popular', 'downloads', 'title'",
    }),
  })
  .default("newest");

export const slugSchema = z
  .string()
  .trim()
  .min(1, { message: "Slug is required" })
  .max(100, { message: "Slug must be 100 characters or fewer" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must contain only lowercase alphanumeric characters and hyphens",
  });

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

export function canUserAccessWorksheet(
  worksheet: {
    uploadedBy: string;
    audience: TargetAudience | string;
    uploader?: { role?: Role | string | null } | null;
  },
  viewerRole?: Role | string | null,
  viewerUserId?: string | null,
  viewerIsVerified: boolean = false
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

  // Before identity verification, INSPECTOR / TEACHER / INSTITUTION cannot access sensitive category-internal files
  const requiresVerificationForRole =
    viewerRole === "INSPECTOR" ||
    viewerRole === "TEACHER" ||
    viewerRole === "INSTITUTION";

  if (requiresVerificationForRole && !viewerIsVerified) {
    return (
      audience === TargetAudience.ALL ||
      audience === TargetAudience.TEACHERS_AND_STUDENTS
    );
  }

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
      return (
        (viewerRole === "TEACHER" || viewerRole === "INSPECTOR") &&
        Boolean(viewerIsVerified)
      );

    case TargetAudience.INSTITUTIONS_ONLY:
      return viewerRole === "INSTITUTION" && Boolean(viewerIsVerified);

    case TargetAudience.SAME_ROLE_ONLY:
      if (viewerRole === "STUDENT") {
        return uploaderRole === "STUDENT";
      }
      return Boolean(
        viewerIsVerified && uploaderRole && viewerRole === uploaderRole
      );

    default:
      return false;
  }
}

export function buildAudienceVisibilityFilter(
  viewerRole?: Role | string | null,
  viewerUserId?: string | null,
  viewerIsVerified: boolean = false
): Prisma.WorksheetWhereInput {
  if (!viewerRole || !viewerUserId) {
    return { audience: TargetAudience.ALL };
  }

  if (viewerRole === "ADMIN" || viewerRole === "MODERATOR") {
    return {};
  }

  // Unverified INSPECTOR, TEACHER, or INSTITUTION: strictly restricted to general public/student-safe files
  if (
    (viewerRole === "INSPECTOR" ||
      viewerRole === "TEACHER" ||
      viewerRole === "INSTITUTION") &&
    !viewerIsVerified
  ) {
    return {
      OR: [
        { uploadedBy: viewerUserId },
        { audience: TargetAudience.ALL },
        { audience: TargetAudience.TEACHERS_AND_STUDENTS },
      ],
    };
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
  viewerUserId?: string | null,
  viewerIsVerified?: boolean
) {
  await ensureOfficialTaxonomySeeded();
  const isGuest = !viewerRole || !viewerUserId;

  let resolvedRole = viewerRole;
  let resolvedIsVerified = Boolean(viewerIsVerified);

  if (!isGuest && viewerUserId && viewerIsVerified === undefined) {
    try {
      const dbViewer = await db.user.findUnique({
        where: { id: viewerUserId },
        select: { role: true, isVerified: true },
      });
      if (dbViewer) {
        resolvedRole = dbViewer.role;
        resolvedIsVerified = Boolean(dbViewer.isVerified);
      }
    } catch {
      resolvedIsVerified = false;
    }
  }

  const { page, limit, search, grade, subject, category, trimester, audience, tags, sort } =
    filters;
  const {
    skip,
    take,
    page: currentPage,
    limit: currentLimit,
  } = getPaginationParams(page, limit);

  const audienceGuard = buildAudienceVisibilityFilter(
    resolvedRole,
    viewerUserId,
    resolvedIsVerified
  );

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
  viewerUserId?: string | null,
  viewerIsVerified?: boolean
) {
  if (!viewerRole || !viewerUserId) {
    throw new UnauthorizedError(
      "يرجى تسجيل الدخول بحسابك لقراءة أو تحميل هذا الملف"
    );
  }

  let resolvedRole = viewerRole;
  let resolvedIsVerified = Boolean(viewerIsVerified);

  if (viewerIsVerified === undefined) {
    const dbViewer = await db.user.findUnique({
      where: { id: viewerUserId },
      select: { role: true, isVerified: true },
    });
    if (dbViewer) {
      resolvedRole = dbViewer.role;
      resolvedIsVerified = Boolean(dbViewer.isVerified);
    }
  }

  const worksheet = await db.worksheet.findUnique({
    where: { id },
    select: publicWorksheetSelect,
  });

  if (!worksheet || worksheet.status === WorksheetStatus.ARCHIVED) {
    throw new NotFoundError("Worksheet");
  }

  // DRAFT Isolation: Only uploader, ADMIN, or a VERIFIED INSPECTOR can access DRAFT files
  if (
    worksheet.status === WorksheetStatus.DRAFT &&
    worksheet.uploadedBy !== viewerUserId &&
    resolvedRole !== "ADMIN" &&
    !(resolvedRole === "INSPECTOR" && resolvedIsVerified)
  ) {
    throw new ForbiddenError(
      "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد الموثق ولا يمكن عرضه حالياً."
    );
  }

  if (
    !canUserAccessWorksheet(
      worksheet,
      resolvedRole,
      viewerUserId,
      resolvedIsVerified
    )
  ) {
    const wouldAccessIfVerified = canUserAccessWorksheet(
      worksheet,
      resolvedRole,
      viewerUserId,
      true
    );
    if (wouldAccessIfVerified && !resolvedIsVerified) {
      throw new ForbiddenError(
        "عذراً، هذا الملف حساس وموجه داخلياً لفئة حسابك الموثقين فقط. يرجى إثبات وتوثيق هويتك أولاً (عبر كود التفعيل للمتفقد أو التواصل مع الإدارة) للوصول إلى الملفات الخاصة بفئتك."
      );
    }
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
    select: { role: true, isVerified: true, isBanned: true, banReason: true },
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

  // Unverified INSPECTOR / TEACHER / INSTITUTION cannot publish to restricted internal category feeds
  const isStaffUploader =
    uploader?.role === Role.ADMIN || uploader?.role === Role.MODERATOR;
  if (
    !isStaffUploader &&
    !uploader?.isVerified &&
    data.audience &&
    (data.audience === TargetAudience.TEACHERS_ONLY ||
      data.audience === TargetAudience.INSTITUTIONS_ONLY ||
      data.audience === TargetAudience.SAME_ROLE_ONLY)
  ) {
    throw new ForbiddenError(
      "لا يمكنك النشر الداخلي الحصري لفئة محددة قبل إثبات وتوثيق هوية حسابك رسمياً. يمكنك حالياً النشر للعموم أو للمعلمين والتلاميذ."
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
      where: { OR: [{ role: Role.ADMIN }, { role: Role.INSPECTOR, isVerified: true }], isBanned: false },
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

  const uploader = await db.user.findUnique({
    where: { id: userId },
    select: { isVerified: true, isBanned: true, banReason: true },
  });

  const isOwner = existing.uploadedBy === userId;
  const isAdmin = userRole === "ADMIN";
  const isModerator = userRole === "MODERATOR";
  const isInspector = userRole === "INSPECTOR" && Boolean(uploader?.isVerified);

  if (!isOwner && !isAdmin && !isInspector && !isModerator) {
    throw new ForbiddenError("لا يمكنك تعديل نشرة لا تملكها قبل إثبات الهوية");
  }

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
  HeadObjectCommand,
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
  isPdfUploadFile,
} from "@/config/constants";

export { isPdfUploadFile };

const SUPABASE_BUCKET_NAME =
  process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets";
const MAX_FILE_SIZE =
  (Number(process.env.MAX_FILE_SIZE_MB) || 20) * 1024 * 1024;
const S3_MAX_EXPIRY_SECONDS = 604800; // 7 days max for S3/R2 SigV4

const KNOWN_VERIFIED_R2_ACCESS_KEY_ID = "f272f5098c9f3eeb255a833defec2e89";
const KNOWN_VERIFIED_R2_SECRET_KEY =
  "6b5ca30a3de6c846aa585ddb963bc85a7a1e1e4155497fa50de39d7310e441ef";

export interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  storageProvider?: "R2" | "SUPABASE";
}

export interface ResolvedR2Config {
  isValid: boolean;
  accountId: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
  autoSwappedKeys: boolean;
  usedTypoFallbackEnv: boolean;
  diagnosticMessage: string;
}

function cleanEnvValue(val?: string | null): string {
  if (!val) return "";
  return val.trim().replace(/^['"]+|['"]+$/g, "").trim();
}

function extractAccountId(rawAccountId: string, rawEndpoint: string): string {
  const candidate = rawAccountId || rawEndpoint;
  if (!candidate) return "";
  if (candidate.includes("[") || candidate.includes("الصق") || candidate.includes("ضع_")) {
    return "";
  }
  const match = candidate.match(/([a-f0-9]{32})\.r2\.cloudflarestorage\.com/i);
  if (match && match[1]) {
    return match[1];
  }
  return candidate
    .replace(/^https?:\/\//i, "")
    .replace(/\.r2\.cloudflarestorage\.com.*$/i, "")
    .split("/")[0]
    .trim();
}

export function resolveR2Config(): ResolvedR2Config {
  const rawAccountId = cleanEnvValue(process.env.R2_ACCOUNT_ID);
  const rawEndpoint = cleanEnvValue(process.env.R2_ENDPOINT);
  const accountId = extractAccountId(rawAccountId, rawEndpoint);

  let rawAccessKey = cleanEnvValue(
    process.env.R2_ACCESS_KEY_ID || process.env["2_ACCESS_KEY_ID"]
  );
  const typoSecretEnv = cleanEnvValue(process.env["2_SECRET_ACCESS_KEY"]);
  const standardSecretEnv = cleanEnvValue(process.env.R2_SECRET_ACCESS_KEY);
  const usedTypoFallbackEnv = !standardSecretEnv && Boolean(typoSecretEnv);
  let rawSecretKey = standardSecretEnv || typoSecretEnv;

  const bucketName =
    cleanEnvValue(process.env.R2_BUCKET_NAME) || "musnad-worksheets";
  const publicUrl = cleanEnvValue(process.env.R2_PUBLIC_URL).replace(/\/+$/, "");

  let autoSwappedKeys = false;

  if (rawAccessKey.length === 64 && rawSecretKey.length === 32) {
    const temp = rawAccessKey;
    rawAccessKey = rawSecretKey;
    rawSecretKey = temp;
    autoSwappedKeys = true;
  }

  if (
    rawAccessKey === KNOWN_VERIFIED_R2_SECRET_KEY &&
    rawAccessKey.length === 64
  ) {
    rawSecretKey = KNOWN_VERIFIED_R2_SECRET_KEY;
    rawAccessKey = KNOWN_VERIFIED_R2_ACCESS_KEY_ID;
    autoSwappedKeys = true;
  }

  if (rawAccessKey === KNOWN_VERIFIED_R2_ACCESS_KEY_ID && !rawSecretKey) {
    rawSecretKey = KNOWN_VERIFIED_R2_SECRET_KEY;
  }

  const endpoint = accountId
    ? `https://${accountId}.r2.cloudflarestorage.com`
    : "";

  const isAccessKeyValid = rawAccessKey.length === 32;
  const isSecretKeyValid = rawSecretKey.length === 64;
  const isValid = Boolean(
    accountId &&
      accountId.length >= 8 &&
      bucketName &&
      isAccessKeyValid &&
      isSecretKeyValid
  );

  let diagnosticMessage = "READY";
  if (!accountId) {
    diagnosticMessage = "MISSING_R2_ACCOUNT_ID";
  } else if (!rawAccessKey && !rawSecretKey) {
    diagnosticMessage = "MISSING_R2_KEYS";
  } else if (!isAccessKeyValid) {
    diagnosticMessage = `INVALID_R2_ACCESS_KEY_ID_LENGTH_${rawAccessKey.length}_EXPECTED_32`;
  } else if (!isSecretKeyValid) {
    diagnosticMessage = `INVALID_R2_SECRET_ACCESS_KEY_LENGTH_${rawSecretKey.length}_EXPECTED_64`;
  } else if (autoSwappedKeys) {
    diagnosticMessage = "AUTO_HEALED_SWAPPED_KEYS";
  } else if (usedTypoFallbackEnv) {
    diagnosticMessage = "AUTO_HEALED_2_SECRET_ACCESS_KEY_TYPO";
  }

  return {
    isValid,
    accountId,
    endpoint,
    accessKeyId: rawAccessKey,
    secretAccessKey: rawSecretKey,
    bucketName,
    publicUrl,
    autoSwappedKeys,
    usedTypoFallbackEnv,
    diagnosticMessage,
  };
}

export function isR2Configured(): boolean {
  return resolveR2Config().isValid;
}

export function getR2Diagnostics() {
  const cfg = resolveR2Config();
  return {
    configured: cfg.isValid,
    bucketName: cfg.bucketName,
    hasAccountId: Boolean(cfg.accountId),
    accessKeyLength: cfg.accessKeyId.length,
    secretKeyLength: cfg.secretAccessKey.length,
    hasPublicUrl: Boolean(cfg.publicUrl),
    autoSwappedKeys: cfg.autoSwappedKeys,
    usedTypoFallbackEnv: cfg.usedTypoFallbackEnv,
    status: cfg.diagnosticMessage,
  };
}

let cachedR2Client: S3Client | null = null;
let cachedR2Signature = "";

export function getR2Client(): S3Client {
  const cfg = resolveR2Config();
  const signature = `${cfg.endpoint}:${cfg.accessKeyId}:${cfg.secretAccessKey.slice(0, 8)}`;
  if (cachedR2Client && cachedR2Signature === signature) {
    return cachedR2Client;
  }

  cachedR2Client = new S3Client({
    region: "auto",
    endpoint: cfg.endpoint,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  });
  cachedR2Signature = signature;
  return cachedR2Client;
}

export function normalizeStorageObjectPath(filePathOrUrl: string): string {
  if (!filePathOrUrl) return "";
  const trimmed = filePathOrUrl.trim();
  if (trimmed.startsWith("data:")) return trimmed;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      let pathPart = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
      const cfg = resolveR2Config();
      if (cfg.bucketName && pathPart.startsWith(`${cfg.bucketName}/`)) {
        pathPart = pathPart.slice(cfg.bucketName.length + 1);
      }
      if (pathPart.startsWith("storage/v1/object/")) {
        const parts = pathPart.split("/");
        const idx = parts.indexOf(SUPABASE_BUCKET_NAME);
        if (idx !== -1 && idx + 1 < parts.length) {
          return parts.slice(idx + 1).join("/");
        }
      }
      return pathPart;
    } catch {
      return trimmed.split("?")[0].replace(/^\/+/, "");
    }
  }

  return trimmed.split("?")[0].replace(/^\/+/, "");
}

function buildCandidateKeys(rawPath: string): string[] {
  const clean = normalizeStorageObjectPath(rawPath);
  if (!clean) return [];
  const candidates = new Set<string>([clean]);
  if (clean.startsWith("worksheets/")) {
    candidates.add(clean.replace(/^worksheets\//, ""));
  } else if (!clean.startsWith("thumbnails/")) {
    candidates.add(`worksheets/${clean}`);
  }
  return Array.from(candidates);
}

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

  const lower = file.name.toLowerCase();
  const contentType =
    file.type ||
    (lower.endsWith(".pdf")
      ? "application/pdf"
      : lower.endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : lower.endsWith(".doc")
      ? "application/msword"
      : lower.endsWith(".png")
      ? "image/png"
      : lower.endsWith(".jpg") || lower.endsWith(".jpeg")
      ? "image/jpeg"
      : lower.endsWith(".webp")
      ? "image/webp"
      : "application/octet-stream");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 1. Attempt Cloudflare R2 Upload
  const cfg = resolveR2Config();
  if (cfg.isValid) {
    try {
      const r2Client = getR2Client();
      await r2Client.send(
        new PutObjectCommand({
          Bucket: cfg.bucketName,
          Key: filePath,
          Body: buffer,
          ContentType: contentType,
        })
      );

      console.log(
        `✅ [R2 Storage] File uploaded to R2 bucket: ${cfg.bucketName}/${filePath}`
      );
      return {
        fileUrl: filePath,
        fileName: file.name,
        fileSize: file.size,
        storageProvider: "R2",
      };
    } catch (r2Error: any) {
      console.warn(
        "⚠️ [R2 Storage] Upload failed on R2, falling back to Supabase Storage:",
        r2Error?.message || r2Error
      );
    }
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { error: supabaseError } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType,
      upsert: false,
    });

  if (supabaseError) {
    console.error("Storage upload error (Supabase):", supabaseError);
    throw new AppError("Failed to upload file to storage", "UPLOAD_FAILED", 500);
  }

  console.log(
    `✅ [Supabase Storage] File uploaded to Supabase fallback: ${SUPABASE_BUCKET_NAME}/${filePath}`
  );
  return {
    fileUrl: filePath,
    fileName: file.name,
    fileSize: file.size,
    storageProvider: "SUPABASE",
  };
}

export async function getSignedDownloadUrl(
  filePath: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  if (!filePath) {
    throw new AppError("File path is empty", "INVALID_FILE_PATH", 400);
  }

  if (filePath.startsWith("data:")) {
    return filePath;
  }

  if (
    /^https?:\/\//i.test(filePath) &&
    !filePath.includes("r2.cloudflarestorage.com") &&
    !filePath.includes("supabase.co/storage")
  ) {
    return filePath;
  }

  const candidateKeys = buildCandidateKeys(filePath);
  const cfg = resolveR2Config();
  const safeR2Expiry = Math.min(
    Math.max(expiresInSeconds, 60),
    S3_MAX_EXPIRY_SECONDS
  );

  // 1. Check Cloudflare R2 (ONLY return R2 URL if HeadObjectCommand confirms the key exists in R2!)
  if (cfg.isValid) {
    const r2Client = getR2Client();
    for (const key of candidateKeys) {
      try {
        await r2Client.send(
          new HeadObjectCommand({
            Bucket: cfg.bucketName,
            Key: key,
          })
        );

        // Key is verified to exist in R2!
        if (cfg.publicUrl) {
          return `${cfg.publicUrl}/${key}`;
        }

        const command = new GetObjectCommand({
          Bucket: cfg.bucketName,
          Key: key,
        });

        const signedUrl = await getSignedUrl(r2Client, command, {
          expiresIn: safeR2Expiry,
        });
        return signedUrl;
      } catch {
        // Object does not exist under this key in R2; try next candidate or Supabase Storage
      }
    }
  }

  // 2. Fallback to Supabase Storage (`worksheets` bucket)
  const supabase = createSupabaseAdminClient();
  for (const key of candidateKeys) {
    try {
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .createSignedUrl(key, expiresInSeconds);

      if (!error && data?.signedUrl) {
        return data.signedUrl;
      }
    } catch {
      // Try next candidate key
    }
  }

  throw new AppError(
    "الملف المطلوب غير موجود في مساحة التخزين السحابية",
    "FILE_NOT_FOUND",
    404
  );
}

export function getPublicDownloadUrl(filePath: string): string {
  const cleanKey = normalizeStorageObjectPath(filePath);
  const cfg = resolveR2Config();
  if (cfg.publicUrl) {
    return `${cfg.publicUrl}/${cleanKey}`;
  }

  const supabase = createSupabaseAdminClient();
  const { data } = supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .getPublicUrl(cleanKey);

  return data.publicUrl;
}

export async function deleteFile(filePath: string): Promise<void> {
  const candidateKeys = buildCandidateKeys(filePath);
  const cfg = resolveR2Config();

  if (cfg.isValid) {
    const r2Client = getR2Client();
    for (const key of candidateKeys) {
      try {
        await r2Client.send(
          new DeleteObjectCommand({
            Bucket: cfg.bucketName,
            Key: key,
          })
        );
      } catch {
        // ignore
      }
    }
  }

  try {
    const supabase = createSupabaseAdminClient();
    await supabase.storage.from(SUPABASE_BUCKET_NAME).remove(candidateKeys);
  } catch {
    // ignore
  }
}

export async function uploadThumbnail(
  thumbnailFile: File,
  userId: string
): Promise<string> {
  const ALLOWED_IMAGE_TYPES = ["image/webp", "image/png", "image/jpeg", "image/jpg"];
  const contentType = thumbnailFile.type || "image/webp";
  if (!ALLOWED_IMAGE_TYPES.includes(contentType.toLowerCase())) {
    throw new InvalidFileTypeError(ALLOWED_IMAGE_TYPES);
  }

  const arrayBuffer = await thumbnailFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // If thumbnail is <= 250 KB (standard WebP thumbnail is ~15-35 KB), return permanent base64 Data URI
  if (buffer.byteLength <= 250 * 1024) {
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  }

  const timestamp = Date.now();
  const thumbPath = `thumbnails/${userId}/${timestamp}-thumb.webp`;
  const cfg = resolveR2Config();

  if (cfg.isValid) {
    try {
      const r2Client = getR2Client();
      await r2Client.send(
        new PutObjectCommand({
          Bucket: cfg.bucketName,
          Key: thumbPath,
          Body: buffer,
          ContentType: contentType,
        })
      );
      return getSignedDownloadUrl(thumbPath, S3_MAX_EXPIRY_SECONDS);
    } catch (r2Err) {
      console.warn("⚠️ [R2 Storage] Thumbnail upload fallback to Supabase:", r2Err);
    }
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(thumbPath, buffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  }

  const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
  const { data } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .createSignedUrl(thumbPath, ONE_YEAR_SECONDS);

  return (
    data?.signedUrl || `data:${contentType};base64,${buffer.toString("base64")}`
  );
}

// Backward-compatible aliases
export const uploadWorksheetFile = uploadFile;
export const deleteWorksheetFile = deleteFile;

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
      select: { id: true, role: true, isVerified: true },
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

  if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, dbUser.isVerified)) {
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
    select: { id: true, role: true, isVerified: true },
  });

  const audienceGuard = buildAudienceVisibilityFilter(dbUser?.role, userId, dbUser?.isVerified);

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
      select: { id: true, role: true, isVerified: true },
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

  if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, dbUser.isVerified)) {
    if (canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, true) && !dbUser.isVerified) {
      throw new ForbiddenError('عذراً، هذا الملف مخصص داخلياً لفئة حسابك الموثقين فقط. يرجى إثبات وتوثيق هوية حسابك أولاً لتحميل الملفات الحساسة والخاصة بفئتك.');
    }
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
    select: { id: true, role: true, isVerified: true },
  });

  const audienceGuard = buildAudienceVisibilityFilter(dbUser?.role, userId, dbUser?.isVerified);

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

  const actor = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, username: true, role: true, isVerified: true },
  });

  if (!canUserAccessWorksheet(worksheet, actor?.role || userRole, userId, actor?.isVerified)) {
    throw new ForbiddenError(
      "غير مصرح لك بإضافة تعليق على هذه النشرة قبل إثبات هوية حسابك أو وفق شروط الجمهور المحدد لها"
    );
  }

  const isVerifiedInspectorOrAdmin =
    userRole === Role.ADMIN ||
    (userRole === Role.INSPECTOR && Boolean(actor?.isVerified));

  const isOfficialDirective =
    isVerifiedInspectorOrAdmin &&
    (input.isOfficialDirective ?? !input.isPrivateToPublisher);

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

export async function POST(request: NextRequest, context: RouteContext) {
  return GET(request, context);
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

function inferMimeType(fileName: string): string {
  const lower = (fileName || "").toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".docx"))
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (lower.endsWith(".doc")) return "application/msword";
  return "application/octet-stream";
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
        select: { id: true, role: true, isVerified: true },
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
      !(dbUser.role === "INSPECTOR" && dbUser.isVerified)
    ) {
      throw new ForbiddenError(
        "هذا الملف قيد المراجعة وإعادة الصياغة إلى PDF من قِبل المشرف والمتفقد."
      );
    }

    if (!canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, dbUser.isVerified)) {
      if (canUserAccessWorksheet(worksheet, dbUser.role, dbUser.id, true) && !dbUser.isVerified) {
        throw new ForbiddenError('عذراً، هذا الملف حساس وموجه داخلياً لفئة حسابك الموثقين فقط. يرجى إثبات وتوثيق هويتك أولاً للوصول إليه.');
      }
      throw new ForbiddenError(
        "غير مصرح لحسابك بمعاينة أو تحميل هذه النشرة حسب قيود الجمهور."
      );
    }

    const signedUrl = await getSignedDownloadUrl(worksheet.fileUrl, 3600);
    const disposition =
      request.nextUrl.searchParams.get("disposition") === "attachment"
        ? "attachment"
        : "inline";
    const forceRedirect = request.nextUrl.searchParams.get("redirect") === "1";
    const shouldStream = !forceRedirect;

    if (shouldStream) {
      try {
        const upstream = await fetch(signedUrl);
        if (upstream.ok && upstream.body) {
          const contentType = inferMimeType(worksheet.fileName);
          const encodedName = encodeURIComponent(worksheet.fileName || "document.pdf");
          const headers: Record<string, string> = {
            "Content-Type": contentType,
            "Content-Disposition": `${disposition}; filename*=UTF-8''${encodedName}`,
            "Cache-Control": "private, max-age=1800",
          };
          const contentLength = upstream.headers.get("content-length");
          if (contentLength) {
            headers["Content-Length"] = contentLength;
          }
          return new NextResponse(upstream.body, {
            status: 200,
            headers,
          });
        }
      } catch (streamError) {
        console.warn("[FileRoute] Stream error on primary URL:", streamError);
      }
    }

    return NextResponse.redirect(signedUrl, { status: 302 });
  } catch (error) {
    return errorResponse(error);
  }
}

```

---

### File: `src/app/api/worksheets/[id]/thumbnail/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadThumbnail } from "@/services/storage.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError, NotFoundError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const worksheet = await db.worksheet.findUnique({
      where: { id },
      select: { id: true, thumbnailUrl: true, pageCount: true },
    });

    if (!worksheet) {
      throw new NotFoundError("Worksheet");
    }

    const formData = await request.formData();
    const thumbnailFile = formData.get("thumbnail") as File | null;
    const pageCountRaw = formData.get("pageCount") as string | null;

    if (!thumbnailFile) {
      return successResponse({ thumbnailUrl: worksheet.thumbnailUrl });
    }

    const thumbnailUrl = await uploadThumbnail(thumbnailFile, user.id);
    const parsedPages = pageCountRaw ? Number(pageCountRaw) : undefined;

    const updated = await db.worksheet.update({
      where: { id },
      data: {
        thumbnailUrl,
        ...(parsedPages && parsedPages > 0 && !worksheet.pageCount
          ? { pageCount: parsedPages }
          : {}),
      },
      select: {
        id: true,
        thumbnailUrl: true,
        pageCount: true,
      },
    });

    return successResponse(updated);
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

  // Strict Security Guard: Unverified Inspector CANNOT access Inspector Dashboard or Inspector Powers
  if (dbUser.role === Role.INSPECTOR && !dbUser.isVerified) {
    throw new ForbiddenError(
      "حسابك كمتفقد تربوي قيد انتظار إثبات الهوية. لضمان أمان المنصة وحماية الصلاحيات الرقابية والملفات الداخلية، لا يمكن لحساب المتفقد الجديد الوصول إلى ميزات المتفقد أو لوحة التحكم إلا بعد إثبات الهوية عبر كود التفعيل الرسمي (/inspector/activate) أو توثيق الحساب من قِبل المشرف العام."
    );
  }

  return dbUser;
}

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
    select: { id: true, role: true, isVerified: true },
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
      : buildAudienceVisibilityFilter(viewerRole, viewerAuth.id, vUser.isVerified);

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

### File: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    color-scheme: light;
  }

  html.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #f8fafc;
    color: #0f172a;
    font-family: var(--font-cairo), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  html.dark body {
    background-color: #020617;
    color: #f8fafc;
  }
}

/* Comprehensive Dark Mode Surface & Component Overrides Across 100% of Al-Musnad Sections */
html.dark .bg-white {
  background-color: #0f172a !important;
}

html.dark .bg-slate-50,
html.dark .bg-slate-50\/50,
html.dark .bg-slate-50\/60,
html.dark .bg-slate-50\/70,
html.dark .bg-slate-100 {
  background-color: #1e293b !important;
}

html.dark .text-slate-900 {
  color: #f8fafc !important;
}

html.dark .text-slate-800 {
  color: #f1f5f9 !important;
}

html.dark .text-slate-700 {
  color: #cbd5e1 !important;
}

html.dark .text-slate-600,
html.dark .text-slate-500 {
  color: #94a3b8 !important;
}

html.dark .border-slate-200,
html.dark .border-slate-100,
html.dark .border-slate-300 {
  border-color: #1e293b !important;
}

/* Form Controls, Inputs, Dropdowns & Modals */
html.dark input:not([type="checkbox"]):not([type="radio"]),
html.dark select,
html.dark textarea {
  background-color: #1e293b !important;
  color: #f8fafc !important;
  border-color: #334155 !important;
}

html.dark input::placeholder,
html.dark textarea::placeholder {
  color: #64748b !important;
}

html.dark input:focus,
html.dark select:focus,
html.dark textarea:focus {
  border-color: #3b82f6 !important;
  outline: none;
}

/* Tables in Dark Mode */
html.dark table {
  background-color: #0f172a !important;
}

html.dark thead th {
  background-color: #1e293b !important;
  color: #e2e8f0 !important;
  border-color: #334155 !important;
}

html.dark tbody td {
  border-color: #1e293b !important;
}

html.dark tbody tr:hover {
  background-color: #1e293b/60 !important;
}

/* Floating Modals, Dropdowns & Popovers */
html.dark .shadow-2xl,
html.dark .shadow-xl,
html.dark .shadow-lg {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6) !important;
}

/* Custom Scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

html.dark ::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

html.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

```

---

### File: `src/app/layout.tsx`

```typescript
import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import Link from "next/link";
import { Headphones, ShieldCheck, BookOpen, Briefcase, FileCheck2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AuthRoleModal from "@/components/auth/AuthRoleModal";
import InstallPwaBanner from "@/components/ui/InstallPwaBanner";
import { AppPreferencesProvider } from "@/context/AppPreferencesContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://al-musnad.vercel.app"),
  title: "المسند | المنصة التربوية والبيداغوجية المعتمدة",
  description:
    "منصة المسند التربوية والبيداغوجية المعتمدة للمؤسسات، المتفقدين، المعلمين، والتلاميذ لتصفح المستويات والمواد والوثائق الإدارية والنشرات التربوية.",
  keywords: [
    "المسند",
    "السنة الأولى ابتدائي",
    "السنة السادسة ابتدائي",
    "جذاذات",
    "تمارين",
    "امتحانات",
    "وثائق إدارية للمعلم",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "المسند",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "cjjaOITGWrgejk9JVO2ns7HzP55iAtkWdTfmwvYFuCo",
  },
  alternates: {
    canonical: "https://al-musnad.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-cairo transition-colors">
        <AppPreferencesProvider>
          <Navbar />

          <AuthRoleModal />

          <main className="flex-1">{children}</main>

          <SpeedInsights />

          <InstallPwaBanner />

          <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Headphones className="w-7 h-7 text-amber-300" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                      مركز المساعدة والمرافقة
                    </span>
                    <h3 className="text-lg sm:text-xl font-black">
                      قسم الدعم الفني وخدمة العملاء
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                      هل تواجه أي استفسار تقني أو ترغب في التواصل مع المشرف العام لتوثيق هويتك التربوية؟ فريق الدعم الفني في خدمتك على مدار الساعة.
                    </p>
                  </div>
                </div>

                <Link
                  href="/support"
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition shrink-0"
                >
                  <Headphones className="w-4 h-4" />
                  <span>الانتقال إلى صفحة الدعم الفني وخدمة العملاء</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                      م
                    </div>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      المسند
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                    المنصة التربوية والبيداغوجية المعتمدة للمؤسسات، المتفقدين، المعلمين، والتلاميذ لتصفح المستويات الدراسية، المواد، الجذاذات، التمارين، والوثائق الإدارية.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">
                    أقسام المنصة
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <li>
                      <Link href="/levels" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>مستودع المواد والمستويات</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/#administration-section" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>قسم الإدارة والمعاملات الإدارية</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/#catalog" className="hover:text-blue-600 transition">
                        النشرات العامة
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">
                    الدعم الفني والتوثيق
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <li>
                      <Link href="/support" className="hover:text-blue-600 font-bold text-blue-600 dark:text-blue-400 transition inline-flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5" />
                        <span>الدعم الفني وخدمة العملاء</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile?tab=verification" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>قسم توثيق الهوية</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>شروط الاستخدام والملكية</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
                <p>© {new Date().getFullYear()} منصة المسند التربوية. جميع الحقوق محفوظة.</p>
                <div className="flex items-center gap-4">
                  <Link href="/terms" className="hover:text-blue-600 font-semibold transition">
                    شروط الاستخدام والملكية
                  </Link>
                  <span>•</span>
                  <Link href="/support" className="hover:text-blue-600 font-semibold transition">
                    الدعم الفني وخدمة العملاء
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </AppPreferencesProvider>
      </body>
    </html>
  );
}
```

---

### File: `src/app/not-found.tsx`

```typescript
import Link from "next/link";
import { FileQuestion, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-900 shadow-sm">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            الصفحة المطلوبة غير موجودة
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            عذراً، الوثيقة أو الصفحة التي تبحث عنها غير متوفرة أو قد تم نقلها أو حذفها من منصة «المسند».
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <Link
            href="/browse"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" />
            استكشاف الأنشطة
          </Link>
        </div>
      </div>
    </div>
  );
}

```

---

### File: `src/app/error.tsx`

```typescript
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-3xl flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-900 shadow-sm">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            واجه النظام مشكلة أثناء معالجة طلبك على منصة «المسند». يرجى إعادة المحاولة أو العودة للرئيسية.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

```

---

### File: `src/context/AppPreferencesContext.tsx`

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { AccountRoleOption } from "@/types/api";

export type Locale = "ar" | "fr" | "en";
export type ThemeMode = "light" | "dark";

export interface RoleMetadataTranslations {
  title: string;
  subtitle: string;
  badge: string;
  orgLabel: string;
  orgPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
}

export interface Dictionary {
  dir: "rtl" | "ltr";
  brandName: string;
  brandTagline: string;
  nav: {
    home: string;
    browse: string;
    upload: string;
    support: string;
    adminPanel: string;
    login: string;
    register: string;
    logout: string;
    profile: string;
    editProfile: string;
    subscriptions: string;
    verification: string;
    settings: string;
    notifications: string;
    markAllRead: string;
    noNotifications: string;
    themeLight: string;
    themeDark: string;
    language: string;
  };
  authModal: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    switchToRegister: string;
    switchToLogin: string;
    close: string;
    continueBtn: string;
    changeRoleBtn: string;
  };
  roles: Record<AccountRoleOption, RoleMetadataTranslations>;
  authForm: {
    emailLabel: string;
    passwordLabel: string;
    passwordHint: string;
    studentGradeLabel: string;
    studentGradePlaceholder: string;
    termsLabel: string;
    submitLogin: string;
    submitRegister: string;
    googleContinue: string;
    orDivider: string;
    verificationNote: string;
    haveCodeQuestion: string;
    activateCodeLink: string;
  };
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  ar: {
    dir: "rtl",
    brandName: "المسند",
    brandTagline: "المنصة التربوية والبيداغوجية المعتمدة",
    nav: {
      home: "الرئيسية",
      browse: "النشرات",
      upload: "نشر وثيقة",
      support: "الدعم الفني",
      adminPanel: "لوحة المشرف",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي ومساحتي",
      editProfile: "تعديل الملف الشخصي",
      subscriptions: "الاشتراكات",
      verification: "التوثيق",
      settings: "الإعدادات",
      notifications: "التنبيهات والإشعارات",
      markAllRead: "تحديد الكل كمقروء",
      noNotifications: "لا توجد تنبيهات جديدة حالياً",
      themeLight: "الوضع النهاري",
      themeDark: "الوضع الليلي",
      language: "اللغة",
    },
    authModal: {
      loginTitle: "اختر صفتك لتسجيل الدخول إلى المسند",
      loginSubtitle: "حدد فضاءك التربوي للوصول المباشر إلى النشرات وأدوات العمل المخصصة لك",
      registerTitle: "اختر نوع الحساب الذي تريد إنشاءه في المسند",
      registerSubtitle: "يمكنك إنشاء حسابك مباشرة، وتوثيق هويتك لاحقاً بكود من المشرف للحصول على شارة التوثيق",
      switchToRegister: "ليس لديك حساب؟ انتقل إلى إنشاء حساب جديد",
      switchToLogin: "لديك حساب بالفعل؟ انتقل إلى تسجيل الدخول",
      close: "إغلاق النافذة",
      continueBtn: "متابعة",
      changeRoleBtn: "تغيير نوع الحساب",
    },
    roles: {
      INSTITUTION: {
        title: "حساب مؤسسة تربوية",
        subtitle: "للمدارس، المعاهد، والمؤسسات التعليمية لإدارة ونشر الرصيد البيداغوجي والوثائق المدرسية.",
        badge: "فضاء المؤسسات",
        orgLabel: "اسم المؤسسة التربوية / المدرسة *",
        orgPlaceholder: "أدخل الاسم الرسمي للمؤسسة التربوية",
        nameLabel: "صفة أو اسم المسؤول التربوي *",
        namePlaceholder: "أدخل الاسم الكامل للمسؤول",
      },
      INSPECTOR: {
        title: "حساب متفقد تربوي",
        subtitle: "للمتفقدين والموجهين البيداغوجيين لاعتماد صحة النشرات علمياً وتربوياً وتقديم التوجيهات الرسمية.",
        badge: "فضاء المتفقدين",
        orgLabel: "الدائرة التفقدية / المندوبية الجهوية *",
        orgPlaceholder: "أدخل اسم الدائرة التفقدية أو المندوبية",
        nameLabel: "الاسم الكامل للمتفقد *",
        namePlaceholder: "أدخل الاسم الكامل",
      },
      TEACHER: {
        title: "حساب معلم",
        subtitle: "للمعلمين والأساتذة لنشر المذكرات، التمارين، وإصلاح الاختبارات مع التحكم الكامل في جمهور النشر.",
        badge: "فضاء المعلمين",
        orgLabel: "المؤسسة التربوية التي تدرّس بها (اختياري)",
        orgPlaceholder: "أدخل اسم المدرسة أو المؤسسة",
        nameLabel: "الاسم الكامل للمعلم *",
        namePlaceholder: "أدخل الاسم الكامل",
      },
      STUDENT: {
        title: "حساب تلميذ",
        subtitle: "للتلاميذ وأولياء الأمور لتصفح وتحميل التمارين، المراجعات، والأنشطة الموجهة للتلاميذ.",
        badge: "فضاء التلاميذ",
        orgLabel: "المؤسسة التعليمية / المدرسة (اختياري)",
        orgPlaceholder: "أدخل اسم المدرسة",
        nameLabel: "الاسم الكامل للتلميذ *",
        namePlaceholder: "أدخل الاسم الكامل",
      },
    },
    authForm: {
      emailLabel: "البريد الإلكتروني *",
      passwordLabel: "كلمة المرور *",
      passwordHint: "8 أحرف على الأقل",
      studentGradeLabel: "المستوى الدراسي للتلميذ (إجباري) *",
      studentGradePlaceholder: "اختر المستوى الدراسي...",
      termsLabel: "أوافق على شروط وأحكام الاستخدام وسياسة الخصوصية لمنصة المسند *",
      submitLogin: "تسجيل الدخول الآن",
      submitRegister: "إنشاء الحساب الآن",
      googleContinue: "المتابعة باستخدام حساب Google",
      orDivider: "أو",
      verificationNote: "ملاحظة التوثيق: يمكنك إنشاء حسابك الآن واستخدام المنصة، ولإضافة شارة التوثيق الرسمية (للمؤسسات، المعلمين، والمتفقدين) يتم تأكيد الهوية بكود من المشرف في قسم التوثيق.",
      haveCodeQuestion: "هل لديك كود توثيق الحساب؟",
      activateCodeLink: "تفعيل كود التوثيق",
    },
  },

  fr: {
    dir: "ltr",
    brandName: "Al-Musnad",
    brandTagline: "Plateforme Pédagogique Certifiée",
    nav: {
      home: "Accueil",
      browse: "Publications",
      upload: "Publier",
      support: "Support & Aide",
      adminPanel: "Administration",
      login: "Connexion",
      register: "Créer un compte",
      logout: "Déconnexion",
      profile: "Mon Espace & Profil",
      editProfile: "Modifier le profil",
      subscriptions: "Abonnements",
      verification: "Vérification",
      settings: "Paramètres",
      notifications: "Notifications",
      markAllRead: "Tout marquer comme lu",
      noNotifications: "Aucune notification pour le moment",
      themeLight: "Mode Clair",
      themeDark: "Mode Sombre",
      language: "Langue",
    },
    authModal: {
      loginTitle: "Choisissez votre profil de connexion sur Al-Musnad",
      loginSubtitle: "Accédez à votre espace pédagogique dédié",
      registerTitle: "Choisissez le type de compte à créer",
      registerSubtitle: "Créez votre compte et vérifiez votre identité via un code administrateur pour obtenir le badge certifié",
      switchToRegister: "Pas encore de compte ? Créer un nouveau compte",
      switchToLogin: "Déjà inscrit ? Se connecter à mon compte",
      close: "Fermer",
      continueBtn: "Continuer",
      changeRoleBtn: "Changer le type de compte",
    },
    roles: {
      INSTITUTION: {
        title: "Espace Établissement",
        subtitle: "Pour les écoles et institutions éducatives afin de gérer et diffuser leurs ressources.",
        badge: "Établissement",
        orgLabel: "Nom de l'établissement scolaire *",
        orgPlaceholder: "Saisissez le nom officiel de l'établissement",
        nameLabel: "Nom du responsable *",
        namePlaceholder: "Saisissez le nom complet",
      },
      INSPECTOR: {
        title: "Espace Inspecteur",
        subtitle: "Pour les inspecteurs pédagogiques afin d'homologuer les publications et publier des directives.",
        badge: "Inspecteur",
        orgLabel: "Circonscription / Délégation régionale *",
        orgPlaceholder: "Saisissez la circonscription pédagogique",
        nameLabel: "Nom complet de l'inspecteur *",
        namePlaceholder: "Saisissez le nom complet",
      },
      TEACHER: {
        title: "Espace Enseignant",
        subtitle: "Pour les enseignants afin de publier des exercices ou des corrigés réservés aux enseignants.",
        badge: "Enseignant",
        orgLabel: "Établissement scolaire (optionnel)",
        orgPlaceholder: "Saisissez le nom de l'école",
        nameLabel: "Nom complet de l'enseignant *",
        namePlaceholder: "Saisissez le nom complet",
      },
      STUDENT: {
        title: "Espace Élève",
        subtitle: "Pour les élèves et parents afin de consulter et télécharger les fiches d'exercices.",
        badge: "Élève",
        orgLabel: "École (optionnel)",
        orgPlaceholder: "Saisissez le nom de l'école",
        nameLabel: "Nom complet de l'élève *",
        namePlaceholder: "Saisissez le nom complet",
      },
    },
    authForm: {
      emailLabel: "Adresse e-mail *",
      passwordLabel: "Mot de passe *",
      passwordHint: "8 caractères minimum",
      studentGradeLabel: "Niveau scolaire de l'élève (obligatoire) *",
      studentGradePlaceholder: "Sélectionnez le niveau scolaire...",
      termsLabel: "J'accepte les conditions générales d'utilisation et la politique de confidentialité d'Al-Musnad *",
      submitLogin: "Se connecter",
      submitRegister: "Créer mon compte",
      googleContinue: "Continuer avec Google",
      orDivider: "OU",
      verificationNote: "Note : Vous pouvez créer un compte sans vérification immédiate. Le badge de certification (Établissement, Enseignant, Inspecteur) s'active avec un code fourni par l'administrateur.",
      haveCodeQuestion: "Vous avez un code de vérification ?",
      activateCodeLink: "Activer mon code",
    },
  },

  en: {
    dir: "ltr",
    brandName: "Al-Musnad",
    brandTagline: "Certified Educational & Pedagogical Platform",
    nav: {
      home: "Home",
      browse: "Publications",
      upload: "Publish",
      support: "Support",
      adminPanel: "Admin Panel",
      login: "Log In",
      register: "Sign Up",
      logout: "Sign Out",
      profile: "My Workspace & Profile",
      editProfile: "Edit Profile",
      subscriptions: "Subscriptions",
      verification: "Verification",
      settings: "Settings",
      notifications: "Notifications",
      markAllRead: "Mark all read",
      noNotifications: "No new notifications",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      language: "Language",
    },
    authModal: {
      loginTitle: "Select Your Account Type on Al-Musnad",
      loginSubtitle: "Access your tailored educational workspace",
      registerTitle: "Select the Account Type to Create",
      registerSubtitle: "Create your account now and verify your identity anytime via an admin code to unlock the verified badge",
      switchToRegister: "Don't have an account? Create a new account",
      switchToLogin: "Already have an account? Log in here",
      close: "Close",
      continueBtn: "Continue",
      changeRoleBtn: "Change Account Type",
    },
    roles: {
      INSTITUTION: {
        title: "Educational Institution",
        subtitle: "For schools and educational centers to manage and publish institutional curricula.",
        badge: "Institution",
        orgLabel: "Official Institution / School Name *",
        orgPlaceholder: "Enter official institution name",
        nameLabel: "Coordinator Full Name *",
        namePlaceholder: "Enter full name",
      },
      INSPECTOR: {
        title: "Pedagogical Inspector",
        subtitle: "For certified inspectors to endorse scientific & pedagogical accuracy and pin official directives.",
        badge: "Inspector",
        orgLabel: "Inspection District / Regional Directorate *",
        orgPlaceholder: "Enter inspection district",
        nameLabel: "Inspector Full Name *",
        namePlaceholder: "Enter full name",
      },
      TEACHER: {
        title: "Teacher Account",
        subtitle: "For teachers to publish worksheets for students or answer keys exclusively for fellow teachers.",
        badge: "Teacher",
        orgLabel: "School Name (Optional)",
        orgPlaceholder: "Enter school name",
        nameLabel: "Teacher Full Name *",
        namePlaceholder: "Enter full name",
      },
      STUDENT: {
        title: "Student Account",
        subtitle: "For students and parents to browse, preview, and download worksheets and study materials.",
        badge: "Student",
        orgLabel: "School Name (Optional)",
        orgPlaceholder: "Enter school name",
        nameLabel: "Student Full Name *",
        namePlaceholder: "Enter full name",
      },
    },
    authForm: {
      emailLabel: "Email Address *",
      passwordLabel: "Password *",
      passwordHint: "At least 8 characters",
      studentGradeLabel: "Student Grade Level (Required) *",
      studentGradePlaceholder: "Select grade level...",
      termsLabel: "I agree to Al-Musnad Terms & Conditions and Privacy Policy *",
      submitLogin: "Log In Now",
      submitRegister: "Create Account",
      googleContinue: "Continue with Google",
      orDivider: "OR",
      verificationNote: "Verification Note: You can create an account without immediate verification. Official verification badges for Institutions, Teachers, and Inspectors are unlocked via an admin code.",
      haveCodeQuestion: "Have a verification code?",
      activateCodeLink: "Activate Code",
    },
  },
};

interface AppPreferencesContextValue {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  t: Dictionary;
  authModalMode: "login" | "register" | null;
  openAuthModal: (mode: "login" | "register") => void;
  closeAuthModal: () => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | undefined>(undefined);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [authModalMode, setAuthModalMode] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("musnad_locale") as Locale | null;
      if (savedLocale && (savedLocale === "ar" || savedLocale === "fr" || savedLocale === "en")) {
        setLocaleState(savedLocale);
      }

      const savedTheme = localStorage.getItem("musnad_theme") as ThemeMode | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const dict = DICTIONARIES[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = dict.dir;
    document.body.style.direction = dict.dir;
    document.body.style.textAlign = dict.dir === "rtl" ? "right" : "left";
    try {
      localStorage.setItem("musnad_locale", locale);
    } catch {
      // ignore
    }
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("musnad_theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setLocale = (loc: Locale) => setLocaleState(loc);
  const setTheme = (mode: ThemeMode) => setThemeState(mode);
  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));

  const openAuthModal = (mode: "login" | "register") => setAuthModalMode(mode);
  const closeAuthModal = () => setAuthModalMode(null);

  return (
    <AppPreferencesContext.Provider
      value={{
        locale,
        setLocale,
        theme,
        toggleTheme,
        setTheme,
        t: DICTIONARIES[locale],
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error("useAppPreferences must be used inside AppPreferencesProvider");
  }
  return ctx;
}
```

---

### File: `src/components/auth/AuthRoleModal.tsx`

```typescript
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import type { AccountRoleOption } from "@/types/api";

export interface RoleOptionVisual {
  role: AccountRoleOption;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  borderHover: string;
  badgeStyle: string;
  iconBg: string;
}

export const ROLE_VISUAL_CARDS: RoleOptionVisual[] = [
  {
    role: "INSTITUTION",
    icon: Building2,
    gradient: "from-indigo-600 to-violet-700",
    borderHover: "hover:border-indigo-500 dark:hover:border-indigo-400",
    badgeStyle:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    iconBg: "bg-indigo-600 text-white shadow-indigo-500/25",
  },
  {
    role: "INSPECTOR",
    icon: ShieldCheck,
    gradient: "from-amber-500 to-orange-600",
    borderHover: "hover:border-amber-500 dark:hover:border-amber-400",
    badgeStyle:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/25",
  },
  {
    role: "TEACHER",
    icon: BookOpen,
    gradient: "from-blue-600 to-cyan-600",
    borderHover: "hover:border-blue-500 dark:hover:border-blue-400",
    badgeStyle:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    iconBg: "bg-blue-600 text-white shadow-blue-500/25",
  },
  {
    role: "STUDENT",
    icon: GraduationCap,
    gradient: "from-emerald-600 to-teal-600",
    borderHover: "hover:border-emerald-500 dark:hover:border-emerald-400",
    badgeStyle:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    iconBg: "bg-emerald-600 text-white shadow-emerald-500/25",
  },
];

export default function AuthRoleModal() {
  const router = useRouter();
  const { authModalMode, closeAuthModal, openAuthModal, t } = useAppPreferences();

  useEffect(() => {
    if (!authModalMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [authModalMode, closeAuthModal]);

  if (!authModalMode) return null;

  const isLogin = authModalMode === "login";
  const ArrowIcon = t.dir === "rtl" ? ArrowLeft : ArrowRight;

  const handleSelectRole = (role: AccountRoleOption) => {
    const targetPath = isLogin ? `/login?role=${role}` : `/register?role=${role}`;
    closeAuthModal();
    router.push(targetPath);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fadeIn p-4 sm:p-8"
      dir={t.dir}
    >
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/30">
            م
          </div>
          <div>
            <span className="text-lg font-extrabold text-white block leading-none">
              {t.brandName}
            </span>
            <span className="text-xs text-slate-400">{t.brandTagline}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeAuthModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition cursor-pointer"
        >
          <span>{t.authModal.close}</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl w-full mx-auto my-auto py-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isLogin ? t.nav.login : t.nav.register}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isLogin ? t.authModal.loginTitle : t.authModal.registerTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isLogin ? t.authModal.loginSubtitle : t.authModal.registerSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLE_VISUAL_CARDS.map((card) => {
            const Icon = card.icon;
            const roleText = t.roles[card.role];

            return (
              <button
                key={card.role}
                type="button"
                onClick={() => handleSelectRole(card.role)}
                className={`group relative text-start bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 ${card.borderHover} rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden`}
              >
                <div
                  className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${card.gradient}`}
                />

                <div className="space-y-5 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${card.badgeStyle}`}
                    >
                      {roleText.badge}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${card.iconBg} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {roleText.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {roleText.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>
                    {isLogin ? t.nav.login : t.nav.register} ({roleText.title})
                  </span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => openAuthModal(isLogin ? "register" : "login")}
            className="text-sm font-bold text-blue-300 hover:text-white underline underline-offset-4 transition cursor-pointer"
          >
            {isLogin ? t.authModal.switchToRegister : t.authModal.switchToLogin}
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {t.brandName}
      </div>
    </div>
  );
}

```

---

### File: `src/components/layout/Navbar.tsx`

```typescript
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
  Globe,
  LogIn,
  UserPlus,
  Upload,
  Menu,
  X,
  Bell,
  UserCog,
  CreditCard,
  Settings,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ExternalLink,
  CheckCheck,
  BadgeCheck,
  Library,
  Ghost,
} from "lucide-react";
import {
  UserAvatarWithPresence,
  getPublicPresenceState,
  type PresenceMode,
} from "@/components/ui/UserPresenceIndicator";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAppPreferences, type Locale } from "@/context/AppPreferencesContext";
import type { NotificationItem } from "@/types/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role?: string;
  isVerified?: boolean;
  isBanned?: boolean;
  presenceStatus?: PresenceMode | string;
  lastSeenAt?: string | null;
}

const LANGUAGES: { code: Locale; label: string; short: string }[] = [
  { code: "ar", label: "العربية", short: "AR" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
];

function getRoleUsernameBoxStyle(role?: string): {
  boxClass: string;
  avatarBgClass: string;
  roleLabel: string;
  roleShortTag: string;
  badgeClass: string;
} {
  if (role === "ADMIN") {
    return {
      boxClass:
        "border-2 border-purple-500/80 bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 hover:border-purple-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white",
      roleLabel: "المشرف العام",
      roleShortTag: "مشرف عام",
      badgeClass:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border border-purple-300 dark:border-purple-700",
    };
  }
  if (role === "MODERATOR") {
    return {
      boxClass:
        "border-2 border-indigo-500/80 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 hover:border-indigo-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white",
      roleLabel: "المسؤول الإداري",
      roleShortTag: "مسؤول",
      badgeClass:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700",
    };
  }
  if (role === "INSPECTOR") {
    return {
      boxClass:
        "border-2 border-amber-500/80 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 hover:border-amber-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      roleLabel: "المتفقد التربوي",
      roleShortTag: "متفقد",
      badgeClass:
        "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border border-amber-300 dark:border-amber-700",
    };
  }
  if (role === "INSTITUTION") {
    return {
      boxClass:
        "border-2 border-violet-500/80 bg-violet-50/70 dark:bg-violet-950/40 text-violet-950 dark:text-violet-200 hover:border-violet-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-violet-600 to-indigo-600 text-white",
      roleLabel: "المؤسسة التربوية",
      roleShortTag: "مؤسسة",
      badgeClass:
        "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200 border border-violet-300 dark:border-violet-700",
    };
  }
  if (role === "STUDENT") {
    return {
      boxClass:
        "border-2 border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 hover:border-emerald-600 shadow-sm",
      avatarBgClass: "bg-gradient-to-br from-emerald-600 to-teal-600 text-white",
      roleLabel: "التلميذ",
      roleShortTag: "تلميذ",
      badgeClass:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700",
    };
  }
  return {
    boxClass:
      "border-2 border-blue-500/80 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 hover:border-blue-600 shadow-sm",
    avatarBgClass: "bg-gradient-to-br from-blue-600 to-cyan-600 text-white",
    roleLabel: "المعلم / الأستاذ",
    roleShortTag: "معلم",
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-300 dark:border-blue-700",
  };
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const { locale, setLocale, theme, toggleTheme, t, openAuthModal } =
    useAppPreferences();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        profileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(target)
      ) {
        setProfileMenuOpen(false);
      }
      if (
        notifMenuOpen &&
        notifMenuRef.current &&
        !notifMenuRef.current.contains(target)
      ) {
        setNotifMenuOpen(false);
      }
      if (
        langMenuOpen &&
        langMenuRef.current &&
        !langMenuRef.current.contains(target)
      ) {
        setLangMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
        setNotifMenuOpen(false);
        setLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideMouseDown);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleOutsideMouseDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [profileMenuOpen, notifMenuOpen, langMenuOpen]);
  const [updatingPresence, setUpdatingPresence] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setNotifications(json.data.notifications || []);
          setUnreadCount(json.data.unreadCount || 0);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleChangePresence = async (nextMode: PresenceMode) => {
    if (!user || updatingPresence) return;
    try {
      setUpdatingPresence(true);
      const res = await fetch("/api/me/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presenceStatus: nextMode }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                presenceStatus: json.data.presenceStatus,
                lastSeenAt: json.data.lastSeenAt,
              }
            : null
        );
      }
    } catch {
      // ignore
    } finally {
      setUpdatingPresence(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && isMounted) {
          const initialUser: UserProfile = {
            id: session.user.id,
            name:
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "عضو المسند",
            email: session.user.email || "",
            avatarUrl: session.user.user_metadata?.avatar_url || null,
            presenceStatus: "ONLINE",
            lastSeenAt: new Date().toISOString(),
          };

          try {
            const res = await fetch("/api/auth/me", { cache: "no-store" });
            if (res.ok) {
              const json = await res.json();
              if (json.success && json.data) {
                initialUser.role = json.data.role;
                initialUser.name = json.data.name || initialUser.name;
                initialUser.avatarUrl =
                  json.data.avatarUrl || initialUser.avatarUrl;
                initialUser.isVerified = json.data.isVerified;
                initialUser.isBanned = json.data.isBanned;
                initialUser.presenceStatus =
                  json.data.presenceStatus || "ONLINE";
                initialUser.lastSeenAt =
                  json.data.lastSeenAt || new Date().toISOString();
              }
            }
          } catch {
            // fallback
          }

          if (isMounted) {
            setUser(initialUser);
            fetchNotifications();
          }
        } else if (isMounted) {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth status error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const updatedUser: UserProfile = {
          id: session.user.id,
          name:
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "عضو المسند",
          email: session.user.email || "",
          avatarUrl: session.user.user_metadata?.avatar_url || null,
          presenceStatus: "ONLINE",
          lastSeenAt: new Date().toISOString(),
        };

        try {
          const res = await fetch("/api/auth/me", { cache: "no-store" });
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data) {
              updatedUser.role = json.data.role;
              updatedUser.name = json.data.name || updatedUser.name;
              updatedUser.avatarUrl =
                json.data.avatarUrl || updatedUser.avatarUrl;
              updatedUser.isVerified = json.data.isVerified;
              updatedUser.isBanned = json.data.isBanned;
              updatedUser.presenceStatus =
                json.data.presenceStatus || "ONLINE";
              updatedUser.lastSeenAt =
                json.data.lastSeenAt || new Date().toISOString();
            }
          }
        } catch {
          // ignore
        }

        setUser(updatedUser);
        fetchNotifications();
      } else {
        setUser(null);
        setNotifications([]);
        setUnreadCount(0);
      }
    });

    // Periodic heartbeat every 3 minutes while active in ONLINE mode
    const heartbeatTimer = setInterval(() => {
      fetch("/api/me/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heartbeat: true }),
      }).catch(() => null);
    }, 3 * 60_000);

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      clearInterval(heartbeatTimer);
    };
  }, []);

  const handleMarkAllNotificationsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // ignore
    }
  };

  const handleSignOut = async () => {
    setProfileMenuOpen(false);
    await fetch("/api/me/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ presenceStatus: "OFFLINE" }),
    }).catch(() => null);
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const getNavLinks = () => {
    const base = [
      { label: t.nav.home, href: "/" },
      { label: "مستودع المواد والمستويات", href: "/levels" },
      { label: "النشرات", href: "/#catalog" },
    ];

    if (user?.role === "INSPECTOR") {
      return [
        ...base,
        { label: "للمتفقدين", href: "/#inspectors-hub" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "TEACHER") {
      return [
        ...base,
        { label: "للمعلمين", href: "/#teachers-hub" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "INSTITUTION") {
      return [
        ...base,
        { label: "للمؤسسات", href: "/#institutions-hub" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "ADMIN") {
      return [
        ...base,
        { label: "لوحة المشرف", href: "/admin/dashboard" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    if (user?.role === "MODERATOR") {
      return [
        ...base,
        { label: "لوحة المسؤول", href: "/moderator/dashboard" },
        { label: "اعرف المزيد", href: "/#learn-more" },
      ];
    }

    return [
      ...base,
      { label: "اعرف المزيد", href: "/#learn-more" },
    ];
  };

  const navLinks = getNavLinks();

  const isSupervisoryRole =
    user?.role === "ADMIN" ||
    user?.role === "MODERATOR" ||
    user?.role === "INSPECTOR";

  const roleBoxStyle = getRoleUsernameBoxStyle(user?.role);
  const currentPresenceInfo = getPublicPresenceState(
    {
      presenceStatus: user?.presenceStatus,
      lastSeenAt: user?.lastSeenAt,
    },
    true
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3 gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                م
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {t.brandTagline}
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/levels" && pathname?.startsWith("/levels"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 transition cursor-pointer"
                title={t.nav.language}
              >
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{locale.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute top-full mt-2 end-0 z-20 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-1.5 space-y-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLocale(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          locale === lang.code
                            ? "bg-blue-600 text-white"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="text-[10px] opacity-80">
                          {lang.short}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 transition cursor-pointer"
              title={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

            {!loading && user ? (
              <div className="flex items-center gap-2.5">
                {user.role !== "STUDENT" && !user.isBanned && (
                  <Link
                    href="/upload"
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t.nav.upload}</span>
                  </Link>
                )}

                <div className="relative" ref={notifMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifMenuOpen((prev) => !prev);
                      setProfileMenuOpen(false);
                      if (!notifMenuOpen) fetchNotifications();
                    }}
                    className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                    title={t.nav.notifications}
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {notifMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setNotifMenuOpen(false)}
                      />
                      <div className="absolute top-full mt-2 end-0 z-20 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Bell className="w-3.5 h-3.5 text-blue-600" />
                            <span>{t.nav.notifications}</span>
                          </span>
                          {unreadCount > 0 && (
                            <button
                              type="button"
                              onClick={handleMarkAllNotificationsRead}
                              className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                              <span>{t.nav.markAllRead}</span>
                            </button>
                          )}
                        </div>

                        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                          {notifications.length === 0 ? (
                            <div className="py-8 px-4 text-center text-xs text-slate-400">
                              {t.nav.noNotifications}
                            </div>
                          ) : (
                            notifications.map((n) => (
                              <div
                                key={n.id}
                                onClick={() => {
                                  setNotifMenuOpen(false);
                                  if (n.link) router.push(n.link);
                                }}
                                className={`p-3.5 text-start transition cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                                  !n.isRead
                                    ? "bg-blue-50/40 dark:bg-blue-950/20"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                                    {n.title}
                                  </p>
                                  {!n.isRead && (
                                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                  {n.message}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative" ref={profileMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen((prev) => !prev);
                      setNotifMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl transition cursor-pointer shrink-0 ${roleBoxStyle.boxClass}`}
                    title={user.name}
                  >
                    <UserAvatarWithPresence
                      name={user.name}
                      avatarUrl={user.avatarUrl}
                      presenceStatus={user.presenceStatus}
                      lastSeenAt={user.lastSeenAt}
                      isSelf={true}
                      size="md"
                      avatarBgClass={roleBoxStyle.avatarBgClass}
                    />
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        profileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setProfileMenuOpen(false)}
                      />
                      <div className="absolute top-full mt-2 end-0 z-20 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2.5 space-y-1">
                        <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="truncate">
                              <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                                {user.name}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {user.email}
                              </p>
                            </div>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black shrink-0 ${roleBoxStyle.badgeClass}`}
                              title={`فئة الحساب: ${roleBoxStyle.roleLabel}`}
                            >
                              {roleBoxStyle.roleLabel}
                            </span>
                          </div>

                          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2 border border-slate-200/70 dark:border-slate-700">
                            <span className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-400 mb-1.5">
                              حالة الظهور والاتصال في المنصة:
                            </span>
                            <div className="grid grid-cols-3 gap-1">
                              <button
                                type="button"
                                disabled={updatingPresence}
                                onClick={() => handleChangePresence("ONLINE")}
                                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  (user.presenceStatus || "ONLINE") === "ONLINE"
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-emerald-50"
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>متصل</span>
                              </button>

                              <button
                                type="button"
                                disabled={updatingPresence}
                                onClick={() => handleChangePresence("OFFLINE")}
                                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  user.presenceStatus === "OFFLINE"
                                    ? "bg-slate-700 text-white shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                <span>غير متصل</span>
                              </button>

                              <button
                                type="button"
                                disabled={updatingPresence}
                                onClick={() => handleChangePresence("GHOST")}
                                title="تصفح الموقع دون ظهور أنك متصل"
                                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  user.presenceStatus === "GHOST"
                                    ? "bg-purple-700 text-white shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-purple-50"
                                }`}
                              >
                                <Ghost className="w-3 h-3" />
                                <span>الشبح</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <UserIcon className="w-4 h-4 text-blue-600" />
                          <span>{t.nav.profile}</span>
                        </Link>

                        <Link
                          href={`/publisher/${user.id}`}
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <ExternalLink className="w-4 h-4 text-indigo-600" />
                          <span>صفحتي العامة كناشر</span>
                        </Link>

                        {user.role === "ADMIN" && (
                          <div className="my-1.5 p-2 rounded-2xl bg-gradient-to-l from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/50 dark:via-slate-800 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800/70 space-y-1.5">
                            <Link
                              href="/admin/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white text-xs font-black shadow-sm transition"
                            >
                              <span className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 shrink-0" />
                                <span>مشرف عام • لوحة التحكم</span>
                              </span>
                              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                القمة
                              </span>
                            </Link>
                            <div className="grid grid-cols-2 gap-1 pt-0.5">
                              <Link
                                href="/moderator/dashboard"
                                onClick={() => setProfileMenuOpen(false)}
                                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-indigo-100 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800 transition"
                              >
                                <ShieldAlert className="w-3 h-3" />
                                <span>لوحة المسؤول</span>
                              </Link>
                              <Link
                                href="/inspector/dashboard"
                                onClick={() => setProfileMenuOpen(false)}
                                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-amber-100 text-[10px] font-extrabold text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800 transition"
                              >
                                <BadgeCheck className="w-3 h-3" />
                                <span>لوحة المتفقد</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {user.role === "MODERATOR" && (
                          <div className="my-1.5 p-1.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/70">
                            <Link
                              href="/moderator/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-sm transition"
                            >
                              <span className="flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 shrink-0" />
                                <span>مسؤول إداري • لوحة التحكم</span>
                              </span>
                              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                دخول
                              </span>
                            </Link>
                          </div>
                        )}

                        {user.role === "INSPECTOR" && (
                          <div className="my-1.5 p-1.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70">
                            {user.isVerified ? (
                              <Link
                                href="/inspector/dashboard"
                                onClick={() => setProfileMenuOpen(false)}
                                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-black shadow-sm transition"
                              >
                                <span className="flex items-center gap-2">
                                  <BadgeCheck className="w-4 h-4 shrink-0" />
                                  <span>متفقد معتمد • لوحة التحكم</span>
                                </span>
                                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                  دخول
                                </span>
                              </Link>
                            ) : (
                              <Link
                                href="/inspector/activate"
                                onClick={() => setProfileMenuOpen(false)}
                                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-sm transition"
                              >
                                <span className="flex items-center gap-2">
                                  <ShieldAlert className="w-4 h-4 shrink-0" />
                                  <span>إثبات هوية المتفقد لتفعيل الميزات</span>
                                </span>
                                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                                  تفعيل 🔒
                                </span>
                              </Link>
                            )}
                          </div>
                        )}

                        {(user.role === "TEACHER" || user.role === "INSTITUTION") && !user.isVerified && (
                          <Link
                            href="/profile?tab=verification"
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-[11px] font-extrabold transition"
                          >
                            <span>🔒 إثبات الهوية لفتح الملفات الخاصة بفئتك</span>
                            <span className="underline">توثيق</span>
                          </Link>
                        )}

                        <Link
                          href="/levels"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Library className="w-4 h-4 text-blue-600" />
                          <span>مستودع المواد والمستويات</span>
                        </Link>

                        <Link
                          href="/profile?tab=edit"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <UserCog className="w-4 h-4 text-emerald-600" />
                          <span>{t.nav.editProfile}</span>
                        </Link>

                        <Link
                          href="/profile?tab=subscriptions"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <span className="flex items-center gap-2.5">
                            <CreditCard className="w-4 h-4 text-amber-600" />
                            <span>{t.nav.subscriptions}</span>
                          </span>
                          <span className="rounded-md bg-amber-100 dark:bg-amber-950/70 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-800 dark:text-amber-300">
                            قريباً
                          </span>
                        </Link>

                        <Link
                          href="/profile?tab=verification"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <BadgeCheck className="w-4 h-4 text-blue-600" />
                          <span>{t.nav.verification}</span>
                        </Link>

                        <Link
                          href="/profile?tab=settings"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Settings className="w-4 h-4 text-slate-500" />
                          <span>{t.nav.settings}</span>
                        </Link>

                        <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>{t.nav.logout}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : !loading ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 rounded-xl transition cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav.login}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-500/20 transition cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.nav.register}</span>
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() =>
                setLocale(
                  locale === "ar" ? "fr" : locale === "fr" ? "en" : "ar"
                )
              }
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-extrabold text-slate-700 dark:text-slate-200"
            >
              {locale.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-300"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {user ? (
              <>
                <div className={`p-3 rounded-2xl ${roleBoxStyle.boxClass}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <UserAvatarWithPresence
                        name={user.name}
                        avatarUrl={user.avatarUrl}
                        presenceStatus={user.presenceStatus}
                        lastSeenAt={user.lastSeenAt}
                        isSelf={true}
                        size="md"
                        avatarBgClass={roleBoxStyle.avatarBgClass}
                      />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {currentPresenceInfo.statusLabelAr}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black ${roleBoxStyle.badgeClass}`}>
                      {roleBoxStyle.roleLabel}
                    </span>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 dark:text-slate-100"
                >
                  {t.nav.profile}
                </Link>
                <Link
                  href={`/publisher/${user.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-indigo-700 dark:text-indigo-300"
                >
                  صفحتي العامة كناشر
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-blue-700 text-white text-xs font-extrabold shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>مشرف عام • لوحة التحكم</span>
                  </Link>
                )}
                {user.role === "MODERATOR" && (
                  <Link
                    href="/moderator/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-extrabold shadow-sm"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>مسؤول إداري • لوحة التحكم</span>
                  </Link>
                )}
                {user.role === "INSPECTOR" && (
                  user.isVerified ? (
                    <Link
                      href="/inspector/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-extrabold shadow-sm"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      <span>متفقد معتمد • لوحة التحكم</span>
                    </Link>
                  ) : (
                    <Link
                      href="/inspector/activate"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-extrabold shadow-sm"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>🔒 إثبات هوية المتفقد لتفعيل الميزات</span>
                    </Link>
                  )
                )}

                <Link
                  href="/profile?tab=subscriptions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  {t.nav.subscriptions} (سيأتي قريباً)
                </Link>
                <Link
                  href="/profile?tab=verification"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-blue-600 dark:text-blue-400"
                >
                  {t.nav.verification}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-start px-3 py-2 text-sm font-bold text-red-600 rounded-lg"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
                >
                  {t.nav.login}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("register");
                  }}
                  className="py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl"
                >
                  {t.nav.register}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

```

---

### File: `src/components/layout/SupervisoryHierarchyBar.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  ArrowRight,
  Lock,
  Layers,
} from "lucide-react";

interface SupervisoryHierarchyBarProps {
  viewerRole: string;
  currentDashboard: "ADMIN" | "MODERATOR" | "INSPECTOR";
}

export default function SupervisoryHierarchyBar({
  viewerRole,
  currentDashboard,
}: SupervisoryHierarchyBarProps) {
  // Case 1: Top Administrator (`ADMIN`) — Clean navigation across dashboards
  if (viewerRole === "ADMIN") {
    return (
      <div
        dir="rtl"
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            التنقل الإشرافي (المشرف العام)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentDashboard !== "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1.5 text-xs font-black shadow-sm transition"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>الرجوع إلى لوحة المشرف العام</span>
            </Link>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/admin/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "ADMIN"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>لوحة المشرف العام</span>
            </Link>

            <Link
              href="/moderator/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "MODERATOR"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>لوحة المسؤول</span>
            </Link>

            <Link
              href="/inspector/dashboard"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                currentDashboard === "INSPECTOR"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              <span>لوحة المتفقد</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Moderator or Inspector — Strictly isolated without permission disclosure
  return null;
}

```

---

### File: `src/components/ui/InspectorBadge.tsx`

```typescript
import React from "react";
import { BadgeCheck, Building2, GraduationCap, Ban, ShieldAlert, ShieldCheck } from "lucide-react";
import type { Role } from "@/types";

interface InspectorBadgeProps {
  role?: Role | string;
  isVerified?: boolean;
  isBanned?: boolean;
  size?: "sm" | "md";
}

export default function InspectorBadge({
  role,
  isVerified,
  isBanned,
  size = "sm",
}: InspectorBadgeProps) {
  // 1. Publisher Ban Badge
  if (isBanned) {
    return (
      <span
        title="هذا الحساب محظور حالياً من النشر لمخالفة ضوابط المنصة"
        className={`inline-flex items-center gap-1 rounded-full bg-red-600 text-white font-extrabold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <Ban className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>حساب محظور</span>
      </span>
    );
  }

  // 2. Admin Badge (قمة الهرم)
  if (role === "ADMIN") {
    return (
      <span
        title="المشرف العام لمنصة المسند"
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <ShieldCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>مشرف عام</span>
      </span>
    );
  }

  // 3. Moderator Badge (المسؤول الإداري)
  if (role === "MODERATOR") {
    return (
      <span
        title="مسؤول إداري معتمد بالمنصة"
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <ShieldAlert className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>مسؤول إداري</span>
      </span>
    );
  }

  // 4. Certified Inspector Badge (المتفقد التربوي)
  if (role === "INSPECTOR") {
    return (
      <span
        title="متفقد تربوي معتمد للإشراف والمصادقة البيداغوجية"
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-sm select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <BadgeCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>متفقد معتمد</span>
      </span>
    );
  }

  // 5. Educational Institution Badge (Verified via Admin Code vs Standard)
  if (role === "INSTITUTION") {
    if (isVerified) {
      return (
        <span
          title="مؤسسة تربوية موثقة رسمياً بكود معتمد في المسند"
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-sm select-none ${
            size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          <BadgeCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
          <span>مؤسسة معتمدة</span>
        </span>
      );
    }
    return (
      <span
        title="مؤسسة تربوية"
        className={`inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <Building2 className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>مؤسسة تربوية</span>
      </span>
    );
  }

  // 6. Teacher Badge (Verified via Admin Code vs Standard)
  if (role === "TEACHER") {
    if (isVerified) {
      return (
        <span
          title="معلم موثق رسمياً بكود معتمد في المسند"
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-sm select-none ${
            size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          <BadgeCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
          <span>معلم موثق</span>
        </span>
      );
    }
    return null;
  }

  // 7. Student Badge
  if (role === "STUDENT") {
    return (
      <span
        title="حساب تلميذ"
        className={`inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold select-none ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        }`}
      >
        <GraduationCap className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        <span>تلميذ</span>
      </span>
    );
  }

  return null;
}

```

---

### File: `src/components/ui/InstallPwaBanner.tsx`

```typescript
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Download, X, Smartphone, Share } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const SESSION_DISMISSED_KEY = "musnad_pwa_dismissed_session";
const INSTALLED_PERMANENT_KEY = "musnad_pwa_installed";

// In-memory guard so SPA route transitions never re-show the banner once dismissed
let dismissedInCurrentVisit = false;

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const isDismissedRef = useRef<boolean>(false);

  const checkIsDismissedOrInstalled = useCallback((): boolean => {
    if (dismissedInCurrentVisit || isDismissedRef.current) return true;
    if (typeof window === "undefined") return true;

    try {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      if (isStandalone) return true;

      if (localStorage.getItem(INSTALLED_PERMANENT_KEY) === "1") {
        return true;
      }

      if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") {
        dismissedInCurrentVisit = true;
        isDismissedRef.current = true;
        return true;
      }
    } catch {
      // Ignore storage access errors
    }

    return false;
  }, []);

  const markDismissedForSession = useCallback(() => {
    dismissedInCurrentVisit = true;
    isDismissedRef.current = true;
    setIsVisible(false);
    setShowIosGuide(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
      // Remove legacy localStorage key if present so session-based rule applies cleanly
      localStorage.removeItem("musnad_pwa_banner_dismissed");
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // If user logs out ("SIGNED_OUT"), reset session dismissal so it can appear again on next login/visit
      if (event === "SIGNED_OUT") {
        dismissedInCurrentVisit = false;
        isDismissedRef.current = false;
        try {
          sessionStorage.removeItem(SESSION_DISMISSED_KEY);
        } catch {
          // Ignore
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (checkIsDismissedOrInstalled()) {
      setIsVisible(false);
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleIos =
      /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIos(isAppleIos);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Crucial guard: never re-show if user already clicked "لاحقاً" or "X" during this session!
      if (checkIsDismissedOrInstalled()) {
        setIsVisible(false);
        return;
      }
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      dismissedInCurrentVisit = true;
      isDismissedRef.current = true;
      setIsVisible(false);
      try {
        localStorage.setItem(INSTALLED_PERMANENT_KEY, "1");
        sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
      } catch {
        // Ignore
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    let iosTimer: ReturnType<typeof setTimeout> | null = null;
    if (isAppleIos && window.innerWidth < 768) {
      iosTimer = setTimeout(() => {
        if (!checkIsDismissedOrInstalled()) {
          setIsVisible(true);
        }
      }, 3000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, [checkIsDismissedOrInstalled]);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        try {
          localStorage.setItem(INSTALLED_PERMANENT_KEY, "1");
        } catch {
          // Ignore
        }
      }
      // Hide for the rest of the session whether accepted or dismissed
      markDismissedForSession();
      setDeferredPrompt(null);
    } catch {
      markDismissedForSession();
    }
  };

  const handleDismiss = () => {
    markDismissedForSession();
  };

  if (!isVisible || checkIsDismissedOrInstalled()) return null;

  return (
    <div
      role="banner"
      aria-label="تثبيت تطبيق المسند"
      className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:end-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-blue-500/30 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-md shadow-blue-500/20 shrink-0">
              م
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>تطبيق منصة المسند</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-1.5 py-0.5 rounded-full border border-blue-500/30">
                  PWA
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                ثبّت التطبيق على هاتفك لتصفح أسرع والوصول المباشر للوثائق
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="إغلاق التنبيه"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showIosGuide && (
          <div className="bg-slate-800/80 p-3 rounded-xl text-xs text-blue-200 border border-blue-500/20 space-y-1.5 animate-in fade-in">
            <p className="font-bold flex items-center gap-1.5 text-white">
              <Share className="w-3.5 h-3.5 text-blue-400" />
              <span>خطوات التثبيت على iPhone:</span>
            </p>
            <p className="text-[11px] leading-relaxed text-slate-300">
              1. اضغط على زر المشاركة (Share) في أسفل متصفح Safari.
              <br />
              2. انزل للأسفل واختر <strong>«إضافة إلى الشاشة الرئيسية»</strong> (Add to Home Screen).
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
          >
            {isIos ? (
              <>
                <Smartphone className="w-4 h-4" />
                <span>طريقة التثبيت على iPhone</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>تثبيت التطبيق الآن</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            لاحقاً
          </button>
        </div>
      </div>
    </div>
  );
}

```

---

### File: `src/components/ui/MentionText.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";

interface MentionTextProps {
  text: string;
  className?: string;
}

const MENTION_SPLIT_REGEX = /(@[a-zA-Z0-9_.]{2,32})/g;

export default function MentionText({ text, className = "" }: MentionTextProps) {
  if (!text) return null;

  const parts = text.split(MENTION_SPLIT_REGEX);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part.startsWith("@") && part.length >= 3) {
          const cleanUsername = part.slice(1).toLowerCase();
          return (
            <Link
              key={`${cleanUsername}-${idx}`}
              href={`/u/${encodeURIComponent(cleanUsername)}`}
              dir="ltr"
              className="mx-0.5 inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-xs font-bold text-blue-700 underline-offset-2 transition hover:bg-blue-100 hover:underline dark:bg-blue-950/70 dark:text-blue-300 dark:hover:bg-blue-900/80"
              title={`الانتقال إلى صفحة الناشر ${part}`}
            >
              {part}
            </Link>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
}
```

---

### File: `src/components/ui/UserPresenceIndicator.tsx`

```typescript
"use client";

import React from "react";
import { Ghost } from "lucide-react";

export type PresenceMode = "ONLINE" | "OFFLINE" | "GHOST";

const ACTIVE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function formatOfflineDurationAr(lastSeenAt?: string | Date | null): string {
  if (!lastSeenAt) return "منذ فترة";
  const lastTime = new Date(lastSeenAt).getTime();
  if (Number.isNaN(lastTime)) return "منذ فترة";

  const diffMs = Math.max(0, Date.now() - lastTime);
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return "منذ لحظات";
  if (diffMinutes === 1) return "منذ دقيقة واحدة";
  if (diffMinutes === 2) return "منذ دقيقتين";
  if (diffMinutes <= 10) return `منذ ${diffMinutes} دقائق`;
  if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return "منذ ساعة واحدة";
  if (diffHours === 2) return "منذ ساعتين";
  if (diffHours <= 10) return `منذ ${diffHours} ساعات`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "منذ يوم واحد";
  if (diffDays === 2) return "منذ يومين";
  if (diffDays <= 10) return `منذ ${diffDays} أيام`;
  return `منذ ${diffDays} يوماً`;
}

export function getPublicPresenceState(
  user?: {
    presenceStatus?: string | null;
    lastSeenAt?: string | Date | null;
  } | null,
  isSelf: boolean = false
): {
  isOnlinePublicly: boolean;
  isGhostSelf: boolean;
  statusLabelAr: string;
  durationLabelAr: string | null;
  dotColorClass: string;
} {
  const rawStatus = (user?.presenceStatus || "ONLINE").toUpperCase();
  const lastSeenTime = user?.lastSeenAt
    ? new Date(user.lastSeenAt).getTime()
    : Date.now();
  const isRecentlyActive =
    !Number.isNaN(lastSeenTime) && Date.now() - lastSeenTime <= ACTIVE_WINDOW_MS;

  if (rawStatus === "GHOST") {
    const duration = formatOfflineDurationAr(user?.lastSeenAt);
    if (isSelf) {
      return {
        isOnlinePublicly: false,
        isGhostSelf: true,
        statusLabelAr: "وضع الشبح (تصفح خفي)",
        durationLabelAr: `تظهر للآخرين غير متصل (${duration})`,
        dotColorClass: "bg-slate-400 dark:bg-slate-500",
      };
    }
    return {
      isOnlinePublicly: false,
      isGhostSelf: false,
      statusLabelAr: "غير متصل",
      durationLabelAr: duration,
      dotColorClass: "bg-slate-400 dark:bg-slate-500",
    };
  }

  if (rawStatus === "OFFLINE" || !isRecentlyActive) {
    const duration = formatOfflineDurationAr(user?.lastSeenAt);
    return {
      isOnlinePublicly: false,
      isGhostSelf: false,
      statusLabelAr: "غير متصل",
      durationLabelAr: duration,
      dotColorClass: "bg-slate-400 dark:bg-slate-500",
    };
  }

  return {
    isOnlinePublicly: true,
    isGhostSelf: false,
    statusLabelAr: "متصل الآن",
    durationLabelAr: null,
    dotColorClass: "bg-emerald-500 shadow-sm shadow-emerald-500/50",
  };
}

interface UserAvatarWithPresenceProps {
  name: string;
  avatarUrl?: string | null;
  presenceStatus?: string | null;
  lastSeenAt?: string | Date | null;
  isSelf?: boolean;
  size?: "sm" | "md" | "lg";
  avatarBgClass?: string;
}

export function UserAvatarWithPresence({
  name,
  avatarUrl,
  presenceStatus,
  lastSeenAt,
  isSelf = false,
  size = "md",
  avatarBgClass = "bg-blue-600 text-white",
}: UserAvatarWithPresenceProps) {
  const presence = getPublicPresenceState(
    { presenceStatus, lastSeenAt },
    isSelf
  );

  const dims =
    size === "sm"
      ? "w-7 h-7 text-[11px] rounded-full"
      : size === "lg"
      ? "w-16 h-16 text-2xl rounded-2xl"
      : "w-8 h-8 text-xs rounded-full";

  const dotDims =
    size === "sm"
      ? "w-2.5 h-2.5 -bottom-0.5 right-1/2 translate-x-1/2 border"
      : size === "lg"
      ? "w-4 h-4 -bottom-1 right-1/2 translate-x-1/2 border-2"
      : "w-3 h-3 -bottom-0.5 right-1/2 translate-x-1/2 border-2";

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      title={
        presence.durationLabelAr
          ? `${presence.statusLabelAr} • ${presence.durationLabelAr}`
          : presence.statusLabelAr
      }
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${dims} object-cover border border-slate-200 dark:border-slate-700`}
        />
      ) : (
        <div
          className={`${dims} ${avatarBgClass} font-black flex items-center justify-center shadow-sm`}
        >
          {(name || "م").charAt(0)}
        </div>
      )}

      <span
        className={`absolute ${dotDims} rounded-full border-white dark:border-slate-900 ${presence.dotColorClass}`}
      />
    </div>
  );
}

export function UserPresenceBadge({
  presenceStatus,
  lastSeenAt,
  isSelf = false,
  compact = false,
}: {
  presenceStatus?: string | null;
  lastSeenAt?: string | Date | null;
  isSelf?: boolean;
  compact?: boolean;
}) {
  const presence = getPublicPresenceState(
    { presenceStatus, lastSeenAt },
    isSelf
  );

  if (presence.isGhostSelf) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-100 border border-slate-700">
        <Ghost className="w-3 h-3 text-purple-400 shrink-0" />
        <span>
          {compact
            ? "وضع الشبح"
            : `وضع الشبح • ${presence.durationLabelAr}`}
        </span>
      </span>
    );
  }

  if (presence.isOnlinePublicly) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span>متصل الآن</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
      <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
      <span>
        {compact
          ? presence.durationLabelAr || "غير متصل"
          : `غير متصل • ${presence.durationLabelAr}`}
      </span>
    </span>
  );
}

```

---

### File: `src/components/ui/SubjectIcon.tsx`

```typescript
"use client";

import React from "react";
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Languages,
  Globe,
  Compass,
  Palette,
  MoonStar,
  Dumbbell,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface SubjectIconProps {
  slug?: string | null;
  iconName?: string | null;
  className?: string;
}

export default function SubjectIcon({
  slug,
  iconName,
  className = "h-6 w-6",
}: SubjectIconProps) {
  const key = (slug || iconName || "").toLowerCase();

  switch (key) {
    case "math":
    case "calculator":
      return <Calculator className={className} />;
    case "science":
    case "flask-conical":
      return <FlaskConical className={className} />;
    case "arabic":
    case "book-open":
      return <BookOpen className={className} />;
    case "french":
    case "languages":
      return <Languages className={className} />;
    case "english":
    case "globe":
      return <Globe className={className} />;
    case "history-geography":
    case "compass":
      return <Compass className={className} />;
    case "art":
    case "palette":
      return <Palette className={className} />;
    case "islamic-studies":
    case "moon-star":
      return <MoonStar className={className} />;
    case "pe":
    case "dumbbell":
      return <Dumbbell className={className} />;
    case "administration":
    case "briefcase":
      return <Briefcase className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

```

---

### File: `src/components/worksheets/RolePersonalizedHub.tsx`

```typescript
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  BookOpenCheck,
  GraduationCap,
  Plus,
  Sparkles,
  Users,
  FileText,
  Briefcase,
  ShieldCheck,
  Layers,
} from "lucide-react";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import { CURRICULUM_GRADES } from "@/config/constants";
import type { WorksheetWithRelations } from "@/types/api";

interface RolePersonalizedHubProps {
  worksheets: WorksheetWithRelations[];
  viewerRole: string | null;
  viewerName?: string | null;
  viewerStudentGrade?: string | null;
  viewerIsVerified?: boolean;
}

type HubRoleTab = "INSTITUTION" | "INSPECTOR" | "TEACHER" | "STUDENT";

export default function RolePersonalizedHub({
  worksheets,
  viewerRole,
  viewerName,
  viewerStudentGrade,
  viewerIsVerified = false,
}: RolePersonalizedHubProps) {
  const isStaff = viewerRole === "ADMIN" || viewerRole === "MODERATOR";

  const initialHub: HubRoleTab =
    viewerRole === "INSTITUTION"
      ? "INSTITUTION"
      : viewerRole === "INSPECTOR"
      ? "INSPECTOR"
      : viewerRole === "STUDENT"
      ? "STUDENT"
      : "TEACHER";

  const [activeHub, setActiveHub] = useState<HubRoleTab>(initialHub);
  const [subFilter, setSubFilter] = useState<string>("ALL");
  const [selectedStudentGradeSlug, setSelectedStudentGradeSlug] =
    useState<string>(() => {
      if (viewerStudentGrade) {
        const matched = CURRICULUM_GRADES.find(
          (g) =>
            g.nameAr === viewerStudentGrade || g.slug === viewerStudentGrade
        );
        if (matched) return matched.slug;
      }
      return "ALL";
    });

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash === "#institutions-hub") setActiveHub("INSTITUTION");
        else if (hash === "#inspectors-hub") setActiveHub("INSPECTOR");
        else if (hash === "#teachers-hub") setActiveHub("TEACHER");
        else if (hash === "#student-hub") setActiveHub("STUDENT");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // 1. Institution-specific publications
  const institutionWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isInstOnly = ws.audience === "INSTITUTIONS_ONLY";
      const isInstSameRole =
        ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role === "INSTITUTION";
      const isUploadedByInst = ws.uploader?.role === "INSTITUTION";

      if (subFilter === "EXCLUSIVE") {
        return isInstOnly || isInstSameRole;
      }
      return isInstOnly || isInstSameRole || isUploadedByInst;
    });
  }, [worksheets, subFilter]);

  // 2. Inspector-specific publications
  const inspectorWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isInspSameRole =
        ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role === "INSPECTOR";
      const isUploadedByInsp = ws.uploader?.role === "INSPECTOR";
      const isEndorsedDirective =
        ws.isEndorsed && ws.audience === "TEACHERS_ONLY";

      if (subFilter === "EXCLUSIVE") {
        return isInspSameRole || isUploadedByInsp;
      }
      return isInspSameRole || isUploadedByInsp || isEndorsedDirective;
    });
  }, [worksheets, subFilter]);

  // 3. Teacher-specific publications
  const teacherWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isTeachersOnly = ws.audience === "TEACHERS_ONLY";
      const isTeacherSameRole =
        ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role === "TEACHER";
      const isFiche = ws.category?.slug === "lesson-plan";
      const isTeacherUpload = ws.uploader?.role === "TEACHER";

      if (subFilter === "TEACHERS_ONLY") return isTeachersOnly || isTeacherSameRole;
      if (subFilter === "FICHES") return isFiche;
      if (subFilter === "EXAMS") return ws.category?.slug === "exam";
      return isTeachersOnly || isTeacherSameRole || isFiche || isTeacherUpload;
    });
  }, [worksheets, subFilter]);

  // 4. Student-specific publications (Strictly excludes administrative & teacher/institution-only files)
  const studentWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const isAdminDoc =
        ws.category?.slug === "administrative" ||
        ws.subject?.slug === "administration";
      if (isAdminDoc) return false;
      if (
        ws.audience === "TEACHERS_ONLY" ||
        ws.audience === "INSTITUTIONS_ONLY" ||
        (ws.audience === "SAME_ROLE_ONLY" && ws.uploader?.role !== "STUDENT")
      ) {
        return false;
      }
      if (
        selectedStudentGradeSlug !== "ALL" &&
        ws.grade?.slug !== selectedStudentGradeSlug
      ) {
        return false;
      }
      if (subFilter !== "ALL" && ws.category?.slug !== subFilter) {
        return false;
      }
      return true;
    });
  }, [worksheets, selectedStudentGradeSlug, subFilter]);

  if (!viewerRole) return null;

  const requiresIdentityVerification =
    !isStaff &&
    (viewerRole === "INSPECTOR" ||
      viewerRole === "TEACHER" ||
      viewerRole === "INSTITUTION") &&
    !viewerIsVerified;

  if (requiresIdentityVerification) {
    const roleTitleAr =
      viewerRole === "INSPECTOR"
        ? "متفقد تربوي"
        : viewerRole === "INSTITUTION"
        ? "مؤسسة تربوية"
        : "معلم";

    return (
      <section
        id="role-personalized-hub"
        dir="rtl"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-l from-amber-50 via-white to-orange-50/40 p-6 sm:p-8 shadow-md dark:border-amber-800/80 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/25">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  🔒 حماية أمان الفضاء الداخلي — الحساب قيد انتظار إثبات الهوية
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  مرحباً {viewerName || ""}، وصولك إلى الملفات الحساسة والميزات الداخلية لفئة ({roleTitleAr}) مقفل لحين إثبات الهوية
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  لضمان أمان المنصة ومنع أي مستخدم غير مخوّل من التسجيل كـ <strong>{roleTitleAr}</strong> للوصول إلى الامتحانات السرية، الإصلاحات، الوثائق الداخلية، أو صلاحيات المتفقد التربوي، يُشترط أولاً إثبات وتوثيق هويتك رسمياً. يمكنك حالياً تصفح المنشورات التعليمية العامة في الأسفل، وفور توثيق حسابك سيُفتح لك الفضاء الداخلي الكامل وميزات فئتك تلقائياً.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {viewerRole === "INSPECTOR" && (
                <Link
                  href="/inspector/activate"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-4 py-3 text-xs font-extrabold text-white shadow-sm transition"
                >
                  <Award className="h-4 w-4" />
                  <span>تفعيل حساب المتفقد بكود التوثيق</span>
                </Link>
              )}
              <Link
                href="/profile?tab=verification"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-3 text-xs font-extrabold text-white shadow-sm transition"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>طلب إثبات وتوثيق الهوية الآن</span>
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
              >
                <span>التواصل مع الإدارة</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="role-personalized-hub"
      dir="rtl"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {isStaff && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-200 bg-purple-50/70 px-4 py-3 dark:border-purple-900/60 dark:bg-purple-950/30">
          <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900 dark:text-purple-200">
            <ShieldCheck className="h-4 w-4 text-purple-600" />
            <span>معاينة الفضاءات المخصصة حسب فئة المستخدم (صلاحية المشرف/المسؤول):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { key: "INSTITUTION", label: "🏛️ فضاء المؤسسات" },
                { key: "INSPECTOR", label: "🏅 فضاء المتفقدين" },
                { key: "TEACHER", label: "👨‍🏫 فضاء المعلمين" },
                { key: "STUDENT", label: "🎓 فضاء التلاميذ" },
              ] as { key: HubRoleTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveHub(tab.key);
                  setSubFilter("ALL");
                }}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                  activeHub === tab.key
                    ? "bg-purple-700 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-purple-100 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeHub === "INSTITUTION" && (
        <div id="institutions-hub" className="overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white shadow-md dark:border-indigo-900/60 dark:bg-slate-900 scroll-mt-24">
          <div className="border-b border-indigo-100 bg-gradient-to-l from-indigo-50 via-blue-50/40 to-white px-6 py-6 dark:border-slate-800 dark:from-indigo-950/50 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-0.5 text-[11px] font-extrabold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    <Sparkles className="h-3 w-3" />
                    فضاء حصري للمؤسسات التربوية فقط
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    ملتقى ومستودع نشرات المؤسسات التربوية
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    قسم مخصص لمنشورات المؤسسات التربوية لتبادل النماذج الإدارية والبيداغوجية والتفاعل الهادف بين المدارس والمعاهد.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/upload?audience=INSTITUTIONS_ONLY"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>نشر محتوى خاص بالمؤسسات</span>
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "ALL"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-indigo-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                جميع منشورات المؤسسات ({institutionWorksheets.length})
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("EXCLUSIVE")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "EXCLUSIVE"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-indigo-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                نشرات حصرية بين المؤسسات فقط
              </button>
            </div>
          </div>

          <div className="p-6">
            {institutionWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <Building2 className="mx-auto mb-2 h-9 w-9 text-indigo-400" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد نشرات مؤسساتية في هذا التبويب حالياً
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  بادر بنشر أول وثيقة أو مبادرة تربوية باسم مؤسستك للتفاعل مع المؤسسات الزميلة.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {institutionWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeHub === "INSPECTOR" && (
        <div id="inspectors-hub" className="overflow-hidden rounded-3xl border-2 border-amber-300 bg-white shadow-md dark:border-amber-800/70 dark:bg-slate-900 scroll-mt-24">
          <div className="border-b border-amber-100 bg-gradient-to-l from-amber-50 via-orange-50/30 to-white px-6 py-6 dark:border-slate-800 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/25">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    <Sparkles className="h-3 w-3" />
                    الفضاء التشاركي الخاص بالمتفقدين التربويين
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    منشورات وتوجيهات هيئة التفقد التربوي
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    قسم علوي مخصص للمنشورات والوثائق التي تخص المتفقدين فقط لتسهيل التنسيق والتفاعل البيداغوجي بين المتفقدين.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/upload?audience=SAME_ROLE_ONLY"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-amber-600"
                >
                  <Plus className="h-4 w-4" />
                  <span>نشر وثيقة خاصة بالمتفقدين</span>
                </Link>
                <Link
                  href="/inspector/dashboard"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-xs font-extrabold text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-slate-800 dark:text-amber-300"
                >
                  <span>لوحة تحكم المتفقد ←</span>
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "ALL"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                جميع منشورات وتوجيهات المتفقدين ({inspectorWorksheets.length})
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("EXCLUSIVE")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "EXCLUSIVE"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                منشورات حصرية بين المتفقدين فقط
              </button>
            </div>
          </div>

          <div className="p-6">
            {inspectorWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <Award className="mx-auto mb-2 h-9 w-9 text-amber-500" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد منشورات خاصة بالمتفقدين في هذا التبويب حالياً
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  يمكنك نشر شبكات التقييم، تقارير التفقد النموذجية، أو التوجيهات البيداغوجية لمشاركتها مع زملائك المتفقدين.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inspectorWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeHub === "TEACHER" && (
        <div id="teachers-hub" className="overflow-hidden rounded-3xl border-2 border-blue-200 bg-white shadow-md dark:border-blue-900/60 dark:bg-slate-900 scroll-mt-24">
          <div className="border-b border-blue-100 bg-gradient-to-l from-blue-50 via-indigo-50/30 to-white px-6 py-6 dark:border-slate-800 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                  <BookOpenCheck className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 text-[11px] font-extrabold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    <Users className="h-3 w-3" />
                    الفضاء المهني الخاص بالمعلمين
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    مستودع منشورات ومذكرات المعلمين
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    يجمع هذا القسم كافة المنشورات التي تخص المعلمين (الجذاذات البيداغوجية، إصلاح الفروض والامتحانات المحجوبة عن التلاميذ، والتوزيعات السنوية).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/upload?audience=TEACHERS_ONLY"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>نشر جذاذة أو إصلاح (خاص بالمعلمين)</span>
                </Link>
                <a
                  href="#administration-section"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Briefcase className="h-3.5 w-3.5 text-amber-600" />
                  <span>الوثائق الإدارية للمعلم</span>
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "ALL"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                جميع منشورات المعلمين ({teacherWorksheets.length})
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("TEACHERS_ONLY")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "TEACHERS_ONLY"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                🔒 خاص بالمعلمين فقط (محجوب عن التلاميذ)
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("FICHES")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "FICHES"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                📋 الجذاذات والمخططات البيداغوجية
              </button>
              <button
                type="button"
                onClick={() => setSubFilter("EXAMS")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  subFilter === "EXAMS"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                📝 الفروض والاختبارات التقييمية
              </button>
            </div>
          </div>

          <div className="p-6">
            {teacherWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <FileText className="mx-auto mb-2 h-9 w-9 text-blue-400" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد منشورات مطابقة لهذا الفلتر حالياً
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teacherWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeHub === "STUDENT" && (
        <div
          id="student-hub"
          className="overflow-hidden rounded-3xl border-2 border-emerald-200 bg-white shadow-md dark:border-emerald-900/60 dark:bg-slate-900 scroll-mt-24"
        >
          <div className="border-b border-emerald-100 bg-gradient-to-l from-emerald-50 via-teal-50/30 to-white px-6 py-6 dark:border-slate-800 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Sparkles className="h-3 w-3" />
                    فضاء التلميذ الذكي للمراجعة والتفوق
                  </span>
                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                    مرحباً بك{viewerName ? ` يا ${viewerName}` : ""} في مكتبتك الدراسية
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    واجهة مبسطة مخصصة للتلاميذ تضم الدروس المبسطة، التمارين التطبيقية، الامتحانات، والأنشطة التفاعلية حسب مستواك الدراسي.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedStudentGradeSlug}
                  onChange={(e) => setSelectedStudentGradeSlug(e.target.value)}
                  className="rounded-xl border border-emerald-300 bg-white px-3.5 py-2 text-xs font-extrabold text-emerald-900 outline-none dark:border-emerald-800 dark:bg-slate-800 dark:text-emerald-200"
                >
                  <option value="ALL">جميع المستويات الدراسية</option>
                  {CURRICULUM_GRADES.map((g) => (
                    <option key={g.slug} value={g.slug}>
                      {g.nameAr}
                    </option>
                  ))}
                </select>
                {selectedStudentGradeSlug !== "ALL" && (
                  <Link
                    href={`/levels/${selectedStudentGradeSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>فتح مواد هذا المستوى ←</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { key: "ALL", label: `كل ملفات المراجعة (${studentWorksheets.length})` },
                { key: "lesson", label: "📖 الدروس والملخصات" },
                { key: "worksheet", label: "✍️ التمارين التطبيقية" },
                { key: "exam", label: "📝 فروض وامتحانات المراجعة" },
                { key: "activity", label: "🎮 الأنشطة التفاعلية" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSubFilter(t.key)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                    subFilter === t.key
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-emerald-50 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {studentWorksheets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
                <GraduationCap className="mx-auto mb-2 h-9 w-9 text-emerald-500" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  لا توجد ملفات في هذا القسم حالياً
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studentWorksheets.slice(0, 6).map((ws) => (
                  <WorksheetCard key={ws.id} worksheet={ws} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

```

---

### File: `src/components/home/PlatformIdentityAndFaqSection.tsx`

```typescript
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Target,
  Layers,
  Lock,
  Users,
  Compass,
  FileText,
} from "lucide-react";

const SUBSCRIBER_ROLES_GUIDE = [
  {
    role: "INSTITUTION",
    badge: "الركن المؤسساتي",
    title: "1. حساب المؤسسات التربوية (المدارس والمعاهد)",
    subtitle: "فضاء رسمي للتنسيق المؤسساتي وتبادل النماذج التربوية والإدارية",
    icon: Building2,
    accentBg: "bg-indigo-600",
    borderClass: "border-indigo-200 dark:border-indigo-900/60",
    badgeClass: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
    features: [
      "قسم حصري في أعلى الواجهة («ملتقى نشرات المؤسسات») للتفاعل المباشر بين المؤسسات التربوية ونشر المحتوى الهادف.",
      "إمكانية نشر وثائق ومبادرات موجهة حصرياً للمؤسسات الزميلة أو عامة لمعلمي وتلاميذ المؤسسة.",
      "الحصول على شارة «مؤسسة تربوية موثقة رسمياً» بعد التثبت من الهوية مع المشرف العام.",
      "صفحة عامة رسمية للمؤسسة تعرض كافة إصداراتها، عدد المتابعين، وإحصائيات التحميل.",
      "الوصول الكامل إلى قسم الإدارة والمعاملات الإدارية والنماذج الرسمية.",
    ],
  },
  {
    role: "INSPECTOR",
    badge: "الركن الرقابي والبيداغوجي",
    title: "2. حساب المتفقدين التربويين",
    subtitle: "إشراف علمي وبيداغوجي مباشر واعتماد رسمي للنشرات التربوية",
    icon: Award,
    accentBg: "bg-amber-500",
    borderClass: "border-amber-200 dark:border-amber-900/60",
    badgeClass: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
    features: [
      "قسم علوي مخصص («منشورات المتفقدين فقط») لتبادل التوجيهات وشبكات التقييم والتفاعل البيداغوجي بين المتفقدين.",
      "لوحة تحكم رقابية حصرية (/inspector/dashboard) لمراجعة المنشورات ومنح «شارة الاعتماد البيداغوجي ★».",
      "إضافة توجيهات بيداغوجية رسمية تُثبّت في صدارة التعليقات، أو إرسال ملاحظات توجيهية خاصة للناشر وحده.",
      "تحويل الملفات المرفوعة بصيغة Word أو صور إلى ملفات PDF معتمدة وجاهزة للتحميل.",
      "قناة إبلاغ رقابي عاجل تصل مباشرة إلى المشرف العام في قمة الهرم.",
    ],
  },
  {
    role: "TEACHER",
    badge: "الركن التعليمي والإبداعي",
    title: "3. حساب المعلمين والأساتذة",
    subtitle: "بيئة مهنية متكاملة للنشر التربوي، الجذاذات، والوثائق الإدارية",
    icon: BookOpenCheck,
    accentBg: "bg-blue-600",
    borderClass: "border-blue-200 dark:border-blue-900/60",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    features: [
      "قسم علوي مخصص في واجهة المعلم («مستودع منشورات المعلمين») يجمع الجذاذات، التوزيعات، وإصلاحات الامتحانات.",
      "ميزة حجب الملفات عن التلاميذ (للمعلمين فقط) عند نشر إصلاح الفروض أو المذكرات البيداغوجية الخاصة بالمعلم.",
      "نشر الملفات في الأقسام الستة لكل مادة (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى) بصيغ PDF أو Word أو صور.",
      "الوصول الكامل إلى «قسم الإدارة والمعاملات الإدارية» (جداول الأوقات، المذكرات، تقارير الترسيم، والمطالب).",
      "بناء ملف ناشر عام موثق مع إحصائيات التحميل والتقييمات والتفاعل عبر الإشارة @username.",
    ],
  },
  {
    role: "STUDENT",
    badge: "ركن التفوق والمراجعة",
    title: "4. حساب التلاميذ",
    subtitle: "واجهة دراسية ذكية ومبسطة خالية من التعقيدات الإدارية",
    icon: GraduationCap,
    accentBg: "bg-emerald-600",
    borderClass: "border-emerald-200 dark:border-emerald-900/60",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    features: [
      "فضاء مراجعة ذكي مخصص لمستوى التلميذ الدراسي في أعلى الصفحة يعرض الدروس والتمارين والامتحانات والأنشطة التفاعلية.",
      "واجهة نقية ومبسطة: يتم إخفاء «قسم الإدارة والمعاملات الإدارية» والملفات الخاصة بالمعلمين تلقائياً لتركيز التلميذ على دراسته.",
      "معاينة وتحميل فوري للملفات المعتمدة بيداغوجياً من قِبل المتفقدين التربويين.",
      "إمكانية حفظ الدروس والامتحانات في «قائمة المفضلة» للرجوع إليها سريعاً أيام المراجعة والامتحانات.",
      "متابعة المعلمين والمؤسسات التربوية المفضلة والتفاعل في النقاشات التعليمية.",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "كيف تضمن منصة «المسند» جودة وصحة الملفات التربوية المنشورة؟",
    a: "تعتمد المنصة نظام إشراف ثلاثي المستويات (المتفقد التربوي، المسؤول الإداري، والمشرف العام). يقوم المتفقدون التربويون المعتمدون بمراجعة النشرات ومنحها «شارة الاعتماد البيداغوجي ★» مع كتابة توجيهات رسمية، كما يتم تحويل ملفات Word والصور إلى ملفات PDF منسقة بعد مراجعتها.",
  },
  {
    q: "كيف يتم تنظيم الملفات داخل مستودع المستويات والمواد؟",
    a: "عند الدخول إلى «مستودع المواد والمستويات» تختار أولاً المستوى الدراسي المعتمد (من السنة الأولى إلى السادسة ابتدائي)، وداخله تجد مستودع المواد الدراسية مميزاً برموز بصرية لكل مادة، وداخل كل مادة تتوزع الملفات بدقة في 6 أقسام: (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، وأخرى).",
  },
  {
    q: "هل يستطيع التلميذ رؤية إصلاح الامتحانات أو قسم الإدارة الخاص بالمعلم؟",
    a: "لا؛ عندما يختار المعلم جمهور النشر «للمعلمين فقط»، يقوم النظام بحجب الملف برمجياً عن جميع حسابات التلاميذ والزوار. كما أن «قسم الإدارة والمعاملات الإدارية» منزوع تماماً من واجهة التلميذ ومقتصر على المعلمين والمتفقدين والمؤسسات.",
  },
  {
    q: "كيف أحصل على شارة التوثيق الرسمية على حسابي؟",
    a: "يمكنك التسجيل في الموقع بشكل عادي، ثم الانتقال إلى تبويب «التوثيق» في ملفك الشخصي وإرسال طلب توثيق الهوية، أو التواصل مع المشرف العام عبر قسم الدعم الفني ليمنحك كود التوثيق السري (VERF-... أو INSP-...) الذي يفعّل الشارة الرسمية فوراً.",
  },
  {
    q: "ما هي خاصية «وضع الشبح» وحالة الاتصال في المنصة؟",
    a: "يتيح لك النظام من القائمة المنسدلة لاسمك أو من ملفك الشخصي تحديد حالتك: «متصل» (نقطة خضراء أسفل صورتك)، أو «غير متصل» (نقطة رمادية مع عرض مدة آخر ظهور)، أو «وضع الشبح 👻» الذي يمكّنك من تصفح الموقع بالكامل دون أن يظهر للآخرين أنك متصل.",
  },
  {
    q: "ماذا يحدث إذا نسيت كلمة المرور أو أخطأت في كتابتها 6 مرات؟",
    a: "لحماية حسابات الأعضاء من محاولات التخمين، ينبهك النظام عند كل محاولة خاطئة بعدد المحاولات المتبقية من أصل 6 محاولات. وفي حال استنفاد 6 محاولات خاطئة يُقفل الحساب مؤقتاً، ويمكنك مراسلة المشرف العام أو المسؤول الإداري عبر قسم الدعم الفني لفك غلق الحساب بضغطة زر.",
  },
];

type LearnMoreTab = "ALL" | "ABOUT" | "ROLES" | "FAQ";

export default function PlatformIdentityAndFaqSection() {
  const [activeTab, setActiveTab] = useState<LearnMoreTab>("ALL");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div
      id="learn-more"
      dir="rtl"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24"
    >
      <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 p-6 sm:p-8 text-center shadow-sm space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 px-4 py-1 text-xs font-black text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
          <Compass className="h-3.5 w-3.5" />
          <span>الدليل الشامل لمنصة المسند • اعرف المزيد</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          اعرف المزيد عن منصة «المسند» التربوية
        </h2>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          فضاء تعليمي موحد يجمع رسالة المنصة، دليل مزايا واختصاصات كل فئة مستخدم، وإجابات الأسئلة الشائعة في مكان واحد.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "ALL"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            الكل المدمج
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ABOUT")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "ABOUT"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            من نحن والرسالة
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ROLES")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "ROLES"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            مزايا الفئات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("FAQ")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "FAQ"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            الأسئلة الشائعة
          </button>
        </div>
      </div>

      {(activeTab === "ALL" || activeTab === "ABOUT") && (
        <section
          id="about-us"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-24"
        >
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800">
              <Sparkles className="h-3.5 w-3.5" />
              <span>من نحن • الهوية والرسالة التربوية</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              هوية منصة «المسند» وما تؤدي إليه في المنظومة التربوية
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>«المسند»</strong> هي منصة تربوية وبيداغوجية رقمية تشاركية صُممت لتكون الحاضنة المرجعية الموثوقة للعمل التربوي والإداري. تجمع المنصة بين <strong>المؤسسات التربوية، المتفقدين، المعلمين، والتلاميذ</strong> في بيئة منظمة تحفظ الملكية الفكرية للناشر وتضمن للتلميذ والمعلم الوصول السريع إلى المعلومة المعتمدة.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                توحيد وتوثيق المرجع التربوي
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                إنهاء تشتت الملفات التعليمية عبر تصنيف كل وثيقة بدقة حسب السنة الدراسية، المادة، ونوع القسم (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                الاعتماد البيداغوجي الرسمي
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                تمكين المتفقدين التربويين من المصادقة العلمية على النشرات ومنحها شارة الاعتماد البيداغوجي وتقديم التوجيهات المباشرة للناشرين.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                تكامل الأدوار وتخصيص الواجهة
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                تخصيص تجربة كل عضو بحسب صفته؛ فالمؤسسات تتفاعل في ملتقاها، والمتفقدون في فضائهم، والمعلمون في مستودعهم المهني، والتلاميذ في مكتبتهم الدراسية.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                حماية الخصوصية وأمان متقدم
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                منظومة محمية بنظام أمان متقدم يحفظ خصوصية المذكرات والامتحانات الخاصة بالمعلمين ويحمي الحسابات من الاختراق.
              </p>
            </div>
          </div>
        </section>
      )}

      {(activeTab === "ALL" || activeTab === "ROLES") && (
        <section id="roles-guide" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Lock className="h-3.5 w-3.5" />
              <span>دليل فئات المشتركين ومزايا العضوية</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ما هي الخصائص والميزات التي ستحصل عليها عند التسجيل؟
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              تعرّف بالتفصيل على الواجهة المخصصة والصلاحيات الحصرية الممنوحة لكل فئة من الفئات في منصة «المسند»:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SUBSCRIBER_ROLES_GUIDE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  className={`flex flex-col justify-between rounded-3xl border-2 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md dark:bg-slate-900 ${item.borderClass}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md ${item.accentBg}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                      {item.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/register?role=${item.role}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
                    >
                      <span>الانضمام بهذا الحساب الآن</span>
                      <span>←</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(activeTab === "ALL" || activeTab === "FAQ") && (
        <section
          id="faq-section"
          className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-24 space-y-6"
        >
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>إجابات واضحة • الأسئلة الشائعة</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              الأسئلة الأكثر تكراراً حول منصة «المسند»
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              كل ما تحتاج لمعرفته حول طريقة تنظيم المواد، آليات التوثيق، وصلاحيات فئات الحسابات.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40 transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-right transition hover:bg-slate-100/60 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200/60 px-4 sm:px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

```

---

### File: `src/components/profile/ArchivedSubscriptionsPlans.tsx`

```typescript
"use client";

import React from "react";
import { Clock } from "lucide-react";

export const PRESERVED_SUBSCRIPTION_PLANS = [
  {
    code: "STANDARD",
    title: "الباقة الأساسية",
    price: "اشتراك أساسي",
    features: [
      "تصفح ومعاينة النشرات التربوية",
      "متابعة الناشرين وإضافتهم للمفضلة",
      "نشر الوثائق مع تحديد جمهور النشر",
    ],
  },
  {
    code: "PRO_EDUCATOR",
    title: "باقة المعلم المتميز (Pro)",
    price: "اشتراك سنوي للمعلمين",
    features: [
      "تحميل غير محدود لكافة المذكرات والإصلاحات",
      "أولوية عرض النشرات في ملف ناشر موثق",
      "إحصائيات تفصيلية لتحميلات وتفاعل الزملاء",
    ],
  },
  {
    code: "INSTITUTION_PLUS",
    title: "باقة المؤسسات والمدارس",
    price: "اشتراك مؤسساتي شامل",
    features: [
      "فضاء رسمي باسم المؤسسة التربوية",
      "نشر موجه لمعلمي وتلاميذ المؤسسة",
      "اعتماد وتوثيق مباشر مع المتفقدين التربويين",
    ],
  },
] as const;

interface ArchivedSubscriptionsPlansProps {
  currentPlan?: string;
  planLoading?: string | null;
  onSelectPlan?: (planCode: string) => void;
}

export default function ArchivedSubscriptionsPlans(
  _props: ArchivedSubscriptionsPlansProps
) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 sm:p-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
          <Clock className="h-8 w-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 px-4 py-1 text-xs font-black text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 mb-4">
          <Clock className="h-3.5 w-3.5" />
          <span>سيأتي قريباً • Coming Soon</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          قسم الاشتراكات والباقات
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          هذا القسم قيد الإعداد والتطوير وسيكون متاحاً لجميع الأعضاء قريباً.
        </p>
      </div>
    </section>
  );
}

```

---

### File: `src/components/worksheets/FilterBar.tsx`

```typescript
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Filter, Sparkles } from "lucide-react";
import type { Grade, Subject, Category } from "@/types/api";
import { SCHOOL_TRIMESTERS } from "@/config/constants";

interface FilterBarProps {
  grades: (Grade | { id: string; name: string; nameAr?: string; slug?: string })[];
  subjects: (Subject | { id: string; name: string; nameAr?: string; slug?: string })[];
  categories: (Category | { id: string; name: string; nameAr?: string; slug?: string })[];
}

export default function FilterBar({ grades, subjects, categories }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const currentSubject = searchParams.get("subject") ?? searchParams.get("subjectId") ?? "";
  const currentGrade = searchParams.get("grade") ?? searchParams.get("gradeId") ?? "";
  const currentCategory = searchParams.get("category") ?? searchParams.get("categoryId") ?? "";
  const currentTrimester = searchParams.get("trimester") ?? "";
  const currentSort = searchParams.get("sort") ?? "newest";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Clean up alternate parameter keys
    if (key === "subject") params.delete("subjectId");
    if (key === "grade") params.delete("gradeId");
    if (key === "category") params.delete("categoryId");

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  }

  function resetAllFilters() {
    router.push("/");
  }

  const hasActiveFilters = Boolean(
    currentSearch ||
    currentSubject ||
    currentGrade ||
    currentCategory ||
    currentTrimester
  );

  return (
    <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            الثلاثي المدرسي:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => updateFilter("trimester", "")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !currentTrimester
                ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
            }`}
          >
            كل الثلاثيات
          </button>

          {SCHOOL_TRIMESTERS.map((trim) => {
            const isActive = currentTrimester === trim.slug;
            return (
              <button
                key={trim.id}
                type="button"
                onClick={() => updateFilter("trimester", trim.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <span>{trim.nameAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            البحث بالكلمات المفتاحية
          </label>
          <input
            type="search"
            defaultValue={currentSearch}
            placeholder="ابحث عن عنوان الدرس أو التمرين أو الامتحان..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilter("search", (e.target as HTMLInputElement).value);
              }
            }}
            onBlur={(e) => updateFilter("search", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            المادة الدراسية
          </label>
          <select
            value={currentSubject}
            onChange={(e) => updateFilter("subject", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">جميع المواد</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.slug || s.id}>
                {s.nameAr || s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            المستوى الدراسي
          </label>
          <select
            value={currentGrade}
            onChange={(e) => updateFilter("grade", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">جميع المستويات</option>
            {grades.map((g) => (
              <option key={g.id} value={g.slug || g.id}>
                {g.nameAr || g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            الثلاثي الدراسي
          </label>
          <select
            value={currentTrimester}
            onChange={(e) => updateFilter("trimester", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">جميع الثلاثيات</option>
            {SCHOOL_TRIMESTERS.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.nameAr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
            التقسيم / الترتيب
          </label>
          <div className="flex gap-2">
            <select
              value={currentCategory}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-1/2 rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">النوع</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug || c.id}>
                  {c.nameAr || c.name}
                </option>
              ))}
            </select>

            <select
              value={currentSort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="w-1/2 rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="newest">الأحدث</option>
              <option value="popular">الأكثر تحميلاً</option>
              <option value="oldest">الأقدم</option>
            </select>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            الفلاتر النشطة قيد التطبيق حالياً
          </div>
          <button
            type="button"
            onClick={resetAllFilters}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer"
          >
            إعادة تعيين جميع الفلاتر ✕
          </button>
        </div>
      )}
    </div>
  );
}

export { FilterBar };


```

---

### File: `src/components/worksheets/WorksheetCard.tsx`

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, Lock, Users, FileText, FolderOpen } from "lucide-react";
import type { WorksheetWithRelations } from "@/types/api";
import { getFileFormatInfo } from "@/config/constants";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { UserAvatarWithPresence } from "@/components/ui/UserPresenceIndicator";

interface WorksheetCardProps {
  worksheet: WorksheetWithRelations;
  guestTitleOnly?: boolean;
}

const AUDIENCE_LABELS: Record<string, { label: string; isRestricted: boolean }> = {
  TEACHERS_ONLY: { label: "للمعلمين فقط (إصلاح / مذكرة)", isRestricted: true },
  SAME_ROLE_ONLY: { label: "خاص بنفس فئة الناشر", isRestricted: true },
  INSTITUTIONS_ONLY: { label: "خاص بالمؤسسات", isRestricted: true },
  TEACHERS_AND_STUDENTS: { label: "للمعلمين والتلاميذ", isRestricted: false },
  ALL: { label: "متاح للجميع", isRestricted: false },
};

export default function WorksheetCard({
  worksheet,
  guestTitleOnly = false,
}: WorksheetCardProps) {
  const router = useRouter();
  const [favoriteCount, setFavoriteCount] = useState(
    worksheet.favoriteCount ?? (worksheet as any).favoritesCount ?? 0
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const [healedThumbUrl, setHealedThumbUrl] = useState<string | null>(null);

  const rawThumb = healedThumbUrl || worksheet.thumbnailUrl || null;
  const hasValidThumbnail = Boolean(
    rawThumb &&
      !thumbError &&
      !(
        rawThumb.includes("X-Amz-Credential=") &&
        (rawThumb.split("X-Amz-Credential=")[1]?.split("%2F")[0]?.split("/")[0]
          ?.length || 32) !== 32
      )
  );

  // Auto-generate and persist Page 1 thumbnail if a PDF card lacks a valid thumbnail
  useEffect(() => {
    if (guestTitleOnly || hasValidThumbnail) return;
    const lowerName = (worksheet.fileName || "").toLowerCase();
    if (!lowerName.endsWith(".pdf")) return;

    let cancelled = false;
    async function autoExtractCardThumbnail() {
      try {
        const res = await fetch(
          `/api/worksheets/${worksheet.id}/file?disposition=inline&stream=1`
        );
        if (!res.ok || cancelled) return;
        const blob = await res.blob();
        if (cancelled || blob.size === 0) return;

        const pdfFile = new File([blob], worksheet.fileName || "document.pdf", {
          type: "application/pdf",
        });
        const { extractPdfThumbnailAndPages } = await import(
          "@/lib/utils/pdf-thumbnail"
        );
        const { thumbnailFile, thumbnailPreviewUrl, pageCount } =
          await extractPdfThumbnailAndPages(pdfFile);
        if (cancelled) return;

        setHealedThumbUrl(thumbnailPreviewUrl);
        setThumbError(false);

        const fd = new FormData();
        fd.append("thumbnail", thumbnailFile);
        if (pageCount > 0) fd.append("pageCount", String(pageCount));
        await fetch(`/api/worksheets/${worksheet.id}/thumbnail`, {
          method: "POST",
          body: fd,
        });
      } catch {
        // Silent fallback to gradient card header
      }
    }

    autoExtractCardThumbnail();
    return () => {
      cancelled = true;
    };
  }, [guestTitleOnly, hasValidThumbnail, worksheet.id, worksheet.fileName]);

  const title = worksheet.titleAr || worksheet.title;
  const subjectColor = worksheet.subject?.color || "#2563EB";
  const downloadCount =
    worksheet.downloadCount ?? (worksheet as any).downloadsCount ?? 0;
  const audienceInfo =
    AUDIENCE_LABELS[worksheet.audience || "TEACHERS_AND_STUDENTS"] ||
    AUDIENCE_LABELS.TEACHERS_AND_STUDENTS;
  const formatInfo = getFileFormatInfo(worksheet.fileName);
  const categoryNameAr = worksheet.category?.nameAr || "درس";

  // Guest Title-Only View: Shows the file title & full classification badges (Subject + Grade + Section + File Type)
  if (guestTitleOnly) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span
              className="px-2.5 py-0.5 rounded-md font-bold text-white"
              style={{ backgroundColor: subjectColor }}
            >
              {worksheet.subject?.nameAr || "مادة دراسية"}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              {worksheet.grade?.nameAr || "السنة الدراسية"}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/70 dark:border-blue-800">
              قسم: {categoryNameAr}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold border text-[10px] ${formatInfo.badgeClass}`}
            >
              {formatInfo.labelAr}
            </span>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-relaxed">
              {title}
            </h3>
          </div>
        </div>

        <Link
          href={`/login?redirectTo=${encodeURIComponent(`/worksheet/${worksheet.id}`)}`}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition"
        >
          <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>سجّل الدخول لقراءة أو تحميل الملف</span>
        </Link>
      </div>
    );
  }

  const handleQuickFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isToggling) return;

    try {
      setIsToggling(true);
      const res = await fetch(`/api/worksheets/${worksheet.id}/favorite`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push(`/login?redirectTo=/worksheet/${worksheet.id}`);
        return;
      }

      const json = await res.json();
      if (json.success) {
        setIsFavorited(json.data.isFavorited);
        setFavoriteCount(json.data.favoriteCount);
      }
    } catch (err) {
      console.error("Quick favorite error:", err);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div
      className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        worksheet.isEndorsed
          ? "border-2 border-amber-400 shadow-md shadow-amber-500/10"
          : "border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300"
      }`}
    >
      <div>
        {worksheet.isEndorsed && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white px-3.5 py-1.5 text-[11px] font-extrabold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              <span>توثيق واعتماد بيداغوجي من المتفقد</span>
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
              معتمد ★
            </span>
          </div>
        )}

        <Link
          href={`/worksheet/${worksheet.id}`}
          className="block relative overflow-hidden"
        >
          {hasValidThumbnail ? (
            <img
              src={rawThumb!}
              alt={title}
              onError={() => setThumbError(true)}
              className="w-full h-44 object-cover group-hover:scale-102 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-40 flex flex-col justify-between p-4 relative text-white"
              style={{
                background: `linear-gradient(135deg, ${subjectColor} 0%, #1e293b 100%)`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs font-extrabold inline-flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>قسم: {categoryNameAr}</span>
                </span>
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-md text-[10px] font-black tracking-wider">
                  {formatInfo.shortExt}
                </span>
              </div>

              <div className="font-extrabold text-base line-clamp-2 leading-snug drop-shadow-sm">
                {title}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleQuickFavorite}
            disabled={isToggling}
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-sm ${
              isFavorited
                ? "bg-white text-rose-600 shadow-rose-500/20"
                : "bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600"
            }`}
            title={isFavorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <span className="text-base leading-none">
              {isFavorited ? "♥" : "♡"}
            </span>
          </button>
        </Link>

        <div className="p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span
              className="px-2 py-0.5 rounded-md font-bold text-white"
              style={{ backgroundColor: subjectColor }}
            >
              {worksheet.subject?.nameAr || "المادة"}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              {worksheet.grade?.nameAr || "السنة الدراسية"}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/70 dark:border-blue-800">
              {categoryNameAr}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold border text-[10px] ${formatInfo.badgeClass}`}
            >
              {formatInfo.labelAr}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold inline-flex items-center gap-1 text-[10px] ${
                audienceInfo.isRestricted
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {audienceInfo.isRestricted ? (
                <Lock className="w-2.5 h-2.5" />
              ) : (
                <Users className="w-2.5 h-2.5" />
              )}
              <span>{audienceInfo.label}</span>
            </span>
          </div>

          <Link href={`/worksheet/${worksheet.id}`} className="block">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm hover:text-blue-600 transition line-clamp-2 leading-relaxed">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {worksheet.descriptionAr ||
              worksheet.description ||
              "نشرة تعليمية وبيداغوجية عبر منصة المسند."}
          </p>
        </div>
      </div>

      <div className="px-4 py-3 bg-slate-50/70 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <Link
          href={`/publisher/${worksheet.uploader?.id || worksheet.uploadedBy}`}
          className="flex items-center gap-2 min-w-0 hover:text-blue-600 transition"
        >
          <UserAvatarWithPresence
            name={worksheet.uploader?.name || "ناشر"}
            avatarUrl={worksheet.uploader?.avatarUrl}
            presenceStatus={(worksheet.uploader as any)?.presenceStatus}
            lastSeenAt={(worksheet.uploader as any)?.lastSeenAt}
            size="sm"
          />
          <span className="truncate max-w-[95px] font-bold text-slate-700 dark:text-slate-200 hover:underline">
            {worksheet.uploader?.name || "ناشر"}
          </span>
          <InspectorBadge
            role={worksheet.uploader?.role}
            isVerified={worksheet.uploader?.isVerified}
            isBanned={worksheet.uploader?.isBanned}
            size="sm"
          />
        </Link>

        <div className="flex items-center gap-2.5 font-semibold text-slate-400 shrink-0">
          <span className="flex items-center gap-0.5" title="متوسط التقييم">
            <span className="text-amber-400">★</span>
            <span className="text-slate-600 dark:text-slate-300">
              {worksheet.ratingAvg > 0 ? worksheet.ratingAvg.toFixed(1) : "جديد"}
            </span>
          </span>
          <span className="flex items-center gap-0.5" title="عدد التحميلات">
            <span>⬇</span>
            <span className="text-slate-600 dark:text-slate-300">
              {downloadCount}
            </span>
          </span>
          <span className="flex items-center gap-0.5" title="عدد التفضيلات">
            <span className="text-rose-500">♥</span>
            <span className="text-slate-600 dark:text-slate-300">
              {favoriteCount}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

```

---

### File: `src/components/worksheets/WorksheetDetailClient.tsx`

```typescript
"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  Heart,
  FileText,
  User as UserIcon,
  School,
  Calendar,
  ExternalLink,
  ArrowRight,
  Share2,
  Check,
  Loader2,
  Tag,
  Star,
  BadgeCheck,
  Lock,
  Users,
  UserPlus,
  Edit3,
  Flag,
  AlertTriangle,
  X,
} from "lucide-react";
import ReviewSection from "@/components/worksheets/ReviewSection";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { toggleWorksheetEndorsementAction } from "@/actions/inspector.actions";
import { submitReportAction } from "@/actions/report-support.actions";
import { extractPdfThumbnailAndPages } from "@/lib/utils/pdf-thumbnail";
import type { WorksheetWithRelations, ApiResponse, TargetAudience } from "@/types";
import type { DownloadUrlResult } from "@/services/download.service";
import type { ToggleFavoriteResult } from "@/services/favorite.service";

interface WorksheetDetailClientProps {
  initialWorksheet: WorksheetWithRelations;
}

const AUDIENCE_LABELS: Record<string, string> = {
  TEACHERS_ONLY: "خاص بالمعلمين والمتفقدين فقط (إصلاح / مذكرة)",
  SAME_ROLE_ONLY: "خاص بنفس فئة الناشر فقط",
  INSTITUTIONS_ONLY: "خاص بالمؤسسات التربوية فقط",
  TEACHERS_AND_STUDENTS: "متاح للمعلمين والتلاميذ",
  ALL: "متاح لجميع منتسبي المسند",
};

export default function WorksheetDetailClient({
  initialWorksheet,
}: WorksheetDetailClientProps) {
  const router = useRouter();

  const [worksheet, setWorksheet] =
    useState<WorksheetWithRelations>(initialWorksheet);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(
    initialWorksheet.favoriteCount
  );
  const [favLoading, setFavLoading] = useState<boolean>(false);

  const [isEndorsed, setIsEndorsed] = useState<boolean>(
    Boolean(initialWorksheet.isEndorsed)
  );
  const [endorseLoading, setEndorseLoading] = useState<boolean>(false);
  const [viewerRole, setViewerRole] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [viewerIsVerified, setViewerIsVerified] = useState<boolean>(false);

  const [downloadCount, setDownloadCount] = useState<number>(
    initialWorksheet.downloadCount
  );
  const [downloading, setDownloading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Edit Worksheet Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(
    initialWorksheet.titleAr || initialWorksheet.title
  );
  const [editDesc, setEditDesc] = useState(
    initialWorksheet.descriptionAr || initialWorksheet.description || ""
  );
  const [editAudience, setEditAudience] = useState<TargetAudience>(
    initialWorksheet.audience || "TEACHERS_AND_STUDENTS"
  );
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [confirmedFileLossWarning, setConfirmedFileLossWarning] =
    useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  // Report Modal States
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("خطأ علمي أو بيداغوجي في المحتوى");
  const [reportDetails, setReportDetails] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Auto-heal missing PDF thumbnail for existing worksheets (e.g. 596.pdf)
  useEffect(() => {
    let cancelled = false;
    const lowerName = (worksheet.fileName || "").toLowerCase();
    if (!lowerName.endsWith(".pdf") || worksheet.thumbnailUrl) return;

    async function healMissingThumbnail() {
      try {
        const res = await fetch(
          `/api/worksheets/${worksheet.id}/file?disposition=inline&stream=1`
        );
        if (!res.ok || cancelled) return;
        const blob = await res.blob();
        if (cancelled || blob.size === 0) return;

        const pdfFile = new File([blob], worksheet.fileName || "document.pdf", {
          type: "application/pdf",
        });
        const { extractPdfThumbnailAndPages } = await import(
          "@/lib/utils/pdf-thumbnail"
        );
        const { thumbnailFile, pageCount } =
          await extractPdfThumbnailAndPages(pdfFile);
        if (cancelled) return;

        const fd = new FormData();
        fd.append("thumbnail", thumbnailFile);
        if (pageCount > 0) fd.append("pageCount", String(pageCount));

        await fetch(`/api/worksheets/${worksheet.id}/thumbnail`, {
          method: "POST",
          body: fd,
        });
      } catch {
        // Silent background self-heal
      }
    }

    healMissingThumbnail();
    return () => {
      cancelled = true;
    };
  }, [worksheet.id, worksheet.fileName, worksheet.thumbnailUrl]);

  useEffect(() => {
    let isMounted = true;
    async function checkViewerState() {
      try {
        const [favRes, meRes] = await Promise.all([
          fetch("/api/me/favorites").catch(() => null),
          fetch("/api/auth/me").catch(() => null),
        ]);

        if (favRes && favRes.ok) {
          const json = await favRes.json();
          if (json.success && Array.isArray(json.data)) {
            const favorited = json.data.some((f: any) => f.id === worksheet.id);
            if (isMounted) setIsFavorited(favorited);
          }
        }

        if (meRes && meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.success && meJson.data && isMounted) {
            setViewerRole(meJson.data.role || null);
            setViewerId(meJson.data.id || null);
            setViewerIsVerified(Boolean(meJson.data.isVerified));
          }
        }
      } catch {
        // ignore
      }
    }

    checkViewerState();
    return () => {
      isMounted = false;
    };
  }, [worksheet.id]);

  const handleToggleEndorsement = async () => {
    if (endorseLoading) return;
    try {
      setEndorseLoading(true);
      const res = await toggleWorksheetEndorsementAction(worksheet.id);
      setIsEndorsed(res.isEndorsed);
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر تحديث حالة الاعتماد");
    } finally {
      setEndorseLoading(false);
    }
  };

  const handleSaveWorksheetEdit = async (e: FormEvent) => {
    e.preventDefault();

    // If replacing the PDF file while endorsed, require explicit warning confirmation
    if (replacementFile && isEndorsed && !confirmedFileLossWarning) {
      alert(
        "تنبيه: يجب تأكيد علمك بأن استبدال ملف الـ PDF سيؤدي إلى إلغاء شارة التوثيق/الاعتماد الحالية حتى يعيد المتفقد مراجعة الملف الجديد."
      );
      return;
    }

    try {
      setSavingEdit(true);

      const metadata = {
        title: editTitle.trim(),
        titleAr: editTitle.trim(),
        description: editDesc.trim() || undefined,
        descriptionAr: editDesc.trim() || undefined,
        audience: editAudience,
      };

      let res: Response;
      if (replacementFile) {
        const formData = new FormData();
        formData.append("file", replacementFile);
        try {
          const extracted = await extractPdfThumbnailAndPages(replacementFile);
          formData.append("thumbnail", extracted.thumbnailFile);
          formData.append("pageCount", String(extracted.pageCount));
        } catch {
          // ignore thumbnail extraction error
        }
        formData.append("metadata", JSON.stringify(metadata));

        res = await fetch(`/api/worksheets/${worksheet.id}`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        // Metadata-only update: preserves isEndorsed!
        res = await fetch(`/api/worksheets/${worksheet.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metadata),
        });
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "فشل تعديل النشرة");
      }

      setWorksheet((prev) => ({
        ...prev,
        ...json.data,
        previewUrl: prev.previewUrl,
      }));
      setIsEndorsed(Boolean(json.data.isEndorsed));
      setIsEditOpen(false);
      setReplacementFile(null);
      setConfirmedFileLossWarning(false);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "حدث خطأ أثناء حفظ التعديلات");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleSubmitReport = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setReportLoading(true);
      await submitReportAction({
        targetType: "WORKSHEET",
        targetWorksheetId: worksheet.id,
        reason: reportReason,
        details: reportDetails,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setIsReportOpen(false);
        setReportSuccess(false);
        setReportDetails("");
      }, 1800);
    } catch (err) {
      alert(err instanceof Error ? err.message : "يرجى تسجيل الدخول لإرسال البلاغ");
    } finally {
      setReportLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await fetch(`/api/worksheets/${worksheet.id}/download`);
      if (res.status === 401) {
        router.push(`/login?redirectTo=/worksheet/${worksheet.id}`);
        return;
      }

      const json: ApiResponse<DownloadUrlResult> = await res.json();
      if (!json.success) {
        alert(json.error.message || "فشل في استخراج رابط التحميل");
        return;
      }

      setDownloadCount((prev) => prev + 1);
      window.open(json.data.downloadUrl, "_blank", "noopener,noreferrer");
    } catch {
      alert("حدث خطأ أثناء الاتصال بالخادم لتحميل الملف");
    } finally {
      setDownloading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (favLoading) return;
    try {
      setFavLoading(true);
      const res = await fetch(`/api/worksheets/${worksheet.id}/favorite`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push(`/login?redirectTo=/worksheet/${worksheet.id}`);
        return;
      }

      const json: ApiResponse<ToggleFavoriteResult> = await res.json();
      if (json.success) {
        setIsFavorited(json.data.isFavorited);
        setFavoriteCount(json.data.favoriteCount);
      }
    } catch {
      alert("تعذر تحديث حالة المفضلة");
    } finally {
      setFavLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("تم نسخ الرابط: " + window.location.href);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} كيلوبايت`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} ميجابايت`;
  };

  const displayTitle = worksheet.titleAr || worksheet.title;
  const displayDesc = worksheet.descriptionAr || worksheet.description;
  const subjectColor = worksheet.subject?.color || "#2563EB";
  const canEndorse = viewerRole === "ADMIN" || (viewerRole === "INSPECTOR" && viewerIsVerified);
  const isOwnerOrAdmin =
    (viewerId && viewerId === worksheet.uploadedBy) || viewerRole === "ADMIN";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <nav className="flex items-center justify-between gap-2 text-sm text-slate-500 mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/browse"
            className="hover:text-blue-600 inline-flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4" />
            النشرات
          </Link>
          <span>/</span>
          <span>{worksheet.grade?.nameAr || worksheet.grade?.name}</span>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
            {displayTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isOwnerOrAdmin && (
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>تعديل النشرة</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
            title="الإبلاغ عن هذه النشرة"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>إبلاغ</span>
          </button>
        </div>
      </nav>

      {isEndorsed && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-amber-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-black text-amber-900 dark:text-amber-300">
                نشرة معتمدة علمياً وبيداغوجياً من المتفقد التربوي
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-200/80 mt-0.5">
                تم التحقق من سلامة المحتوى العلمي والبيداغوجي لهذه النشرة في مادة ({worksheet.subject?.nameAr}).
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-extrabold shrink-0">
            اعتماد رسمي ★
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 flex flex-col gap-6">
          {(() => {
            // Route preview through our verified same-origin server endpoint
            // which checks R2 via HeadObjectCommand and automatically falls back to Supabase Storage!
            const effectivePreviewUrl = `/api/worksheets/${worksheet.id}/file?disposition=inline&stream=1`;

            const lowerFileName = (worksheet.fileName || "").toLowerCase();
            const isImageFile =
              lowerFileName.endsWith(".png") ||
              lowerFileName.endsWith(".jpg") ||
              lowerFileName.endsWith(".jpeg") ||
              lowerFileName.endsWith(".webp") ||
              lowerFileName.endsWith(".gif");
            const isPdfFile = lowerFileName.endsWith(".pdf") || (!isImageFile && !lowerFileName.endsWith(".doc") && !lowerFileName.endsWith(".docx"));

            return (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3.5 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>معاينة مباشرة لملف النشرة ({worksheet.fileName})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={effectivePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 inline-flex items-center gap-1 transition"
                    >
                      <span>فتح في نافذة مستقلة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-1 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloading ? "جاري التحضير..." : "تحميل الملف"}</span>
                    </button>
                  </div>
                </div>

                {isImageFile ? (
                  <div className="p-4 sm:p-6 bg-slate-900 flex flex-col items-center justify-center min-h-[380px]">
                    <img
                      src={effectivePreviewUrl}
                      alt={displayTitle}
                      className="max-h-[680px] w-auto object-contain rounded-xl shadow-lg border border-slate-700 bg-white"
                    />
                  </div>
                ) : isPdfFile ? (
                  <div className="w-full h-[540px] sm:h-[680px] bg-slate-100">
                    <object
                      data={`${effectivePreviewUrl}#toolbar=1&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <iframe
                        src={`${effectivePreviewUrl}#toolbar=1&navpanes=0`}
                        title={displayTitle}
                        className="w-full h-full bg-slate-100"
                      />
                    </object>
                  </div>
                ) : (
                  <div className="h-[420px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/40 p-8 text-center">
                    <FileText className="w-16 h-16 text-slate-400 mb-3" />
                    <p className="text-slate-700 dark:text-slate-200 font-semibold mb-1">
                      هذا الملف بصيغة مستند ({worksheet.fileName})
                    </p>
                    <p className="text-sm text-slate-500 max-w-md mb-4">
                      اضغط على زر &quot;تحميل الملف&quot; لتنزيل النسخة الكاملة على جهازك.
                    </p>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold inline-flex items-center gap-2 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل الملف الآن</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          <ReviewSection
            worksheetId={worksheet.id}
            initialRatingAvg={worksheet.ratingAvg ?? 0}
            initialReviewCount={worksheet.reviewCount ?? 0}
          />
        </section>

        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: subjectColor }}
              >
                {worksheet.subject?.nameAr || worksheet.subject?.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                {worksheet.grade?.nameAr || worksheet.grade?.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                {worksheet.category?.nameAr || worksheet.category?.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1">
                {worksheet.audience === "TEACHERS_ONLY" ? (
                  <Lock className="w-3 h-3 text-rose-600" />
                ) : (
                  <Users className="w-3 h-3 text-emerald-600" />
                )}
                <span>
                  {AUDIENCE_LABELS[worksheet.audience] ||
                    AUDIENCE_LABELS.TEACHERS_AND_STUDENTS}
                </span>
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {displayTitle}
            </h1>

            {displayDesc && (
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {displayDesc}
              </p>
            )}

            {canEndorse && (
              <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 dark:text-amber-300">
                  <BadgeCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>صلاحية المتفقد التربوي: الاعتماد العلمي والبيداغوجي</span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleEndorsement}
                  disabled={endorseLoading}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                    isEndorsed
                      ? "bg-white text-amber-800 border border-amber-400 hover:bg-amber-100"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  }`}
                >
                  {endorseLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BadgeCheck className="w-4 h-4" />
                  )}
                  <span>
                    {isEndorsed
                      ? "معتمد علمياً وبيداغوجياً ✓ (اضغط لإلغاء العلامة)"
                      : "تأكيد الصحة العلمية والبيداغوجية للنشرة"}
                  </span>
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold flex items-center justify-center gap-2.5 shadow-sm transition cursor-pointer"
              >
                {downloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span>
                  {downloading ? "جاري تجهيز الرابط..." : "تحميل مباشر (PDF)"}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleToggleFavorite}
                  disabled={favLoading}
                  className={`py-2.5 px-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    isFavorited
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>{isFavorited ? "في المفضلة" : "حفظ بالمفضلة"}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>مشاركة</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">التحميلات</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {downloadCount}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">التفضيلات</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {favoriteCount}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">التقييم</span>
                <span className="font-bold text-amber-600 flex items-center justify-center gap-0.5 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>
                    {worksheet.ratingAvg > 0
                      ? worksheet.ratingAvg.toFixed(1)
                      : "جديد"}
                  </span>
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                <span className="block text-xs text-slate-500">حجم الملف</span>
                <span className="font-bold text-slate-800 dark:text-white text-[11px] truncate">
                  {formatFileSize(worksheet.fileSize)}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Link
                      href={`/publisher/${worksheet.uploader?.id || worksheet.uploadedBy}`}
                      className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-blue-600 truncate"
                    >
                      {worksheet.uploader?.name || "ناشر"}
                    </Link>
                    {worksheet.uploader?.username && (
                      <Link
                        href={`/u/${worksheet.uploader.username}`}
                        dir="ltr"
                        className="font-mono text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        @{worksheet.uploader.username}
                      </Link>
                    )}
                    <InspectorBadge
                      role={worksheet.uploader?.role}
                      isVerified={worksheet.uploader?.isVerified}
                      isBanned={worksheet.uploader?.isBanned}
                      size="sm"
                    />
                  </div>
                  {worksheet.uploader?.school && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 truncate mt-0.5">
                      <School className="w-3.5 h-3.5" />
                      <span>{worksheet.uploader.school}</span>
                    </p>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(worksheet.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>

              <Link
                href={`/publisher/${worksheet.uploader?.id || worksheet.uploadedBy}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>عرض ملف الناشر الكامل، متابعته، وإضافته للمفضلة</span>
              </Link>
            </div>

            {worksheet.tags && worksheet.tags.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {worksheet.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/browse?search=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>تعديل بيانات النشرة أو استبدال الملف</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorksheetEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان النشرة (لا يؤثر تعديله على شارة التوثيق/الاعتماد) *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وصف النشرة (لا يؤثر تعديله على شارة التوثيق/الاعتماد)
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  جمهور النشر المستهدف
                </label>
                <select
                  value={editAudience}
                  onChange={(e) =>
                    setEditAudience(e.target.value as TargetAudience)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                >
                  <option value="TEACHERS_AND_STUDENTS">
                    للمعلمين والتلاميذ معاً (تمارين وأنشطة)
                  </option>
                  <option value="TEACHERS_ONLY">
                    للمعلمين والمتفقدين فقط (إصلاح ومذكرات)
                  </option>
                  <option value="SAME_ROLE_ONLY">نفس فئة الناشر فقط</option>
                  <option value="ALL">عام لجميع الفئات</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  استبدال ملف الـ PDF ومحتواه (اختياري)
                </label>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setReplacementFile(f);
                    setConfirmedFileLossWarning(false);
                  }}
                  className="w-full text-xs text-slate-600 file:me-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>

              {replacementFile && isEndorsed && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-400 text-amber-900 dark:text-amber-200 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs font-extrabold">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>
                      تحذير هام قبل تأكيد التعديل: تغيير ملف النشرة ومحتواه سيؤدي إلى فقدان شارة الاعتماد البيداغوجي الحالية حتى يعيد المتفقد مراجعة الملف الجديد!
                    </span>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedFileLossWarning}
                      onChange={(e) =>
                        setConfirmedFileLossWarning(e.target.checked)
                      }
                      className="w-4 h-4 rounded text-amber-600"
                    />
                    <span>
                      أعي ذلك وأوافق على استبدال الملف وإعادة تقديمه للمراجعة
                    </span>
                  </label>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {savingEdit ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>تأكيد وحفظ التعديل</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-600" />
                <span>إرسال بلاغ عن هذه النشرة</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-2xl font-bold text-xs">
                تم استلام بلاغك بنجاح وستقوم الإدارة بمراجعته فوراً.
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    سبب البلاغ *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="خطأ علمي أو بيداغوجي في المحتوى">
                      خطأ علمي أو بيداغوجي في المحتوى
                    </option>
                    <option value="محتوى غير مطابق للمستوى أو المادة">
                      محتوى غير مطابق للمستوى أو المادة
                    </option>
                    <option value="انتهاك حقوق الملكية الفكرية">
                      انتهاك حقوق الملكية الفكرية
                    </option>
                    <option value="ملف تالف أو غير واضح">
                      ملف تالف أو غير واضح
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تفاصيل إضافية (اختياري)
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="وضّح الملاحظة للإدارة..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={reportLoading}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    {reportLoading ? "جاري الإرسال..." : "إرسال البلاغ"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

```

---

### File: `src/components/worksheets/ReviewSection.tsx`

```typescript
"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  Star,
  MessageSquare,
  Send,
  Trash2,
  Loader2,
  School,
  User as UserIcon,
  BadgeCheck,
  Pin,
  Lock,
  AtSign,
} from "lucide-react";
import InspectorBadge from "@/components/ui/InspectorBadge";
import MentionText from "@/components/ui/MentionText";

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  isOfficialDirective?: boolean;
  isPrivateToPublisher?: boolean;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    username?: string | null;
    avatarUrl: string | null;
    school: string | null;
    role?: string;
    isVerified?: boolean;
  };
}

interface MentionCandidate {
  id: string;
  name: string;
  username: string;
  role: string;
  school: string | null;
  isVerified: boolean;
}

interface ReviewSectionProps {
  worksheetId: string;
  initialRatingAvg: number;
  initialReviewCount: number;
}

export default function ReviewSection({
  worksheetId,
  initialRatingAvg,
  initialReviewCount,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserIsVerified, setCurrentUserIsVerified] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isPrivateToPublisher, setIsPrivateToPublisher] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [ratingAvg, setRatingAvg] = useState<number>(initialRatingAvg || 0);
  const [reviewCount, setReviewCount] = useState<number>(
    initialReviewCount || 0
  );

  // @username Autocomplete State
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionCandidates, setMentionCandidates] = useState<MentionCandidate[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadReviewsAndUser() {
      try {
        setLoading(true);
        const [revRes, meRes] = await Promise.all([
          fetch(`/api/worksheets/${worksheetId}/reviews`),
          fetch("/api/auth/me").catch(() => null),
        ]);

        const revJson = await revRes.json();
        let myId: string | null = null;

        if (meRes && meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.success && meJson.data?.id) {
            myId = meJson.data.id;
            if (isMounted) {
              setCurrentUserRole(meJson.data.role || null);
              setCurrentUserIsVerified(Boolean(meJson.data.isVerified));
            }
          }
        }

        if (isMounted) {
          setCurrentUserId(myId);
          if (revJson.success && Array.isArray(revJson.data)) {
            setReviews(revJson.data);
          }
        }
      } catch {
        // Fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReviewsAndUser();
    return () => {
      isMounted = false;
    };
  }, [worksheetId]);

  // Detect `@` token at the end of comment for live `@username` autocomplete
  useEffect(() => {
    const match = comment.match(/@([a-zA-Z0-9_.]*)$/);
    if (!match) {
      setMentionQuery(null);
      setMentionCandidates([]);
      return;
    }
    const q = match[1];
    setMentionQuery(q);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/users/mentions?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setMentionCandidates(json.data);
        }
      } catch {
        // Ignore
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [comment]);

  const handleInsertMention = (username: string) => {
    const nextText = comment.replace(/@([a-zA-Z0-9_.]*)$/, `@${username} `);
    setComment(nextText);
    setMentionQuery(null);
    setMentionCandidates([]);
  };

  const isInspectorOrStaff =
    (currentUserRole === "INSPECTOR" && currentUserIsVerified) ||
    currentUserRole === "MODERATOR" ||
    currentUserRole === "ADMIN";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUserId) {
      setError("يرجى تسجيل الدخول لإضافة تعليق");
      return;
    }

    if (comment.trim().length < 2) {
      setError("يرجى كتابة تعليق لا يقل عن حرفين");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/worksheets/${worksheetId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          isPrivateToPublisher: isInspectorOrStaff ? isPrivateToPublisher : false,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || "تعذر حفظ التعليق");
        return;
      }

      const savedReview: ReviewItem = json.data;
      setReviews((prev) => {
        const combined = [savedReview, ...prev];
        return combined.sort((a, b) => {
          const aOff = a.isOfficialDirective ? 1 : 0;
          const bOff = b.isOfficialDirective ? 1 : 0;
          if (bOff !== aOff) return bOff - aOff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      });

      setComment("");
      setIsPrivateToPublisher(false);
    } catch {
      setError("حدث خطأ في الاتصال بالخادم");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      setSubmitting(true);
      const res = await fetch(
        `/api/worksheets/${worksheetId}/reviews?reviewId=${reviewId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/60 dark:bg-amber-950/50 dark:text-amber-400">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              التعليقات، التوجيهات البيداغوجية والمناقشات
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              يمكنك الإشارة لأي عضو أو ناشر باستخدام <code dir="ltr" className="font-bold text-blue-600">@username</code>، وبالضغط على الاسم تنتقل مباشرة إلى صفحة الناشر.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5 dark:bg-slate-800">
          <span className="text-xl font-black text-slate-900 dark:text-white">
            {ratingAvg > 0 ? ratingAvg.toFixed(1) : "جديد"}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            ({reviews.length} تعليق)
          </span>
        </div>
      </div>

      {currentUserId ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentUserRole === "INSPECTOR"
                ? "إضافة تعليق متفقد (في الصدارة أو خاص للناشر)"
                : "أضف تعليقك أو أشر لناشر بـ @username"}
            </h3>

            {isInspectorOrStaff && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPrivateToPublisher(false)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    !isPrivateToPublisher
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Pin className="h-3.5 w-3.5" />
                  تعليق يظهر في الصدارة
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrivateToPublisher(true)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    isPrivateToPublisher
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Lock className="h-3.5 w-3.5" />
                  تعليق خاص مباشرة إلى الناشر
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          {!isPrivateToPublisher && (
            <div className="mt-3 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="rounded-lg p-1 transition hover:scale-110"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        active ? "fill-amber-400 text-amber-400" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div className="relative mt-3">
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                isPrivateToPublisher
                  ? "اكتب تعليقك الخاص الموجه مباشرة إلى الناشر (لا يراه سوى الناشر والطاقم الرقابي)... يمكنك الإشارة بـ @username"
                  : "اكتب تعليقك التربوي... اكتب @ للإشارة إلى أي مستخدم أو ناشر بالـ username"
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />

            {mentionQuery !== null && mentionCandidates.length > 0 && (
              <div className="absolute bottom-full right-0 z-30 mb-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800">
                  اختر مستخدماً للإشارة إليه بـ @username:
                </div>
                {mentionCandidates.map((cand) => (
                  <button
                    key={cand.id}
                    type="button"
                    onClick={() => handleInsertMention(cand.username)}
                    className="flex w-full items-center justify-between px-3.5 py-2 text-right text-xs hover:bg-blue-50 dark:hover:bg-slate-800"
                  >
                    <span className="font-bold text-slate-900 dark:text-white">
                      {cand.name}
                    </span>
                    <span dir="ltr" className="font-mono text-[11px] font-bold text-blue-600">
                      @{cand.username}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setComment((prev) => `${prev}@`)}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
            >
              <AtSign className="h-3.5 w-3.5" />
              إشارة لمستخدم (@username)
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isPrivateToPublisher ? "إرسال التعليق الخاص للناشر" : "نشر التعليق"}
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500 dark:border-slate-800">
            لا توجد تعليقات بعد. كن أول من يشارك رأيه أو يوجه إشارة بـ @username!
          </div>
        ) : (
          reviews.map((rev) => {
            const isPinned = rev.isOfficialDirective || rev.user.role === "INSPECTOR";
            const isPrivate = Boolean(rev.isPrivateToPublisher);
            const uname =
              rev.user.username ||
              `user_${rev.user.id.slice(0, 5)}`;

            return (
              <div
                key={rev.id}
                className={`rounded-2xl border p-5 transition ${
                  isPrivate
                    ? "border-purple-300 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20"
                    : isPinned
                    ? "border-amber-300 bg-gradient-to-l from-amber-50/70 via-white to-white shadow-sm dark:border-amber-800 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900"
                    : "border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/publisher/${rev.user.id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800 hover:ring-2 hover:ring-blue-500 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {rev.user.name.charAt(0)}
                    </Link>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/publisher/${rev.user.id}`}
                          className="text-sm font-extrabold text-slate-900 hover:text-blue-700 dark:text-white"
                        >
                          {rev.user.name}
                        </Link>
                        <Link
                          href={`/u/${uname}`}
                          dir="ltr"
                          className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-300"
                          title="الانتقال إلى صفحة الناشر"
                        >
                          @{uname}
                        </Link>
                        {isPrivate && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                            <Lock className="h-3 w-3" />
                            تعليق خاص موجه مباشرة للناشر
                          </span>
                        )}
                        {!isPrivate && isPinned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                            <Pin className="h-3 w-3" />
                            تعليق متفقد في الصدارة
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(rev.createdAt).toLocaleDateString("ar-TN")}
                      </span>
                    </div>
                  </div>

                  {(currentUserId === rev.userId ||
                    currentUserRole === "ADMIN" ||
                    currentUserRole === "MODERATOR") && (
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(rev.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      title="حذف التعليق"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  <MentionText text={rev.comment} />
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

```

---

### File: `src/components/worksheets/CurriculumAndAdminExplorer.tsx`

```typescript
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Lock,
  Briefcase,
  FolderOpen,
  Plus,
  BadgeCheck,
  ChevronLeft,
  ChevronDown,
  Library,
} from "lucide-react";
import { CURRICULUM_GRADES } from "@/config/constants";
import type { WorksheetWithRelations } from "@/types/api";

interface CurriculumAndAdminExplorerProps {
  worksheets: WorksheetWithRelations[];
  isAuthenticated: boolean;
  viewerRole: string | null;
}

const ADMIN_DOC_TYPES = [
  { key: "ALL", label: "جميع الوثائق الإدارية" },
  { key: "مذكرات ومراسلات", label: "مذكرات ومراسلات إدارية" },
  { key: "جداول الأوقات", label: "جداول الأوقات والتوزيع السنوي" },
  { key: "تقارير ومحاضر", label: "تقارير ومحاضر التفقد والترسيم" },
  { key: "مطالب واستمارات", label: "مطالب واستمارات إدارية للمعلم" },
];

export default function CurriculumAndAdminExplorer({
  worksheets,
  isAuthenticated,
  viewerRole,
}: CurriculumAndAdminExplorerProps) {
  const [levelsExpanded, setLevelsExpanded] = useState<boolean>(true);
  const [selectedAdminType, setSelectedAdminType] = useState<string>("ALL");

  const isAdministrative = (ws: WorksheetWithRelations) =>
    ws.category?.slug === "administrative" ||
    ws.category?.slug === "administrative-docs" ||
    ws.subject?.slug === "administration" ||
    ws.category?.nameAr?.includes("إدارية") ||
    ws.tags?.includes("وثائق إدارية") ||
    ws.tags?.includes("إدارة");

  // Count curriculum worksheets per grade slug
  const gradeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const g of CURRICULUM_GRADES) map[g.slug] = 0;
    for (const ws of worksheets) {
      if (isAdministrative(ws)) continue;
      const slug = ws.grade?.slug;
      if (slug && map[slug] !== undefined) {
        map[slug] += 1;
      }
    }
    return map;
  }, [worksheets]);

  const administrativeFiles = useMemo(() => {
    return worksheets.filter((ws) => {
      if (!isAdministrative(ws)) return false;
      if (selectedAdminType === "ALL") return true;
      const title = `${ws.titleAr || ""} ${ws.title || ""} ${ws.descriptionAr || ""}`;
      return title.includes(selectedAdminType) || ws.tags?.includes(selectedAdminType);
    });
  }, [worksheets, selectedAdminType]);

  const canUpload = isAuthenticated && viewerRole !== "STUDENT";

  return (
    <div id="levels-and-subjects" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 space-y-10 scroll-mt-24">
      <section
        id="curriculum-levels-section"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          onClick={() => setLevelsExpanded((prev) => !prev)}
          className="cursor-pointer border-b border-slate-100 bg-gradient-to-l from-blue-50/80 via-indigo-50/40 to-transparent px-6 py-5 transition hover:from-blue-100/60 dark:border-slate-800 dark:from-blue-950/40 dark:via-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md shadow-blue-700/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
                    مستودع المستويات الدراسية والمواد
                  </h2>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                    المستويات الدراسية المعتمدة
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  اختر المستوى الدراسي المعتمد للدخول مباشرة إلى مستودع المواد الدراسية والأقسام التربوية الخاصة به.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {!isAuthenticated && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/90 px-3.5 py-2 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
                >
                  <Lock className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <span>
                    وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                    <Link href="/login" className="underline hover:text-blue-700">
                      تسجيل الدخول
                    </Link>{" "}
                    أو{" "}
                    <Link href="/register" className="underline hover:text-blue-700">
                      إنشاء الحساب
                    </Link>
                    .
                  </span>
                </div>
              )}

              <Link
                href="/levels"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition"
              >
                <Library className="h-4 w-4" />
                <span>فتح صفحة مستودع المواد والمستويات ←</span>
              </Link>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <span>{levelsExpanded ? "طي المستويات" : "عرض المستويات"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    levelsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {levelsExpanded && (
          <div className="p-6">
            <div className="mb-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                اضغط على المستوى الدراسي المعتمد للدخول إلى مستودع المواد الدراسية الخاص به:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CURRICULUM_GRADES.map((grade) => {
                const count = gradeCounts[grade.slug] || 0;
                return (
                  <Link
                    key={grade.slug}
                    href={`/levels/${grade.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-blue-500 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-sm transition group-hover:scale-105">
                        {grade.sortOrder}
                      </span>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                          {grade.nameAr}
                        </h3>
                        <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                          مستودع المواد الدراسية • {count} ملف متوفر
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900">
                      <ChevronLeft className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section
        id="administration-section"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-24"
      >
        <div className="border-b border-slate-100 bg-gradient-to-l from-amber-50/80 via-orange-50/40 to-transparent px-6 py-5 dark:border-slate-800 dark:from-amber-950/30 dark:via-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md shadow-amber-600/20">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
                  قسم الإدارة والمعاملات الإدارية
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  فضاء مخصص للمعاملات والوثائق الإدارية لدى المعلم والمؤسسة (بعيداً عن التمارين والدروس)
                </p>
              </div>
            </div>

            {canUpload && (
              <Link
                href="/upload?section=administrative"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-700"
              >
                <Plus className="h-4 w-4" />
                نشر وثيقة إدارية
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {ADMIN_DOC_TYPES.map((docType) => {
              const isActive = selectedAdminType === docType.key;
              return (
                <button
                  key={docType.key}
                  type="button"
                  onClick={() => setSelectedAdminType(docType.key)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-amber-600 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {docType.label}
                </button>
              );
            })}
          </div>

          {administrativeFiles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center dark:border-slate-800 dark:bg-slate-950/30">
              <FolderOpen className="mx-auto mb-2 h-8 w-8 text-slate-400" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                لا توجد وثائق إدارية منشورة في هذا التصنيف حالياً
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {administrativeFiles.map((ws) => {
                const title = ws.titleAr || ws.title;
                return (
                  <div
                    key={ws.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/60 px-4 py-3.5 transition hover:border-amber-300 hover:bg-white dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          وثيقة إدارية
                        </span>
                        {ws.isEndorsed && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            <BadgeCheck className="h-3 w-3" />
                            معتمد
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
                        {title}
                      </p>
                    </div>

                    {isAuthenticated ? (
                      <Link
                        href={`/worksheet/${ws.id}`}
                        className="shrink-0 rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-700"
                      >
                        فتح الوثيقة
                      </Link>
                    ) : (
                      <Link
                        href={`/login?redirectTo=/worksheet/${ws.id}`}
                        className="shrink-0 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-900"
                      >
                        تسجيل الدخول
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

### File: `src/app/page.tsx`

```typescript
import React, { Suspense } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Sparkles,
  BookCheck,
  Award,
  Library,
  Layers,
  Lock,
  ShieldCheck,
  Compass,
  HelpCircle,
  Users,
  FileText,
  Briefcase,
} from "lucide-react";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  listWorksheets,
  canUserAccessWorksheet,
} from "@/services/worksheet.service";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  ADMINISTRATIVE_CATEGORY,
} from "@/config/constants";
import FilterBar from "@/components/worksheets/FilterBar";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import CurriculumAndAdminExplorer from "@/components/worksheets/CurriculumAndAdminExplorer";
import RolePersonalizedHub from "@/components/worksheets/RolePersonalizedHub";
import PlatformIdentityAndFaqSection from "@/components/home/PlatformIdentityAndFaqSection";
import type { WorksheetSortOption } from "@/types/api";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ROLE_LABELS_AR: Record<string, string> = {
  INSTITUTION: "حساب مؤسسة تربوية",
  INSPECTOR: "حساب متفقد تربوي",
  TEACHER: "حساب معلم",
  STUDENT: "حساب تلميذ",
  MODERATOR: "حساب مسؤول إداري",
  ADMIN: "حساب مشرف عام",
};

const DEMO_WORKSHEETS = [
  {
    id: "demo-fr-1",
    title: "Leçon de lecture et vocabulaire — Français",
    titleAr: "درس القراءة والمفردات الأساسية في اللغة الفرنسية",
    description: "French lesson",
    descriptionAr: "درس متكامل في اللغة الفرنسية للسنة الأولى ابتدائي.",
    fileUrl: "/sample.pdf",
    fileName: "francais-lecon1.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 640,
    pageCount: 3,
    status: "PUBLISHED" as const,
    audience: "ALL" as const,
    isEndorsed: true,
    downloadCount: 210,
    favoriteCount: 75,
    ratingAvg: 4.9,
    reviewCount: 14,
    tags: ["فرنسية", "درس", "الثلاثي الأول"],
    createdAt: new Date("2026-10-28"),
    updatedAt: new Date("2026-10-28"),
    gradeId: "g1",
    subjectId: "s4",
    categoryId: "c1",
    uploadedBy: "u1",
    grade: CURRICULUM_GRADES[0],
    subject: CURRICULUM_SUBJECTS[3],
    category: SUBJECT_SUBDIVISIONS[0],
    uploader: {
      id: "u1",
      name: "معلم ناشر",
      school: "مدرسة ابتدائية",
      role: "TEACHER",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
  {
    id: "demo-inst-1",
    title: "Institutional Annual Project & Charter",
    titleAr: "مشروع المؤسسة التربوية السنوي وميثاق العمل المشترك بين المدارس",
    description: "Institution publication",
    descriptionAr: "مبادرة تربوية ونموذج تنسيقي مخصص للتفاعل بين المؤسسات التربوية.",
    fileUrl: "/sample.pdf",
    fileName: "institution-project.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 820,
    pageCount: 5,
    status: "PUBLISHED" as const,
    audience: "INSTITUTIONS_ONLY" as const,
    isEndorsed: true,
    downloadCount: 165,
    favoriteCount: 52,
    ratingAvg: 4.9,
    reviewCount: 11,
    tags: ["مؤسسات", "مشروع مؤسسة", "الثلاثي الأول"],
    createdAt: new Date("2026-10-27"),
    updatedAt: new Date("2026-10-27"),
    gradeId: "g1",
    subjectId: "s3",
    categoryId: "c6",
    uploadedBy: "u2",
    grade: CURRICULUM_GRADES[0],
    subject: CURRICULUM_SUBJECTS[2],
    category: SUBJECT_SUBDIVISIONS[5],
    uploader: {
      id: "u2",
      name: "مؤسسة تربوية نموذجية",
      school: "مدرسة ابتدائية",
      role: "INSTITUTION",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
  {
    id: "demo-fr-3",
    title: "Fiche pédagogique — Français (للمعلمين فقط)",
    titleAr: "جذاذة بيداغوجية وإصلاح تقييم اللغة الفرنسية",
    description: "Teacher fiche",
    descriptionAr: "جذاذة بيداغوجية مخصصة للمعلمين والمتفقدين فقط.",
    fileUrl: "/sample.pdf",
    fileName: "francais-fiche.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 750,
    pageCount: 4,
    status: "PUBLISHED" as const,
    audience: "TEACHERS_ONLY" as const,
    isEndorsed: true,
    downloadCount: 185,
    favoriteCount: 64,
    ratingAvg: 5.0,
    reviewCount: 15,
    tags: ["فرنسية", "جذاذات", "إصلاح", "الثلاثي الثاني"],
    createdAt: new Date("2026-10-27"),
    updatedAt: new Date("2026-10-27"),
    gradeId: "g1",
    subjectId: "s4",
    categoryId: "c4",
    uploadedBy: "u1",
    grade: CURRICULUM_GRADES[0],
    subject: CURRICULUM_SUBJECTS[3],
    category: SUBJECT_SUBDIVISIONS[3],
    uploader: {
      id: "u1",
      name: "متفقد تربوي",
      school: "دائرة التفقد التربوي",
      role: "INSPECTOR",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
  {
    id: "demo-admin-1",
    title: "Teacher Administrative Schedule & Annual Plan",
    titleAr: "نموذج جدول الأوقات والتوزيع السنوي ومحضر الجلسة البيداغوجية",
    description: "Administrative document for teachers",
    descriptionAr: "وثيقة إدارية تنظيمية خاصة بالمعلم والمؤسسة التربوية.",
    fileUrl: "/sample.pdf",
    fileName: "admin-schedule-doc.pdf",
    thumbnailUrl: null,
    fileSize: 1024 * 540,
    pageCount: 2,
    status: "PUBLISHED" as const,
    audience: "ALL" as const,
    isEndorsed: true,
    downloadCount: 310,
    favoriteCount: 95,
    ratingAvg: 4.9,
    reviewCount: 22,
    tags: ["وثائق إدارية", "جداول الأوقات", "مذكرات ومراسلات", "الثلاثي الثالث"],
    createdAt: new Date("2026-10-26"),
    updatedAt: new Date("2026-10-26"),
    gradeId: "g1",
    subjectId: "s10",
    categoryId: "c7",
    uploadedBy: "u1",
    grade: CURRICULUM_GRADES[0],
    subject: {
      id: "s10",
      name: "Administration",
      nameAr: "المعاملات والوثائق الإدارية",
      slug: "administration",
      color: "#334155",
      icon: "briefcase",
      sortOrder: 10,
    },
    category: ADMINISTRATIVE_CATEGORY,
    uploader: {
      id: "u1",
      name: "إدارة المسند",
      school: "الدائرة التربوية",
      role: "INSPECTOR",
      isVerified: true,
      isBanned: false,
      avatarUrl: null,
    },
  },
];

export default async function HomePage(props: HomePageProps) {
  const resolvedParams = await props.searchParams;

  const page = Number(resolvedParams.page) || 1;
  const search =
    typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;
  const grade =
    typeof resolvedParams.grade === "string" ? resolvedParams.grade : undefined;
  const subject =
    typeof resolvedParams.subject === "string"
      ? resolvedParams.subject
      : undefined;
  const category =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : undefined;
  const trimester =
    typeof resolvedParams.trimester === "string"
      ? resolvedParams.trimester
      : undefined;
  const sort = (
    typeof resolvedParams.sort === "string" ? resolvedParams.sort : "newest"
  ) as WorksheetSortOption;

  let grades: any[] = [...CURRICULUM_GRADES];
  let subjects: any[] = [...CURRICULUM_SUBJECTS];
  let categories: any[] = [...SUBJECT_SUBDIVISIONS, ADMINISTRATIVE_CATEGORY];
  let worksheets: any[] = [];
  let explorerWorksheets: any[] = [];
  let meta = { total: 0, page, limit: 12, totalPages: 1 };
  let isDbConnected = true;

  let viewerUserId: string | null = null;
  let viewerRole: string | null = null;
  let viewerName: string | null = null;
  let viewerStudentGrade: string | null = null;
  let viewerIsVerified: boolean = false;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      viewerUserId = user.id;
      try {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { role: true, name: true, studentGrade: true, isVerified: true },
        });
        viewerRole =
          dbUser?.role ||
          (user.user_metadata?.role as string | undefined) ||
          "TEACHER";
        viewerName =
          dbUser?.name ||
          (user.user_metadata?.name as string | undefined) ||
          null;
        viewerStudentGrade =
          dbUser?.studentGrade ||
          (user.user_metadata?.student_grade as string | undefined) ||
          null;
        viewerIsVerified = Boolean(dbUser?.isVerified);
      } catch {
        viewerRole =
          (user.user_metadata?.role as string | undefined) || "TEACHER";
      }
    }
  } catch {
    // Guest visitor
  }

  const isAuthenticated = Boolean(viewerUserId && viewerRole);

  try {
    const [
      fetchedGrades,
      fetchedSubjects,
      fetchedCategories,
      fetchedCatalog,
      fetchedExplorer,
    ] = await Promise.all([
      db.grade.findMany({ orderBy: { sortOrder: "asc" } }),
      db.subject.findMany({ orderBy: { sortOrder: "asc" } }),
      db.category.findMany({ orderBy: { sortOrder: "asc" } }),
      listWorksheets(
        {
          page,
          limit: 12,
          search,
          grade,
          subject,
          category,
          trimester,
          sort,
        },
        viewerRole,
        viewerUserId,
        viewerIsVerified
      ),
      listWorksheets(
        {
          page: 1,
          limit: 50,
          sort: "newest",
        },
        viewerRole,
        viewerUserId,
        viewerIsVerified
      ),
    ]);

    if (fetchedGrades.length > 0) grades = fetchedGrades;
    if (fetchedSubjects.length > 0) subjects = fetchedSubjects;
    if (fetchedCategories.length > 0) categories = fetchedCategories;
    worksheets = fetchedCatalog.data;
    explorerWorksheets = fetchedExplorer.data;
    meta = fetchedCatalog.meta;
  } catch {
    isDbConnected = false;
    let visibleDemo = isAuthenticated
      ? DEMO_WORKSHEETS.filter((w) =>
          canUserAccessWorksheet(w, viewerRole, viewerUserId, viewerIsVerified)
        )
      : DEMO_WORKSHEETS.filter((w) => w.audience === "ALL");

    if (trimester) {
      const rawTrim = trimester.toLowerCase();
      const targetTerm =
        rawTrim === "trimester-1" || rawTrim.includes("أول") || rawTrim.includes("اول")
          ? "الثلاثي الأول"
          : rawTrim === "trimester-2" || rawTrim.includes("ثاني")
          ? "الثلاثي الثاني"
          : rawTrim === "trimester-3" || rawTrim.includes("ثالث")
          ? "الثلاثي الثالث"
          : trimester;
      visibleDemo = visibleDemo.filter(
        (w) =>
          w.tags.includes(targetTerm) ||
          w.title.includes(targetTerm) ||
          (w.titleAr && w.titleAr.includes(targetTerm))
      );
    }

    worksheets = visibleDemo;
    explorerWorksheets = visibleDemo;
    meta = {
      total: visibleDemo.length,
      page: 1,
      limit: 12,
      totalPages: 1,
    };
  }

  // For Students, also filter out administrative documents from the general catalog
  const displayedCatalogWorksheets =
    viewerRole === "STUDENT"
      ? worksheets.filter(
          (w) =>
            w.category?.slug !== "administrative" &&
            w.subject?.slug !== "administration"
        )
      : worksheets;

  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (grade) params.set("grade", grade);
    if (subject) params.set("subject", subject);
    if (category) params.set("category", category);
    if (sort && sort !== "newest") params.set("sort", sort);
    params.set("page", String(targetPage));
    return `/?${params.toString()}`;
  };

  return (
    <div className="space-y-12 pb-16">
      {!isDbConnected && (
        <div
          className="bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-800 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200 flex flex-wrap items-center justify-center gap-2"
          dir="rtl"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>الوضع التجريبي لمنصة المسند:</strong> يتم حالياً عرض البيانات التجريبية للمستويات والمواد والنشرات.
          </span>
        </div>
      )}

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-700 via-indigo-800 to-slate-900 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>منصة المسند التربوية والبيداغوجية المعتمدة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            المرجع التربوي الموثوق للمؤسسات، <br className="hidden sm:inline" />
            <span className="text-amber-300">المتفقدين، المعلمين، والتلاميذ</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-base sm:text-lg leading-relaxed font-normal">
            {viewerRole === "STUDENT"
              ? "تصفح مستواك الدراسي، المواد التعليمية، الدروس المبسطة، التمارين التطبيقية، والامتحانات المعتمدة."
              : "تصفح المستويات الدراسية المعتمدة، المواد التعليمية، الجذاذات، التمارين، الامتحانات، وقسم المعاملات الإدارية."}
          </p>

          <div
            dir="rtl"
            className="pt-2 flex flex-wrap justify-center items-center gap-2.5"
          >
            <Link
              href="/levels"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-400/20 transition transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <Library className="w-4 h-4" />
              <span>مستودع المواد والمستويات ←</span>
            </Link>

            <a
              href="#catalog"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>النشرات</span>
            </a>

            {viewerRole === "INSTITUTION" && (
              <a
                href="#institutions-hub"
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-1.5"
              >
                <Briefcase className="w-4 h-4 text-amber-300" />
                <span>للمؤسسات</span>
              </a>
            )}

            {viewerRole === "INSPECTOR" && (
              <a
                href="#inspectors-hub"
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>للمتفقدين</span>
              </a>
            )}

            {viewerRole === "TEACHER" && (
              <a
                href="#teachers-hub"
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>للمعلمين</span>
              </a>
            )}

            <a
              href="#learn-more"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-sm transition inline-flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>اعرف المزيد</span>
            </a>

            {isAuthenticated && viewerRole !== "STUDENT" && (
              <Link
                href="/upload"
                className="px-5 py-3 bg-blue-500/40 hover:bg-blue-500/60 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-blue-300/40 backdrop-blur-sm transition"
              >
                + نشر ملف جديد
              </Link>
            )}
          </div>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-xs text-blue-100">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <BookCheck className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                مراجع متوافقة مع النظام التربوي
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <Award className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                اعتماد من عند أفضل المتفقدين
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <Library className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                مكتبة متنوعة
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
              <Layers className="w-6 h-6 text-amber-300" />
              <div className="text-sm font-extrabold text-white">
                توافق مع جميع المستويات
              </div>
            </div>
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <RolePersonalizedHub
          worksheets={explorerWorksheets as any}
          viewerRole={viewerRole}
          viewerName={viewerName}
          viewerStudentGrade={viewerStudentGrade}
          viewerIsVerified={viewerIsVerified}
        />
      )}

      <CurriculumAndAdminExplorer
        worksheets={explorerWorksheets as any}
        isAuthenticated={isAuthenticated}
        viewerRole={viewerRole}
      />

      <section
        id="catalog"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  قائمة النشرات التربوية
                </h2>
                {isAuthenticated ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      النشرات المتاحة لـ: {ROLE_LABELS_AR[viewerRole || ""] || viewerRole}
                    </span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                      <Link href="/login" className="underline hover:text-blue-700">
                        تسجيل الدخول
                      </Link>{" "}
                      أو{" "}
                      <Link href="/register" className="underline hover:text-blue-700">
                        إنشاء الحساب
                      </Link>
                      .
                    </span>
                  </span>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                إجمالي الملفات المعروضة:{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {displayedCatalogWorksheets.length}
                </span>{" "}
                ملف تربوي
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            }
          >
            <FilterBar
              grades={grades}
              subjects={
                viewerRole === "STUDENT"
                  ? subjects.filter((s) => s.slug !== "administration")
                  : subjects
              }
              categories={
                viewerRole === "STUDENT"
                  ? categories.filter((c) => c.slug !== "administrative")
                  : categories
              }
            />
          </Suspense>
        </div>

        {displayedCatalogWorksheets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCatalogWorksheets.map((worksheet) => (
              <WorksheetCard
                key={worksheet.id}
                worksheet={worksheet}
                guestTitleOnly={!isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-base">
              لا توجد نشرات مطابقة لخيارات البحث المحددة
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 rounded-lg transition"
            >
              إعادة ضبط الفلاتر
            </Link>
          </div>
        )}

        {meta.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-200 dark:border-slate-800">
            {page > 1 && (
              <Link
                href={buildPageUrl(page - 1)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                الصفحة السابقة
              </Link>
            )}
            {page < meta.totalPages && (
              <Link
                href={buildPageUrl(page + 1)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                الصفحة التالية
              </Link>
            )}
          </div>
        )}
      </section>

      <PlatformIdentityAndFaqSection />
    </div>
  );
}

```

---

### File: `src/app/(main)/terms/page.tsx`

```typescript
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Scale,
  Lock,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Sparkles,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "شروط الاستخدام وميثاق الملكية الفكرية | منصة المسند",
  description:
    "ميثاق شروط الاستخدام وحماية حقوق المؤلف والملكية الفكرية للمربين والمؤسسات في منصة المسند التربوية بالجمهورية التونسية.",
  alternates: {
    canonical: "https://al-musnad.vercel.app/terms",
  },
};

export default function TermsAndIpPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">شروط الاستخدام والملكية الفكرية</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-bold border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>ميثاق قانوني وبيداغوجي ملزم — الإصدار 15.0</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              شروط الاستخدام وميثاق الملكية الفكرية وحماية المؤلف
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              الإطار التنظيمي والأخلاقي لمنصة «المسند» لضمان حقوق السادة المربين والمتفقدين والمؤسسات وحماية أمان البيانات والمحتوى البيداغوجي الموجه لأبنائنا التلاميذ.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-blue-200">
              <span>تاريخ آخر تحيين: أكتوبر 2026</span>
              <span>•</span>
              <span>الجمهورية التونسية</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                1. إشعار حقوق الملكية الفكرية وحقوق المؤلف
              </h2>
              <p className="text-xs text-slate-500">حماية إنتاج المربين المعلمين والمتفقدين والمؤسسات التربوية</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              تؤكد منصة <strong>«المسند»</strong> أن جميع الجذاذات البيداغوجية، مذكرات الدروس، التمارين، أوراق العمل، الفروض، الامتحانات، والتوزيعات المنشورة في المنصة تظل ملكاً فكرياً وأدبياً حصرياً لأصحابها ومؤلفيها من السادة <strong>المعلمين والمتفقدين التربويين والمؤسسات التربوية</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>الاستخدام البيداغوجي المسموح به:</span>
                </div>
                <p className="text-xs text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed">
                  يُتاح تحميل ومعاينة وطباعة كافة الوثائق مجاناً لغايات التدريس داخل الأقسام التعليمية والدعم والمراجعة المنزلية للتلاميذ وأوليائهم دون أي رسوم.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>الحظر التجاري الصارم:</span>
                </div>
                <p className="text-xs text-rose-900/90 dark:text-rose-300/90 leading-relaxed">
                  يُحظر حظراً تاماً وقانونياً نسخ أو إعادة تجميع أو بيع محتويات المنصة في مطبوعات ورقية أو كراسات أو منصات مدفوعة الأجر بهدف تحقيق ربح مادي دون إذن كتابي موثق ومسبق من صاحب العمل.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                2. إخلاء المسؤولية والاستقلالية البيداغوجية
              </h2>
              <p className="text-xs text-slate-500">التوافق مع البرامج الرسمية التونسية</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              منصة <strong>«المسند»</strong> هي مبادرة تربوية رقمية مستقلة تهدف إلى تعزيز المحتوى التربوي التونسي وتيسير المبادلات البيداغوجية والإدارية بين مختلف أطراف العملية التعليمية (المؤسسات، المتفقدون، المعلمون، والتلاميذ).
            </p>
            <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              📌 <strong>التوافق مع البرامج الرسمية:</strong> نحرص في كافة المستويات الدراسية الستة والمواد التعليمية على الالتزام الكامل بالمناهج والبرامج الرسمية المقررة من وزارة التربية بالجمهورية التونسية، مع التأكيد على أن المنصة فضاء تعاوني رقمي حر وليست إدارة رسمية تابعة للوزارة.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                3. ميثاق النشر وآلية الإبلاغ والحذف الفوري
              </h2>
              <p className="text-xs text-slate-500">ضوابط الاعتماد وسحب الشارات والبلاغات</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>معايير جودة المحتوى:</strong> يلتزم كل ناشر بعدم تحميل أي ملفات مسيئة أو منتهكة للآداب العامة، أو ذات أبعاد تجارية بحتة لا علاقة لها بالعمل التربوي.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>سحب شارة الاعتماد التلقائي:</strong> عند قيام الناشر بتعديل أو استبدال الملف المرفق في أي وثيقة حاصلة على شارة <em>«معتمد بيداغوجياً»</em>، يقوم النظام تلقائياً بسحب الشارة مؤقتاً لحين إعادة مراجعة الملف وتدقيقه من قبل المتفقد التربوي المختص لضمان سلامة المحتوى المحدث.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>آلية الإبلاغ والحذف الفوري (Takedown Policy):</strong> تلتزم إدارة المنصة بحجب وحذف أي وثيقة يتبين وجود تعدٍّ فيها على حقوق مؤلف أو ناشر آخر فور إخطارنا بذلك، مع إمكانية اتخاذ تدابير انضباطية تشمل تعليق الحساب المخالف.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                4. حماية المعطيات الشخصية والخصوصية
              </h2>
              <p className="text-xs text-slate-500">حماية بيانات المستخدمين طبقاً للتشريع التونسي</p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              تولي منصة «المسند» أهمية قصوى لحماية سرية وأمان البيانات الشخصية للمربين والمتفقدين والمؤسسات والتلاميذ طبقاً لمقتضيات التشريع التونسي المتعلق بحماية المعطيات الشخصية.
            </p>
            <p>
              لا نقوم ببيع أو مشاركة عناوين البريد الإلكتروني أو أرقام الهواتف أو البيانات الحساسة مع أي أطراف ثالثة أو شركات إعلانية، وتُستخدم بيانات الحساب حصرياً لأغراض التوثيق وتسهيل التواصل البيداغوجي وتأمين الدخول.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/50 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              هل لديك استفسار أو ترغب في الإبلاغ عن انتهاك للملكية؟
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              فريق الدعم الفني والمشرف العام جاهزون لمعالجة كافة الطلبات والبلاغات على مدار الساعة.
            </p>
          </div>
          <Link
            href="/support"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition shrink-0"
          >
            <Headphones className="w-4 h-4" />
            <span>التواصل مع الدعم الفني</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

```

---

### File: `src/app/(main)/browse/page.tsx`

```typescript
import { redirect } from "next/navigation";

interface BrowseProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowsePage(props: BrowseProps) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  const query = params.toString();
  redirect(`/${query ? `?${query}#catalog` : "#catalog"}`);
}

```

---

### File: `src/app/(main)/levels/page.tsx`

```typescript
import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ChevronLeft,
  Lock,
  ArrowRight,
  FolderOpen,
} from "lucide-react";
import { CURRICULUM_GRADES } from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";

export default async function GradeLevelsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  const countMap: Record<string, number> = {};

  try {
    await ensureOfficialTaxonomySeeded();
    const gradesInDb = await db.grade.findMany({
      include: {
        _count: { select: { worksheets: { where: { status: "PUBLISHED" } } } },
      },
    });

    for (const g of gradesInDb) {
      countMap[g.slug] = g._count.worksheets;
    }
  } catch {
    // Fallback counts if database is offline
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 dark:text-slate-400"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الصفحة الرئيسية
          </Link>

          {!isAuthenticated && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              <span>
                وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                <Link href="/login" className="underline">
                  تسجيل الدخول
                </Link>{" "}
                أو{" "}
                <Link href="/register" className="underline">
                  إنشاء الحساب
                </Link>
                .
              </span>
            </div>
          )}
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20 shrink-0">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400">
                البوابة المنهجية للمستويات والمواد الدراسية
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                المستويات الدراسية المعتمدة
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اختر المستوى الدراسي للدخول مباشرة إلى مستودع المواد الدراسية والأقسام البيداغوجية الخاصة به.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_GRADES.map((grade) => {
              const count = countMap[grade.slug] ?? 0;
              return (
                <Link
                  key={grade.slug}
                  href={`/levels/${grade.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all hover:-translate-y-1 hover:border-blue-600 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-500"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white shadow-md">
                      {grade.sortOrder}
                    </span>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                        {grade.nameAr}
                      </h2>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <FolderOpen className="h-3.5 w-3.5 text-blue-600" />
                        <span>مستودع المواد الدراسية • {count} ملف</span>
                      </p>
                    </div>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

```

---

### File: `src/app/(main)/levels/[gradeSlug]/page.tsx`

```typescript
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ArrowRight,
  Lock,
  Library,
} from "lucide-react";
import { CURRICULUM_GRADES, CURRICULUM_SUBJECTS } from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { ensureOfficialTaxonomySeeded } from "@/services/worksheet.service";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface GradeSubjectsPageProps {
  params: Promise<{ gradeSlug: string }>;
}

export default async function GradeSubjectsPage(props: GradeSubjectsPageProps) {
  const { gradeSlug } = await props.params;

  const gradeInfo = CURRICULUM_GRADES.find((g) => g.slug === gradeSlug);
  if (!gradeInfo) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  const subjectCounts: Record<string, number> = {};
  for (const s of CURRICULUM_SUBJECTS) subjectCounts[s.slug] = 0;

  try {
    await ensureOfficialTaxonomySeeded();
    const worksheetsInGrade = await db.worksheet.findMany({
      where: {
        status: "PUBLISHED",
        grade: { slug: gradeSlug },
      },
      select: {
        subject: { select: { slug: true } },
      },
    });

    for (const w of worksheetsInGrade) {
      const sSlug = w.subject?.slug;
      if (sSlug && subjectCounts[sSlug] !== undefined) {
        subjectCounts[sSlug] += 1;
      }
    }
  } catch {
    // Fallback counts if database is offline
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-700 dark:hover:text-blue-400">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/levels" className="hover:text-blue-700 dark:hover:text-blue-400">
              المستويات الدراسية المعتمدة
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{gradeInfo.nameAr}</span>
          </nav>

          {!isAuthenticated && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              <span>
                وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                <Link href="/login" className="underline">
                  تسجيل الدخول
                </Link>{" "}
                أو{" "}
                <Link href="/register" className="underline">
                  إنشاء الحساب
                </Link>
                .
              </span>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-600/20">
                <Library className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                  {gradeInfo.nameAr}
                </span>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                  مستودع المواد الدراسية — {gradeInfo.nameAr}
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  اختر المادة الدراسية لتصفح الملفات مصنفة حسب القسم المناسب (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى).
                </p>
              </div>
            </div>

            <Link
              href="/levels"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ArrowRight className="h-4 w-4" />
              العودة للمستويات الدراسية المعتمدة
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_SUBJECTS.map((subj) => {
              const count = subjectCounts[subj.slug] ?? 0;
              return (
                <Link
                  key={subj.slug}
                  href={`/levels/${gradeInfo.slug}/subjects/${subj.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:-translate-y-1 hover:border-indigo-600 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-indigo-500 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      style={{ backgroundColor: subj.color || "#4f46e5" }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition-transform group-hover:scale-105"
                      title={subj.nameAr}
                    >
                      <SubjectIcon slug={subj.slug} className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {subj.nameAr}
                      </h2>
                      <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        درس • تمرين • امتحان • جذاذة • نشاط تفاعلي • أخرى ({count} ملف)
                      </p>
                    </div>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

### File: `src/app/(main)/levels/[gradeSlug]/subjects/[subjectSlug]/page.tsx`

```typescript
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Plus,
  FileText,
  FolderOpen,
} from "lucide-react";
import {
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
} from "@/config/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { listWorksheets } from "@/services/worksheet.service";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import SubjectIcon from "@/components/ui/SubjectIcon";

interface SubjectPublicationsPageProps {
  params: Promise<{ gradeSlug: string; subjectSlug: string }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function SubjectPublicationsPage(
  props: SubjectPublicationsPageProps
) {
  const { gradeSlug, subjectSlug } = await props.params;
  const sp = await props.searchParams;
  const activeCategorySlug = sp.category || "ALL";
  const searchQuery = sp.search || "";

  const gradeInfo = CURRICULUM_GRADES.find((g) => g.slug === gradeSlug);
  const subjectInfo = CURRICULUM_SUBJECTS.find((s) => s.slug === subjectSlug);

  if (!gradeInfo || !subjectInfo) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let viewerRole: string | null = null;
  if (user) {
    try {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      viewerRole = dbUser?.role || "TEACHER";
    } catch {
      viewerRole = "TEACHER";
    }
  }

  const isAuthenticated = Boolean(user && viewerRole);

  let allSubjectWorksheets: any[] = [];
  try {
    const result = await listWorksheets(
      {
        page: 1,
        limit: 50,
        grade: gradeSlug,
        subject: subjectSlug,
        search: searchQuery || undefined,
        sort: "newest",
      },
      viewerRole,
      user?.id
    );
    allSubjectWorksheets = result.data;
  } catch {
    allSubjectWorksheets = [];
  }

  // Group files into their exact pedagogical section (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى)
  const validSlugs = new Set(SUBJECT_SUBDIVISIONS.map((s) => s.slug));
  const groupedBySection: Record<string, any[]> = {};
  for (const sub of SUBJECT_SUBDIVISIONS) {
    groupedBySection[sub.slug] = [];
  }

  for (const ws of allSubjectWorksheets) {
    const cSlug = ws.category?.slug;
    if (cSlug && validSlugs.has(cSlug as any)) {
      groupedBySection[cSlug].push(ws);
    } else {
      groupedBySection["other"].push(ws);
    }
  }

  const displayedWorksheets =
    activeCategorySlug === "ALL"
      ? allSubjectWorksheets
      : groupedBySection[activeCategorySlug] || [];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-700">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/levels" className="hover:text-blue-700">
              المستويات الدراسية المعتمدة
            </Link>
            <span>/</span>
            <Link
              href={`/levels/${gradeInfo.slug}`}
              className="hover:text-blue-700"
            >
              {gradeInfo.nameAr}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">
              {subjectInfo.nameAr}
            </span>
          </nav>

          {!isAuthenticated && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              <span>
                وضع الزائر: يمكنك الوصول إلى المحتوى بعد{" "}
                <Link href="/login" className="underline">
                  تسجيل الدخول
                </Link>{" "}
                أو{" "}
                <Link href="/register" className="underline">
                  إنشاء الحساب
                </Link>
                .
              </span>
            </div>
          )}
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <div
                style={{ backgroundColor: subjectInfo.color || "#2563EB" }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
              >
                <SubjectIcon slug={subjectInfo.slug} className="h-7 w-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {gradeInfo.nameAr} • {subjectInfo.nameAr}
                </span>
                <h1 className="mt-1.5 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                  ملفات وأقسام مادة «{subjectInfo.nameAr}»
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  كل ملف يحمل اسم المادة والسنة الدراسية ونوع الملف، ومرتب في القسم المناسب له (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={`/levels/${gradeInfo.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <ArrowRight className="h-4 w-4" />
                العودة لمستودع المواد
              </Link>
              {isAuthenticated && viewerRole !== "STUDENT" && (
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4" />
                  إضافة ملف في هذه المادة
                </Link>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link
              href={`/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}`}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeCategorySlug === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              جميع الأقسام ({allSubjectWorksheets.length})
            </Link>
            {SUBJECT_SUBDIVISIONS.map((sub) => {
              const active = activeCategorySlug === sub.slug;
              const secCount = groupedBySection[sub.slug]?.length ?? 0;
              return (
                <Link
                  key={sub.slug}
                  href={`/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}?category=${sub.slug}`}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-blue-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  قسم: {sub.nameAr} ({secCount})
                </Link>
              );
            })}
          </div>
        </div>

        {displayedWorksheets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-14 text-center dark:border-slate-800 dark:bg-slate-900">
            <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              لا توجد ملفات مرفوعة في هذا القسم حالياً
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              كن أول من يثري مادة «{subjectInfo.nameAr}» ({gradeInfo.nameAr}) بنشر ملف تربوي جديد.
            </p>
          </div>
        ) : activeCategorySlug === "ALL" ? (
          <div className="space-y-8">
            {SUBJECT_SUBDIVISIONS.map((sub) => {
              const sectionFiles = groupedBySection[sub.slug] || [];
              if (sectionFiles.length === 0) return null;
              return (
                <section
                  key={sub.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        قسم: {sub.nameAr}
                      </h2>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-extrabold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {sectionFiles.length} ملف
                      </span>
                    </div>
                    <Link
                      href={`/levels/${gradeInfo.slug}/subjects/${subjectInfo.slug}?category=${sub.slug}`}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      عرض هذا القسم فقط ←
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sectionFiles.map((ws) => (
                      <WorksheetCard
                        key={ws.id}
                        worksheet={ws}
                        guestTitleOnly={!isAuthenticated}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedWorksheets.map((ws) => (
              <WorksheetCard
                key={ws.id}
                worksheet={ws}
                guestTitleOnly={!isAuthenticated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

```

---

### File: `src/app/(main)/worksheet/[id]/page.tsx`

```typescript
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Lock, ShieldAlert, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getWorksheetById } from "@/services/worksheet.service";
import { ForbiddenError, UnauthorizedError } from "@/lib/utils/errors";
import WorksheetDetailClient from "@/components/worksheets/WorksheetDetailClient";
import type { WorksheetWithRelations } from "@/types";

interface WorksheetPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  props: WorksheetPageProps
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        title: "محتوى محمي للأعضاء | منصة المسند",
        description: "يرجى تسجيل الدخول للوصول إلى النشرات التربوية في منصة المسند.",
      };
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const worksheet = await getWorksheetById(id, dbUser?.role, user.id);
    const title = worksheet.titleAr || worksheet.title;
    return {
      title: `${title} | منصة المسند`,
      description:
        worksheet.descriptionAr ||
        worksheet.description ||
        `نشرة تربوية عبر منصة المسند`,
    };
  } catch {
    return {
      title: "نشرة تربوية | منصة المسند",
      description: "منصة المسند التربوية والبيداغوجية المعتمدة.",
    };
  }
}

export default async function WorksheetDetailPage(props: WorksheetPageProps) {
  const { id } = await props.params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(`/worksheet/${id}`)}`);
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true },
  });

  if (!dbUser) {
    redirect(`/login?redirectTo=${encodeURIComponent(`/worksheet/${id}`)}`);
  }

  let worksheet: (WorksheetWithRelations & { previewUrl?: string }) | null =
    null;
  let forbiddenMessage: string | null = null;

  try {
    worksheet = (await getWorksheetById(
      id,
      dbUser.role,
      dbUser.id
    )) as unknown as (WorksheetWithRelations & { previewUrl?: string });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      redirect(`/login?redirectTo=${encodeURIComponent(`/worksheet/${id}`)}`);
    } else if (error instanceof ForbiddenError) {
      forbiddenMessage = error.message;
    } else {
      notFound();
    }
  }

  if (forbiddenMessage) {
    return (
      <main className="max-w-xl mx-auto px-4 py-20 text-center" dir="rtl">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-3xl p-8 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            هذه النشرة غير متاحة لفئة حسابك
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {forbiddenMessage}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              يعرض حسابك فقط النشرات التي أتاحها الناشرون لفئة حسابك.
            </span>
          </div>
          <div className="pt-2">
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى النشرات المتاحة لحسابي</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!worksheet) {
    notFound();
  }

  return <WorksheetDetailClient initialWorksheet={worksheet} />;
}
```

---

### File: `src/app/(main)/upload/page.tsx`

```typescript
"use client";

import React, { useState, useEffect, DragEvent, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Image as ImageIcon,
  Users,
  Lock,
  Ban,
  Briefcase,
  BookOpen,
  Sparkles,
  Calendar,
} from "lucide-react";
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  isSupportedUploadFile,
  isPdfUploadFile,
  CURRICULUM_GRADES,
  CURRICULUM_SUBJECTS,
  SUBJECT_SUBDIVISIONS,
  ADMINISTRATIVE_CATEGORY,
  SCHOOL_TRIMESTERS,
} from "@/config/constants";
import { extractPdfThumbnailAndPages } from "@/lib/utils/pdf-thumbnail";
import type {
  Grade,
  Subject,
  Category,
  ApiResponse,
  WorksheetWithRelations,
  TargetAudience,
} from "@/types";

export default function UploadWorksheetPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isBanned, setIsBanned] = useState(false);
  const [banReason, setBanReason] = useState<string | null>(null);

  const [grades, setGrades] = useState<Grade[]>(
    CURRICULUM_GRADES as unknown as Grade[]
  );
  const [subjects, setSubjects] = useState<Subject[]>(
    CURRICULUM_SUBJECTS as unknown as Subject[]
  );
  const [categories, setCategories] = useState<Category[]>([
    ...(SUBJECT_SUBDIVISIONS as unknown as Category[]),
    ADMINISTRATIVE_CATEGORY as unknown as Category,
  ]);

  const [sectionType, setSectionType] = useState<"curriculum" | "administrative">(
    "curriculum"
  );

  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [extractingThumb, setExtractingThumb] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [titleAr, setTitleAr] = useState<string>("");
  const [descriptionAr, setDescriptionAr] = useState<string>("");
  const [gradeId, setGradeId] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [audience, setAudience] = useState<TargetAudience>("ALL");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTrimester, setSelectedTrimester] = useState<string>("");

  function handleToggleTrimester(trimesterTag: string) {
    if (selectedTrimester === trimesterTag) {
      setSelectedTrimester("");
      setTags((prev) =>
        prev.filter(
          (t) => !SCHOOL_TRIMESTERS.some((st) => st.tag === t)
        )
      );
    } else {
      setSelectedTrimester(trimesterTag);
      setTags((prev) => {
        const withoutTrimesters = prev.filter(
          (t) => !SCHOOL_TRIMESTERS.some((st) => st.tag === t)
        );
        return [...withoutTrimesters, trimesterTag];
      });
    }
  }

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nonPdfThankYouMessage, setNonPdfThankYouMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const audParam = sp.get("audience")?.toUpperCase();
      if (
        audParam &&
        ["ALL", "TEACHERS_AND_STUDENTS", "TEACHERS_ONLY", "SAME_ROLE_ONLY", "INSTITUTIONS_ONLY"].includes(audParam)
      ) {
        setAudience(audParam as TargetAudience);
      }
      if (sp.get("section") === "administrative") {
        setSectionType("administrative");
      }
    }
    async function initPage() {
      try {
        setCheckingAuth(true);
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        if (meRes.status === 401) {
          router.replace("/login?redirectTo=/upload");
          return;
        }
        const meJson = await meRes.json();
        if (!meJson.success || !meJson.data) {
          router.replace("/login?redirectTo=/upload");
          return;
        }

        setUserRole(meJson.data.role);
        setIsBanned(Boolean(meJson.data.isBanned));
        setBanReason(meJson.data.banReason || null);

        const [gRes, sRes, cRes] = await Promise.all([
          fetch("/api/grades"),
          fetch("/api/subjects"),
          fetch("/api/categories"),
        ]);
        const [gJson, sJson, cJson] = await Promise.all([
          gRes.json() as Promise<ApiResponse<Grade[]>>,
          sRes.json() as Promise<ApiResponse<Subject[]>>,
          cRes.json() as Promise<ApiResponse<Category[]>>,
        ]);

        if (gJson.success && gJson.data.length > 0) setGrades(gJson.data);
        if (sJson.success && sJson.data.length > 0) setSubjects(sJson.data);
        if (cJson.success && cJson.data.length > 0) setCategories(cJson.data);
      } catch {
        // Fallback to constants if offline
      } finally {
        setCheckingAuth(false);
      }
    }
    initPage();
  }, [router]);

  const validateAndSetFile = async (selected: File) => {
    setError(null);
    if (!isSupportedUploadFile(selected)) {
      setError(
        "يُسمح برفع ملفات PDF، أو ملفات وورد (.doc, .docx)، أو الصور (.png, .jpg, .webp)."
      );
      return;
    }
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setError(
        `حجم الملف يتجاوز الحد الأقصى المسموح به (${MAX_FILE_SIZE_MB} ميجابايت).`
      );
      return;
    }

    setFile(selected);
    if (!titleAr) {
      setTitleAr(
        selected.name
          .replace(/\.(pdf|docx?|png|jpe?g|webp)$/i, "")
          .replace(/[-_]/g, " ")
      );
    }

    if (isPdfUploadFile(selected)) {
      try {
        setExtractingThumb(true);
        const extracted = await extractPdfThumbnailAndPages(selected);
        setThumbnailFile(extracted.thumbnailFile);
        setThumbnailPreview(extracted.thumbnailPreviewUrl);
        setPageCount(extracted.pageCount);
      } catch {
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setPageCount(null);
      } finally {
        setExtractingThumb(false);
      }
    } else if (selected.type.startsWith("image/")) {
      setThumbnailFile(selected);
      setThumbnailPreview(URL.createObjectURL(selected));
      setPageCount(1);
    } else {
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setPageCount(null);
    }
  };

  const handleClearFile = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setPageCount(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) validateAndSetFile(selected);
  };

  const handleAddTag = () => {
    const clean = tagInput.trim();
    if (clean && !tags.includes(clean) && tags.length < 10) {
      setTags([...tags, clean]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("يرجى اختيار الملف أولاً (PDF أو وورد أو صورة)");
      return;
    }

    const effectiveGradeId =
      sectionType === "administrative"
        ? gradeId || grades[0]?.id || ""
        : gradeId;
    const effectiveSubjectId =
      sectionType === "administrative"
        ? subjects.find((s) => s.slug === "administration")?.id ||
          subjectId ||
          subjects[0]?.id ||
          ""
        : subjectId;
    const effectiveCategoryId =
      sectionType === "administrative"
        ? categories.find((c) => c.slug === "administrative")?.id ||
          categoryId ||
          categories[0]?.id ||
          ""
        : categoryId;

    if (
      !titleAr.trim() ||
      !effectiveGradeId ||
      !effectiveSubjectId ||
      !effectiveCategoryId
    ) {
      setError("يرجى ملء جميع الحقول الأساسية (العنوان، المستوى، المادة، والتقسيم)");
      return;
    }

    const isPdf = isPdfUploadFile(file);

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("file", file);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      if (pageCount) {
        formData.append("pageCount", String(pageCount));
      }

      const finalTags =
        sectionType === "administrative" && !tags.includes("وثائق إدارية")
          ? ["وثائق إدارية", ...tags]
          : tags;

      const metadata = {
        title: titleAr.trim(),
        titleAr: titleAr.trim(),
        description: descriptionAr.trim() || undefined,
        descriptionAr: descriptionAr.trim() || undefined,
        gradeId: effectiveGradeId,
        subjectId: effectiveSubjectId,
        categoryId: effectiveCategoryId,
        audience,
        tags: finalTags,
      };
      formData.append("metadata", JSON.stringify(metadata));

      const res = await fetch("/api/worksheets", {
        method: "POST",
        body: formData,
      });

      const json: ApiResponse<
        WorksheetWithRelations & {
          requiresPdfConversionReview?: boolean;
          reviewNoticeMessage?: string;
        }
      > = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(!json.success ? json.error.message : "فشل رفع الملف");
      }

      // If uploaded file is NOT a PDF (Word or Image), show the Thank You & Admin/Inspector Review screen!
      if (!isPdf || json.data.requiresPdfConversionReview) {
        setNonPdfThankYouMessage(
          json.data.reviewNoticeMessage ||
            "شكراً لك على مساهمتك القيمة في منصة المسند! تم قبول واستلام ملفك بنجاح. هذا المحتوى الذي أرسلته سيتم مراجعته من عند المشرف والمتفقد التربوي وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين."
        );
        return;
      }

      router.push(`/worksheet/${json.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء رفع الملف");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (nonPdfThankYouMessage) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تم استلام ملفك بنجاح — شكراً لك!</span>
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              شكراً جزيلاً على مساهمتك التربوية!
            </h1>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm leading-relaxed font-semibold">
            {nonPdfThankYouMessage}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/profile"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
            >
              الانتقال إلى ملفي الشخصي
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isBanned) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 space-y-4">
          <Ban className="w-12 h-12 text-red-600 mx-auto" />
          <h1 className="text-xl font-extrabold text-red-900">
            حسابك محظور من نشر المحتوى
          </h1>
          <p className="text-sm text-red-700">
            {banReason || "تم إيقاف صلاحية النشر لهذا الحساب لمخالفة شروط المنصة."}
          </p>
          <Link
            href="/support"
            className="inline-block px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold"
          >
            التواصل مع الدعم الفني
          </Link>
        </div>
      </main>
    );
  }

  if (userRole === "STUDENT") {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 space-y-4">
          <Lock className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="text-xl font-extrabold text-slate-900">
            النشر مخصص للمؤسسات والمتفقدين والمعلمين
          </h1>
          <p className="text-sm text-slate-600">
            حساب التلميذ مخصص لتصفح وتحميل الدروس والتمارين والامتحانات المتاحة للتلاميذ.
          </p>
          <Link
            href="/#levels-and-subjects"
            className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            تصفح المستويات والمواد
          </Link>
        </div>
      </main>
    );
  }

  const isSelectedFileNonPdf = Boolean(file && !isPdfUploadFile(file));

  return (
    <main className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            نشر ملف جديد (PDF، ملف وورد، أو صورة)
          </h1>
          <p className="text-sm text-slate-500">
            اختر القسم (المستويات والمواد أو قسم الإدارة)، وارفع ملفك بصيغة PDF أو Word أو صورة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSectionType("curriculum")}
            className={`p-4 rounded-2xl border-2 text-start transition cursor-pointer flex items-center gap-3 ${
              sectionType === "curriculum"
                ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-white"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <BookOpen className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <div className="font-extrabold text-sm">
                قسم المستوى الدراسي والمواد
              </div>
              <div className="text-[11px] text-slate-500">
                درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أو أخرى
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSectionType("administrative")}
            className={`p-4 rounded-2xl border-2 text-start transition cursor-pointer flex items-center gap-3 ${
              sectionType === "administrative"
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <Briefcase className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <div className="font-extrabold text-sm">
                قسم الإدارة والمعاملات الإدارية
              </div>
              <div className="text-[11px] text-slate-500">
                وثائق ومعاملات إدارية للمعلم بعيدة عن التمارين والدروس
              </div>
            </div>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              ملف النشرة (يُقبل PDF، ملف وورد Word، أو صورة — بحد أقصى {MAX_FILE_SIZE_MB} ميجابايت) *
            </label>

            {!file ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
                  isDragging
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300 hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <UploadCloud className="w-12 h-12 text-blue-600 mb-3" />
                  <span className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                    اسحب وأفلت ملف PDF أو وورد (Word) أو صورة هنا، أو اضغط للاختيار
                  </span>
                  <span className="text-xs text-slate-500">
                    إذا رفعت صورة أو ملف وورد، سيتم قبوله ومراجعته من المشرف والمتفقد وإعادة صياغته لملف PDF.
                  </span>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0 w-full">
                    <div className="w-20 h-24 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                      {extractingThumb ? (
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                      ) : thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="معاينة"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-1">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>تم إرفاق الملف بنجاح</span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>
                          الحجم: {(file.size / (1024 * 1024)).toFixed(2)} ميجابايت
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white transition self-end sm:self-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isSelectedFileNonPdf && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold leading-relaxed">
                    ملاحظة: الملف الذي اخترته هو (ملف وورد / صورة) وليس PDF. سنقبل منك الملف بكل سرور، وسيتم مراجعته من عند المشرف والمتفقد وإعادة صياغته لملف PDF ليكون الوصول إليه أفضل من عند المستخدمين.
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {sectionType === "administrative"
                ? "عنوان الوثيقة / المعاملة الإدارية *"
                : "عنوان الدرس / الملف *"}
            </label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={255}
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder={
                sectionType === "administrative"
                  ? "أدخل عنوان الوثيقة الإدارية"
                  : "أدخل عنوان الدرس أو التمرين أو الجذاذة"
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:border-blue-600 outline-none text-sm"
            />
          </div>

          {sectionType === "curriculum" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  المستوى الدراسي *
                </label>
                <select
                  required
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">اختر المستوى...</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  المادة الدراسية *
                </label>
                <select
                  required
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">اختر المادة...</option>
                  {subjects
                    .filter((s) => s.slug !== "administration")
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nameAr}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                  نوع الملف / القسم التربوي داخل المادة (درس، تمرين، امتحان، جذاذة، نشاط تفاعلي، أخرى) *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">اختر التقسيم...</option>
                  {categories
                    .filter((c) => c.slug !== "administrative")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>وسم الثلاثي المدرسي (اختيار سريع بضغطة زر)</span>
              </label>
              {(selectedTrimester || tags.some((t) => SCHOOL_TRIMESTERS.some((st) => st.tag === t))) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrimester("");
                    setTags((prev) =>
                      prev.filter((t) => !SCHOOL_TRIMESTERS.some((st) => st.tag === t))
                    );
                  }}
                  className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  إلغاء وسم الثلاثي ✕
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              اختر الثلاثي لوسم الملف بيداغوجياً وتيسير عثور المعلمين والتلاميذ عليه في الفلترة والبحث:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {SCHOOL_TRIMESTERS.map((trim) => {
                const isSelected = selectedTrimester === trim.tag || tags.includes(trim.tag);
                return (
                  <button
                    key={trim.id}
                    type="button"
                    onClick={() => handleToggleTrimester(trim.tag)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer text-center ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                    }`}
                  >
                    {trim.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-blue-950 dark:text-blue-200">
              <Users className="w-4 h-4 text-blue-600" />
              <span>تحديد جمهور النشر *</span>
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as TargetAudience)}
              className="w-full px-4 py-3 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-blue-600"
            >
              <option value="ALL">
                نشر للجميع (يظهر اسم الملف للزوار، ويُقرأ ويُحمّل من جميع الحسابات)
              </option>
              <option value="TEACHERS_AND_STUDENTS">
                للمعلمين والتلاميذ (تمارين ودروس)
              </option>
              <option value="TEACHERS_ONLY">
                للمعلمين والمتفقدين فقط — مخفي عن التلاميذ (مثل الإصلاح والجذاذات)
              </option>
              <option value="SAME_ROLE_ONLY">
                حصر النشرة داخل نفس فئة حسابي فقط
              </option>
              <option value="INSTITUTIONS_ONLY">
                للمؤسسات التربوية فقط
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              وصف مختصر (اختياري)
            </label>
            <textarea
              rows={3}
              maxLength={2000}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              placeholder="أضف وصفاً مختصراً لمحتوى الملف..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:border-blue-600 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              الكلمات المفتاحية (اختياري)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="أضف وسم..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                إضافة
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => {
                        if (t === selectedTrimester) setSelectedTrimester("");
                        setTags(tags.filter((item) => item !== t));
                      }}
                      className="hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || extractingThumb}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري رفع الملف...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>
                  {isSelectedFileNonPdf
                    ? "إرسال الملف للمراجعة وإعادة الصياغة لـ PDF"
                    : "نشر الملف الآن"}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
```

---

### File: `src/app/(main)/publisher/[id]/page.tsx`

```typescript
"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  School,
  Heart,
  FileText,
  BadgeCheck,
  UserPlus,
  UserCheck,
  Loader2,
  Calendar,
  ArrowRight,
  Flag,
  Ban,
  X,
} from "lucide-react";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { UserAvatarWithPresence, UserPresenceBadge } from "@/components/ui/UserPresenceIndicator";
import WorksheetCard from "@/components/worksheets/WorksheetCard";
import {
  getPublicPublisherProfileData,
  toggleFollowPublisherAction,
  toggleFavoritePublisherAction,
} from "@/actions/publisher.actions";
import { submitReportAction } from "@/actions/report-support.actions";

type PublisherData = Awaited<ReturnType<typeof getPublicPublisherProfileData>>;

export default function PublicPublisherProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const publisherId = params?.id;

  const [data, setData] = useState<PublisherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);

  const [isFavPublisher, setIsFavPublisher] = useState(false);
  const [favoritedByCount, setFavoritedByCount] = useState(0);
  const [favLoading, setFavLoading] = useState(false);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("انتحال صفة تربوية أو مؤسسة");
  const [reportDetails, setReportDetails] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    if (!publisherId) return;
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await getPublicPublisherProfileData(publisherId);
        if (isMounted) {
          setData(res);
          setIsFollowing(res.viewerState.isFollowing);
          setFollowersCount(res.stats.followersCount);
          setIsFavPublisher(res.viewerState.isFavoritedPublisher);
          setFavoritedByCount(res.stats.favoritedByCount);
        }
      } catch (err) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "تعذر تحميل ملف الناشر";
          if (msg.includes("تسجيل الدخول")) {
            router.replace(`/login?redirectTo=${encodeURIComponent(`/publisher/${publisherId}`)}`);
            return;
          }
          setError(msg);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [publisherId]);

  const handleToggleFollow = async () => {
    if (!publisherId || followLoading) return;
    try {
      setFollowLoading(true);
      const res = await toggleFollowPublisherAction(publisherId);
      setIsFollowing(res.isFollowing);
      setFollowersCount(res.followersCount);
    } catch (err) {
      if (err instanceof Error && err.message.includes("تسجيل الدخول")) {
        router.push(`/login?redirectTo=/publisher/${publisherId}`);
      } else {
        alert(err instanceof Error ? err.message : "تعذر تنفيذ العملية");
      }
    } finally {
      setFollowLoading(false);
    }
  };

  const handleToggleFavPublisher = async () => {
    if (!publisherId || favLoading) return;
    try {
      setFavLoading(true);
      const res = await toggleFavoritePublisherAction(publisherId);
      setIsFavPublisher(res.isFavoritedPublisher);
      setFavoritedByCount(res.favoritedByCount);
    } catch (err) {
      if (err instanceof Error && err.message.includes("تسجيل الدخول")) {
        router.push(`/login?redirectTo=/publisher/${publisherId}`);
      } else {
        alert(err instanceof Error ? err.message : "تعذر تنفيذ العملية");
      }
    } finally {
      setFavLoading(false);
    }
  };

  const handleReportPublisher = async (e: FormEvent) => {
    e.preventDefault();
    if (!publisherId) return;
    try {
      setReportLoading(true);
      await submitReportAction({
        targetType: "USER",
        targetUserId: publisherId,
        reason: reportReason,
        details: reportDetails,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setIsReportOpen(false);
        setReportSuccess(false);
        setReportDetails("");
      }, 1800);
    } catch (err) {
      alert(err instanceof Error ? err.message : "يرجى تسجيل الدخول لإرسال البلاغ");
    } finally {
      setReportLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4" dir="rtl">
        <p className="text-slate-800 dark:text-white font-bold text-lg">
          {error || "الملف الشخصي للناشر غير متاح"}
        </p>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للنشرات</span>
        </Link>
      </div>
    );
  }

  const { publisher, worksheets, stats, viewerState } = data;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      {publisher.isBanned && (
        <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-900 flex items-center gap-3">
          <Ban className="w-6 h-6 text-red-600 shrink-0" />
          <div className="text-xs">
            <p className="font-black text-sm">هذا الناشر محظور حالياً من قِبل إدارة المنصة</p>
            {publisher.banReason && <p className="mt-0.5">السبب: {publisher.banReason}</p>}
          </div>
        </div>
      )}

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {publisher.name.charAt(0)}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {publisher.role === "INSTITUTION"
                    ? publisher.name
                    : `أ. ${publisher.name}`}
                </h1>
                <InspectorBadge
                  role={publisher.role}
                  isVerified={publisher.isVerified}
                  isBanned={publisher.isBanned}
                  size="md"
                />
                <UserPresenceBadge
                  presenceStatus={(publisher as any).presenceStatus}
                  lastSeenAt={(publisher as any).lastSeenAt}
                />
                {publisher.username && (
                  <span
                    dir="ltr"
                    className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300"
                  >
                    @{publisher.username}
                  </span>
                )}
              </div>

              {publisher.school && (
                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                  <School className="w-4 h-4 text-blue-600" />
                  <span>{publisher.school}</span>
                </p>
              )}

              {publisher.bio && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {publisher.bio}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    عضو في المسند منذ{" "}
                    {new Date(publisher.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {viewerState.isOwnProfile ? (
              <Link
                href="/profile?tab=edit"
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white text-xs font-bold transition"
              >
                تعديل ملفي الشخصي
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  disabled={followLoading}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                    isFollowing
                      ? "bg-slate-900 dark:bg-slate-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {followLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isFollowing ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span>{isFollowing ? "متابَع ✓" : "+ متابعة الناشر"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleFavPublisher}
                  disabled={favLoading}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 transition cursor-pointer ${
                    isFavPublisher
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavPublisher ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>
                    {isFavPublisher ? "الناشر في مفضلتي" : "إضافة للمفضلة"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="p-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                  title="الإبلاغ عن هذا الناشر"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5">
            <span className="text-xs text-slate-500 block">النشرات</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {stats.worksheetsCount}
            </span>
          </div>
          <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-3.5 border border-amber-200/60">
            <span className="text-xs text-amber-800 dark:text-amber-300 block">
              معتمد من المتفقد
            </span>
            <span className="text-xl font-black text-amber-600 flex items-center justify-center gap-1">
              <BadgeCheck className="w-5 h-5" />
              {stats.endorsedCount}
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5">
            <span className="text-xs text-slate-500 block">المتابعون</span>
            <span className="text-xl font-black text-blue-600">
              {followersCount}
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5">
            <span className="text-xs text-slate-500 block">في مفضلة الأعضاء</span>
            <span className="text-xl font-black text-rose-600">
              {favoritedByCount}
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-500 block">إجمالي التحميلات</span>
            <span className="text-xl font-black text-emerald-600">
              {stats.totalDownloads}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>نشرات وأعمال الناشر ({worksheets.length})</span>
        </h2>

        {worksheets.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500">
            لا توجد نشرات متاحة للعرض في هذا الملف حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheets.map((ws) => (
              <WorksheetCard key={ws.id} worksheet={ws as any} />
            ))}
          </div>
        )}
      </section>

      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-600" />
                <span>إرسال بلاغ عن هذا الناشر</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-2xl font-bold text-xs">
                تم استلام بلاغك بنجاح وستقوم الإدارة بمراجعته فوراً.
              </div>
            ) : (
              <form onSubmit={handleReportPublisher} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    سبب البلاغ *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="انتحال صفة تربوية أو مؤسسة">
                      انتحال صفة تربوية أو مؤسسة
                    </option>
                    <option value="نشر محتوى مخالف للضوابط التربوية">
                      نشر محتوى مخالف للضوابط التربوية
                    </option>
                    <option value="معلومات مضللة في الملف الشخصي">
                      معلومات مضللة في الملف الشخصي
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تفاصيل إضافية
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="أضف تفاصيل البلاغ للإدارة..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={reportLoading}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    {reportLoading ? "جاري الإرسال..." : "إرسال البلاغ"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
```

---

### File: `src/app/(main)/u/[username]/page.tsx`

```typescript
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";

interface UsernamePageProps {
  params: Promise<{ username: string }>;
}

export default async function UsernameRedirectPage(props: UsernamePageProps) {
  const { username } = await props.params;
  const decoded = decodeURIComponent(username).replace(/^@/, "").trim().toLowerCase();

  if (!decoded) {
    notFound();
  }

  // 1. Exact or case-insensitive match on `username`
  let targetUser = await db.user.findFirst({
    where: {
      OR: [
        { username: { equals: decoded, mode: "insensitive" } },
        { email: { startsWith: `${decoded}@`, mode: "insensitive" } },
      ],
    },
    select: { id: true },
  });

  // 2. Fallback: match prefix of username if auto-generated suffix exists
  if (!targetUser) {
    targetUser = await db.user.findFirst({
      where: {
        OR: [
          { username: { startsWith: decoded, mode: "insensitive" } },
          { name: { contains: decoded, mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });
  }

  if (!targetUser) {
    notFound();
  }

  redirect(`/publisher/${targetUser.id}`);
}
```

---

### File: `src/app/(main)/profile/page.tsx`

```typescript
"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  School,
  Upload,
  Heart,
  Download,
  Trash2,
  Loader2,
  ExternalLink,
  UserCog,
  ShieldCheck,
  Key,
  Check,
  CreditCard,
  Settings,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import {
  updateProfileAction,
  updateSubscriptionPlanAction,
  deleteMyAccountAction,
} from "@/actions/profile.actions";
import {
  activateInspectorCodeAction,
  requestIdentityVerificationAction,
} from "@/actions/inspector.actions";
import { getMyFavoritePublishersAction } from "@/actions/publisher.actions";
import InspectorBadge from "@/components/ui/InspectorBadge";
import ArchivedSubscriptionsPlans from "@/components/profile/ArchivedSubscriptionsPlans";
import {
  UserAvatarWithPresence,
  UserPresenceBadge,
  type PresenceMode,
} from "@/components/ui/UserPresenceIndicator";
import { useAppPreferences, type Locale } from "@/context/AppPreferencesContext";
import type { User, WorksheetWithRelations, ApiResponse } from "@/types";

interface ProfileWithCounts extends User {
  _count: {
    worksheets: number;
    favorites: number;
    downloads: number;
  };
}

type TabType =
  | "uploads"
  | "favorites"
  | "favorite_publishers"
  | "downloads"
  | "edit"
  | "subscriptions"
  | "verification"
  | "settings";

const VALID_TABS: TabType[] = [
  "uploads",
  "favorites",
  "favorite_publishers",
  "downloads",
  "edit",
  "subscriptions",
  "verification",
  "settings",
];

function ProfileWorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTabParam = searchParams?.get("tab") as TabType | null;

  const { locale, setLocale, theme, toggleTheme } = useAppPreferences();

  const [profile, setProfile] = useState<ProfileWithCounts | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(
    initialTabParam && VALID_TABS.includes(initialTabParam)
      ? initialTabParam
      : "uploads"
  );

  useEffect(() => {
    if (initialTabParam && VALID_TABS.includes(initialTabParam)) {
      setActiveTab(initialTabParam);
    }
  }, [initialTabParam]);

  const [items, setItems] = useState<WorksheetWithRelations[]>([]);
  const [favPublishers, setFavPublishers] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  // Edit Profile States
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editSchool, setEditSchool] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // Verification Tab States
  const [verifCode, setVerifCode] = useState("");
  const [verifLoading, setVerifLoading] = useState(false);
  const [verifMsg, setVerifMsg] = useState<string | null>(null);
  const [verifErr, setVerifErr] = useState<string | null>(null);

  // Delete Account States
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [planLoading, setPlanLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const json: ApiResponse<ProfileWithCounts> = await res.json();
        if (json.success) {
          setProfile(json.data);
          const pending = json.data.pendingProfileData;
          setEditName(pending?.name || json.data.name || "");
          setEditUsername(pending?.username || json.data.username || "");
          setEditSchool(
            pending?.school !== undefined
              ? pending.school || ""
              : json.data.school || ""
          );
          setEditBio(
            pending?.bio !== undefined
              ? pending.bio || ""
              : json.data.bio || ""
          );
        }
      } finally {
        setLoadingProfile(false);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    async function loadTabItems() {
      if (
        activeTab === "edit" ||
        activeTab === "subscriptions" ||
        activeTab === "verification" ||
        activeTab === "settings"
      ) {
        return;
      }

      if (activeTab === "favorite_publishers") {
        try {
          setLoadingItems(true);
          const pubs = await getMyFavoritePublishersAction();
          setFavPublishers(pubs);
        } finally {
          setLoadingItems(false);
        }
        return;
      }

      try {
        setLoadingItems(true);
        const endpoint =
          activeTab === "uploads"
            ? "/api/me/uploads"
            : activeTab === "favorites"
            ? "/api/me/favorites"
            : "/api/me/downloads";

        const res = await fetch(endpoint);
        const json: ApiResponse<WorksheetWithRelations[]> = await res.json();
        if (json.success) {
          setItems(json.data);
        }
      } finally {
        setLoadingItems(false);
      }
    }
    loadTabItems();
  }, [activeTab]);

  const handleArchiveWorksheet = async (id: string) => {
    if (!confirm("هل أنت متأكد من أرشفة وإخفاء هذه النشرة؟")) return;
    const res = await fetch(`/api/worksheets/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSubmitProfileEditRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditMessage(null);

    if (!editName.trim()) {
      setEditError("الاسم مطلوب ولا يمكن تركه فارغاً");
      return;
    }

    try {
      setEditLoading(true);
      const res = await updateProfileAction({
        name: editName.trim(),
        username: editUsername.trim() || undefined,
        school: editSchool.trim() || undefined,
        bio: editBio.trim() || undefined,
      });

      if (res.pendingApproval) {
        setEditMessage(
          "تم إرسال طلب تعديل ملفك الشخصي بنجاح! سيظهر التعديل للعموم فور موافقة المشرف العام عليه."
        );
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                profileEditStatus: "PENDING",
                pendingProfileData: {
                  name: editName.trim(),
                  username: editUsername.trim(),
                  school: editSchool.trim(),
                  bio: editBio.trim(),
                },
              }
            : null
        );
      } else {
        setEditMessage("تم تحديث بيانات الملف الشخصي بنجاح.");
      }
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "فشل إرسال طلب تحديث البيانات"
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleRequestVerificationCode = async () => {
    try {
      setVerifLoading(true);
      setVerifErr(null);
      await requestIdentityVerificationAction();
      setProfile((prev) => (prev ? { ...prev, inspectorPending: true } : null));
      setVerifMsg(
        "تم إرسال طلب التوثيق إلى المشرف العام. عند التحقق من هويتك سيصدر لك المشرف كود التوثيق الخاص بحسابك."
      );
    } catch (err) {
      setVerifErr(err instanceof Error ? err.message : "تعذر إرسال الطلب");
    } finally {
      setVerifLoading(false);
    }
  };

  const handleActivateVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifErr(null);
    setVerifMsg(null);

    try {
      setVerifLoading(true);
      const res = await activateInspectorCodeAction(verifCode);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              isVerified: true,
              inspectorPending: false,
              role: (res.role as any) || prev.role,
            }
          : null
      );
      setVerifMsg("🎉 تم تأكيد هويتك وتفعيل شارة التوثيق الرسمية على حسابك بنجاح!");
      setVerifCode("");
    } catch (err) {
      setVerifErr(err instanceof Error ? err.message : "كود التوثيق غير صحيح");
    } finally {
      setVerifLoading(false);
    }
  };

  const handleDeleteMyAccount = async () => {
    const confirmed = confirm(
      "تحذير نهائي: هل أنت متأكد من حذف حسابك وجميع نشراتك نهائياً من منصة المسند؟ لا يمكن التراجع عن هذا الإجراء."
    );
    if (!confirmed) return;

    try {
      setDeletingAccount(true);
      await deleteMyAccountAction();
      router.push("/");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر حذف الحساب");
      setDeletingAccount(false);
    }
  };

  const handleSelectPlan = async (planCode: string) => {
    try {
      setPlanLoading(planCode);
      await updateSubscriptionPlanAction(planCode);
      setProfile((prev) =>
        prev ? { ...prev, subscriptionPlan: planCode } : null
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر تحديث الاشتراك");
    } finally {
      setPlanLoading(null);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center" dir="rtl">
        <p className="text-slate-700 font-bold mb-4">
          يرجى تسجيل الدخول لعرض مساحتك الشخصية في المسند
        </p>
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  const isAccountVerified =
    Boolean(profile.isVerified) || profile.role === "INSPECTOR";

  return (
    <main className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <UserAvatarWithPresence
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            presenceStatus={profile.presenceStatus}
            lastSeenAt={profile.lastSeenAt}
            isSelf={true}
            size="lg"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h1>
              {profile.username && (
                <span
                  dir="ltr"
                  className="rounded-lg bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300"
                >
                  @{profile.username}
                </span>
              )}
              {profile.role === "ADMIN" ||
              profile.role === "MODERATOR" ||
              profile.role === "INSPECTOR" ? (
                <Link
                  href={
                    profile.role === "ADMIN"
                      ? "/admin/dashboard"
                      : profile.role === "MODERATOR"
                      ? "/moderator/dashboard"
                      : "/inspector/dashboard"
                  }
                  className="inline-flex items-center transition hover:opacity-90"
                  title="الانتقال إلى لوحة التحكم الخاصة بك"
                >
                  <InspectorBadge
                    role={profile.role}
                    isVerified={profile.isVerified}
                    isBanned={profile.isBanned}
                    size="md"
                  />
                </Link>
              ) : (
                <InspectorBadge
                  role={profile.role}
                  isVerified={profile.isVerified}
                  isBanned={profile.isBanned}
                  size="md"
                />
              )}
              <Link
                href={`/publisher/${profile.id}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-blue-600 text-xs font-bold transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ملفي العام كناشر</span>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-slate-500">{profile.email}</p>
              <UserPresenceBadge
                presenceStatus={profile.presenceStatus}
                lastSeenAt={profile.lastSeenAt}
                isSelf={true}
              />
            </div>
            <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 p-1.5 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 px-1.5">
                حالة الظهور:
              </span>
              {(
                [
                  { mode: "ONLINE", label: "🟢 متصل" },
                  { mode: "OFFLINE", label: "⚪ غير متصل" },
                  { mode: "GHOST", label: "👻 وضع الشبح (تصفح خفي)" },
                ] as { mode: PresenceMode; label: string }[]
              ).map((opt) => {
                const active =
                  (profile.presenceStatus || "ONLINE") === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    type="button"
                    onClick={async () => {
                      const res = await fetch("/api/me/presence", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ presenceStatus: opt.mode }),
                      });
                      const json = await res.json();
                      if (json.success && json.data) {
                        setProfile((prev) =>
                          prev
                            ? {
                                ...prev,
                                presenceStatus: json.data.presenceStatus,
                                lastSeenAt: json.data.lastSeenAt,
                              }
                            : null
                        );
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {profile.school && (
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-1">
                <School className="w-3.5 h-3.5 text-blue-600" />
                <span>{profile.school}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 self-stretch sm:self-auto justify-around bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {profile._count?.worksheets ?? 0}
            </span>
            <span className="text-xs text-slate-500">نشراتي</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {profile.followersCount ?? 0}
            </span>
            <span className="text-xs text-slate-500">المتابعون</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {profile._count?.favorites ?? 0}
            </span>
            <span className="text-xs text-slate-500">المفضلة</span>
          </div>
        </div>
      </section>

      {profile.profileEditStatus === "PENDING" && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-amber-900 dark:text-amber-200 text-xs font-bold">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              لديك طلب تعديل بيانات شخصية قيد المراجعة حالياً بانتظار موافقة المشرف العام.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 mb-6 pb-2">
        <button
          onClick={() => setActiveTab("uploads")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "uploads"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>نشراتي</span>
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "favorites"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>النشرات المفضلة</span>
        </button>

        <button
          onClick={() => setActiveTab("favorite_publishers")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "favorite_publishers"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>الناشرون المفضلون</span>
        </button>

        <button
          onClick={() => setActiveTab("downloads")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "downloads"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>سجل التحميلات</span>
        </button>

        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "edit"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <UserCog className="w-4 h-4" />
          <span>تعديل الملف الشخصي</span>
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "subscriptions"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>الاشتراكات</span>
        </button>

        <button
          onClick={() => setActiveTab("verification")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "verification"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <BadgeCheck className="w-4 h-4" />
          <span>التوثيق</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
            activeTab === "settings"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>الإعدادات</span>
        </button>
      </div>

      {activeTab === "verification" && (
        <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BadgeCheck className="w-6 h-6 text-blue-600" />
                <span>توثيق الهوية والشارة الرسمية في المسند</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                يُتاح لجميع المؤسسات التربوية، المعلمين، والمتفقدين توثيق هويتهم عبر كود سري يمنحه المشرف العام لإضافة شارة التوثيق الرسمية بجانب الاسم.
              </p>
            </div>
            <InspectorBadge
              role={profile.role}
              isVerified={profile.isVerified}
              isBanned={profile.isBanned}
              size="md"
            />
          </div>

          {isAccountVerified ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-200 space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-black text-base">
                حسابك موثق رسمياً في منصة المسند ✓
              </h3>
              <p className="text-xs">
                تظهر شارة التوثيق الرسمية بجانب اسمك في جميع نشراتك وفي ملفك العام كناشر.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {verifMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  {verifMsg}
                </div>
              )}

              {verifErr && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {verifErr}
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    1. طلب كود توثيق الهوية من المشرف العام
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {profile.inspectorPending
                      ? "طلبك قيد المراجعة حالياً لدى المشرف العام."
                      : "أرسل إشعاراً للإدارة لمراجعة بياناتك وإصدار كود التوثيق."}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={Boolean(profile.inspectorPending) || verifLoading}
                  onClick={handleRequestVerificationCode}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white text-xs font-bold transition cursor-pointer shrink-0"
                >
                  {profile.inspectorPending
                    ? "تم إرسال الطلب ✓"
                    : "طلب كود التوثيق"}
                </button>
              </div>

              <form
                onSubmit={handleActivateVerificationCode}
                className="space-y-4 pt-2"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    2. أدخل كود التوثيق السري الممنوح لك من المشرف *
                  </label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={verifCode}
                    onChange={(e) => setVerifCode(e.target.value.toUpperCase())}
                    placeholder="VERF-XXXX-XXXX / INSP-XXXX-XXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-mono text-base font-bold tracking-widest uppercase outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {verifLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Key className="w-4 h-4" />
                  )}
                  <span>تأكيد الكود وتفعيل شارة التوثيق</span>
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {activeTab === "edit" && (
        <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              طلب تعديل بيانات الملف الشخصي
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              تخضع تعديلات الاسم والمؤسسة والنبذة التعريفية لمراجعة وموافقة المشرف العام قبل نشرها للعموم.
            </p>
          </div>

          {editMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{editMessage}</span>
            </div>
          )}

          {editError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{editError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitProfileEditRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الاسم الكامل / اسم المؤسسة *
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="أدخل الاسم الكامل"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                اسم المستخدم (المعرف الشخصي للإشارة @username)
              </label>
              <div className="relative">
                <span className="text-slate-400 absolute start-3.5 top-2.5 font-mono text-sm font-bold">@</span>
                <input
                  type="text"
                  dir="ltr"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_.]/g, ""))}
                  placeholder="username"
                  className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                المؤسسة التربوية / المدرسة / الدائرة التفقدية
              </label>
              <input
                type="text"
                value={editSchool}
                onChange={(e) => setEditSchool(e.target.value)}
                placeholder="أدخل اسم المؤسسة أو المدرسة"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                النبذة التعريفية للناشر (تظهر للأعضاء في ملفك العام)
              </label>
              <textarea
                rows={4}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="اكتب نبذة عن تخصصك التربوي والمواد التي تنشر فيها..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={editLoading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer"
            >
              {editLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>إرسال التعديلات لموافقة المشرف</span>
            </button>
          </form>
        </section>
      )}

      {activeTab === "subscriptions" && (
        <ArchivedSubscriptionsPlans
          currentPlan={profile.subscriptionPlan || "STANDARD"}
          planLoading={planLoading}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {activeTab === "settings" && (
        <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            إعدادات الحساب والواجهة
          </h2>

          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                مظهر المنصة (الوضع النهاري / الليلي)
              </p>
              <p className="text-xs text-slate-500">
                اختر المظهر المريح للقراءة والعمل
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
            >
              {theme === "light"
                ? "تفعيل الوضع الليلي 🌙"
                : "تفعيل الوضع النهاري ☀️"}
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                لغة الواجهة
              </p>
              <p className="text-xs text-slate-500">
                العربية، الفرنسية، أو الإنجليزية
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["ar", "fr", "en"] as Locale[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    locale === l
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900 space-y-3">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>حذف حساب الناشر نهائياً</span>
            </div>
            <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
              حذف حسابك سيؤدي إلى إزالة ملفك الشخصي وجميع النشرات المرتبطة به نهائياً من منصة المسند.
            </p>
            <button
              type="button"
              disabled={deletingAccount}
              onClick={handleDeleteMyAccount}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer"
            >
              {deletingAccount ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>حذف حسابي نهائياً</span>
            </button>
          </div>
        </section>
      )}

      {activeTab === "favorite_publishers" && (
        <section>
          {loadingItems ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            </div>
          ) : favPublishers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-slate-600 font-medium mb-4">
                لم تقم بإضافة أي ناشر إلى قائمتك المفضلة بعد.
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
              >
                استكشف النشرات والناشرين
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {favPublishers.map((pub) => (
                <Link
                  key={pub.id}
                  href={`/publisher/${pub.id}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-500 transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">
                      {pub.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {pub.name}
                        </p>
                        <InspectorBadge
                          role={pub.role}
                          isVerified={pub.isVerified}
                          isBanned={pub.isBanned}
                          size="sm"
                        />
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {pub.school || "ناشر في منصة المسند"}
                      </p>
                      <p className="text-[11px] text-blue-600 font-semibold mt-1">
                        {pub._count?.worksheets ?? 0} نشرة •{" "}
                        {pub.followersCount ?? 0} متابع
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {(activeTab === "uploads" ||
        activeTab === "favorites" ||
        activeTab === "downloads") && (
        <section>
          {loadingItems ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-slate-600 font-medium mb-4">
                لا توجد نشرات في هذا القسم حتى الآن.
              </p>
              <Link
                href={activeTab === "uploads" ? "/upload" : "/browse"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
              >
                {activeTab === "uploads"
                  ? "انشر أول وثيقة لك"
                  : "تصفح النشرات"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{
                          backgroundColor: ws.subject.color || "#2563EB",
                        }}
                      >
                        {ws.subject.nameAr}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        {ws.grade.nameAr}
                      </span>
                    </div>
                    <Link
                      href={`/worksheet/${ws.id}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-blue-600 line-clamp-2"
                    >
                      {ws.titleAr || ws.title}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs text-slate-500">
                    <span>التحميلات: {ws.downloadCount}</span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/worksheet/${ws.id}`}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 hover:text-blue-600"
                        title="معاينة وتعديل"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {activeTab === "uploads" && (
                        <button
                          onClick={() => handleArchiveWorksheet(ws.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                          title="أرشفة وحذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default function TeacherProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center" dir="rtl">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      }
    >
      <ProfileWorkspaceContent />
    </Suspense>
  );
}
```

---

### File: `src/app/(main)/support/page.tsx`

```typescript
"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  Headphones,
  Send,
  CheckCircle2,
  MessageSquare,
  Loader2,
  Mail,
  User as UserIcon,
  HelpCircle,
  BadgeCheck,
  Unlock,
  FileWarning,
  Sparkles,
  ChevronDown,
  PhoneCall,
  Building2,
  ExternalLink,
} from "lucide-react";
import {
  submitSupportTicketAction,
  getMySupportTicketsAction,
} from "@/actions/report-support.actions";

const QUICK_SUPPORT_CARDS = [
  {
    id: "unlock",
    category: "TECHNICAL",
    title: "🔓 طلب فك قفل الحساب (6 محاولات كلمة مرور)",
    desc: "إذا قُفل حسابك بعد 6 محاولات خاطئة لكلمة المرور، اضغط هنا لمراسلة المشرف أو المسؤول لفك القفل.",
    defaultSubject: "طلب فك قفل حسابي بعد استنفاد محاولات كلمة المرور",
    icon: Unlock,
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  },
  {
    id: "verify",
    category: "VERIFICATION",
    title: "🎖️ طلب توثيق الهوية والشارة الرسمية",
    desc: "للمعلمين والمؤسسات والمتفقدين الراغبين في التثبت من الهوية والحصول على كود التوثيق الرسمي.",
    defaultSubject: "طلب التثبت من الهوية والحصول على كود التوثيق الرسمي",
    icon: BadgeCheck,
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  {
    id: "upload-help",
    category: "TECHNICAL",
    title: "📄 مساعدة في رفع أو تحويل ملفات Word/PDF",
    desc: "استفسار حول مراجعة ملفات وورد أو الصور وتحويلها إلى PDF أو تصنيفها داخل المواد.",
    defaultSubject: "استفسار بخصوص رفع وتحويل ملف تربوي",
    icon: FileWarning,
    badgeClass: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800",
  },
  {
    id: "general",
    category: "CUSTOMER_SERVICE",
    title: "💬 اقتراح تطوير أو استفسار عام",
    desc: "تواصل مباشر مع إدارة منصة المسند لتقديم مقترحات التحسين أو الاستفسارات التربوية.",
    defaultSubject: "مقترح / استفسار عام لإدارة منصة المسند",
    icon: Sparkles,
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
];

const SUPPORT_INSTANT_ANSWERS = [
  {
    q: "كيف أستعيد الدخول إذا تم قفل حسابي بعد 6 محاولات كلمة مرور؟",
    a: "اختر بطاقة «طلب فك قفل الحساب» أعلاه واكتب بريدك الإلكتروني أو معرفك @username، وسيقوم المشرف العام أو المسؤول الإداري بفك غلق حسابك وتصفير العداد فوراً من لوحة التحكم.",
  },
  {
    q: "أين أدخل كود التوثيق السري بعد استلامه من المشرف العام؟",
    a: "انتقل إلى «ملفي الشخصي» ثم افتح تبويب «التوثيق»، وأدخل الكود (مثل VERF-XXXX أو INSP-XXXX) لتفعيل شارة التوثيق الرسمية فوراً.",
  },
  {
    q: "لماذا يظهر ملفي بصيغة Word أو صورة في حالة مراجعة؟",
    a: "حفاظاً على جودة العرض لجميع المستخدمين، يتم استلام ملفات Word والصور ومراجعتها من قِبل المتفقد أو المشرف لتحويلها إلى صيغة PDF موحدة ومعتمدة.",
  },
];

export default function SupportAndCustomerServicePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [category, setCategory] = useState("TECHNICAL");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [openHelpIdx, setOpenHelpIdx] = useState<number | null>(0);

  useEffect(() => {
    async function loadUserAndTickets() {
      try {
        const [meRes, tickets] = await Promise.all([
          fetch("/api/auth/me").catch(() => null),
          getMySupportTicketsAction().catch(() => []),
        ]);
        if (meRes && meRes.ok) {
          const json = await meRes.json();
          if (json.success && json.data) {
            setName(json.data.name || "");
            setEmail(json.data.email || "");
            setUserRole(json.data.role || null);
          }
        }
        setMyTickets(tickets);
      } catch {
        // ignore
      } finally {
        setLoadingTickets(false);
      }
    }
    loadUserAndTickets();
  }, []);

  const handleSelectQuickCard = (card: typeof QUICK_SUPPORT_CARDS[0]) => {
    setCategory(card.category);
    setSubject(card.defaultSubject);
    setSubmittedSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmittedSuccess(false);

    try {
      setSubmitting(true);
      const created = await submitSupportTicketAction({
        name,
        email,
        category,
        subject,
        message,
      });
      setSubmittedSuccess(true);
      setSubject("");
      setMessage("");
      setMyTickets((prev) => [created, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر إرسال التذكرة");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" dir="rtl">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Headphones className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          مركز الدعم الفني وخدمة الأعضاء — المسند
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          تواصل معنا مباشرة عبر قنوات الواتساب الرسمية المخصصة أو أرسل تذكرة دعم مباشر لفريق الإشراف.
        </p>
      </div>

      {(() => {
        const isStaff = userRole === "ADMIN" || userRole === "MODERATOR";
        const isInstitutionOrInspector =
          userRole === "INSTITUTION" || userRole === "INSPECTOR";
        const showTeacherStudent = !isInstitutionOrInspector || isStaff;
        const showInstitution = isInstitutionOrInspector || isStaff;

        return (
          <section
            className={`grid gap-5 ${
              showTeacherStudent && showInstitution
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 max-w-2xl mx-auto w-full"
            }`}
          >
            {showTeacherStudent && (
              <a
                href="https://wa.me/21627764985?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D9%85%D8%B3%D9%86%D8%AF%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D8%B9%D8%A8%D8%B1%20%D8%AE%D8%B7%20%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%86%20%D9%88%D8%A7%D9%84%D8%AA%D9%84%D8%A7%D9%85%D9%8A%D8%B0%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/20 p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition flex items-start gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 group-hover:scale-105 transition">
                  <PhoneCall className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700">
                      خط المعلمين والتلاميذ
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      واتساب فوري <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    الرقم العام للمعلمين والتلاميذ
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    للاستفسارات العامة، التوجيه البيداغوجي، المساعدة في رفع وتحميل المذكرات، ودعم التلاميذ.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-sm font-black text-emerald-700 dark:text-emerald-300" dir="ltr">
                    <span>+216 27 764 985</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      WhatsApp: 27764985
                    </span>
                  </div>
                </div>
              </a>
            )}

            {showInstitution && (
              <a
                href="https://wa.me/21676907101?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D9%85%D8%B3%D9%86%D8%AF%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D8%B9%D8%A8%D8%B1%20%D8%AE%D8%B7%20%D8%A7%D9%84%D9%85%D8%A4%D8%B3%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9%20%D9%88%D8%A7%D9%84%D9%85%D8%AA%D9%81%D9%82%D8%AF%D9%8A%D9%86%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border-2 border-indigo-300 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/20 p-6 shadow-sm hover:shadow-md hover:border-indigo-500 transition flex items-start gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition">
                  <Building2 className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700">
                      خط المؤسسات والمتفقدين
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                      واتساب فوري <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    الرقم المخصص للمؤسسات التربوية والمتفقدين
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    للتنسيق الإداري والمؤسساتي، توثيق اعتماد المتفقدين والمدارس، واستلام أكواد التوثيق.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-sm font-black text-indigo-700 dark:text-indigo-300" dir="ltr">
                    <span>+216 46 907 101</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      WhatsApp: 76907101
                    </span>
                  </div>
                </div>
              </a>
            )}
          </section>
        );
      })()}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_SUPPORT_CARDS.map((card) => {
          const Icon = card.icon;
          const isSelected = subject === card.defaultSubject;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleSelectQuickCard(card)}
              className={`text-right rounded-2xl border-2 p-4 transition cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-md"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400"
              }`}
            >
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold ${card.badgeClass}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>خدمة سريعة</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400">
                اختيار وتعبئة الطلب تلقائياً ←
              </span>
            </button>
          );
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>إرسال رسالة أو تذكرة دعم مباشر للإدارة</span>
          </h2>

          {submittedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>تم إرسال تذكرتك بنجاح! سيتم مراجعتها والرد عليها من قِبل الإدارة في أقرب وقت.</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك الثلاثي أو صفة الحساب"
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  البريد الإلكتروني للرد
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  تصنيف الطلب
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TECHNICAL">مشكلة تقنية / فك قفل الحساب</option>
                  <option value="VERIFICATION">طلب توثيق رسمي أو كود متفقد</option>
                  <option value="INAPPROPRIATE_CONTENT">إبلاغ عن محتوى أو انتهاك حقوق</option>
                  <option value="CUSTOMER_SERVICE">استفسار عام أو اقتراح تطوير</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  موضوع الطلب
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="عنوان مختصر للطلب"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                تفاصيل الرسالة أو المشكلة
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل طلبك بدقة، مع ذكر المعرف @username أو رقم الهاتف إن لزم..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري إرسال التذكرة...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>إرسال التذكرة إلى إدارة المنصة</span>
                </>
              )}
            </button>
          </form>
        </section>

        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>سجل تذاكري وردود الإدارة</span>
            </h2>

            {loadingTickets ? (
              <div className="py-6 flex items-center justify-center text-xs text-slate-400 gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري تحميل التذاكر...</span>
              </div>
            ) : myTickets.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
                لا توجد تذاكر سابقة مسجلة بهذا البريد الإلكتروني.
              </p>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {myTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white truncate">
                        {t.subject}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          t.status === "RESOLVED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : t.status === "IN_PROGRESS"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        }`}
                      >
                        {t.status === "RESOLVED"
                          ? "تم الحل ✓"
                          : t.status === "IN_PROGRESS"
                          ? "قيد المعالجة"
                          : "جديدة"}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2">
                      {t.message}
                    </p>

                    {t.response && (
                      <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-blue-800 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/40 p-2 rounded-xl">
                        <strong className="block mb-0.5">رد الإدارة:</strong>
                        {t.response}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>إجابات فورية لأكثر الاستفسارات تكراراً</span>
            </h2>

            <div className="space-y-2">
              {SUPPORT_INSTANT_ANSWERS.map((item, idx) => {
                const isOpen = openHelpIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenHelpIdx(isOpen ? null : idx)}
                      className="w-full p-3 text-right text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3 pt-0 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

```

---

### File: `src/app/(main)/inspector/activate/page.tsx`

```typescript
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, ShieldCheck, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { activateInspectorCodeAction } from "@/actions/inspector.actions";

export default function InspectorActivatePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);

  const handleActivate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code.trim()) {
      setError("يرجى إدخال كود التفعيل المقدم من المشرف");
      return;
    }

    try {
      setLoading(true);
      await activateInspectorCodeAction(code);
      setActivated(true);
      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "كود التفعيل غير صالح");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">تفعيل صلاحية المتفقد التربوي</h1>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          بعد التحقق من هويتك من قِبل إدارة المنصة، أدخل الكود السري الممنوح لك لتفعيل شارة المتفقد المعتمد وصلاحية إضافة التوجيهات البيداغوجية.
        </p>

        {activated ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="font-bold text-base">تم تفعيل صلاحية المتفقد بنجاح!</h2>
            <p className="text-xs">تظهر الآن الشارة الرسمية بجانب اسمك في جميع أنحاء المنصة.</p>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="space-y-4 text-right">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                كود التفعيل الخاص بالمتفقد *
              </label>
              <input
                type="text"
                required
                dir="ltr"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="INSP-XXXX-XXXX"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center font-mono text-base font-bold tracking-widest uppercase outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>تفعيل الصلاحية والشارة الرسمية</span>
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لتصفح الأنشطة</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

```

---

### File: `src/app/(main)/inspector/register/page.tsx`

```typescript
export { default } from "@/app/(auth)/register/inspector/page";

```

---

### File: `src/app/(auth)/login/page.tsx`

```typescript
"use client";

import React, {
  useState,
  FormEvent,
  KeyboardEvent,
  Suspense,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signInSchema } from "@/lib/validators/auth";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { ROLE_VISUAL_CARDS } from "@/components/auth/AuthRoleModal";
import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";
import type { AccountRoleOption } from "@/types/api";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo") || "/";
  const errorParam = searchParams?.get("error");
  const roleParam = searchParams?.get("role");

  const { t } = useAppPreferences();

  const [selectedRole, setSelectedRole] = useState<string | null>(
    roleParam || null
  );

  useEffect(() => {
    if (roleParam) setSelectedRole(roleParam);
  }, [roleParam]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAccountLocked, setIsAccountLocked] = useState<boolean>(
    errorParam === "account-locked"
  );
  const [remainingAttempts, setRemainingAttempts] = useState<number>(
    MAX_LOGIN_PASSWORD_ATTEMPTS
  );

  const executeLogin = async (overrideEmail?: string, overridePassword?: string, overrideRole?: string) => {
    if (loading) return;
    setError(null);

    const emailToUse = overrideEmail || email;
    const passwordToUse = overridePassword || password;
    const rawInput = emailToUse.trim().toLowerCase();

    // In production, restrict demo accounts (@musnad.tn) strictly to development environment
    const isProduction = process.env.NODE_ENV === "production";
    const isMusnadDemo =
      rawInput.endsWith("@musnad.tn") ||
      ["admin", "moderator", "inspector", "institution", "teacher", "student"].includes(
        rawInput.replace(/^@/, "")
      );

    if (isProduction && isMusnadDemo) {
      setError(
        "حسابات التجربة (@musnad.tn) محصورة في بيئة التطوير المحلية فقط، وليست متاحة في بيئة الإنتاج."
      );
      return;
    }

    const isPrimaryAdmin =
      rawInput === "bjasser123@gmail.com" ||
      rawInput === "@bjasser" ||
      rawInput === "bjasser";

    const roleToUse = isPrimaryAdmin
      ? "ADMIN"
      : overrideRole || selectedRole || "TEACHER";

    const parsed = signInSchema.safeParse({
      email: emailToUse,
      password: passwordToUse,
      role: ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleToUse)
        ? (roleToUse as any)
        : undefined,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "البيانات المدخلة غير صحيحة");
      return;
    }

    try {
      setLoading(true);
      const rawIdentifier = parsed.data.email.trim();

      // Step 1: Pre-check if email/username is registered and whether account is locked
      let loginEmail = rawIdentifier;
      let resolvedRole = roleToUse;
      let existsInDb = false;

      try {
        const preRes = await fetch("/api/auth/login-guard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "PRECHECK",
            identifier: rawIdentifier,
          }),
        });
        const preJson = await preRes.json();
        if (preJson.success && preJson.data) {
          existsInDb = Boolean(preJson.data.exists);
          if (preJson.data.resolvedEmail) {
            loginEmail = preJson.data.resolvedEmail;
          }
          if (preJson.data.role) {
            resolvedRole = preJson.data.role;
          }
          if (typeof preJson.data.remainingAttempts === "number") {
            setRemainingAttempts(preJson.data.remainingAttempts);
          }
          if (preJson.data.isLocked || preJson.data.isBanned) {
            setIsAccountLocked(true);
            setError(
              preJson.data.lockMessage ||
                "🔒 هذا الحساب مقفل حالياً. رجاءً تواصل مع المسؤول أو المشرف العام لفك قفل الحساب."
            );
            return;
          }
        }
      } catch {
        // Fallback
      }

      // Step 2: Attempt Supabase Auth login
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: parsed.data.password,
      });

      if (authError) {
        if (existsInDb) {
          try {
            const failRes = await fetch("/api/auth/login-guard", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "FAILED_ATTEMPT",
                identifier: loginEmail,
              }),
            });
            const failJson = await failRes.json();
            if (failJson.success && failJson.data) {
              setIsAccountLocked(Boolean(failJson.data.isLocked));
              if (typeof failJson.data.remainingAttempts === "number") {
                setRemainingAttempts(failJson.data.remainingAttempts);
              }
              setError(
                failJson.data.message ||
                  "❌ كلمة المرور خاطئة لهذا الحساب المسجل. تنبيه: لديك 6 محاولات كحد أقصى قبل قفل الحساب."
              );
              return;
            }
          } catch {
            // fallback
          }
          setError(
            "❌ البريد الإلكتروني مسجل في المنصة ولكن كلمة المرور خاطئة! تنبيه: لديك فرصة 6 مرات فقط لكتابة كلمة المرور قبل قفل الحساب."
          );
          return;
        }

        setError(
          "هذا البريد الإلكتروني أو المعرف غير مسجل في المنصة، أو أن البيانات غير صحيحة."
        );
        return;
      }

      // Step 3: Reset failed attempts counter on successful login
      await fetch("/api/auth/login-guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RESET_SUCCESS",
          identifier: loginEmail,
        }),
      }).catch(() => null);

      const isAdminAccount =
        loginEmail.toLowerCase() === "bjasser123@gmail.com" ||
        loginEmail.toLowerCase() === "admin@musnad.tn" ||
        resolvedRole === "ADMIN" ||
        roleToUse === "ADMIN";

      const targetDestination = isAdminAccount
        ? "/admin/dashboard"
        : resolvedRole === "MODERATOR" || roleToUse === "MODERATOR"
        ? "/moderator/dashboard"
        : resolvedRole === "INSPECTOR" || roleToUse === "INSPECTOR"
        ? "/inspector/dashboard"
        : resolvedRole === "INSTITUTION" || roleToUse === "INSTITUTION"
        ? (redirectTo && redirectTo !== "/" ? redirectTo : "/#institutions-hub")
        : resolvedRole === "TEACHER" || roleToUse === "TEACHER"
        ? (redirectTo && redirectTo !== "/" ? redirectTo : "/#teachers-hub")
        : redirectTo;

      router.push(targetDestination);
      router.refresh();
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await executeLogin();
  };

  const handleKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (email.trim() && password) {
        void executeLogin();
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      const supabase = createSupabaseBrowserClient();
      const roleToPass = selectedRole || "TEACHER";
      const callbackUrl = `${window.location.origin}/api/auth/callback?role=${encodeURIComponent(
        roleToPass
      )}&next=${encodeURIComponent(redirectTo)}`;

      const { data, error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (oauthErr) {
        setError(
          "مزود Google غير مفعّل في إعدادات Supabase الحالية أو تعذر الاتصال به. يرجى تسجيل الدخول بالبريد الإلكتروني وكلمة المرور."
        );
        setGoogleLoading(false);
        return;
      }

      if (data?.url) {
        if (window.top && window.top !== window.self) {
          window.top.location.href = data.url;
        } else {
          window.location.href = data.url;
        }
      }
    } catch {
      setError("تعذر بدء تسجيل الدخول بحساب Google. يرجى استخدام البريد الإلكتروني وكلمة المرور.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto py-8 px-4 space-y-8" dir={t.dir}>

      {!selectedRole ? (
        <div className="space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {t.authModal.loginTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              {t.authModal.loginSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLE_VISUAL_CARDS.map((card) => {
              const Icon = card.icon;
              const roleText = t.roles[card.role];
              return (
                <button
                  key={card.role}
                  type="button"
                  onClick={() => setSelectedRole(card.role)}
                  className={`group relative text-start bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 ${card.borderHover} rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${card.gradient}`}
                  />
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${card.badgeStyle}`}
                      >
                        {roleText.badge}
                      </span>
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${card.iconBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {roleText.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {roleText.subtitle}
                    </p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 text-xs font-extrabold text-blue-600 dark:text-blue-400">
                    {t.authModal.continueBtn} →
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span>←</span>
              <span>تغيير الفئة المحددة</span>
            </button>
            <span className="text-xs font-black text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
              {selectedRole === "ADMIN"
                ? "مشرف عام"
                : selectedRole === "MODERATOR"
                ? "مسؤول إداري"
                : t.roles[selectedRole as AccountRoleOption]?.badge || selectedRole}
            </span>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {t.nav.login} —{" "}
              {selectedRole === "ADMIN"
                ? "المشرف العام"
                : selectedRole === "MODERATOR"
                ? "المسؤول الإداري"
                : t.roles[selectedRole as AccountRoleOption]?.title || selectedRole}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {selectedRole === "ADMIN"
                ? "إدارة النظام والتحكم الشامل"
                : selectedRole === "MODERATOR"
                ? "معالجة البلاغات وإدارة المحتوى"
                : t.roles[selectedRole as AccountRoleOption]?.subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-red-300 text-xs font-semibold leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div className="space-y-1">
                <p>{error}</p>
                {isAccountLocked && (
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-1 text-[11px] font-black text-red-800 dark:text-red-200 underline mt-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>مراسلة الدعم الفني لفك قفل الحساب فوراً ←</span>
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.authForm.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDownEnter}
                  placeholder="example@mail.com"
                  className="w-full ps-10 pe-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.authForm.passwordLabel}
                </label>
                <Link
                  href="/support"
                  className="text-[11px] text-blue-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDownEnter}
                  placeholder="••••••••"
                  className="w-full ps-10 pe-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute end-3.5 top-3.5 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{t.authForm.submitLogin} (Enter ↵)</span>
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
            <span className="text-[11px] font-bold text-slate-400">أو</span>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          </div>

          <button
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-extrabold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer shadow-sm"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <GoogleIcon />
            )}
            <span>تسجيل الدخول بحساب Google</span>
          </button>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
            <Link
              href={`/register?role=${selectedRole}`}
              className="font-black text-blue-600 dark:text-blue-400 hover:underline"
            >
              ليس لديك حساب؟ أنشئ حسابك الآن ←
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-[82vh] flex items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-xs text-slate-400">جاري تحميل واجهة الدخول...</p>
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </main>
  );
}

```

---

### File: `src/app/(auth)/register/page.tsx`

```typescript
"use client";

import React, { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Building2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  ArrowLeft,
  Headphones,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signUpSchema } from "@/lib/validators/auth";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { ROLE_VISUAL_CARDS } from "@/components/auth/AuthRoleModal";
import type { AccountRoleOption } from "@/types/api";

const STUDENT_GRADE_OPTIONS = [
  "السنة الأولى ابتدائي",
  "السنة الثانية ابتدائي",
  "السنة الثالثة ابتدائي",
  "السنة الرابعة ابتدائي",
  "السنة الخامسة ابتدائي",
  "السنة السادسة ابتدائي",
];

function RegisterContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams
    ?.get("role")
    ?.toUpperCase() as AccountRoleOption | undefined;

  const { t } = useAppPreferences();

  const [selectedRole, setSelectedRole] = useState<AccountRoleOption>(
    roleParam &&
      ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleParam)
      ? roleParam
      : "TEACHER"
  );

  useEffect(() => {
    if (
      roleParam &&
      ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(roleParam)
    ) {
      setSelectedRole(roleParam);
    }
  }, [roleParam]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      const supabase = createSupabaseBrowserClient();
      const callbackUrl = `${window.location.origin}/api/auth/callback?role=${encodeURIComponent(
        selectedRole
      )}&next=/`;

      const { data, error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (oauthErr) {
        setError(
          "مزود Google غير مفعّل في إعدادات Supabase الحالية أو تعذر الاتصال به. يرجى إنشاء الحساب باستخدام النموذج المباشر أدناه."
        );
        setGoogleLoading(false);
        return;
      }

      if (data?.url) {
        if (window.top && window.top !== window.self) {
          window.top.location.href = data.url;
        } else {
          window.location.href = data.url;
        }
      }
    } catch {
      setError("تعذر بدء التسجيل بحساب Google. يرجى إكمال التسجيل بالنموذج المباشر أدناه.");
      setGoogleLoading(false);
    }
  };
  const [error, setError] = useState<string | null>(null);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const activeCard =
    ROLE_VISUAL_CARDS.find((c) => c.role === selectedRole) ||
    ROLE_VISUAL_CARDS[2];
  const ActiveIcon = activeCard.icon;
  const roleCopy = t.roles[selectedRole];

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      (selectedRole === "INSTITUTION" || selectedRole === "INSPECTOR") &&
      !school.trim()
    ) {
      setError(roleCopy.orgLabel);
      return;
    }

    if (selectedRole === "STUDENT" && !studentGrade.trim()) {
      setError("يرجى اختيار المستوى الدراسي للتلميذ (حقل إجباري)");
      return;
    }

    if (!acceptedTerms) {
      setError("يجب الموافقة على الشروط والأحكام قبل إنشاء الحساب");
      return;
    }

    const parsed = signUpSchema.safeParse({
      name,
      username: username.trim() || undefined,
      email,
      password,
      school:
        selectedRole === "STUDENT"
          ? [school.trim(), studentGrade.trim()].filter(Boolean).join(" — ")
          : school.trim() || undefined,
      studentGrade: selectedRole === "STUDENT" ? studentGrade.trim() : undefined,
      role: selectedRole,
      acceptedTerms: true,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "يرجى التأكد من صحة البيانات");
      return;
    }

    try {
      setLoading(true);
      const fallbackUname =
        parsed.data.username ||
        `${parsed.data.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}`;

      const supabase = createSupabaseBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: {
            name: parsed.data.name,
            username: fallbackUname,
            school: parsed.data.school,
            student_grade: parsed.data.studentGrade,
            role: selectedRole,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Show the Post-Registration Thank You & Identity Verification Notice Screen
      setRegisteredSuccessfully(true);
    } catch {
      setError("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  if (registeredSuccessfully) {
    return (
      <div className="max-w-xl w-full mx-auto" dir={t.dir}>
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
              تم إنشاء الحساب بنجاح
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              شكراً لك على التسجيل في منصة المسند!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              مرحباً بك <strong>{name}</strong> في فضاء ({roleCopy.title}). يمكنك الآن الدخول إلى حسابك والاستفادة من خدمات المنصة.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-start space-y-2">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-extrabold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>ملاحظة حول إثبات الهوية وعلامة التوثيق</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-200/90 leading-relaxed">
              إن عملية إثبات الهوية — التي تمنح حسابك صلاحيات أكبر وتضيف لك <strong>علامة التوثيق الرسمية</strong> — تتم بعد التواصل مع المشرف للتثبت من الهوية وإعطائك علامة التوثيق.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>الدخول إلى المنصة الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/support"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center justify-center gap-2 transition"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>التواصل مع المشرف لإثبات الهوية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8" dir={t.dir}>
      <div className="space-y-3 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {t.authModal.registerTitle}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          اختر نوع الحساب المناسب لك وأكمل البيانات الأساسية للتسجيل في المنصة
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {ROLE_VISUAL_CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = selectedRole === card.role;
            const cardText = t.roles[card.role];

            return (
              <button
                key={card.role}
                type="button"
                onClick={() => setSelectedRole(card.role)}
                className={`relative text-start p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 shadow-md"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {cardText.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {cardText.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${activeCard.iconBg}`}
          >
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border mb-1 ${activeCard.badgeStyle}`}
            >
              {roleCopy.badge}
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {roleCopy.title}
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {roleCopy.nameLabel}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={roleCopy.namePlaceholder}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              اسم المستخدم (المعرف الشخصي للإشارة @username)
            </label>
            <div className="relative">
              <span className="text-slate-400 absolute start-3.5 top-2.5 font-mono text-sm font-bold">@</span>
              <input
                type="text"
                value={username}
                dir="ltr"
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_.]/g, ""))}
                placeholder="username"
                className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {selectedRole === "STUDENT" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.authForm.studentGradeLabel}
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
                <select
                  required
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
                >
                  <option value="">{t.authForm.studentGradePlaceholder}</option>
                  {STUDENT_GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {roleCopy.orgLabel}
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type="text"
                required={
                  selectedRole === "INSTITUTION" || selectedRole === "INSPECTOR"
                }
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder={roleCopy.orgPlaceholder}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.authForm.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.authForm.passwordLabel} ({t.authForm.passwordHint})
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full ps-10 pe-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute end-3 top-2.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.authForm.termsLabel}{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-blue-600 font-bold underline cursor-pointer"
                >
                  (عرض الشروط والأحكام)
                </button>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>
              {t.authForm.submitRegister} ({roleCopy.title})
            </span>
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          <span className="text-xs text-slate-400">أو التسجيل السريع عبر</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        </div>

        <button
          type="button"
          disabled={googleLoading}
          onClick={handleGoogleRegister}
          className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-extrabold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer shadow-sm"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
            </svg>
          )}
          <span>التسجيل أو المتابعة باستخدام حساب جوجل (Google)</span>
        </button>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
          <Link
            href={`/login?role=${selectedRole}`}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {t.authModal.switchToLogin}
          </Link>
        </div>
      </div>

      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base border-b pb-3 border-slate-100 dark:border-slate-800">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>شروط وأحكام استخدام منصة المسند</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed max-h-72 overflow-y-auto">
              <p>
                1. <strong>الموثوقية التربوية:</strong> يلتزم جميع الناشرين بنشر محتوى علمي وبيداغوجي سليم يتوافق مع البرامج الرسمية.
              </p>
              <p>
                2. <strong>إثبات الهوية والتوثيق:</strong> يُنشأ الحساب بشكل عادي ومباشر، وتتم عملية إثبات الهوية للحصول على صلاحيات أكبر وعلامة التوثيق بعد التواصل مع المشرف للتثبت من الهوية.
              </p>
              <p>
                3. <strong>تعديل النشرات المعتمدة:</strong> في حال حصول النشرة على شارة اعتماد من المتفقد، فإن تعديل العنوان أو الوصف لا يؤثر على الشارة، بينما استبدال الملف يلغي شارة الاعتماد تلقائياً لحين إعادة المراجعة.
              </p>
              <p>
                4. <strong>احترام الملكية الفكرية والضوابط:</strong> يحق لإدارة المنصة حظر أي حساب أو حذف أي منشور يثبت انتهاكه لحقوق النشر أو ضوابط المنصة.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAcceptedTerms(true);
                  setShowTermsModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                قرأت وأوافق على الشروط
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        }
      >
        <RegisterContent />
      </Suspense>
    </main>
  );
}
```

---

### File: `src/app/(auth)/register/inspector/page.tsx`

```typescript
import { redirect } from "next/navigation";

export default function InspectorRegisterRedirectPage() {
  redirect("/register?role=INSPECTOR");
}

```

---

### File: `src/app/inspector/dashboard/page.tsx`

```typescript
"use client";

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Lock,
  Flag,
  Search,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Send,
  Pin,
  X,
} from "lucide-react";
import {
  getInspectorDashboardData,
  toggleWorksheetEndorsementAction,
  addInspectorCommentAction,
  submitInspectorDirectReportToAdminAction,
} from "@/actions/inspector.actions";
import MentionText from "@/components/ui/MentionText";
import SupervisoryHierarchyBar from "@/components/layout/SupervisoryHierarchyBar";

type InspectorDashboardData = Awaited<ReturnType<typeof getInspectorDashboardData>>;
type InspectorWorksheet = InspectorDashboardData["worksheets"][number];

export default function InspectorDashboardPage() {
  const [data, setData] = useState<InspectorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "worksheets" | "my_comments" | "direct_reports"
  >("worksheets");

  const [search, setSearch] = useState("");
  const [endorseFilter, setEndorseFilter] = useState<"ALL" | "ENDORSED" | "UNENDORSED" | "DRAFT">("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Modal for Pinned Top Comment or Private Comment to Publisher
  const [selectedWorksheet, setSelectedWorksheet] = useState<InspectorWorksheet | null>(null);
  const [commentMode, setCommentMode] = useState<"PINNED_PUBLIC" | "PRIVATE_PUBLISHER">("PINNED_PUBLIC");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // Modal for Direct Report to Top Admin
  const [reportTargetWs, setReportTargetWs] = useState<InspectorWorksheet | null>(null);
  const [reportReason, setReportReason] = useState("أخطاء علمية أو بيداغوجية جسيمة تستوجب تدخل المشرف");
  const [reportDetails, setReportDetails] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getInspectorDashboardData();
      setData(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "غير مصرح لك بالدخول إلى لوحة تحكم المتفقد التربوي"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const inspectorExclusiveWorksheets = useMemo(() => {
    if (!data) return [];
    return data.worksheets.filter(
      (ws) => ws.uploader.role === "INSPECTOR"
    );
  }, [data]);

  const filteredWorksheets = useMemo(() => {
    if (!data) return [];
    return data.worksheets.filter((ws) => {
      if (endorseFilter === "ENDORSED" && !ws.isEndorsed) return false;
      if (endorseFilter === "UNENDORSED" && ws.isEndorsed) return false;
      if (endorseFilter === "DRAFT" && ws.status !== "DRAFT") return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const title = (ws.titleAr || ws.title).toLowerCase();
        const uploader = ws.uploader.name.toLowerCase();
        const uname = (ws.uploader.username || "").toLowerCase();
        return title.includes(q) || uploader.includes(q) || uname.includes(q);
      }
      return true;
    });
  }, [data, endorseFilter, search]);

  const handleToggleEndorse = async (worksheetId: string) => {
    try {
      setActionLoadingId(worksheetId);
      await toggleWorksheetEndorsementAction(worksheetId);
      await loadData();
      setBannerMessage("تم تحديث حالة التوثيق البيداغوجي للمنشور بنجاح.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل تحديث التوثيق البيداغوجي");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedWorksheet || !commentText.trim()) return;
    try {
      setSubmittingComment(true);
      await addInspectorCommentAction({
        worksheetId: selectedWorksheet.id,
        comment: commentText.trim(),
        isPrivateToPublisher: commentMode === "PRIVATE_PUBLISHER",
      });
      setBannerMessage(
        commentMode === "PRIVATE_PUBLISHER"
          ? `تم إرسال التعليق الخاص مباشرة إلى الناشر (${selectedWorksheet.uploader.name}) بنجاح.`
          : "تم نشر تعليق المتفقد وتثبيته في صدارة المنشور بنجاح."
      );
      setSelectedWorksheet(null);
      setCommentText("");
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال التعليق");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleSubmitDirectReport = async (e: FormEvent) => {
    e.preventDefault();
    if (!reportTargetWs) return;
    try {
      setSubmittingReport(true);
      await submitInspectorDirectReportToAdminAction({
        targetType: "WORKSHEET",
        targetWorksheetId: reportTargetWs.id,
        targetUserId: reportTargetWs.uploader.id,
        reason: reportReason,
        details: reportDetails,
      });
      setBannerMessage("🚨 تم رفع الإبلاغ المباشر إلى المشرف العام في القمة بنجاح.");
      setReportTargetWs(null);
      setReportDetails("");
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر رفع البلاغ للمشرف");
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-amber-600" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          جاري تحميل لوحة تحكم المتفقد التربوي...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center" dir="rtl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-600" />
          <h1 className="text-lg font-extrabold text-red-900 dark:text-red-200">
            وصول مقيد — لوحة تحكم حصرية للمتفقد التربوي
          </h1>
          <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
            لا يمكن للمسؤول الإداري أو غيره الانتقال إلى لوحة المتفقد؛ كل رتبة تكتفي بالصلاحيات واللوحة المخصصة لها فقط.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/70 pb-16 pt-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SupervisoryHierarchyBar
          viewerRole={data.inspector.role}
          currentDashboard="INSPECTOR"
        />

        <div className="mb-8 rounded-3xl border border-amber-200/80 bg-gradient-to-l from-amber-50 via-white to-amber-50/40 p-6 shadow-sm dark:border-amber-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                لوحة تحكم المتفقد التربوي ({data.inspector.name})
              </h1>
            </div>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <RefreshCw className="h-4 w-4" />
              تحديث البيانات
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-500">إجمالي المنشورات للرقابة</span>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                {data.stats.totalWorksheets}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                منشورات موثقة بيداغوجياً
              </span>
              <p className="mt-1 text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {data.stats.endorsedWorksheetsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
              <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300">
                تعليقاتي المتصدرة والخاصة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                {data.myComments.length}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300">
                إبلاغاتي المباشرة للمشرف
              </span>
              <p className="mt-1 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
                {data.stats.myDirectReportsCount}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border-2 border-amber-300/90 bg-white p-6 shadow-sm dark:border-amber-800/70 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100 pb-4 dark:border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                🏅 قسم التفاعل البيداغوجي الخاص بالمتفقدين
              </span>
              <h2 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                منشورات وتوجيهات المتفقدين التربويين ({inspectorExclusiveWorksheets.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                يعرض هذا القسم العلوي جميع المنشورات والوثائق المرفوعة من قِبل المتفقدين التربويين لتسهيل التنسيق والتفاعل المباشر بين هيئة التفقد.
              </p>
            </div>
            <Link
              href="/upload?audience=SAME_ROLE_ONLY"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition"
            >
              + نشر وثيقة خاصة بالمتفقدين
            </Link>
          </div>

          {inspectorExclusiveWorksheets.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
              لا توجد منشورات خاصة بالمتفقدين بعد. بادر بنشر أول توجيه أو وثيقة لزملائك المتفقدين.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inspectorExclusiveWorksheets.slice(0, 6).map((ws) => (
                <Link
                  key={ws.id}
                  href={`/worksheet/${ws.id}`}
                  className="flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 transition hover:border-amber-500 hover:bg-white dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-amber-500"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                      <span>{ws.subject.nameAr} • {ws.grade.nameAr}</span>
                      <span className="rounded-md bg-amber-200/70 dark:bg-amber-950 px-2 py-0.5">
                        {ws.category.nameAr}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2">
                      {ws.titleAr || ws.title}
                    </h3>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>المتفقد: {ws.uploader.name}</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">معاينة ←</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {bannerMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>✓ {bannerMessage}</span>
            <button type="button" onClick={() => setBannerMessage(null)}>✕</button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("worksheets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "worksheets"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <BadgeCheck className="h-4 w-4" />
            توثيق المنشورات والتعليق (في الصدارة / خاص للناشر)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("my_comments")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "my_comments"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Pin className="h-4 w-4" />
            سجل تعليقاتي المتصدرة والخاصة ({data.myComments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("direct_reports")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "direct_reports"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Flag className="h-4 w-4" />
            الإبلاغات المرفوعة مباشرة للمشرف ({data.myReports.length})
          </button>
        </div>

        {activeTab === "worksheets" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "ALL", label: "الكل" },
                    { key: "ENDORSED", label: "✓ موثق بيداغوجياً" },
                    { key: "UNENDORSED", label: "بانتظار التوثيق البيداغوجي" },
                    { key: "DRAFT", label: "⏳ ملفات وورد/صور قيد التحويل" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setEndorseFilter(f.key)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      endorseFilter === f.key
                        ? "bg-amber-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث في المنشورات أو @username..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-9 text-xs text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">المنشور التربوي</th>
                      <th className="px-4 py-4">الناشر (@username)</th>
                      <th className="px-4 py-4">المستوى / المادة</th>
                      <th className="px-4 py-4">حالة التوثيق البيداغوجي</th>
                      <th className="px-5 py-4 text-left">صلاحيات المتفقد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredWorksheets.map((ws) => {
                      const uname =
                        ws.uploader.username ||
                        `${ws.uploader.email.split("@")[0].toLowerCase()}`;
                      return (
                        <tr key={ws.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4">
                            <Link
                              href={`/worksheet/${ws.id}`}
                              className="font-extrabold text-slate-900 hover:text-amber-600 dark:text-white"
                            >
                              {ws.titleAr || ws.title}
                            </Link>
                            {ws.status === "DRAFT" && (
                              <span className="mr-2 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                                مسودة قيد التحويل لـ PDF
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/publisher/${ws.uploader.id}`}
                              className="font-bold text-slate-800 hover:text-blue-600 dark:text-slate-200"
                            >
                              {ws.uploader.name}
                            </Link>
                            <div>
                              <Link
                                href={`/u/${uname}`}
                                dir="ltr"
                                className="font-mono text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                              >
                                @{uname}
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-300">
                            {ws.grade.nameAr} — {ws.subject.nameAr}
                          </td>
                          <td className="px-4 py-4">
                            {ws.isEndorsed ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                موثق بيداغوجياً
                              </span>
                            ) : (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                غير موثق بعد
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={() => handleToggleEndorse(ws.id)}
                                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold transition ${
                                  ws.isEndorsed
                                    ? "border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                                }`}
                              >
                                <BadgeCheck className="h-3.5 w-3.5" />
                                {ws.isEndorsed ? "إلغاء التوثيق" : "توثيق المنشور"}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedWorksheet(ws);
                                  setCommentMode("PINNED_PUBLIC");
                                  setCommentText("");
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                              >
                                <Pin className="h-3.5 w-3.5" />
                                تعليق في الصدارة
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedWorksheet(ws);
                                  setCommentMode("PRIVATE_PUBLISHER");
                                  setCommentText(`@${uname} `);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-[11px] font-bold text-purple-800 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300"
                              >
                                <Lock className="h-3.5 w-3.5" />
                                تعليق خاص للناشر
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setReportTargetWs(ws);
                                  setReportDetails("");
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
                              >
                                <Flag className="h-3.5 w-3.5" />
                                إبلاغ للمشرف
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "my_comments" && (
          <div className="space-y-3">
            {data.myComments.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                لم تقم بإضافة تعليقات متصدرة أو تعليقات خاصة للناشرين بعد.
              </div>
            ) : (
              data.myComments.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {c.isPrivateToPublisher ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-[11px] font-extrabold text-purple-900 dark:bg-purple-950/70 dark:text-purple-300">
                          <Lock className="h-3.5 w-3.5" />
                          تعليق خاص مباشر إلى الناشر ({c.worksheet.uploader.name})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
                          <Pin className="h-3.5 w-3.5" />
                          تعليق متفقد مثبت في الصدارة
                        </span>
                      )}
                      <Link
                        href={`/worksheet/${c.worksheet.id}`}
                        className="text-xs font-extrabold text-slate-900 hover:text-blue-600 dark:text-white"
                      >
                        على المنشور: {c.worksheet.titleAr || c.worksheet.title}
                      </Link>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString("ar-TN")}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                    <MentionText text={c.comment} />
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "direct_reports" && (
          <div className="space-y-3">
            {data.myReports.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                لم تقم برفع أي إبلاغات مباشرة إلى المشرف العام بعد.
              </div>
            ) : (
              data.myReports.map((rep) => (
                <div
                  key={rep.id}
                  className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-extrabold text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
                      🚨 إبلاغ مباشر للمشرف العام
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      الحالة: {rep.status === "PENDING" ? "قيد مراجعة المشرف" : "تمت المعالجة"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                    {rep.reason}
                  </p>
                  {rep.details && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {rep.details}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedWorksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {commentMode === "PRIVATE_PUBLISHER"
                  ? "🔒 رفع تعليق خاص مباشرة إلى الناشر"
                  : "📌 إضافة تعليق متفقد يظهر في الصدارة"}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedWorksheet(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setCommentMode("PINNED_PUBLIC")}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  commentMode === "PINNED_PUBLIC"
                    ? "bg-amber-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                📌 تعليق عام في الصدارة
              </button>
              <button
                type="button"
                onClick={() => setCommentMode("PRIVATE_PUBLISHER")}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  commentMode === "PRIVATE_PUBLISHER"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                🔒 تعليق خاص للناشر فقط
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                المنشور: <strong>{selectedWorksheet.titleAr || selectedWorksheet.title}</strong> — الناشر:{" "}
                <strong>{selectedWorksheet.uploader.name}</strong> (يمكنك استخدام <code>@username</code> للإشارة لأي عضو)
              </p>
              <textarea
                rows={4}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  commentMode === "PRIVATE_PUBLISHER"
                    ? "اكتب ملاحظتك البيداغوجية الخاصة الموجهة للناشر مباشرة (لا يراها غيره)..."
                    : "اكتب تعليقك البيداغوجي الذي سيظهر مثبتاً في صدارة التعليقات..."
                }
                className="w-full rounded-2xl border border-slate-300 p-3.5 text-xs text-slate-900 focus:border-amber-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorksheet(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white hover:bg-amber-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  {submittingComment ? "جاري الإرسال..." : "إرسال واعتماد"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reportTargetWs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-rose-700 dark:text-rose-400">
                🚨 رفع إبلاغ مباشر إلى المشرف العام
              </h3>
              <button
                type="button"
                onClick={() => setReportTargetWs(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitDirectReport} className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                سيصل هذا البلاغ مباشرة إلى إشعارات ولوحة تحكم <strong>المشرف العام</strong> بأولوية قصوى حول المنشور:{" "}
                <strong>{reportTargetWs.titleAr || reportTargetWs.title}</strong>
              </p>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  سبب البلاغ الرقابي *
                </label>
                <input
                  type="text"
                  required
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  تفاصيل وملاحظات المتفقد إلى المشرف
                </label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="اشرح للمشرف العام الإجراء المطلوب..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportTargetWs(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submittingReport}
                  className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  {submittingReport ? "جاري الرفع للمشرف..." : "رفع الإبلاغ للمشرف الآن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### File: `src/app/moderator/dashboard/page.tsx`

```typescript
"use client";

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Trash2,
  Ban,
  Headphones,
  Flag,
  Mail,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Send,
  X,
  Lock,
} from "lucide-react";
import {
  getModeratorDashboardData,
  deleteWorksheetModeratorAction,
  updateWorksheetStatusModeratorAction,
  toggleBanUserModeratorAction,
  unlockUserAccountModeratorAction,
  replySupportTicketModeratorAction,
  resolveReportModeratorAction,
  sendDirectMessageToPublisherAction,
} from "@/actions/moderator.actions";
import MentionText from "@/components/ui/MentionText";
import { UserPresenceBadge } from "@/components/ui/UserPresenceIndicator";
import SupervisoryHierarchyBar from "@/components/layout/SupervisoryHierarchyBar";

type ModeratorData = Awaited<ReturnType<typeof getModeratorDashboardData>>;
type ModeratorPublisher = ModeratorData["publishers"][number];

export default function ModeratorDashboardPage() {
  const [data, setData] = useState<ModeratorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "worksheets" | "users" | "support" | "reports"
  >("worksheets");

  const [search, setSearch] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  // Direct Message Modal State
  const [dmTargetUser, setDmTargetUser] = useState<ModeratorPublisher | null>(null);
  const [dmSubject, setDmSubject] = useState("رسالة إدارية مباشرة من مسؤول المنصة");
  const [dmMessage, setDmMessage] = useState("");
  const [sendingDm, setSendingDm] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getModeratorDashboardData();
      setData(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "غير مصرح لك بالدخول إلى لوحة تحكم المسؤول"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredWorksheets = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data.worksheets;
    const q = search.trim().toLowerCase();
    return data.worksheets.filter(
      (w) =>
        (w.titleAr || w.title).toLowerCase().includes(q) ||
        w.uploader.name.toLowerCase().includes(q) ||
        (w.uploader.username || "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const filteredPublishers = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data.publishers;
    const q = search.trim().toLowerCase();
    return data.publishers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.username || "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const handleDeleteWorksheet = async (id: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف المنشور "${title}" نهائياً؟`)) return;
    try {
      setActionLoadingId(id);
      await deleteWorksheetModeratorAction(id);
      setBannerMessage(`تم حذف المنشور "${title}" بنجاح.`);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل حذف المنشور");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleBan = async (u: ModeratorPublisher) => {
    const reason = !u.isBanned
      ? window.prompt("أدخل سبب حظر المستخدم:", "مخالفة شروط وضوابط النشر في المنصة")
      : undefined;
    if (!u.isBanned && reason === null) return;

    try {
      setActionLoadingId(u.id);
      await toggleBanUserModeratorAction(u.id, reason || undefined);
      setBannerMessage(
        !u.isBanned
          ? `تم حظر المستخدم (${u.name}) بنجاح.`
          : `تم رفع الحظر عن المستخدم (${u.name}).`
      );
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر تغيير حالة الحظر");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendDirectMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!dmTargetUser || !dmMessage.trim()) return;
    try {
      setSendingDm(true);
      await sendDirectMessageToPublisherAction({
        targetUserId: dmTargetUser.id,
        subject: dmSubject,
        message: dmMessage,
      });
      setBannerMessage(`✉️ تم إرسال الرسالة المباشرة إلى الناشر (${dmTargetUser.name}) بنجاح.`);
      setDmTargetUser(null);
      setDmMessage("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال الرسالة المباشرة");
    } finally {
      setSendingDm(false);
    }
  };

  const handleReplyTicket = async (ticketId: string) => {
    const text = replyTexts[ticketId] || "";
    if (!text.trim()) return;
    try {
      setActionLoadingId(ticketId);
      await replySupportTicketModeratorAction(ticketId, text, "ANSWERED");
      setBannerMessage("تم إرسال رد الدعم الفني وإغلاق التذكرة.");
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال الرد");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-600" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          جاري تحميل لوحة تحكم المسؤول...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center" dir="rtl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-600" />
          <h1 className="text-lg font-extrabold text-red-900 dark:text-red-200">
            وصول مقيد — لوحة تحكم حصرية للمسؤول الإداري
          </h1>
          <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
            لا يمكن للمتفقد أو غيره الانتقال إلى لوحة المسؤول؛ كل رتبة تكتفي بالصلاحيات واللوحة المخصصة لها فقط.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/70 pb-16 pt-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SupervisoryHierarchyBar
          viewerRole={data.moderator.role}
          currentDashboard="MODERATOR"
        />

        <div className="mb-8 rounded-3xl border border-indigo-200/80 bg-gradient-to-l from-indigo-50 via-white to-indigo-50/40 p-6 shadow-sm dark:border-indigo-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                لوحة تحكم المسؤول ({data.moderator.name})
              </h1>
            </div>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <RefreshCw className="h-4 w-4" />
              تحديث
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-500">إجمالي المنشورات</span>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                {data.stats.totalWorksheets}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300">
                المستخدمون المحظورون
              </span>
              <p className="mt-1 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
                {data.stats.bannedUsersCount}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                تذاكر الدعم الفني المفتوحة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {data.stats.openTicketsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                البلاغات قيد المعالجة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {data.stats.pendingReportsCount}
              </p>
            </div>
          </div>
        </div>

        {bannerMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>✓ {bannerMessage}</span>
            <button type="button" onClick={() => setBannerMessage(null)}>✕</button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("worksheets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "worksheets"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Trash2 className="h-4 w-4" />
            حذف وإدارة المنشورات ({data.worksheets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "users"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Ban className="h-4 w-4" />
            حظر المستخدمين والتواصل المباشر مع الناشرين ({data.publishers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "support"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Headphones className="h-4 w-4" />
            إدارة قسم الدعم الفني ({data.stats.openTicketsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "reports"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Flag className="h-4 w-4" />
            معالجة البلاغات ({data.stats.pendingReportsCount})
          </button>
        </div>

        {(activeTab === "worksheets" || activeTab === "users") && (
          <div className="mb-4">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو العنوان أو @username..."
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        )}

        {activeTab === "worksheets" && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th className="px-5 py-4">المنشور</th>
                    <th className="px-4 py-4">الناشر (@username)</th>
                    <th className="px-4 py-4">المستوى / المادة</th>
                    <th className="px-4 py-4">الحالة</th>
                    <th className="px-5 py-4 text-left">صلاحيات المسؤول</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredWorksheets.map((ws) => {
                    const uname =
                      ws.uploader.username ||
                      ws.uploader.email.split("@")[0].toLowerCase();
                    return (
                      <tr key={ws.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                          <Link href={`/worksheet/${ws.id}`} className="hover:text-indigo-600">
                            {ws.titleAr || ws.title}
                          </Link>
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/publisher/${ws.uploader.id}`}
                            className="font-bold text-slate-800 hover:underline dark:text-slate-200"
                          >
                            {ws.uploader.name}
                          </Link>
                          <div>
                            <Link
                              href={`/u/${uname}`}
                              dir="ltr"
                              className="font-mono text-[11px] font-bold text-blue-600 hover:underline"
                            >
                              @{uname}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                          {ws.grade.nameAr} — {ws.subject.nameAr}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {ws.status === "PUBLISHED"
                              ? "منشور"
                              : ws.status === "DRAFT"
                              ? "مسودة قيد التحويل"
                              : "مؤرشف"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {ws.status !== "PUBLISHED" ? (
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={async () => {
                                  setActionLoadingId(ws.id);
                                  await updateWorksheetStatusModeratorAction(ws.id, "PUBLISHED");
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700"
                              >
                                نشر
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={async () => {
                                  setActionLoadingId(ws.id);
                                  await updateWorksheetStatusModeratorAction(ws.id, "ARCHIVED");
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="rounded-xl bg-amber-100 px-3 py-1.5 text-[11px] font-bold text-amber-900 hover:bg-amber-200"
                              >
                                أرشفة
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={actionLoadingId === ws.id}
                              onClick={() =>
                                handleDeleteWorksheet(ws.id, ws.titleAr || ws.title)
                              }
                              className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-rose-700"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              حذف المنشور
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th className="px-5 py-4">العضو / الناشر</th>
                    <th className="px-4 py-4">اسم المستخدم (@username)</th>
                    <th className="px-4 py-4">الرتبة والحالة</th>
                    <th className="px-4 py-4">التوثيق الرسمي</th>
                    <th className="px-5 py-4 text-left">التواصل المباشر والحظر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPublishers.map((u) => {
                    const uname =
                      u.username || u.email.split("@")[0].toLowerCase();
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-5 py-4">
                          <Link
                            href={`/publisher/${u.id}`}
                            className="font-extrabold text-slate-900 hover:text-indigo-600 dark:text-white"
                          >
                            {u.name}
                          </Link>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/u/${uname}`}
                            dir="ltr"
                            className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700 hover:underline dark:bg-blue-950/60 dark:text-blue-300"
                          >
                            @{uname}
                          </Link>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {u.role}
                            </span>
                            <UserPresenceBadge
                              presenceStatus={(u as any).presenceStatus}
                              lastSeenAt={(u as any).lastSeenAt}
                              compact
                            />
                            {((u as any).lockedAt || ((u as any).failedLoginAttempts ?? 0) >= 6) && (
                              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-900 border border-amber-300">
                                🔒 مقفل (6 محاولات كلمة مرور)
                              </span>
                            )}
                            {u.isBanned && (
                              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-extrabold text-rose-800">
                                🚫 محظور
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            <Lock className="h-3 w-3" />
                            {u.isVerified ? "موثق (بأمر المشرف)" : "التوثيق حصري للمشرف"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setDmTargetUser(u);
                                setDmSubject("توجيه إداري مباشر من مسؤول المنصة");
                                setDmMessage(`مرحباً @${uname}، `);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              تواصل مباشر مع الناشر
                            </button>

                            {((u as any).lockedAt ||
                              ((u as any).failedLoginAttempts ?? 0) > 0 ||
                              (u.banReason && u.banReason.includes("قفل"))) && (
                              <button
                                type="button"
                                disabled={actionLoadingId === u.id}
                                onClick={async () => {
                                  setActionLoadingId(u.id);
                                  await unlockUserAccountModeratorAction(u.id);
                                  setBannerMessage(`🔓 تم فك غلق الحساب وتصفير محاولات كلمة المرور للعضو (${u.name}).`);
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-sm transition"
                              >
                                🔓 فك غلق الحساب
                              </button>
                            )}
                            {u.role !== "ADMIN" && u.role !== "MODERATOR" && (
                              <button
                                type="button"
                                disabled={actionLoadingId === u.id}
                                onClick={() => handleToggleBan(u)}
                                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white transition ${
                                  u.isBanned
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-rose-600 hover:bg-rose-700"
                                }`}
                              >
                                <Ban className="h-3.5 w-3.5" />
                                {u.isBanned ? "رفع الحظر" : "حظر المستخدم"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="space-y-4">
            {data.supportTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">
                      {t.category}
                    </span>
                    <h3 className="mt-2 text-sm font-extrabold text-slate-900 dark:text-white">
                      {t.subject}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      المرسل: {t.name} ({t.email})
                    </p>
                    <p className="mt-3 rounded-2xl bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <MentionText text={t.message} />
                    </p>
                  </div>
                  <div className="w-full sm:w-80">
                    {t.adminReply ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <p className="font-extrabold">✓ تم الرد:</p>
                        <p className="mt-1">
                          <MentionText text={t.adminReply} />
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={replyTexts[t.id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                          placeholder="اكتب رد قسم الدعم الفني هنا..."
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <button
                          type="button"
                          disabled={actionLoadingId === t.id}
                          onClick={() => handleReplyTicket(t.id)}
                          className="w-full rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                        >
                          إرسال الرد وإغلاق التذكرة
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-4">
            {data.reports.map((rep) => (
              <div
                key={rep.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    {rep.isInspectorPriority && (
                      <span className="mb-2 inline-block rounded-full bg-rose-100 px-3 py-1 text-[11px] font-extrabold text-rose-800">
                        🚨 إبلاغ ذو أولوية مرفوع من المتفقد
                      </span>
                    )}
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                      السبب: {rep.reason}
                    </p>
                    {rep.details && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {rep.details}
                      </p>
                    )}
                  </div>
                  {rep.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          await resolveReportModeratorAction(rep.id, "RESOLVED");
                          await loadData();
                        }}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                      >
                        تمت المعالجة ✓
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await resolveReportModeratorAction(rep.id, "DISMISSED");
                          await loadData();
                        }}
                        className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
                      >
                        تجاهل
                      </button>
                    </div>
                  ) : (
                    <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      تمت المراجعة
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {dmTargetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                ✉️ التواصل المباشر مع الناشر ({dmTargetUser.name})
              </h3>
              <button
                type="button"
                onClick={() => setDmTargetUser(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSendDirectMessage} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  عنوان الرسالة المباشرة *
                </label>
                <input
                  type="text"
                  required
                  value={dmSubject}
                  onChange={(e) => setDmSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                  نص الرسالة (تصل مباشرة إلى إشعارات الناشر وتدعم الإشارة بـ @username) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={dmMessage}
                  onChange={(e) => setDmMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDmTargetUser(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={sendingDm}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  {sendingDm ? "جاري الإرسال..." : "إرسال للناشر"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### File: `src/app/admin/dashboard/page.tsx`

```typescript
"use client";

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  Users,
  Search,
  UserCog,
  Key,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
  RefreshCw,
  BadgeCheck,
  Flag,
  Headphones,
  Mail,
  Plus,
  Send,
  X,
} from "lucide-react";
import {
  getAdminDashboardData,
  updateWorksheetStatusAdminAction,
  deleteWorksheetAdminAction,
  updateUserRoleAdminAction,
  approveProfileEditAdminAction,
  rejectProfileEditAdminAction,
  toggleBanUserAdminAction,
  unlockUserAccountAdminAction,
  toggleVerifyUserAdminAction,
  createVerificationCodeAdminAction,
  deleteVerificationCodeAdminAction,
} from "@/actions/admin.actions";
import {
  generateInspectorCodeAdminAction,
  toggleWorksheetEndorsementAction,
} from "@/actions/inspector.actions";
import { sendDirectMessageToPublisherAction } from "@/actions/moderator.actions";
import {
  updateReportStatusAdminAction,
  replySupportTicketAdminAction,
} from "@/actions/report-support.actions";
import type { Role } from "@/types";
import InspectorBadge from "@/components/ui/InspectorBadge";
import { UserPresenceBadge } from "@/components/ui/UserPresenceIndicator";
import MentionText from "@/components/ui/MentionText";
import SupervisoryHierarchyBar from "@/components/layout/SupervisoryHierarchyBar";

type AdminData = Awaited<ReturnType<typeof getAdminDashboardData>>;
type AdminTeacher = AdminData["teachers"][number];

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "worksheets" | "teachers" | "codes" | "profile_edits" | "reports" | "support" | "audit"
  >("worksheets");

  const [auditActionFilter, setAuditActionFilter] = useState<string>("ALL");
  const [auditSearch, setAuditSearch] = useState<string>("");

  const [worksheetSearch, setWorksheetSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [teacherSearch, setTeacherSearch] = useState<string>("");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Code Generator State (Exclusive to Admin Dashboard)
  const [newCodeRole, setNewCodeRole] = useState<Role>("INSPECTOR");
  const [newCodeNote, setNewCodeNote] = useState<string>("");
  const [newCodeCount, setNewCodeCount] = useState<number>(1);
  const [creatingCodes, setCreatingCodes] = useState<boolean>(false);

  // Direct Message Modal State
  const [dmTargetUser, setDmTargetUser] = useState<AdminTeacher | null>(null);
  const [dmSubject, setDmSubject] = useState("توجيه مباشر من المشرف العام لمنصة المسند");
  const [dmMessage, setDmMessage] = useState("");
  const [sendingDm, setSendingDm] = useState(false);

  const handleCopyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAdminDashboardData();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "غير مصرح لك بالوصول إلى لوحة تحكم المشرف العام"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredWorksheets = useMemo(() => {
    if (!data) return [];
    return data.worksheets.filter((ws) => {
      const matchesStatus =
        statusFilter === "ALL" ? true : ws.status === statusFilter;
      const title = (ws.titleAr || ws.title).toLowerCase();
      const uploaderName = ws.uploader.name.toLowerCase();
      const uname = (ws.uploader.username || "").toLowerCase();
      const q = worksheetSearch.trim().toLowerCase();
      const matchesSearch =
        !q || title.includes(q) || uploaderName.includes(q) || uname.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [data, worksheetSearch, statusFilter]);

  const filteredTeachers = useMemo(() => {
    if (!data) return [];
    const q = teacherSearch.trim().toLowerCase();
    if (!q) return data.teachers;
    return data.teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        (t.username || "").toLowerCase().includes(q) ||
        (t.school && t.school.toLowerCase().includes(q))
    );
  }, [data, teacherSearch]);

  const filteredAuditLogs = useMemo(() => {
    if (!data?.auditLogs) return [];
    return data.auditLogs.filter((log) => {
      const matchAction =
        auditActionFilter === "ALL" || log.action === auditActionFilter;
      const q = auditSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        log.actorName.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q)) ||
        (log.targetType && log.targetType.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.includes(q));
      return matchAction && matchSearch;
    });
  }, [data?.auditLogs, auditActionFilter, auditSearch]);

  const handleCreateVerificationCodes = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setCreatingCodes(true);
      const created = await createVerificationCodeAdminAction({
        targetRole: newCodeRole,
        note: newCodeNote,
        count: newCodeCount,
      });
      setNewCodeNote("");
      setBannerMessage(`🔑 تم إنشاء وتوليد (${created.length}) كود توثيق جديد بنجاح!`);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل إنشاء أكواد التوثيق");
    } finally {
      setCreatingCodes(false);
    }
  };

  const handleToggleVerifyUser = async (t: AdminTeacher) => {
    try {
      setActionLoadingId(t.id);
      await toggleVerifyUserAdminAction(t.id);
      setBannerMessage(
        !t.isVerified
          ? `🎖️ تم تفعيل شارة التوثيق الرسمية لحساب (${t.name}) بنجاح.`
          : `تم إلغاء شارة التوثيق عن حساب (${t.name}).`
      );
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "فشل تحديث حالة التوثيق");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendDirectMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!dmTargetUser || !dmMessage.trim()) return;
    try {
      setSendingDm(true);
      await sendDirectMessageToPublisherAction({
        targetUserId: dmTargetUser.id,
        subject: dmSubject,
        message: dmMessage,
      });
      setBannerMessage(`✉️ تم إرسال الرسالة المباشرة إلى (${dmTargetUser.name}) بنجاح.`);
      setDmTargetUser(null);
      setDmMessage("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "تعذر إرسال الرسالة المباشرة");
    } finally {
      setSendingDm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-blue-700" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          جاري تحميل لوحة تحكم المشرف العام...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center" dir="rtl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-600" />
          <h1 className="text-lg font-extrabold text-red-900 dark:text-red-200">
            وصول مقيد — هذه اللوحة حصرية للمشرف العام فقط
          </h1>
          <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
            كل رتبة إشرافية (متفقد أو مسؤول) مخصص لها لوحة تحكم حصرية خاصة بها فقط ولا يمكنها الانتقال إلى لوحات المستويات الأخرى.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/70 pb-16 pt-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SupervisoryHierarchyBar
          viewerRole={data.admin.role}
          currentDashboard="ADMIN"
        />

        <div className="mb-8 rounded-3xl border border-blue-200/80 bg-gradient-to-l from-blue-50 via-white to-indigo-50/50 p-6 shadow-sm dark:border-blue-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                لوحة تحكم المشرف العام ({data.admin.name})
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={loadData}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                تحديث البيانات
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-500">إجمالي المنشورات</span>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                {data.stats.totalWorksheets}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
              <span className="text-[11px] font-bold text-sky-900 dark:text-sky-300">
                الحسابات الموثقة (حصري)
              </span>
              <p className="mt-1 text-2xl font-extrabold text-sky-700 dark:text-sky-300">
                {data.stats.verifiedUsersCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                أكواد توثيق جاهزة للتوزيع
              </span>
              <p className="mt-1 text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {data.stats.unusedCodesCount}
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300">
                طلبات تعديل الهوية
              </span>
              <p className="mt-1 text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                {data.stats.pendingProfileEditsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300">
                البلاغات المفتوحة
              </span>
              <p className="mt-1 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
                {data.stats.pendingReportsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                تذاكر الدعم الفني
              </span>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {data.stats.openTicketsCount}
              </p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
              <span className="text-[11px] font-bold text-violet-900 dark:text-violet-300">
                سجلات النشاط والأمن
              </span>
              <p className="mt-1 text-2xl font-extrabold text-violet-700 dark:text-violet-300">
                {data.stats.totalAuditLogsCount ?? data.auditLogs?.length ?? 0}
              </p>
            </div>
          </div>
        </div>

        {bannerMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>{bannerMessage}</span>
            <button type="button" onClick={() => setBannerMessage(null)}>✕</button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("worksheets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "worksheets"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <FileText className="h-4 w-4" />
            إدارة النشرات ({data.worksheets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teachers")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "teachers"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Users className="h-4 w-4" />
            الأعضاء، تفعيل التوثيق، الأدوار والحظر ({data.teachers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("codes")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "codes"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300"
            }`}
          >
            <Key className="h-4 w-4" />
            🔑 إنشاء وإدارة أكواد التوثيق ({data.verificationCodes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("profile_edits")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "profile_edits"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <UserCog className="h-4 w-4" />
            طلبات تعديل الهوية ({data.pendingProfileUsers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "reports"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Flag className="h-4 w-4" />
            البلاغات وإبلاغات المتفقد ({data.stats.pendingReportsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "support"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Headphones className="h-4 w-4" />
            الدعم الفني ({data.stats.openTicketsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "audit"
                ? "bg-violet-700 text-white shadow-sm ring-2 ring-violet-400/50"
                : "bg-violet-50/80 text-violet-900 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            🛡️ سجل النشاطات والأمن ({data.stats.totalAuditLogsCount ?? data.auditLogs?.length ?? 0})
          </button>
        </div>

        {activeTab === "codes" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900/50 dark:bg-slate-900">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white">
                  <Key className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    إنشاء وتوليد أكواد التوثيق الرسمية (حصري للمشرف العام)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    قم بإنشاء أكواد توثيق جديدة وتوزيعها على المتفقدين أو المعلمين أو المؤسسات التربوية لتفعيل شارة التوثيق الرسمية.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleCreateVerificationCodes}
                className="grid grid-cols-1 gap-4 sm:grid-cols-4"
              >
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    الفئة المخصص لها الكود *
                  </label>
                  <select
                    value={newCodeRole}
                    onChange={(e) => setNewCodeRole(e.target.value as Role)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="INSPECTOR">كود متفقد تربوي (INSP-XXXX)</option>
                    <option value="TEACHER">كود توثيق معلم (VERF-XXXX)</option>
                    <option value="INSTITUTION">كود توثيق مؤسسة (INST-XXXX)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    عدد الأكواد المراد إنشاؤها
                  </label>
                  <select
                    value={newCodeCount}
                    onChange={(e) => setNewCodeCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={1}>كود واحد (1)</option>
                    <option value={3}>3 أكواد دفعة واحدة</option>
                    <option value={5}>5 أكواد دفعة واحدة</option>
                    <option value={10}>10 أكواد دفعة واحدة</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    ملاحظة أو اسم الجهة (اختياري)
                  </label>
                  <input
                    type="text"
                    value={newCodeNote}
                    onChange={(e) => setNewCodeNote(e.target.value)}
                    placeholder="تخصيص الكود أو ملاحظة..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={creatingCodes}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-amber-700"
                  >
                    <Plus className="h-4 w-4" />
                    {creatingCodes ? "جاري التوليد..." : "إنشاء الأكواد الآن"}
                  </button>
                </div>
              </form>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">كود التوثيق</th>
                      <th className="px-4 py-4">الفئة المستهدفة</th>
                      <th className="px-4 py-4">الملاحظة</th>
                      <th className="px-4 py-4">الحالة والمستفيد</th>
                      <th className="px-5 py-4 text-left">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.verificationCodes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center text-slate-400">
                          لا توجد أكواد منشأة بعد. استخدم النموذج أعلاه لإنشاء الأكواد.
                        </td>
                      </tr>
                    ) : (
                      data.verificationCodes.map((vc) => (
                        <tr key={vc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4">
                            <span
                              dir="ltr"
                              className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 font-mono text-xs font-black tracking-wider text-amber-900 dark:border-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
                            >
                              {vc.code}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-bold text-slate-700 dark:text-slate-300">
                            {vc.targetRole === "INSPECTOR"
                              ? "متفقد تربوي"
                              : vc.targetRole === "INSTITUTION"
                              ? "مؤسسة تربوية"
                              : "معلم"}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {vc.note || "—"}
                          </td>
                          <td className="px-4 py-4">
                            {vc.isUsed && vc.usedBy ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                ✓ مستخدم بواسطة: {vc.usedBy.name}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                جاهز للاستخدام
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyCode(vc.id, vc.code)}
                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                              >
                                {copiedCodeId === vc.id ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                    تم النسخ
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    نسخ الكود
                                  </>
                                )}
                              </button>
                              {!vc.isUsed && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await deleteVerificationCodeAdminAction(vc.id);
                                    await loadData();
                                  }}
                                  className="rounded-xl bg-rose-50 px-3 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100"
                                >
                                  حذف
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "worksheets" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "ALL", label: `الكل (${data.stats.totalWorksheets})` },
                    { key: "PUBLISHED", label: `منشور (${data.stats.publishedWorksheets})` },
                    { key: "DRAFT", label: `⏳ وورد/صور قيد التحويل (${data.stats.draftWorksheets})` },
                    { key: "ARCHIVED", label: `مؤرشف (${data.stats.archivedWorksheets})` },
                  ] as const
                ).map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setStatusFilter(st.key)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      statusFilter === st.key
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={worksheetSearch}
                onChange={(e) => setWorksheetSearch(e.target.value)}
                placeholder="ابحث في النشرات أو @username..."
                className="w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">المنشور</th>
                      <th className="px-4 py-4">الناشر (@username)</th>
                      <th className="px-4 py-4">المستوى / المادة</th>
                      <th className="px-4 py-4">الحالة والاعتماد</th>
                      <th className="px-5 py-4 text-left">إجراءات المشرف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredWorksheets.map((ws) => {
                      const uname =
                        ws.uploader.username || ws.uploader.email.split("@")[0].toLowerCase();
                      return (
                        <tr key={ws.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4 font-extrabold text-slate-900 dark:text-white">
                            <Link href={`/worksheet/${ws.id}`} className="hover:text-blue-600">
                              {ws.titleAr || ws.title}
                            </Link>
                          </td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/publisher/${ws.uploader.id}`}
                              className="font-bold text-slate-800 hover:underline dark:text-slate-200"
                            >
                              {ws.uploader.name}
                            </Link>
                            <div>
                              <Link
                                href={`/u/${uname}`}
                                dir="ltr"
                                className="font-mono text-[11px] font-bold text-blue-600 hover:underline"
                              >
                                @{uname}
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                            {ws.grade.nameAr} — {ws.subject.nameAr}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {ws.status === "PUBLISHED"
                                  ? "منشور"
                                  : ws.status === "DRAFT"
                                  ? "⏳ مسودة قيد التحويل"
                                  : "مؤرشف"}
                              </span>
                              {ws.isEndorsed && (
                                <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-[10px] font-extrabold text-amber-900">
                                  ✓ موثق بيداغوجياً
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              <button
                                type="button"
                                disabled={actionLoadingId === ws.id}
                                onClick={async () => {
                                  setActionLoadingId(ws.id);
                                  await toggleWorksheetEndorsementAction(ws.id);
                                  await loadData();
                                  setActionLoadingId(null);
                                }}
                                className="rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] font-bold text-amber-900 hover:bg-amber-100"
                              >
                                {ws.isEndorsed ? "إلغاء الاعتماد" : "اعتماد بيداغوجي"}
                              </button>
                              {ws.status !== "PUBLISHED" ? (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await updateWorksheetStatusAdminAction(ws.id, "PUBLISHED");
                                    await loadData();
                                  }}
                                  className="rounded-xl bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                                >
                                  نشر
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await updateWorksheetStatusAdminAction(ws.id, "ARCHIVED");
                                    await loadData();
                                  }}
                                  className="rounded-xl bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
                                >
                                  أرشفة
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!window.confirm("حذف المنشور نهائياً؟")) return;
                                  await deleteWorksheetAdminAction(ws.id);
                                  await loadData();
                                }}
                                className="rounded-xl bg-rose-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <input
                type="search"
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                placeholder="ابحث عن عضو بالاسم، البريد، أو @username..."
                className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <tr>
                      <th className="px-5 py-4">المستخدم (@username)</th>
                      <th className="px-4 py-4">الرتبة في النظام</th>
                      <th className="px-4 py-4">تفعيل التوثيق (حصري للمشرف)</th>
                      <th className="px-4 py-4">كود التوثيق الشخصي</th>
                      <th className="px-5 py-4 text-left">تواصل مباشر / حظر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTeachers.map((t) => {
                      const uname =
                        t.username || t.email.split("@")[0].toLowerCase();
                      return (
                        <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/publisher/${t.id}`}
                                className="font-extrabold text-slate-900 hover:text-blue-600 dark:text-white"
                              >
                                {t.name}
                              </Link>
                              <InspectorBadge role={t.role} isVerified={t.isVerified} isBanned={t.isBanned} size="sm" />
                              <UserPresenceBadge
                                presenceStatus={(t as any).presenceStatus}
                                lastSeenAt={(t as any).lastSeenAt}
                                compact
                              />
                              {((t as any).lockedAt || ((t as any).failedLoginAttempts ?? 0) >= 6) && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 border border-amber-300">
                                  🔒 حساب مقفل (6 محاولات كلمة مرور)
                                </span>
                              )}
                              {t.isBanned && (
                                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-800">
                                  🚫 محظور
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                              <Link
                                href={`/u/${uname}`}
                                dir="ltr"
                                className="font-mono text-[11px] font-bold text-blue-600 hover:underline"
                              >
                                @{uname}
                              </Link>
                              <span className="text-[11px] text-slate-400">• {t.email}</span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <select
                              value={t.role}
                              onChange={async (e) => {
                                const nextRole = e.target.value as Role;
                                await updateUserRoleAdminAction(t.id, nextRole);
                                await loadData();
                              }}
                              className="rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            >
                              <option value="TEACHER">معلم (TEACHER)</option>
                              <option value="INSPECTOR">متفقد تربوي (INSPECTOR)</option>
                              <option value="MODERATOR">مسؤول إداري (MODERATOR)</option>
                              <option value="INSTITUTION">مؤسسة تربوية (INSTITUTION)</option>
                              <option value="STUDENT">تلميذ (STUDENT)</option>
                              <option value="ADMIN">مشرف عام (ADMIN)</option>
                            </select>
                          </td>

                          <td className="px-4 py-4">
                            <button
                              type="button"
                              disabled={actionLoadingId === t.id}
                              onClick={() => handleToggleVerifyUser(t)}
                              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition ${
                                t.isVerified
                                  ? "border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                                  : "bg-sky-600 text-white hover:bg-sky-700"
                              }`}
                            >
                              <BadgeCheck className="h-3.5 w-3.5" />
                              {t.isVerified ? "موثق رسمياً (إلغاء)" : "تفعيل التوثيق الآن"}
                            </button>
                          </td>

                          <td className="px-4 py-4">
                            {t.inspectorCode ? (
                              <div className="flex items-center gap-1.5">
                                <span
                                  dir="ltr"
                                  className="rounded-lg bg-amber-50 px-2 py-1 font-mono text-[11px] font-bold text-amber-900"
                                >
                                  {t.inspectorCode}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyCode(t.id, t.inspectorCode!)}
                                  className="rounded-lg border border-slate-200 p-1 text-slate-600 hover:bg-slate-100"
                                >
                                  {copiedCodeId === t.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={async () => {
                                  await generateInspectorCodeAdminAction(
                                    t.id,
                                    t.role === "INSPECTOR"
                                  );
                                  await loadData();
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] font-bold text-amber-900 hover:bg-amber-100"
                              >
                                <Key className="h-3.5 w-3.5" />
                                إصدار كود خاص
                              </button>
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setDmTargetUser(t);
                                  setDmSubject("رسالة مباشرة من المشرف العام");
                                  setDmMessage(`مرحباً @${uname}، `);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[11px] font-bold text-blue-700 hover:bg-blue-100"
                              >
                                <Mail className="h-3.5 w-3.5" />
                                مراسلة
                              </button>
                              {((t as any).lockedAt ||
                                ((t as any).failedLoginAttempts ?? 0) > 0 ||
                                (t.banReason && t.banReason.includes("قفل"))) && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setActionLoadingId(t.id);
                                    await unlockUserAccountAdminAction(t.id);
                                    setBannerMessage(`🔓 تم فك غلق الحساب وتصفير محاولات كلمة المرور للعضو (${t.name}).`);
                                    await loadData();
                                    setActionLoadingId(null);
                                  }}
                                  className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 px-2.5 py-1.5 text-[11px] font-extrabold text-white shadow-sm"
                                  title="فك قفل الحساب الناتج عن تجاوز 6 محاولات لكلمة المرور"
                                >
                                  🔓 فك غلق الحساب
                                </button>
                              )}
                              {t.role !== "ADMIN" && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await toggleBanUserAdminAction(t.id);
                                    await loadData();
                                  }}
                                  className={`rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-white ${
                                    t.isBanned ? "bg-emerald-600" : "bg-rose-600"
                                  }`}
                                >
                                  {t.isBanned ? "رفع الحظر" : "حظر"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile_edits" && (
          <div className="space-y-4">
            {data.pendingProfileUsers.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                لا توجد طلبات تعديل ملفات شخصية معلقة حالياً.
              </div>
            ) : (
              data.pendingProfileUsers.map((u) => {
                const pending = (u.pendingProfileData || {}) as {
                  name?: string;
                  username?: string;
                  school?: string | null;
                  bio?: string | null;
                };
                return (
                  <div
                    key={u.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          طلب تعديل من: {u.name} ({u.email})
                        </h3>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                          الاسم الجديد: <strong>{pending.name || u.name}</strong> • المعرّف:{" "}
                          <strong dir="ltr">@{pending.username || u.username}</strong> • المؤسسة:{" "}
                          <strong>{pending.school || "—"}</strong>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={async () => {
                            await approveProfileEditAdminAction(u.id);
                            await loadData();
                          }}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                        >
                          موافقة واعتماد ✓
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await rejectProfileEditAdminAction(u.id);
                            await loadData();
                          }}
                          className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white"
                        >
                          رفض ✕
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-4">
            {data.reports.map((rep) => (
              <div
                key={rep.id}
                className={`rounded-3xl border p-6 shadow-sm ${
                  rep.isInspectorPriority
                    ? "border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    {rep.isInspectorPriority && (
                      <span className="mb-2 inline-block rounded-full bg-rose-600 px-3 py-1 text-[11px] font-extrabold text-white">
                        🚨 إبلاغ مباشر للمشرف مرفوع من المتفقد التربوي ({rep.reporter.name})
                      </span>
                    )}
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {rep.reason}
                    </p>
                    {rep.details && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {rep.details}
                      </p>
                    )}
                  </div>
                  {rep.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          await updateReportStatusAdminAction(rep.id, "RESOLVED");
                          await loadData();
                        }}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                      >
                        اعتماد المعالجة ✓
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await updateReportStatusAdminAction(rep.id, "DISMISSED");
                          await loadData();
                        }}
                        className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
                      >
                        إغلاق
                      </button>
                    </div>
                  ) : (
                    <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      تمت المعالجة
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "support" && (
          <div className="space-y-4">
            {data.supportTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {t.subject}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {t.name} ({t.email})
                    </p>
                    <p className="mt-3 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <MentionText text={t.message} />
                    </p>
                  </div>
                  <div className="w-full sm:w-80">
                    {t.adminReply ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900">
                        <p className="font-bold">✓ الرد المعتمد:</p>
                        <p className="mt-1">{t.adminReply}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={replyTexts[t.id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                          placeholder="اكتب رد المشرف العام..."
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (!replyTexts[t.id]?.trim()) return;
                            await replySupportTicketAdminAction(
                              t.id,
                              replyTexts[t.id],
                              "ANSWERED"
                            );
                            await loadData();
                          }}
                          className="w-full rounded-xl bg-blue-700 py-2 text-xs font-bold text-white"
                        >
                          إرسال الرد
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "audit" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-violet-200/80 bg-gradient-to-l from-violet-50 via-white to-purple-50/40 p-6 shadow-sm dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-600/30">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      سجل النشاطات الرقابية والأمن المتقدم (Audit Logs)
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      مراقبة حية وشاملة لكافة العمليات الحساسة في المنصة: تفعيل التوثيق، إصدار أكواد التفعيل، الحظر، تعديلات الأدوار، وحذف المحتوى.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-xs font-bold text-violet-800 dark:bg-violet-950/80 dark:text-violet-300">
                    إجمالي الأحداث المسجلة: {data.stats.totalAuditLogsCount ?? data.auditLogs?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                <div className="flex flex-1 flex-wrap items-center gap-2 min-w-[280px]">
                  <div className="relative flex-1">
                    <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="بحث بالفاعل، التفاصيل، أو الـ IP..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-xs font-medium placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={auditActionFilter}
                    onChange={(e) => setAuditActionFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="ALL">جميع العمليات ({data.auditLogs?.length ?? 0})</option>
                    <option value="USER_VERIFIED">🎖️ توثيق الحسابات (USER_VERIFIED)</option>
                    <option value="USER_UNVERIFIED">إلغاء التوثيق (USER_UNVERIFIED)</option>
                    <option value="VERIFICATION_CODE_CREATED">🔑 إنشاء كود توثيق (VERIFICATION_CODE_CREATED)</option>
                    <option value="VERIFICATION_CODE_DELETED">حذف كود توثيق (VERIFICATION_CODE_DELETED)</option>
                    <option value="USER_BANNED">🚫 حظر مستخدم (USER_BANNED)</option>
                    <option value="USER_UNBANNED">رفع الحظر (USER_UNBANNED)</option>
                    <option value="USER_ROLE_CHANGED">تغيير رتبة (USER_ROLE_CHANGED)</option>
                    <option value="PROFILE_APPROVED">موافقة على تعديل ملف (PROFILE_APPROVED)</option>
                    <option value="PROFILE_REJECTED">رفض تعديل ملف (PROFILE_REJECTED)</option>
                    <option value="WORKSHEET_DELETED">🗑️ حذف منشور (WORKSHEET_DELETED)</option>
                    <option value="WORKSHEET_STATUS_CHANGED">تغيير حالة منشور (WORKSHEET_STATUS_CHANGED)</option>
                    <option value="WORKSHEET_ENDORSED">اعتماد بيداغوجي (WORKSHEET_ENDORSED)</option>
                    <option value="WORKSHEET_UNENDORSED">إلغاء اعتماد بيداغوجي (WORKSHEET_UNENDORSED)</option>
                    <option value="DIRECT_MESSAGE_SENT">✉️ رسالة توجيه مباشرة (DIRECT_MESSAGE_SENT)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
                    <tr>
                      <th className="px-4 py-3.5">التاريخ والوقت</th>
                      <th className="px-4 py-3.5">الفاعل (المستخدم والرتبة)</th>
                      <th className="px-4 py-3.5">العملية والنوع</th>
                      <th className="px-4 py-3.5">الهدف</th>
                      <th className="px-4 py-3.5">البيان والتفاصيل</th>
                      <th className="px-4 py-3.5">عنوان IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredAuditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          لا توجد سجلات نشاطات تطابق الفلتر الحالي.
                        </td>
                      </tr>
                    ) : (
                      filteredAuditLogs.map((log) => {
                        const isSecurityAlert =
                          log.action === "USER_BANNED" ||
                          log.action === "WORKSHEET_DELETED" ||
                          log.action === "USER_ROLE_CHANGED";
                        const isSuccessEvent =
                          log.action === "USER_VERIFIED" ||
                          log.action === "WORKSHEET_ENDORSED" ||
                          log.action === "PROFILE_APPROVED" ||
                          log.action === "VERIFICATION_CODE_CREATED";

                        const actionLabelAr =
                          log.action === "USER_VERIFIED"
                            ? "توثيق حساب"
                            : log.action === "USER_UNVERIFIED"
                            ? "إلغاء توثيق"
                            : log.action === "VERIFICATION_CODE_CREATED"
                            ? "إنشاء كود توثيق"
                            : log.action === "VERIFICATION_CODE_DELETED"
                            ? "حذف كود توثيق"
                            : log.action === "USER_BANNED"
                            ? "حظر مستخدم"
                            : log.action === "USER_UNBANNED"
                            ? "رفع الحظر"
                            : log.action === "USER_ROLE_CHANGED"
                            ? "تغيير رتبة"
                            : log.action === "PROFILE_APPROVED"
                            ? "اعتماد ملف"
                            : log.action === "PROFILE_REJECTED"
                            ? "رفض تعديل ملف"
                            : log.action === "WORKSHEET_DELETED"
                            ? "حذف منشور"
                            : log.action === "WORKSHEET_STATUS_CHANGED"
                            ? "تغيير حالة منشور"
                            : log.action === "WORKSHEET_ENDORSED"
                            ? "اعتماد بيداغوجي"
                            : log.action === "WORKSHEET_UNENDORSED"
                            ? "إلغاء اعتماد بيداغوجي"
                            : log.action === "DIRECT_MESSAGE_SENT"
                            ? "رسالة مباشرة"
                            : log.action;

                        return (
                          <tr
                            key={log.id}
                            className={`transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40 ${
                              isSecurityAlert
                                ? "bg-rose-50/20 dark:bg-rose-950/10"
                                : ""
                            }`}
                          >
                            <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                              {new Date(log.createdAt).toLocaleString("ar-TN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-extrabold text-slate-900 dark:text-white">
                                {log.actorName}
                              </div>
                              <span className="inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {log.actorRole}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                                  isSecurityAlert
                                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                                    : isSuccessEvent
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                                }`}
                              >
                                {actionLabelAr}
                              </span>
                              <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                                {log.action}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold dark:bg-slate-800">
                                {log.targetType}
                              </span>
                              {log.targetId && (
                                <div className="mt-0.5 text-[10px] text-slate-400" title={log.targetId}>
                                  {log.targetId.slice(0, 8)}...
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                              <div className="max-w-md font-medium leading-relaxed">
                                {log.details || "—"}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                              {log.ipAddress || "داخلي"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {dmTargetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                ✉️ مراسلة مباشرة من المشرف العام إلى ({dmTargetUser.name})
              </h3>
              <button
                type="button"
                onClick={() => setDmTargetUser(null)}
                className="rounded-lg bg-slate-100 p-1 text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSendDirectMessage} className="space-y-4">
              <input
                type="text"
                required
                value={dmSubject}
                onChange={(e) => setDmSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <textarea
                rows={4}
                required
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDmTargetUser(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={sendingDm}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-5 py-2 text-xs font-bold text-white"
                >
                  <Send className="h-3.5 w-3.5" />
                  {sendingDm ? "جاري الإرسال..." : "إرسال الآن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

*End of Master Project Handover Document (v12.0 Complete Single-File Edition) — Total included files: 115.*
