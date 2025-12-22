import { ChessQueen } from "lucide-react";
import { useTopAnime } from "@/query/useTop";
import AnimeCard from "@/components/common/anime-card";
import ViewMoreButton from "@/components/ui/view-more-button";
import { useNavigate } from "react-router-dom";
import useMobile from "@/hooks/useMobile";
import { Skeleton } from "@/components/ui/skeleton";

const MostPopularSection = () => {
  const isMobile = useMobile();

  const limitCount = isMobile ? 20 : 21;

  const { data: topAnime, isLoading } = useTopAnime({
    filter: "bypopularity",
    limit: limitCount,
  });

  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0 space-y-4 mb-20">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <ChessQueen className="size-4 sm:size-6" />
          <h1 className="font-secondary text-base sm:text-xl">Most Popular</h1>
        </div>
        <ViewMoreButton onClick={() => navigate("/most-popular")}>
          View more
        </ViewMoreButton>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {isLoading
          ? Array.from({ length: limitCount }).map((_, index) => (
              <div key={index}>
                <Skeleton className="aspect-3/4 rounded-2xl" />
              </div>
            ))
          : topAnime?.data.map((anime) => (
              <AnimeCard key={anime.title + anime.year} anime={anime} />
            ))}
      </div>
    </section>
  );
};

export default MostPopularSection;
