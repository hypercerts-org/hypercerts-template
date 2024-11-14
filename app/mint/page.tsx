import { HypercertForm } from "@/components/mint/hypercert-form";

function MintPage() {
	return (
		<main className="container flex max-w-4xl flex-col gap-4 pb-[64px] md:pb-12">
			<header className="flex w-3/4 flex-col gap-2 py-4">
				<h1 className="font-semibold text-xl md:text-3xl">
					Mint a hypercert detailing your work, the contributors and the
					location.
				</h1>
				<p className="text-sm">
					Please note: All information will be publicly available and can not be
					changed afterwards.
				</p>
			</header>
			<section>
				<HypercertForm />
			</section>
		</main>
	);
}

export default MintPage;
