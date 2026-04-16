"use client";
import { LoginSchema, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import Link from "next/link";
import { oswald } from "@/lib";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      mat_khau: "",
    },
  });

  const onSubmit = async (value: LoginSchema) => {
    mutate(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-sm mx-auto p-4 border space-y-4 text-white bg-[#1e1e2f]/[.8] rounded-2xl border-gray-700 ${oswald.className}`}
    >
      <FormInput control={control} name="email" label="Email" />

      <FormInput
        control={control}
        name="mat_khau"
        label="Mật khẩu"
        type="password"
      />

      <Button
        variant="gradient"
        type="submit"
        className="w-full text-black py-2"
      >
        {isPending ? "Loading..." : "Đăng Nhập"}
      </Button>
      <Link
        href="/register"
        className="text-sm text-gray-400 hover:text-gray-200 block text-center"
      >
        Nếu bạn chưa có tài khoản? Đăng ký ngay
      </Link>
    </form>
  );
}
