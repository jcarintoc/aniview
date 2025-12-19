import CarouselImage from "@/components/common/carousel-image";
import { SunSnow } from "lucide-react";
import AnimeCard from "@/components/common/anime-card";
import { useSeasonNow } from "@/query/useSeason";

const SeasonNowSection = () => {
  const { data: topAnime, isLoading } = useSeasonNow({ limit: 10 });

  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage
        sectionTitle="Season Now"
        Icon={SunSnow}
        data={topAnime?.data ?? []}
        isLoading={isLoading}
        keyExtractor={(item) => item.title}
        renderItem={(anime) => (
          <AnimeCard key={anime.title + anime.year} anime={anime} />
        )}
        path="/season-now"
      />
    </section>
  );
};

export default SeasonNowSection;
