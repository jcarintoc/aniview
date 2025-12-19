import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}` ||
  "https://api.jikan.moe/v4";

export const api = axios.create({
  baseURL: API_URL,
  paramsSerializer: {
    encode: (value: string) => {
      // Use encodeURIComponent to ensure spaces are encoded as %20 instead of +
      return encodeURIComponent(value);
    },
  },
});
