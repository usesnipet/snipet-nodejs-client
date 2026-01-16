import { client } from "./client";
import { vars } from "./vars";

const id = vars.knowledgeId;
async function main() {
  const res = await client.knowledge.delete({ id });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);