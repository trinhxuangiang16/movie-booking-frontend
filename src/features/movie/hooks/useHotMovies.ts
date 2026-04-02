import { useQuery } from "@tanstack/react-query";
import { hotMovieService } from "../services/hotMovie.service";

export const useHotMovies = () => {
  return useQuery({
    queryKey: ["hot-movies"],
    queryFn: hotMovieService.getHotMovies,
    staleTime: 5 * 60 * 1000,
  });
};
