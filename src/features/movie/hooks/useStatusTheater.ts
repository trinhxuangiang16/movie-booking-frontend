import { useQuery } from "@tanstack/react-query";
import { ticketTheaterService } from "../services/ticketTheater";

export const useStatusTheater = (ma_lich_chieu?: number) => {
  return useQuery({
    queryKey: ["statusTheater", ma_lich_chieu],
    queryFn: () =>
      ticketTheaterService.getStatusTheaterService(ma_lich_chieu!),
    enabled: !!ma_lich_chieu,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
