import { client } from "./client";
import { vars } from "./vars";

const id = vars.apiKeyId;

async function main() {
  try {
    const res = await client.apiKey.update({ id }, { name: "Updated Api key Name" });
    console.log("Update response:", JSON.stringify(res, null, 2));
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
}

main().catch(console.error);