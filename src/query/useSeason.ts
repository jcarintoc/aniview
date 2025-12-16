import { useQuery } from "@tanstack/react-query";
import { getSeasonNow } from "@/api/season";

export const useSeasonNow = () => {
  return useQuery({
    queryKey: ["season", "now"],
    queryFn: () => getSeasonNow(),
  });
};
