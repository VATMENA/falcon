"use client";

import { Button } from "@/components/ui/button";
import { SoloRequest } from "@prisma/client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

export const ApproveButton = ({
  approve,
  request,
}: {
  approve: (request: SoloRequest) => Promise<void>;
  request: SoloRequest;
}) => {
  return (
    <Button
      onClick={async () => await approve(request)}
      className="h-6 w-6 p-0"
      variant={"ghost"}
    >
      <CheckIcon className="h-5 w-5 text-green-500" />
    </Button>
  );
};

export const DenyButton = ({
  deny,
  request,
}: {
  deny: (request: SoloRequest) => Promise<void>;
  request: SoloRequest;
}) => {
  return (
    <Button
      onClick={async () => await deny(request)}
      className="h-6 w-6 p-0"
      variant={"ghost"}
    >
      <Cross1Icon className="h-4 w-4 text-red-500" />
    </Button>
  );
};
