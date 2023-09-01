"use client";

import { transferMember } from "@/app/dashboard/subdivision/action";
import { transferFormSchema } from "@/lib/form-schemas";
import { VatsimMemberResponse } from "@/lib/vatsim/member";
import { Subdivision } from "@/types/subdivisions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucia";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/ui/select";
import { toast } from "ui/components/ui/use-toast";
import { z } from "zod";

export const TransfersForm = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  let [isLoading, startTransition] = useTransition();

  const [member, setMember] = useState<VatsimMemberResponse | null>(null);

  const transferForm = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
  });

  useEffect(() => {
    fetch(`/api/vatsim/member/${user.cid}`)
      .then((res) => res.json())
      .then((member: VatsimMemberResponse) => {
        setMember(member);
      });
  }, [member, user.cid]);

  return (
    member && (
      <div className="flex flex-col gap-y-6">
        <Form {...transferForm}>
          <form
            id="transfer-form"
            onSubmit={transferForm.handleSubmit((v, e) => {
              startTransition(() => {
                transferMember(member, v).then((data) => {
                  setOpen(false);
                  toast({
                    title: "vACC Assignment Successful",
                    description: `Assignment for ${member.name_first} ${
                      member.name_last
                    } to ${
                      Subdivision[v.subdivision as keyof typeof Subdivision]
                    } has been successfully fulfilled.`,
                  });
                });
              });
            })}
            className="space-y-2"
          >
            <FormField
              control={transferForm.control}
              name="subdivision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Member: {member.name_first} {member.name_last}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.subdivision_id}
                    disabled={member.subdivision_id === null ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Subdivision).map((key) => (
                        <SelectItem key={key} value={key}>
                          {Subdivision[key as keyof typeof Subdivision]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently upgrade
                    the member&apos;s rating without any possibility to reverse
                    it.
                    <p className="font-bold">
                      Upgrade:{" "}
                      {member.subdivision_id
                        ? Subdivision[
                            member.subdivision_id as keyof typeof Subdivision
                          ]
                        : "None"}{" "}
                      &rarr;{" "}
                      {
                        Subdivision[
                          transferForm.getValues(
                            "subdivision"
                          ) as keyof typeof Subdivision
                        ]
                      }
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" form="transfer-form">
                    Transfer
                  </Button>
                </DialogFooter>
              </DialogContent>
              <DialogTrigger asChild>
                <Button
                  disabled={member.subdivision_id === null ? false : true}
                >
                  Transfer
                </Button>
              </DialogTrigger>
            </Dialog>
            {member.subdivision_id !== null && (
              <div className="text-red-500">
                You are already assigned to a subdivision. Please contact the
                membership department
              </div>
            )}
          </form>
        </Form>
      </div>
    )
  );
};
