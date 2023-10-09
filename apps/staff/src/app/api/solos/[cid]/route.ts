import { prisma } from "db";

export const GET = async (
  request: Request,
  {
    params,
  }: {
    params: { cid: string };
  },
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

type RequestBody = {
  approved: boolean;
};

export const POST = async (
  request: Request,
  {
    params,
  }: {
    params: { cid: string };
  },
) => {
  const apiKey = request.headers.get("X-API-Key");
  if (!apiKey) return new Response("Not authorized", { status: 401 });

  const apiKeyExists = await prisma.apiKey.findUnique({
    where: {
      key: apiKey,
    },
  });
  if (!apiKeyExists) return new Response("Not authorized", { status: 401 });

  const cid = params.cid;
  const soloRequest = await prisma.soloRequest.findFirst({
    where: {
      cid,
    },
  });

  if (!soloRequest) {
    return new Response(
      JSON.stringify({ error: "Solo request does not exist." }),
      {
        status: 404,
      },
    );
  }

  const body = (await request.json()) as RequestBody;
  if (!body) return new Response("No body", { status: 400 });

  try {
    if (body.approved) {
      const solo = await prisma.solo.create({
        data: soloRequest,
      });
      await prisma.soloRequest.delete({
        where: {
          id: soloRequest.id,
        },
      });
      await prisma.log.create({
        data: {
          type: "SOLO",
          message: `Solo request for ${solo.cid} approved`,
          cid: solo.cid,
        },
      });
      return new Response(JSON.stringify(solo), {
        status: 200,
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: "Malformed body" }), {
      status: 400,
    });
  }
};
