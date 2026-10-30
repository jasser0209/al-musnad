import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError } from "@/lib/utils/errors";
import { findDemoAccountByIdentifier } from "@/config/constants";
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

    const isOwnerAdminEmail =
      user.email?.trim().toLowerCase() === "bjasser123@gmail.com";

    const demoAcc =
      findDemoAccountByIdentifier(user.id) ||
      (user.email ? findDemoAccountByIdentifier(user.email) : undefined);

    const rawMetadataRole = String(user.user_metadata?.role || "TEACHER").toUpperCase();
    const resolvedRole: Role = isOwnerAdminEmail
      ? Role.ADMIN
      : demoAcc
      ? (demoAcc.role as Role)
      : rawMetadataRole === "INSTITUTION"
      ? Role.INSTITUTION
      : rawMetadataRole === "INSPECTOR"
      ? Role.INSPECTOR
      : rawMetadataRole === "STUDENT"
      ? Role.STUDENT
      : Role.TEACHER;

    try {
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

      if (!profile && user.email) {
        profile = await db.user.findUnique({
          where: { email: user.email },
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
      }

      if (profile && isOwnerAdminEmail && profile.role !== Role.ADMIN) {
        profile = await db.user.update({
          where: { id: profile.id },
          data: { role: Role.ADMIN, isVerified: true },
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
      }

      if (!profile && demoAcc) {
        profile = await db.user.upsert({
          where: { email: demoAcc.email },
          update: {
            name: demoAcc.name,
            username: demoAcc.username,
            role: demoAcc.role as Role,
            school: demoAcc.school,
            bio: demoAcc.bio,
            isVerified: demoAcc.isVerified,
          },
          create: {
            id: demoAcc.id,
            name: demoAcc.name,
            username: demoAcc.username,
            email: demoAcc.email,
            role: demoAcc.role as Role,
            school: demoAcc.school,
            bio: demoAcc.bio,
            isVerified: demoAcc.isVerified,
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
      }

      if (!profile) {
        const defaultUsername =
          (user.user_metadata?.username as string) ||
          `${user.email!.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${user.id.slice(0, 4)}`;

        profile = await db.user.create({
          data: {
            id: user.id,
            email: user.email!,
            username: defaultUsername,
            name:
              (user.user_metadata?.name as string) ||
              (user.user_metadata?.full_name as string) ||
              user.email!.split("@")[0],
            avatarUrl: (user.user_metadata?.avatar_url as string) || null,
            school: (user.user_metadata?.school as string) || null,
            bio: null,
            role: resolvedRole,
            isVerified: isOwnerAdminEmail,
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
      }

      return successResponse(profile);
    } catch {
      // Fallback when local PostgreSQL is not running
      return successResponse({
        id: demoAcc?.id || user.id,
        email: demoAcc?.email || user.email || "",
        username:
          demoAcc?.username ||
          (user.user_metadata?.username as string) ||
          user.email?.split("@")[0] ||
          "user",
        name:
          demoAcc?.name ||
          (user.user_metadata?.name as string) ||
          user.email?.split("@")[0] ||
          "عضو المسند",
        avatarUrl: null,
        bio: demoAcc?.bio || null,
        school:
          demoAcc?.school ||
          (user.user_metadata?.school as string) ||
          null,
        role: resolvedRole,
        subscriptionPlan: "STANDARD",
        isVerified: demoAcc ? demoAcc.isVerified : isOwnerAdminEmail,
        isBanned: false,
        presenceStatus: "ONLINE",
        lastSeenAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _count: {
          worksheets: 0,
          favorites: 0,
          downloads: 0,
        },
      });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
