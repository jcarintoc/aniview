import { useProducersInfinite } from "@/query/useProducers";
import { InfiniteScrollContainer, PageHeader } from "@/components/common";
import ProducerCard from "@/components/features/producers/producer-card";
import MasonryGrid from "@/components/ui/masonry-grid";
import { Skeleton } from "@/components/ui/skeleton";
import type { Producers } from "@/type/producers";

// Custom skeleton for masonry look
const MasonrySkeletonGrid = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton
            className={`w-full rounded-xl ${
              i % 3 === 0
                ? "aspect-[3/4]"
                : i % 2 === 0
                ? "aspect-video"
                : "aspect-square"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

const ProducersPage = () => {
  const query = useProducersInfinite({
    order_by: "favorites",
    sort: "desc",
    limit: 24,
  });

  return (
    <InfiniteScrollContainer<Producers> query={query}>
      {({ items, isLoading, isFetchingNextPage, loadMoreRef }) => (
        <>
          <PageHeader
            title="Producers & Studios"
            description="Explore anime studios and production companies"
          />

          {isLoading ? (
            <MasonrySkeletonGrid count={16} />
          ) : (
            <>
              {/* Masonry Layout */}
              <MasonryGrid
                items={items}
                renderItem={(producer, index) => (
                  <ProducerCard
                    key={`${producer.mal_id}-${index}`}
                    producer={producer}
                    index={index}
                  />
                )}
                breakpointCols={{
                  default: 4,
                  1100: 3,
                  700: 2,
                  500: 1,
                }}
              />

              {isFetchingNextPage && <MasonrySkeletonGrid count={4} />}

              <div ref={loadMoreRef} className="h-10" />
            </>
          )}
        </>
      )}
    </InfiniteScrollContainer>
  );
};

export default ProducersPage;
