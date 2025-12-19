import { Card, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { truncateText } from "@/lib/utils/common";

interface AnimeCardRecommendedProps {
  mal_id: number;
  image_jpg_url: string;
  image_webp_url: string;
  title: string;
}

const AnimeCardRecommended = ({
  mal_id,
  image_jpg_url,
  image_webp_url,
  title,
}: AnimeCardRecommendedProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/anime/${mal_id}`)}
      className="relative flex flex-col justify-end gap-0 p-3 overflow-hidden aspect-3/4 group shadow-lg"
    >
      <div className="absolute inset-0 group-hover:scale-120 duration-500">
        {image_jpg_url ? (
          <img
            src={image_jpg_url}
            alt={title}
            className="w-full object-cover"
          />
        ) : (
          <img
            src={image_webp_url}
            alt={title}
            className="w-full object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent pointer-events-none" />

      <CardTitle className="z-10 text-sm cursor-pointer">
        {truncateText(title, 30)}
      </CardTitle>
    </Card>
  );
};

export default AnimeCardRecommended;
