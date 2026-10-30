import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError } from "@/lib/utils/errors";
import { Role } from "@prisma/client";

function cleanStoredDisplayName(rawName: string): string {
  if (!rawName) return rawName;
  return rawName
    .replace(/\s*\((المشرف العام|مشرف عام|مشرف|مسؤول إداري|مسؤول|متفقد تربوي|متفقد|معلم|تلميذ|مؤسسة تربوية|مؤسسة)\)\s*$/g, "")
    .trim();
}

function resolveAllowedPublicRole(rawRoleInput?: string | null): Role {
  const clean = String(rawRoleInput || "TEACHER").trim().toUpperCase();
  if (clean === "ADMIN") return Role.ADMIN;
  if (clean === "MODERATOR") return Role.MODERATOR;
  if (clean === "INSTITUTION") return Role.INSTITUTION;
  if (clean === "INSPECTOR") return Role.INSPECTOR;
  if (clean === "STUDENT") return Role.STUDENT;
  return Role.TEACHER;
}

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("Not authenticated");
    }

    const adminEmail = (process.env.ADMIN_EMAIL || "bjasser123@gmail.com").toLowerCase();
    const isPrimaryAdmin = user.email?.toLowerCase() === adminEmail;
    const rawMetaRole = String(user.user_metadata?.role || "").trim().toUpperCase();

    try {
      let profile = await db.user.findUnique({
        where: { id: user.id },
        include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },
      });

      if (!profile && user.email) {
        profile = await db.user.findUnique({
          where: { email: user.email.toLowerCase() },
          include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },
        });
      }

      if (!profile) {
        const safeRole: Role = isPrimaryAdmin ? Role.ADMIN : resolveAllowedPublicRole(rawMetaRole || "TEACHER");
        const isInspectorPending = Boolean(user.user_metadata?.inspector_pending) || safeRole === Role.INSPECTOR;
        const defaultUsername = (user.user_metadata?.username as string) || `${user.email!.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${user.id.slice(0, 4)}`;
        const rawFullName = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email!.split("@")[0];

        profile = await db.user.create({
          data: {
            id: user.id,
            email: user.email!.toLowerCase(),
            username: defaultUsername,
            name: cleanStoredDisplayName(rawFullName),
            avatarUrl: (user.user_metadata?.avatar_url as string) || (user.user_metadata?.picture as string) || null,
            school: (user.user_metadata?.school as string) || null,
            studentGrade: (user.user_metadata?.student_grade as string) || null,
            role: safeRole,
            isVerified: safeRole === Role.ADMIN,
            inspectorPending: isInspectorPending,
            presenceStatus: "ONLINE",
            lastSeenAt: new Date(),
          },
          include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },
        });
      } else {
        const updates: Record<string, unknown> = {};
        if (isPrimaryAdmin && profile.role !== Role.ADMIN) {
          updates.role = Role.ADMIN;
          updates.isVerified = true;
        }
        if (!profile.username) {
          updates.username = `${profile.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${profile.id.slice(0, 4)}`;
        }
        const cleanedName = cleanStoredDisplayName(profile.name);
        if (cleanedName && cleanedName !== profile.name) {
          updates.name = cleanedName;
        }
        if (Object.keys(updates).length > 0) {
          try {
            profile = await db.user.update({
              where: { id: profile.id },
              data: updates,
              include: { _count: { select: { worksheets: true, favorites: true, downloads: true } } },
            });
          } catch {
            // ignore
          }
        }
      }

      const { inspectorCode: _inspectorCode, ...safeProfile } = profile;
      return successResponse({
        ...safeProfile,
        role: isPrimaryAdmin ? Role.ADMIN : safeProfile.role,
        isVerified: isPrimaryAdmin ? true : safeProfile.isVerified,
        name: cleanStoredDisplayName(safeProfile.name),
      });
    } catch (dbError) {
      console.warn("[/api/auth/me] Using fast session metadata fallback:", dbError);
      const fallbackRole: Role = isPrimaryAdmin ? Role.ADMIN : resolveAllowedPublicRole(rawMetaRole || "TEACHER");
      const fallbackName = cleanStoredDisplayName(
        (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email?.split("@")[0] || "عضو المسند"
      );
      return successResponse({
        id: user.id,
        email: user.email || "",
        username: (user.user_metadata?.username as string) || user.email?.split("@")[0] || "user",
        name: fallbackName,
        avatarUrl: (user.user_metadata?.avatar_url as string) || (user.user_metadata?.picture as string) || null,
        role: fallbackRole,
        school: (user.user_metadata?.school as string) || null,
        studentGrade: (user.user_metadata?.student_grade as string) || null,
        isVerified: isPrimaryAdmin || fallbackRole === Role.ADMIN || fallbackRole === Role.MODERATOR || Boolean(user.user_metadata?.is_verified),
        isBanned: false,
        presenceStatus: "ONLINE",
        lastSeenAt: new Date().toISOString(),
        createdAt: user.created_at || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _count: { worksheets: 0, favorites: 0, downloads: 0 },
      });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
