import { 
  ApiKeySelfQuery,
  createApiKeyMutation,
  createApiKeyMutationRequest,
  deleteApiKeyMutation,
  deleteApiKeyPathParams,
  findApiKeyByIDPathParams,
  findApiKeyByIDQuery,
  findApiKeyQuery,
  findApiKeyQueryParams,
  updateApiKeyMutation,
  updateApiKeyMutationRequest,
  updateApiKeyPathParams 
} from "../gen";
import { TypedFetcher } from "../http-client";

export function apiKey(fetcher: TypedFetcher) {
  const moduleUrl = '/api/api-key';
  return {
    findById: (params: findApiKeyByIDPathParams) => fetcher<findApiKeyByIDQuery>(`${moduleUrl}/${params.id}`),
    find: (query?: findApiKeyQueryParams) => fetcher<findApiKeyQuery>(`${moduleUrl}`, { query }),
    create: (body: createApiKeyMutationRequest) => fetcher<createApiKeyMutation>(`${moduleUrl}`, { body, method: 'POST' }),
    update: (params: updateApiKeyPathParams, body: updateApiKeyMutationRequest) => fetcher<updateApiKeyMutation>(`${moduleUrl}/${params.id}`, { body, method: 'PUT' }),
    delete: (params: deleteApiKeyPathParams) => fetcher<deleteApiKeyMutation>(`${moduleUrl}/${params.id}`, { method: 'DELETE' }),
    self: () => fetcher<ApiKeySelfQuery>(`${moduleUrl}/self`),
  };
}
