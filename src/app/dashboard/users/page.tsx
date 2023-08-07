import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";
import { usersColumns } from "./columns";
import { UsersTable } from "./data-table";

export default async function UsersPage() {
  const session = await getUserSession();
  if (!session?.user.user) return redirect("/dashboard");

  const users = await prisma.user.findMany();

  return (
    <div>
      <UsersTable columns={usersColumns} data={users} />
    </div>
  );
}
