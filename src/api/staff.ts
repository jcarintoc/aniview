import { api } from "./config";
import type { GetAnimeStaffResponse } from "@/type/staff";

export const getAnimeStaff = async (
  id: string
): Promise<GetAnimeStaffResponse> => {
  const response = await api.get<GetAnimeStaffResponse>(`anime/${id}/staff`);
  return response.data;
};
