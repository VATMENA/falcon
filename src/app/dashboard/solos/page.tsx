import { columns } from "@/app/dashboard/solos/columns";
import { DataTable } from "@/app/dashboard/solos/data-table";
import { SoloForm } from "@/app/dashboard/solos/form";
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
    <div className="flex flex-col">
      <DataTable columns={columns} data={solos} />
      <SoloForm />
    </div>
  );
}
