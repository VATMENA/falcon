"use server";

import { transferFormSchema } from "@/lib/form-schemas";
import { VatsimMemberResponse, updateMember } from "@/lib/vatsim/member";
import { prisma } from "db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const transferMember = async (
  member: VatsimMemberResponse,
  input: z.infer<typeof transferFormSchema>
) => {
  await prisma.log.create({
    data: {
      type: "TRANSFER",
      message: `${member.name_first} ${member.name_last} (${member.id}): Assigned themselves to ${input.subdivision}`,
      cid: member.id.toString(),
    },
  });

  await updateMember(member.id, {
    comment: `Automatic assignment to ${input.subdivision}.`,
    subdivision_id: input.subdivision,
  });

  revalidatePath("/dashboard/transfers");

  return {};
};
