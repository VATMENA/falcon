"use client";

import { updateAccess } from "@/app/dashboard/users/access-action";
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
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "access",
    header: "HQ Access",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isLoading, startTransition] = useTransition();

      return (
        <Switch
          onCheckedChange={(access) =>
            startTransition(() => updateAccess(access, user.id))
          }
          defaultChecked={user.access}
        />
      );
    },
  },
];
