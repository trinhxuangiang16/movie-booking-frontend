import { api } from "@/lib";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";

export const registerService = {
  register: async (payload: RegisterSchema) => {
    const res = await api.post("QuanLyNguoiDung/DangKy", payload);
    return res.data?.data;
  },
};
