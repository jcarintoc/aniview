import { useState, useMemo, useEffect } from "react";

export interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
  resetOnDataChange?: boolean;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export function usePagination<T>({
  data,
  itemsPerPage = 24,
  resetOnDataChange = true,
}: UsePaginationOptions<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedData, totalPages } = useMemo(() => {
    if (!data || data.length === 0) {
      return { paginatedData: [], totalPages: 0 };
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return { paginatedData, totalPages };
  }, [data, currentPage, itemsPerPage]);

  // Reset to page 1 when data changes
  useEffect(() => {
    if (resetOnDataChange) {
      setCurrentPage(1);
    }
  }, [data.length, resetOnDataChange]);

  // Clamp current page to valid range
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  };
}
