import { NavBar } from "@/components/nav-bar";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) redirect("/");

  return (
    <div className="flex h-full w-full flex-col">
      <NavBar />
      <div className="flex w-full h-full flex-col px-8 pb-4">
        <Suspense
          fallback={
            <div className="flex h-full w-full justify-center items-center">
              <ReloadIcon className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
