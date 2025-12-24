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
  skeletonCount?: number;
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
  skeletonCount = 10,
}: CarouselImageProps<T>) => {
  const navigate = useNavigate();

  const hasData = data && data.length > 0;
  const showContent = !isLoading && hasData;

  return (
    <Carousel className="w-full space-y-3">
      {/* Header Section */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <>
              <Skeleton className="size-6 sm:size-8" />
              <Skeleton className="w-28 sm:w-40 h-6 sm:h-8" />
            </>
          ) : (
            <>
              {Icon && <Icon className="size-4 sm:size-6" />}
              <h1 className="font-secondary text-base sm:text-xl">
                {sectionTitle}
              </h1>
            </>
          )}
        </div>
        {isLoading ? (
          path && <Skeleton className="h-6 w-26" />
        ) : (
          path && (
            <ViewMoreButton onClick={() => navigate(path)}>
              View more
            </ViewMoreButton>
          )
        )}
      </div>

      {/* Carousel Content */}
      <CarouselContent className="-ml-1">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className={cn(
                  "pl-1 basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/7",
                  itemClassName
                )}
              >
                <Skeleton className="aspect-3/4 ml-3 rounded-2xl" />
              </CarouselItem>
            ))
          : hasData &&
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

      {/* Navigation Controls */}
      {showContent && (
        <div className="flex items-center justify-end gap-2 mt-6 px-2">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-end gap-2 px-2 mb-15">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      )}
    </Carousel>
  );
};

export default CarouselImage;
