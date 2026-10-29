import { NextRequest, NextResponse } from "next/server";

const DEMO_EMAILS = [
  "admin@musnad.tn",
  "moderator@musnad.tn",
  "inspector@musnad.tn",
  "institution@musnad.tn",
  "teacher@musnad.tn",
  "student@musnad.tn",
];

const PRIMARY_ADMIN_EMAIL = "bjasser123@gmail.com";

/**
 * POST /api/auth/demo-session
 *
 * Secures demo accounts strictly to the development environment:
 * - In production (NODE_ENV === 'production'): demo sessions for @musnad.tn are strictly forbidden.
 * - Primary administrator bjasser123@gmail.com is always allowed across all environments.
 */
export async function POST(request: NextRequest) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    // Primary Admin is always permitted
    if (email === PRIMARY_ADMIN_EMAIL) {
      return NextResponse.json({
        success: true,
        allowed: true,
        email: PRIMARY_ADMIN_EMAIL,
        role: "ADMIN",
        message: "تم التحقق من حساب المشرف العام الأساسي.",
      });
    }

    // In production, forbid demo accounts
    if (isProduction) {
      return NextResponse.json(
        {
          success: false,
          allowed: false,
          error: "حسابات التجربة (@musnad.tn) معطّلة ومحصورة في بيئة التطوير المحلية فقط لأسباب أمنية.",
        },
        { status: 403 }
      );
    }

    // In development environment, verify if it's one of the 6 demo accounts
    if (DEMO_EMAILS.includes(email)) {
      return NextResponse.json({
        success: true,
        allowed: true,
        email,
        isDemo: true,
        message: "جلسة تجريبية نشطة (بيئة التطوير).",
      });
    }

    return NextResponse.json(
      {
        success: false,
        allowed: false,
        error: "البريد الإلكتروني غير مصرح به لجلسة التجربة.",
      },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return NextResponse.json(
      {
        success: false,
        error: "بيئة الإنتاج لا تدعم حسابات التجربة.",
        production: true,
      },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    production: false,
    demoAccountsAvailable: true,
    accounts: DEMO_EMAILS,
  });
}
