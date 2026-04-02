import { api } from "@/lib/index";

export const movieService = {
  getMovies: async () => {
    const res = await api.get("QuanLyPhim/LayDanhSachPhim");
    console.log(res.data.data);
    return res.data?.data;
  },
};
