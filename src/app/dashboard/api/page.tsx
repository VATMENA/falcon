import { AddButton, DeleteButton } from "@/app/dashboard/api/buttons";
import { prisma } from "@/lib/db/prisma";
import { generateRandomString } from "@/utils/api-keys";
import { getUserSession } from "@/utils/session";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function ApiPage() {
  const apiKeys = await prisma.apiKey.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const addApiKey = async () => {
    "use server";

    const session = await getUserSession();
    const key = generateRandomString(32);
    await prisma.apiKey.create({
      data: {
        key,
      },
    });

    await prisma.log.create({
      data: {
        type: "HQ",
        cid: session!.user.cid.toString(),
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Generate an API key.`,
      },
    });
    revalidatePath("/dashboard/api");
  };

  const deleteApiKey = async (id: number) => {
    "use server";

    const session = await getUserSession();
    await prisma.apiKey.delete({
      where: {
        id,
      },
    });

    await prisma.log.create({
      data: {
        type: "HQ",
        cid: session!.user.cid.toString(),
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Deleted an API key.`,
      },
    });
    revalidatePath("/dashboard/api");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h1 className="font-bold text-3xl">API Keys</h1>
      </div>
      <div className="flex flex-col gap-y-1">
        <Suspense>
          {apiKeys.map((key) => {
            return (
              <div key={key.id} className="flex gap-x-1">
                <div className="font-bold">{key.id}:</div>
                <div>{key.key}</div>
                <DeleteButton deleteKey={deleteApiKey} apiKeyId={key.id} />
              </div>
            );
          })}
        </Suspense>
      </div>
      <AddButton addKey={addApiKey} />
    </div>
  );
}
