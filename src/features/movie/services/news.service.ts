import { TNews } from "../types/typeHomeSections";

const mockNews: TNews[] = [
  {
    ma_tin: 1,
    tieu_de: "Khởi động mùa phim bom tấn mùa hè 2026",
    mo_ta: "Hàng loạt siêu phẩm quốc tế đổ bộ rạp chiếu trong tháng 7 này.",
    hinh_anh:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
    ngay_dang: "2026-07-10",
  },
  {
    ma_tin: 2,
    tieu_de: "Movi.E hợp tác ra mắt phòng chiếu IMAX mới",
    mo_ta: "Trải nghiệm điện ảnh sống động hơn với hệ thống âm thanh vòm mới.",
    hinh_anh:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
    ngay_dang: "2026-07-05",
  },
  {
    ma_tin: 3,
    tieu_de: "Sự kiện giao lưu đoàn phim tại rạp trung tâm",
    mo_ta: "Cơ hội gặp gỡ diễn viên yêu thích ngay tại suất chiếu ra mắt.",
    hinh_anh:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    ngay_dang: "2026-06-28",
  },
  {
    ma_tin: 4,
    tieu_de: "Movi.E lọt top rạp chiếu được yêu thích nhất năm",
    mo_ta: "Bình chọn bởi hơn 50.000 khán giả trên toàn quốc.",
    hinh_anh:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&q=80",
    ngay_dang: "2026-06-20",
  },
  {
    ma_tin: 5,
    tieu_de: "Ưu đãi vé đôi dịp cuối tuần chính thức trở lại",
    mo_ta: "Áp dụng cho suất chiếu tối thứ 6 và cả ngày cuối tuần.",
    hinh_anh:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&q=80",
    ngay_dang: "2026-06-15",
  },
];

export const newsService = {
  getNews: async (): Promise<TNews[]> => {
    return Promise.resolve(mockNews);
  },
};
