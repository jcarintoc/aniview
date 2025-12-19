import { api } from "./config";
import type {
  GetAnimeByIdResponse,
  GetAnimeCharactersResponse,
  GetAnimeEpisodesResponse,
  GetAllAnimeParams,
  GetAllAnimeResponse,
} from "@/type/anime";

export const getAllAnime = async (
  params?: GetAllAnimeParams
): Promise<GetAllAnimeResponse> => {
  // Convert params to API format - genres should be comma-separated string
  const apiParams: Record<string, unknown> = {};
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert genres array to comma-separated string
        if (key === "genres" && Array.isArray(value)) {
          if (value.length > 0) {
            apiParams[key] = value.join(",");
          }
        } else {
          apiParams[key] = value;
        }
      }
    });
  }

  const response = await api.get<GetAllAnimeResponse>("/anime", { 
    params: apiParams 
  });
  return {
    pagination: response.data.pagination,
    data: response.data.data,
  };
};

export const getAnimeById = async (
  id: string
): Promise<GetAnimeByIdResponse> => {
  const response = await api.get<GetAnimeByIdResponse>(`/anime/${id}`);
  return response.data;
};

export const getAnimeCharacters = async (
  id: string
): Promise<GetAnimeCharactersResponse> => {
  const response = await api.get<GetAnimeCharactersResponse>(
    `anime/${id}/characters`
  );
  return response.data;
};

export const getAnimeEpisodes = async (
  id: string,
  page: number = 1
): Promise<GetAnimeEpisodesResponse> => {
  const response = await api.get<GetAnimeEpisodesResponse>(
    `anime/${id}/episodes`,
    { params: { page } }
  );
  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
};
