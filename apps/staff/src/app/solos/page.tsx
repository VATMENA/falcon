import { publicSolosColumns } from "@/app/solos/columns";
import { PublicSolosTable } from "@/app/solos/data-table";
import { prisma } from "db";

export const revalidate = 1;

export default async function PublicSolosPage() {
	const solos = await prisma.solo.findMany();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-center">
				<h1 className="text-3xl font-bold">VATMENA Solo Validations</h1>
			</div>
			<PublicSolosTable columns={publicSolosColumns} data={solos} />
		</div>
	);
}
