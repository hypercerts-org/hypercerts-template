"use client";
import { useFunding } from "@/contexts/funding-context";
import type { SupportReportInfo } from "@/types";
import { Progress } from "../ui/progress";
import { SupportReport } from "./support/dialog";

interface FundingProgressProps {
	totalAmount: number;
	fundedAmount: number;
	reportInfo: SupportReportInfo;
}

const FundingProgress: React.FC<FundingProgressProps> = ({
	totalAmount,
	reportInfo,
}) => {
	const { percentProgress, dollarAmountNeeded } = useFunding();
	const isFullyFunded = percentProgress >= 100;

	return (
		<section className="flex max-w-3xl flex-col space-y-2 rounded-t-xl bg-slate-50/80 px-3 py-4 shadow-md backdrop-blur-md md:flex-row md:justify-between md:space-x-4 md:rounded-b-xl">
			<div className="flex flex-1 flex-col gap-2">
				<div className="flex justify-between">
					<div className="flex-1 text-sm text-vd-blue-600">
						<span className="font-semibold text-lg text-vd-blue-900">
							${totalAmount}
						</span>{" "}
						GOAL
					</div>
					{!isFullyFunded && (
						<div className="text-sm text-vd-blue-600">
							<span className="font-semibold text-lg text-vd-blue-900">
								${dollarAmountNeeded}
							</span>{" "}
							NEEDED
						</div>
					)}
				</div>
				<Progress value={percentProgress} />
			</div>
			<div className="p-[2px]" />
			{isFullyFunded ? (
				<div>
					<p className="font-semibold text-lg text-vd-blue-900">Funded!</p>
				</div>
			) : (
				<SupportReport
					image={reportInfo.image}
					title={reportInfo.title}
					hypercertId={reportInfo.hypercertId}
				/>
			)}
		</section>
	);
};

export default FundingProgress;
