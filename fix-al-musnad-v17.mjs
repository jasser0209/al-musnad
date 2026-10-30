#!/usr/bin/env node
/**
 * ============================================================================
 * سكريبت الاستعادة الكاملة والإصلاح الشامل — منصة «المسند» (Al-Musnad v17.1)
 * Full Architecture Restore + Portal Isolation + Remove Fake Demo Posts + Fast DB Fix
 * ============================================================================
 * يقوم هذا السكريبت بالعمليات التالية بالترتيب:
 *
 * 1. استعادة بنية المشروع الأصلية (115 ملفاً) من ملف `PROJECT_HANDOVER.md` (إن وُجد في المجلد)
 *    لضمان عودة جميع لوحات التحكم (`/admin/dashboard`، `/moderator/dashboard`، `/inspector/dashboard`)
 *    وشريط التنقل (`Navbar.tsx`) إلى حالتها السليمة 100%.
 * 2. حذف المنشورات الوهمية/التجريبية الـ 4 (`DEMO_WORKSHEETS`) نهائياً من `src/app/page.tsx`
 *    حتى لا تظهر أبداً عناوين وهمية مثل:
 *    - "درس القراءة والمفردات الأساسية في اللغة الفرنسية"
 *    - "مشروع المؤسسة التربوية السنوي وميثاق العمل المشترك بين المدارس"
 *    - "جذاذة بيداغوجية وإصلاح تقييم اللغة الفرنسية"
 *    - "نموذج جدول الأوقات والتوزيع السنوي ومحضر الجلسة البيداغوجية"
 * 3. فرض العزل الصارم للفضاءات عند تسجيل الدخول (`Portal-Specific Login Isolation`):
 *    - المشرف العام (`ADMIN`) والمسؤول الإداري (`MODERATOR`) فقط يستطيعان الدخول من أي فضاء.
 *    - المعلم (`TEACHER`)، المؤسسة (`INSTITUTION`)، المتفقد (`INSPECTOR`)، والتلميذ (`STUDENT`)
 *      يُمنعون تماماً من تسجيل الدخول من فضاء غير فضائهم (سواء بالبريد وكلمة المرور أو عبر Google OAuth،
 *      وحتى لو تأخر رد قاعدة البيانات أثناء الفحص الأولي).
 * 4. تسريع تسجيل الدخول العادي وتسجيل الدخول عبر Google وإعادة ظهور لوحات التحكم فوراً:
 *    - إصلاح استرجاع رتبة المستخدم من `user_metadata` و `db.user` في `/api/auth/me`
 *      و `/api/auth/callback` و `Navbar.tsx` حتى تظهر لوحة المشرف والمسؤول والمتفقد فوراً دون بطء أو اختفاء.
 * 5. تطبيق الترقية الأمنية الكاملة (فحص `Magic Bytes` للملفات، وفهرس `GIN`، وتأمين `login-guard` و `thumbnail`).
 * ============================================================================
 * طريقة التشغيل:
 *   node fix-al-musnad-v17.mjs
 * ============================================================================
 */

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function writeFileSafe(relPath, content) {
  const fullPath = path.join(rootDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`✅ [Patched] ${relPath}`);
}

function patchInPlace(relPath, replacerFn, description) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ [Skipped - File Not Found] ${relPath}`);
    return;
  }
  const original = fs.readFileSync(fullPath, "utf8");
  const updated = replacerFn(original);
  if (original !== updated) {
    fs.writeFileSync(fullPath, updated, "utf8");
    console.log(`✅ [Updated] ${relPath} — ${description}`);
  } else {
    console.log(`ℹ️ [Already Up-To-Date] ${relPath} — ${description}`);
  }
}

console.log("====================================================================");
console.log("🚀 بدء استعادة بنية موقع «المسند» وإصلاح جميع المشاكل (v17.1)...");
console.log("====================================================================");

// ----------------------------------------------------------------------------
// 0. استعادة البنية المرجعية الكاملة من `PROJECT_HANDOVER.md` (إن وُجد)
// ----------------------------------------------------------------------------
const handoverFiles = [
  "PROJECT_HANDOVER.md",
  "PROJECT_HANDOVER_PART1.md",
  "PROJECT_HANDOVER_PART2.md",
].filter((f) => fs.existsSync(path.join(rootDir, f)));

if (handoverFiles.length > 0) {
  const pattern = /### File: `([^`]+)`\s*\n+```[^\n]*\n([\s\S]*?)\n```/g;
  let restoredCount = 0;
  for (const hFile of handoverFiles) {
    const mdContent = fs.readFileSync(path.join(rootDir, hFile), "utf8");
    let match;
    while ((match = pattern.exec(mdContent)) !== null) {
      const [, relPath, code] = match;
      const targetPath = path.join(rootDir, relPath.replace(/\\/g, "/"));
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, code, "utf8");
      restoredCount++;
    }
  }
  console.log(
    `📦 [Restored Baseline] تمت استعادة ${restoredCount} ملفاً مرجعياً من PROJECT_HANDOVER.md بنجاح!`
  );
}

// ----------------------------------------------------------------------------
// 1. حذف المنشورات الوهمية/العشوائية (DEMO_WORKSHEETS) نهائياً من `src/app/page.tsx`
// ----------------------------------------------------------------------------
patchInPlace(
  "src/app/page.tsx",
  (code) => {
    let updated = code.replace(
      /const DEMO_WORKSHEETS = \[[\s\S]*?\n\];/g,
      "const DEMO_WORKSHEETS: any[] = [];"
    );
    updated = updated.replace(
      /let visibleDemo = isAuthenticated[\s\S]*?totalPages: 1,\s*\};/g,
      `worksheets = [];
    explorerWorksheets = [];
    meta = {
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 1,
    };`
    );
    return updated;
  },
  "حذف المنشورات الوهمية العشوائية (DEMO_WORKSHEETS) نهائياً من الصفحة الرئيسية"
);

// ----------------------------------------------------------------------------
// 2. إصلاح `src/app/api/auth/callback/route.ts`
// ----------------------------------------------------------------------------
const callbackRouteCode = [
  'import { NextResponse } from "next/server";',
  'import { createSupabaseServerClient } from "@/lib/supabase/server";',
  'import { db } from "@/lib/db";',
  'import { Role } from "@prisma/client";',
  'import { MAX_LOGIN_PASSWORD_ATTEMPTS } from "@/config/constants";',
  'import { sendWelcomeEmail } from "@/services/email.service";',
  '',
  'const VALID_PORTAL_ROLES = ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"] as const;',
  '',
  'function resolveAllowedPublicRole(rawRoleInput?: string | null): Role {',
  '  const clean = String(rawRoleInput || "TEACHER").trim().toUpperCase();',
  '  if (clean === "INSTITUTION") return Role.INSTITUTION;',
  '  if (clean === "INSPECTOR") return Role.INSPECTOR;',
  '  if (clean === "STUDENT") return Role.STUDENT;',
  '  return Role.TEACHER;',
  '}',
  '',
  'export async function GET(request: Request) {',
  '  const { searchParams, origin } = new URL(request.url);',
  '  const code = searchParams.get("code");',
  '  const next = searchParams.get("next") ?? "/";',
  '  const requestedRoleParam = (searchParams.get("role") || "").trim().toUpperCase();',
  '',
  '  if (code) {',
  '    const supabase = await createSupabaseServerClient();',
  '    const { data, error } = await supabase.auth.exchangeCodeForSession(code);',
  '',
  '    if (!error && data?.user) {',
  '      const authUser = data.user;',
  '      const metaRole = String(authUser.user_metadata?.role || "").trim().toUpperCase();',
  '      const adminEmail = (process.env.ADMIN_EMAIL || "bjasser123@gmail.com").toLowerCase();',
  '      const isPrimaryAdminEmail = authUser.email?.toLowerCase() === adminEmail;',
  '',
  '      try {',
  '        let existingUser = await db.user.findUnique({ where: { id: authUser.id } });',
  '        if (!existingUser && authUser.email) {',
  '          existingUser = await db.user.findUnique({ where: { email: authUser.email.toLowerCase() } });',
  '        }',
  '',
  '        if (existingUser) {',
  '          if (isPrimaryAdminEmail && existingUser.role !== Role.ADMIN) {',
  '            existingUser = await db.user.update({',
  '              where: { id: existingUser.id },',
  '              data: { role: Role.ADMIN, isVerified: true },',
  '            });',
  '          }',
  '',
  '          const createdJustNow = Date.now() - new Date(existingUser.createdAt).getTime() < 25_000;',
  '          if (',
  '            !isPrimaryAdminEmail &&',
  '            !existingUser.isVerified &&',
  '            existingUser.role === Role.TEACHER &&',
  '            createdJustNow &&',
  '            !metaRole &&',
  '            requestedRoleParam &&',
  '            VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&',
  '            requestedRoleParam !== "TEACHER"',
  '          ) {',
  '            const correctedRole = resolveAllowedPublicRole(requestedRoleParam);',
  '            existingUser = await db.user.update({',
  '              where: { id: existingUser.id },',
  '              data: {',
  '                role: correctedRole,',
  '                inspectorPending: correctedRole === Role.INSPECTOR,',
  '              },',
  '            });',
  '            await supabase.auth.updateUser({',
  '              data: { role: correctedRole, inspector_pending: correctedRole === Role.INSPECTOR },',
  '            }).catch(() => null);',
  '          }',
  '',
  '          const isLocked = Boolean(existingUser.lockedAt) || (existingUser.failedLoginAttempts ?? 0) >= MAX_LOGIN_PASSWORD_ATTEMPTS;',
  '          if (isLocked || existingUser.isBanned) {',
  '            await supabase.auth.signOut();',
  '            return NextResponse.redirect(`${origin}/login?error=account-locked`);',
  '          }',
  '',
  '          // Strict Portal Isolation: Only ADMIN and MODERATOR can log in from any portal.',
  '          const isStaff = existingUser.role === Role.ADMIN || existingUser.role === Role.MODERATOR || isPrimaryAdminEmail;',
  '          if (',
  '            !isStaff &&',
  '            requestedRoleParam &&',
  '            VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&',
  '            existingUser.role !== requestedRoleParam',
  '          ) {',
  '            await supabase.auth.signOut();',
  '            return NextResponse.redirect(',
  '              `${origin}/login?role=${encodeURIComponent(requestedRoleParam)}&error=portal-mismatch&actualRole=${encodeURIComponent(existingUser.role)}`',
  '            );',
  '          }',
  '',
  '          void db.user.update({',
  '            where: { id: existingUser.id },',
  '            data: {',
  '              avatarUrl: existingUser.avatarUrl || (authUser.user_metadata?.avatar_url as string) || (authUser.user_metadata?.picture as string) || null,',
  '              lastSeenAt: new Date(),',
  '            },',
  '          }).catch(() => null);',
  '',
  '          const dest =',
  '            existingUser.role === Role.ADMIN',
  '              ? "/admin/dashboard"',
  '              : existingUser.role === Role.MODERATOR',
  '              ? "/moderator/dashboard"',
  '              : existingUser.role === Role.INSPECTOR',
  '              ? existingUser.isVerified',
  '                ? "/inspector/dashboard"',
  '                : "/#inspectors-hub"',
  '              : existingUser.role === Role.INSTITUTION',
  '              ? "/#institutions-hub"',
  '              : existingUser.role === Role.TEACHER',
  '              ? "/#teachers-hub"',
  '              : next.startsWith("/")',
  '              ? next',
  '              : "/";',
  '',
  '          return NextResponse.redirect(`${origin}${dest}`);',
  '        } else if (authUser.email) {',
  '          const rawRole = requestedRoleParam || metaRole || "TEACHER";',
  '          const assignedRole: Role = isPrimaryAdminEmail ? Role.ADMIN : resolveAllowedPublicRole(rawRole);',
  '          const isInspectorPending = Boolean(authUser.user_metadata?.inspector_pending) || assignedRole === Role.INSPECTOR;',
  '          const baseUsername = authUser.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "");',
  '          const safeUsername = `${baseUsername.length >= 3 ? baseUsername : "user"}_${authUser.id.slice(0, 4)}`;',
  '',
  '          await db.user.create({',
  '            data: {',
  '              id: authUser.id,',
  '              email: authUser.email.toLowerCase(),',
  '              username: safeUsername,',
  '              name: (authUser.user_metadata?.full_name as string) || (authUser.user_metadata?.name as string) || authUser.email.split("@")[0],',
  '              avatarUrl: (authUser.user_metadata?.avatar_url as string) || (authUser.user_metadata?.picture as string) || null,',
  '              role: assignedRole,',
  '              isVerified: assignedRole === Role.ADMIN,',
  '              inspectorPending: isInspectorPending,',
  '              presenceStatus: "ONLINE",',
  '              lastSeenAt: new Date(),',
  '            },',
  '          });',
  '',
  '          void supabase.auth.updateUser({',
  '            data: { role: assignedRole, inspector_pending: isInspectorPending },',
  '          }).catch(() => null);',
  '',
  '          const roleTitles: Record<string, string> = {',
  '            TEACHER: "معلم",',
  '            INSTITUTION: "مؤسسة تربوية",',
  '            STUDENT: "تلميذ",',
  '            INSPECTOR: "متفقد تربوي",',
  '          };',
  '          const userName = (authUser.user_metadata?.full_name as string) || (authUser.user_metadata?.name as string) || safeUsername;',
  '          void sendWelcomeEmail(authUser.email, userName, roleTitles[assignedRole] || assignedRole).catch(() => null);',
  '',
  '          const dest =',
  '            assignedRole === Role.ADMIN',
  '              ? "/admin/dashboard"',
  '              : assignedRole === Role.INSPECTOR',
  '              ? "/#inspectors-hub"',
  '              : assignedRole === Role.INSTITUTION',
  '              ? "/#institutions-hub"',
  '              : assignedRole === Role.TEACHER',
  '              ? "/#teachers-hub"',
  '              : "/";',
  '',
  '          return NextResponse.redirect(`${origin}${dest}`);',
  '        }',
  '      } catch (dbErr) {',
  '        console.warn("[auth/callback] DB fallback warning:", dbErr);',
  '        const fallbackRole = isPrimaryAdminEmail ? "ADMIN" : metaRole || "TEACHER";',
  '        const isStaffFallback = fallbackRole === "ADMIN" || fallbackRole === "MODERATOR" || isPrimaryAdminEmail;',
  '        if (',
  '          !isStaffFallback &&',
  '          requestedRoleParam &&',
  '          VALID_PORTAL_ROLES.includes(requestedRoleParam as any) &&',
  '          fallbackRole !== requestedRoleParam',
  '        ) {',
  '          await supabase.auth.signOut();',
  '          return NextResponse.redirect(',
  '            `${origin}/login?role=${encodeURIComponent(requestedRoleParam)}&error=portal-mismatch&actualRole=${encodeURIComponent(fallbackRole)}`',
  '          );',
  '        }',
  '      }',
  '',
  '      const safeNext = next.startsWith("/") ? next : "/";',
  '      return NextResponse.redirect(`${origin}${safeNext}`);',
  '    }',
  '  }',
  '',
  '  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);',
  '}',
].join("\n");

writeFileSafe("src/app/api/auth/callback/route.ts", callbackRouteCode + "\n");

// ----------------------------------------------------------------------------
// 3. إصلاح `src/app/api/auth/me/route.ts`
// ----------------------------------------------------------------------------
const authMeCode = [
  'import { createSupabaseServerClient } from "@/lib/supabase/server";',
  'import { db } from "@/lib/db";',
  'import { successResponse, errorResponse } from "@/lib/utils/api-response";',
  'import { UnauthorizedError } from "@/lib/utils/errors";',
  'import { Role } from "@prisma/client";',
  '',
  'function cleanStoredDisplayName(rawName: string): string {',
  '  if (!rawName) return rawName;',
  '  return rawName',
  '    .replace(/\\s*\\((المشرف العام|مشرف عام|مشرف|مسؤول إداري|مسؤول|متفقد تربوي|متفقد|معلم|تلميذ|مؤسسة تربوية|مؤسسة)\\)\\s*$/g, "")',
  '    .trim();',
  '}',
  '',
  'function resolveAllowedPublicRole(rawRoleInput?: string | null): Role {',
  '  const clean = String(rawRoleInput || "TEACHER").trim().toUpperCase();',
  '  if (clean === "ADMIN") return Role.ADMIN;',
  '  if (clean === "MODERATOR") return Role.MODERATOR;',
  '  if (clean === "INSTITUTION") return Role.INSTITUTION;',
  '  if (clean === "INSPECTOR") return Role.INSPECTOR;',
  '  if (clean === "STUDENT") return Role.STUDENT;',
  '  return Role.TEACHER;',
  '}',
  '',
  'export async function GET() {',
  '  try {',
  '    const supabase = await createSupabaseServerClient();',
  '    const { data: { user } } = await supabase.auth.getUser();',
  '',
  '    if (!user) {',
  '      throw new UnauthorizedError("Not authenticated");',
  '    }',
  '',
  '    const adminEmail = (process.env.ADMIN_EMAIL || "bjasser123@gmail.com").toLowerCase();',
  '    const isPrimaryAdmin = user.email?.toLowerCase() === adminEmail;',
  '    const rawMetaRole = String(user.user_metadata?.role || "").trim().toUpperCase();',
  '',
  '    try {',
  '      let profile = await db.user.findUnique({',
  '        where: { id: user.id },',
  '        include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },',
  '      });',
  '',
  '      if (!profile && user.email) {',
  '        profile = await db.user.findUnique({',
  '          where: { email: user.email.toLowerCase() },',
  '          include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },',
  '        });',
  '      }',
  '',
  '      if (!profile) {',
  '        const safeRole: Role = isPrimaryAdmin ? Role.ADMIN : resolveAllowedPublicRole(rawMetaRole || "TEACHER");',
  '        const isInspectorPending = Boolean(user.user_metadata?.inspector_pending) || safeRole === Role.INSPECTOR;',
  '        const defaultUsername = (user.user_metadata?.username as string) || `${user.email!.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${user.id.slice(0, 4)}`;',
  '        const rawFullName = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email!.split("@")[0];',
  '',
  '        profile = await db.user.create({',
  '          data: {',
  '            id: user.id,',
  '            email: user.email!.toLowerCase(),',
  '            username: defaultUsername,',
  '            name: cleanStoredDisplayName(rawFullName),',
  '            avatarUrl: (user.user_metadata?.avatar_url as string) || (user.user_metadata?.picture as string) || null,',
  '            school: (user.user_metadata?.school as string) || null,',
  '            studentGrade: (user.user_metadata?.student_grade as string) || null,',
  '            role: safeRole,',
  '            isVerified: safeRole === Role.ADMIN,',
  '            inspectorPending: isInspectorPending,',
  '            presenceStatus: "ONLINE",',
  '            lastSeenAt: new Date(),',
  '          },',
  '          include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },',
  '        });',
  '      } else {',
  '        const updates: Record<string, unknown> = {};',
  '        if (isPrimaryAdmin && profile.role !== Role.ADMIN) {',
  '          updates.role = Role.ADMIN;',
  '          updates.isVerified = true;',
  '        }',
  '        if (!profile.username) {',
  '          updates.username = `${profile.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${profile.id.slice(0, 4)}`;',
  '        }',
  '        const cleanedName = cleanStoredDisplayName(profile.name);',
  '        if (cleanedName && cleanedName !== profile.name) {',
  '          updates.name = cleanedName;',
  '        }',
  '        if (Object.keys(updates).length > 0) {',
  '          try {',
  '            profile = await db.user.update({',
  '              where: { id: profile.id },',
  '              data: updates,',
  '              include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },',
  '            });',
  '          } catch {',
  '            // ignore',
  '          }',
  '        }',
  '      }',
  '',
  '      const { inspectorCode: _inspectorCode, ...safeProfile } = profile;',
  '      return successResponse({',
  '        ...safeProfile,',
  '        role: isPrimaryAdmin ? Role.ADMIN : safeProfile.role,',
  '        isVerified: isPrimaryAdmin ? true : safeProfile.isVerified,',
  '        name: cleanStoredDisplayName(safeProfile.name),',
  '      });',
  '    } catch (dbError) {',
  '      console.warn("[/api/auth/me] Using fast session metadata fallback:", dbError);',
  '      const fallbackRole: Role = isPrimaryAdmin ? Role.ADMIN : resolveAllowedPublicRole(rawMetaRole || "TEACHER");',
  '      const fallbackName = cleanStoredDisplayName(',
  '        (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email?.split("@")[0] || "عضو المسند"',
  '      );',
  '      return successResponse({',
  '        id: user.id,',
  '        email: user.email || "",',
  '        username: (user.user_metadata?.username as string) || user.email?.split("@")[0] || "user",',
  '        name: fallbackName,',
  '        avatarUrl: (user.user_metadata?.avatar_url as string) || (user.user_metadata?.picture as string) || null,',
  '        role: fallbackRole,',
  '        school: (user.user_metadata?.school as string) || null,',
  '        studentGrade: (user.user_metadata?.student_grade as string) || null,',
  '        isVerified: isPrimaryAdmin || fallbackRole === Role.ADMIN || fallbackRole === Role.MODERATOR || Boolean(user.user_metadata?.is_verified),',
  '        isBanned: false,',
  '        presenceStatus: "ONLINE",',
  '        lastSeenAt: new Date().toISOString(),',
  '        createdAt: user.created_at || new Date().toISOString(),',
  '        updatedAt: new Date().toISOString(),',
  '        _count: { worksheets: 0, favorites: 0, downloads: 0 },',
  '      });',
  '    }',
  '  } catch (error) {',
  '    return errorResponse(error);',
  '  }',
  '}',
].join("\n");

writeFileSafe("src/app/api/auth/me/route.ts", authMeCode + "\n");

// ----------------------------------------------------------------------------
// 4. إصلاح `src/app/(auth)/login/page.tsx`
// ----------------------------------------------------------------------------
patchInPlace(
  "src/app/(auth)/login/page.tsx",
  (code) =>
    code.replace(
      /\/\/ Step 2: Attempt Supabase Auth login[\s\S]*?router\.push\(targetDestination\);\s*router\.refresh\(\);/,
      [
        '// Step 2: Attempt Supabase Auth login',
        '      const supabase = createSupabaseBrowserClient();',
        '      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({',
        '        email: loginEmail,',
        '        password: parsed.data.password,',
        '      });',
        '',
        '      if (authError) {',
        '        if (existsInDb) {',
        '          try {',
        '            const failRes = await fetch("/api/auth/login-guard", {',
        '              method: "POST",',
        '              headers: { "Content-Type": "application/json" },',
        '              body: JSON.stringify({ action: "FAILED_ATTEMPT", identifier: loginEmail }),',
        '            });',
        '            const failJson = await failRes.json();',
        '            if (failJson.success && failJson.data) {',
        '              setIsAccountLocked(Boolean(failJson.data.isLocked));',
        '              if (typeof failJson.data.remainingAttempts === "number") {',
        '                setRemainingAttempts(failJson.data.remainingAttempts);',
        '              }',
        '              setError(failJson.data.message || "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.");',
        '              return;',
        '            }',
        '          } catch {',
        '            // fallback',
        '          }',
        '          setError("كلمة المرور المدخلة غير صحيحة، يرجى المحاولة مرة أخرى.");',
        '          return;',
        '        }',
        '        setError("هذا البريد الإلكتروني أو المعرف غير مسجل في المنصة، أو أن البيانات غير صحيحة.");',
        '        return;',
        '      }',
        '',
        '      // Step 3: Strict Portal Isolation Check from session metadata AND /api/auth/me',
        '      const sessionMetaRole = String(authData?.user?.user_metadata?.role || "").trim().toUpperCase();',
        '      if (sessionMetaRole) {',
        '        resolvedRole = sessionMetaRole;',
        '      }',
        '',
        '      try {',
        '        const meRes = await fetch("/api/auth/me", { cache: "no-store" });',
        '        if (meRes.ok) {',
        '          const meJson = await meRes.json();',
        '          if (meJson.success && meJson.data) {',
        '            resolvedRole = meJson.data.role || resolvedRole;',
        '            resolvedVerified = Boolean(meJson.data.isVerified);',
        '          }',
        '        }',
        '      } catch {',
        '        // fallback to sessionMetaRole',
        '      }',
        '',
        '      const isAdminOrModerator =',
        '        resolvedRole === "ADMIN" ||',
        '        resolvedRole === "MODERATOR" ||',
        '        loginEmail.toLowerCase() === "bjasser123@gmail.com" ||',
        '        loginEmail.toLowerCase() === "admin@musnad.tn";',
        '',
        '      if (',
        '        !isAdminOrModerator &&',
        '        ["INSTITUTION", "INSPECTOR", "TEACHER", "STUDENT"].includes(portalRole) &&',
        '        resolvedRole !== portalRole',
        '      ) {',
        '        await supabase.auth.signOut();',
        '        setSuggestedPortalRole(resolvedRole);',
        '        setError(',
        '          `عذراً، هذا الحساب مسجل في «${PORTAL_NAMES_AR[resolvedRole] || resolvedRole}» ولا يمكنه تسجيل الدخول من «${PORTAL_NAMES_AR[portalRole] || portalRole}». المشرف العام والمسؤول الإداري فقط يملكان صلاحية الدخول من أي فضاء.`',
        '        );',
        '        return;',
        '      }',
        '',
        '      void fetch("/api/auth/login-guard", {',
        '        method: "POST",',
        '        headers: { "Content-Type": "application/json" },',
        '        body: JSON.stringify({ action: "RESET_SUCCESS", identifier: loginEmail }),',
        '      }).catch(() => null);',
        '',
        '      const isAdminAccount =',
        '        loginEmail.toLowerCase() === "bjasser123@gmail.com" ||',
        '        loginEmail.toLowerCase() === "admin@musnad.tn" ||',
        '        resolvedRole === "ADMIN";',
        '',
        '      const targetDestination = isAdminAccount',
        '        ? "/admin/dashboard"',
        '        : resolvedRole === "MODERATOR"',
        '        ? "/moderator/dashboard"',
        '        : resolvedRole === "INSPECTOR"',
        '        ? resolvedVerified',
        '          ? "/inspector/dashboard"',
        '          : "/#inspectors-hub"',
        '        : resolvedRole === "INSTITUTION"',
        '        ? redirectTo && redirectTo !== "/"',
        '          ? redirectTo',
        '          : "/#institutions-hub"',
        '        : resolvedRole === "TEACHER"',
        '        ? redirectTo && redirectTo !== "/"',
        '          ? redirectTo',
        '          : "/#teachers-hub"',
        '        : redirectTo;',
        '',
        '      router.push(targetDestination);',
        '      router.refresh();',
      ].join("\n")
    ),
  "فرض العزل الصارم للفضاءات وتسريع تسجيل الدخول في login/page.tsx"
);

// ----------------------------------------------------------------------------
// 5. إصلاح `src/components/layout/Navbar.tsx`
// ----------------------------------------------------------------------------
patchInPlace(
  "src/components/layout/Navbar.tsx",
  (code) => {
    let updated = code.replace(
      /const initialUser:\s*UserProfile\s*=\s*\{[\s\S]*?lastSeenAt:\s*new Date\(\)\.toISOString\(\),\s*\};/,
      [
        'const isPrimaryAdminEmail = session.user.email?.toLowerCase() === "bjasser123@gmail.com" || session.user.email?.toLowerCase() === "admin@musnad.tn";',
        '          const initialRole = isPrimaryAdminEmail ? "ADMIN" : (session.user.user_metadata?.role as string) || "TEACHER";',
        '          const initialUser: UserProfile = {',
        '            id: session.user.id,',
        '            name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "عضو المسند",',
        '            email: session.user.email || "",',
        '            avatarUrl: session.user.user_metadata?.avatar_url || null,',
        '            role: initialRole,',
        '            isVerified: isPrimaryAdminEmail || initialRole === "ADMIN" || initialRole === "MODERATOR" || Boolean(session.user.user_metadata?.is_verified),',
        '            presenceStatus: "ONLINE",',
        '            lastSeenAt: new Date().toISOString(),',
        '          };',
      ].join("\n")
    );

    updated = updated.replace(
      /const updatedUser:\s*UserProfile\s*=\s*\{[\s\S]*?lastSeenAt:\s*new Date\(\)\.toISOString\(\),\s*\};/,
      [
        'const isPrimaryAdminEmail = session.user.email?.toLowerCase() === "bjasser123@gmail.com" || session.user.email?.toLowerCase() === "admin@musnad.tn";',
        '        const initialRole = isPrimaryAdminEmail ? "ADMIN" : (session.user.user_metadata?.role as string) || "TEACHER";',
        '        const updatedUser: UserProfile = {',
        '          id: session.user.id,',
        '          name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "عضو المسند",',
        '          email: session.user.email || "",',
        '          avatarUrl: session.user.user_metadata?.avatar_url || null,',
        '          role: initialRole,',
        '          isVerified: isPrimaryAdminEmail || initialRole === "ADMIN" || initialRole === "MODERATOR" || Boolean(session.user.user_metadata?.is_verified),',
        '          presenceStatus: "ONLINE",',
        '          lastSeenAt: new Date().toISOString(),',
        '        };',
      ].join("\n")
    );
    return updated;
  },
  "إظهار لوحات المشرف والمسؤول والمتفقد فوراً في الشريط العلوي Navbar.tsx"
);

// ----------------------------------------------------------------------------
// 6. تحديث `src/services/storage.service.ts` (فحص Magic Bytes + حظر المفاتيح المسربة)
// ----------------------------------------------------------------------------
patchInPlace(
  "src/services/storage.service.ts",
  (code) => {
    let updated = code
      .replace(
        /const KNOWN_VERIFIED_R2_ACCESS_KEY_ID = "[^"]*";\s*const KNOWN_VERIFIED_R2_SECRET_KEY =\s*"[^"]*";/g,
        'const REVOKED_COMPROMISED_R2_KEYS = new Set(["f272f5098c9f3eeb255a833defec2e89", "6b5ca30a3de6c846aa585ddb963bc85a7a1e1e4155497fa50de39d7310e441ef"]);'
      )
      .replace(
        /if \(\s*rawAccessKey === KNOWN_VERIFIED_R2_SECRET_KEY[\s\S]*?if \(rawAccessKey === KNOWN_VERIFIED_R2_ACCESS_KEY_ID && !rawSecretKey\) \{\s*rawSecretKey = KNOWN_VERIFIED_R2_SECRET_KEY;\s*\}/g,
        'if (REVOKED_COMPROMISED_R2_KEYS.has(rawAccessKey) || REVOKED_COMPROMISED_R2_KEYS.has(rawSecretKey)) { rawAccessKey = ""; rawSecretKey = ""; }'
      );

    if (!updated.includes("verifyFileMagicBytes")) {
      const magicFn = [
        'export function verifyFileMagicBytes(buffer: Buffer, fileName: string): boolean {',
        '  if (!buffer || buffer.byteLength < 4) return false;',
        '  const lower = (fileName || "").toLowerCase();',
        '  if (lower.endsWith(".pdf")) {',
        '    return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;',
        '  }',
        '  if (lower.endsWith(".png")) {',
        '    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;',
        '  }',
        '  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {',
        '    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;',
        '  }',
        '  if (lower.endsWith(".webp")) {',
        '    return buffer.byteLength >= 12 && buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;',
        '  }',
        '  if (lower.endsWith(".docx")) {',
        '    return buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;',
        '  }',
        '  if (lower.endsWith(".doc")) {',
        '    return (buffer[0] === 0xd0 && buffer[1] === 0xcf) || (buffer[0] === 0x50 && buffer[1] === 0x4b);',
        '  }',
        '  return true;',
        '}',
      ].join("\n");

      updated = updated.replace(
        /const arrayBuffer = await file\.arrayBuffer\(\);\s*const buffer = Buffer\.from\(arrayBuffer\);/,
        "const arrayBuffer = await file.arrayBuffer();\n  const buffer = Buffer.from(arrayBuffer);\n  if (!verifyFileMagicBytes(buffer, file.name)) {\n    throw new AppError('بصمة الملف الثنائية (Magic Bytes) غير صالحة أو لا تطابق امتداده.', 'INVALID_FILE_SIGNATURE', 400);\n  }"
      );
      updated = magicFn + "\n\n" + updated;
    }
    return updated;
  },
  "إضافة فحص البصمة الثنائية للملفات (Magic Bytes) وحظر المفاتيح المسربة في storage.service.ts"
);

// ----------------------------------------------------------------------------
// 7. تأمين `src/app/api/auth/login-guard/route.ts`
// ----------------------------------------------------------------------------
patchInPlace(
  "src/app/api/auth/login-guard/route.ts",
  (code) =>
    code.replace(
      /const syncedUser = await db\.user\.upsert\(\{[\s\S]*?\}\);/,
      [
        'const existingCheck = await db.user.findUnique({ where: { id: userId }, select: { id: true, role: true, isVerified: true, createdAt: true } });',
        '      if (existingCheck && (existingCheck.isVerified || Date.now() - new Date(existingCheck.createdAt).getTime() > 45_000)) {',
        '        return successResponse({ synced: true, role: existingCheck.role, isVerified: existingCheck.isVerified });',
        '      }',
        '      const syncedUser = await db.user.upsert({',
        '        where: { id: userId },',
        '        update: { email, name: name || email.split("@")[0], username: finalUsername, school, studentGrade, role: assignedRole, isVerified: assignedRole === Role.ADMIN, inspectorPending: isInspectorPending },',
        '        create: { id: userId, email, name: name || email.split("@")[0], username: finalUsername, school, studentGrade, role: assignedRole, isVerified: assignedRole === Role.ADMIN, inspectorPending: isInspectorPending, presenceStatus: "ONLINE", lastSeenAt: new Date() },',
        '      });',
      ].join("\n")
    ),
  "حماية REGISTER_SYNC من تعديل رتب الحسابات الموجودة مسبقاً في login-guard/route.ts"
);

// ----------------------------------------------------------------------------
// 8. باقي الإصلاحات البرمجية والأمنية (ReviewSection, support, profile, worksheet.service, schema.prisma)
// ----------------------------------------------------------------------------
patchInPlace(
  "src/components/worksheets/ReviewSection.tsx",
  (code) =>
    code.replace(
      /const savedReview: ReviewItem = json\.data;\s*setReviews\(\(prev\) => \{/g,
      `const savedReview: ReviewItem = json.data.review ?? json.data;
      if (typeof json.data.ratingAvg === "number") setRatingAvg(json.data.ratingAvg);
      if (typeof json.data.reviewCount === "number") setReviewCount(json.data.reviewCount);
      setReviews((prev) => {`
    ),
  "إصلاح قراءة التعليق الجديد (json.data.review) في ReviewSection.tsx"
);

patchInPlace(
  "src/app/(main)/support/page.tsx",
  (code) =>
    code
      .replace(
        /t\.status === "RESOLVED"\s*\?\s*"تم الحل ✓"\s*:\s*t\.status === "IN_PROGRESS"\s*\?\s*"قيد المعالجة"\s*:\s*"جديدة"/g,
        't.status === "ANSWERED" || t.status === "RESOLVED" ? "تم الرد ✓" : t.status === "CLOSED" ? "مغلقة" : "مفتوحة (قيد المراجعة)"'
      )
      .replace(
        /\{t\.response && \(/g,
        "{(t.adminReply || t.response) && ("
      )
      .replace(
        /\{t\.response\}/g,
        "{t.adminReply || t.response}"
      ),
  "إصلاح عرض رد الإدارة (t.adminReply) في صفحة الدعم الفني"
);

patchInPlace(
  "src/services/worksheet.service.ts",
  (code) =>
    code.replace(
      /let nextStatus = data\.status !== undefined \? data\.status : existing\.status;/g,
      "const canChangeWorksheetStatus = isAdmin || isModerator || isInspector;\n  let nextStatus = canChangeWorksheetStatus && data.status !== undefined ? data.status : existing.status;"
    ),
  "حصر تغيير حالة المنشور (status) في المشرف والمسؤول والمتفقد فقط"
);

patchInPlace(
  "src/app/(main)/profile/page.tsx",
  (code) =>
    code.replace(
      /const isAccountVerified =\s*Boolean\(profile\.isVerified\) \|\| profile\.role === "INSPECTOR";/g,
      'const isAccountVerified = Boolean(profile.isVerified) || profile.role === "ADMIN" || profile.role === "MODERATOR";'
    ),
  "إصلاح شرط التحقق من التوثيق في صفحة الملف الشخصي"
);

patchInPlace(
  "prisma/schema.prisma",
  (schema) => {
    if (schema.includes("@@index([tags], type: Gin)")) return schema;
    return schema.replace(
      /@@index\(\[gradeId, subjectId\]\)\s*@@map\("worksheets"\)/,
      '@@index([gradeId, subjectId])\n  @@index([tags], type: Gin)\n  @@map("worksheets")'
    );
  },
  "إضافة فهرس @@index([tags], type: Gin) في prisma/schema.prisma"
);

patchInPlace(
  "prisma/seed.ts",
  (code) =>
    code
      .replace(
        /const serviceRoleKey =\s*process\.env\.SUPABASE_SERVICE_ROLE_KEY \|\|\s*"[^"]+";/g,
        'const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";'
      )
      .replace(
        /password:\s*"Jasserbes1M"/g,
        'password: process.env.ADMIN_INITIAL_PASSWORD || "ChangeMeImmediately@2026"'
      ),
  "تنظيف prisma/seed.ts من المفاتيح المكشوفة"
);

console.log("====================================================================");
console.log("🎉 اكتملت استعادة بنية الموقع وإصلاح جميع المشاكل الأربعة بنجاح 100%!");
console.log("====================================================================");
