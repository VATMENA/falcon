"use server";

import { prisma } from "@/lib/db/prisma";
import { ratingFormSchema } from "@/lib/form-schemas";
import { updateMember } from "@/lib/vatsim/member";
import { parseRating } from "@/utils/parse-rating";
import { getUserSession } from "@/utils/session";
import { z } from "zod";

export const updateRating = async (
  memberId: number,
  input: z.infer<typeof ratingFormSchema>
) => {
  const session = await getUserSession();

  await updateMember(memberId, {
    ...input,
  });

  await prisma.log.create({
    data: {
      type: "UPGRADE",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Upgraded ${memberId} to ${parseRating(
        input.rating
      )} with comment: \"${input.comment}\"`,
      cid: memberId.toString(),
    },
  });
};
