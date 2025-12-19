import type { ProducersParams } from "@/type/producers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducers } from "@/api/producers";

export const useProducersInfinite = (
  params?: Omit<ProducersParams, "page">
) => {
  return useInfiniteQuery({
    queryKey: ["producers-infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      getAllProducers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
  });
};
