import CarouselImage from "@/components/carousel-image";
import { SunSnow } from "lucide-react";
import AnimeCard from "@/components/anime-card";
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
          <AnimeCard
            key={anime.title + anime.year}
            mal_id={anime.mal_id}
            anime_title={anime.title}
            genre={anime.genres[0].name}
            rating={anime.score}
            year={anime.year || null}
            embed_url={anime.trailer.embed_url ?? null}
            image_url={anime.images.webp.large_image_url}
          />
        )}
        path="/season-now"
      />
    </section>
  );
};

export default SeasonNowSection;
