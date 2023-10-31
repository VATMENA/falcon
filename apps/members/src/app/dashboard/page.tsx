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
import { EventsCalendar } from "@/components/calendar";
import { EventResponse } from "@/types/event";
import { EventInput } from "@fullcalendar/core/index.js";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await getUserSession();

  const member = await getMember(
    process.env.NODE_ENV === "production"
      ? parseInt(session!.user.cid)
      : 1434781,
  );

  const getEvents = async () => {
    const response = await fetch(
      "https://my.vatsim.net/api/v2/events/view/division/MENA",
    );
    const eventsData = (await response.json()) as EventResponse;
    let events: EventInput[] = [];
    eventsData.data.forEach((event) => {
      events.push({
        title: event.name,
        start: event.start_time,
        end: event.end_time,
        url: event.link,
      });
    });
    return events;
  };

  return (
    member && (
      <div className="flex flex-col items-center px-20">
        <div className="flex w-full max-w-6xl justify-between select-none">
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
        </div>
        <div className="w-full max-w-6xl pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <EventsCalendar events={await getEvents()} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}
