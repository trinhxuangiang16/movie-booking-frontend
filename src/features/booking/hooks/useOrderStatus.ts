import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { bookingService } from "@/features/movie/services/booking";
import type {
  IOrderStatus,
  TrangThaiThanhToan,
} from "@/features/movie/services/booking";

const POLL_INTERVAL_MS = 3000;


const isPending = (status?: TrangThaiThanhToan) => status === "cho_thanh_toan";


export const useOrderStatus = (
  ma_hoa_don: number | null,
  options?: { enabled?: boolean; onPaid?: (data: IOrderStatus) => void },
) => {
  const queryClient = useQueryClient();
  const enabled = Boolean(ma_hoa_don) && (options?.enabled ?? true);
  const paidHandledRef = useRef(false);

  useEffect(() => {
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
      queryClient.invalidateQueries({ queryKey: ["statusTheater"] });
      queryClient.invalidateQueries({ queryKey: ["historyPayment"] });
      options?.onPaid?.(query.data);
    }
  }, [query.data?.trang_thai_thanh_toan]);

  return query;
};
