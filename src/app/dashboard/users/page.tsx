import { prisma } from "@/lib/db/prisma";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
