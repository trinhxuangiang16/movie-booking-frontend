"use client";

import { useState } from "react";
import { toast } from "sonner";
import { oswald } from "@/lib";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./newsletterSection.css";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Email không hợp lệ, vui lòng kiểm tra lại.");
      return;
    }
    toast.success("Đăng ký nhận tin thành công!");
    setEmail("");
  };

  return (
    <div className={`relative pt-16 ${oswald.className}`}>
      {/* bg trong suốt — chỉ 1 vũng tối elip cục bộ sau chữ để chữ bạc không chìm vào chữ MOVI.E của nền chung */}
      <div className="relative px-8 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_62%_at_50%_45%,rgba(4,6,18,.8),rgba(4,6,18,.3)_58%,transparent_88%)]" />

        {/* 2 tia sáng chéo kiểu đèn premiere, rất mờ */}
        <div className="nls-ray nls-ray--l pointer-events-none absolute inset-0" />
        <div className="nls-ray nls-ray--r pointer-events-none absolute inset-0" />

        <div className="relative z-10">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.4em] text-[#7fefff]">
            Bắt đầu ngay hôm nay
          </p>

          {/* tiêu đề bạc + lớp shine quét qua định kỳ */}
          <h2 className="nls-title relative mx-auto mt-4 w-fit text-4xl font-bold leading-[1.3] tracking-wide sm:text-6xl">
            <span className="bg-gradient-to-b from-[#4a4f66] via-[#eef1f8] to-[#383d55] bg-clip-text text-transparent">
              ĐỪNG BỎ LỠ SUẤT CHIẾU HOT
            </span>
            <span className="nls-shine" aria-hidden>
              ĐỪNG BỎ LỠ SUẤT CHIẾU HOT
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Đăng ký nhận email để cập nhật{" "}
            <span className="font-semibold text-[#7fefff]">phim mới</span>,{" "}
            <span className="font-semibold text-[#e0b3ff]">ưu đãi</span> và sự
            kiện điện ảnh sớm nhất.
          </p>

          {/* form vé: vát góc thay bo tròn, viền gradient bạc→cyan khi focus */}
          <form
            onSubmit={handleSubmit}
            className="nls-form mx-auto mt-10 max-w-lg"
          >
            <div className="nls-formInner flex items-center gap-2 p-1.5">
              <span className="nls-mail ml-3 shrink-0" aria-hidden>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-0 bg-transparent text-base text-white shadow-none placeholder:text-white/45 focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="nls-btn h-12 shrink-0 px-8 text-base font-bold"
              >
                Đăng ký
              </Button>
            </div>
          </form>

          <p className="mt-6 text-xs tracking-[0.18em] text-white/45">
            KHÔNG SPAM — HỦY ĐĂNG KÝ BẤT CỨ LÚC NÀO
          </p>
        </div>
      </div>
    </div>
  );
}
