import { ChevronDownIcon } from "@radix-ui/react-icons";
import { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { Button } from "ui/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "ui/components/ui/dropdown-menu";
import { MobileNav } from "./side-bar";
import { LogoutButton } from "./logout-button";

export const Navbar: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div className="flex w-full border-b backdrop-blur justify-between p-4 px-8">
			<div className="flex items-center gap-x-2">
				<div className="flex flex-col md:flex-row items-center pr-2">
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
					<div className="text-white font-bold text-xs md:text-3xl select-none md:pl-4">
						Training
					</div>
				</div>
				<MobileNav user={user} />
			</div>
			<div className="flex items-center gap-x-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>
							{user.fullName.split(" ")[0]}
							<ChevronDownIcon className="pl-1" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel className="flex flex-col justify-center items-center px-8 py-4">
							<h1 className="font-semibold text-2xl">{user.fullName}</h1>
							<h1 className="font-normal text-lg text-muted-foreground">
								{user.rating} Controller
							</h1>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<LogoutButton />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};
