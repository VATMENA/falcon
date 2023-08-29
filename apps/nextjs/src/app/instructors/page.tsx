import { publicInstructorsColumns } from "@/app/instructors/columns";
import { PublicInstructorsTable } from "@/app/instructors/data-table";
import { prisma } from "db";

export const revalidate = 1;

export default async function InstructorsPage() {
  const seniorInstructors = await prisma.instructor.findMany({
    where: {
      type: "SENIOR",
    },
  });

  const instructors = await prisma.instructor.findMany({
    where: {
      type: "INSTRUCTOR",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">VATMENA Instructors</h1>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl font-bold">Senior Instructors</h1>
        <PublicInstructorsTable
          data={seniorInstructors}
          columns={publicInstructorsColumns}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl font-bold">Local Instructors</h1>
        <PublicInstructorsTable
          data={instructors}
          columns={publicInstructorsColumns}
        />
      </div>
    </div>
  );
}
