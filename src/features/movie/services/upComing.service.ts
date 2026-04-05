import { api } from "@/lib/index";

export const upComingMovieService = {
  getUpComingMovies: async () => {
    const res = await api.get("QuanLyPhim/PhimSapChieu");
    console.log(res.data.data);
    return res.data?.data;
  },
};
