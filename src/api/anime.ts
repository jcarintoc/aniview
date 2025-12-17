import { api } from "./config";
import type {
  GetAnimeByIdResponse,
  GetAnimeCharactersResponse,
  GetAnimeEpisodesResponse,
} from "@/type/anime";

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
