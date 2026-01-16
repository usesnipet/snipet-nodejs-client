import {
  IngestGetStatusPathParams,
  IngestGetStatusQuery,
  IngestIngestMutation,
  IngestIngestPathParams,
} from "../gen";
import { TypedFetcher } from "../http-client";

export function ingest(fetcher: TypedFetcher, formDataFetcher: TypedFetcher) {
  const moduleUrl = (knowledgeId: string, connectorId: string) => `knowledge/${knowledgeId}/connector/${connectorId}/ingest`;
  return {
    run: (params: IngestIngestPathParams, body: { metadata?: Record<string, any>, externalId?: string | null, file: File }) => {
      return formDataFetcher<IngestIngestMutation>(moduleUrl(params.knowledgeId, params.connectorId), {
        method: 'POST',
        body: body
      });
    },
    getStatus: (params: IngestGetStatusPathParams) => {
      return fetcher<IngestGetStatusQuery>(`${moduleUrl(params.knowledgeId, params.connectorId)}/status/${params.id}`, {
        method: 'GET'
      });
    }
  };
}
