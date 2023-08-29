"use client";

import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

export const AddButton = ({ addKey }: { addKey: () => Promise<void> }) => {
  return <Button onClick={async () => await addKey()}>Generate API Key</Button>;
};

export const DeleteButton = ({
  deleteKey,
  apiKeyId,
}: {
  deleteKey: (id: number) => Promise<void>;
  apiKeyId: number;
}) => {
  return (
    <Button
      onClick={async () => await deleteKey(apiKeyId)}
      className="h-6 w-6 p-0"
      variant={"ghost"}
    >
      <Cross1Icon className="h-4 w-4 text-white" />
    </Button>
  );
};
