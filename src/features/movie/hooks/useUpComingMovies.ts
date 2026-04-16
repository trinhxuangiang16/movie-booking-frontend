import { useQuery } from "@tanstack/react-query";
import { upComingMovieService } from "../services/upComing.service";

export const useUpComingMovies = () => {
  return useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: upComingMovieService.getUpComingMovies,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
