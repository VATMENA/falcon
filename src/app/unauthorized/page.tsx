import { getUserSession } from "@/utils/session";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UnauthorizedPage() {
  const session = await getUserSession();
  if (!session) redirect("/");
  if (session.user.access) redirect("/dashboard");

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex items-baseline relative h-72 w-72">
        <Image src={"/images/MainWhite.png"} alt="VATMENA Logo" fill />
      </div>
      <h1 className="text-7xl font-bold pb-2">Access Denied.</h1>
      <h3 className="text-3xl">
        If you believe this is a mistake, contact the VATMENA Staff Team.
      </h3>
    </div>
  );
}
