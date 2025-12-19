import { Input } from "../ui/input";
import { Search, ScanSearch } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAllAnime } from "@/query/useAnime";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const SearchCommand = ({ handleClose }: { handleClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQueryRef = useRef<string>("");

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch anime based on debounced query
  const queryParams = debouncedQuery.trim()
    ? { q: debouncedQuery.trim(), limit: 10 }
    : undefined;
  const { data, isLoading, isFetching, isError } = useAllAnime(queryParams);

  // Update current query ref when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      currentQueryRef.current = debouncedQuery.trim();
    }
  }, [debouncedQuery]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Clear search when modal closes
  const handleCloseWithReset = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    currentQueryRef.current = "";
    handleClose();
  };

  const handleAnimeClick = (malId: number) => {
    navigate(`/anime/${malId}`);
    handleCloseWithReset();
  };

  // Only show results when not fetching AND data matches current query (prevents showing stale cached data)
  const isSearching = isFetching || isLoading;
  const dataMatchesQuery =
    !debouncedQuery.trim() || currentQueryRef.current === debouncedQuery.trim();
  const hasResults = data && data.data.length > 0 && dataMatchesQuery;
  const showEmptyState =
    debouncedQuery.trim() &&
    !isSearching &&
    !hasResults &&
    !isError &&
    dataMatchesQuery;
  const showResults =
    debouncedQuery.trim() && hasResults && !isSearching && !isError;

  return (
    <div
      onClick={handleCloseWithReset}
      tabIndex={0}
      className="z-30 fixed bg-black/50 left-0 top-0 h-screen w-screen flex pt-24 justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white/20 backdrop-blur-2xl h-fit rounded-2xl shadow-lg p-2 space-y-0 flex flex-col"
      >
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-accent/50 border-white/15 py-5 pl-9 text-white placeholder:text-white/50"
            placeholder="Search for an anime..."
          />
        </div>

        <ScrollArea
          className={`${
            showResults ? "h-[300px] sm:h-[400px]" : "h-full"
          } py-2`}
        >
          {isSearching && (
            <div className="space-y-3 px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-10 aspect-3/4 rounded bg-white/10" />
                  <Skeleton className="h-5 flex-1 bg-white/10" />
                </div>
              ))}
            </div>
          )}

          {showResults && (
            <div className="space-y-2">
              {data.data.map((anime) => (
                <div
                  key={anime.mal_id}
                  onClick={() => handleAnimeClick(anime.mal_id)}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <img
                    src={anime.images.webp.small_image_url}
                    alt={anime.title}
                    className="w-10 aspect-3/4 rounded object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {anime.title}
                    </p>
                    {anime.title_english && (
                      <p className="text-white/70 text-sm truncate">
                        {anime.title_english}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && debouncedQuery.trim() && (
            <div className="flex flex-col items-center gap-4 px-4 py-6">
              <p className="font-secondary text-white/70">
                Something went wrong. Please try again.
              </p>
            </div>
          )}

          {showEmptyState && (
            <div className="flex flex-col items-center gap-4 px-4 py-6">
              <ScanSearch className="size-12 text-white/50" />
              <p className="font-secondary text-white/70">Anime not found</p>
            </div>
          )}

          {!debouncedQuery.trim() && !isSearching && !isError && (
            <div className="flex flex-col items-center gap-4 px-4 py-6">
              <p className="font-secondary text-white/70">
                Start typing to search...
              </p>
            </div>
          )}
        </ScrollArea>

        {showResults && (
          <div className="p-2">
            <Link
              to={`/catalog?q=${debouncedQuery}`}
              onClick={handleClose}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full hover:bg-black/10 hover:text-white"
              )}
            >
              View All Results
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCommand;
