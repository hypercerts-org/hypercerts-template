"use client";

import { calculateBigIntPercentage } from "@/lib/calculateBigIntPercentage";
import { type SupportedChainIdType, supportedChains } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

export interface HypercertCardProps {
	hypercert_id: string;
	name: string;
	totalUnitsForSale?: bigint;
	units: bigint;
	chain_id: SupportedChainIdType;
}

export default function HypercertCard({
	hypercert_id,
	name,
	totalUnitsForSale,
	units,
	chain_id,
}: HypercertCardProps) {
	const hypercertId = hypercert_id;
	const cardChain = supportedChains.find(
		(x) => x.id === Number(chain_id),
	)?.name;
	const percentAvailable = calculateBigIntPercentage(units, totalUnitsForSale);

	console.log("HypercertID: ", hypercertId);

	return (
		<Link href={`/hypercerts/${hypercertId}`} passHref>
			<article className="hover:-translate-y-2 group relative overflow-hidden rounded-lg bg-black/10 transition-transform duration-300">
				<div className="h-[320px] min-w-[300px] max-w-[320px]">
					<div className="relative h-full w-full">
						<Image
							src={`/api/hypercerts/${hypercertId}/image`}
							alt={`${name} illustration`}
							fill
							className="object-contain p-2"
							sizes="(min-width: 768px) 192px, 100vw"
						/>
					</div>
				</div>
				<section className="absolute top-4 left-4 flex space-x-1 opacity-100 transition-opacity duration-150 ease-out group-hover:opacity-100 md:opacity-0">
					<div className="rounded-md border border-white/60 bg-black px-2 py-0.5 text-white text-xs shadow-sm">
						{cardChain}
					</div>
				</section>
				<section className="absolute bottom-0 w-full space-y-2 bg-gray-200/80 p-4 text-black backdrop-blur-md">
					<p
						className={`line-clamp-2 flex-1 text-ellipsis font-semibold text-sm${
							name ? "text-black" : "text-gray-700"
						}`}
					>
						{name || "[Untitled]"}
					</p>
					<Separator className="my-2 bg-black/40" />
					<section className="flex justify-between text-xs">
						<section>
							<h6 className="opacity-70">for sale</h6>
							<p>{percentAvailable ? `${percentAvailable}%` : "--"}</p>
						</section>
					</section>
				</section>
			</article>
		</Link>
	);
}
