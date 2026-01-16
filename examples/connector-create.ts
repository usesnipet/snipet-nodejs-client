import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const integrationId = vars.integrationId;
const name = "Test Connector";

async function main() {
  const res = await client.connector.create({ knowledgeId }, { name, integrationId });
  console.log(res);
}

main().catch(console.error);