"use client";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="flex w-full items-center justify-between p-6 px-8">
      <div className="flex items-center gap-x-4">
        <h1 className="flex flex-row items-baseline text-5xl font-bold sm:text-4xl">
          <Link
            className="flex flex-row items-baseline"
            href="/dashboard"
          ></Link>
        </h1>
      </div>
    </div>
  );
};
