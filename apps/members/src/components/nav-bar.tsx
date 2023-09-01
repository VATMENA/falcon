import { LogoutButton } from "@/components/logout-button";
import { NavBarTabs } from "@/components/navbar-tabs";
import { getUserSession } from "@/utils/session";
import Image from "next/image";
import Link from "next/link";

export const NavBar = async () => {
  const session = await getUserSession();

  return (
    <div className="flex w-full items-center justify-between p-2">
      <div className="flex items-center gap-x-2">
        <Link
          href="/dashboard"
          className="flex items-baseline relative h-20 w-20"
        >
          <Image src={"/images/MainWhite.png"} alt="VATMENA Logo" fill />
        </Link>
        <NavBarTabs user={session!.user} />
      </div>
      <div className="flex items-center gap-x-4 px-2">
        <div className="text-md">{session!.user.fullName}</div>
        <LogoutButton />
      </div>
    </div>
  );
};
