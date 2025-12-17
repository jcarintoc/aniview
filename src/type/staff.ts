import type { Person } from "./common";

export interface Staff {
  person: Person;
  positions: string[];
}

export interface GetAnimeStaffResponse {
  data: Staff[];
}
