import type { Jpeg, Pagination, Title } from "./common";

export interface ProducersParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: "mal_id" | "count" | "favorites" | "established";
  sort?: "desc" | "asc";
  letter?: string;
}

export interface Producers {
  mal_id: number;
  url: string;
  titles: Title[];
  images: {
    jpg: Jpeg;
  };
  favorites: number;
  established: string;
  about: string;
  count: number;
}

export interface getAllProducersResponse {
  pagination: Pagination;
  data: Producers[];
}
