import { TransfersForm } from "@/app/dashboard/subdivision/transfer-form";
import { getUserSession } from "@/utils/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";

export default async function SubdivisionPage() {
  const session = await getUserSession();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-3xl font-bold">Subdivision Assignment</div>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>vACC Assignment Form</CardTitle>
          <CardDescription>Assign your subdivision in VATMENA</CardDescription>
        </CardHeader>
        <CardContent>
          <TransfersForm user={session!.user} />
        </CardContent>
      </Card>
    </div>
  );
}
