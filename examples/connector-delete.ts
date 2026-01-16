import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const id = vars.connectorId;

async function main() {
  const res = await client.connector.delete({ knowledgeId, id });
  console.log(res);
}

main().catch(console.error);