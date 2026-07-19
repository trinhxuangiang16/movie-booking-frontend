import { api } from "@/lib/index";

export const upComingMovieService = {
  getUpComingMovies: async () => {
    const res = await api.get("QuanLyPhim/PhimSapChieu");

    return res.data?.data;
  },
};
