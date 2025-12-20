import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducersInfinite } from "@/query/useProducers";
import { InfiniteScrollContainer, PageHeader } from "@/components/common";
import ProducerCard from "@/components/features/producers/producer-card";
import MasonryGrid from "@/components/ui/masonry-grid";
import type { Producers } from "@/type/producers";
import type { ProducersParams } from "@/type/producers";
import MasonrySkeletonGrid from "@/components/features/producers/producer-card-skeleton";
import ProducerFilters from "@/components/features/producers/ProducerFilters";

const ProducersPage = () => {
  const [searchParams] = useSearchParams();

  // Parse URL params to API params
  const apiParams = useMemo((): Omit<ProducersParams, "page"> => {
    const params: Omit<ProducersParams, "page"> = {
      limit: 24,
    };

    const q = searchParams.get("q");
    if (q) {
      params.q = q;
    }

    const orderBy = searchParams.get("order_by");
    if (orderBy && ["mal_id", "count", "favorites", "established"].includes(orderBy)) {
      params.order_by = orderBy as ProducersParams["order_by"];
    } else {
      params.order_by = "favorites"; // default
    }

    const sort = searchParams.get("sort");
    if (sort && (sort === "asc" || sort === "desc")) {
      params.sort = sort as ProducersParams["sort"];
    } else {
      params.sort = "desc"; // default
    }

    return params;
  }, [searchParams]);

  const query = useProducersInfinite(apiParams);

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
