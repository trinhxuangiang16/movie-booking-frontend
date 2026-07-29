import { useMutation, useQueryClient } from "@tanstack/react-query";
import { seatHoldService } from "../services/seatHold.service";
import type { ISeatHoldPayload } from "../types/seatHold.types";


export const useNhaGhe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ISeatHoldPayload) => seatHoldService.nhaGhe(payload),
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["statusTheater", payload.ma_lich_chieu],
      });
    },
  });
};
