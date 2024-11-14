import { cn } from "@/lib/utils";
import "@fontsource-variable/plus-jakarta-sans";
import type { Metadata } from "next";
import "./globals.css";

import { cookieToInitialState } from "wagmi";

import { Footer } from "@/components/global/footer";
import { NavMenu } from "@/components/global/nav-menu";
import { siteConfig } from "@/config/site";
import { config } from "@/config/wagmi";
import { WagmiContextProvider } from "@/contexts/wagmi";
import { headers } from "next/headers";

export const metadata: Metadata = {
	metadataBase: new URL("https://hypercerts-template.vercel.app/"),
	title: { default: siteConfig.name, template: "%s | hypercerts" },
	description: siteConfig.description,
	icons: [
		{
			rel: "icon",
			type: "image/x-icon",
			url: "/favicon.svg",
			media: "(prefers-color-scheme: light)",
		},
		{
			rel: "icon",
			type: "image/png",
			url: "/favicon-dark.svg",
			media: "(prefers-color-scheme: dark)",
		},
	],
	openGraph: {
		title: {
			default: "Hypercerts Template",
			template: "%s | Hypercerts Template",
		},
		description: siteConfig.description,
		type: "website",
		images: [{ url: "/hypercerts-opengraph.jpg", alt: "Hypercerts Template" }],
	},
	twitter: {
		card: "summary_large_image",
		site: "@hypercerts-template",
		title: {
			default: "Hypercerts template",
			template: "%s | Hypercert template",
		},
		description: siteConfig.description,
		images: [{ url: "/hypercerts-opengraph.jpg", alt: "Hypercerts Template" }],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialState = cookieToInitialState(config, headers().get("cookie"));
	return (
		<html lang="en">
			<body
				className={cn(
					"flex min-h-screen flex-col bg-background font-sans antialiased",
				)}
			>
				<WagmiContextProvider initialState={initialState}>
					<NavMenu />
					<div className="flex-1">{children}</div>
					<Footer />
				</WagmiContextProvider>
			</body>
		</html>
	);
}
