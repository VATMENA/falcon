import { prisma } from "@/lib/db/prisma";
import { TransferRequest } from "@prisma/client";
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

  const transferRequests = await prisma.transferRequest.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return new Response(JSON.stringify(transferRequests), {
    status: 200,
  });
};

export const POST = async (request: NextRequest) => {
  const apiKey = request.headers.get("X-API-Key");
  if (!apiKey) return new Response("Not authorized", { status: 401 });

  const apiKeyExists = await prisma.apiKey.findUnique({
    where: {
      key: apiKey,
    },
  });
  if (!apiKeyExists) return new Response("Not authorized", { status: 401 });

  const body = await request.json();
  if (!body) return new Response("No body", { status: 400 });

  try {
    const transferRequest = await prisma.transferRequest.create({
      data: body as TransferRequest,
    });

    revalidatePath("/dashboard/transfer");

    return new Response(JSON.stringify(transferRequest), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Malformed body" }), {
      status: 400,
    });
  }
};
