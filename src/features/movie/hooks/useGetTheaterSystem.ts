import { useQuery } from "@tanstack/react-query";
import { theaterSystemService } from "../services/theaterSystem.service";

export const useTheaterSystem = () => {
  return useQuery({
    queryKey: ["theater-system"],
    queryFn: theaterSystemService.getTheaterSystem,
    staleTime: 5 * 60 * 1000,
  });
};
