import { useRef, useState } from "react";
import { useTopAnime } from "@/query/useTop";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const HeroSection = () => {
  const { data: topAnime } = useTopAnime({
    limit: 1,
    filter: "airing",
    type: "tv",
  });

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Extract YouTube video ID from embed_url
  const getYouTubeVideoId = (embedUrl: string | null): string | null => {
    if (!embedUrl) return null;
    const match = embedUrl.match(/\/embed\/([^?]+)/);
    return match ? match[1] : null;
  };

  const videoId = topAnime?.data[0]?.trailer?.embed_url
    ? getYouTubeVideoId(topAnime.data[0].trailer.embed_url)
    : null;

  // Construct YouTube embed URL with autoplay, mute, loop, and JS API enabled
  const youtubeEmbedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1`
    : null;

  // Fallback to image if no video available
  const fallbackImage = topAnime?.data[0]?.images?.webp?.large_image_url;

  const sendPlayerCommand = (
    command: "playVideo" | "pauseVideo" | "mute" | "unMute"
  ) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*"
    );
  };

  const handleTogglePlay = () => {
    if (!youtubeEmbedUrl) return;

    if (isPlaying) {
      sendPlayerCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      sendPlayerCommand("playVideo");
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!youtubeEmbedUrl) return;

    if (isMuted) {
      sendPlayerCommand("unMute");
      setIsMuted(false);
    } else {
      sendPlayerCommand("mute");
      setIsMuted(true);
    }
  };

  return (
    <section className="md:mt-0 p-3 aspect-3/4 md:aspect-video max-h-screen w-full">
      <div className="relative h-full w-full rounded-t-3xl xl:rounded-t-2xl rounded-b-2xl md:rounded-b-3xl overflow-hidden">
        {youtubeEmbedUrl ? (
          <iframe
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
