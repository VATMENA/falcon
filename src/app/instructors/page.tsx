import { publicInstructorsColumns } from "@/app/instructors/columns";
import { PublicInstructorsTable } from "@/app/instructors/data-table";
import { prisma } from "@/lib/db/prisma";

export const revalidate = 1;

export default async function InstructorsPage() {
  const divisionalInstructors = await prisma.instructor.findMany({
    where: {
      type: "DIVISIONAL",
    },
  });

  const localInstructors = await prisma.instructor.findMany({
    where: {
      type: "LOCAL",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">VATMENA Instructors</h1>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl font-bold">Divisional Instructors</h1>
        <PublicInstructorsTable
          data={divisionalInstructors}
          columns={publicInstructorsColumns}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl font-bold">Local Instructors</h1>
        <PublicInstructorsTable
          data={localInstructors}
          columns={publicInstructorsColumns}
        />
      </div>
    </div>
  );
}
