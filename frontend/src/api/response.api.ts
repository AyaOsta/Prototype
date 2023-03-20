import { client } from "./config/config";
import { CreateResponseDto } from "./interface/response.interface";

export const useResponseApi = () => {
  const BASE_ENDPOINT = "responses/";
  const create = async (dto: CreateResponseDto) => {
    return client
      .url(BASE_ENDPOINT)
      .post(dto)
      .json((data) => data);
  };

  return {
    create,
  };
};
