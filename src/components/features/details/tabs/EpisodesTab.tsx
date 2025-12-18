import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import TabsHeader from "../TabsHeader";
import { Link } from "lucide-react";
import { useAnimeEpisodes } from "@/query/useAnime";
import { ClientPagination } from "@/components/ui/client-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/empty-state";

const EpisodesTab = ({ animeId }: { animeId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: episodes, isLoading } = useAnimeEpisodes(animeId, currentPage);

  const onUrlClick = (url: string) => {
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-8 p-4">
        <Skeleton className="hidden sm:block sticky top-32 w-18 h-96" />
        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="w-full h-32 sm:h-20 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!episodes || episodes.data.length === 0) {
    return <EmptyState className="mt-8" title="No episodes found"/>;
  }

  const totalPages = episodes.pagination.last_visible_page;

  return (
    <div className="p-4 flex sm:flex-row flex-col items-center sm:items-start sm:gap-8">
      <TabsHeader className="sticky top-32">Episodes</TabsHeader>
      <div className="w-full flex flex-col gap-4">
        <div>
          {episodes.data.length > 0 &&
            episodes.data.map((episode) => (
              <div
                key={episode.mal_id}
                className={`flex sm:flex-row flex-col gap-4 first:border-t last:border-b-0 border-b border-x-transparent w-full p-2 hover:bg-card/50 group`}
              >
                <div className="p-0 sm:p-4 sm:bg-card rounded-md sm:aspect-video w-fit sm:w-32 text-2xl font-secondary flex items-center justify-center shadow-lg group-hover:sm:bg-primary">
                  <h1 ><span className="sm:hidden">Episode </span>{episode.mal_id}</h1>
                </div>
                <div className="flex flex-col justify-between gap-2 py-1">
                  <h2 className="inline-flex flex-wrap items-center gap-2 sm:text-base text-sm">
                    {episode.title}{" "}
                    <Link
                      onClick={() => onUrlClick(episode.url)}
                      className="size-4 text-blue-400 hover:text-blue-300 cursor-pointer"
                    />
                  </h2>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        episode.filler
                          ? "bg-yellow-400 text-black"
                          : "bg-primary"
                      }
                    >
                      {episode.filler ? "Fillter" : "Canon"}
                    </Badge>
                    {episode.recap && (
                      <Badge className="bg-primary">Recap</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          scrollToTopOnChange={true}
        />
      </div>
    </div>
  );
};

export default EpisodesTab;
