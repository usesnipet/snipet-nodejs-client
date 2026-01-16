import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const name = "Test Snipet";
const metadata = { };

async function main() {
  try {
    const res = await client.snipet.create({ knowledgeId }, { name, metadata });
    console.log(res);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
}

main().catch(console.error);