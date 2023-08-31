"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Instructor } from "db";

export const publicInstructorsColumns: ColumnDef<Instructor>[] = [
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
];
