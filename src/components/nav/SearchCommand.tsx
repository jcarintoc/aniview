import { Input } from "../ui/input";
import { Search, ScanSearch } from "lucide-react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAllAnime } from "@/query/useAnime";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { MoveDown, MoveUp, CornerDownLeft } from "lucide-react";

const SearchCommand = ({ handleClose }: { handleClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(searchQuery.trim(), 500);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fetch anime based on debounced query
  const queryParams = debouncedQuery
    ? { q: debouncedQuery, limit: 10 }
    : undefined;
  const { data, isLoading, isFetching, isError } = useAllAnime(queryParams);

  const results = useMemo(() => data?.data ?? [], [data]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseWithReset();
        return;
      }

      if (!results.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleAnimeClick(results[selectedIndex].mal_id);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  // Clear search when modal closes
  const handleCloseWithReset = useCallback(() => {
    setSelectedIndex(-1);
    handleClose();
  }, [handleClose]);

  const handleAnimeClick = useCallback(
    (malId: number) => {
      navigate(`/anime/${malId}`);
      handleCloseWithReset();
    },
    [navigate, handleCloseWithReset]
  );

  // Memoize derived state
  const isSearching = isFetching || isLoading;
  const hasQuery = debouncedQuery.length > 0;
  const hasResults = results.length > 0;

  const showLoading = isSearching && hasQuery;
  const showResults = hasQuery && !isSearching && !isError && hasResults;
  const showEmptyState = hasQuery && !isSearching && !isError && !hasResults;
  const showError = isError && hasQuery;
  const showPlaceholder = !hasQuery && !isSearching && !isError;

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      // Fallback to a placeholder image or hide the image
      e.currentTarget.src = "/no-image.png"; // or hide with style.display = 'none'
    },
    []
  );

  return (
    <div
      onClick={handleCloseWithReset}
      role="dialog"
      aria-modal="true"
      aria-label="Search anime"
      tabIndex={0}
      className="z-30 fixed bg-black/50 left-0 top-0 h-screen w-screen flex pt-24 justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white/20 backdrop-blur-2xl h-fit rounded-2xl shadow-lg p-2 space-y-0 flex flex-col"
      >
        <div className="relative">
          <Search
            className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-accent/50 border-white/15 py-5 pl-9 text-white placeholder:text-white/50"
            placeholder="Search for an anime..."
            aria-label="Search anime input"
            aria-autocomplete="list"
            aria-expanded={showResults}
          />
        </div>

        <ScrollArea
          className={cn("py-2", showResults && "h-[300px] sm:h-[400px]")}
        >
          {showLoading && (
            <div className="space-y-3 px-2" role="status" aria-live="polite">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-10 aspect-3/4 rounded bg-white/10" />
                  <Skeleton className="h-5 flex-1 bg-white/10" />
                </div>
              ))}
            </div>
          )}

          {showResults && (
            <div
              ref={resultsRef}
              className="space-y-2"
              role="listbox"
              aria-label="Search results"
            >
              {results.map((anime, index) => (
                <div
                  key={anime.mal_id}
                  onClick={() => handleAnimeClick(anime.mal_id)}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={cn(
                    "flex items-center gap-4 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors",
                    index === selectedIndex && "bg-white/10"
                  )}
                >
                  <img
                    src={anime.images.webp.small_image_url}
                    alt={anime.title}
                    className="w-10 aspect-3/4 rounded object-cover"
                    loading="lazy"
                    onError={handleImageError}
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

          {showError && (
            <div
              className="flex flex-col items-center gap-4 px-4 py-6"
              role="alert"
              aria-live="polite"
            >
              <p className="font-secondary text-white/70">
                Something went wrong. Please try again.
              </p>
            </div>
          )}

          {showEmptyState && (
            <div className="flex flex-col items-center gap-4 px-4 py-6">
              <ScanSearch
                className="size-12 text-white/50"
                aria-hidden="true"
              />
              <p className="font-secondary text-white/70">Anime not found</p>
            </div>
          )}

          {showPlaceholder && (
            <div className="flex flex-col items-center gap-4 px-4 py-6">
              <p className="font-secondary text-white/70">
                Start typing to search...
              </p>
            </div>
          )}
        </ScrollArea>

        {showResults && (
          <div className="p-0">
            <Link
              to={`/catalog?q=${debouncedQuery}`}
              onClick={handleCloseWithReset}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full hover:bg-black/10 hover:text-white"
              )}
            >
              View All Results
            </Link>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 w-full mt-2">
          <div className="flex items-center gap-2">
            <p className="text-xs text-white/65">Navigation</p>
            <KbdGroup>
              <Kbd>
                <MoveDown />
              </Kbd>
              <Kbd>
                <MoveUp />
              </Kbd>
            </KbdGroup>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs text-white/65">Enter</p>
            <Kbd>
              <CornerDownLeft />
            </Kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCommand;
