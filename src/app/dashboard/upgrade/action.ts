"use server";

import { ratingFormSchema } from "@/lib/form-schemas";
import { updateMember } from "@/lib/vatsim/member";
import { z } from "zod";

// export const updateRating = zact(ratingFormSchema)(async (input) => {
//   return await updateMember(parseInt(input.cid), {
//     comment: input.comment,
//     rating: input.rating,
//   });
// });

export const updateRating = async (
  memberId: number,
  input: z.infer<typeof ratingFormSchema>
) => {
  await updateMember(memberId, {
    ...input,
  });
};
