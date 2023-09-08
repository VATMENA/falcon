import { NavBar } from "@/components/nav-bar";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) redirect("/");

  if (!session.user.access) redirect("/unauthorized");
  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <NavBar />
      <div className="flex w-full h-full flex-col px-8 pb-4">{children}</div>
    </div>
  );
}
