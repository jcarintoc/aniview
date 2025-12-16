import { api } from "./config";
import type {
  GetSeasonAnimeParams,
  GetSeasonAnimeResponse,
} from "@/type/season";

export const getSeasonNow = async (
  params?: GetSeasonAnimeParams
): Promise<GetSeasonAnimeResponse> => {
  const { data } = await api.get<GetSeasonAnimeResponse>("/seasons/now", {
    params,
  });
  return data;
};
