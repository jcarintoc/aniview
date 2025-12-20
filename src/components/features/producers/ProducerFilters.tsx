import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select01 from "@/components/ui/select-01";
import { useDebounce } from "@/hooks/useDebounce";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const orderBy = searchParams.get("order_by") || "favorites";
  const sort = searchParams.get("sort") || "desc";

  // Update URL when debounced query changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedQuery.trim()) {
      newParams.set("q", debouncedQuery.trim());
    } else {
      newParams.delete("q");
    }

    setSearchParams(newParams, { replace: true });
  }, [debouncedQuery, setSearchParams]);

  const handleOrderByChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", value);
    setSearchParams(newParams, { replace: true });
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
      {/* Search Input */}
      <div className="relative w-full sm:w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/50" />
        <Input
          type="text"
          placeholder="Search producers or studios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-border text-sm w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 w-full">
        {/* Sort By Select */}
        <div className="w-full sm:w-40">
          <Select01
            value={orderBy}
            onChange={handleOrderByChange}
            options={ORDER_BY_OPTIONS}
            placeholder="Sort by..."
            label="Sort By"
          />
        </div>

        {/* Order Select */}
        <div className="w-full sm:w-40">
          <Select01
            value={sort}
            onChange={handleSortChange}
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
