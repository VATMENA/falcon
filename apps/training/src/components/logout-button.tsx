"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "ui/components/ui/dropdown-menu";

export const LogoutButton: React.FC<{}> = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      className={"font-bold"}
      onClick={() => router.push("/api/logout")}
    >
      Log Out
    </DropdownMenuItem>
  );
};
