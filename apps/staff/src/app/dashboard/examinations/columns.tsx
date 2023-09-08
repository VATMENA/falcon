"use client";

import {
  approveExam,
  deleteExam,
  rejectExam,
} from "@/app/dashboard/examinations/action";
import { CheckIcon, Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Examination } from "db";
import { useTransition } from "react";
import { Button } from "ui/components/ui/button";

export const examsColumns: ColumnDef<Examination>[] = [
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
    accessorKey: "exam_date",
    header: "Exam Date and Time",
    cell: ({ row }) => {
      const formatted = new Date(row.original.exam_date).toUTCString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();
      if (row.original.approved == null) {
        return !isLoading ? (
          <div className="flex gap-x-1">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                startTransition(() => approveExam(row.original.cid))
              }
            >
              <CheckIcon className="h-4 w-4 text-green-500" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                startTransition(() => rejectExam(row.original.cid))
              }
            >
              <Cross1Icon className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <Button variant={"ghost"} disabled className="h-8 w-8 p-0">
            <ReloadIcon className="h-4 w-4 text-white animate-spin" />
          </Button>
        );
      }

      if (row.original.approved) {
        return <CheckIcon className="text-green-500 h-6 w-6" />;
      } else {
        return <Cross1Icon className="text-red-500 h-6 w-6" />;
      }
    },
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
          onClick={() => startTransition(() => deleteExam(row.original.cid))}
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
