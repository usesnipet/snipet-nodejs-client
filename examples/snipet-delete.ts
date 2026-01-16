import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const id = vars.snipetId;

async function main() {
  const res = await client.snipet.delete({ knowledgeId, id });
  console.log(res);
}

main().catch(console.error);