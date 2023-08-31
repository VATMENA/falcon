"use server";

import { ratingFormSchema } from "@/lib/form-schemas";
import { updateMember } from "@/lib/vatsim/member";
import { parseRating } from "@/utils/parse-rating";
import { getUserSession } from "@/utils/session";
import { UpgradeRequest, prisma } from "db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createUpgradeRequest = async (
  memberId: string,
  input: z.infer<typeof ratingFormSchema>
) => {
  const session = await getUserSession();

  const comment = `User upgraded to ${parseRating(input.rating)}.`;

  if (session!.user.cid == memberId) {
    await prisma.log.create({
      data: {
        type: "UPGRADE",
        message: `${session!.user.fullName} (${
          session!.user.cid
        }: Attempted to upgrade themselves to ${parseRating(input.rating)}`,
        cid: memberId.toString(),
      },
    });
    return {
      error: "You cannot upgrade yourself!",
    };
  }

  await prisma.log.create({
    data: {
      type: "UPGRADE",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Made an upgrade request for ${memberId} to ${parseRating(
        input.rating
      )}. Scoresheet Link: ${input.scoresheet}`,
      cid: memberId.toString(),
    },
  });

  await prisma.upgradeRequest.create({
    data: {
      cid: memberId.toString(),
      comment,
      rating: input.rating,
      scoresheet: input.scoresheet,
    },
  });

  revalidatePath("/dashboard/upgrade");

  return {};
};

export const upgradeMember = async (request: UpgradeRequest) => {
  const session = await getUserSession();

  await prisma.log.create({
    data: {
      type: "UPGRADE",
      message: `${session!.user.fullName} (${session!.user.cid}): Upgraded ${
        request.cid
      } to ${parseRating(request.rating)}. ${
        request.scoresheet ? "Scoresheet Link: " + request.scoresheet : ""
      }`,
      cid: request.cid,
    },
  });

  await updateMember(parseInt(request.cid), {
    comment: request.comment,
    rating: request.rating,
  });

  await prisma.upgradeRequest.delete({
    where: {
      id: request.id,
    },
  });

  revalidatePath("/dashboard/upgrade");

  return {};
};
