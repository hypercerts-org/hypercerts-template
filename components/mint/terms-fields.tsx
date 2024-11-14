import type { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import type { MintingFormValues } from "./hypercert-form.config";

export const TermsFields = ({
	form,
}: {
	form: UseFormReturn<MintingFormValues>;
}) => (
	<>
		<h2 className="text-2xl">Contact Fields</h2>
		<FormField
			control={form.control}
			name="confirmContributorsPermission"
			render={({ field }) => (
				<FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel>
							I confirm that all listed contributors gave their permission to
							include their work in this hypercert.
						</FormLabel>
					</div>
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="acceptTerms"
			render={({ field }) => (
				<FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel>
							I agree to the{" "}
							<a
								href="https://hypercerts.org/terms/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600"
							>
								Terms & Conditions
							</a>
						</FormLabel>
					</div>
				</FormItem>
			)}
		/>
	</>
);
