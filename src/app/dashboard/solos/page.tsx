import { addSolo } from "@/app/dashboard/solos/action";
import { SoloForm } from "@/app/dashboard/solos/add-solo-form";
import { ApproveButton, DenyButton } from "@/app/dashboard/solos/buttons";
import { solosColumns } from "@/app/dashboard/solos/columns";
import { SolosTable } from "@/app/dashboard/solos/data-table";
import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/utils/session";
import { SoloRequest } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";

export default async function SolosPage() {
  const session = await getUserSession();

  const requests = await prisma.soloRequest.findMany();

  const approve = async (request: SoloRequest) => {
    "use server";
    await addSolo(request);
  };

  const deny = async (request: SoloRequest) => {
    "use server";
    await prisma.log.create({
      data: {
        type: "SOLO",
        cid: request.cid.toString(),
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Denied solo request for ${request.full_name}(${request.cid}) for ${
          request.position
        }`,
      },
    });
    await prisma.soloRequest.delete({
      where: {
        id: request.id,
      },
    });
    revalidatePath("/dashboard/solos");
  };

  ("use server");
  const solos = await unstable_cache(
    async () =>
      await prisma.solo.findMany({
        orderBy: {
          expiry: "asc",
        },
      }),
    ["cache-key"],
    {
      tags: ["solo"],
    }
  )();

  return (
    <div className="flex flex-col gap-y-4">
      <SolosTable
        columns={solosColumns}
        data={solos}
        solo={session!.user.solo}
      />
      <div className="flex flex-col gap-y-2">
        <div className="text-xl font-bold">Solo Requests</div>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="flex gap-x-2">
              <div>
                {request.instructor}: Requested solo validation for{" "}
                {request.full_name}({request.cid}) for {request.position} which
                expires on {request.expiry.toDateString()}
              </div>
              {session!.user.solo && (
                <>
                  <ApproveButton request={request} approve={approve} />
                  <DenyButton request={request} deny={deny} />
                </>
              )}
            </div>
          ))
        ) : (
          <div>No Solo Requests.</div>
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Add Solo Validation</h1>
        <SoloForm />
      </div>
    </div>
  );
}
