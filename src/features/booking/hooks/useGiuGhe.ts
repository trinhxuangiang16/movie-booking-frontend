import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/components/ui/toastStatus";
import { seatHoldService } from "../services/seatHold.service";
import type { ISeatHoldPayload } from "../types/seatHold.types";


export const useGiuGhe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ISeatHoldPayload) => seatHoldService.giuGhe(payload),
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["statusTheater", payload.ma_lich_chieu],
      });
    },
    onError: (err, payload) => {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      errorToast(message ?? "Không giữ được ghế. Vui lòng thử lại.");


      queryClient.invalidateQueries({
        queryKey: ["statusTheater", payload.ma_lich_chieu],
      });
    },
  });
};
