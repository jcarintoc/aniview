import { Card } from "@/components/ui/card";
import { Star, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildYouTubeEmbedUrl,
  getYouTubeVideoId,
} from "@/lib/utils/extractUrl";
import NoImage from "@/assets/no-image.png";

interface DetailHeaderProps {
  anime_image: string;
  trailer_url: string | null;
  anime_title: string;
  rating: number | null;
}

const DetailHeader = ({
  anime_image,
  trailer_url,
  anime_title,
  rating,
}: DetailHeaderProps) => {
  const videoId = getYouTubeVideoId(trailer_url ?? "");

  const youtubeEmbedUrl = buildYouTubeEmbedUrl(videoId, {
    autoplay: true,
    mute: true,
    loop: true,
    controls: false,
    enablejsapi: true,
  });

  const onTrailerClick = () => {
    window.open(youtubeEmbedUrl ?? "", "_blank");
  };

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-2">
        <div className="relative h-72 w-full overflow-hidden rounded-4xl mt-2.5 shadow-xl">
          <img
            src={anime_image === "" ? NoImage : anime_image}
            alt="image"
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 w-full h-full bg-black/25 backdrop-blur-xs" />
        </div>

        <Button
          onClick={onTrailerClick}
          className="z-10 absolute bottom-2 right-6 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer pl-2 pr-2 sm:pr-4 shadow-lg"
        >
          <span className="p-1 bg-black text-white rounded-full">
            <Youtube className="size-4" />
          </span>
          <span className="hidden sm:block">Watch Trailer</span>
        </Button>
      </div>

      <div className="relative">
        <div className="relative -top-20 flex flex-col items-center justify-center gap-4 ">
          <Card className="p-0 w-fit overflow-hidden border-none shadow-lg">
            <img
              src={anime_image === "" ? NoImage : anime_image}
              alt="Anime Image"
              className="w-40 aspect-3/4 object-cover"
            />
          </Card>

          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-xl font-bold max-w-96 text-center">
              {anime_title}
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-300 text-black font-semibold">
              {rating ? (
                <>
                  <Star className="size-4" />
                  <span>{rating}</span>
                </>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailHeader;
