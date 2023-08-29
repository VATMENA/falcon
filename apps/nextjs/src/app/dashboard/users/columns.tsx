"use client";

import {
  updateAccess,
  updateLog,
  updateSolo,
  updateTransfer,
  updateUpgrade,
  updateUserAccess,
} from "@/app/dashboard/users/action";
import { Switch } from "@/components/ui/switch";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "cid",
    header: "CID",
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "subdivision",
    header: "Subdivision",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "access",
    header: "HQ",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        //add div container with label on the top
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateAccess(access, user.id))
          }
          defaultChecked={user.access}
        />
      );
    },
  },
  {
    accessorKey: "log",
    header: "Log",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        //add div container with label on the top
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateLog(access, user.id))
          }
          defaultChecked={user.log}
        />
      );
    },
  },
  {
    accessorKey: "solo",
    header: "Solo",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        //add div container with label on the top
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateSolo(access, user.id))
          }
          defaultChecked={user.solo}
        />
      );
    },
  },
  {
    accessorKey: "transfer",
    header: "Transfer",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        //add div container with label on the top
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateTransfer(access, user.id))
          }
          defaultChecked={user.transfer}
        />
      );
    },
  },
  {
    accessorKey: "upgrade",
    header: "Upgrade",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        //add div container with label on the top
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateUpgrade(access, user.id))
          }
          defaultChecked={user.upgrade}
        />
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        //add div container with label on the top
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateUserAccess(access, user.id))
          }
          defaultChecked={user.user}
        />
      );
    },
  },
];
