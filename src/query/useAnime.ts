import { useQuery } from "@tanstack/react-query";
import {
  getAnimeById,
  getAnimeCharacters,
  getAnimeEpisodes,
} from "@/api/anime";

export const useAnimeById = (id?: string) => {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(id!),
    enabled: !!id,
  });
};

export const useAnimeCharacters = (id?: string) => {
  return useQuery({
    queryKey: ["anime-characters", id],
    queryFn: () => getAnimeCharacters(id!),
    enabled: !!id,
  });
};

export const useAnimeEpisodes = (id?: string, page: number = 1) => {
  return useQuery({
    queryKey: ["anime-episodes", id, page],
    queryFn: () => getAnimeEpisodes(id!, page),
    enabled: !!id,
  });
};
