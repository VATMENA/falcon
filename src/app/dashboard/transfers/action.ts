"use server";

import { prisma } from "@/lib/db/prisma";
import { transferFormSchema } from "@/lib/form-schemas";
import { updateMember } from "@/lib/vatsim/member";
import { getUserSession } from "@/utils/session";
import { z } from "zod";

export const updateSubdivision = async (
  memberId: number,
  input: z.infer<typeof transferFormSchema>
) => {
  const session = await getUserSession();

  if (session!.user.cid === memberId) {
    return {
      error: "You cannot transfer yourself",
    };
  }

  await prisma.log.create({
    data: {
      type: "TRANSFER",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Transferred ${memberId} to ${input.subdivision} with comment: \"${
        input.comment
      }\"`,
      cid: memberId.toString(),
    },
  });

  await updateMember(memberId, {
    comment: input.comment,
    subdivision_id: input.subdivision,
  });

  return {
    error: null,
  };
};
