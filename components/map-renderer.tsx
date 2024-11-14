"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMetadata } from "@/utils/metadata";
import { type HypercertMetadata, validateMetaData } from "@hypercerts-org/sdk";
import { useEffect, useState } from "react";

interface MapRendererProps {
	uri?: string;
}

export type MapData = {
	geoJSON: unknown;
	baseUrl: string;
	metadata: HypercertMetadata;
};

// This is an example of how to render a map for a hypercert with geoJSON data
export default function MapRenderer({ uri }: MapRendererProps) {
	const [mapData, setMapData] = useState<MapData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMapData(uri: string) {
			try {
				const res = await getMetadata(uri);
				const { data } = res;
				const metadata = data;

				const validationResult = validateMetaData(metadata);
				if (!validationResult.valid) {
					throw new Error("Invalid metadata");
				}

				// @ts-ignore
				const geoJSON = JSON.parse(validationResult.data.properties[0].value);
				const polygon = geoJSON.features[0].geometry.coordinates[0];
				const _baseUrl = `https://www.trace.gainforest.app/?polygon=${encodeURI(
					JSON.stringify(polygon),
				)}&satellite=true`;

				setMapData({
					geoJSON,
					baseUrl: _baseUrl,
					metadata: validationResult.data as HypercertMetadata,
				});
			} catch (error) {
				console.error(error);
				setError("Error rendering map");
			}
		}

		if (!uri) return;
		fetchMapData(uri);
	}, [uri]);

	if (!uri) {
		return null;
	}

	if (error) {
		return <p className="text-sm">{error}</p>;
	}

	if (!mapData) {
		return <p className="text-sm">Loading map...</p>;
	}

	console.log(mapData);
	console.log(mapData.baseUrl);

	return (
		<Card className="bg-white shadow-none md:min-w-[300px]">
			<CardHeader>
				<CardTitle className="line-clamp-none font-semibold text-xl leading-none tracking-tight">
					Site boundaries
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					{mapData.baseUrl ? (
						<p className="font-semibold text-sm">GeoJSON</p>
					) : null}
					{mapData.baseUrl ? (
						<iframe
							height="500"
							width="500"
							src={mapData.baseUrl}
							title={`GeoJSON for ${mapData.metadata.name}`}
						/>
					) : (
						<p className="font-semibold text-sm">No GeoJSON found</p>
					)}
				</div>
			</CardContent>
		</Card>
		// <div className="flex flex-col gap-2">
		//     <p className="font-semibold text-sm">GeoJSON</p>
		//     <iframe
		//         height="500"
		//         width="500"
		//         src={mapData.baseUrl}
		//         title={`GeoJSON for ${mapData.metadata.name}`}
		//     />
		// </div>
	);
}
