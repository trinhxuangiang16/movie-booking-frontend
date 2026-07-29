import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/components/ui/toastStatus";
import { bookingService } from "../services/booking";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ma_hoa_don: number) => bookingService.huyGiaoDich(ma_hoa_don),
    onSuccess: (data) => {
      successToast("Đã hủy giao dịch, ghế đã được giải phóng.");
      if (data?.ma_lich_chieu) {
        queryClient.invalidateQueries({
          queryKey: ["statusTheater", data.ma_lich_chieu],
        });
      }
    },
    onError: () => {
      errorToast("Không hủy được giao dịch. Vui lòng thử lại.");
    },
  });
};
