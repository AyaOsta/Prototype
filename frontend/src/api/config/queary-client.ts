import type { QueryObserverOptions } from "react-query";
import { QueryClient } from "react-query";

const defaultQueryConfig: QueryObserverOptions = { cacheTime: 60_000 };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: defaultQueryConfig,
  },
});

export default queryClient;
