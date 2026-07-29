import { api } from "@/lib/index";

export interface ICombo {
  ma_combo: number;
  ten_combo: string;
  mo_ta: string | null;
  gia: number;
  hinh_anh: string | null;
}

export const comboService = {
  getDanhSachComboService: async (): Promise<ICombo[]> => {
    const res = await api.get(`Combo/DanhSachCombo`);
    return res.data?.data;
  },
};
