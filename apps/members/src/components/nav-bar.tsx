import { LogoutButton } from "@/components/logout-button";
import { NavBarTabs } from "@/components/navbar-tabs";
import { StaffButton } from "@/components/staff-button";
import { getUserSession } from "@/utils/session";
import Image from "next/image";
import Link from "next/link";

export const NavBar = async () => {
  const session = await getUserSession();

  return (
    <div className="flex w-full items-center justify-between p-4 px-8">
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col items-center pr-2">
          <Link
            href="/dashboard"
            className="flex items-baseline relative h-12 w-12"
          >
            <Image
              src={"/images/MainWhiteCropped.png"}
              alt="VATMENA Logo"
              fill
            />
          </Link>
          <div className="text-white font-bold text-xs select-none">
            Members
          </div>
        </div>
        <NavBarTabs user={session!.user} />
      </div>
      <div className="flex items-center gap-x-4 px-2">
        <div className="text-md">{session!.user.fullName}</div>
        <LogoutButton />
        {session!.user.access && <StaffButton />}
      </div>
    </div>
  );
};
