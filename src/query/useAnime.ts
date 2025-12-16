import { useQuery } from "@tanstack/react-query";
import { getAnimeById } from "@/api/anime";

export const useAnimeById = (id?: string) => {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(id!),
    enabled: !!id,
  });
};
