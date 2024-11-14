import { Hyperboard } from "@/components/hyperboard";
import { hyperboardId } from "@/config/hypercert";

const HyperboardPage = () => {
	return (
		<main className="container flex max-w-4xl flex-col gap-4 pb-[64px] md:pb-12">
			<header className="flex w-3/4 flex-col gap-2 py-4">
				<h1 className="font-semibold text-xl md:text-3xl">
					Render your collection as a hyperboard.
				</h1>
				<p className="text-sm">
					A hyperboard provides a visual representation of your collection. This
					empowers your application with an intuitive representation of shared
					ownership of collections of hypercerts.
				</p>
			</header>
			<section>
				<Hyperboard hyperboardId={hyperboardId} showTable={true} />
			</section>
		</main>
	);
};

export default HyperboardPage;
