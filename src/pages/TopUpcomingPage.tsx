import { useTopAnimeInfinite } from "@/query/useTop";
import InfiniteAnimeGrid from "@/components/infinite-anime-grid";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

const TopUpcomingPage = () => {
  const query = useTopAnimeInfinite({
    filter: "upcoming",
    limit: 24,
  });

  return (
    <InfiniteAnimeGrid
      query={query as UseInfiniteQueryResult<unknown>}
      title="Top Upcoming"
    />
  );
};

export default TopUpcomingPage;
