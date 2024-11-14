import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { forwardRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import HypercertCard from "./hypercert-card";
import type { MintingFormValues } from "./hypercert-form.config";

interface PreviewCardProps {
	form: UseFormReturn<MintingFormValues>;
	badges: string[];
}

const PreviewCard = forwardRef<HTMLDivElement, PreviewCardProps>(
	({ form, badges }, ref) => {
		const values = form.watch();

		return (
			<Card className="sticky top-4 h-fit rounded-3xl py-4 shadow-none">
				<CardContent>
					<div className="space-y-4">
						<h2 className="text-2xl">Preview</h2>

						<div ref={ref}>
							<HypercertCard
								title={form.watch("title") || undefined}
								description={form.watch("description") || undefined}
								banner={form.watch("banner") || undefined}
								logo={form.watch("logo") || undefined}
								workStartDate={form.watch("projectDates.workStartDate")}
								workEndDate={form.watch("projectDates.workEndDate")}
								badges={badges}
								displayOnly={true}
								ref={ref}
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							{badges.map((badge) => (
								<Badge key={badge} variant="secondary">
									{badge}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	},
);

PreviewCard.displayName = "PreviewCard";

export { PreviewCard };
