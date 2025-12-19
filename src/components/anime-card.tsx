import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Activity, useState, useRef } from "react";
import {
  processApiEmbedUrl,
  buildYouTubeEmbedUrl,
} from "@/lib/utils/extractUrl";
import { Star } from "lucide-react";
import { truncateText } from "@/lib/utils/common";
import { useNavigate } from "react-router-dom";
import type { Anime } from "@/type/anime";
import { Hd, ClosedCaption } from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({
  anime,
}: AnimeCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  const navigate = useNavigate();
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      setShouldLoadVideo(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  // Process the embed URL using utility
  const videoId = processApiEmbedUrl(anime.trailer.embed_url);
  const youtubeEmbedUrl = buildYouTubeEmbedUrl(videoId, {
    autoplay: true,
    mute: true,
    loop: true,
    controls: false,
  });

  return (
    <HoverCard openDelay={200} closeDelay={0}>
      <HoverCardTrigger>
        <Card
          onClick={() => navigate(`/anime/${anime.mal_id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col justify-end gap-0 p-0 overflow-hidden aspect-3/4 group"
        >
          <div
            className={`z-10 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary rounded-b-md px-3 py-1 text-sm font-bold shadow-md group-hover:top-0 duration-500`}
          >
            {anime.score ? (
              <span className="inline-flex gap-2 items-center">
                <Star className="size-4" /> {anime.score}
              </span>
            ) : (
              "N/A"
            )}
          </div>

          <CardContent className="absolute inset-0 w-full h-full p-0 group-hover:opacity-0 group-hover:scale-120 duration-500">
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="h-full w-full object-cover"
            />
          </CardContent>

          {shouldLoadVideo && youtubeEmbedUrl && (
            <Activity mode={isHovered ? "visible" : "hidden"}>
              <iframe
                title={anime.title}
                src={youtubeEmbedUrl}
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none scale-[2.9]"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Activity>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent pointer-events-none" />

          <CardFooter className="z-10 p-3 flex flex-col items-start gap-1">
            <CardTitle className="text-sm cursor-pointer">
              {truncateText(anime.title, 30)}
            </CardTitle>
            <CardDescription>
              {anime.year && anime.year + ", "}
              {anime.genres[0]?.name}
            </CardDescription>
          </CardFooter>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="center"
        sideOffset={10}
        className="bg-primary/10 border border-primary/10 backdrop-blur-lg md:block hidden"
      >
        <Card className="bg-transparent border-0 gap-2 p-0 shadow-none">
          {/* Title */}
          <CardTitle className="text-lg">{anime.title}</CardTitle>

          {/* Description */}
          <CardDescription className="line-clamp-3 text-white/90">
            {anime.synopsis}
          </CardDescription>

          <CardContent className="p-0 space-y-4">
            {/* Score */}
            {/* <div className="inline-flex items-center gap-1 border-0 px-2.5 py-1 text-sm rounded-sm bg-yellow-300 text-black font-semibold">
              <Star strokeWidth={3} className="size-3" />
              <span>{anime.score}</span>
            </div> */}

            {/* Episodes */}
            <div className="flex gap-2 text-xs font-semibold *:flex *:flex-row *:gap-1 *:items-center *:justify-center *:bg-primary *:rounded-sm *:px-3 *:border *:border-primary">
              <div className="bg-transparent! border-white!">
                <Hd className="w-4" />
                <span className="mt-px">HD</span>
              </div>
              <div>
                <ClosedCaption className="w-4" />{" "}
                <span className="mt-px">{anime.episodes}</span>
              </div>
            </div>

            <div className="text-sm space-y-1 ">
              <p className="text-white/80 font-semibold">
                JAPANESE:{" "}
                <span className="text-white font-normal">
                  {" "}
                  {anime.title_japanese}
                </span>
              </p>

              <p className="text-white/80 font-semibold">
                AIR DATE:{" "}
                <span className="text-white font-normal">
                  {anime.aired.string}
                </span>
              </p>

              <p className="text-white/80 font-semibold">
                STATUS:{" "}
                <span className="text-white font-normal">{anime.status}</span>
              </p>

              <p className="text-white/80 font-semibold">
                GENRE:{" "}
                <span className="text-white font-normal">
                  {anime.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AnimeCard;
