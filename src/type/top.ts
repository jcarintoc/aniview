import type {
  TopAnimeType,
  TopAnimeFilter,
  TopAnimeRating,
  Pagination,
  AnimeImages,
  Trailer,
  Title,
  Aired,
  Broadcast,
  MalEntity,
} from "./common";

export interface GetTopAnimeParams {
  type?: TopAnimeType;
  filter?: TopAnimeFilter;
  rating?: TopAnimeRating;
  sfw?: boolean;
  page?: number;
  limit?: number;
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

export interface GetTopAnimeResponse {
  pagination: Pagination;
  data: Anime[];
}
