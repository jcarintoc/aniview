// Query param types
export type TopAnimeType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | "cm"
  | "pv"
  | "tv_special";

export type TopAnimeFilter =
  | "airing"
  | "upcoming"
  | "bypopularity"
  | "favorite";

export type TopAnimeRating = "g" | "pg" | "pg13" | "r17" | "r" | "rx";

// Pagination
export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

// Image types
export interface ImageUrls {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: ImageUrls;
  webp: ImageUrls;
}

// Trailer
export interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
}

// Title
export interface Title {
  type: string;
  title: string;
}

// Date types
export interface DateProp {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: {
    from: DateProp;
    to: DateProp;
    string: string;
  };
}

// Broadcast
export interface Broadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

// Reusable MAL entity (producers, studios, genres, etc.)
export interface MalEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Person {
  mal_id: number;
  url: string;
  images: {
    jpg: Jpeg;
  };
  name: string;
}

export interface VoiceActor {
  person: Person;
  language: string;
}

export interface Jpeg {
  image_url: string;
}
