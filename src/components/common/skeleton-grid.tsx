import { Skeleton } from "@/components/ui/skeleton";
import type { ReactNode } from "react";

interface SkeletonGridProps {
  count?: number;
  gridClassName?: string;
  // Custom skeleton render - defaults to aspect-3/4 card
  renderSkeleton?: () => ReactNode;
}

// Preset skeleton types
export const CardSkeleton = () => (
  <Skeleton className="aspect-3/4 rounded-lg" />
);

export const ProducerSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="aspect-video rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

const SkeletonGrid = ({
  count = 24,
  gridClassName = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
  renderSkeleton = CardSkeleton,
}: SkeletonGridProps) => {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
