import { client } from "./client";
import { vars } from "./vars";

const id = vars.integrationId;

async function main() {
  const res = await client.integration.delete({ id });
  console.log(res);
}

main().catch(console.error);