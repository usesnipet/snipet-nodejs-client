import {
  createSnipetMutation,
  createSnipetMutationRequest,
  createSnipetPathParams,
  deleteSnipetMutation,
  deleteSnipetPathParams,
  ExecuteSnipetDto,
  ExecuteSnipetResponseDto,
  findSnipetByIDPathParams,
  findSnipetByIDQuery,
  findSnipetPathParams,
  findSnipetQuery,
  findSnipetQueryParams,
  SnipetStreamQuery,
  updateSnipetMutation,
  updateSnipetMutationRequest,
  updateSnipetPathParams,
  ViewViewPathParams,
  ViewViewQuery,
  ViewViewQueryParams,
} from "../gen";
import { TypedFetcher } from "../http-client";
import { StreamFetcher } from "../stream-client";


export type ExecutionEvent = {
  event:
    "start" |
    "context.start" | "context.read-knowledge" | "context.read-snipet" | "context.read-connector" | "context.finish" |
    "action.start" | "action.plan" | "action.execute" | "action.finish" |
    "output.start" | "output.data" | "output.streaming" | "output.finish" |
    "finish";
  payload?: any;
}

export function snipet(fetcher: TypedFetcher, streamFetcher: StreamFetcher) {
  const moduleUrl = (knowledgeId: string) => `/api/knowledge/${knowledgeId}/snipet`;
  return {
    findById: (params: findSnipetByIDPathParams) => fetcher<findSnipetByIDQuery>(`${moduleUrl(params.knowledgeId)}/${params.id}`),
    find: (params: findSnipetPathParams, query?: findSnipetQueryParams) => fetcher<findSnipetQuery>(`${moduleUrl(params.knowledgeId)}`, { query }),
    create: (params: createSnipetPathParams, body: createSnipetMutationRequest) => fetcher<createSnipetMutation>(`${moduleUrl(params.knowledgeId)}`, { body, method: "POST" }),
    update: (params: updateSnipetPathParams, body: updateSnipetMutationRequest) => fetcher<updateSnipetMutation>(`${moduleUrl(params.knowledgeId)}/${params.id}`, { body, method: "PUT" }),
    delete: (params: deleteSnipetPathParams) => fetcher<deleteSnipetMutation>(`${moduleUrl(params.knowledgeId)}/${params.id}`, { method: "DELETE" }),

    execute: async (params: { knowledgeId: string, snipetId: string }, body: ExecuteSnipetDto) => {
      const execution = await fetcher<{
        Response: ExecuteSnipetResponseDto
      }>(`${moduleUrl(params.knowledgeId)}/${params.snipetId}/execute`, { body, method: 'POST' });
      return streamFetcher<{
        PathParams: SnipetStreamQuery["PathParams"];
        Response: ExecutionEvent;
      }>(
        `${moduleUrl(params.knowledgeId)}/${params.snipetId}/stream/${execution.executionId}`
      );
    },

    view: async (params: ViewViewPathParams, query: ViewViewQueryParams) => {
      return fetcher<ViewViewQuery>(
        `${moduleUrl(params.knowledgeId)}/${params.snipetId}/view`,
        { query }
      );
    }
  };
}
