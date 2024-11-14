"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { Address } from "viem";
import { ListForSaleButton } from "../marketplace/list-for-sale-button";

interface HistoryCardProps {
	hypercert_id?: string;
	fraction_id?: string;
	units: bigint;
	owner_address: Address;
	name: string;
	description: string;
	work_scope: string[];
	work_timeframe_from: Date;
	work_timeframe_to: Date;
}

export function FractionCard({
	hypercert_id,
	fraction_id,
	units,
	owner_address,
	name,
	description,
	work_scope,
	work_timeframe_from,
	work_timeframe_to,
}: HistoryCardProps) {
	const hypercertId = hypercert_id || fraction_id;

	return (
		<Card className="rounded-3xl shadow-none">
			<Link href={`/hypercerts/${hypercertId}`} passHref>
				<CardHeader className="md:pb-2">
					<div className="flex items-center justify-between pb-2">
						<div className="flex gap-2">
							<time
								className="text-sm text-vd-blue-400"
								dateTime={formatDate(work_timeframe_from)}
							>
								{formatDate(work_timeframe_from)}
							</time>
							<span className="text-sm text-vd-blue-400"> - </span>
							<time
								className="text-sm text-vd-blue-400"
								dateTime={formatDate(work_timeframe_to)}
							>
								{formatDate(work_timeframe_to)}
							</time>
						</div>
						<data className="mt-0">
							{new Intl.NumberFormat("en-US", {
								notation: "compact",
								compactDisplay: "short",
							}).format(Number(units))}
						</data>
					</div>

					<div className="flex flex-col gap-2 md:flex-row md:items-center">
						<div className="relative h-48 w-full overflow-hidden rounded-2xl md:h-32 md:w-48 md:min-w-[12rem]">
							<Image
								src={`/api/hypercerts/${hypercertId}/image`}
								alt={`${name} illustration`}
								fill
								className="object-contain p-2"
								sizes="(min-width: 768px) 192px, 100vw"
								priority={false}
							/>
						</div>

						<div className="flex w-full flex-col gap-3">
							<CardTitle>{name}</CardTitle>
							<div className="flex items-center justify-between">
								<div className="flex flex-wrap gap-2 pt-2">
									{work_scope.map((scope) => (
										<Badge
											key={scope}
											variant="secondary"
											className="items-center justify-between rounded-3xl"
										>
											<p className="ml-1 font-light text-xs">{scope}</p>
										</Badge>
									))}
								</div>
								{hypercert_id && (
									<ListForSaleButton hypercertId={hypercert_id} />
								)}
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<Separator />
					<CardDescription className="pt-4">{description}</CardDescription>
				</CardContent>
			</Link>
		</Card>
	);
}
