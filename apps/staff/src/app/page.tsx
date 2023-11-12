import { getUserSession } from "@/utils/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "ui/components/ui/button";

export default async function Home() {
	const session = await getUserSession();
	if (session) redirect("/dashboard");

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/bg.png')] bg-cover bg-no-repeat backdrop-blur-sm bg-opacity-60">
			<div className="flex w-full h-full justify-center items-center backdrop-blur-sm bg-black/60">
				<div className="flex flex-col rounded-md items-center justify-center gap-y-4">
					<div className="flex items-baseline relative h-72 w-72">
						<Image
							src={"/images/MainWhiteCropped.png"}
							alt="VATMENA Logo"
							fill
						/>
					</div>
					<div className="text-white font-bold text-3xl sm:text-5xl">
						VATMENA Staff HQ
					</div>
					<Button asChild>
						<Link href={"/api/login/vatsim"}>Sign In</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
