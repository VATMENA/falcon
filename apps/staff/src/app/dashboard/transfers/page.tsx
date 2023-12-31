import { transferMember } from "@/app/dashboard/transfers/action";
import { ApproveButton, DenyButton } from "@/app/dashboard/transfers/buttons";
import { TransfersForm } from "@/app/dashboard/transfers/transfers-form";
import { checkPermissions } from "auth/utils/check-permission";
import { getUserSession } from "@/utils/session";
import { TransferRequest, prisma } from "db";
import { revalidatePath } from "next/cache";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";

export default async function TransfersPage() {
  const session = await getUserSession();

  const requests = await prisma.transferRequest.findMany();

  const approve = async (request: TransferRequest) => {
    "use server";
    await transferMember(request);
  };

  const deny = async (request: TransferRequest) => {
    "use server";
    await prisma.log.create({
      data: {
        type: "TRANSFER",
        cid: request.cid.toString(),
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Denied transfer request for ${request.cid} to ${
          request.subdivision
        }`,
      },
    });
    await prisma.transferRequest.delete({
      where: {
        id: request.id,
      },
    });
    revalidatePath("/dashboard/transfers");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="sm:text-5xl text-3xl font-bold">Transfers</div>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Transfer Request Form</CardTitle>
            <CardDescription>Make a transfer request</CardDescription>
          </CardHeader>
          <CardContent>
            <TransfersForm />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="text-xl font-bold">Transfer Requests</div>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="flex gap-x-2">
              <div>
                {request.cid}: Transfer to {request.subdivision} with comment
                &quot;{request.comment}&quot;
              </div>
              {checkPermissions(
                "division",
                "Membership",
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
          <div>No Transfer Requests.</div>
        )}
      </div>
    </div>
  );
}
