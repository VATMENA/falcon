import { Button } from "@/components/ui/button";
import { getUserSession } from "@/utils/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getUserSession();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex h-20 w-60 bg-zinc-500 rounded-md items-center justify-center">
        <Button asChild>
          <Link href={"/api/login/vatsim"}>Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
