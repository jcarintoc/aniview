import type {
  TopAnimeType,
  TopAnimeFilter,
  TopAnimeRating,
  Pagination,
} from "./common";
import type { Anime } from "./anime";

export interface GetTopAnimeParams {
  type?: TopAnimeType;
  filter?: TopAnimeFilter;
  rating?: TopAnimeRating;
  sfw?: boolean;
  page?: number;
  limit?: number;
}

export interface GetTopAnimeResponse {
  pagination: Pagination;
  data: Anime[];
}
