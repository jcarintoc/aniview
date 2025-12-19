import CarouselImage from "@/components/carousel-image";
import { CalendarClock } from "lucide-react";
import AnimeCard from "@/components/anime-card";
import { useTopAnime } from "@/query/useTop";

const TopUpcomingSection = () => {
  const { data: topAnime, isLoading } = useTopAnime({
    filter: "upcoming",
    limit: 10,
  });

  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <section className="max-w-7xl mx-auto p-3 xl:p-0">
        <CarouselImage
          sectionTitle="Top Upcoming"
          Icon={CalendarClock}
          data={topAnime?.data ?? []}
          isLoading={isLoading}
          keyExtractor={(item) => item.title}
          renderItem={(anime) => (
            <AnimeCard
              key={anime.title + anime.year}
              anime={anime}
            />
          )}
          path="/top-upcoming"
        />
      </section>
    </section>
  );
};

export default TopUpcomingSection;
