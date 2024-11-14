import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
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

export const HypercertFields = ({
	form,
	badges,
	setGeoJSONFile,
	geoJSONFile,
}: {
	form: UseFormReturn<MintingFormValues>;
	badges: string[];
	setGeoJSONFile: (file: File | null) => void;
	geoJSONFile: File | null;
}) => (
	<>
		<h2 className="text-2xl">Hypercert Fields</h2>
		<FormField
			control={form.control}
			name="tags"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Work Scope</FormLabel>
					<FormControl>
						<Textarea
							className="bg-inherit"
							placeholder="Hypercerts, Impact, ..."
							{...field}
						/>
					</FormControl>
					<FormMessage />
					<div className="flex flex-wrap gap-0.5">
						{badges.map((tag, index) => (
							<Badge
								key={`${tag}-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									index
								}`}
								variant="secondary"
							>
								{tag}
							</Badge>
						))}
					</div>
				</FormItem>
			)}
		/>
		<div className="flex flex-col gap-2 md:flex-row">
			<FormField
				control={form.control}
				name="projectDates.workStartDate"
				render={({ field }) => (
					<FormItem className="flex w-full flex-col">
						<FormLabel>Work Start Date</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant={"outline"}
										className={cn(
											"w-full rounded-sm border-input pl-3 text-left font-normal",
											!field.value && "text-muted-foreground",
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
									disabled={(date) =>
										date > form.watch("projectDates.workEndDate")
									}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="projectDates.workEndDate"
				render={({ field }) => (
					<FormItem className="flex w-full flex-col">
						<FormLabel>Work End Date</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant={"outline"}
										className={cn(
											"w-full rounded-sm border-input pl-3 text-left font-normal",
											!field.value && "text-muted-foreground",
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
									disabled={(date) =>
										date < form.watch("projectDates.workStartDate")
									}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
		<FormField
			control={form.control}
			name="contributors"
			render={({ field }) => (
				<FormItem>
					<FormLabel>List of Contributors to the Work</FormLabel>
					<FormControl>
						<Textarea
							className="bg-inherit"
							placeholder="0xWalletAddress1, 0xWalletAddress2, ..."
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="geojson"
			render={({ field }) => (
				<FormItem>
					<FormLabel>GeoJSON (URL or File)</FormLabel>
					<FormControl>
						<div className="flex gap-2">
							<Input
								type="text"
								placeholder="https://example.com/data.geojson"
								{...field}
								onChange={(e) => {
									field.onChange(e.target.value);
									setGeoJSONFile(null);
								}}
							/>
							<Input
								type="file"
								accept=".geojson,application/geo+json"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										setGeoJSONFile(file);
										field.onChange("");
									}
								}}
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	</>
);
