import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ViewMoreButton from "../ui/view-more-button";
import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface CarouselImageProps<T> {
  sectionTitle: string;
  Icon?: LucideIcon;
  data: T[];
  isLoading: boolean;
  renderItem: (item: T, index: number) => ReactNode;
  path?: string;
  itemClassName?: string;
  keyExtractor?: (item: T, index: number) => string | number;
}

const CarouselImage = <T,>({
  sectionTitle,
  Icon,
  data,
  isLoading,
  renderItem,
  path,
  itemClassName,
  keyExtractor,
}: CarouselImageProps<T>) => {
  const navigate = useNavigate();

  if (data && data.length === 0) {
    return null;
  }

  return (
    <Carousel className="w-full space-y-3">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-6" />}
          <h1 className="font-secondary text-lg sm:text-xl">{sectionTitle}</h1>
        </div>
        {path && (
          <ViewMoreButton onClick={() => navigate(path)}>
            View more
          </ViewMoreButton>
        )}
      </div>
      <CarouselContent className="-ml-1">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  "pl-1 basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/7",
                  itemClassName
                )}
              >
                <Skeleton className="aspect-3/4 ml-3 rounded-2xl" />
              </CarouselItem>
            ))
          : data &&
            data.length > 0 &&
            data.map((item, index) => (
              <CarouselItem
                key={keyExtractor ? keyExtractor(item, index) : index}
                className={cn(
                  "pl-1 basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/7",
                  itemClassName
                )}
              >
                <div className="p-1">{renderItem(item, index)}</div>
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
