import HeroSection from "@/components/features/home/HeroSection";
// import { useTopAnime } from "@/query/useTop";

const HomePage = () => {
  // const {
  //   data: topAnime,
  //   isLoading,
  //   error,
  // } = useTopAnime({ limit: 10, filter: "airing", type: "tv" });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <HeroSection />

      {/* <section>
        <h2>Top Anime</h2>
        <div>
          {topAnime?.data.map((anime) => (
            <div key={anime.mal_id}>
              <h3>{anime.title}</h3>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  );
};

export default HomePage;
