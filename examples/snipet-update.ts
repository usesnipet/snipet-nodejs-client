import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const id = vars.snipetId;
const name = "Test Snipet updated";
const metadata = {  };

async function main() {
  const res = await client.snipet.update({ knowledgeId, id }, { name, metadata });
  console.log(res);
}

main().catch(console.error);