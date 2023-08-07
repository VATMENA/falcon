"use client";

import { Solo } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const publicSolosColumns: ColumnDef<Solo>[] = [
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
];
