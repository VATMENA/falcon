"use client";

import { User } from "lucia";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "ui/components/ui/button";

export const NavBarTabs = ({ user }: { user: User }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <Button
        asChild
        variant={segment === "Subdivision" ? "secondary" : "ghost"}
        className="text-lg"
      >
        <Link href={"/dashboard/subdivision"}>Subdivision</Link>
      </Button>
    </>
  );
};
