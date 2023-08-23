"use server";

import { prisma } from "@/lib/db/prisma";
import { transferFormSchema } from "@/lib/form-schemas";
import { updateMember } from "@/lib/vatsim/member";
import { getUserSession } from "@/utils/session";
import { TransferRequest } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTransferRequest = async (
  memberId: string,
  input: z.infer<typeof transferFormSchema>
) => {
  const session = await getUserSession();

  const comment = `User transferred to ${input.subdivision} subdivision as per request.`;

  if (session!.user.cid == memberId) {
    await prisma.log.create({
      data: {
        type: "TRANSFER",
        message: `${session!.user.fullName} (${
          session!.user.cid
        }: Attempted to transfer themselves to ${input.subdivision}`,
        cid: memberId.toString(),
      },
    });
    return {
      error: "You cannot transfer yourself!",
    };
  }

  await prisma.log.create({
    data: {
      type: "TRANSFER",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Made a transfer request for ${memberId} to ${input.subdivision}`,
      cid: memberId.toString(),
    },
  });

  await prisma.transferRequest.create({
    data: {
      cid: memberId.toString(),
      comment,
      subdivision: input.subdivision,
    },
  });

  revalidatePath("/dashboard/transfers");

  return {};
};

export const transferMember = async (request: TransferRequest) => {
  const session = await getUserSession();

  await prisma.log.create({
    data: {
      type: "TRANSFER",
      message: `${session!.user.fullName} (${session!.user.cid}): Transferred ${
        request.cid
      } to ${request.subdivision}.`,
      cid: request.cid,
    },
  });

  await updateMember(parseInt(request.cid), {
    comment: request.comment,
    subdivision_id: request.subdivision,
  });

  await prisma.transferRequest.delete({
    where: {
      id: request.id,
    },
  });

  revalidatePath("/dashboard/transfers");

  return {};
};
