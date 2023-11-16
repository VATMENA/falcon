"use server";

import { soloFormSchema } from "@/lib/form-schemas";
import { getUserSession } from "@/utils/session";
import { SoloRequest, prisma } from "db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addSoloRequest = async ({
  expiry,
  ...input
}: z.infer<typeof soloFormSchema>) => {
  const session = await getUserSession();

  try {
    const utcExpiry = Date.UTC(
      expiry.getFullYear(),
      expiry.getMonth(),
      expiry.getDate(),
    );
    const solo = await prisma.soloRequest.create({
      data: {
        expiry: new Date(utcExpiry),
        ...input,
      },
    });

    await fetch("http://kirollos.rocks:6799/solos/request", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.BOT_WEBHOOK_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: solo.id,
        requested_by: session!.user.fullName,
        time: new Date(),
        cid: input.cid,
        full_name: input.full_name,
        position: input.position,
        expiry: new Date(utcExpiry),
        instructor: input.instructor,
        solo_count: input.count,
        status: 0,
      }),
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
      } which expires on ${new Date(expiry).toDateString()}`,
      cid: input.cid,
    },
  });
  revalidatePath("/dashboard/solos");
};

export const updateSolo = async ({
  expiry,
  ...input
}: z.infer<typeof soloFormSchema>) => {
  const session = await getUserSession();

  try {
    const utcExpiry = Date.UTC(
      expiry.getFullYear(),
      expiry.getMonth(),
      expiry.getDate(),
    );
    await prisma.solo.update({
      where: {
        cid: input.cid,
      },
      data: {
        expiry: new Date(utcExpiry),
        ...input,
      },
    });
  } catch (error) {
    console.error(error);
  }

  await prisma.log.create({
    data: {
      type: "SOLO",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Extended solo for ${input.full_name}(${input.cid}) on ${
        input.position
      } which expires on ${new Date(expiry).toDateString()}`,
      cid: input.cid,
    },
  });
  revalidatePath("/dashboard/solos");
};

export const addSolo = async (request: SoloRequest) => {
  const session = await getUserSession();

  try {
    await prisma.solo.create({
      data: request,
    });
    await fetch(`http://kirollos.rocks:6799/solos/request/${request.id}`, {
      method: "PATCH",
      headers: {
        "X-API-Key": process.env.BOT_WEBHOOK_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updated_by: session!.user.fullName,
        status: 2,
        time: new Date(),
      }),
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
  revalidatePath("/dashboard/solos");
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
  revalidatePath("/dashboard/solos");
};
