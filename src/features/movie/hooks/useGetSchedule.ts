import { useQuery } from "@tanstack/react-query";
import { getScheduleService } from "../services/getSchedule.service";

export const useGetSchedule = (ma_he_thong_rap?: number) => {
  return useQuery({
    queryKey: ["schedule", ma_he_thong_rap],
    queryFn: () => getScheduleService.getScheduleService(ma_he_thong_rap),
    enabled: !!ma_he_thong_rap,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
