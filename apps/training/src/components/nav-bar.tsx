import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./side-bar";
import { User } from "lucia";

export const Navbar: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex w-full border-b backdrop-blur justify-between p-4 px-8">
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col md:flex-row items-center pr-2">
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
          <div className="text-white font-bold text-xs md:text-3xl select-none md:pl-4">
            Training
          </div>
        </div>
        <MobileNav user={user} />
      </div>
    </div>
  );
};
