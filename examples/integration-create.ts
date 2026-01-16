import { IntegrationEntityAuthMethodsEnumKey, IntegrationEntityTypeEnumKey, MCPIntegrationManifest } from "../src/gen";
import { client } from "./client";

const name = "Test Integration 2";
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
const type: IntegrationEntityTypeEnumKey = "MANUAL";

async function main() {
  try {    
    const res = await client.integration.create({ name, authMethods, manual: (manifest as any), type });
    console.log('Success:', res);
  } catch (error) {
    console.error('Error creating integration:', error);
  }
}

main().catch(console.error);