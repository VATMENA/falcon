"use client";

import { useRouter } from "next/navigation";
import { Button } from "ui/components/ui/button";

export const StaffButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(
          process.env.NODE_ENV === "production"
            ? "https://staff.vatsim.me"
            : "http://localhost:3000"
        )
      }
      variant={"secondary"}
    >
      Staff
    </Button>
  );
};
