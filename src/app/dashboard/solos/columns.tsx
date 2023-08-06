"use client";

import { deleteSolo } from "@/app/dashboard/solos/action";
import { Button } from "@/components/ui/button";
import { Solo } from "@prisma/client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";

export const columns: ColumnDef<Solo>[] = [
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
    header: "Expiry",
    cell: ({ row }) => {
      const formatted = new Date(row.original.expiry).toDateString();
      return <div className="font-medium">{formatted}</div>;
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

      return (
        <Button
          variant={"ghost"}
          className="h-8 w-8 p-0"
          onClick={() => startTransition(() => deleteSolo(row.original.cid))}
        >
          <Cross1Icon className="h-4 w-4 text-white" />
        </Button>
      );
    },
  },
];
