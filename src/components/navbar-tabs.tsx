"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucia";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export const NavBarTabs = ({ user }: { user: User }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {user.user && (
        <Button
          asChild
          variant={segment === "users" ? "secondary" : "ghost"}
          className="text-lg"
        >
          <Link href={"/dashboard/users"}>Users</Link>
        </Button>
      )}
      {user.upgrade && (
        <Button
          asChild
          variant={segment === "upgrade" ? "secondary" : "ghost"}
          className="text-lg"
        >
          <Link href={"/dashboard/upgrade"}>Upgrade</Link>
        </Button>
      )}
      {user.transfer && (
        <Button
          asChild
          variant={segment === "transfers" ? "secondary" : "ghost"}
          className="text-lg"
        >
          <Link href={"/dashboard/transfers"}>Transfers</Link>
        </Button>
      )}
      {user.solo && (
        <Button
          asChild
          variant={segment === "solos" ? "secondary" : "ghost"}
          className="text-lg"
        >
          <Link href={"/dashboard/solos"}>Solos</Link>
        </Button>
      )}
      {user.log && (
        <Button
          asChild
          variant={segment === "logs" ? "secondary" : "ghost"}
          className="text-lg"
        >
          <Link href={"/dashboard/logs"}>Logs</Link>
        </Button>
      )}
      <Button
        asChild
        variant={segment === "api" ? "secondary" : "ghost"}
        className="text-lg"
      >
        <Link href={"/dashboard/api"}>API</Link>
      </Button>
    </>
  );
};
