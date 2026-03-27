import { api } from "@/lib/index";

export const movieService = {
  getMovies: async () => {
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3NDUzODI5NiwiZXhwIjoxNzc1NDAyMjk2fQ.CNtqibdISp5llN9deV_qtiqTEN3yVi7HAVQxTJJIWGM",
    );
    const res = await api.get("QuanLyPhim/LayDanhSachPhim");
    console.log(res.data.data);
    return res.data?.data;
  },
};
