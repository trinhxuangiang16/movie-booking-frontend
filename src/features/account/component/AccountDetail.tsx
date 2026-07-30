"use client";

import { useEffect, useState } from "react";
import { Camera, User, Mail, Phone, Shield, Hash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAccountProfile, useUpdateAccount } from "../hooks/useAccount";
import { IUserInfo } from "../types/account.types";

const DEFAULT_USER: IUserInfo = {
  tai_khoan: 1,
  ho_ten: "Admin",
  email: "ad@gmail.com",
  so_dt: "097533257",
  loai_nguoi_dung: "ADMIN",
  isDeleted: false,
};

const DEFAULT_AVATAR =
  "https://img.magnific.com/vector-mien-phi/hinh-minh-hoa-chang-trai-tre-mim-cuoi_1308-174669.jpg";

export default function AccountDetail() {
  const { data: apiUser, isLoading } = useAccountProfile();
  const updateAccountMutation = useUpdateAccount();

  const user = apiUser || DEFAULT_USER;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ho_ten: "",
    email: "",
    so_dt: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ho_ten: user.ho_ten || "",
        email: user.email || "",
        so_dt: user.so_dt || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      ho_ten: user.ho_ten || "",
      email: user.email || "",
      so_dt: user.so_dt || "",
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ho_ten.trim()) {
      toast.error("Vui lòng nhập họ và tên");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    if (!formData.so_dt.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    updateAccountMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Cập nhật thông tin tài khoản thành công!");
        setIsEditing(false);
      },
      onError: (err) => {
        const errorMsg =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Cập nhật thông tin thất bại!";
        toast.error(errorMsg);
      },
    });
  };

  const formattedUserId = `U00${user.tai_khoan || 1}`;

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-[190px] md:py-20">
      {/* Title section */}
      <div className="mb-8 flex items-center gap-3">
        <span className="h-7 w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff]" />
        <h1 className="text-2xl font-bold uppercase tracking-wider text-white md:text-3xl">
          Thông tin tài khoản
        </h1>
      </div>

      {/* Main Container Card */}
      <div className="rounded-2xl border border-[#2a2f55] bg-[#0a0e24] p-6 shadow-2xl md:p-10">
        {/* Header Avatar Info */}
        <div className="mb-8 flex flex-col items-center gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-start sm:gap-6">
          <div className="relative shrink-0">
            <img
              src={DEFAULT_AVATAR}
              alt={user.ho_ten || "Avatar"}
              className="h-28 w-28 rounded-full border-2 border-[#63eaff]/50 object-cover shadow-[0_0_20px_rgba(99,234,255,0.25)]"
            />
            <button
              type="button"
              title="Cập nhật ảnh đại diện"
              className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-[#63eaff] to-[#ff88e1] text-[#06101c] shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h2 className="text-xl font-bold text-white md:text-2xl">
                {user.ho_ten || "Người dùng"}
              </h2>
              <span className="rounded bg-[#63eaff]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#7fefff]">
                {user.loai_nguoi_dung || "USER"}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/60">{user.email}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Mã tài khoản: <span className="text-[#63eaff]">{formattedUserId}</span>
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Mã người dùng */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <Hash className="h-3.5 w-3.5 text-[#63eaff]" />
                Mã người dùng
              </label>
              <input
                type="text"
                disabled
                value={formattedUserId}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/50 outline-none cursor-not-allowed"
              />
            </div>

            {/* Loại người dùng */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <Shield className="h-3.5 w-3.5 text-[#ff88e1]" />
                Loại người dùng
              </label>
              <input
                type="text"
                disabled
                value={user.loai_nguoi_dung || "Khách hàng"}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/50 outline-none cursor-not-allowed"
              />
            </div>

            {/* Họ và tên */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <User className="h-3.5 w-3.5 text-[#63eaff]" />
                Họ và tên
              </label>
              <input
                type="text"
                name="ho_ten"
                disabled={!isEditing}
                value={formData.ho_ten}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-white/70"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <Mail className="h-3.5 w-3.5 text-[#63eaff]" />
                Email
              </label>
              <input
                type="email"
                name="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-white/70"
              />
            </div>

            {/* Số điện thoại */}
            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <Phone className="h-3.5 w-3.5 text-[#63eaff]" />
                Số điện thoại
              </label>
              <input
                type="text"
                name="so_dt"
                disabled={!isEditing}
                value={formData.so_dt}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-white/70"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-white/10">
            {!isEditing ? (
              <Button
                type="button"
                variant="payRetry"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-8"
              >
                Chỉnh sửa thông tin
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="payDismiss"
                  onClick={handleCancel}
                  disabled={updateAccountMutation.isPending}
                  className="w-full sm:w-auto px-6"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="payment"
                  disabled={updateAccountMutation.isPending}
                  className="w-full sm:w-auto px-8"
                >
                  {updateAccountMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
