import TabsHeader from "../TabsHeader";
import { useAnimeCharacters } from "@/query/useAnime";
import { usePagination } from "@/hooks/usePagination";
import { ClientPagination } from "@/components/ui/client-pagination";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { formatNumber } from "@/lib/utils/common";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const CharactersTab = ({ animeId }: { animeId: string }) => {
  const { data: characters, isLoading } = useAnimeCharacters(animeId);

  const {
    paginatedData: paginatedCharacters,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination({
    data: characters?.data ?? [],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-8 p-4">
        <Skeleton className="hidden sm:block sticky top-32 w-18 h-96" />
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-3/4 w-full rounded-2xl" />
              <div className="flex items-center -space-x-1.5">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!characters || characters.data.length === 0) {
    return <div>No characters found</div>;
  }

  return (
    <div className="p-4 flex sm:flex-row flex-col items-center sm:items-start sm:gap-8">
      <TabsHeader className="sticky top-32">Characters</TabsHeader>
      <div className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 w-full">
          {paginatedCharacters.map((character) => (
            <div
              key={character.character.mal_id}
              className="flex flex-col gap-2 w-[41vw] sm:w-full"
            >
              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl group border aspect-3/4 p-2 hover:ring-2 ring-primary w-full">
                <Badge variant={"destructive"} className="z-10 shadow-md">
                  <Heart /> {formatNumber(character.favorites)}
                </Badge>
                <span className="z-10 text-sm font-semibold pl-1 pb-1">
                  {character.character.name}
                </span>

                <img
                  src={character.character.images.jpg.image_url}
                  alt={character.character.name}
                  className="absolute inset-0 h-full w-full object-cover scale-120 group-hover:scale-110 duration-200"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/75 group-hover:from-black via-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="flex items-center gap-2">
                <div className="*:data-[slot=avatar]:ring-border flex -space-x-1.5 *:data-[slot=avatar]:ring-2">
                  {character.voice_actors.slice(0, 3).map((voiceActor) => (
                    <Avatar key={voiceActor.person.mal_id} className="w-6 h-6">
                      <AvatarImage
                        src={voiceActor.person.images.jpg.image_url}
                        alt={voiceActor.person.name}
                      />
                      <AvatarFallback>
                        {voiceActor.person.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <span className="text-sm">
                  {character.voice_actors.length > 3
                    ? `+${character.voice_actors.length - 3}`
                    : ""}
                </span>
              </div>
            </div>
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

export default CharactersTab;
