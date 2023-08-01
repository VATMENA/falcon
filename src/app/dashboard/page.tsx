import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/utils/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getUserSession();
  if (!session) redirect("/");

  const users = await prisma.user.findMany();

  return (
    <>
      <div>Authenticated: {session.user.fullName}</div>
      <div>Rating: {session.user.rating}</div>
      <div>Access: {session.user.access ? "yes" : "no"}</div>
      <div className="pt-4">
        {users.map((user) => (
          <div key={user.id}>
            Name: {user.full_name}, Access: {user.access ? "yes" : "no"}
          </div>
        ))}
      </div>
      <div>
        <Button asChild>
          <Link href={"/api/logout"}>Sign Out</Link>
        </Button>
      </div>
    </>
  );
}
