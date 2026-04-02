"use client";
import { LoginSchema, loginSchema } from "@/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";

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
      className="max-w-sm mx-auto p-4 border space-y-4"
    >
      <FormInput control={control} name="email" label="Email" />

      <FormInput
        control={control}
        name="mat_khau"
        label="Mật khẩu"
        type="password"
      />

      <Button type="submit" className="w-full bg-black text-white py-2">
        {isPending ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
