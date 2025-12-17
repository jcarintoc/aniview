import DetailHeader from "@/components/features/details/DetailHeader";
import { useAnimeById } from "@/query/useAnime";
import { useParams } from "react-router-dom";
import AnimeTabs from "@/components/features/details/AnimeTabs";

const AnimeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: anime } = useAnimeById(id);
  const animeDetails = anime && anime.data;

  if (!animeDetails) return <div>No anime found</div>;

  return (
    <main>
      <DetailHeader
        anime_image={animeDetails.images.webp.large_image_url}
        anime_title={animeDetails.title}
        rating={animeDetails.score}
        trailer_url={animeDetails.trailer.embed_url}
      />

      <AnimeTabs animeId={id!} animeData={animeDetails} />
    </main>
  );
};

export default AnimeDetailsPage;
