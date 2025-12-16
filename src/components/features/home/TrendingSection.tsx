import CarouselImage from "@/components/carousel-image";
import { Flame } from "lucide-react";

const TrendingSection = () => {
  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage sectionTitle="Trending" Icon={Flame} />
    </section>
  );
};

export default TrendingSection;
