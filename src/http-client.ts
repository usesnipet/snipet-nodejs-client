export type Fetcher = <T>(path: string, options?: RequestInit) => Promise<T>;

type MutationShape = {
  Response: unknown;
  Request?: unknown;
  PathParams?: Record<string, any>;
  QueryParams?: Record<string, any>;
  Errors?: unknown;
};


export type TypedFetcher = <M extends MutationShape>(
  path: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    pathParams?: M["PathParams"];
    query?: M["QueryParams"];
    body?: M["Request"];
    headers?: HeadersInit;
  }
) => Promise<M["Response"]>;

export const createHttpClient = (
  baseUrl: string,
  apiKey: string
): { fetcher: TypedFetcher, formDataFetcher: TypedFetcher } => {
  const resolveUrl = (
    path: string,
    pathParams?: Record<string, string | number>,
    query?: Record<string, string | number | string[] | undefined>
  ) => {
    let finalPath = path;

    if (pathParams) {
      for (const [key, value] of Object.entries(pathParams)) {
        finalPath = finalPath.replace(`:${key}`, encodeURIComponent(String(value)));
      }
    }

    const queryString = query
      ? "?" +
        new URLSearchParams(
          Object.entries(query)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        ).toString()
      : "";

    return `${baseUrl}${finalPath}${queryString}`;
  };

  return {
    fetcher: async (path, options = {}) => {
      const url = resolveUrl(path, options.pathParams, options.query);
      console.log(url);

      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!response.ok) {
        throw await response.json().catch(() => ({}));
      }

      return response.json();
    },
    formDataFetcher: async (path, options = {}) => {
      const url = resolveUrl(path, options.pathParams, options.query);
      const formData = new FormData();
      Object.entries(options.body as Record<string, any>).forEach(([key, value]) => {
        formData.append(key, value);
      })
      const response = await fetch(url, {
        method: options.method ?? "POST",
        headers: {
          "x-api-key": apiKey,
          ...options.headers
        },
        body: formData
      });

      if (!response.ok) {
        throw await response.json().catch(() => ({}));
      }

      return response.json();
    }

  };
};
