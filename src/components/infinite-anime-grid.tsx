import { useEffect, useRef } from "react";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import AnimeCard from "@/components/anime-card";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/error-state";
import type { Anime } from "@/type/anime";
import type { Pagination } from "@/type/common";

// Generic type for API responses with pagination
interface PaginatedResponse {
  pagination: Pagination;
  data: Anime[];
}

interface InfiniteAnimeGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: UseInfiniteQueryResult<any>;
  title: string;
  initialSkeletonCount?: number;
  loadingSkeletonCount?: number;
}

const InfiniteAnimeGrid = ({
  query,
  title,
  initialSkeletonCount = 24,
  loadingSkeletonCount = 6,
}: InfiniteAnimeGridProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = query;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Intersection Observer for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into a single array
  const allAnime: Anime[] =
    data?.pages.flatMap((page: PaginatedResponse) => page.data) ?? [];

  if (isError) {
    return <ErrorState refetch={() => refetch()} isFetching={isRefetching} />;
  }

  return (
    <main className="max-w-7xl mx-auto mt-8 p-3 sm:p-5">
      <br />
      <br />
      <h1 className="text-2xl sm:text-3xl font-bold font-secondary mb-4">
        {title}
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: initialSkeletonCount }).map((_, i) => (
            <Skeleton key={i} className="aspect-3/4 rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {allAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>

          {/* Loading indicator at the bottom */}
          {isFetchingNextPage && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
              {Array.from({ length: loadingSkeletonCount }).map((_, i) => (
                <Skeleton key={i} className="aspect-3/4 rounded-lg" />
              ))}
            </div>
          )}

          {/* Intersection Observer target */}
          <div ref={loadMoreRef} className="h-10" />
        </>
      )}
    </main>
  );
};

export default InfiniteAnimeGrid;
