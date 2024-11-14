import { HypercertsView } from "@/components/hypercerts/hypercerts-view";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { FilterProvider } from "@/contexts/filter";
import type { Hypercert } from "@/types";
import { fetchHypercerts } from "@/utils/supabase/hypercerts";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import heroImage from "@/assets/HypercertsTemplate.webp";
// Import static assets
import noReportsImage from "@/assets/history-bg.svg";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function LandingPage() {
	const { data, error } = await fetchHypercerts();

	return (
		<main className="flex min-h-screen flex-col">
			{/* Hero Section */}
			<section className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8 sm:px-6">
				<div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-black">
					{/* Hero Image Container */}
					<div className="relative aspect-[16/9] w-full">
						<Image
							src={heroImage}
							alt="Hero background"
							className="object-cover object-center opacity-60"
							placeholder="blur"
							priority
							fill
							sizes="(min-width: 1280px) 1152px, (min-width: 1040px) calc(100vw - 128px), calc(100vw - 32px)"
						/>
						{/* Gradient Overlay */}
						<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
					</div>

					{/* Content Overlay */}
					<div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
						<h1 className="animate-fade-up bg-gradient-to-br from-white to-gray-400 bg-clip-text font-bold text-4xl text-transparent tracking-tight sm:text-6xl">
							{siteConfig.name}
						</h1>
						<p className="mx-auto mt-6 max-w-2xl animate-fade-up text-gray-200 text-lg [animation-delay:0.2s] sm:text-xl">
							{siteConfig.description}
						</p>
						<div className="mt-10 flex animate-fade-up items-center justify-center gap-4 [animation-delay:0.4s]">
							<Button size="lg" className="group" asChild>
								<a href="#explore">
									Explore Hypercerts
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section
				id="explore"
				className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8 sm:px-6"
			>
				{data?.length ? (
					<FilterProvider>
						<div className="space-y-8">
							<div className="flex items-center justify-between">
								<h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">
									Explore Hypercerts
								</h2>
							</div>
							<HypercertsView hypercerts={data as Hypercert[]} />
						</div>
					</FilterProvider>
				) : (
					<NoDataDisplay error={error} />
				)}
			</section>
		</main>
	);
}

function NoDataDisplay({ error }: { error?: Error }) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-gray-50 px-4 py-12">
			<div className="relative h-32 w-32 md:h-40 md:w-40">
				<Image
					src={noReportsImage}
					alt="No data available"
					fill
					className="object-contain"
				/>
			</div>
			<div className="mt-6 text-center">
				<h2 className="font-semibold text-gray-900 text-xl">
					{error ? "Something went wrong" : "No Hypercerts Found"}
				</h2>
				<p className="mt-2 text-gray-600">
					{error
						? "Please try again later."
						: "There are no hypercerts available at the moment."}
				</p>
			</div>
		</div>
	);
}
