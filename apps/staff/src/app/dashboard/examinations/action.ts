"use server";
import { examFormSchema } from "@/lib/form-schemas";
import { getUserSession } from "@/utils/session";
import { prisma } from "db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addExam = async ({
  time,
  ...input
}: z.infer<typeof examFormSchema>) => {
  const session = await getUserSession();

  input.exam_date.setUTCHours(
    parseInt(time.slice(0, 2)),
    parseInt(time.slice(2, 4))
  );

  try {
    await prisma.examination.create({
      data: {
        approved: null,
        ...input,
        exam_date: input.exam_date,
      },
    });

    await prisma.log.create({
      data: {
        type: "EXAM",
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Created an exam for ${input.full_name} (${input.cid}) on ${
          input.position
        } which is due for ${new Date(input.exam_date).toDateString()}`,
        cid: input.cid,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/examinations");
};

export const deleteExam = async (cid: string) => {
  const session = await getUserSession();

  try {
    await prisma.examination.delete({
      where: {
        cid,
      },
    });

    await prisma.log.create({
      data: {
        type: "EXAM",
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Deleted an exam for ${cid}`,
        cid: session!.user.cid,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/examinations");
};

export const approveExam = async (cid: string) => {
  const session = await getUserSession();

  try {
    await prisma.examination.update({
      where: {
        cid,
      },
      data: {
        approved: true,
      },
    });

    await prisma.log.create({
      data: {
        type: "EXAM",
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Approved an exam for ${cid}`,
        cid: session!.user.cid,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/examinations");
};

export const rejectExam = async (cid: string) => {
  const session = await getUserSession();

  try {
    await prisma.examination.update({
      where: {
        cid,
      },
      data: {
        approved: false,
      },
    });

    await prisma.log.create({
      data: {
        type: "EXAM",
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Rejected an exam for ${cid}`,
        cid: session!.user.cid,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/examinations");
};
