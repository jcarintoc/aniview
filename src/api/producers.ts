import { api } from "./config";
import type {
  getAllProducersResponse,
  ProducersParams,
} from "@/type/producers";

export const getAllProducers = async (
  params?: ProducersParams
): Promise<getAllProducersResponse> => {
  const response = await api.get<getAllProducersResponse>("/producers", {
    params,
  });
  return response.data;
};
