"use client";
import { trainingRequestSchema } from "@/types/form-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "ui/components/ui/form";

export const TrainingRequestForm: React.FC<{}> = () => {
	const form = useForm<z.infer<typeof trainingRequestSchema>>({
		resolver: zodResolver(trainingRequestSchema),
	});

	function onSubmit(v: z.infer<typeof trainingRequestSchema>) {
		console.log(v);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
