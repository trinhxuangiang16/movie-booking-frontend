// components/Footer.tsx
"use client";

import Link from "next/link";
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { bebas, oswald } from "@/lib";

export default function Footer() {
  const cinemas = [
    "CGV Cinemas",
    "BHD Star Cineplex",
    "Lotte Cinema",
    "Galaxy Cinema",
    "Cinestar",
  ];
  const about = [
    { label: "Giới thiệu", href: "#" },
    { label: "Tuyển dụng", href: "#" },
    { label: "Điều khoản sử dụng", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Liên hệ quảng cáo", href: "#" },
  ];
  const support = [
    { label: "Câu hỏi thường gặp", href: "#" },
    { label: "Hướng dẫn đặt vé", href: "#" },
    { label: "Chính sách hoàn vé", href: "#" },
    { label: "Ưu đãi thành viên", href: "#" },
  ];
  const socials = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaYoutube, href: "#", label: "Youtube" },
    { icon: FaTiktok, href: "#", label: "Tiktok" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer
      className={`relative overflow-hidden bg-[#001029] ${oswald.className}`}
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/dark-brick-wall.png')",
      }}
    >
      {/* glow trang trí */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-[#97dde8]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-[#ffccf2]/10 blur-[120px]" />

      {/* film strip trên cùng */}
      <div className="relative h-6 w-full bg-black">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#97dde8] to-transparent" />
        <div className="film-strip-track absolute inset-x-0 top-1.5 h-3 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.55)_0_10px,transparent_10px_26px)] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-8 pb-6 pt-12 lg:px-12">
        {/* HÀNG CHÍNH: brand | links x2 | liên hệ */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* BRAND */}
          <div>
            <Link href="/" className="footer-logo group">
              <p className={bebas.className}>Movi</p>
              <div className={`${bebas.className} footer-logo-e`}>.E</div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              Nền tảng đặt vé xem phim trực tuyến — nhanh, tiện, ưu đãi mỗi
              ngày.
            </p>

            {/* social + trạng thái hỗ trợ gộp 1 hàng */}
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/60 transition-all [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-[#ffccf2] hover:to-[#97dde8] hover:text-black"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
              <span className="mx-1 h-5 w-px bg-white/10" />
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  Hỗ trợ 24/7
                </span>
              </span>
            </div>
          </div>

          {/* VỀ MOVI.E */}
          <nav aria-label="Về Movi.E">
            <h4 className="relative pl-3 text-sm font-bold uppercase tracking-[0.15em] text-white">
              <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#ffccf2] to-[#97dde8]" />
              Về Movi.E
            </h4>
            <ul className="mt-4 space-y-2.5">
              {about.map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-[#ffccf2] to-[#97dde8] transition-all duration-300 group-hover:w-4" />
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* HỖ TRỢ */}
          <nav aria-label="Hỗ trợ">
            <h4 className="relative pl-3 text-sm font-bold uppercase tracking-[0.15em] text-white">
              <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#ffccf2] to-[#97dde8]" />
              Hỗ trợ
            </h4>
            <ul className="mt-4 space-y-2.5">
              {support.map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-[#ffccf2] to-[#97dde8] transition-all duration-300 group-hover:w-4" />
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* LIÊN HỆ */}
          <div>
            <h4 className="relative pl-3 text-sm font-bold uppercase tracking-[0.15em] text-white">
              <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#ffccf2] to-[#97dde8]" />
              Liên hệ
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-base text-[#97dde8]" />
                <span>Tầng 12, Toà nhà Movi.E, Q.1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="shrink-0 text-base text-[#97dde8]" />
                <a href="tel:19001234" className="transition hover:text-white">
                  1900 1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="shrink-0 text-base text-[#97dde8]" />
                <a
                  href="mailto:hotro@movie.vn"
                  className="transition hover:text-white"
                >
                  hotro@movie.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM: đối tác + copyright + legal gộp 1 hàng */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.07] pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              Đối tác
            </span>
            {cinemas.map((c) => (
              <span
                key={c}
                className="cursor-default text-xs text-white/35 transition-colors hover:text-[#97dde8]"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/30">
            <p>© {new Date().getFullYear()} Movi.E Entertainment</p>
            <span className="h-3 w-px bg-white/10" />
            <a href="#" className="transition hover:text-white/70">
              Điều khoản
            </a>
            <a href="#" className="transition hover:text-white/70">
              Bảo mật
            </a>
            <a href="#" className="transition hover:text-white/70">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* film strip đáy */}
      <div className="relative h-6 w-full bg-black">
        <div className="film-strip-track absolute inset-x-0 top-1.5 h-3 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.35)_0_10px,transparent_10px_26px)] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" />
      </div>
    </footer>
  );
}
