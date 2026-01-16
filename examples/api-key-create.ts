import { KnowledgeBaseApiKeyConfig } from "../src/gen";
import { client } from "./client";

const name = "Test Api Key";
const knowledgeBases: KnowledgeBaseApiKeyConfig[] = [];

async function main() {
  const res = await client.apiKey.create({ name, knowledgeBases });
  console.log(res);
}

main().catch(console.error);