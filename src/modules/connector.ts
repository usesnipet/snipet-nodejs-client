import { 
  createConnectorMutation,
  createConnectorMutationRequest,
  createConnectorPathParams,
  deleteConnectorMutation,
  deleteConnectorPathParams,
  findConnectorByIDPathParams,
  findConnectorByIDQuery,
  findConnectorPathParams,
  findConnectorQuery,
  findConnectorQueryParams,
  updateConnectorMutation,
  updateConnectorMutationRequest,
  updateConnectorPathParams 
} from "../gen";
import { TypedFetcher } from "../http-client";

export function connector(fetcher: TypedFetcher) {
  const moduleUrl = (knowledgeId: string) => `/api/knowledge/${knowledgeId}/connector`;
  return {
    findById: (params: findConnectorByIDPathParams) => fetcher<findConnectorByIDQuery>(`${moduleUrl(params.knowledgeId)}/${params.id}`),
    find: (params: findConnectorPathParams, query?: findConnectorQueryParams) => fetcher<findConnectorQuery>(`${moduleUrl(params.knowledgeId)}`, { query }),
    create: (params: createConnectorPathParams, body: createConnectorMutationRequest) => fetcher<createConnectorMutation>(`${moduleUrl(params.knowledgeId)}`, { body, method: 'POST' }),
    update: (params: updateConnectorPathParams, body: updateConnectorMutationRequest) => fetcher<updateConnectorMutation>(`${moduleUrl(params.knowledgeId)}/${params.id}`, { body, method: 'PUT' }),
    delete: (params: deleteConnectorPathParams) => fetcher<deleteConnectorMutation>(`${moduleUrl(params.knowledgeId)}/${params.id}`, { method: 'DELETE' }),
  };
}
