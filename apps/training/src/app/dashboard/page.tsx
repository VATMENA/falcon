import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";
import { Button } from "ui/components/ui/button";

export default async function DashboardPage() {
	const session = await getUserSession();
	if (!session) redirect("/");

	return <Button>Test</Button>;
}
