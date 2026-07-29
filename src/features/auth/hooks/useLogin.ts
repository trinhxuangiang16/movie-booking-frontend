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

      const refreshToken = data?.token?.refreshToken;
      setCookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: "lax",
      });


      if (data?.user) {
        setCookie("user", JSON.stringify(data.user), {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: false,
          sameSite: "lax",
        });

        if (data.user.email) {
          localStorage.setItem("userEmail", data.user.email);
        }
      }


      setTimeout(() => {
        window.location.href = "/";
      }, 500); //
    },
    onError: () => errorToast("Đăng nhập thất bại!"),
  });
};
