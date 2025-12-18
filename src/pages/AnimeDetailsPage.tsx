import DetailHeader from "@/components/features/details/DetailHeader";
import { useAnimeById } from "@/query/useAnime";
import { useParams } from "react-router-dom";
import AnimeTabs from "@/components/features/details/AnimeTabs";
import PageSpinner from "@/components/page-spinner";
import AnimeNotFound from "@/components/anime-not-found";
import Recommended from "@/components/features/details/Recommended";
import ErrorState from "@/components/error-state";

const AnimeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: anime,
    isLoading,
    isPending,
    refetch,
    isError,
    isFetching
  } = useAnimeById(id);
  const animeDetails = anime && anime.data;

  if (isPending) return <PageSpinner />;

  if (!animeDetails) return <AnimeNotFound />;

  if (isError) return <ErrorState refetch={refetch} isFetching={isFetching} />;

  return (
    <main>
      <DetailHeader
        anime_image={animeDetails.images.webp.large_image_url}
        anime_title={animeDetails.title}
        rating={animeDetails.score}
        trailer_url={animeDetails.trailer.embed_url}
        isLoading={isLoading}
      />

      <AnimeTabs animeId={id!} animeData={animeDetails} isLoading={isLoading} />

      <br />
      <br />
      <br />
      <Recommended id={id!} />
    </main>
  );
};

export default AnimeDetailsPage;
