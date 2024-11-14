import type { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { MintingFormValues } from "./hypercert-form.config";

export const GeneralFields = ({
	form,
}: {
	form: UseFormReturn<MintingFormValues>;
}) => (
	<>
		<h2 className="text-2xl">General Fields</h2>
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Hypercert Name</FormLabel>
					<FormControl>
						<Input placeholder="Template Hypercert" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="logo"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Logo Image</FormLabel>
					<FormControl>
						<Input
							placeholder="https://i.imgur.com/hypercert-logo.png"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="banner"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Background Banner Image</FormLabel>
					<FormControl>
						<Input
							placeholder="https://i.imgur.com/hypercert-banner.png"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="description"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Textarea
							className="bg-inherit"
							placeholder="Hypercert description"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="link"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Link</FormLabel>
					<FormControl>
						<Input placeholder="https://hypercerts.org" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	</>
);
