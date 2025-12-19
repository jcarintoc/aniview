import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getSeasonNow } from "@/api/season";
import type { GetSeasonAnimeParams } from "@/type/season";

export const useSeasonNow = (params?: GetSeasonAnimeParams) => {
  return useQuery({
    queryKey: ["season", "now", params],
    queryFn: () => getSeasonNow(params),
  });
};

export const useSeasonNowInfinite = (
  params?: Omit<GetSeasonAnimeParams, "page">
) => {
  return useInfiniteQuery({
    queryKey: ["season", "now", "infinite", params],
    queryFn: ({ pageParam = 1 }) => getSeasonNow({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
  });
};
