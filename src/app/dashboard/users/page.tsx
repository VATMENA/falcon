import { prisma } from "@/lib/db/prisma";
import { usersColumns } from "./columns";
import { UsersTable } from "./data-table";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <UsersTable columns={usersColumns} data={users} />
    </div>
  );
}
