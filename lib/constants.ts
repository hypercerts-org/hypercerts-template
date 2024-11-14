import type { Chain } from "viem";
import {
	arbitrum,
	arbitrumSepolia,
	base,
	baseSepolia,
	celo,
	filecoinCalibration,
	optimism,
	sepolia,
} from "viem/chains";
import { assertExists } from "./assertExists";

export const wcProjectId = assertExists(process.env.NEXT_PUBLIC_WC_PROJECT_ID);

export const apiEnvironment: "test" | "production" = (process.env
	.NEXT_PUBLIC_API_ENVIRONMENT || "test") as "test" | "production";

export const testNetChains = [
	sepolia,
	baseSepolia,
	arbitrumSepolia,
	filecoinCalibration,
] as const;
export const prodNetChains = [optimism, celo, base, arbitrum] as const;

export const supportedChains = (
	apiEnvironment === "production" ? prodNetChains : testNetChains
) as readonly [Chain, ...Chain[]];
const allChains = [
	...testNetChains.map((x) => x.id),
	...prodNetChains.map((x) => x.id),
] as const;
export type SupportedChainIdType = (typeof allChains)[number];
