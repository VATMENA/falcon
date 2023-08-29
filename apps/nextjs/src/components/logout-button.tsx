"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.push("/api/logout")}>Sign Out</Button>;
};
