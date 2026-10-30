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
  if (clean === "INSTITUTION") return Role.INSTITUTION;
  if (clean === "INSPECTOR") return Role.INSPECTOR;
  if (clean === "STUDENT") return Role.STUDENT;
  return Role.TEACHER;
}

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

    const rawMetaRole = String(user.user_metadata?.role || "").trim().toUpperCase();

    if (!profile) {
      const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      const isConfiguredAdmin = Boolean(
        configuredAdminEmail &&
          user.email?.toLowerCase() === configuredAdminEmail
      );

      const safeRole: Role = isConfiguredAdmin
        ? Role.ADMIN
        : resolveAllowedPublicRole(rawMetaRole || "TEACHER");

      const isInspectorPending =
        Boolean(user.user_metadata?.inspector_pending) || safeRole === Role.INSPECTOR;

      const defaultUsername =
        (user.user_metadata?.username as string) ||
        `${user.email!.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "")}_${user.id.slice(0, 4)}`;

      const rawFullName =
        (user.user_metadata?.full_name as string) ||
        (user.user_metadata?.name as string) ||
        user.email!.split("@")[0];

      profile = await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          username: defaultUsername,
          name: cleanStoredDisplayName(rawFullName),
          avatarUrl:
            (user.user_metadata?.avatar_url as string) ||
            (user.user_metadata?.picture as string) ||
            null,
          school: (user.user_metadata?.school as string) || null,
          studentGrade: (user.user_metadata?.student_grade as string) || null,
          role: safeRole,
          isVerified: safeRole === Role.ADMIN,
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

      const cleanedName = cleanStoredDisplayName(profile.name);
      if (cleanedName && cleanedName !== profile.name) {
        updates.name = cleanedName;
      }

      // Auto-heal accounts that were created as INSPECTOR / INSTITUTION / STUDENT
      // but were mapped to TEACHER by the legacy database trigger
      if (
        !profile.isVerified &&
        profile.role === Role.TEACHER &&
        (profile.inspectorPending ||
          ["INSPECTOR", "INSTITUTION", "STUDENT"].includes(rawMetaRole))
      ) {
        const healedRole = profile.inspectorPending
          ? Role.INSPECTOR
          : resolveAllowedPublicRole(rawMetaRole);
        if (healedRole !== profile.role) {
          updates.role = healedRole;
          if (healedRole === Role.INSPECTOR) {
            updates.inspectorPending = true;
          }
        }
      }

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
    return successResponse({
      ...safeProfile,
      name: cleanStoredDisplayName(safeProfile.name),
    });
  } catch (error) {
    return errorResponse(error);
  }
}