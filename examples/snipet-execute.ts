import { ExecuteSnipetDto } from "../src/gen";
import { client } from "./client";
import { vars } from "./vars";

const knowledgeId = vars.knowledgeId;
const snipetId = vars.snipetId;

const execute: ExecuteSnipetDto = {
  options: {
    intent: "answer",
    query: "Hello, who are you?",
    stream: true,
    persistenceType: "full",
  }
}

async function main() {
  try {
    const res = await client.snipet.execute({ knowledgeId, snipetId }, execute);
    res.subscribe((event) => {
      console.log(event);
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
}

main().catch(console.error);