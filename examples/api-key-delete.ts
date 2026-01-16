import { client } from "./client";
import { vars } from "./vars";

const id = vars.apiKeyId;

async function main() {
  const res = await client.apiKey.delete({ id });
  console.log(res);
}

main().catch(console.error);