import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";
import { CalendarIcon, VideoIcon } from "@radix-ui/react-icons";

export const TrainingRequestsCard: React.FC<{}> = () => {
  return (
    <Card className="w-full bg-secondary/40">
      <CardHeader>
        <CardTitle>Training Requests</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">3</h1>
        <div className="h-12 w-12 bg-secondary rounded-md">
          <CalendarIcon className="w-full h-full p-2" />
        </div>
      </CardContent>
      <CardFooter className="flex border-t px-6 py-4">
        <Link href="/dashboard/requests">
          View all training requests &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
};

export const ObservationRequestsCard: React.FC<{}> = () => {
  return (
    <Card className="w-full bg-secondary/40">
      <CardHeader>
        <CardTitle>Observation Requests</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">1</h1>
        <div className="h-12 w-12 bg-secondary rounded-md">
          <VideoIcon className="w-full h-full p-2" />
        </div>
      </CardContent>
      <CardFooter className="flex border-t px-6 py-4">
        <Link href="/dashboard/requests">
          View all observation requests &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
};
