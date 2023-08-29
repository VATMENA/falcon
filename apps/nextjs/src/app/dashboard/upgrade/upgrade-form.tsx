"use client";
import { createUpgradeRequest } from "@/app/dashboard/upgrade/action";
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
import { useToast } from "@/components/ui/use-toast";
import { idFormSchema, ratingFormSchema } from "@/lib/form-schemas";
import { VatsimMemberResponse } from "@/lib/vatsim/member";
import { parseRating } from "@/utils/parse-rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function UpgradeForm() {
  let [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [member, setMember] = useState<VatsimMemberResponse | null>(null);
  const idForm = useForm<z.infer<typeof idFormSchema>>({
    resolver: zodResolver(idFormSchema),
  });

  const ratingForm = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
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
        <Form {...ratingForm}>
          <form
            id="rating-form"
            onSubmit={ratingForm.handleSubmit((v, e) => {
              startTransition(() => {
                createUpgradeRequest(member.id.toString(), {
                  rating: v.rating,
                  scoresheet: v.scoresheet,
                }).then((data) => {
                  setOpen(false);
                  if (data.error) {
                    toast({
                      title: "Upgrade Unsuccesful",
                      description: data.error,
                      variant: "destructive",
                    });
                  } else {
                    toast({
                      title: "Upgrade Request Successful",
                      description: `Rating upgrade request for ${
                        member.name_first
                      } ${member.name_last} to ${parseRating(
                        v.rating
                      )} has been created`,
                    });
                  }
                });
              });
            })}
            className="space-y-2"
          >
            <FormField
              control={ratingForm.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Member: {member.name_first} {member.name_last}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.rating.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">OBS</SelectItem>
                      <SelectItem value="2">S1</SelectItem>
                      <SelectItem value="3">S2</SelectItem>
                      <SelectItem value="4">S3</SelectItem>
                      <SelectItem value="5">C1</SelectItem>
                      <SelectItem value="7">C3</SelectItem>
                      <SelectItem value="8">I1</SelectItem>
                      <SelectItem value="10">I3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ratingForm.control}
              name="scoresheet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scoresheet (if required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Google Drive Link..." {...field} />
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
                      Upgrade: {parseRating(member.rating)} &rarr;{" "}
                      {parseRating(
                        parseInt(
                          ratingForm.getValues().rating as unknown as string
                        )
                      )}
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" form="rating-form">
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
