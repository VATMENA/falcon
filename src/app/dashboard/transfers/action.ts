"use server";

import { transferFormSchema } from "@/lib/form-schemas";
import { updateMember } from "@/lib/vatsim/member";
import { z } from "zod";

export const updateSubdivision = async (
  memberId: number,
  input: z.infer<typeof transferFormSchema>
) => {
  await updateMember(memberId, {
    comment: input.comment,
    subdivision_id: input.subdivision,
  });
};
