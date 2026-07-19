import { api } from "@/lib/index";

export const theaterSystemService = {
  getTheaterSystem: async () => {
    const res = await api.get("QuanLyRap/LayThongTinHeThongRap");
    return res.data?.data;
  },
};
