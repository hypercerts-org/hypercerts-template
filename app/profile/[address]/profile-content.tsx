"use client";

import { Settings2 } from "lucide-react";
import Link from "next/link";
import type { Address } from "viem";

import History from "@/components/profile/history";
import { SideBar } from "@/components/profile/sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FractionsData, HypercertsData } from "@/lib/api/hypercerts";
import { cn } from "@/lib/utils";

interface ProfileContentProps {
	address: Address;
	fractionsData: FractionsData;
	hypercertsData: HypercertsData;
}

export function ProfileContent({
	address,
	fractionsData,
	hypercertsData,
}: ProfileContentProps) {
	const { fractions, fractionsCount } = fractionsData;
	const { hypercerts, hypercertsCount } = hypercertsData;

	return (
		<main className="mx-auto mb-6 grid max-w-6xl auto-rows-auto grid-cols-1 gap-4 p-4 pb-16 text-vd-blue-900 md:max-w-[1200px] md:grid-cols-3 md:px-6 xl:px-0 md:py-8 md:pb-0">
			<Header address={address} />
			<StatsSection
				hypercertsCount={hypercertsCount}
				fractionsCount={fractionsCount}
			/>
			<History hypercerts={hypercerts} fractions={fractions} />
		</main>
	);
}

// Break down into smaller components
function Header({ address }: { address: Address }) {
	return (
		<header className="my-4 flex justify-between md:col-span-3">
			<h1 className="font-semibold text-xl md:text-3xl">My Hypercerts</h1>
			<Link
				href={`/profile/${address}/settings`}
				className={cn(buttonVariants({ variant: "link" }))}
			>
				Settings
				<Settings2 className="mt-1 ml-2 h-4 w-4" />
			</Link>
		</header>
	);
}

function StatsSection({
	hypercertsCount,
	fractionsCount,
}: {
	hypercertsCount: number;
	fractionsCount: number;
}) {
	return (
		<section className="flex flex-col gap-4 md:col-span-2">
			<div className="flex flex-col gap-4 md:flex-row">
				<StatCard
					title="Hypercerts I've created"
					value={hypercertsCount}
					className="bg-stone-200"
				/>
				<StatCard
					title="# of Hypercerts I own"
					value={fractionsCount}
					className="bg-slate-200"
				/>
			</div>
		</section>
	);
}

function StatCard({
	title,
	value,
	className,
}: {
	title: string;
	value: number;
	className?: string;
}) {
	return (
		<Card
			className={cn("flex-1 rounded-3xl border-none shadow-none", className)}
		>
			<CardHeader>
				<CardTitle className={cn("font-normal text-sm")}>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<data className="font-bold text-4xl">{value}</data>
			</CardContent>
		</Card>
	);
}
