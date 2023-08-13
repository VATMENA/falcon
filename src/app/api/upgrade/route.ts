import { prisma } from "@/lib/db/prisma";
import { UpgradeRequest } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const apiKey = request.headers.get("X-API-Key");
  if (!apiKey) return new Response("Not authorized", { status: 401 });

  const apiKeyExists = await prisma.apiKey.findUnique({
    where: {
      key: apiKey,
    },
  });
  if (!apiKeyExists) return new Response("Not authorized", { status: 401 });

  const upgradeRequests = await prisma.upgradeRequest.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return new Response(JSON.stringify(upgradeRequests), {
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
    const upgradeRequest = await prisma.upgradeRequest.create({
      data: body as UpgradeRequest,
    });

    revalidatePath("/dashboard/upgrade");

    return new Response(JSON.stringify(upgradeRequest), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Malformed body" }), {
      status: 400,
    });
  }
};
