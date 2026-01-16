import { client } from "./client";
import { vars } from "./vars";

import { readFile } from "fs/promises";

const knowledgeId = vars.knowledgeId;

async function loadLocalFile(path: string, type = "application/pdf") {
  const buffer = await readFile(path);
  const filename = path.split("/").pop();
  const file = new File([buffer], filename!, {
    type,
    lastModified: Date.now()
  });

  return file;
}

async function main() {
  try {
    const file = await loadLocalFile(vars.ingestFilePath, vars.ingestFileType);
    const res = await client.knowledge.ingest({ knowledgeId }, { file });
    console.log(res);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));

  }
}

main().catch(console.error);