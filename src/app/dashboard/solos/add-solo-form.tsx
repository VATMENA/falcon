"use client";

import { addSoloRequest } from "@/app/dashboard/solos/action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { soloFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SoloForm = () => {
  let [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof soloFormSchema>>({
    resolver: zodResolver(soloFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          startTransition(() => addSoloRequest(data))
        )}
        className=" w-[800px]"
      >
        <div className="grid gap-4 py-4 grid-cols-2">
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
            name="expiry"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiry</FormLabel>
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
                          date < new Date() || date > addDays(new Date(), 30)
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
