import { isValidEthereumAddress } from "@/lib/utils";
import { z } from "zod";

const HypercertMintSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Hypercert Name is required" })
		.max(100, { message: "Hypercert Name must be less than 50 characters" }),
	description: z
		.string()
		.min(10, {
			message: "Description is required and must be at least 10 characters",
		})
		.max(500, { message: "Description must be less than 500 characters" }),
	link: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string().url().optional(),
	),
	logo: z.string().url({ message: "Logo Image must be a valid URL" }),
	banner: z
		.string()
		.url({ message: "Background Banner Image must be a valid URL" }),
	tags: z
		.string()
		.refine((val) => val.split(",").every((tag) => tag.trim() !== ""), {
			message:
				"Tags must must not be empty, Multiple tags must be separated by commas",
		}),
	projectDates: z
		.object({
			workStartDate: z.date(),
			workEndDate: z.date(),
		})
		.refine((data) => data.workStartDate <= data.workEndDate, {
			message: "workStartDate should not be later than workEndDate",
			path: ["workStartDate"],
		}),
	contributors: z
		.string()
		.refine(
			(value) => {
				const addresses = value.split(", ").map((addr) => addr.trim());
				return addresses.every((address) => isValidEthereumAddress(address));
			},
			{
				message:
					"Each value must be a valid Ethereum address separated by a comma and a space.",
			},
		)
		.transform((value) => value.split(",").map((addr) => addr.trim())),
	acceptTerms: z.boolean(),
	confirmContributorsPermission: z.boolean(),
	geojson: z.string().optional(),
});

type MintingFormValues = z.infer<typeof HypercertMintSchema>;

const DEFAULT_FORM_VALUES: MintingFormValues = {
	title: "",
	banner: "",
	description: "",
	logo: "",
	link: "",
	tags: "",
	projectDates: {
		workStartDate: new Date(2024, 5, 22),
		workEndDate: new Date(2024, 11, 11),
	},
	acceptTerms: false,
	confirmContributorsPermission: false,
	geojson: "",
	contributors: [],
};

export { HypercertMintSchema, type MintingFormValues, DEFAULT_FORM_VALUES };
