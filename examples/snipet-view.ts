import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const snipetId = vars.snipetId;

async function main() {
  try {
    const res = await client.snipet.view({ knowledgeId, snipetId }, { view: "chat" });
    console.log(res);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
}

main().catch(console.error);