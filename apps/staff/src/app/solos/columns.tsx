"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Solo } from "db";
import { cn } from "ui/lib/utils";

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
            const formatted = new Date(row.original.expiry).toUTCString();
            const daysLeft = Math.round(
                Math.abs(new Date(row.original.expiry).getTime() - Date.now()) /
                (1000 * 60 * 60 * 24),
            );
            return (
                <div
                    className={cn(
                        "font-medium",
                        daysLeft < 3
                            ? "text-yellow-400"
                            : daysLeft < 0
                                ? "text-red-500"
                                : "",
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
];
