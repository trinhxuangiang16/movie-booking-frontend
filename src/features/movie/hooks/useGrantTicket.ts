import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/components/ui/toastStatus";
import { bookingService } from "../services/booking";
import type { IGrantTicketPayload } from "../services/booking";


export const useGrantTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IGrantTicketPayload) =>
      bookingService.capVeTrucTiep(payload),
    onSuccess: (data) => {
      successToast(
        data.email_khach
          ? `Đã cấp vé cho khách ${data.email_khach}.`
          : "Đã cấp vé thành công.",
      );
      queryClient.invalidateQueries({
        queryKey: ["statusTheater", data.ma_lich_chieu],
      });
    },
    onError: (err) => {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      errorToast(message ?? "Không cấp được vé. Vui lòng thử lại.");
    },
  });
};
