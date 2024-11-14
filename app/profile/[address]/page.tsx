import {
	getFractionsByOwner,
	getHypercertsByCreator,
} from "@/lib/api/hypercerts";
import type { Address } from "viem";
import { ProfileContent } from "./profile-content";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function ProfilePage({
	params: { address },
}: {
	params: { address: Address };
}) {
	// Fetch data on the server
	const [fractionsData, hypercertsData] = await Promise.all([
		getFractionsByOwner(address),
		getHypercertsByCreator(address),
	]);

	return (
		<ProfileContent
			address={address}
			fractionsData={fractionsData}
			hypercertsData={hypercertsData}
		/>
	);
}
