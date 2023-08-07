import TransfersForm from "@/app/dashboard/transfers/transfers-form";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function TransfersPage() {
  const session = await getUserSession();
  if (!session?.user.transfer) return redirect("/dashboard");

  return (
    <div className="flex flex-col gap-y-4">
      <TransfersForm />
    </div>
  );
}
