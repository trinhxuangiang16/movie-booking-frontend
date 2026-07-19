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

// Kết quả tạo đơn "chờ thanh toán" — thay thế hoàn toàn luồng đặt-xong-ngay cũ.
// Backend chỉ tạo DatVe thật sau khi webhook ngân hàng xác nhận thanh toán.
export interface IPendingOrderResult {
  ma_hoa_don: number;
  tong_tien: number;
  noi_dung_chuyen_khoan: string; // vd "DH1023" — user phải nhập đúng khi chuyển khoản
  het_han_luc: string; // ISO — đơn tự hủy giữ ghế sau mốc này
  qr_url: string; // ảnh QR VietQR build sẵn từ BE
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

export const bookingService = {
  // Tạo đơn chờ thanh toán: giữ ghế + trả thông tin QR VietQR để hiển thị
  taoDonChoThanhToan: async (
    payload: IBookingPayload,
  ): Promise<IPendingOrderResult> => {
    const res = await api.post(`QuanLyDatVe/DatVe`, payload);
    return res.data?.data;
  },

  // Poll trạng thái đơn trong lúc chờ webhook ngân hàng xác nhận
  layTrangThaiHoaDon: async (ma_hoa_don: number): Promise<IOrderStatus> => {
    const res = await api.get(`QuanLyDatVe/TrangThaiHoaDon`, {
      params: { ma_hoa_don },
    });
    return res.data?.data;
  },
};
