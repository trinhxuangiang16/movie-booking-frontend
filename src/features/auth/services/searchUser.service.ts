import { api } from "@/lib";

export interface ISearchUserItem {
  tai_khoan: number;
  ho_ten?: string;
  email?: string;
  so_dt?: string;
  loai_nguoi_dung?: string;
}

export const searchUserService = {

  timKiemNguoiDung: async (keyword: string): Promise<ISearchUserItem[]> => {
    try {
      const res = await api.get(`QuanLyNguoiDung/TimKiemNguoiDung`, {
        params: { keyword },
      });
      return res.data?.data ?? [];
    } catch (err) {
      if ((err as { response?: { status?: number } })?.response?.status === 404) {
        return [];
      }
      throw err;
    }
  },
};
