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