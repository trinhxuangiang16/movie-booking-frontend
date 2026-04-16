import { errorToast, successToast } from "@/components/ui/toastStatus";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login.service";
import { setCookie } from "cookies-next";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (data) => {
      successToast("Đăng nhập thành công!");

      const accessToken = data?.token?.accessToken;
      setCookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: "lax",
      });

      // Dùng window.location thay vì router.push()
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },
    onError: () => errorToast("Đăng nhập thất bại!"),
  });
};
