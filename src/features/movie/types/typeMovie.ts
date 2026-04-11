export type TMovie = {
  ma_phim: number;
  ten_phim: string;
  hinh_anh: string;
  mo_ta?: string;
  banner_url?: string;
  danh_gia?: number;
  trailer?: string;
  hot?: boolean;
  dang_chieu?: boolean;
  sap_chieu?: boolean;
  isDeleted?: boolean;
  ngay_khoi_chieu?: string;
};

export type TBanner = {
  ma_phim: number;
  hinh_anh: string;
};
