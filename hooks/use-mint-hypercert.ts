import { useHypercertClient } from "@/hooks/use-hypercerts-client";
import { useMutation } from "@tanstack/react-query";
import { usePublicClient, useWaitForTransactionReceipt } from "wagmi";

import { constructHypercertIdFromReceipt } from "@/utils/constructHypercertIdFromReceipt";
import {
	type HypercertMetadata,
	TransferRestrictions,
} from "@hypercerts-org/sdk";
import { useState } from "react";
import type { TransactionReceipt } from "viem";

type Payload = {
	metaData: HypercertMetadata;
};

const useMintHypercert = () => {
	const [metaData, setMetaData] = useState<HypercertMetadata | undefined>();
	const { client } = useHypercertClient();
	const publicClient = usePublicClient();

	if (!client) {
		throw new Error("Hypercert Client is not initialized");
	}

	if (!publicClient) {
		throw new Error("Public client is not initialized");
	}

	const {
		mutate: mintHypercert,
		data: mintData,
		status: mintStatus,
		isIdle: isMintIdle,
		isPending: isMintPending,
		isSuccess: isMintSuccess,
		isError: isMintError,
		error: mintError,
	} = useMutation({
		mutationFn: (payload: Payload) => {
			const { metaData } = payload;
			return client.mintHypercert({
				metaData,
				totalUnits: BigInt("100000000"),
				transferRestriction: TransferRestrictions.FromCreatorOnly,
			});
		},
	});

	console.log("mintData", mintData);

	const {
		data: receiptData,
		isLoading: isReceiptLoading,
		isPending: isReceiptPending,
		isSuccess: isReceiptSuccess,
		isError: isReceiptError,
		error: receiptError,
	} = useWaitForTransactionReceipt({
		hash: mintData,
		query: {
			enabled: !!mintData,
			select: (data) => {
				const hypercertId = constructHypercertIdFromReceipt(
					data as TransactionReceipt,
					publicClient.chain.id,
				);
				return {
					...data,
					hypercertId,
				};
			},
			staleTime: Number.POSITIVE_INFINITY,
		},
	});

	return {
		mintHypercert,
		mintStatus,
		isMintIdle,
		isMintPending,
		isMintSuccess,
		isMintError,
		mintData,
		mintError,
		receiptData,
		receiptError,
		isReceiptPending,
		isReceiptLoading,
		isReceiptSuccess,
		isReceiptError,
		metaData,
		setMetaData,
	};
};

export default useMintHypercert;
