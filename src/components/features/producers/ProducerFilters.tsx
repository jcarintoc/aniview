import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select01 from "@/components/ui/select-01";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducerParams } from "@/hooks/useProducerParams";

const ORDER_BY_OPTIONS = [
  { label: "Favorites", value: "favorites" },
  { label: "Anime Count", value: "count" },
  { label: "Established", value: "established" },
  { label: "ID", value: "mal_id" },
];

const SORT_OPTIONS = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
];

const ProducerFilters = () => {
  const { query, orderBy, sort, setQuery, setOrderBy, setSort } =
    useProducerParams();
  const [searchInput, setSearchInput] = useState(query);
  const debouncedInput = useDebounce(searchInput, 500);

  // Sync debounced input → URL (no stale closure — setQuery uses functional updater)
  useEffect(() => {
    setQuery(debouncedInput);
  }, [debouncedInput, setQuery]);

  // Sync URL → local input when URL changes externally
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
      {/* Search Input */}
      <div className="relative w-full sm:w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/50" />
        <Input
          type="text"
          placeholder="Search producers or studios..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-9 border-border text-sm w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 w-full">
        {/* Sort By Select */}
        <div className="w-full sm:w-40">
          <Select01
            value={orderBy}
            onChange={setOrderBy}
            options={ORDER_BY_OPTIONS}
            placeholder="Sort by..."
            label="Sort By"
          />
        </div>

        {/* Order Select */}
        <div className="w-full sm:w-40">
          <Select01
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS}
            placeholder="Order..."
            label="Order"
          />
        </div>
      </div>
    </div>
  );
};

export default ProducerFilters;
