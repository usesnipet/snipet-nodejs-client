import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const id = vars.connectorId;

async function main() {
  try {
    const res = await client.connector.update({ knowledgeId, id }, { name: "Updated Connector Name" });
    console.log("Update response:", JSON.stringify(res, null, 2));
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
}

main().catch(console.error);