interface SiteConfig {
  name: string;
  title: string;
  description: string;
  localeDefault: string;
  links: {
    discord: string;
    twitter: string;
    github: string;
  };
  footerLinks: {
    title: string;
    url: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Hypercerts Template",
  title: "Build with hypercerts",
  description:
    "Kickstart impact funding with hypercerts",
  localeDefault: "en",
  links: {
    discord: "https://discord.gg/JgGQZ29t", // TODO: Update to @EdgeEsmeralda
    twitter: "https://twitter.com/hypercerts", // TODO: Update to @EdgeEsmeralda
    github: "https://github.com/hypercerts-org/hypercerts-template",
  },
  footerLinks: [
    { title: "FAQs", url: "https://testnet.hypercerts.org/docs/intro" },
    { title: "Terms of Use", url: "https://hypercerts.org/terms" },
    { title: "Privacy Policy", url: "https://hypercerts.org/privacy" },
    { title: "GitHub", url: "https://github.com/hypercerts-org" },
    { title: "X (Twitter)", url: "https://twitter.com/hypercerts" },
  ]
};
