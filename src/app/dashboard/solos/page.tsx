import { SoloForm } from "@/app/dashboard/solos/add-solo-form";
import { solosColumns } from "@/app/dashboard/solos/columns";
import { SolosTable } from "@/app/dashboard/solos/data-table";
import { prisma } from "@/lib/db/prisma";
import { unstable_cache } from "next/cache";

export default async function SolosPage() {
  "use server";
  const solos = await unstable_cache(
    async () => await prisma.solo.findMany(),
    ["cache-key"],
    {
      tags: ["solo"],
    }
  )();

  return (
    <div className="flex flex-col gap-y-4">
      <SolosTable columns={solosColumns} data={solos} />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Add Solo Validation</h1>
        <SoloForm />
      </div>
    </div>
  );
}
