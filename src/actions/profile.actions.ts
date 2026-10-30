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