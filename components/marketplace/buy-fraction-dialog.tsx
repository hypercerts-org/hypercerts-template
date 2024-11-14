"use client";
import { StepProcessDialogProvider } from "@/components/global/step-process-dialog";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import React from "react";
import { BuyFractionalOrderForm } from "./buy-fractional-order-form";

export type MarketplaceOrder = {
	additionalParameters: string;
	amounts: number[];
	chainId: number;
	collection: string;
	collectionType: number;
	createdAt: string;
	currency: string;
	endTime: number;
	globalNonce: string;
	id: string;
	itemIds: string[];
	orderNonce: string;
	price: string;
	quoteType: number;
	signature: string;
	signer: string;
	startTime: number;
	strategyId: number;
	subsetNonce: number;
};

const BuyFractionDialog = ({
	selectedOrder,
}: {
	selectedOrder: MarketplaceOrder;
}) => {
	return (
		<DialogContent>
			<DialogHeader>Buy fractional sale</DialogHeader>
			<StepProcessDialogProvider>
				<BuyFractionalOrderForm order={selectedOrder} />
			</StepProcessDialogProvider>
		</DialogContent>
	);
};

export default BuyFractionDialog;
