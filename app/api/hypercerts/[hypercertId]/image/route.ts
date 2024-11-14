import { type NextRequest, NextResponse } from "next/server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { HYPERCERTS_GRAPHQL_ENDPOINT } from "@/config/graphql";
import { graphql } from "@/lib/graphql";
import graphQlrequest from "graphql-request";

const PLACEHOLDER_IMAGE_PATH = path.join(
	process.cwd(),
	"public",
	"hypercert-placeholder.webp",
);

// GraphQL query to fetch the image metadata for a given hypercert ID
const IMAGE_QUERY = graphql(`
  query HypercertImage($hypercert_id: String!) {
    hypercerts(where: { hypercert_id: { eq: $hypercert_id } }) {
      data {
        metadata {
          image
        }
      }
    }
  }
`);

// Extract image data from a base64 string or a URL
async function getImageData(
	imageOrUrl: string,
): Promise<{ contentType: string; buffer: Buffer }> {
	if (imageOrUrl.startsWith("data:image")) {
		const [metadata, base64Data] = imageOrUrl.split(",");
		const contentType = metadata.split(";")[0].split(":")[1];
		const buffer = Buffer.from(base64Data, "base64");
		return { contentType, buffer };
	}

	if (imageOrUrl.startsWith("http")) {
		const response = await fetch(imageOrUrl);
		const blob = await response.blob();
		const buffer = Buffer.from(await blob.arrayBuffer());
		return { contentType: blob.type, buffer };
	}

	throw new Error("Invalid image data");
}

// Serve the placeholder image from disk
async function servePlaceholderImage() {
	const buffer = await fs.readFile(PLACEHOLDER_IMAGE_PATH);
	const contentType = "image/webp";
	return new NextResponse(buffer, {
		status: 200,
		headers: {
			"Content-Type": contentType,
			"Cache-Control": "s-maxage=864000", // 10 days cache
		},
	});
}

// GET handler to fetch and return the image associated with the given hypercert ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { hypercertId: string } },
) {
	const { hypercertId } = params;

	// Validate hypercert ID
	if (!hypercertId || Array.isArray(hypercertId)) {
		console.log("INVALID HYPERCERT ID: ", hypercertId);
		return new Response("Invalid ID", { status: 400 });
	}

	try {
		console.log("TRYING TO GET IMAGE");
		const res = await graphQlrequest(HYPERCERTS_GRAPHQL_ENDPOINT, IMAGE_QUERY, {
			hypercert_id: hypercertId,
		});
		const imageOrUrl = res.hypercerts.data?.[0]?.metadata?.image;

		console.log("HYPERCERTS GRAPHQL ENDPOINT: ", HYPERCERTS_GRAPHQL_ENDPOINT);
		console.log("IMAGE QUERY: ", IMAGE_QUERY);
		console.log("HYPERCERT ID: ", hypercertId);
		console.log("RES: ", res);
		console.log("IMAGE OR URL: ", imageOrUrl);

		// Use placeholder image if no image URL or data is found
		if (!imageOrUrl || imageOrUrl === "https://hypercerts.org/logo.png") {
			return servePlaceholderImage();
		}

		// Get image data or use placeholder image if data is invalid
		try {
			const { contentType, buffer } = await getImageData(imageOrUrl);
			return new NextResponse(buffer, {
				status: 200,
				headers: {
					"Content-Type": contentType,
					"Cache-Control": "s-maxage=864000", // 10 days cache
				},
			});
		} catch (error) {
			console.error(`Error parsing image data: ${error}`);
			return servePlaceholderImage();
		}
	} catch (error) {
		console.error(`Error fetching image metadata: ${error}`);
		return new NextResponse("Error processing request", { status: 500 });
	}
}
