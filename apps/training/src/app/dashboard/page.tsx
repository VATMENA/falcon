import { EventResponse } from "@/types/events";
import { getUserSession } from "@/utils/session";
import { EventInput } from "@fullcalendar/core/index.js";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";
import {
  ObservationRequestsCard,
  TrainingRequestsCard,
} from "./(main-page)/cards";
import { EventsCalendar } from "./(main-page)/events-calendar";

export default async function DashboardPage() {
  const session = await getUserSession();

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
    <div className="flex flex-col w-full gap-y-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {session!.user.fullName}.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
        <TrainingRequestsCard />
        <ObservationRequestsCard />
      </div>
      <Card className="bg-secondary/40">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <EventsCalendar events={await getEvents()} />
        </CardContent>
      </Card>
    </div>
  );
}
