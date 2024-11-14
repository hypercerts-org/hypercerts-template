"use client";
import { asDeployedChain, deployments } from "@hypercerts-org/contracts";
import {
	WETHAbi,
	addressesByNetwork,
	currenciesByNetwork,
	utils,
} from "@hypercerts-org/marketplace-sdk";
import { sepolia } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";

export const useGetCurrentERC20Allowance = () => {
	const { chainId, address } = useAccount();
	const hypercertsExchangeAddress =
		deployments[asDeployedChain(chainId ?? sepolia.id)].HypercertExchange;
	const wethAddress =
		currenciesByNetwork[utils.asDeployedChain(chainId ?? sepolia.id)].WETH
			.address;
	const { data } = useReadContract({
		abi: WETHAbi,
		address: wethAddress as `0x${string}`,
		chainId,
		functionName: "allowance",
		// enabled: !!chainId && !!address && !!hypercertsExchangeAddress,
		args: [address, hypercertsExchangeAddress],
	});

	return (data || 0n) as bigint;
};
