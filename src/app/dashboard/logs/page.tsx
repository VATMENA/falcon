import {
  getHQLogs,
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
        <h1 className="text-3xl font-bold">Transfers Logs</h1>
        <LogForm getLogs={getTransferLogs} />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Solo Logs</h1>
        <LogForm getLogs={getSoloLogs} />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Upgrade Logs</h1>
        <LogForm getLogs={getUpgradeLogs} />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">HQ Logs</h1>
        <LogForm getLogs={getHQLogs} />
      </div>
    </div>
  );
}
