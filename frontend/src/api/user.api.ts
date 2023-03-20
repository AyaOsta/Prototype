import { client } from "./config/config";

export const useUserApi = () => {
  const BASE_ENDPOINT = "users";
  const create = async () => {
    return client
      .url(`${BASE_ENDPOINT}/`)
      .post()
      .json((data) => data);
  };

  const getMajor = async (id?: number) => {
    if (!id) {
      return;
    }
    return client.get(`${BASE_ENDPOINT}/${id}/major`).json((data) => data);
  };

  return {
    create,
    getMajor,
  };
};
