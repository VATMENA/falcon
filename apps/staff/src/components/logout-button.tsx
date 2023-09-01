"use client";

import { useRouter } from "next/navigation";
import { Button } from "ui/components/ui/button";

export const LogoutButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.push("/api/logout")}>Sign Out</Button>;
};
