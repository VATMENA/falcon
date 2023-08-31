import { upgradeMember } from "@/app/dashboard/upgrade/action";
import { ApproveButton, DenyButton } from "@/app/dashboard/upgrade/buttons";
import { UpgradeForm } from "@/app/dashboard/upgrade/upgrade-form";
import { parseRating } from "@/utils/parse-rating";
import { getUserSession } from "@/utils/session";
import { UpgradeRequest, prisma } from "db";
import { revalidatePath } from "next/cache";

export default async function UpgradePage() {
  const session = await getUserSession();

  const requests = await prisma.upgradeRequest.findMany();

  const approve = async (request: UpgradeRequest) => {
    "use server";
    await upgradeMember(request);
  };

  const deny = async (request: UpgradeRequest) => {
    "use server";
    await prisma.log.create({
      data: {
        type: "UPGRADE",
        cid: request.cid.toString(),
        message: `${session!.user.fullName} (${
          session!.user.cid
        }): Denied upgrade request for ${request.cid} to ${
          parseRating(request.rating) ?? "Unknown"
        }`,
      },
    });
    await prisma.upgradeRequest.delete({
      where: {
        id: request.id,
      },
    });
    revalidatePath("/dashboard/upgrade");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="text-3xl font-bold">Upgrade</div>
        <UpgradeForm />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="text-xl font-bold">Upgrade Requests</div>
        {requests.length > 0 ? (
          requests.map((request) => {
            return (
              <div key={request.id} className="flex gap-x-2">
                <div>
                  {request.cid}: Upgrade to {parseRating(request.rating)} with
                  comment &quot;{request.comment}&quot;{" "}
                  {request.scoresheet && (
                    <a
                      href={request.scoresheet}
                      target="_blank"
                      rel="noreferrer"
                      className="underline px-2"
                    >
                      Scoresheet
                    </a>
                  )}
                </div>
                {session!.user.upgrade && (
                  <>
                    <ApproveButton request={request} approve={approve} />
                    <DenyButton request={request} deny={deny} />
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div>No Upgrade Requests.</div>
        )}
      </div>
    </div>
  );
}
