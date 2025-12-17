import AnimeCardRecommended from "@/components/anime-card-recommended";
import CarouselImage from "@/components/carousel-image";
import { useRecommendedAnime } from "@/query/useRecommended";
import { ThumbsUp } from "lucide-react";

const Recommended = ({ id }: { id: string }) => {
  const { data: recommendedAnime, isLoading } = useRecommendedAnime(id);

  console.log(recommendedAnime);

  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage
        sectionTitle="You might also like"
        Icon={ThumbsUp}
        data={recommendedAnime?.data ?? []}
        isLoading={isLoading}
        keyExtractor={(item) => item.entry.title}
        renderItem={(anime) => (
          <AnimeCardRecommended
            key={anime.entry.title}
            mal_id={anime.entry.mal_id}
            image_jpg_url={anime.entry.images.jpg.image_url}
            image_webp_url={anime.entry.images.webp.image_url}
            title={anime.entry.title}
          />
        )}
      />
    </section>
  );
};

export default Recommended;
