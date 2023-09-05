"use client";

import { NavBarTabs } from "@/components/navbar-tabs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { User } from "lucia";
import { useState } from "react";
import { Button } from "ui/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "ui/components/ui/sheet";

export const MobileNav = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className=" min-[1100px]:hidden">
          <HamburgerMenuIcon className="h-5 w-5 text-zinc-300" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[200px]">
        <div
          className="flex flex-col gap-y-4 pt-4"
          onClick={() => setOpen(false)}
        >
          <NavBarTabs user={user} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
