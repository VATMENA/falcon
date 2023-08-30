"use client";

import { deleteSolo } from "@/app/dashboard/solos/action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Solo } from "db";
import { useTransition } from "react";

export const solosColumns: ColumnDef<Solo>[] = [
  {
    accessorKey: "cid",
    header: "CID",
  },
  {
    accessorKey: "full_name",
    header: "Student Name",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "expiry",
    header: "Expiry (local time)",
    cell: ({ row }) => {
      const formatted = new Date(row.original.expiry).toDateString();
      const daysLeft = Math.round(
        Math.abs(new Date(row.original.expiry).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      );
      return (
        <div
          className={cn(
            "font-medium",
            daysLeft < 3
              ? "text-yellow-400"
              : daysLeft < 0
              ? "text-red-500"
              : ""
          )}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    id: "delete",
    cell: ({ cell, row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return !isLoading ? (
        <Button
          variant={"ghost"}
          className="h-8 w-8 p-0"
          onClick={() => startTransition(() => deleteSolo(row.original.cid))}
        >
          <Cross1Icon className="h-4 w-4 text-white" />
        </Button>
      ) : (
        <Button variant={"ghost"} disabled className="h-8 w-8 p-0">
          <ReloadIcon className="h-4 w-4 text-white animate-spin" />
        </Button>
      );
    },
  },
];
