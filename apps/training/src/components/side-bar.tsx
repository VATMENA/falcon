"use client";

import { DivisionRole, SubdivisionRole } from "db";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "ui/components/ui/button";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { User } from "lucia";
import { checkPermissions } from "auth/utils/check-permission";

interface NavItem {
	title: string;
	href: string;
	segment: string | null;
	icon: React.ForwardRefExoticComponent<
		IconProps & React.RefAttributes<SVGSVGElement>
	>;
	divisionRole?: DivisionRole;
	subdivisionRole?: SubdivisionRole;
}

const navItems: NavItem[] = [
	{
		title: "Home",
		href: "/dashboard",
		segment: null,
		icon: HomeIcon,
	},
];

const NavItemLink: React.FC<{
	navItem: NavItem;
	segment: string | null;
}> = ({ navItem, segment }) => {
	return (
		<Button
			asChild
			variant={segment === navItem.segment ? "secondary" : "ghost"}
			className="text-lg"
		>
			<Link href={navItem.href}>
				<span className="pr-2">
					<navItem.icon />
				</span>
				{navItem.title}
			</Link>
		</Button>
	);
};

export const Sidebar: React.FC<{ user: User }> = ({ user }) => {
	const segment = useSelectedLayoutSegment();

	console.log(segment);

	return (
		<div className="flex flex-col h-full min-w-[300px] border-r px-4 pt-4 gap-y-4 border-slate-800">
			<div className="flex flex-col gap-y-1">
				{navItems.map((navItem, idx) => {
					if (
						navItem.divisionRole &&
						!checkPermissions(
							"division",
							navItem.divisionRole,
							user.divisionRole,
						)
					)
						return null;

					if (
						navItem.subdivisionRole &&
						!checkPermissions(
							"subdivision",
							navItem.subdivisionRole,
							user.subdivisionRole,
						)
					)
						return null;

					return <NavItemLink key={idx} navItem={navItem} segment={segment} />;
				})}
			</div>
		</div>
	);
};
