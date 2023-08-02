import { NavBar } from "@/components/nav-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <NavBar />
      <div className="flex w-full h-full flex-col px-8">{children}</div>
    </div>
  );
}
