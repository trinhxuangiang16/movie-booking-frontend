import { getScheduleByMovieIdService } from "./../services/getSchedule.service";
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

export const useGetScheduleByMovieId = (ma_lich_chieu?: number) => {
  return useQuery({
    queryKey: ["scheduleByMovieId", ma_lich_chieu],
    queryFn: () =>
      getScheduleByMovieIdService.getScheduleByMovieIdService(ma_lich_chieu!),
    enabled: !!ma_lich_chieu,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
