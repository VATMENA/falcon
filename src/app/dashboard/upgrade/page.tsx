import UpgradeForm from "@/app/dashboard/upgrade/upgrade-form";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function UpgradePage() {
  const session = await getUserSession();
  if (!session?.user.upgrade) return redirect("/dashboard");

  return (
    <div className="flex flex-col gap-y-4">
      <UpgradeForm />
    </div>
  );
}
