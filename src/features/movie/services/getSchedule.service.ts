import { api } from "@/lib/index";

export const getScheduleService = {
  getScheduleService: async () => {
    const res = await api.get("QuanLyRap/LayThongTinLichChieuHeThongRap");
    console.log(res.data.data);
    return res.data?.data;
  },
};
