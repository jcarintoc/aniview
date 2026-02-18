import { useCatalogParams } from "@/hooks/useCatalogParams";
import CatalogContainer from "@/components/features/catalog/CatalogContainer";
import Sidebar from "@/components/features/catalog/Sidebar";
import { useAllAnime } from "@/query/useAnime";
import ErrorState from "@/components/error-state";

const CatalogPage = () => {
  const { params, activeFilters, setParams, setPage, removeFilter } =
    useCatalogParams();

  // Fetch anime data
  const {
    data: animeData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAllAnime({ ...params, limit: 24 });

  return (
    <div className="max-w-7xl mx-auto mt-[4.3rem] sm:mt-16 p-3 sm:p-5">
      <div className="bg-accent/65 rounded-[1.25rem] p-2 flex flex-col md:flex-row gap-2">
        <Sidebar initialParams={params} onFiltersChange={setParams} />

        {isError ? (
          <ErrorState refetch={refetch} isFetching={isFetching} />
        ) : (
          <CatalogContainer
            animeData={animeData?.data || []}
            pagination={animeData?.pagination}
            isLoading={isLoading}
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
