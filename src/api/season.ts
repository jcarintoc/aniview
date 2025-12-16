import { api } from "./config";

export const getSeasonNow = async () => {
  const { data } = await api.get("/seasons/now");
  return data;
};
