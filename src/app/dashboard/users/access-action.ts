"use server";

import { prisma } from "@/lib/db/prisma";

export async function updateAccess(access: boolean, userId: string) {
  console.log(access, userId);
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) return;
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      access,
    },
  });
}
