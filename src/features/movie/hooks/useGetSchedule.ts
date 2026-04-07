import { useQuery } from "@tanstack/react-query";
import { getScheduleService } from "../services/getSchedule.service";

export const useGetSchedule = () => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: getScheduleService.getScheduleService,
    staleTime: 5 * 60 * 1000,
  });
};
