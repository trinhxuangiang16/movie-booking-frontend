import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { bannerService } from "../services/banner.service";

export const useBanner = (ma_phim: number) => {
  return useQuery({
    queryKey: ["banner", ma_phim],
    queryFn: () => bannerService.getBanner(ma_phim),
    enabled: !!ma_phim,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
