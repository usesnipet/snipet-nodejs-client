import { Observable } from "rxjs";

export function parseSSEEvent<T>(chunk: string): T | null {
  let data: string | undefined;

  for (const line of chunk.split("\n")) {
    if (line.startsWith("data:")) {
      data = line.replace("data:", "").trim();
    }
  }
  let json: any | undefined = undefined;
  try {
    if (data) json = JSON.parse(data);
  } catch (e) {
    console.error(e);

  }

  return (json || data) as T;
}

export type StreamMutationShape<T = unknown> = {
  Response: T;
  PathParams?: Record<string, string | number>;
  QueryParams?: Record<string, string | number | undefined>;
};

export type StreamFetcher = <M extends StreamMutationShape>(
  path: string,
  options?: {
    pathParams?: M["PathParams"];
    query?: M["QueryParams"];
    headers?: HeadersInit;
  }
) => Observable<M["Response"]>;


export const createStreamClient = (
  baseUrl: string,
  apiKey?: string
): { streamFetcher: StreamFetcher } => {
  const resolveUrl = (
    path: string,
    pathParams?: Record<string, string | number>,
    query?: Record<string, string | number | undefined>
  ) => {
    let finalPath = path;

    if (pathParams) {
      for (const [key, value] of Object.entries(pathParams)) {
        finalPath = finalPath.replace(
          `:${key}`,
          encodeURIComponent(String(value))
        );
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
    streamFetcher: <M extends StreamMutationShape>(path: Parameters<StreamFetcher>[0], options: Parameters<StreamFetcher>[1] = {}) => {
      return new Observable((subscriber) => {
        const controller = new AbortController();
        const url = resolveUrl(path, options.pathParams, options.query);

        fetch(url, {
          headers: {
            Accept: "text/event-stream",
            "x-api-key": apiKey ?? "",
            ...options.headers,
          },
          signal: controller.signal,
        })
          .then(async (res) => {
            if (!res.ok || !res.body) {
              subscriber.error(
                new Error(
                  `SSE connection failed: ${res.status} ${res.statusText}`
                )
              );
              return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
              const { value, done } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });

              const events = buffer.split("\n\n");
              buffer = events.pop() ?? "";

              for (const rawEvent of events) {
                const parsed = parseSSEEvent<M["Response"]>(rawEvent);
                if (parsed) subscriber.next(parsed);
              }
            }

            subscriber.complete();
          })
          .catch((err) => {
            if (!controller.signal.aborted) {
              subscriber.error(err);
            }
          });

        return () => {
          controller.abort();
        };
      }) as Observable<M["Response"]>;
    },
  };
};
