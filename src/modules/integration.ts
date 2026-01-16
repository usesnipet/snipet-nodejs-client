import { 
  createIntegrationMutation,
  createIntegrationMutationRequest,
  deleteIntegrationMutation,
  deleteIntegrationPathParams,
  findIntegrationByIDPathParams,
  findIntegrationByIDQuery,
  findIntegrationQuery,
  findIntegrationQueryParams,
  updateIntegrationMutation,
  updateIntegrationMutationRequest,
  updateIntegrationPathParams 
} from "../gen";
import { TypedFetcher } from "../http-client";

export function integration(fetcher: TypedFetcher) {
  const moduleUrl = '/api/integration';
  return {
    findById: (params: findIntegrationByIDPathParams) => fetcher<findIntegrationByIDQuery>(`${moduleUrl}/${params.id}`),
    find: (query: findIntegrationQueryParams) => fetcher<findIntegrationQuery>(`${moduleUrl}`, { query }),
    create: (body: createIntegrationMutationRequest) => fetcher<createIntegrationMutation>(`${moduleUrl}`, { body, method: 'POST' }),
    update: (params: updateIntegrationPathParams, body: updateIntegrationMutationRequest) => fetcher<updateIntegrationMutation>(`${moduleUrl}/${params.id}`, { body, method: 'PUT' }),
    delete: (params: deleteIntegrationPathParams) => fetcher<deleteIntegrationMutation>(`${moduleUrl}/${params.id}`, { method: 'DELETE' }),
  };
}
