"use client";

import EmptyHistory from "@/assets/history-bg.svg";
import type { Fraction, Hypercert } from "@/types";
import type { Address } from "viem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FractionCard } from "./fraction-card";

interface HistoryProps {
	hypercerts: Hypercert[];
	fractions: Fraction[];
}

export default function History({ hypercerts, fractions }: HistoryProps) {
	return (
		<section className="flex flex-col gap-4 md:col-span-2 md:col-start-1 md:mt-2">
			<h2 className="text-center font-semibold text-xl md:py-6 md:text-left md:text-3xl">
				History
			</h2>
			<Tabs defaultValue="hypercerts" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="hypercerts">My Hypercerts</TabsTrigger>
					<TabsTrigger value="fractions">My Contributions</TabsTrigger>
				</TabsList>

				<TabsContent value="hypercerts" className="flex flex-col gap-2">
					{hypercerts && hypercerts.length > 0 ? (
						hypercerts.map((hypercert) => (
							<FractionCard
								key={hypercert.hypercert_id}
								hypercert_id={hypercert.hypercert_id}
								units={hypercert.units}
								owner_address={hypercert.creator_address as Address}
								{...hypercert.metadata}
							/>
						))
					) : (
						<EmptyState message="When you create Hypercerts they will appear here." />
					)}
				</TabsContent>

				<TabsContent value="fractions" className="flex flex-col gap-2">
					{fractions && fractions.length > 0 ? (
						fractions.map((fraction) => (
							<FractionCard
								key={fraction.hypercert_id}
								hypercert_id={fraction.hypercert_id}
								fraction_id={fraction.fraction_id}
								units={fraction.units}
								owner_address={fraction.owner_address as Address}
								{...fraction.metadata}
							/>
						))
					) : (
						<EmptyState message="When you start supporting different causes they will appear here." />
					)}
				</TabsContent>
			</Tabs>
		</section>
	);
}

function EmptyState({ message }: { message: string }) {
	return (
		<div className="flex flex-col gap-6 pt-6 text-center md:px-20">
			<EmptyHistory className="text-stone-200" />
			<p className="px-8 text-stone-600">{message}</p>
		</div>
	);
}
