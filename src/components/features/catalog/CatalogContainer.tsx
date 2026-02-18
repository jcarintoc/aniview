import { Badge } from "@/components/ui/badge";
import AnimeCard from "@/components/common/anime-card";
import EmptyState from "@/components/empty-state";
import { ClientPagination } from "@/components/ui/client-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Anime } from "@/type/anime";
import type { Pagination } from "@/type/common";
import type { ActiveFilter } from "@/hooks/useCatalogParams";
import { X } from "lucide-react";

interface CatalogContainerProps {
  animeData: Anime[];
  pagination?: Pagination;
  isLoading?: boolean;
  activeFilters: ActiveFilter[];
  onRemoveFilter: (filterValue: string) => void;
  onPageChange: (page: number) => void;
}

const CatalogContainer = ({
  animeData,
  pagination,
  isLoading,
  activeFilters = [],
  onRemoveFilter,
  onPageChange,
}: CatalogContainerProps) => {
  return (
    <main className="bg-black/35 w-full rounded-[1.05rem] p-3">
      {/* Applied Filters */}
      {activeFilters.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="font-secondary text-sm">Applied filters:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={`${filter.value}-${index}`}
                  className="cursor-pointer pt-1 space-x-2 inline-flex items-start gap-2 group"
                  onClick={() => onRemoveFilter(filter.value)}
                >
                  {filter.label}{" "}
                  <X
                    strokeWidth={3}
                    className="size-2 mt-px group-hover:text-destructive"
                  />
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Anime Grid */}
      <section>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <Skeleton key={i} className="aspect-3/4 rounded-lg" />
            ))}
          </div>
        ) : animeData.length === 0 ? (
          <EmptyState
            className="mt-8"
            title="No anime found"
            description="Try adjusting your filters to see more results"
          />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {animeData.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.last_visible_page > 1 && (
              <div className="mt-8 flex justify-center">
                <ClientPagination
                  currentPage={pagination.current_page}
                  totalPages={pagination.last_visible_page}
                  onPageChange={onPageChange}
                  scrollToTopOnChange={true}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default CatalogContainer;
