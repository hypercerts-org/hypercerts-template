"use client";

import { useCallback, useState } from "react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";

import {
	type HypercertMetadata,
	formatHypercertData,
} from "@hypercerts-org/sdk";
import React from "react";
import { useHypercertForm } from "../../hooks/use-hypercert-form";
import useMintHypercert from "../../hooks/use-mint-hypercert";
import { generateImage } from "../../lib/image";
import { Dialog } from "../ui/dialog";
import { GeneralFields } from "./general-fields";
import { HypercertFields } from "./hypercert-fields";
import type { MintingFormValues } from "./hypercert-form.config";
import { HypercertMintDialog } from "./hypercert-mint-dialog";
import { PreviewCard } from "./preview-card";
import { TermsFields } from "./terms-fields";

const HypercertForm = () => {
	const [openMintDialog, setOpenMintDialog] = useState(false);
	const { form, badges, geoJSONFile, setGeoJSONFile, imageRef } =
		useHypercertForm();
	const {
		mintHypercert,
		mintStatus,
		mintData,
		mintError,
		isReceiptLoading,
		isReceiptSuccess,
		isReceiptError,
		receiptData,
		receiptError,
	} = useMintHypercert();

	// biome-ignore lint/correctness/useExhaustiveDependencies: missing imageRef.current
	const onSubmit = useCallback(
		async (values: MintingFormValues) => {
			const image = await generateImage(imageRef.current);
			if (!image) {
				console.error("Failed to generate image");
				return;
			}

			let geoJSONData = null;
			if (values.geojson) {
				try {
					const response = await fetch(values.geojson);
					geoJSONData = await response.json();
				} catch (error) {
					console.error("Error fetching GeoJSON:", error);
				}
			} else if (geoJSONFile) {
				try {
					const text = await geoJSONFile.text();
					geoJSONData = JSON.parse(text);
				} catch (error) {
					console.error("Error parsing GeoJSON file:", error);
				}
			}

			const metadata: HypercertMetadata = {
				name: values.title,
				description: values.description,
				image: image,
				external_url: values.link,
			};

			const formattedMetadata = formatHypercertData({
				...metadata,
				version: "2.0",
				properties: [
					{
						trait_type: "GeoJSON",
						data: geoJSONData,
					},
				],
				impactScope: ["all"],
				excludedImpactScope: [],
				workScope: badges,
				excludedWorkScope: [],
				rights: ["Public Display"],
				excludedRights: [],
				workTimeframeStart: values.projectDates.workStartDate.getTime() / 1000,
				workTimeframeEnd: values.projectDates.workEndDate.getTime() / 1000,
				impactTimeframeStart:
					values.projectDates.workStartDate.getTime() / 1000,
				impactTimeframeEnd: values.projectDates.workEndDate.getTime() / 1000,
				contributors: values.contributors,
			});

			if (!formattedMetadata.valid || !formattedMetadata.data) {
				console.log("Invalid metadata");
				return;
			}

			console.log("formattedMetadata", formattedMetadata);

			mintHypercert({
				metaData: formattedMetadata.data,
			});
			setOpenMintDialog(true);
		},
		[badges, mintHypercert, generateImage, geoJSONFile],
	);

	return (
		<Dialog open={openMintDialog} onOpenChange={setOpenMintDialog}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="mb-10 flex flex-col-reverse gap-6 md:mb-0 md:flex-row md:gap-4">
						<Card className="rounded-3xl py-4 shadow-none">
							<CardContent className="flex flex-col gap-4">
								<GeneralFields form={form} />
								<Separator />
								<HypercertFields
									form={form}
									badges={badges}
									geoJSONFile={geoJSONFile}
									setGeoJSONFile={setGeoJSONFile}
								/>
								<Separator />
								<TermsFields form={form} />
								<Button
									type="submit"
									className="flex w-full gap-2 rounded-md py-6"
								>
									Submit
								</Button>
							</CardContent>
						</Card>

						<PreviewCard form={form} badges={badges} ref={imageRef} />
					</div>
				</form>
			</Form>

			<HypercertMintDialog
				mintStatus={mintStatus}
				mintData={mintData as `0x${string}`}
				mintError={mintError}
				isReceiptLoading={isReceiptLoading}
				isReceiptSuccess={isReceiptSuccess}
				isReceiptError={isReceiptError}
				receiptError={receiptError}
				receiptData={receiptData}
				setOpenMintDialog={setOpenMintDialog}
			/>
		</Dialog>
	);
};

export { HypercertForm };
