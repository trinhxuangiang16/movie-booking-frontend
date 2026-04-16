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
      console.log("🚀 ~ KIỂM TRA ~ useLogin ~ data:", data);
      successToast("Đăng nhập thành công!");

      const accessToken = data?.token?.accessToken;

      // Định nghĩa cookieOptions TRƯỚC khi dùng
      const cookieOptions = {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: "strict" as const,
        secure: false,
      };

      // Sau đó check production và update
      const isProduction = process.env.NODE_ENV === "production";
      if (isProduction) {
        cookieOptions.secure = true;
      }

      setCookie("accessToken", accessToken, cookieOptions);
      console.log("Cookie đã set");

      router.push("/");
    },
    onError: (error) => {
      errorToast("Đăng nhập thất bại!");
    },
  });
};
