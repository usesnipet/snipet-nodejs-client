import { client } from "./client";
import { vars } from "./vars";

async function main() {
  try {
    const res = await client.knowledge.getIngestStatus({ id: vars.ingestId });
    console.log(res);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));

  }
}

main().catch(console.error);