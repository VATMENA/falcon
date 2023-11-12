"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "ui/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "ui/components/ui/dialog";

export const WarningDialog: React.FC<{}> = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(true);
	}, []);

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Before requesting ATC Training...</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col w-full gap-y-4">
					<div>
						Before requesting ATC Training please ensure you have completed the
						following:
					</div>
					<div className="flex flex-col gap-y-1">
						<div className="font-bold text-lg underline">
							Resident Controllers
						</div>
						<div>
							1) Ensure your Home Region is Europe, Middle East and Africa
							Europe, Middle East and Africa, and your Home vACC is Arabia ARB.
							Region change is completed via{" "}
							<a
								href="https://my.vatsim.net/user/region"
								className="text-blue-300 hover:underline"
							>
								My VATSIM
							</a>
							. Once this has been completed, you can choose your region on the{" "}
							<a
								href="https://members.vatsim.me"
								className="text-blue-300 hover:underline"
							>
								VATMENA Members HQ
							</a>
							.
						</div>
						<div>
							2) Join the Arabian vACC{" "}
							<a
								href="https://www.discord.gg/Fk9Wspw"
								className="text-blue-300 hover:underline"
							>
								Discord
							</a>
						</div>
						<div>
							4) Complete the required exams via the{" "}
							<a
								href="https://academy.vatsim.me"
								className="text-blue-300 hover:underline"
							>
								VATMENA Academy
							</a>{" "}
							- (For new OBS controllers this is the VATMENA S1 exam, and the
							Arabian vACC ICAO English and DEL/GND Exams)
						</div>
						<div>
							3) Raise a Support Ticket on the training HQ requesting ATC
							Training -{" "}
							<Link
								className="text-blue-300 hover:underline"
								href="/dashboard/support"
							>
								Create Ticket
							</Link>
						</div>
					</div>
					<div className="flex flex-col gap-y-1">
						<div className="font-bold text-lg underline">
							Visiting Controllers
						</div>
						<div>
							1) Ensure you meet the requirements to apply as a Visiting
							Controller in the Arabian vACC (You must hold a consolidated S3
							rating from your home vACC)
						</div>
						<div>
							2) Join the Arabian vACC{" "}
							<a
								href="https://www.discord.gg/Fk9Wspw"
								className="text-blue-300 hover:underline"
							>
								Discord
							</a>
						</div>
						<div>
							4) Complete the required exams via the{" "}
							<a
								href="https://academy.vatsim.me"
								className="text-blue-300 hover:underline"
							>
								VATMENA Academy
							</a>{" "}
							- (The Arabian vACC ICAO English and DEL/GND Exams)
						</div>
						<div>
							3) Raise a Support Ticket on the training HQ requesting ATC
							Training -{" "}
							<Link
								className="text-blue-300 hover:underline"
								href="/dashboard/support"
							>
								Create Ticket
							</Link>
						</div>
					</div>
					<div>
						Only once these steps are completed will any training sessions be
						accepted by mentors.{" "}
						<span className="text-red-600">
							If you submit a training request without following the above steps
							your request will be deleted.
						</span>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button>Proceed</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
