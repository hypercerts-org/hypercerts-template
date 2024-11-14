import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
	DEFAULT_FORM_VALUES,
	HypercertMintSchema,
	type MintingFormValues,
} from "@/components/mint/hypercert-form.config";

export const useHypercertForm = () => {
	const [badges, setBadges] = useState(["Edge Esmeralda", "Edge City"]);
	const [geoJSONFile, setGeoJSONFile] = useState<File | null>(null);
	const imageRef = useRef<HTMLDivElement | null>(null);

	const form = useForm<MintingFormValues>({
		resolver: zodResolver(HypercertMintSchema),
		defaultValues: DEFAULT_FORM_VALUES,
		mode: "onChange",
	});

	// Watch tags and update badges
	const tags = form.watch("tags") || "";
	useEffect(() => {
		if (tags) {
			const tagArray = tags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag !== "");
			setBadges(tagArray);
		} else {
			setBadges(["hypercerts", "template"]);
		}
	}, [tags]);

	return {
		form,
		badges,
		geoJSONFile,
		setGeoJSONFile,
		imageRef,
	};
};
