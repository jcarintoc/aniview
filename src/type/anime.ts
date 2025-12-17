import type { Anime } from "./top";
import type { Person, VoiceActor } from "./common";

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
