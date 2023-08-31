"use server";

import { getUserSession } from "@/utils/session";
import { prisma } from "db";

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
      message: `${session!.user.fullName} (${session!.user.cid}): ${
        access ? "Granted" : "Revoked"
      } HQ access for ${user.full_name} (${user.cid})`,
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
      message: `${session!.user.fullName} (${session!.user.cid}): ${
        solo ? "Granted" : "Revoked"
      } solo access for ${user.full_name} (${user.cid})`,
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
      message: `${session!.user.fullName} (${session!.user.cid}): ${
        log ? "Granted" : "Revoked"
      } log access for ${user.full_name} (${user.cid})`,
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
      message: `${session!.user.fullName} (${session!.user.cid}): ${
        transfer ? "Granted" : "Revoked"
      } transfer access for ${user.full_name} (${user.cid})`,
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
      message: `${session!.user.fullName} (${session!.user.cid}): ${
        upgrade ? "Granted" : "Revoked"
      } upgrade access for ${user.full_name} (${user.cid})`,
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
      message: `${session!.user.fullName} (${session!.user.cid}): ${
        userAccess ? "Granted" : "Revoked"
      } user access for ${user.full_name} (${user.cid})`,
    },
  });
}
