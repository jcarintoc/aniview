import { useRef, useState } from "react";
import { useTopAnime } from "@/query/useTop";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import {
  getYouTubeVideoId,
  buildYouTubeEmbedUrl,
  sendYouTubeCommand,
} from "@/lib/utils/extractUrl";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const { data: topAnime, isLoading } = useTopAnime({
    limit: 1,
    filter: "airing",
    type: "tv",
  });

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const videoId = getYouTubeVideoId(
    topAnime?.data[0]?.trailer?.embed_url ?? ""
  );
  const youtubeEmbedUrl = buildYouTubeEmbedUrl(videoId, {
    autoplay: true,
    mute: true,
    loop: true,
    controls: false,
    enablejsapi: true,
  });

  const fallbackImage = topAnime?.data[0]?.images?.webp?.large_image_url;

  const handleTogglePlay = () => {
    if (!youtubeEmbedUrl) return;

    if (isPlaying) {
      sendYouTubeCommand(iframeRef.current, "pauseVideo");
      setIsPlaying(false);
    } else {
      sendYouTubeCommand(iframeRef.current, "playVideo");
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!youtubeEmbedUrl) return;

    if (isMuted) {
      sendYouTubeCommand(iframeRef.current, "unMute");
      setIsMuted(false);
    } else {
      sendYouTubeCommand(iframeRef.current, "mute");
      setIsMuted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="md:mt-0 p-3 aspect-3/4 md:aspect-video max-h-screen w-full">
        <div className="relative h-full w-full rounded-t-4xl xl:rounded-t-2xl rounded-b-2xl md:rounded-b-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black" />

          <div className="z-10 absolute bottom-4 left-4 md:bottom-6 md:left-6 xl:bottom-12 xl:left-12 w-3/4 xl:w-1/3 space-y-2 md:space-y-4">
            <Skeleton className="w-20 md:w-28 xl:w-40 h-full aspect-3/4 object-cover rounded-lg shadow-lg mb-4 xl:mb-8" />
            <Skeleton className="w-1/2 sm:w-72 h-8 sm:h-12" />
            <div className="space-y-2 w-full">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="w-6 h-6 sm:w-10 sm:h-10 rounded-full" />
              <Skeleton className="w-6 h-6 sm:w-10 sm:h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="md:mt-0 p-3 aspect-3/4 md:aspect-video max-h-screen w-full">
      <div className="relative h-full w-full rounded-t-4xl xl:rounded-t-2xl rounded-b-2xl md:rounded-b-3xl overflow-hidden">
        {youtubeEmbedUrl ? (
          <iframe
            title={topAnime?.data[0]?.title || "Anime"}
            ref={iframeRef}
            src={youtubeEmbedUrl}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none scale-245 md:scale-120"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : fallbackImage ? (
          <img
            src={fallbackImage}
            alt={topAnime?.data[0]?.title || "Anime"}
            className="w-full h-full object-cover"
          />
        ) : null}

        {/* Title and Description */}
        <div className="z-10 absolute bottom-4 left-4 md:bottom-6 md:left-6 xl:bottom-12 xl:left-12 max-w-3/4 xl:max-w-1/3 space-y-2 md:space-y-4">
          <img
            src={topAnime?.data[0]?.images?.webp?.large_image_url}
            alt={topAnime?.data[0]?.title || "Anime"}
            className="w-20 md:w-28 xl:w-40 h-full aspect-3/4 object-cover rounded-lg shadow-lg mb-4 xl:mb-8"
          />
          <h1 className="text-xl md:text-3xl xl:text-5xl font-bold">
            {topAnime?.data[0]?.title || "Anime"}
          </h1>
          <p className="text-sm md:text-base xl:text-lg line-clamp-3">
            {topAnime?.data[0]?.synopsis || "No synopsis available"}
          </p>

          {/* Controls */}
          {youtubeEmbedUrl && (
            <div className="flex items-center gap-2 md:gap-3 pt-2">
              <Button
                variant="secondary"
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 h-7 w-7 md:h-9 md:w-9"
                onClick={handleTogglePlay}
              >
                {isPlaying ? (
                  <Pause className="size-2.5 md:size-4" />
                ) : (
                  <Play className="size-2.5 md:size-4" />
                )}
              </Button>

              <Button
                variant="secondary"
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 h-7 w-7 md:h-9 md:w-9"
                onClick={handleToggleMute}
              >
                {isMuted ? (
                  <VolumeX className="size-3 md:size-4" />
                ) : (
                  <Volume2 className="size-3 md:size-4" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
