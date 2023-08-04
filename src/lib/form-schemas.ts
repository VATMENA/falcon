import { z } from "zod";

export const idFormSchema = z.object({
  cid: z.string().length(7, {
    message: "CID must be 7 characters long.",
  }),
});

export const ratingFormSchema = z.object({
  rating: z.coerce.number().min(-1).max(12),
  comment: z.string(),
});
