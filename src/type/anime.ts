import type {
  Person,
  VoiceActor,
  AnimeImages,
  Trailer,
  Title,
  Aired,
  Broadcast,
  MalEntity,
  TopAnimeType,
  TopAnimeRating,
  Pagination,
} from "./common";
import { orderByEnum, sortEnum } from "./enum";
import { z } from "zod";

export interface GetAllAnimeParams {
  page?: number;
  limit?: number;
  type?: TopAnimeType;
  min_score?: number;
  max_score?: number;
  status?: "airing" | "complete" | "upcoming";
  rating?: TopAnimeRating;
  genres?: number[];
  order_by?: z.infer<typeof orderByEnum>;
  sort?: z.infer<typeof sortEnum>;
  start_date?: string;
  end_date?: string;
  q?: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: Broadcast;
  producers: MalEntity[];
  licensors: MalEntity[];
  studios: MalEntity[];
  genres: MalEntity[];
  explicit_genres: MalEntity[];
  themes: MalEntity[];
  demographics: MalEntity[];
}

export interface AnimeCharacters {
  character: Person;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

export interface Episodes {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  title_romanji: string;
  aired: string;
  score: number;
  filler: boolean;
  recap: boolean;
  forum_url: string;
}

export interface GetAllAnimeResponse {
  pagination: Pagination;
  data: Anime[];
}

export interface GetAnimeByIdResponse {
  data: Anime;
}

export interface GetAnimeCharactersResponse {
  data: AnimeCharacters[];
}

export interface GetAnimeEpisodesResponse {
  data: Episodes[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}
