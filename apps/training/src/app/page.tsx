import Image from "next/image";
import Link from "next/link";
import { getUserSession } from "@/utils/session";
import { redirect } from "next/navigation";
import { Button } from "ui/components/ui/button";

export default async function Home() {
  const session = await getUserSession();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col rounded-md items-center justify-center gap-y-4">
        <div className="flex items-baseline relative h-72 w-72">
          <Image src={"/images/MainWhiteCropped.png"} alt="VATMENA Logo" fill />
        </div>
        <div className="text-white font-bold text-3xl sm:text-5xl">
          VATMENA Training
        </div>
        <Button asChild>
          <Link href={"/api/login/vatsim"}>Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
