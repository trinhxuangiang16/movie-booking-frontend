import { useQuery } from "@tanstack/react-query";
import { searchUserService } from "../services/searchUser.service";


export const useSearchUser = (keyword: string) => {
  const kw = keyword.trim();
  return useQuery({
    queryKey: ["searchUser", kw],
    queryFn: () => searchUserService.timKiemNguoiDung(kw),
    enabled: kw.length >= 2,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
