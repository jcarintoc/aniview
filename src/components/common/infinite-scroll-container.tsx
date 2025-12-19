import { useEffect, useRef } from "react";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import ErrorState from "@/components/error-state";
import type { Pagination } from "@/type/common";

// Generic type for API responses with pagination
interface PaginatedResponse<T> {
  pagination: Pagination;
  data: T[];
}

// Props passed to the children function
export interface InfiniteScrollRenderProps<T> {
  items: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

interface InfiniteScrollContainerProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: UseInfiniteQueryResult<any>;

  // Children as a function - full control over rendering
  children: (props: InfiniteScrollRenderProps<T>) => React.ReactNode;

  // Optional wrapper className
  className?: string;

  // Whether to scroll to top on mount
  scrollToTop?: boolean;
}

const InfiniteScrollContainer = <T,>({
  query,
  children,
  className = "max-w-7xl mx-auto mt-20 p-3 sm:p-5",
  scrollToTop = true,
}: InfiniteScrollContainerProps<T>) => {
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
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollToTop]);

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
  const items: T[] =
    data?.pages.flatMap((page: PaginatedResponse<T>) => page.data) ?? [];

  if (isError) {
    return <ErrorState refetch={() => refetch()} isFetching={isRefetching} />;
  }

  return (
    <main className={className}>
      {children({
        items,
        isLoading,
        isFetchingNextPage,
        hasNextPage: hasNextPage ?? false,
        loadMoreRef,
      })}
    </main>
  );
};

export default InfiniteScrollContainer;
