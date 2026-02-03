import { File } from "node:buffer";
import {
  createKnowledgeMutation,
  createKnowledgeMutationRequest,
  deleteKnowledgeAssetMutation,
  deleteKnowledgeAssetPathParams,
  deleteKnowledgeMutation,
  deleteKnowledgePathParams,
  findKnowledgeAssetPathParams,
  findKnowledgeAssetQuery,
  findKnowledgeAssetQueryParams,
  findKnowledgeByIDPathParams,
  findKnowledgeByIDQuery,
  findKnowledgeQuery,
  findKnowledgeQueryParams,
  KnowledgeAssetGetStatusPathParams,
  KnowledgeAssetGetStatusQuery,
  KnowledgeAssetIngestFileMutation,
  KnowledgeAssetIngestFilePathParams,
  updateKnowledgeMutation,
  updateKnowledgeMutationRequest,
  updateKnowledgePathParams
} from "../gen";
import { TypedFetcher } from "../http-client";

export function knowledge(fetcher: TypedFetcher, formDataFetcher: TypedFetcher) {
  const moduleUrl = '/api/knowledge';
  return {
    findById: (params: findKnowledgeByIDPathParams) => fetcher<findKnowledgeByIDQuery>(`${moduleUrl}/${params.id}`),
    find: (query?: findKnowledgeQueryParams) => fetcher<findKnowledgeQuery>(`${moduleUrl}`, { query }),
    create: (body: createKnowledgeMutationRequest) => fetcher<createKnowledgeMutation>(`${moduleUrl}`, { body, method: 'POST' }),
    update: (params: updateKnowledgePathParams, body: updateKnowledgeMutationRequest) => fetcher<updateKnowledgeMutation>(`${moduleUrl}/${params.id}`, { body, method: 'PUT' }),
    delete: (params: deleteKnowledgePathParams) => fetcher<deleteKnowledgeMutation>(`${moduleUrl}/${params.id}`, { method: 'DELETE' }),
    ingest: (params: KnowledgeAssetIngestFilePathParams, body: { metadata?: Record<string, any>, externalId?: string | null, file: File, saveFile: boolean }) => {
      return formDataFetcher<KnowledgeAssetIngestFileMutation>(`${moduleUrl}/${params.knowledgeId}/asset/ingest-file`, {
        method: 'POST',
        body: body,
      });
    },
    getIngestStatus: (params: KnowledgeAssetGetStatusPathParams) => {
      return fetcher<KnowledgeAssetGetStatusQuery>(`${moduleUrl}${params.knowledgeId}/asset/ingest/${params.id}`, {
        method: 'GET'
      });
    },
    getAssets: (params: findKnowledgeAssetPathParams, query?: findKnowledgeAssetQueryParams) => {
      return fetcher<findKnowledgeAssetQuery>(`${moduleUrl}/${params.knowledgeId}/asset`, {
        query,
        method: 'GET'
      });
    },
    deleteAsset: (params: deleteKnowledgeAssetPathParams) => {
      return fetcher<deleteKnowledgeAssetMutation>(`${moduleUrl}/${params.knowledgeId}/asset/${params.id}`, {
        method: 'DELETE'
      });
    },
  };
}
