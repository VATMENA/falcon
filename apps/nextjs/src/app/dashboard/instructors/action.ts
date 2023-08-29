"use server";

import { instructorFormSchema } from "@/lib/form-schemas";
import { getUserSession } from "@/utils/session";
import { InstructorType, prisma } from "db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addInstructor = async (
  input: z.infer<typeof instructorFormSchema>
) => {
  const session = await getUserSession();

  try {
    await prisma.instructor.create({
      data: {
        type: input.type as InstructorType,
        cid: input.cid,
        full_name: input.full_name,
        subdivision: input.subdivision,
      },
    });
  } catch (error) {
    console.error(error);
  }

  await prisma.log.create({
    data: {
      type: "INSTRUCTOR",
      message: `${session!.user.fullName} (${session!.user.cid}): Added ${
        input.full_name
      }(${input.cid}) as a ${input.type.toLowerCase()} instructor`,
      cid: input.cid,
    },
  });
  revalidatePath("/dashboard/instructors");
};

export const deleteInstructor = async (cid: string) => {
  const session = await getUserSession();

  await prisma.instructor.delete({
    where: {
      cid,
    },
  });

  await prisma.log.create({
    data: {
      type: "INSTRUCTOR",
      message: `${session!.user.fullName} (${
        session!.user.cid
      }): Deleted ${cid} as an instructor`,
      cid,
    },
  });
  revalidatePath("/dashboard/instructors");
};
