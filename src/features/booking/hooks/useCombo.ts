import { useQuery } from "@tanstack/react-query";
import { comboService } from "../services/combo";

export const useCombo = () => {
  return useQuery({
    queryKey: ["comboList"],
    queryFn: () => comboService.getDanhSachComboService(),
    staleTime: 5 * 60 * 1000, // combo ít thay đổi
    placeholderData: (prev) => prev,
  });
};
