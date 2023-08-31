"use client";

import { useRouter } from "next/navigation";
import { Button } from "ui/components/button";

export const LogoutButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.push("/api/logout")}>Sign Out</Button>;
};
