import type { AnimeImages } from "./common";

export interface RecommendedAnime {
  entry: {
    mal_id: number;
    url: string;
    images: AnimeImages;
    title: string;
  };
  url: string;
  votes: number;
}

export interface RecommendedAnimeResponse {
  data: RecommendedAnime[];
}
