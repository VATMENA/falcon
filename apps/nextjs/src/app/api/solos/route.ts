import { Solo, prisma } from "db";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const solos = await prisma.solo.findMany();
  return new Response(JSON.stringify(solos), {
    status: 200,
  });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  if (!body) return new Response("No body", { status: 400 });

  const apiKey = request.headers.get("X-API-Key");
  if (!apiKey) return new Response("Not authorized", { status: 401 });

  const apiKeyExists = await prisma.apiKey.findUnique({
    where: {
      key: apiKey,
    },
  });
  if (!apiKeyExists) return new Response("Not authorized", { status: 401 });

  try {
    const solo = await prisma.solo.create({
      data: body as Solo,
    });

    revalidateTag("solo");

    return new Response(JSON.stringify(solo), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Malformed body" }), {
      status: 400,
    });
  }
};
