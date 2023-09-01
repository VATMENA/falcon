import { getMember } from "@/lib/vatsim/member";
import { parseRating } from "@/utils/parse-rating";
import { getUserSession } from "@/utils/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";

export default async function Dashboard() {
  const session = await getUserSession();

  const member = await getMember(
    process.env.NODE_ENV === "production"
      ? parseInt(session!.user.cid)
      : 1434781
  );

  return (
    member && (
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 select-none">
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Region</CardTitle>
              <CardDescription>Current VATSIM Region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{member.region_id}</div>
            </CardContent>
          </Card>
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Rating</CardTitle>
              <CardDescription>Current VATSIM Rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {parseRating(member.rating)}
              </div>
            </CardContent>
          </Card>
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Division</CardTitle>
              <CardDescription>Current VATSIM Division</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{member.division_id}</div>
            </CardContent>
          </Card>
          <Card className="w-64">
            <CardHeader>
              <CardTitle>vACC</CardTitle>
              <CardDescription>Current VATSIM vACC/vARTCC</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{member.subdivision_id}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}
