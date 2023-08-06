"use server";

import { prisma } from "@/lib/db/prisma";
import { soloFormSchema } from "@/lib/form-schemas";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const addSolo = async (input: z.infer<typeof soloFormSchema>) => {
  await prisma.solo.create({
    data: input,
  });
  revalidateTag("solo");
};

export const deleteSolo = async (cid: string) => {
  await prisma.solo.delete({
    where: {
      cid,
    },
  });
  revalidateTag("solo");
};
