import { api } from "@/lib";
import { LoginSchema } from "@/schemas/auth.schema";
import { setCookie } from "cookies-next";

export const loginService = {
  login: async (payload: LoginSchema) => {
    const res = await api.post("QuanLyNguoiDung/DangNhap", payload);

    return res.data?.data;
  },
};
