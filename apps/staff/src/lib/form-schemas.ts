import { Subdivision } from "@/types/subdivisions";
import { InstructorType } from "db";
import { z } from "zod";

export const idFormSchema = z.object({
  cid: z.string().length(7, {
    message: "CID must be 7 characters long.",
  }),
});

export const ratingFormSchema = z.object({
  rating: z.coerce.number().min(-1).max(12),
  scoresheet: z.string().url().optional(),
});

export const transferFormSchema = z.object({
  subdivision: z.enum([
    Object.keys(Subdivision)[0],
    ...Object.keys(Subdivision),
  ]),
});

export const soloFormSchema = z.object({
  cid: z.string().length(7, {
    message: "CID must be 7 characters long.",
  }),
  full_name: z.string(),
  position: z.string().length(8, {
    message: "Please only use the absolute callsign. (For e.g OMDB_TWR)",
  }),
  expiry: z.date(),
  instructor: z.string(),
  count: z.coerce.number(),
});

export const examFormSchema = z.object({
  cid: z.string().length(7, {
    message: "CID must be 7 characters long.",
  }),
  full_name: z.string(),
  position: z.string().length(8, {
    message: "Please only use the absolute callsign. (For e.g OMDB_TWR)",
  }),
  exam_date: z.date(),
  time: z.string().regex(new RegExp(/^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]z$/), {
    message: "Please follow the format HHMMz.",
  }),
  instructor: z.string(),
});

export const instructorFormSchema = z.object({
  cid: z.string().length(7, {
    message: "CID must be 7 characters long.",
  }),
  full_name: z.string(),
  type: z.enum([
    Object.keys(InstructorType)[0],
    ...Object.keys(InstructorType),
  ]),
  subdivision: z.enum([
    Object.keys(Subdivision)[0],
    ...Object.keys(Subdivision),
  ]),
});
