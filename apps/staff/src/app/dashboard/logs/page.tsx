import {
	getHQLogs,
	getSoloLogs,
	getTransferLogs,
	getUpgradeLogs,
} from "@/app/dashboard/logs/actions";
import { LogForm } from "@/components/get-log-form";
import { checkAccess } from "@/utils/checkAccess";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function LogsPage() {
	const session = await getUserSession();
	if (!checkAccess("Admin", session!.user.divisionRole)) return redirect("/dashboard");

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-col gap-y-2">
				<h1 className="text-3xl font-bold">Transfers Logs</h1>
				<LogForm logs={await getTransferLogs()} />
			</div>
			<div className="flex flex-col gap-y-2">
				<h1 className="text-3xl font-bold">Solo Logs</h1>
				<LogForm logs={await getSoloLogs()} />
			</div>
			<div className="flex flex-col gap-y-2">
				<h1 className="text-3xl font-bold">Upgrade Logs</h1>
				<LogForm logs={await getUpgradeLogs()} />
			</div>
			<div className="flex flex-col gap-y-2">
				<h1 className="text-3xl font-bold">HQ Logs</h1>
				<LogForm logs={await getHQLogs()} />
			</div>
		</div>
	);
}
