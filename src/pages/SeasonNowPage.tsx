import { useSeasonNowInfinite } from "@/query/useSeason";
import InfiniteAnimeGrid from "@/components/infinite-anime-grid";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

const SeasonNowPage = () => {
  const query = useSeasonNowInfinite({
    limit: 24,
  });

  return (
    <InfiniteAnimeGrid
      query={query as UseInfiniteQueryResult<unknown>}
      title="Season Now"
    />
  );
};

export default SeasonNowPage;
