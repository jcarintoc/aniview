import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { parseSearchParams, paramsToSearchParams } from "@/lib/utils/urlParams";
import { TYPES, STATUS, RATINGS, OrderBy, SORT, GENRES } from "@/lib/data";
import type { GetAllAnimeParams } from "@/type/anime";

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

/**
 * Custom hook that encapsulates all catalog URL search param logic.
 * Any component on the catalog page can import this hook to read/write filters.
 */
export function useCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL → typed params (memoized)
  const params = useMemo(() => parseSearchParams(searchParams), [searchParams]);

  // Replace all filter params at once (used by Sidebar form submit)
  const setParams = useCallback(
    (newParams: GetAllAnimeParams) => {
      setSearchParams(paramsToSearchParams(newParams), { replace: true });
    },
    [setSearchParams],
  );

  // Update a single page param without touching filters
  const setPage = useCallback(
    (page: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", page.toString());
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // Remove a single filter by its value (for badge dismiss)
  const removeFilter = useCallback(
    (filterValue: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          // Check each simple param
          const simpleKeys = [
            "type",
            "status",
            "rating",
            "order_by",
            "sort",
          ] as const;
          for (const key of simpleKeys) {
            if (next.get(key) === filterValue) {
              next.delete(key);
              next.delete("page");
              return next;
            }
          }

          // Handle genres (comma-separated)
          const genres = next.get("genres");
          if (genres) {
            const genreArray = genres
              .split(",")
              .filter((g) => g !== filterValue);
            if (genreArray.length > 0) {
              next.set("genres", genreArray.join(","));
            } else {
              next.delete("genres");
            }
          }

          next.delete("page");
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Compute active filter badges from URL
  const activeFilters = useMemo((): ActiveFilter[] => {
    const filters: ActiveFilter[] = [];

    const type = searchParams.get("type");
    if (type) {
      const label = TYPES.find((t) => t.value === type)?.label;
      if (label) filters.push({ key: "type", label, value: type });
    }

    const status = searchParams.get("status");
    if (status) {
      const label = STATUS.find((s) => s.value === status)?.label;
      if (label) filters.push({ key: "status", label, value: status });
    }

    const rating = searchParams.get("rating");
    if (rating) {
      const label = RATINGS.find((r) => r.value === rating)?.label;
      if (label) filters.push({ key: "rating", label, value: rating });
    }

    const genres = searchParams.get("genres");
    if (genres) {
      const genreIds = genres.split(",").map((g) => parseInt(g.trim(), 10));
      genreIds.forEach((id) => {
        const genre = GENRES.find((g) => g.mal_id === id);
        if (genre)
          filters.push({
            key: "genres",
            label: genre.name,
            value: id.toString(),
          });
      });
    }

    const orderBy = searchParams.get("order_by");
    if (orderBy) {
      const label = OrderBy.find((o) => o.value === orderBy)?.label;
      if (label) filters.push({ key: "order_by", label, value: orderBy });
    }

    const sort = searchParams.get("sort");
    if (sort) {
      const label = SORT.find((s) => s.value === sort)?.label;
      if (label) filters.push({ key: "sort", label, value: sort });
    }

    return filters;
  }, [searchParams]);

  return {
    params,
    activeFilters,
    setParams,
    setPage,
    removeFilter,
    resetFilters,
  };
}
