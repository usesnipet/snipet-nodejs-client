import {
  createKnowledgeMutation,
  createKnowledgeMutationRequest,
  deleteKnowledgeMutation,
  deleteKnowledgePathParams,
  findKnowledgeByIDPathParams,
  findKnowledgeByIDQuery,
  findKnowledgeQuery,
  findKnowledgeQueryParams,
  KnowledgeGetStatusPathParams,
  KnowledgeGetStatusQuery,
  KnowledgeIngestFileMutation,
  KnowledgeIngestFilePathParams,
  updateKnowledgeMutation,
  updateKnowledgeMutationRequest,
  updateKnowledgePathParams
} from "../gen";
import { TypedFetcher } from "../http-client";

export function knowledge(fetcher: TypedFetcher, formDataFetcher: TypedFetcher) {
  const moduleUrl = '/api/knowledge';
  return {
    findById: (params: findKnowledgeByIDPathParams) => fetcher<findKnowledgeByIDQuery>(`${moduleUrl}/${params.id}`),
    find: (query: findKnowledgeQueryParams) => fetcher<findKnowledgeQuery>(`${moduleUrl}`, { query }),
    create: (body: createKnowledgeMutationRequest) => fetcher<createKnowledgeMutation>(`${moduleUrl}`, { body, method: 'POST' }),
    update: (params: updateKnowledgePathParams, body: updateKnowledgeMutationRequest) => fetcher<updateKnowledgeMutation>(`${moduleUrl}/${params.id}`, { body, method: 'PUT' }),
    delete: (params: deleteKnowledgePathParams) => fetcher<deleteKnowledgeMutation>(`${moduleUrl}/${params.id}`, { method: 'DELETE' }),
    ingest: (params: KnowledgeIngestFilePathParams, body: { metadata?: Record<string, any>, externalId?: string | null, file: File }) => {
      return formDataFetcher<KnowledgeIngestFileMutation>(`${moduleUrl}/${params.knowledgeId}/ingest-file`, {
        method: 'POST',
        body: body,
      });
    },
    getIngestStatus: (params: KnowledgeGetStatusPathParams) => {
      return fetcher<KnowledgeGetStatusQuery>(`${moduleUrl}/status/${params.id}`, {
        method: 'GET'
      });
    }
  };
}
