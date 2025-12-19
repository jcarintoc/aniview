import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import CatalogContainer from "@/components/features/catalog/CatalogContainer";
import Sidebar from "@/components/features/catalog/Sidebar";
import { useAllAnime } from "@/query/useAnime";
import { parseSearchParams } from "@/lib/utils/urlParams";
import type { GetAllAnimeParams } from "@/type/anime";
import ErrorState from "@/components/error-state";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse URL params to API params - memoized to prevent unnecessary re-parsing
  const apiParams = useMemo(() => parseSearchParams(searchParams), [searchParams]);

  // Fetch anime data
  const {
    data: animeData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAllAnime({ ...apiParams, limit: 24 });

  // Handler to update URL params when filters change
  const handleFiltersChange = (newParams: GetAllAnimeParams) => {
    const newSearchParams = new URLSearchParams();
    
    // Only add non-empty params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newSearchParams.set(key, value.join(","));
          }
        } else {
          newSearchParams.set(key, String(value));
        }
      }
    });

    setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto mt-[4.3rem] sm:mt-16 p-3 sm:p-5">
      <div className="bg-accent/65 rounded-[1.25rem] p-2 flex flex-col md:flex-row gap-2">
        <Sidebar 
          initialParams={apiParams}
          onFiltersChange={handleFiltersChange}
        />

        {isError ? (
          <ErrorState refetch={refetch} isFetching={isFetching} />
        ) : (
          <CatalogContainer 
            animeData={animeData?.data || []}
            pagination={animeData?.pagination}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
