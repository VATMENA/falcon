import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/utils/session";
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
    </>
  );
}
