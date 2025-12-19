import { useTopAnimeInfinite } from "@/query/useTop";
import InfiniteAnimeGrid from "@/components/infinite-anime-grid";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

const TrendingPage = () => {
  const query = useTopAnimeInfinite({
    filter: "airing",
    type: "tv",
    limit: 24,
  });

  return (
    <InfiniteAnimeGrid
      query={query as UseInfiniteQueryResult<unknown>}
      title="Trending"
    />
  );
};

export default TrendingPage;
