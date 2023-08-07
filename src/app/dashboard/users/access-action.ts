"use server";

import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/utils/session";

export async function updateAccess(access: boolean, userId: string) {
  const session = await getUserSession();

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

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `HQ access for ${user.full_name} ${
        access ? "granted" : "revoked"
      }`,
    },
  });
}

export async function updateSolo(solo: boolean, userId: string) {
  const session = await getUserSession();

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

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `Solo permission access for ${user.full_name} ${
        solo ? "granted" : "revoked"
      }`,
    },
  });
}

export async function updateLog(log: boolean, userId: string) {
  const session = await getUserSession();

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

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `Log permission access for ${user.full_name} ${
        log ? "granted" : "revoked"
      }`,
    },
  });
}

export async function updateTransfer(transfer: boolean, userId: string) {
  const session = await getUserSession();

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

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `Transfer permission access for ${user.full_name} ${
        transfer ? "granted" : "revoked"
      }`,
    },
  });
}

export async function updateUpgrade(upgrade: boolean, userId: string) {
  const session = await getUserSession();

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

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `Upgrade permission access for ${user.full_name} ${
        upgrade ? "granted" : "revoked"
      }`,
    },
  });
}

export async function updateUserAccess(userAccess: boolean, userId: string) {
  const session = await getUserSession();
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

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `User permission access for ${user.full_name} ${
        userAccess ? "granted" : "revoked"
      }`,
    },
  });
}
