import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/account.service";
import { IUpdateAccountPayload } from "../types/account.types";

export const useAccountProfile = () => {
  return useQuery({
    queryKey: ["account-profile"],
    queryFn: () => accountService.getProfile(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateAccountPayload) => accountService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-profile"] });
    },
  });
};
