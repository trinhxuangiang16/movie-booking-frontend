import { useQuery } from "@tanstack/react-query";
import { historyPaymentService } from "../services/historyPayment";

export const useHistoryPayment = () => {
  return useQuery({
    queryKey: ["historyPayment"],
    queryFn: () => historyPaymentService.getHistoryPaymentService(),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
