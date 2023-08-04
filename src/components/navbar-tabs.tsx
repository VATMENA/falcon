"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export const NavBarTabs = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <Button
        asChild
        variant={segment === "users" ? "secondary" : "ghost"}
        className="text-lg"
      >
        <Link href={"/dashboard/users"}>Users</Link>
      </Button>
      <Button
        asChild
        variant={segment === "upgrade" ? "secondary" : "ghost"}
        className="text-lg"
      >
        <Link href={"/dashboard/upgrade"}>Upgrade</Link>
      </Button>
    </>
  );
};