import { api } from "./config";
import type { GetAnimeByIdResponse } from "@/type/anime";

export const getAnimeById = async (
  id: string
): Promise<GetAnimeByIdResponse> => {
  const response = await api.get<GetAnimeByIdResponse>(`/anime/${id}`);
  return response.data;
};
