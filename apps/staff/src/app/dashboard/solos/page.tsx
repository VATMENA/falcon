import { addSolo } from "@/app/dashboard/solos/action";
import { SoloForm } from "@/app/dashboard/solos/add-solo-form";
import { ApproveButton, DenyButton } from "@/app/dashboard/solos/buttons";
import { solosColumns } from "@/app/dashboard/solos/columns";
import { SolosTable } from "@/app/dashboard/solos/data-table";
import { checkPermissions } from "auth/utils/check-permission";
import { getUserSession } from "@/utils/session";
import { PlusIcon } from "@radix-ui/react-icons";
import { SoloRequest, prisma } from "db";
import { revalidatePath } from "next/cache";
import { Button } from "ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/ui/dialog";

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

  const solos = await prisma.solo.findMany({
    orderBy: {
      expiry: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <SolosTable
        columns={solosColumns}
        data={solos}
        userDivisionRole={session!.user.divisionRole}
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
              {checkPermissions(
                "division",
                "ATC",
                session!.user.divisionRole,
              ) && (
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
      <div className="flex flex-col gap-y-4">
        <h1 className="text-3xl font-bold">Request Solo Validation</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-8 w-8 pr-2" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Solo Validation...</DialogTitle>
            </DialogHeader>
            <SoloForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
