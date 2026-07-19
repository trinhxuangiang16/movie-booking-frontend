import { api } from "@/lib/index";

export const showingMovieService = {
  getShowingMovies: async () => {
    const res = await api.get("QuanLyPhim/PhimDangChieu");
    return res.data?.data;
  },
};
