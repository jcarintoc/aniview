import { z } from "zod";

export const ratingEnum = z.enum(["g", "pg", "pg13", "r17", "r", "rx"]);
export const statusEnum = z.enum(["airing", "complete", "upcoming"]);
export const typeEnum = z.enum([
  "tv",
  "movie",
  "ova",
  "special",
  "ona",
  "music",
  "cm",
  "pv",
  "tv_special",
]);
export const orderByEnum = z.enum([
  "mal_id",
  "title",
  "start_date",
  "end_date",
  "episodes",
  "score",
  "scored_by",
  "rank",
  "popularity",
  "members",
  "favorites",
]);
export const sortEnum = z.enum(["desc", "asc"]);
