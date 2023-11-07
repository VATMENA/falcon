import { Navbar } from "@/components/nav-bar";
import { Sidebar } from "@/components/side-bar";
import { getUserSession } from "@/utils/session";
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
    <Suspense fallback={<p>loading</p>}>
      <div className="flex h-full w-full flex-col">
        <Navbar user={session.user} />
        <div className="flex h-full grow">
          <Sidebar user={session.user} />
          <div className="flex w-full h-full flex-col p-8 lg:px-20">
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
