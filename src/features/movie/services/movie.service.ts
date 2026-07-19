import { api } from "@/lib/index";

export const movieService = {
  getMovies: async () => {
    const res = await api.get("QuanLyPhim/LayDanhSachPhim");
    return res.data?.data;
  },
};
