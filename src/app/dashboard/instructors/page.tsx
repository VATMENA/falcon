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
import { prisma } from "@/lib/db/prisma";
import { getUserSession } from "@/utils/session";

export default async function Instructors() {
  const session = await getUserSession();

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
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Divisional Instructors</h1>
        <InstructorsTable
          data={divisionalInstructors}
          columns={instructorsColumns}
          user={session!.user.user}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Local Instructors</h1>
        <InstructorsTable
          data={localInstructors}
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
