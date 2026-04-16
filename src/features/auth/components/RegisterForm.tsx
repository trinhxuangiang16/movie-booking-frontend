"use client";
import { registerSchema, RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useRegister } from "../hooks/useRegister";
import { oswald } from "@/lib";
import Link from "next/link";

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const { handleSubmit, control } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      mat_khau: "",
      ho_ten: "",
      so_dt: "",
    },
  });

  const onSubmit = async (value: RegisterSchema) => {
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
      <FormInput control={control} name="ho_ten" label="Họ tên" />
      <FormInput control={control} name="so_dt" label="Số điện thoại" />

      <Button
        variant="gradient"
        type="submit"
        className="w-full text-black py-2"
      >
        {isPending ? "Loading..." : "Đăng Ký"}
      </Button>
      <Link
        href="/login"
        className="text-sm text-gray-400 hover:text-gray-200 block text-center"
      >
        Nếu bạn đã có tài khoản? Đăng nhập ngay
      </Link>
    </form>
  );
}
