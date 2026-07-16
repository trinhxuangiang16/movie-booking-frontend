import { TPromotion } from "../types/typeHomeSections";

const mockPromotions: TPromotion[] = [
  {
    ma_khuyen_mai: 1,
    tieu_de: "Thứ 3 vui vẻ",
    mo_ta: "Đồng giá 45.000đ cho tất cả suất chiếu 2D vào mỗi thứ 3 hàng tuần.",
    hinh_anh:
      "https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-red-label-sale-snatch-discount-png-image_335634.jpg",
    han_su_dung: "31/12/2026",
    loai: "giam_gia",
  },
  {
    ma_khuyen_mai: 2,
    tieu_de: "Combo bắp nước siêu tiết kiệm",
    mo_ta: "Mua vé online tặng ngay combo bắp rang + nước ngọt size L.",
    hinh_anh:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-cpaxZGgIz8Zcm1Kxu7eZl909bVuBKcfZ5IjC6ZedqumSl5le-k2kJ4s&s=10",
    han_su_dung: "31/12/2026",
    loai: "qua_tang",
  },
  {
    ma_khuyen_mai: 3,
    tieu_de: "Ưu đãi thành viên",
    mo_ta: "Tích điểm mỗi lần đặt vé, đổi quà và giảm giá cho hội viên Movi.E.",
    hinh_anh:
      "https://www.iepsl.lk/wp-content/uploads/2018/03/landing_membership.jpg",
    han_su_dung: "31/12/2026",
    loai: "thanh_vien",
  },
];

export const promotionService = {
  getPromotions: async (): Promise<TPromotion[]> => {
    return Promise.resolve(mockPromotions);
  },
};
