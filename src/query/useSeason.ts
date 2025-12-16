import { useQuery } from "@tanstack/react-query";
import { getSeasonNow } from "@/api/season";
import type { GetSeasonAnimeParams } from "@/type/season";

export const useSeasonNow = (params?: GetSeasonAnimeParams) => {
  return useQuery({
    queryKey: ["season", "now", params],
    queryFn: () => getSeasonNow(params),
  });
};
