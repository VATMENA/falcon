"use server";

import { getUserSession } from "@/utils/session";
import { DivisionRole, SubdivisionRole, prisma } from "db";

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
      message: `${session!.user.fullName} (${session!.user.cid}): ${access ? "Granted" : "Revoked"
        } HQ access for ${user.full_name} (${user.cid})`,
    },
  });
}

export async function updateDivisionRole(userId: string, role: DivisionRole) {
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
      division_role: role,
    },
  });

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `${session!.user.fullName} (${session!.user.cid}): Gave ${user.full_name
        } (${user.cid}) the ${role} division role.`,
    },
  });
}

export async function updateSubdivisionRole(
  userId: string,
  role: SubdivisionRole,
) {
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
      subdivision_role: role,
    },
  });

  await prisma.log.create({
    data: {
      type: "HQ",
      cid: session!.user.cid.toString(),
      message: `${session!.user.fullName} (${session!.user.cid}): Gave ${user.full_name
        } (${user.cid}) the ${role} vACC role.`,
    },
  });
}
