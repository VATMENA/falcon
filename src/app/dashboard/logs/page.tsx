import {
  getSoloLogs,
  getTransferLogs,
  getUpgradeLogs,
} from "@/app/dashboard/logs/actions";
import { LogForm } from "@/components/get-log-form";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function LogsPage() {
  const session = await getUserSession();
  if (!session?.user.log) return redirect("/dashboard");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Transfers Log</h1>
        <LogForm getLogs={getTransferLogs} />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Solo Log</h1>
        <LogForm getLogs={getSoloLogs} />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Upgrade Log</h1>
        <LogForm getLogs={getUpgradeLogs} />
      </div>
    </div>
  );
}
