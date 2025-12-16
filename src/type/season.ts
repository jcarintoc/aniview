import type { Anime } from "./top";
import type {
  TopAnimeFilter,
  TopAnimeRating,
  TopAnimeType,
  Pagination,
} from "./common";

export interface GetSeasonAnimeParams {
  type?: TopAnimeType;
  filter?: TopAnimeFilter;
  rating?: TopAnimeRating;
  sfw?: boolean;
  page?: number;
  limit?: number;
}

export interface GetSeasonAnimeResponse {
  pagination: Pagination;
  data: Anime[];
}
