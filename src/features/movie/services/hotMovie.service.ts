import { api } from "@/lib/index";

export const hotMovieService = {
  getHotMovies: async () => {
    const res = await api.get("QuanLyPhim/PhimHot");
    return res.data?.data;
  },
};
