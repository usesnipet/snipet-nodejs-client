import { client } from "./client";
import { vars } from "./vars";

const id = vars.knowledgeId;
const name = "Updated Knowledge";

async function main() {
  const res = await client.knowledge.update({ id }, { name });
  console.log("Update response:", JSON.stringify(res, null, 2));
}

main().catch(console.error);