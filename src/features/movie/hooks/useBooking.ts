import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "../services/booking";
import type { IBookingPayload } from "../services/booking";

// Tạo đơn "chờ thanh toán" (giữ ghế + trả QR). Không còn đặt-xong-ngay —
// vé thật chỉ được tạo sau khi webhook ngân hàng xác nhận (xem useOrderStatus).
export const useBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBookingPayload) =>
      bookingService.taoDonChoThanhToan(payload),
    onSuccess: (_data, payload) => {
      // Ghế vừa giữ đã đổi trạng thái → tải lại sơ đồ ghế của suất chiếu này
      queryClient.invalidateQueries({
        queryKey: ["statusTheater", payload.ma_lich_chieu],
      });
    },
  });
};
