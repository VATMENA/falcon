"use client";

import {
    updateAccess,
    updateDivisionRole,
    updateSubdivisionRole,
} from "@/app/dashboard/users/action";
import { ColumnDef } from "@tanstack/react-table";
import { DivisionRole, SubdivisionRole, User } from "db";
import { useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "ui/components/ui/select";
import { Switch } from "ui/components/ui/switch";
import { ReloadIcon } from "@radix-ui/react-icons";

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
        accessorKey: "division_role",
        header: "Division Staff Role",
        cell: ({ row }) => {
            const user = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isLoading, startTransition] = useTransition();

            return (
                //add div container with label on the top
                <Select
                    defaultValue={user.division_role}
                    onValueChange={(value: DivisionRole) =>
                        startTransition(() => updateDivisionRole(user.id, value))
                    }
                    disabled={isLoading}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role..." />
                        {isLoading && (
                            <div className="flex w-8 h-8 items-center">
                                <ReloadIcon className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(DivisionRole).map((role) => (
                            <SelectItem key={role} value={role}>
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        },
    },
    {
        accessorKey: "subdivision_role",
        header: "vACC Staff Role",
        cell: ({ row }) => {
            const user = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isLoading, startTransition] = useTransition();

            return (
                //add div container with label on the top
                <Select
                    defaultValue={user.subdivision_role}
                    onValueChange={(value: SubdivisionRole) =>
                        startTransition(() => updateSubdivisionRole(user.id, value))
                    }
                    disabled={isLoading}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role..." />
                        {isLoading && (
                            <div className="flex w-8 h-8 items-center">
                                <ReloadIcon className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(SubdivisionRole).map((role) => (
                            <SelectItem key={role} value={role}>
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        },
    },
];
