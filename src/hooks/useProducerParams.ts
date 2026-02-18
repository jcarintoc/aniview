import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProducersParams } from "@/type/producers";

const VALID_ORDER_BY = ["mal_id", "count", "favorites", "established"] as const;
const VALID_SORT = ["asc", "desc"] as const;

/**
 * Custom hook that encapsulates all producer URL search param logic.
 * Any component on the producers page can import this hook to read/write filters.
 */
export function useProducerParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL → typed params (memoized)
  const params = useMemo((): Omit<ProducersParams, "page"> => {
    const result: Omit<ProducersParams, "page"> = {
      limit: 24,
    };

    const q = searchParams.get("q");
    if (q) result.q = q;

    const orderBy = searchParams.get("order_by");
    if (orderBy && (VALID_ORDER_BY as readonly string[]).includes(orderBy)) {
      result.order_by = orderBy as ProducersParams["order_by"];
    } else {
      result.order_by = "favorites";
    }

    const sort = searchParams.get("sort");
    if (sort && (VALID_SORT as readonly string[]).includes(sort)) {
      result.sort = sort as ProducersParams["sort"];
    } else {
      result.sort = "desc";
    }

    return result;
  }, [searchParams]);

  // Derived values for controlled inputs
  const query = searchParams.get("q") || "";
  const orderBy = searchParams.get("order_by") || "favorites";
  const sort = searchParams.get("sort") || "desc";

  // Uses functional updater to avoid stale closure bugs
  const setQuery = useCallback(
    (q: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (q.trim()) {
            next.set("q", q.trim());
          } else {
            next.delete("q");
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setOrderBy = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("order_by", value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("sort", value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return {
    params,
    query,
    orderBy,
    sort,
    setQuery,
    setOrderBy,
    setSort,
  };
}
