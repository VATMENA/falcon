"use client";

import { updateSubdivision } from "@/app/dashboard/transfers/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { idFormSchema, transferFormSchema } from "@/lib/form-schemas";
import { VatsimMemberResponse } from "@/lib/vatsim/member";
import { Subdivision } from "@/types/subdivisions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TransfersForm() {
  const [open, setOpen] = useState(false);

  let [isLoading, startTransition] = useTransition();

  const [member, setMember] = useState<VatsimMemberResponse | null>(null);
  const idForm = useForm<z.infer<typeof idFormSchema>>({
    resolver: zodResolver(idFormSchema),
  });

  const transferForm = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
  });

  function idFormSubmit(data: z.infer<typeof idFormSchema>) {
    fetch(`/api/vatsim/member/${data.cid}`)
      .then((res) => res.json())
      .then((member: VatsimMemberResponse) => {
        setMember(member);
      });
  }

  return (
    <div className="flex flex-col gap-y-6 w-2/3">
      <Form {...idForm}>
        <form
          onSubmit={idForm.handleSubmit(idFormSubmit)}
          className="space-y-2"
        >
          <FormField
            control={idForm.control}
            name="cid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member CID</FormLabel>
                <FormControl>
                  <Input placeholder="0000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {member ? (
        <Form {...transferForm}>
          <form
            id="transfer-form"
            onSubmit={transferForm.handleSubmit((v, e) => {
              startTransition(() => {
                updateSubdivision(member.id, {
                  comment: v.comment,
                  subdivision: v.subdivision,
                }).then((data) => {
                  setOpen(false);
                  if (data.error) {
                    toast({
                      title: "Transfer Unsuccesful",
                      description: data.error,
                      variant: "destructive",
                    });
                  } else {
                    toast({
                      title: "Transfer Successful",
                      description: `${member.name_first} ${
                        member.name_last
                      } has been successfully transferred to ${
                        Subdivision[v.subdivision as keyof typeof Subdivision]
                      }`,
                    });
                  }
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
            <FormField
              control={transferForm.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Comment..." {...field} />
                  </FormControl>
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
                    Upgrade
                  </Button>
                </DialogFooter>
              </DialogContent>
              <DialogTrigger asChild>
                <Button>Upgrade</Button>
              </DialogTrigger>
            </Dialog>
          </form>
        </Form>
      ) : null}
    </div>
  );
}
