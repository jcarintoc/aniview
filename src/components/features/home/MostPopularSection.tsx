import CarouselImage from "@/components/carousel-image";
import { ChessQueen } from "lucide-react";
import { useTopAnime } from "@/query/useTop";
import AnimeCard from "@/components/anime-card";

const MostPopularSection = () => {
  const { data: topAnime, isLoading } = useTopAnime({
    filter: "bypopularity",
    limit: 10,
  });

  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage
        sectionTitle="Most Popular"
        Icon={ChessQueen}
        data={topAnime?.data ?? []}
        isLoading={isLoading}
        keyExtractor={(item) => item.title}
        renderItem={(anime) => (
          <AnimeCard
            key={anime.title + anime.year}
            anime_title={anime.title}
            genre={anime.genres[0].name}
            rating={anime.score}
            year={anime.year || null}
            embed_url={anime.trailer.embed_url ?? null}
            image_url={anime.images.webp.large_image_url}
          />
        )}
        path="/most-popular"
      />
    </section>
  );
};

export default MostPopularSection;
