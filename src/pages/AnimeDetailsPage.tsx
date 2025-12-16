import DetailHeader from "@/components/features/details/DetailHeader";
import { useAnimeById } from "@/query/useAnime";
import { useParams } from "react-router-dom";

const AnimeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID: ", id);
  const { data: anime } = useAnimeById(id);
  const animeDetails = anime && anime.data;

  return (
    <main>
      <DetailHeader
        anime_image={animeDetails?.images?.webp?.large_image_url ?? ""}
        anime_title={animeDetails?.title ?? ""}
        rating={animeDetails?.score || null}
        trailer_url={animeDetails?.trailer?.embed_url || null}
      />
    </main>
  );
};

export default AnimeDetailsPage;
