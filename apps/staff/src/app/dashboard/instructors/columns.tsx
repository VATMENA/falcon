"use client";

import { deleteInstructor } from "@/app/dashboard/instructors/action";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Instructor } from "db";
import { useTransition } from "react";
import { Button } from "ui/components/button";

export const instructorsColumns: ColumnDef<Instructor>[] = [
  {
    accessorKey: "cid",
    header: "CID",
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
    cell: ({ row }) => {
      const instructor = row.original;
      return (
        <div className="font-medium">
          {new Date(instructor.created_at).toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "subdivision",
    header: "Subdivision",
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
          onClick={() =>
            startTransition(() => deleteInstructor(row.original.cid))
          }
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
