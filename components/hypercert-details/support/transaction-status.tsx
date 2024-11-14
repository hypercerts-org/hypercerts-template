import { Button } from "@/components/ui/button";
import type { TransactionStatuses } from "@/hooks/use-buy-fraction";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import type { Address } from "viem";

interface TransactionStatusProps {
	statusContent: {
		label: keyof typeof TransactionStatuses;
		title: string;
		content: string;
		icon: React.ReactNode;
	};
	transactionHash?: Address | null;
}

// components/report-details/support/TransactionStatus.tsx
const TransactionStatus = ({
	statusContent: status,
	transactionHash,
}: TransactionStatusProps) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-2 rounded-md border-2 border-vd-beige-200 bg-vd-beige-100 p-4",
			)}
		>
			<div
				className={cn("flex justify-center", {
					"animate-spin": !(
						status.label === "Confirmed" ||
						status.label === "Failed" ||
						status.label === "InsufficientFunds" ||
						status.label === "ActionRejected"
					),
				})}
			>
				{status.icon}
			</div>
			<div className="flex flex-col gap-4">
				<h4 className="text-center font-bold md:text-lg">{status.title}</h4>
				<p className="text-center">{status.content}</p>
				{transactionHash && (
					<Button
						variant={"default"}
						className="transition-colors duration-200 hover:bg-vd-blue-400 hover:text-green-50"
					>
						<a
							// TODO: UPDATE FOR MAINNET WHEN READY
							href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-full w-full items-center justify-center gap-2"
						>
							View transaction on explorer
							<ArrowUpRight size={16} />
						</a>
					</Button>
				)}
			</div>
			{status.label !== "Pending" && (
				<Button
					className="space-y-1.5"
					variant={"outline"}
					type="button"
					onClick={() => window.location.reload()}
				>
					Close
				</Button>
			)}
		</div>
	);
};

export default React.memo(TransactionStatus);
