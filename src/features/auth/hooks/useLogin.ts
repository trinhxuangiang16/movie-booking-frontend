import { errorToast, successToast } from "@/components/ui/toastStatus";
import { api } from "@/lib";
import { LoginSchema } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login.sevice";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (data) => {
      successToast("Đăng nhập thành công!");
      console.log(data);
      const token = data?.token?.accessToken;
      if (token) localStorage.setItem("accessToken", token);
    },
    onError: (error) => {
      errorToast("Đăng nhập thất bại!");
    },
  });
};
