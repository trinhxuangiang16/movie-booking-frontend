export interface ISeatHoldPayload {
  ma_lich_chieu: number;
  danh_sach_ghe: number[];
}

export type LoaiGiuCho = "tam" | "da_tao_don";

export interface IHeldSeat {
  ma_ghe: number;
  loai: LoaiGiuCho;
  expire_at: string;
  con_lai_giay: number;
}

export interface ISeatHoldResult {
  ma_lich_chieu: number;

  da_giu_truoc_do: boolean;
  danh_sach_ghe: IHeldSeat[];
}

export interface ISeatReleaseResult {
  ma_lich_chieu: number;
  so_ghe_da_nha: number;
}
