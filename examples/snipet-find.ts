import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;

async function main() {
  const res = await client.snipet.find({ knowledgeId });
  console.log(res);
}

main().catch(console.error);