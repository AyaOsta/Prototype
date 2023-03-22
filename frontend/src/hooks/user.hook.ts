import { useUserApi } from "../api/user.api";
import {
  MutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRef } from "react";
import toast from "react-hot-toast";

const QUERY_KEY = "users";

export function getQueryKey(
  filters?: Record<string, unknown>,
  modifiers?: string[]
) {
  if (filters === undefined || Object.keys(filters).length === 0) {
    return [QUERY_KEY];
  }

  return [QUERY_KEY, filters];
}

export const useCreateUser = (options?: MutationOptions) => {
  const { create } = useUserApi();
  const ongoingMutationCount = useRef(0);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onMutate: () => {
      ongoingMutationCount.current++;
    },
    onSettled: () => {
      ongoingMutationCount.current -= 1;

      if (ongoingMutationCount.current === 0) {
        void queryClient.invalidateQueries(getQueryKey());
        void queryClient.removeQueries(getQueryKey());
      }
    },
    ...options,
  });
};

export const useGetMajor = (enabled: boolean, id?: number) => {
  const { getMajor } = useUserApi();

  const query = useQuery<{}>(getQueryKey(), () => getMajor(id), {
    keepPreviousData: true,
    enabled: Boolean(id) && enabled,
    onError: (err: any) => {
      if (
        err.response?.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        toast.error(
          (err.response.data as Record<string, unknown>).message as string
        );
      }
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
    refetch: async () => {
      await query.refetch();
    },
  };
};
