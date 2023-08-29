"use server";

import { prisma } from "db";

export const getSoloLogs = async () => {
  return await prisma.log.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      type: "SOLO",
    },
  });
};

export const getTransferLogs = async () => {
  return await prisma.log.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      type: "TRANSFER",
    },
  });
};

export const getUpgradeLogs = async () => {
  return await prisma.log.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      type: "UPGRADE",
    },
  });
};

export const getHQLogs = async () => {
  return await prisma.log.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      type: "HQ",
    },
  });
};
