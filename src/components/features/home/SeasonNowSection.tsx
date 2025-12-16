import CarouselImage from "@/components/carousel-image";
import { SunSnow } from "lucide-react";

const SeasonNowSection = () => {
  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage sectionTitle="Season Now" Icon={SunSnow} />
    </section>
  );
};

export default SeasonNowSection;
