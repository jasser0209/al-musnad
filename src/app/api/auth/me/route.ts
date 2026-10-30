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
