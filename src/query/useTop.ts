import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getTopAnime } from "@/api/top";
import type { GetTopAnimeParams } from "@/type/top";

export const useTopAnime = (params?: GetTopAnimeParams) => {
  return useQuery({
    queryKey: ["top-anime", params],
    queryFn: () => getTopAnime(params),
  });
};

export const useTopAnimeInfinite = (params?: Omit<GetTopAnimeParams, "page">) => {
  return useInfiniteQuery({
    queryKey: ["top-anime-infinite", params],
    queryFn: ({ pageParam = 1 }) => getTopAnime({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
  });
};
