import { toPng } from "html-to-image";

export const generateImage = async (element: HTMLDivElement | null) => {
	if (!element) {
		return null;
	}

	try {
		const dataUrl = await toPng(element, {
			cacheBust: true,
			fetchRequestInit: { mode: "cors" },
		});
		return dataUrl;
	} catch (error) {
		console.error("Failed to generate image:", error);
		return null;
	}
};
