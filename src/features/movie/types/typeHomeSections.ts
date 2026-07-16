export type TPromotionType = "giam_gia" | "qua_tang" | "thanh_vien";

export type TPromotion = {
  ma_khuyen_mai: number;
  tieu_de: string;
  mo_ta: string;
  hinh_anh: string;
  han_su_dung?: string;
  loai: TPromotionType;
};

export type TNews = {
  ma_tin: number;
  tieu_de: string;
  mo_ta: string;
  hinh_anh: string;
  ngay_dang: string;
};
