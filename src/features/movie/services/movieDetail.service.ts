import { api } from "@/lib";

export const movieDetailService = {
  getMovieDetail: async (id: number) => {
    const res = await api.get(`QuanLyPhim/LayThongTinPhim/${id}`);
    return res.data?.data;
  },
};
