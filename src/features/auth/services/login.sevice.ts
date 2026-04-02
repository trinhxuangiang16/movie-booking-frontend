import { api } from "@/lib";
import { LoginSchema } from "@/schemas/auth.schema";

export const loginService = {
  login: async (payload: LoginSchema) => {
    const res = await api.post("QuanLyNguoiDung/DangNhap", payload);
    return res.data?.data;
  },
};
