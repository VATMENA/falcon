import { addInstructor } from "@/app/dashboard/instructors/action";
import { AddInstructorForm } from "@/app/dashboard/instructors/add-instructor-form";
import { instructorsColumns } from "@/app/dashboard/instructors/columns";
import { InstructorsTable } from "@/app/dashboard/instructors/data-table";
import { getUserSession } from "@/utils/session";
import { PlusIcon } from "@radix-ui/react-icons";
import { prisma } from "db";
import { Button } from "ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/ui/dialog";

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
          <Button>
            <PlusIcon className="h-8 w-8 pr-2" />
            Add
          </Button>
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
