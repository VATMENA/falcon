"use client";

import { checkAccess } from "@/utils/checkAccess";
import { User } from "lucia";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "ui/components/ui/button";

export const NavBarTabs = ({ user }: { user: User }) => {
	const segment = useSelectedLayoutSegment();

	return (
		<>
			{checkAccess("Admin", user.divisionRole) && (
				<Button
					asChild
					variant={segment === "users" ? "secondary" : "ghost"}
					className="text-lg"
				>
					<Link href={"/dashboard/users"}>Users</Link>
				</Button>
			)}
			<Button
				asChild
				variant={segment === "upgrade" ? "secondary" : "ghost"}
				className="text-lg"
			>
				<Link href={"/dashboard/upgrade"}>Upgrade</Link>
			</Button>
			<Button
				asChild
				variant={segment === "transfers" ? "secondary" : "ghost"}
				className="text-lg"
			>
				<Link href={"/dashboard/transfers"}>Transfers</Link>
			</Button>
			<Button
				asChild
				variant={segment === "solos" ? "secondary" : "ghost"}
				className="text-lg"
			>
				<Link href={"/dashboard/solos"}>Solos</Link>
			</Button>
			{checkAccess("Admin", user.divisionRole) && (
				<Button
					asChild
					variant={segment === "logs" ? "secondary" : "ghost"}
					className="text-lg"
				>
					<Link href={"/dashboard/logs"}>Logs</Link>
				</Button>
			)}
			<Button
				asChild
				variant={segment === "instructors" ? "secondary" : "ghost"}
				className="text-lg"
			>
				<Link href={"/dashboard/instructors"}>Instructors</Link>
			</Button>
			<Button
				asChild
				variant={segment === "examinations" ? "secondary" : "ghost"}
				className="text-lg"
			>
				<Link href={"/dashboard/examinations"}>CPTs</Link>
			</Button>
			<Button
				asChild
				variant={segment === "api" ? "secondary" : "ghost"}
				className="text-lg"
			>
				<Link href={"/dashboard/api"}>API</Link>
			</Button>
		</>
	);
};
