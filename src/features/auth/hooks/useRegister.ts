import { errorToast, successToast } from "@/components/ui/toastStatus";
import { api } from "@/lib";
import { RegisterSchema } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (formData: RegisterSchema) => {
      const res = await api.post("QuanLyNguoiDung/DangKy", formData);
      return res.data;
    },
    onSuccess: (data) => {
      successToast("Đăng ký thành công!");
    },
    onError: (error) => {
      errorToast("Đăng ký thất bại!");
    },
  });
};
