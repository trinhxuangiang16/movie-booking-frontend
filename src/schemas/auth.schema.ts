import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  mat_khau: z.string().trim().min(1, "Mật khẩu không được trống"),
});

export const registerSchema = z.object({
  ho_ten: z.string().trim().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().trim().email("Email không hợp lệ"),
  so_dt: z.string().trim().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
  mat_khau: z.string().trim().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
