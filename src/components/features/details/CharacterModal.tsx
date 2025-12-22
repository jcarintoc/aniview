import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AnimeCharacters } from "@/type/anime";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils/common";
import { Heart, Link } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CharacterModalProps {
  children: React.ReactNode;
  character: AnimeCharacters;
}

const CharacterModal = ({ children, character }: CharacterModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl! bg-black/35 backdrop-blur-md">
        <DialogHeader className="space-y-4">
          <DialogTitle className="hidden"></DialogTitle>

          <DialogDescription className="hidden"></DialogDescription>

          <div>
            <div className="flex flex-col  gap-8">
              <div className="space-y-4">
                {/* Character Image */}
                <div className="w-32 mx-auto aspect-3/4 rounded-lg overflow-hidden">
                  <img
                    src={character.character.images.jpg.image_url}
                    alt={character.character.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Character Details */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">
                      {character.character.name}
                    </h1>
                    <Link
                      onClick={() =>
                        window.open(character.character.url, "_blank")
                      }
                      className="size-4 text-white cursor-pointer hover:text-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={"destructive"}>
                      <Heart /> {formatNumber(character.favorites)}
                    </Badge>
                    <Badge>Role - {character.role}</Badge>
                  </div>
                </div>
              </div>

              {/* Voice Actors */}
              <div className="w-full space-y-2">
                <h2 className="text-lg font-secondary text-white text-start">
                  Voice Actors
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {character.voice_actors.map((voiceActor) => (
                    <Tooltip key={voiceActor.person.mal_id}>
                      <TooltipTrigger>
                        <Avatar className="w-10 h-10 sm:w-14 sm:h-18 rounded-sm shadow-md hover:ring-2">
                          <AvatarImage
                            src={voiceActor.person.images.jpg.image_url}
                            alt={voiceActor.person.name}
                            className="object-cover object-top"
                          />
                          <AvatarFallback>
                            {voiceActor.person.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent className="space-y-1">
                        <p className="font-semibold">
                          {voiceActor.person.name} ({voiceActor.language})
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default CharacterModal;
