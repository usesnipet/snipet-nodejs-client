import { IntegrationEntityAuthMethodsEnumKey, IntegrationEntityTypeEnumKey, MCPIntegrationManifest } from "../src/gen";
import { client } from "./client";
import { vars } from "./vars";

const id = vars.integrationId;
const authMethods: IntegrationEntityAuthMethodsEnumKey[] = ["OAUTH"];
const manifest: MCPIntegrationManifest = {
  baseUrl: "http://localhost:3000",
  version: "1.0.0",
  capabilities: [
    "INGEST", "SEARCH"
  ],
  features: [
    "FILE_MANAGEMENT"
  ],
  resources: [],
  tools: []
};
const type: IntegrationEntityTypeEnumKey = "MCP";

async function main() {
  const res = await client.integration.update({ id }, { name: "a", authMethods, mcp: (manifest as any), type });
  console.log("Update response:", JSON.stringify(res, null, 2));
}


main().catch(console.error);