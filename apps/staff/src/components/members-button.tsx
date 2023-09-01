"use client";

import { useRouter } from "next/navigation";
import { Button } from "ui/components/ui/button";

export const MembersButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(
          process.env.NODE_ENV === "production"
            ? "https://members.vatsim.me"
            : "http://localhost:3001"
        )
      }
      variant={"secondary"}
    >
      Members HQ
    </Button>
  );
};
