import { api } from "@/lib/index";

export const getScheduleService = {
  getScheduleService: async (ma_he_thong_rap?: number) => {
    const res = await api.get(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?ma_he_thong_rap=${ma_he_thong_rap}`,
    );
    console.log(res.data.data.CumRap);
    return res.data?.data.CumRap;
  },
};
