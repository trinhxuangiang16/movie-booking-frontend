import { api } from "@/lib/index";

export interface IScheduleDetail {
  ma_lich_chieu: number;
  ngay_gio_chieu: string;
  gia_ve: number;
  Phim: {
    ma_phim: number;
    ten_phim: string;
    hinh_anh: string | null;
  };
  RapPhim: {
    ma_rap: number;
    ten_rap: string;
    CumRap: {
      ma_cum_rap: number;
      ten_cum_rap: string;
      dia_chi: string;
      HeThongRap: {
        ma_he_thong_rap: number;
        ten_he_thong_rap: string;
      };
    };
  };
}

export const getScheduleService = {
  getScheduleService: async (ma_he_thong_rap?: number) => {
    const res = await api.get(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?ma_he_thong_rap=${ma_he_thong_rap}`,
    );
    return res.data?.data.CumRap;
  },
};
export const getScheduleByMovieIdService = {
  getScheduleByMovieIdService: async (
    ma_lich_chieu: number,
  ): Promise<IScheduleDetail> => {
    const res = await api.get(
      `QuanLyRap/LayLichChieuPhimDuaVaoMaVaThoiGian?ma_lich_chieu=${ma_lich_chieu}`,
    );
    return res.data?.data;
  },
};
