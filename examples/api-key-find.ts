import { client } from "./client";

async function main() {
  const res = await client.apiKey.find();
  console.log(res);
}

main().catch(console.error);