import { MutationOptions, useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { useResponseApi } from "../api/response.api";

const QUERY_KEY = "responses";

export function getQueryKey(
  filters?: Record<string, unknown>,
  modifiers?: string[]
) {
  if (filters === undefined || Object.keys(filters).length === 0) {
    return [QUERY_KEY];
  }

  return [QUERY_KEY, filters];
}

export const useCreateResponse = (options?: MutationOptions) => {
  const { create } = useResponseApi();
  const ongoingMutationCount = useRef(0);

  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: create,
    onMutate: () => {
      ongoingMutationCount.current++;
    },
    onSettled: () => {
      ongoingMutationCount.current -= 1;

      if (ongoingMutationCount.current === 0) {
        void queryClient.invalidateQueries(getQueryKey());
      }
    },
    ...options,
  });
};
