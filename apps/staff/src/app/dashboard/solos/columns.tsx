"use client";

import { deleteSolo } from "@/app/dashboard/solos/action";
import { SoloForm } from "@/app/dashboard/solos/add-solo-form";
import { daysLeft } from "@/utils/days-left";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Solo } from "db";
import { useTransition } from "react";
import { Button } from "ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/ui/dialog";
import { cn } from "ui/lib/utils";

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
    header: "Expiry (zulu time)",
    cell: ({ row }) => {
      const daysLeft = Math.round(
        (row.original.expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      return (
        <div
          className={cn(
            "font-medium",
            daysLeft < 3 && daysLeft >= 0
              ? "text-yellow-400"
              : daysLeft < 0
              ? "text-red-500"
              : ""
          )}
        >
          {row.original.expiry.toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "count",
    header: "Solo Days Used",
    cell: ({ row }) => {
      const soloDays = daysLeft({
        expiry: row.original.expiry,
        updated_at: row.original.updated_at,
      });

      return <div className="font-medium">{soloDays + row.original.count}</div>;
    },
  },
  {
    id: "delete",
    cell: ({ cell, row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      const daysLeft = Math.round(
        (new Date(row.original.expiry).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      );

      return !isLoading && daysLeft < 0 ? (
        <div className="flex gap-x-1">
          <Button
            variant={"ghost"}
            className="h-8 w-8 p-0"
            onClick={() => startTransition(() => deleteSolo(row.original.cid))}
          >
            <Cross1Icon className="h-4 w-4 text-white" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Extend</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Extend Solo Validation...</DialogTitle>
              </DialogHeader>
              <SoloForm solo={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      ) : !isLoading ? (
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
