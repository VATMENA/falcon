import { ExamForm } from "@/app/dashboard/examinations/add-exam-form";
import { examsColumns } from "@/app/dashboard/examinations/columns";
import { ExamsTable } from "@/app/dashboard/examinations/data-table";
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

export default async function ExaminationsPage() {
  const exams = await prisma.examination.findMany({
    orderBy: {
      exam_date: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <ExamsTable columns={examsColumns} data={exams} />
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="h-8 w-8 pr-2" />
            Request
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request New Examination...</DialogTitle>
          </DialogHeader>
          <ExamForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
