import { addInstructor } from "@/app/dashboard/instructors/action";
import { AddInstructorForm } from "@/app/dashboard/instructors/add-instructor-form";
import { instructorsColumns } from "@/app/dashboard/instructors/columns";
import { InstructorsTable } from "@/app/dashboard/instructors/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserSession } from "@/utils/session";
import { prisma } from "db";

export default async function Instructors() {
  const session = await getUserSession();

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
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Senior Instructors</h1>
        <InstructorsTable
          data={seniorInstructors}
          columns={instructorsColumns}
          user={session!.user.user}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Instructors</h1>
        <InstructorsTable
          data={instructors}
          columns={instructorsColumns}
          user={session!.user.user}
        />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Instructor...</DialogTitle>
          </DialogHeader>
          <AddInstructorForm addInstructor={addInstructor} />
        </DialogContent>
      </Dialog>
    </div>
  );
}