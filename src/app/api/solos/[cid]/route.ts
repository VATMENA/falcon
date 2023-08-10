import { prisma } from "@/lib/db/prisma";

export const GET = async (
  request: Request,
  {
    params,
  }: {
    params: { cid: string };
  }
) => {
  const cid = params.cid;
  const solo = await prisma.solo.findUnique({
    where: {
      cid,
    },
  });

  if (!solo) {
    return new Response(JSON.stringify({ error: "Solo does not exist." }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(solo), {
    status: 200,
  });
};
