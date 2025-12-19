import { useTopAnimeInfinite } from "@/query/useTop";
import InfiniteAnimeGrid from "@/components/infinite-anime-grid";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

const MostPopularPage = () => {
  const query = useTopAnimeInfinite({
    filter: "bypopularity",
    limit: 24,
  });

  return (
    <InfiniteAnimeGrid
      query={query as UseInfiniteQueryResult<unknown>}
      title="Most Popular"
    />
  );
};

export default MostPopularPage;
