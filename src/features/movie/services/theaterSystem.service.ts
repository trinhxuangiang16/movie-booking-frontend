import { api } from "@/lib/index";

export const theaterSystemService = {
  getTheaterSystem: async () => {
    const res = await api.get("QuanLyRap/LayThongTinHeThongRap");
    console.log(res.data.data);
    return res.data?.data;
  },
};
