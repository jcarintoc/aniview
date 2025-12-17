import { useQuery } from "@tanstack/react-query";
import { getAnimeStaff } from "@/api/staff";

export const useAnimeStaff = (id: string) => {
  return useQuery({
    queryKey: ["anime-staff", id],
    queryFn: () => getAnimeStaff(id),
    enabled: !!id,
  });
};
