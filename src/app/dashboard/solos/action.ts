"use server";

import { prisma } from "@/lib/db/prisma";
import { soloFormSchema } from "@/lib/form-schemas";
import { getUserSession } from "@/utils/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const addSolo = async (input: z.infer<typeof soloFormSchema>) => {
  const session = await getUserSession();

  try {
    await prisma.solo.create({
      data: input,
    });
  } catch (error) {
    console.error(error);
  }

  await prisma.log.create({
    data: {
      type: "SOLO",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Added solo on ${input.position} to ${
        input.cid
      } which expires on ${new Date(input.expiry).toDateString()}`,
      cid: input.cid,
    },
  });
  revalidateTag("solo");
};

export const deleteSolo = async (cid: string) => {
  const session = await getUserSession();

  const solo = await prisma.solo.delete({
    where: {
      cid,
    },
  });

  await prisma.log.create({
    data: {
      type: "SOLO",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Deleted solo on ${solo.position} for ${cid}`,
      cid: solo.cid,
    },
  });
  revalidateTag("solo");
};
