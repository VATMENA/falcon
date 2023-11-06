import { Sidebar } from "@/components/side-bar";
import { getUserSession } from "@/utils/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getUserSession();
	if (!session) return redirect("/");

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex border-b justify-between p-2 px-4">
				<div className="flex flex-col items-center pr-2">
					<Link
						href="/dashboard"
						className="flex items-baseline relative h-12 w-12"
					>
						<Image
							src={"/images/MainWhiteCropped.png"}
							alt="VATMENA Logo"
							fill
						/>
					</Link>
					<div className="text-white font-bold text-xs select-none">
						Training
					</div>
				</div>
			</div>
			<div className="flex h-full grow">
				<Sidebar user={session.user} />
				<div className="flex w-full h-full flex-col p-8">{children}</div>
			</div>
		</div>
	);
}
