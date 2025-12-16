import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ViewMoreButton from "./ui/view-more-button";
import type { LucideIcon } from "lucide-react";

const CarouselImage = ({ sectionTitle, Icon }: { sectionTitle: string, Icon?: LucideIcon }) => {
  return (
    <Carousel className="w-full space-y-3">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-6" />}
          <h1 className="font-secondary text-xl">{sectionTitle}</h1>
        </div>
        <ViewMoreButton>View more</ViewMoreButton>
      </div>
      <CarouselContent className="-ml-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/3 lg:basis-1/5 xl:basis-1/7"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-end gap-2 mt-6 px-2">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
};

export default CarouselImage;
