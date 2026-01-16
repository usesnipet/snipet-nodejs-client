import { client } from "./client";

async function main() {
  const res = await client.knowledge.create({ name: "My Knowledge", namespace: "my-namespace" });
  console.log(res);
}

main().catch(console.error);