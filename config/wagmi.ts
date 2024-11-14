import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { wcProjectId } from "@/lib/constants";
import { sepolia } from "viem/chains";
import { cookieStorage, createStorage } from "wagmi";

// TODO: Add correct data
const metadata = {
  name: "Hypercerts Template",
  description: "Launch your own hypercerts platform",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/124626532"],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [sepolia], // required
  projectId: wcProjectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
