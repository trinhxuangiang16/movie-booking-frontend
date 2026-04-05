import { useQuery } from "@tanstack/react-query";
import { showingMovieService } from "../services/showingMovie.service";

export const useShowingMovies = () => {
  return useQuery({
    queryKey: ["showing-movies"],
    queryFn: showingMovieService.getShowingMovies,
    staleTime: 5 * 60 * 1000,
  });
};
