import { api } from "@/lib/index";

export const bannerService = {
  getBanner: async (ma_phim: number) => {
    const res = await api.get(`QuanLyPhim/Banner/${ma_phim}`);

    return res.data?.data;
  },
};
