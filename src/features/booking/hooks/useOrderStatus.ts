import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { bookingService } from "@/features/movie/services/booking";
import type {
  IOrderStatus,
  TrangThaiThanhToan,
} from "@/features/movie/services/booking";

const POLL_INTERVAL_MS = 3000;

// Trạng thái còn "sống" (chờ webhook xác nhận) — chỉ những trạng thái này mới
// cần tiếp tục poll. da_thanh_toan/het_han/huy là kết cục cuối, dừng poll.
const isPending = (status?: TrangThaiThanhToan) => status === "cho_thanh_toan";

/*
  Poll trạng thái 1 hóa đơn đang chờ thanh toán mỗi ~3 giây, dùng cho màn QR
  của PaymentModal. Tách khỏi useBooking (đó chỉ lo việc tạo đơn) vì đây là
  một vòng đời riêng: bắt đầu khi có ma_hoa_don, dừng khi đơn chốt xong.

  enabled=false (ma_hoa_don null, hoặc caller tắt qua tham số `enabled`) thì
  không gọi API — dùng khi modal chưa ở phase "qr".
*/
export const useOrderStatus = (
  ma_hoa_don: number | null,
  options?: { enabled?: boolean; onPaid?: (data: IOrderStatus) => void },
) => {
  const queryClient = useQueryClient();
  const enabled = Boolean(ma_hoa_don) && (options?.enabled ?? true);
  const paidHandledRef = useRef(false);

  useEffect(() => {
    // reset cờ mỗi khi bắt đầu theo dõi 1 hóa đơn mới
    paidHandledRef.current = false;
  }, [ma_hoa_don]);

  const query = useQuery({
    queryKey: ["orderStatus", ma_hoa_don],
    queryFn: () => bookingService.layTrangThaiHoaDon(ma_hoa_don as number),
    enabled,
    refetchInterval: (q) => {
      const status = q.state.data?.trang_thai_thanh_toan;
      return isPending(status) ? POLL_INTERVAL_MS : false;
    },
  });

  useEffect(() => {
    if (
      query.data?.trang_thai_thanh_toan === "da_thanh_toan" &&
      !paidHandledRef.current
    ) {
      paidHandledRef.current = true;
      // Vé mới đã chốt xong → tải lại sơ đồ ghế + lịch sử đặt vé
      queryClient.invalidateQueries({ queryKey: ["statusTheater"] });
      queryClient.invalidateQueries({ queryKey: ["historyPayment"] });
      options?.onPaid?.(query.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data?.trang_thai_thanh_toan]);

  return query;
};
