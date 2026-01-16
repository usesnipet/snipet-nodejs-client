import dotenv from "dotenv";
dotenv.config();

export const vars = {
  knowledgeId: process.env.KNOWLEDGE_ID || "<knowledge-id>",
  snipetId: process.env.SNIPET_ID || "<snipet-id>",
  connectorId: process.env.CONNECTOR_ID || "<connector-id>",
  integrationId: process.env.INTEGRATION_ID || "<integration-id>",
  apiKeyId: process.env.API_KEY_ID || "<api-key-id>",
  ingestId: process.env.INGEST_ID || "<ingest-id>",
  ingestFilePath: process.env.INGEST_FILE_PATH || "<ingest-file-path>",
  ingestFileType: process.env.INGEST_FILE_TYPE || "application/pdf"
}