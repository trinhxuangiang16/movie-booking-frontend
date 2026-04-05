import { api } from "@/lib/index";

export const showingMovieService = {
  getShowingMovies: async () => {
    const res = await api.get("QuanLyPhim/PhimDangChieu");
    console.log(res.data.data);
    return res.data?.data;
  },
};
