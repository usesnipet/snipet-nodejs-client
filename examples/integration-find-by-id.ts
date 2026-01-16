import { client } from "./client";
import { vars } from "./vars";

const id = vars.integrationId;

async function main() {
  const res = await client.integration.findById({ id });
  console.log(res);
}

main().catch(console.error);