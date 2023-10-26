import { getUserSession } from "@/utils/session";
import { prisma } from "db";
import { redirect } from "next/navigation";
import { UsersTable } from "./data-table";
import { usersColumns } from "./columns";

export default async function UsersPage() {
    const session = await getUserSession();
    if (session!.user.divisionRole !== "Admin") return redirect("/dashboard");

    const users = await prisma.user.findMany();

    return (
        <div>
            <UsersTable columns={usersColumns} data={users} />
        </div>
    );
}
