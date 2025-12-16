import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Activity, useState, useRef } from "react";
import {
  processApiEmbedUrl,
  buildYouTubeEmbedUrl,
} from "@/lib/utils/extractUrl";
import { Star } from "lucide-react";
import { truncateText } from "@/lib/utils/common";
import { useNavigate } from "react-router-dom";

interface AnimeCardProps {
  mal_id: number;
  rating: number | null;
  anime_title: string;
  year: number | null;
  genre: string;
  embed_url: string | null;
  image_url: string;
}

const AnimeCard = ({
  mal_id,
  rating,
  anime_title,
  year,
  genre,
  embed_url,
  image_url,
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
  const videoId = processApiEmbedUrl(embed_url);
  const youtubeEmbedUrl = buildYouTubeEmbedUrl(videoId, {
    autoplay: true,
    mute: true,
    loop: true,
    controls: false,
  });

  return (
    <Card
      onClick={() => navigate(`/anime/${mal_id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-end gap-0 p-0 overflow-hidden aspect-3/4 group"
    >
      <div
        className={`z-10 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary rounded-b-md px-3 py-1 text-sm font-bold shadow-md group-hover:top-0 duration-500`}
      >
        {rating ? (
          <span className="inline-flex gap-2 items-center">
            <Star className="size-4" /> {rating}
          </span>
        ) : (
          "N/A"
        )}
      </div>

      <CardContent className="absolute inset-0 w-full h-full p-0 group-hover:opacity-0 duration-500">
        <img
          src={image_url}
          alt={anime_title}
          className="h-full w-full object-cover"
        />
      </CardContent>

      {shouldLoadVideo && youtubeEmbedUrl && (
        <Activity mode={isHovered ? "visible" : "hidden"}>
          <iframe
            title={anime_title}
            src={youtubeEmbedUrl}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none scale-[2.9]"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Activity>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent pointer-events-none" />

      <CardFooter className="z-10 p-3 flex flex-col items-start gap-1">
        <CardTitle className="text-sm">
          {truncateText(anime_title, 30)}
        </CardTitle>
        <CardDescription>
          {year && year + ", "}
          {genre}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default AnimeCard;
