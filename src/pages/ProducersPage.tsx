import { useProducerParams } from "@/hooks/useProducerParams";
import { useProducersInfinite } from "@/query/useProducers";
import { InfiniteScrollContainer, PageHeader } from "@/components/common";
import ProducerCard from "@/components/features/producers/producer-card";
import MasonryGrid from "@/components/ui/masonry-grid";
import type { Producers } from "@/type/producers";
import MasonrySkeletonGrid from "@/components/features/producers/producer-card-skeleton";
import ProducerFilters from "@/components/features/producers/ProducerFilters";

const ProducersPage = () => {
  const { params } = useProducerParams();

  const query = useProducersInfinite(params);

  return (
    <InfiniteScrollContainer<Producers> query={query}>
      {({ items, isLoading, isFetchingNextPage, loadMoreRef }) => (
        <>
          <PageHeader
            title="Producers & Studios"
            description="Explore anime studios and production companies"
          />

          <ProducerFilters />

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
