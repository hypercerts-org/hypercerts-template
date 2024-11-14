import { apiEnvironment } from "@/lib/constants";

export const HYPERCERTS_DEFAULT_CONTRACT =
  "0xa16dfb32eb140a6f3f2ac68f41dad8c7e83c4941";

const production = "https://api.hypercerts.org/v1";
const development = "https://staging-api.hypercerts.org/v1";

export const HYPERCERTS_API_ENDPOINT =
  apiEnvironment === "test" ? development : production;

export const HYPERCERTS_GRAPHQL_ENDPOINT = `${HYPERCERTS_API_ENDPOINT}/graphql`;
