import { integration } from "./modules/integration";
import { connector } from "./modules/connector";
import { knowledge } from "./modules/knowledge";
import { apiKey as apiKeyModule } from "./modules/api-key";
import { snipet } from "./modules/snipet";
import { createHttpClient } from "./http-client";
import { createStreamClient } from "./stream-client";

export class SnipetClient {
  integration: ReturnType<typeof integration>;
  connector: ReturnType<typeof connector>;
  knowledge: ReturnType<typeof knowledge>;
  apiKey: ReturnType<typeof apiKeyModule>;
  snipet: ReturnType<typeof snipet>;

  constructor({ apiKey, baseUrl }: { baseUrl?: string; apiKey?: string }) {
    baseUrl = baseUrl ?? "http://localhost:3002";
    apiKey = apiKey ?? "";
    const { fetcher, formDataFetcher } = createHttpClient(baseUrl, apiKey);
    const { streamFetcher } = createStreamClient(baseUrl, apiKey);

    this.integration = integration(fetcher);
    this.connector = connector(fetcher);
    this.knowledge = knowledge(fetcher, formDataFetcher);
    this.apiKey = apiKeyModule(fetcher);
    this.snipet = snipet(fetcher, streamFetcher);
  }
}
