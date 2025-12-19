import { Badge } from "@/components/ui/badge";
import AnimeCard from "@/components/anime-card";
import EmptyState from "@/components/empty-state";
import { ClientPagination } from "@/components/ui/client-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Anime } from "@/type/anime";
import type { Pagination } from "@/type/common";
import { TYPES, STATUS, RATINGS, OrderBy, SORT, GENRES } from "@/lib/data";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { X } from "lucide-react";

interface CatalogContainerProps {
  animeData: Anime[];
  pagination?: Pagination;
  isLoading?: boolean;
}

const CatalogContainer = ({
  animeData,
  pagination,
  isLoading,
}: CatalogContainerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get active filters from URL params
  const activeFilters = useMemo(() => {
    const filters: Array<{ label: string; value: string }> = [];

    const type = searchParams.get("type");
    if (type) {
      const typeLabel = TYPES.find((t) => t.value === type)?.label;
      if (typeLabel) filters.push({ label: typeLabel, value: type });
    }

    const status = searchParams.get("status");
    if (status) {
      const statusLabel = STATUS.find((s) => s.value === status)?.label;
      if (statusLabel) filters.push({ label: statusLabel, value: status });
    }

    const rating = searchParams.get("rating");
    if (rating) {
      const ratingLabel = RATINGS.find((r) => r.value === rating)?.label;
      if (ratingLabel) filters.push({ label: ratingLabel, value: rating });
    }

    const genres = searchParams.get("genres");
    if (genres) {
      const genreIds = genres.split(",").map((g) => parseInt(g.trim(), 10));
      genreIds.forEach((id) => {
        const genre = GENRES.find((g) => g.mal_id === id);
        if (genre) filters.push({ label: genre.name, value: id.toString() });
      });
    }

    const orderBy = searchParams.get("order_by");
    if (orderBy) {
      const orderByLabel = OrderBy.find((o) => o.value === orderBy)?.label;
      if (orderByLabel) filters.push({ label: orderByLabel, value: orderBy });
    }

    const sort = searchParams.get("sort");
    if (sort) {
      const sortLabel = SORT.find((s) => s.value === sort)?.label;
      if (sortLabel) filters.push({ label: sortLabel, value: sort });
    }

    return filters;
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams, { replace: true });
  };

  const handleRemoveFilter = (filterValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Try to remove from different param types
    if (newParams.get("type") === filterValue) {
      newParams.delete("type");
    } else if (newParams.get("status") === filterValue) {
      newParams.delete("status");
    } else if (newParams.get("rating") === filterValue) {
      newParams.delete("rating");
    } else if (newParams.get("order_by") === filterValue) {
      newParams.delete("order_by");
    } else if (newParams.get("sort") === filterValue) {
      newParams.delete("sort");
    } else {
      // Handle genres (comma-separated)
      const genres = newParams.get("genres");
      if (genres) {
        const genreArray = genres.split(",").filter((g) => g !== filterValue);
        if (genreArray.length > 0) {
          newParams.set("genres", genreArray.join(","));
        } else {
          newParams.delete("genres");
        }
      }
    }

    // Reset to page 1 when filters change
    newParams.delete("page");
    setSearchParams(newParams, { replace: true });
  };

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
                  onClick={() => handleRemoveFilter(filter.value)}
                >
                  {filter.label} <X strokeWidth={3} className="size-2 mt-px group-hover:text-destructive" />
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
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.last_visible_page > 1 && (
              <div className="mt-8 flex justify-center">
                <ClientPagination
                  currentPage={pagination.current_page}
                  totalPages={pagination.last_visible_page}
                  onPageChange={handlePageChange}
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
