import { api } from "@/lib/index";

export interface ISeatStatus {
  ma_ghe: number;
  ten_ghe: string;
  loai_ghe: string;
  da_dat: boolean;
  dang_giu_cho: boolean;
}

export interface ITheaterSeatStatus {
  ma_lich_chieu: number;
  danh_sach_ghe: ISeatStatus[];
}

export const ticketTheaterService = {
  getStatusTheaterService: async (
    ma_lich_chieu: number,
  ): Promise<ITheaterSeatStatus> => {
    const res = await api.get(
      `QuanLyDatVe/LayTrangThaiGheTrongRap?ma_lich_chieu=${ma_lich_chieu}`,
    );
    return res.data?.data;
  },
};
