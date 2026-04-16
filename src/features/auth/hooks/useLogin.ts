import { errorToast, successToast } from "@/components/ui/toastStatus";

import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login.service";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (data) => {
      console.log("🚀 ~ KIỂM TRA ~ useLogin ~ data:", data);
      successToast("Đăng nhập thành công!");

      const accessToken = data?.token?.accessToken;

      setCookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: false,
        sameSite: "strict",
      });
      router.push("/");
    },
    onError: (error) => {
      errorToast("Đăng nhập thất bại!");
    },
  });
};
