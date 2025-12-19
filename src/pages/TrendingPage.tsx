import { useTopAnimeInfinite } from "@/query/useTop";
import InfiniteScrollContainer from "@/components/common/infinite-scroll-container";
import PageHeader from "@/components/common/page-header";
import SkeletonGrid from "@/components/common/skeleton-grid";
import AnimeCard from "@/components/common/anime-card";
import type { Anime } from "@/type/anime";

const TrendingPage = () => {
  const query = useTopAnimeInfinite({
    filter: "airing",
    type: "tv",
    limit: 24,
  });

  return (
    <InfiniteScrollContainer<Anime> query={query}>
      {({ items, isLoading, isFetchingNextPage, loadMoreRef }) => (
        <>
          <PageHeader title="Trending" description="Top airing anime ranked" />

          {isLoading ? (
            <SkeletonGrid count={24} />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {items.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>

              {isFetchingNextPage && (
                <SkeletonGrid
                  count={6}
                  gridClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4"
                />
              )}

              <div ref={loadMoreRef} className="h-10" />
            </>
          )}
        </>
      )}
    </InfiniteScrollContainer>
  );
};

export default TrendingPage;
