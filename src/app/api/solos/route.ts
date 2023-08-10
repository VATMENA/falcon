import { prisma } from "@/lib/db/prisma";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const solos = await prisma.solo.findMany();
  return new Response(JSON.stringify(solos), {
    status: 200,
  });
};
