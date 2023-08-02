import { NavBarTabs } from "@/components/navbar-tabs";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/utils/session";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/MainWhite.png";

export const NavBar = async () => {
  const session = await getUserSession();

  return (
    <div className="flex w-full items-center justify-between p-2">
      <div className="flex items-center gap-x-2">
        <Link href="/dashboard">
          <Image
            src={logo}
            alt="VATMENA Logo"
            className="flex flex-row items-baseline relative h-20 w-20"
          />
        </Link>
        <NavBarTabs />
      </div>
      <div className="flex items-center gap-x-4 px-2">
        <div className="text-md">{session!.user.fullName}</div>
        <Button asChild>
          <Link href={"/api/logout"}>Sign Out</Link>
        </Button>
      </div>
    </div>
  );
};
