import type { Report } from "@/types";
import { HandCoins, HeartHandshake, type LucideIcon } from "lucide-react";
import { useMemo } from "react";

interface StatContainerProps {
	Icon: LucideIcon;
	heading: string;
	data: number;
	currency?: string;
}

const StatContainer: React.FC<StatContainerProps> = ({
	Icon,
	heading,
	data,
	currency,
}) => {
	return (
		<div className="flex flex-auto items-center gap-5 rounded-3xl bg-vd-blue-200 py-4 pr-2 pl-5 lg:w-[33%]">
			{/* <img
				className="h-16 w-16"
				src={`/${icon}.svg`}
				alt={`${icon} illustration`}
			/> */}
			<Icon size={64} className="text-vd-blue-600" />
			<div className="flex flex-col gap-1">
				<p className="font-medium text-base">{heading}</p>
				<p className="font-bold text-3xl md:text-3xl">
					{data}
					<span className="pl-1 text-lg">{currency}</span>
				</p>
			</div>
		</div>
	);
};

interface HypercertStatsProps {
	numOfContributors: number;
	reports: Report[];
}

const VoicedeckStats: React.FC<HypercertStatsProps> = ({
	numOfContributors,
	reports,
}) => {
	const contributionAmounts = useMemo(() => {
		const totalContributions = reports.reduce(
			(total: number, report: Report) => total + (report.fundedSoFar || 0),
			0,
		);

		return {
			totalContributions,
		};
	}, [reports]);

	const { totalContributions } = contributionAmounts;

	return (
		<section className="flex w-full max-w-screen-xl flex-col gap-3 lg:flex-row">
			<StatContainer
				key="flower"
				Icon={HeartHandshake}
				heading="Total supporters"
				data={numOfContributors}
			/>
			<StatContainer
				key="elephant"
				Icon={HandCoins}
				heading="Total support received"
				data={totalContributions}
				currency="USD"
			/>
		</section>
	);
};

export default VoicedeckStats;
