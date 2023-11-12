import { z } from "zod";

export const trainingRequestSchema = z.object({
	rating: z.coerce.number().min(-1).max(12),
	start: z.date(),
	end: z.date(),
	startTime: z.number(),
	endTime: z.number(),
});
