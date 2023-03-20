import { client } from "./config/config";

export const useQuestionsApi = () => {
  const BASE_ENDPOINT = "questions/";
  const getAll = async () => {
    const response = await client.get(BASE_ENDPOINT).json((res) => res);
    console.log(response);
    return response;
  };

  return { getAll };
};
