"use client";

import { instructorFormSchema } from "@/lib/form-schemas";
import { Subdivision } from "@/types/subdivisions";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { InstructorType } from "db";
import { useForm } from "react-hook-form";
import { Button } from "ui/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/ui/select";
import { z } from "zod";

export const AddInstructorForm = ({
  addInstructor,
}: {
  addInstructor: (
    instructor: z.infer<typeof instructorFormSchema>
  ) => Promise<void>;
}) => {
  const instructorForm = useForm<z.infer<typeof instructorFormSchema>>({
    resolver: zodResolver(instructorFormSchema),
  });

  return (
    <Form {...instructorForm}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addInstructor(instructorForm.getValues());
        }}
      >
        <div className="grid gap-4 py-4 grid-cols-2">
          <FormField
            control={instructorForm.control}
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
            control={instructorForm.control}
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
            control={instructorForm.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">
                  Divisional/Local Instructor
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(InstructorType).map((key) => (
                      <SelectItem key={key} value={key}>
                        {InstructorType[key as keyof typeof InstructorType]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={instructorForm.control}
            name="subdivision"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Subdivision</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
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
        </div>
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
};
