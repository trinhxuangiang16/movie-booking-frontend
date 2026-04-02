"use client";
import { toast } from "sonner";

export const toastStyles = {
  success: {
    className: "!bg-green-200 !text-green-500 !border-none",
  },
  error: {
    className: "!bg-red-200 !text-red-500 !border-none",
  },
};

export const errorToast = (message: string) => {
  return toast.error(message, toastStyles.error);
};

export const successToast = (message: string) => {
  return toast.success(message, toastStyles.success);
};
