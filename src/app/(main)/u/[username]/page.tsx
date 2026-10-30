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