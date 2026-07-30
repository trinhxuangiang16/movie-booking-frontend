export interface IUserInfo {
  tai_khoan: number;
  ho_ten: string;
  email: string;
  so_dt: string;
  loai_nguoi_dung: string;
  isDeleted?: boolean;
}

export interface IUpdateAccountPayload {
  ho_ten: string;
  email: string;
  so_dt: string;
}
