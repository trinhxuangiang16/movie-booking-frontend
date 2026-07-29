import { api } from "@/lib/index";

export interface IBookingPayload {
  ma_lich_chieu: number;
  danh_sach_ve: { ma_ghe: number }[];
  danh_sach_combo?: { ma_combo: number; so_luong: number }[];
}

export interface IBookedTicket {
  ma_ghe: number;
  ten_ghe: string;
  loai_ghe: string;
  gia_ve: number;
}

export interface IBookedCombo {
  ma_combo: number;
  ten_combo: string;
  so_luong: number;
  don_gia: number;
}


export interface IPendingOrderResult {
  ma_hoa_don: number;
  tong_tien: number;
  noi_dung_chuyen_khoan: string;
  het_han_luc: string;
  qr_url: string;
  danh_sach_ghe: IBookedTicket[];
  danh_sach_combo: IBookedCombo[];
}

export type TrangThaiThanhToan =
  | "cho_thanh_toan"
  | "da_thanh_toan"
  | "het_han"
  | "huy";

export interface IOrderStatus {
  ma_hoa_don: number;
  trang_thai_thanh_toan: TrangThaiThanhToan;
  tong_tien: number;
  het_han_luc: string | null;
}

export interface ICancelOrderResult {
  ma_hoa_don: number;
  trang_thai_thanh_toan: TrangThaiThanhToan;
  ma_lich_chieu?: number;
}


export interface IGrantTicketPayload {
  ma_lich_chieu: number;
  danh_sach_ve: { ma_ghe: number }[];
  danh_sach_combo?: { ma_combo: number; so_luong: number }[];
  email_khach?: string;
  ly_do?: string;
}

export interface IGrantTicketResult {
  ma_hoa_don: number;
  tai_khoan_nhan: number;
  email_khach: string | null;
  tong_tien: number;
  trang_thai_thanh_toan: TrangThaiThanhToan;
  ma_lich_chieu: number;
  danh_sach_ghe: IBookedTicket[];
}

export const bookingService = {
  taoDonChoThanhToan: async (
    payload: IBookingPayload,
  ): Promise<IPendingOrderResult> => {
    const res = await api.post(`QuanLyDatVe/DatVe`, payload);
    return res.data?.data;
  },

  layTrangThaiHoaDon: async (ma_hoa_don: number): Promise<IOrderStatus> => {
    const res = await api.get(`QuanLyDatVe/TrangThaiHoaDon`, {
      params: { ma_hoa_don },
    });
    return res.data?.data;
  },


  huyGiaoDich: async (ma_hoa_don: number): Promise<ICancelOrderResult> => {
    const res = await api.post(`QuanLyDatVe/HuyGiaoDich`, { ma_hoa_don });
    return res.data?.data;
  },


  capVeTrucTiep: async (
    payload: IGrantTicketPayload,
  ): Promise<IGrantTicketResult> => {
    const res = await api.post(`QuanLyDatVe/CapVeTrucTiep`, payload);
    return res.data?.data;
  },
};
