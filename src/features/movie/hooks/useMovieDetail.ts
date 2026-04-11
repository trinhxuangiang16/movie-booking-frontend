import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { movieDetailService } from "../services/movieDetail.service";

export const useMovieDetail = (payload: number) => {
  return useQuery({
    queryKey: ["movie-detail", payload],
    queryFn: () => movieDetailService.getMovieDetail(payload),
    enabled: !!payload,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
