import { client } from "./client";

async function main() {
  const res = await client.apiKey.self();
  console.log(res);
}

main().catch(console.error);