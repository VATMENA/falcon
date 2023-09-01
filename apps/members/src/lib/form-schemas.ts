import { Subdivision } from "@/types/subdivisions";
import { z } from "zod";

export const transferFormSchema = z.object({
  subdivision: z.enum([
    Object.keys(Subdivision)[0],
    ...Object.keys(Subdivision),
  ]),
});
