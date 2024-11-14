import { HYPERCERTS_GRAPHQL_ENDPOINT } from "@/config/graphql";
import {
	type GetFractionsByOwner,
	type GetHypercertsByHypercertId,
	type HypercertsByCreatorQuery,
	getFractionsByOwnerQuery,
	getHypercertsByHypercertIdQuery,
	hypercertsByCreatorQuery,
} from "@/graphql/queries";
import type { Fraction } from "@/types";
import { request } from "graphql-request";
import type { Address } from "viem";

export interface FractionsData {
	fractionsCount: number;
	// biome-ignore lint/suspicious/noExplicitAny: fix typings
	fractions: any[]; // Replace 'any' with your Fraction type
}

export interface HypercertsData {
	hypercertsCount: number;
	// biome-ignore lint/suspicious/noExplicitAny: fix typings
	hypercerts: any[]; // Replace 'any' with your Hypercert type
}

export const getFractionsByOwner = async (
	address: Address,
): Promise<FractionsData> => {
	try {
		const res = await request<GetFractionsByOwner>(
			HYPERCERTS_GRAPHQL_ENDPOINT,
			getFractionsByOwnerQuery,
			{ address },
		);

		const fractionsData = res?.fractions?.data ?? [];
		const filteredFractions = fractionsData.filter(
			(fraction) => fraction?.metadata?.name,
		);

		return {
			fractionsCount: filteredFractions.length,
			fractions: filteredFractions,
		};
	} catch (error) {
		console.error("Error fetching fractions:", error);
		return {
			fractionsCount: 0,
			fractions: [],
		};
	}
};

export const getHypercertsByCreator = async (
	address: Address,
): Promise<HypercertsData> => {
	try {
		const res = await request<HypercertsByCreatorQuery>(
			HYPERCERTS_GRAPHQL_ENDPOINT,
			hypercertsByCreatorQuery,
			{ address: address.toLowerCase() },
		);

		const hypercertsData = res?.hypercerts?.data ?? [];
		const filteredHypercerts = hypercertsData.filter(
			(hypercert) => hypercert?.metadata?.name,
		);

		return {
			hypercertsCount: filteredHypercerts.length,
			hypercerts: filteredHypercerts,
		};
	} catch (error) {
		console.error("Error fetching hypercerts:", error);
		return {
			hypercertsCount: 0,
			hypercerts: [],
		};
	}
};

export const getHypercertByHypercertId = async (
	hypercertId: string,
): Promise<HypercertsData> => {
	try {
		const res = await request<GetHypercertsByHypercertId>(
			HYPERCERTS_GRAPHQL_ENDPOINT,
			getHypercertsByHypercertIdQuery,
			{ hypercert_id: hypercertId },
		);

		const hypercertsData = res?.hypercerts?.data ?? [];
		const filteredHypercerts = hypercertsData.filter(
			(hypercert) => hypercert?.metadata?.name,
		);

		return {
			hypercertsCount: filteredHypercerts.length,
			hypercerts: filteredHypercerts,
		};
	} catch (error) {
		console.error("Error fetching hypercerts:", error);
		return {
			hypercertsCount: 0,
			hypercerts: [],
		};
	}
};
