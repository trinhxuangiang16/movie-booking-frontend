import { api } from "@/lib/index";

export interface IHistoryTicket {
  ma_ghe: number;
  ten_ghe: string;
  loai_ghe: string;
  gia_ve: number;
}

export interface IHistoryCombo {
  ma_combo: number;
  ten_combo: string;
  so_luong: number;
  don_gia: number; // giá snapshot lúc mua
}

// Mỗi phần tử = 1 giao dịch (1 hóa đơn); cùng suất chiếu đặt 2 lần → 2 phần tử
export interface IHistoryPayment {
  ma_hoa_don: number;
  created_at: string;
  ma_lich_chieu: number;
  ten_phim: string;
  ten_rap: string;
  ngay_gio_chieu: string;
  ghe: IHistoryTicket[];
  combo: IHistoryCombo[];
  tong_tien: number;
  checked_in_at: string | null;
  // null nếu suất chiếu đã qua hoặc vé đã check-in — ẩn QR trong 2 case này
  ma_ve_qr: string | null;
}

export const historyPaymentService = {
  // Lịch sử đặt vé của user đang đăng nhập (backend lấy tài khoản từ token)
  getHistoryPaymentService: async (): Promise<IHistoryPayment[]> => {
    const res = await api.get(`QuanLyDatVe/LichSuDatVe`);
    return res.data?.data;
  },
};
