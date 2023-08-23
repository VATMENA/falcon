"use server";

import { prisma } from "@/lib/db/prisma";
import { soloFormSchema } from "@/lib/form-schemas";
import { getUserSession } from "@/utils/session";
import { SoloRequest } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const addSoloRequest = async (input: z.infer<typeof soloFormSchema>) => {
  const session = await getUserSession();

  try {
    await prisma.soloRequest.create({
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
      }): Made a solo request for ${input.full_name}(${input.cid}) on ${
        input.position
      } which expires on ${new Date(input.expiry).toDateString()}`,
      cid: input.cid,
    },
  });
  revalidateTag("solo");
};

export const addSolo = async (request: SoloRequest) => {
  const session = await getUserSession();

  try {
    await prisma.solo.create({
      data: {
        cid: request.cid,
        full_name: request.full_name,
        instructor: request.instructor,
        position: request.position,
        expiry: request.expiry,
      },
    });
  } catch (error) {
    console.error(error);
  }

  await prisma.soloRequest.delete({
    where: {
      id: request.id,
    },
  });

  await prisma.log.create({
    data: {
      type: "SOLO",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Added solo on ${request.position} to ${
        request.cid
      } which expires on ${new Date(request.expiry).toDateString()}`,
      cid: request.cid,
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
