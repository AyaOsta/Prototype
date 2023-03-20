import { useQuery } from "react-query";
import { useQuestionsApi } from "../api/questions.api";
import { QuestionSchema } from "../schema/question.schema";
import toast from "react-hot-toast";

const QUERY_KEY = "questions";

export function getQueryKey(
  filters?: Record<string, unknown>,
  modifiers?: string[]
) {
  if (filters === undefined || Object.keys(filters).length === 0) {
    return [QUERY_KEY];
  }

  return [QUERY_KEY, filters];
}

export const useGetQuestions = () => {
  const questionsApi = useQuestionsApi();

  const query = useQuery<QuestionSchema[]>(
    getQueryKey(),
    ({}) => questionsApi.getAll(),
    {
      keepPreviousData: true,
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
    }
  );

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
