import { api } from "./config";
import type { RecommendedAnimeResponse } from "@/type/recommended";

export const getRecommendedAnime = async (
  id: string
): Promise<RecommendedAnimeResponse> => {
  const response = await api.get<RecommendedAnimeResponse>(
    `/anime/${id}/recommendations`
  );
  return response.data;
};
