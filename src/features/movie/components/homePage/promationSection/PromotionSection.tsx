"use client";

import { oswald } from "@/lib";
import { usePromotions } from "@/features/movie/hooks/usePromotions";
import {
  TPromotion,
  TPromotionType,
} from "@/features/movie/types/typeHomeSections";
import TitleSection from "../cateroryCardList/TitleSection";

/*
  Thẻ ưu đãi kiểu "vé mời" (invitation ticket):
  - Không dùng ảnh stock — nền gradient ink + hoạ tiết riêng từng loại vẽ bằng CSS
  - Vát góc clip-path đồng bộ toàn trang, cuống vé bên trái có mã loại xoay dọc
  - Icon SVG mảnh tự vẽ, không dùng icon pack tròn đại trà
*/

const promotionTypeConfig: Record<
  TPromotionType,
  {
    label: string;
    code: string;
    accent: string; // màu chủ đạo của loại
    icon: React.ReactNode;
    pattern: string; // hoạ tiết nền CSS riêng
  }
> = {
  giam_gia: {
    label: "Giảm giá",
    code: "SALE",
    accent: "#63eaff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 12l8-8h8v8l-8 8-8-8z" />
        <circle cx="16.5" cy="7.5" r="1.4" />
      </svg>
    ),
    pattern:
      "repeating-linear-gradient(135deg, rgba(99,234,255,.06) 0 2px, transparent 2px 14px)",
  },
  qua_tang: {
    label: "Quà tặng",
    code: "GIFT",
    accent: "#c0a4ff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="4" y="9" width="16" height="11" />
        <path d="M4 9h16M12 9v11M12 9c-3 0-4.5-1.2-4.5-3S9 3.5 10.5 4.5 12 9 12 9zm0 0c3 0 4.5-1.2 4.5-3S15 3.5 13.5 4.5 12 9 12 9z" />
      </svg>
    ),
    pattern:
      "radial-gradient(circle at 20% 30%, rgba(192,164,255,.09) 0 1.5px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(192,164,255,.07) 0 1.5px, transparent 2px), radial-gradient(circle at 45% 85%, rgba(192,164,255,.08) 0 1.5px, transparent 2px)",
  },
  thanh_vien: {
    label: "Thành viên",
    code: "VIP",
    accent: "#ff88e1",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-1.6 11H4.6L3 8z" />
      </svg>
    ),
    pattern:
      "repeating-conic-gradient(from 45deg at 50% 120%, rgba(255,136,225,.05) 0deg 8deg, transparent 8deg 24deg)",
  },
};

export default function PromotionSection() {
  const { data: promotions = [] as TPromotion[] } = usePromotions();

  if (promotions.length === 0) return null;

  return (
    <div className="relative">
      <TitleSection status="promotion" />
      <div className={`relative py-20 ${oswald.className}`}>
        <div className="w-8/9 mx-auto">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promo) => {
              const config = promotionTypeConfig[promo.loai];
              return (
                <article
                  key={promo.ma_khuyen_mai}
                  className="group relative h-[240px] cursor-pointer overflow-hidden [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]"
                >
                  {/* ảnh nền giữ nguyên độ sáng, không phủ tối */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${promo.hinh_anh})` }}
                  />
                  {/* hoạ tiết sọc / chấm riêng từng loại phủ lên trên ảnh */}
                  <div
                    className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundImage: config.pattern }}
                  />
                  {/* scrim: dải tối mờ dần từ đáy lên để chữ nổi, phần trên ảnh vẫn sáng */}
                  <div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-[#070a1c] via-[#070a1c]/65 to-transparent" />

                  {/* viền mảnh: trắng mờ, hover chuyển màu accent */}
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/0" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${config.accent}66, 0 0 34px -8px ${config.accent}55`,
                    }}
                  />

                  {/* CUỐNG VÉ trái: đường đục lỗ + mã loại xoay dọc */}
                  <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center">
                    <span
                      className="absolute inset-y-3 right-0 w-px"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, rgba(255,255,255,.28) 0 5px, transparent 5px 11px)",
                      }}
                    />
                    <span
                      className="rotate-180 text-[10px] font-bold tracking-[0.5em] [writing-mode:vertical-rl]"
                      style={{ color: `${config.accent}99` }}
                    >
                      {config.code}
                    </span>
                  </div>

                  {/* icon nét mảnh, lớn, mờ ở góc trên phải như watermark */}
                  <div
                    className="absolute right-5 top-5 h-14 w-14 opacity-[.28] transition-all duration-500 group-hover:opacity-60 group-hover:-translate-y-0.5"
                    style={{ color: config.accent }}
                  >
                    {config.icon}
                  </div>

                  {/* nội dung */}
                  <div className="relative z-10 flex h-full flex-col justify-end py-6 pl-16 pr-6">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.35em]"
                      style={{ color: config.accent }}
                    >
                      {config.label}
                    </p>
                    <h3 className="mt-2 line-clamp-1 text-2xl font-bold text-white">
                      {promo.tieu_de}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-white/70">
                      {promo.mo_ta}
                    </p>

                    {promo.han_su_dung && (
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs tracking-[0.12em] text-white/40">
                          Áp dụng đến{" "}
                          <span className="font-semibold text-white/70">
                            {promo.han_su_dung}
                          </span>
                        </p>
                        {/* mũi tên trượt vào khi hover */}
                        <span
                          className="-translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          style={{ color: config.accent }}
                        >
                          →
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ánh sáng lướt qua khi hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_42%,rgba(255,255,255,.08)_50%,transparent_58%)] transition-transform duration-1000 group-hover:translate-x-full" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
