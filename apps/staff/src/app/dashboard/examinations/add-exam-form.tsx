"use client";

import { addExam } from "@/app/dashboard/examinations/action";
import { examFormSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "ui/components/ui/button";
import { Calendar } from "ui/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "ui/components/ui/form";
import { Input } from "ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui/components/ui/popover";
import { cn } from "ui/lib/utils";
import { z } from "zod";

export const ExamForm = () => {
  let [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          startTransition(() => addExam(data))
        )}
        className=""
      >
        <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="cid"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>CID</FormLabel>
                <FormControl>
                  <Input placeholder="CID..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Position..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exam_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Exam Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date < addDays(new Date(), 14)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Exam Time (HHMMz)</FormLabel>
                <FormControl>
                  <Input placeholder="Exam Time (zulu)..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Instructor</FormLabel>
                <FormControl>
                  <Input placeholder="Instructor..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <Button variant="ghost" disabled className="p-0">
            <ReloadIcon className="h-4 w-4 text-white animate-spin" />
          </Button>
        ) : (
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
        )}
      </form>
    </Form>
  );
};
