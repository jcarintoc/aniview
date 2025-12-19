import CarouselImage from "@/components/common/carousel-image";
import { Flame } from "lucide-react";
import AnimeCard from "@/components/common/anime-card";
import { useTopAnime } from "@/query/useTop";

const TrendingSection = () => {
  const { data: topAnime, isLoading } = useTopAnime({
    filter: "airing",
    type: "tv",
    limit: 10,
  });

  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage
        sectionTitle="Trending"
        Icon={Flame}
        data={topAnime?.data ?? []}
        isLoading={isLoading}
        keyExtractor={(item) => item.title}
        renderItem={(anime) => (
          <AnimeCard key={anime.title + anime.year} anime={anime} />
        )}
        path="/trending"
      />
    </section>
  );
};

export default TrendingSection;
