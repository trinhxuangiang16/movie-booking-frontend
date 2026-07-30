import { api } from "@/lib";
import { IUserInfo, IUpdateAccountPayload } from "../types/account.types";

export const accountService = {
  getProfile: async (): Promise<IUserInfo> => {
    const res = await api.get("QuanLyNguoiDung/ThongTinTaiKhoan");
    return res.data?.data;
  },

  updateProfile: async (payload: IUpdateAccountPayload) => {
    const res = await api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
    return res.data?.data;
  },
};
