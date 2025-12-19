import { useQuery } from "@tanstack/react-query";
import {
  getAnimeById,
  getAnimeCharacters,
  getAnimeEpisodes,
  getAllAnime,
} from "@/api/anime";
import type { GetAllAnimeParams } from "@/type/anime";
import { createAnimeQueryKey } from "@/lib/utils/urlParams";

export const useAllAnime = (params?: GetAllAnimeParams) => {
  // For search queries (with 'q' parameter), use shorter staleTime to prevent showing stale results
  const isSearchQuery = params?.q !== undefined;
  
  return useQuery({
    queryKey: createAnimeQueryKey(params),
    queryFn: () => getAllAnime(params),
    enabled: params !== undefined,
    staleTime: isSearchQuery ? 0 : 5 * 60 * 1000, // Search queries are always stale, others are fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes - cache persists for 10 minutes (formerly cacheTime)
    placeholderData: isSearchQuery ? undefined : undefined, // Don't show placeholder data for search queries
  });
};

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
