import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services/movie.service";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: movieService.getMovies,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
