import CarouselImage from "@/components/carousel-image";
import { CalendarClock } from "lucide-react";

const TopUpcomingSection = () => {
  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
      <CarouselImage sectionTitle="Top Upcoming" Icon={CalendarClock} />
    </section>
  );
};

export default TopUpcomingSection;
