import HeroSection from "@/components/features/home/HeroSection";
import MostPopularSection from "@/components/features/home/MostPopularSection";
import SeasonNowSection from "@/components/features/home/SeasonNowSection";
import TopUpcomingSection from "@/components/features/home/TopUpcomingSection";
import TrendingSection from "@/components/features/home/TrendingSection";

const HomePage = () => {
  return (
    <main className="space-y-2 sm:space-y-12">
      <HeroSection />
      <TrendingSection />
      <SeasonNowSection />
      <MostPopularSection />
      <TopUpcomingSection />
    </main>
  );
};

export default HomePage;
