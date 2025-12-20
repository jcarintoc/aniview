import { Card } from "../../ui/card";
import { Heart, Film, Calendar } from "lucide-react";
import type { Producers } from "@/type/producers";
import { cn } from "@/lib/utils";

interface ProducerCardProps {
  producer: Producers;
  index: number; // passed from map to vary styles if we want
}

const ProducerCard = ({ producer, index }: ProducerCardProps) => {
  const primaryTitle = producer.titles[0]?.title || "Unknown Studio";
  const establishedYear = producer.established
    ? new Date(producer.established).getFullYear()
    : null;

  // Let's vary the height/aspect visually by checking index or random
  // For a reliable "random" look that persists, we use properties of the item or index
  const isLarge = index % 5 === 0; // Every 5th card is "featured"
  const isTall = index % 3 === 0;

  return (
    <Card
      className={cn(
        "relative overflow-hidden group border-0 bg-transparent rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 gap-0 p-0",
        // We can add distinct background colors or gradients here
        "bg-black/20"
      )}
    >
      {/* Image / Cover */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          // Use aspect ratio for base consistency but allow deviation
          isLarge ? "aspect-square" : isTall ? "aspect-3/4" : "aspect-video"
        )}
      >
        {producer.images.jpg.image_url ? (
          <img
            src={producer.images.jpg.image_url}
            alt={primaryTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-accent/10">
            <Film className="size-10 text-white/20 mb-2" />
            <span className="text-xs text-white/40">No Image</span>
          </div>
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Favorites Badge (Floating) */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full flex items-center gap-1.5 transition-transform group-hover:scale-105">
          <Heart className="size-3 text-rose-500 fill-rose-500" />
          <span className="text-[10px] font-bold text-white">
            {producer.favorites.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content Overlay - Placed at bottom absolute */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm sm:text-lg font-black text-white leading-tight mb-1 drop-shadow-md">
          {primaryTitle}
        </h3>

        <div className="flex items-center gap-3 text-xs font-medium text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-300">
          <span className="flex items-center gap-1">
            <Film className="size-3 text-primary" /> {producer.count} Anime
          </span>
          {establishedYear && (
            <span className="flex items-center gap-1">
              <Calendar className="size-3 text-primary" /> {establishedYear}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProducerCard;
