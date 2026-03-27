import { loginSchema } from "@/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ILogin } from "../types/auth.types";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      mat_khau: "",
    },
  });

  const onSubmit = async (data: ILogin) => {};
}
