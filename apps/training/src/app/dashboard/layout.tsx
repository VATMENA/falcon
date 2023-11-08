import { Navbar } from "@/components/nav-bar";
import { Sidebar } from "@/components/side-bar";
import { getUserSession } from "@/utils/session";
import { ReloadIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) return redirect("/");

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full justify-center items-center">
          <ReloadIcon className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <Navbar user={session.user} />
      <div className="flex h-full w-full overflow-y-auto">
        <Sidebar user={session.user} />
        <div className="flex flex-col w-full p-8 overflow-y-auto lg:px-20">
          {children}
        </div>
      </div>
    </Suspense>
  );
}
