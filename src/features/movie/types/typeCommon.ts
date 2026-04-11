export interface IMovieListProps {
  mode: string;
}

export interface ITheaterSystem {
  ma_he_thong_rap: string;
  ten_he_thong_rap: string;
  logo: string;
}

export interface ITheaterGroup {
  ma_cum_rap: number;
  ten_cum_rap: string;
  dia_chi: string;
  RapPhim: ITheater[];
}

export interface ITheater {
  ma_rap: number;
  ten_rap: string;
  LichChieu: ISchedule[];
}

export interface IPhim {
  ma_phim: number;
  ten_phim: string;
  hinh_anh: string;
}
export interface ISchedule {
  ma_lich_chieu: number;
  ngay_gio_chieu: string;
  gia_ve: number;
  ma_phim?: number;
  Phim: IPhim;
}
