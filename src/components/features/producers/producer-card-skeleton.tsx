import { Skeleton } from "@/components/ui/skeleton";

const MasonrySkeletonGrid = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton
            className={`w-full rounded-xl ${
              i % 3 === 0
                ? "aspect-3/4"
                : i % 2 === 0
                ? "aspect-video"
                : "aspect-square"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default MasonrySkeletonGrid;
