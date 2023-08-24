import { instructorsColumns } from "@/app/dashboard/instructors/columns";
import { InstructorsTable } from "@/app/dashboard/instructors/data-table";
import { prisma } from "@/lib/db/prisma";

export default async function Instructors() {
  const instructors = await prisma.instructor.findMany();

  return (
    <div className="flex flex-col gap-y-4">
      <InstructorsTable data={instructors} columns={instructorsColumns} />
    </div>
  );
}
