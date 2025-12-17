import { useQuery } from "@tanstack/react-query";
import { getRecommendedAnime } from "@/api/recommended";

export const useRecommendedAnime = (id: string) => {
  return useQuery({
    queryKey: ["recommended-anime", id],
    queryFn: () => getRecommendedAnime(id),
    enabled: !!id,
  });
};
