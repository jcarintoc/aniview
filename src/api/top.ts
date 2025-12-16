import { api } from "./config";
import type { GetTopAnimeParams, GetTopAnimeResponse } from "@/type/top";

export const getTopAnime = async (
  params?: GetTopAnimeParams
): Promise<GetTopAnimeResponse> => {
  const response = await api.get<GetTopAnimeResponse>("/top/anime", { params });
  return response.data;
};
