import { Skeleton } from "@/components/ui/skeleton";
import TabsHeader from "../TabsHeader";
import type { Anime } from "@/type/anime";
import EmptyState from "@/components/empty-state";

interface OverviewTabProps {
  animeData: Anime;
  isLoading: boolean;
}

const OverviewTab = ({ animeData, isLoading }: OverviewTabProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-8 p-4">
        <Skeleton className="hidden sm:block w-18 h-96" />
        <div className="w-full space-y-2">
          <Skeleton className="w-24 h-6 mb-3" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-4/4 h-4" />
          <Skeleton className="w-4/5 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </div>
    );
  }

  if (!animeData.synopsis && !animeData.background)
    return <EmptyState className="mt-8" title="No overview data found"/>;

  return (
    <div className=" p-4 flex items-start gap-8">
      <TabsHeader>Overview</TabsHeader>
      <div className="space-y-4">
        {animeData.synopsis && (
          <div>
            <h3 className="font-semibold mb-2 font-secondary text-xl">
              Synopsis
            </h3>
            <p className="text-muted-foreground">{animeData.synopsis}</p>
          </div>
        )}
        {animeData.background && (
          <div>
            <h3 className="font-semibold mb-2 font-secondary text-xl">
              Background
            </h3>
            <p className="text-muted-foreground">{animeData.background}</p>
          </div>
        )}
        {/* Add more overview content here */}
      </div>
    </div>
  );
};

export default OverviewTab;
