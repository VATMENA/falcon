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

export async function updateSolo(solo: boolean, userId: string) {
  console.log(solo, userId);
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
      solo,
    },
  });
}

export async function updateLog(log: boolean, userId: string) {
  console.log(log, userId);
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
      log,
    },
  });
}

export async function updateTransfer(transfer: boolean, userId: string) {
  console.log(transfer, userId);
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
      transfer,
    },
  });
}

export async function updateUpgrade(upgrade: boolean, userId: string) {
  console.log(upgrade, userId);
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
      upgrade,
    },
  });
}

export async function updateUserAccess(userAccess: boolean, userId: string) {
  console.log(userAccess, userId);
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
      user: userAccess,
    },
  });
}
