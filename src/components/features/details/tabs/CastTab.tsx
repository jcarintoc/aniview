import { useAnimeStaff } from "@/query/useStaff";
import TabsHeader from "../TabsHeader";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { usePagination } from "@/hooks/usePagination";
import { ClientPagination } from "@/components/ui/client-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/empty-state";
  
const CastTab = ({ animeId }: { animeId: string }) => {
  const { data: staff, isLoading } = useAnimeStaff(animeId);

  const {
    paginatedData: paginatedStaff,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination({
    data: staff?.data ?? [],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-8 p-4">
        <Skeleton className="hidden sm:block sticky top-32 w-18 h-96" />
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-3/4 w-full rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!staff || staff.data.length === 0) {
    return <EmptyState className="mt-8" title="No staff found"/>;
  }

  return (
    <div className="p-4 flex sm:flex-row flex-col items-center sm:items-start sm:gap-8">
      <TabsHeader className="sticky top-32">Cast</TabsHeader>
      <div className="space-y-4 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
          {paginatedStaff.map((staff) => (
            <HoverCard closeDelay={0} openDelay={0} key={staff.person.mal_id}>
              <HoverCardTrigger>
                <div className="relative flex flex-col justify-end overflow-hidden rounded-2xl group border aspect-3/4 p-2 hover:ring-2 ring-primary">
                  <span className="z-10 text-sm font-semibold pl-1 pb-1">
                    {staff.person.name}
                  </span>

                  <img
                    src={staff.person.images.jpg.image_url}
                    alt={staff.person.name}
                    className="absolute inset-0 h-full w-full object-cover scale-130 group-hover:scale-110 duration-200"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/75 group-hover:from-black via-black/20 to-transparent pointer-events-none" />
                </div>
              </HoverCardTrigger>

              <HoverCardContent
                align="center"
                side="right"
                sideOffset={10}
                className="w-72 p-4 space-y-3 bg-black/35 backdrop-blur-md border-0 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={staff.person.images.jpg.image_url}
                    alt={staff.person.name}
                    className="h-12 w-12 rounded-full object-cover ring-2  shadow-sm"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold leading-tight">
                      {staff.person.name}
                    </span>
                    <span className="text-xs text-white/75">
                      Staff roles in this anime
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-linear-to-r from-transparent via-white/50 to-transparent" />

                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {staff.positions.map((position) => (
                    <Badge
                      key={position}
                      className="text-xs font-medium "
                    >
                      {position}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CastTab;
