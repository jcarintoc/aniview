import { useQuery } from "@tanstack/react-query";
import { getTopAnime } from "@/api/top";
import type { GetTopAnimeParams } from "@/type/top";

export const useTopAnime = (params?: GetTopAnimeParams) => {
  return useQuery({
    queryKey: ["top-anime", params],
    queryFn: () => getTopAnime(params),
  });
};
