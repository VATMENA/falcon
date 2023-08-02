import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function UnauthorizedPage() {
  const session = await getUserSession();
  if (!session) redirect("/");
  if (session.user.access) redirect("/dashboard");

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-y-4">
      <h1 className="text-9xl font-bold">Access Denied.</h1>
      <h3 className="text-5xl">
        If you believe this is a mistake, contact the VATMENA Staff team.
      </h3>
    </div>
  );
}
