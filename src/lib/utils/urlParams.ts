import type { GetAllAnimeParams } from "@/type/anime";
import { typeEnum, orderByEnum } from "@/type/enum";

/**
 * Parse URL search params into GetAllAnimeParams
 */
export function parseSearchParams(
  searchParams: URLSearchParams,
): GetAllAnimeParams {
  const params: GetAllAnimeParams = {};

  // Page
  const page = searchParams.get("page");
  if (page) {
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      params.page = pageNum;
    }
  }

  // Limit
  const limit = searchParams.get("limit");
  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      params.limit = limitNum;
    }
  }

  // Type
  const type = searchParams.get("type");
  if (type && typeEnum.safeParse(type).success) {
    params.type = type as GetAllAnimeParams["type"];
  }

  // Status
  const status = searchParams.get("status");
  if (status && ["airing", "complete", "upcoming"].includes(status)) {
    params.status = status as GetAllAnimeParams["status"];
  }

  // Rating
  const rating = searchParams.get("rating");
  if (rating && ["g", "pg", "pg13", "r17", "r", "rx"].includes(rating)) {
    params.rating = rating as GetAllAnimeParams["rating"];
  }

  // Genres (comma-separated string of numbers)
  const genres = searchParams.get("genres");
  if (genres) {
    const genreArray = genres
      .split(",")
      .map((g) => parseInt(g.trim(), 10))
      .filter((g) => !isNaN(g));
    if (genreArray.length > 0) {
      params.genres = genreArray;
    }
  }

  // Min/Max Score
  const minScore = searchParams.get("min_score");
  if (minScore) {
    const min = parseFloat(minScore);
    if (!isNaN(min) && min >= 1 && min <= 10) {
      params.min_score = min;
    }
  }

  const maxScore = searchParams.get("max_score");
  if (maxScore) {
    const max = parseFloat(maxScore);
    if (!isNaN(max) && max >= 1 && max <= 10) {
      params.max_score = max;
    }
  }

  // Order by
  const orderBy = searchParams.get("order_by");
  if (orderBy && orderByEnum.safeParse(orderBy).success) {
    params.order_by = orderBy as GetAllAnimeParams["order_by"];
  }

  // Sort
  const sort = searchParams.get("sort");
  if (sort && ["asc", "desc"].includes(sort)) {
    params.sort = sort as GetAllAnimeParams["sort"];
  }

  // Dates
  const startDate = searchParams.get("start_date");
  if (startDate) {
    params.start_date = startDate;
  }

  const endDate = searchParams.get("end_date");
  if (endDate) {
    params.end_date = endDate;
  }

  // Search query
  const q = searchParams.get("q");
  if (q) {
    params.q = q;
  }

  return params;
}

/**
 * Convert GetAllAnimeParams to URLSearchParams
 */
export function paramsToSearchParams(
  params: GetAllAnimeParams,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", params.page.toString());
  }

  if (params.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.rating) {
    searchParams.set("rating", params.rating);
  }

  if (params.genres && params.genres.length > 0) {
    searchParams.set("genres", params.genres.join(","));
  }

  if (params.min_score !== undefined) {
    searchParams.set("min_score", params.min_score.toString());
  }

  if (params.max_score !== undefined) {
    searchParams.set("max_score", params.max_score.toString());
  }

  if (params.order_by) {
    searchParams.set("order_by", params.order_by);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params.start_date) {
    searchParams.set("start_date", params.start_date);
  }

  if (params.end_date) {
    searchParams.set("end_date", params.end_date);
  }

  if (params.q) {
    searchParams.set("q", params.q);
  }

  return searchParams;
}

/**
 * Normalize params object for stable query key generation
 * Removes undefined values and sorts keys for consistent serialization
 */
export function normalizeParams(
  params?: GetAllAnimeParams,
): GetAllAnimeParams | undefined {
  if (!params) return undefined;

  const normalized: Record<string, unknown> = {};

  // Handle each property explicitly
  if (params.page !== undefined) normalized.page = params.page;
  if (params.limit !== undefined) normalized.limit = params.limit;
  if (params.type !== undefined) normalized.type = params.type;
  if (params.status !== undefined) normalized.status = params.status;
  if (params.rating !== undefined) normalized.rating = params.rating;
  if (params.min_score !== undefined) normalized.min_score = params.min_score;
  if (params.max_score !== undefined) normalized.max_score = params.max_score;
  if (params.order_by !== undefined) normalized.order_by = params.order_by;
  if (params.sort !== undefined) normalized.sort = params.sort;
  if (params.start_date !== undefined)
    normalized.start_date = params.start_date;
  if (params.end_date !== undefined) normalized.end_date = params.end_date;
  if (params.q !== undefined && params.q.trim() !== "")
    normalized.q = params.q.trim();

  // Handle genres array - sort for consistency
  if (
    params.genres !== undefined &&
    Array.isArray(params.genres) &&
    params.genres.length > 0
  ) {
    normalized.genres = [...params.genres].sort((a, b) => a - b);
  }

  return Object.keys(normalized).length > 0
    ? (normalized as GetAllAnimeParams)
    : undefined;
}

/**
 * Create a stable query key from params
 * This ensures React Query can properly cache queries with the same parameters
 */
export function createAnimeQueryKey(
  params?: GetAllAnimeParams,
): [string, GetAllAnimeParams | undefined] {
  return ["all-anime", normalizeParams(params)];
}
