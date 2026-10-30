import { NextRequest, NextResponse } from "next/server";
import { DEMO_ROLE_ACCOUNTS, findDemoAccountByIdentifier } from "@/config/constants";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

const DEMO_COOKIE_NAME = "musnad_demo_role";
const CUSTOM_USER_COOKIE_NAME = "musnad_custom_user";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // Case A: Custom newly registered user session (ensures immediate Navbar user box after /register)
    if (body.customUser && body.customUser.email && body.customUser.role) {
      const cu = body.customUser;
      const response = NextResponse.json({
        success: true,
        data: { redirectTo: "/" },
      });
      response.cookies.set(
        CUSTOM_USER_COOKIE_NAME,
        encodeURIComponent(
          JSON.stringify({
            id: cu.id || "00000000-0000-4000-8000-000000000099",
            name: cu.name,
            email: cu.email,
            username: cu.username || cu.email.split("@")[0],
            role: cu.role,
            school: cu.school || null,
            isVerified: false,
          })
        ),
        {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
          httpOnly: false,
        }
      );
      return response;
    }

    // Case B: Owner Admin (`bjasser123@gmail.com`) or Local Test Account
    const rawRoleOrIdentifier = String(body.identifier || body.role || "").trim();
    const account = findDemoAccountByIdentifier(rawRoleOrIdentifier);
    if (!account) {
      return NextResponse.json(
        { success: false, error: "بيانات الحساب غير معروفة" },
        { status: 400 }
      );
    }

    try {
      await db.user.upsert({
        where: { email: account.email },
        update: {
          name: account.name,
          username: account.username,
          role: account.role as Role,
          school: account.school,
          bio: account.bio,
          isVerified: account.isVerified,
          isBanned: false,
          failedLoginAttempts: 0,
          lockedAt: null,
          lockReason: null,
          presenceStatus: "ONLINE",
          lastSeenAt: new Date(),
        },
        create: {
          id: account.id,
          name: account.name,
          username: account.username,
          email: account.email,
          role: account.role as Role,
          school: account.school,
          bio: account.bio,
          isVerified: account.isVerified,
          isBanned: false,
          failedLoginAttempts: 0,
          presenceStatus: "ONLINE",
          lastSeenAt: new Date(),
        },
      });
    } catch {
      // Safe fallback if local PostgreSQL is not running
    }

    const response = NextResponse.json({
      success: true,
      data: {
        account,
        redirectTo: account.dashboardHref,
      },
    });

    response.cookies.set(DEMO_COOKIE_NAME, account.email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false,
    });
    response.cookies.set(CUSTOM_USER_COOKIE_NAME, "", { path: "/", maxAge: 0 });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "تعذر تفعيل الجلسة" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(DEMO_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  response.cookies.set(CUSTOM_USER_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}

export async function GET(request: NextRequest) {
  const roleCookie = request.cookies.get(DEMO_COOKIE_NAME)?.value;
  const account = roleCookie ? findDemoAccountByIdentifier(roleCookie) : undefined;
  return NextResponse.json({
    success: true,
    data: {
      activeDemoAccount: account || null,
      allDemoAccounts: DEMO_ROLE_ACCOUNTS,
    },
  });
}
