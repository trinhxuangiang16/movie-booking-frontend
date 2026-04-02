import { api } from "@/lib/index";

export const hotMovieService = {
  getHotMovies: async () => {
    const res = await api.get("QuanLyPhim/PhimHot");
    console.log(res.data.data);
    return res.data?.data;
  },
};
