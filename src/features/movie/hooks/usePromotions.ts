import { useQuery } from "@tanstack/react-query";
import { promotionService } from "../services/promotion.service";

export const usePromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: promotionService.getPromotions,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
