"use client";

import {
  CalendarIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { checkPermissions } from "auth/utils/check-permission";
import { DivisionRole, SubdivisionRole } from "db";
import { User } from "lucia";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import { Button } from "ui/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "ui/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  segment: string | null;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  divisionRole?: DivisionRole;
  subdivisionRole?: SubdivisionRole;
}

const homeNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    segment: null,
    icon: HomeIcon,
  },
];

const trainingNavItems: NavItem[] = [
  {
    title: "Training Request",
    href: "/dashboard/training/request",
    segment: "request",
    icon: CalendarIcon,
  },
];

const NavItemLink: React.FC<{
  navItem: NavItem;
  segment: string | null;
}> = ({ navItem, segment }) => {
  return (
    <Button
      asChild
      variant={segment === navItem.segment ? "secondary" : "ghost"}
      className="text-lg"
    >
      <Link href={navItem.href}>
        <span className="pr-2">
          <navItem.icon />
        </span>
        {navItem.title}
      </Link>
    </Button>
  );
};

export const MobileNav: React.FC<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const segment = useSelectedLayoutSegment();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="md:hidden">
          <HamburgerMenuIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[300px]">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1 pt-4">
            {homeNavItems.map((navItem, idx) => {
              if (
                navItem.divisionRole &&
                !checkPermissions(
                  "division",
                  navItem.divisionRole,
                  user.divisionRole,
                )
              )
                return null;

              if (
                navItem.subdivisionRole &&
                !checkPermissions(
                  "subdivision",
                  navItem.subdivisionRole,
                  user.subdivisionRole,
                )
              )
                return null;

              return (
                <NavItemLink key={idx} navItem={navItem} segment={segment} />
              );
            })}
          </div>
          <div className="flex flex-col gap-y-1 pt-4">
            {trainingNavItems.map((navItem, idx) => {
              if (
                navItem.divisionRole &&
                !checkPermissions(
                  "division",
                  navItem.divisionRole,
                  user.divisionRole,
                )
              )
                return null;

              if (
                navItem.subdivisionRole &&
                !checkPermissions(
                  "subdivision",
                  navItem.subdivisionRole,
                  user.subdivisionRole,
                )
              )
                return null;

              return (
                <NavItemLink key={idx} navItem={navItem} segment={segment} />
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const Sidebar: React.FC<{ user: User }> = ({ user }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="hidden md:flex flex-col h-full min-w-[300px] border-r p-8 gap-y-4">
      <div className="flex flex-col gap-y-1">
        {homeNavItems.map((navItem, idx) => {
          if (
            navItem.divisionRole &&
            !checkPermissions(
              "division",
              navItem.divisionRole,
              user.divisionRole,
            )
          )
            return null;

          if (
            navItem.subdivisionRole &&
            !checkPermissions(
              "subdivision",
              navItem.subdivisionRole,
              user.subdivisionRole,
            )
          )
            return null;

          return <NavItemLink key={idx} navItem={navItem} segment={segment} />;
        })}
      </div>
      <div className="flex flex-col gap-y-1 pt-4">
        {trainingNavItems.map((navItem, idx) => {
          if (
            navItem.divisionRole &&
            !checkPermissions(
              "division",
              navItem.divisionRole,
              user.divisionRole,
            )
          )
            return null;

          if (
            navItem.subdivisionRole &&
            !checkPermissions(
              "subdivision",
              navItem.subdivisionRole,
              user.subdivisionRole,
            )
          )
            return null;

          return <NavItemLink key={idx} navItem={navItem} segment={segment} />;
        })}
      </div>
    </div>
  );
};
