"use client";

import { oswald } from "@/lib";
import { usePromotions } from "@/features/movie/hooks/usePromotions";
import {
  TPromotion,
  TPromotionType,
} from "@/features/movie/types/typeHomeSections";
import TitleSection from "../cateroryCardList/TitleSection";
import { TMovie } from "@/features/movie/types/typeMovie";



const promotionTypeConfig: Record<
  TPromotionType,
  {
    label: string;
    code: string;
    accent: string;
    icon: React.ReactNode;
    pattern: string;
  }
> = {
  giam_gia: {
    label: "Giảm giá",
    code: "SALE",
    accent: "#e8c46a",

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
      "repeating-linear-gradient(135deg, rgba(232,196,106,.07) 0 2px, transparent 2px 14px)",
  },
  qua_tang: {
    label: "Quà tặng",
    code: "GIFT",
    accent: "#e8c46a",

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
      "radial-gradient(circle at 20% 30%, rgba(232,196,106,.09) 0 1.5px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(232,196,106,.07) 0 1.5px, transparent 2px), radial-gradient(circle at 45% 85%, rgba(232,196,106,.08) 0 1.5px, transparent 2px)",
  },
  thanh_vien: {
    label: "Thành viên",
    code: "VIP",
    accent: "#e8c46a",

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
      "repeating-conic-gradient(from 45deg at 50% 120%, rgba(232,196,106,.05) 0deg 8deg, transparent 8deg 24deg)",
  },
};

export default function PromotionSection({ }) {
  const { data: promotions = [] as TPromotion[] } = usePromotions();

  if (promotions.length === 0) return null;
  const noneData: TMovie[] = [];
  return (
    <div className="relative">
      <TitleSection status="promotion" movies={noneData} />
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

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${promo.hinh_anh})` }}
                  />
                  <div
                    className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundImage: config.pattern }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-[#070a1c] via-[#070a1c]/80 to-transparent" />

                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] shadow-[0_-1px_6px_rgba(232,196,106,.18)]"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(232,139,150,0) 0%, rgba(232,139,150,.65) 12%, rgba(192,94,102,.75) 26%, rgba(255,233,168,.95) 48%, rgba(200,155,74,.85) 64%, rgba(255,243,196,1) 80%, rgba(230,198,117,0) 100%)",
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/0" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${config.accent}66, 0 0 34px -8px ${config.accent}55`,
                    }}
                  />

                  <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center">
                    <span
                      className="absolute inset-y-3 right-0 w-px"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, rgba(238,224,190,.32) 0 5px, transparent 5px 11px)",
                      }}
                    />
                    <span
                      className="rotate-180 text-sm font-black tracking-[0.5em] [writing-mode:vertical-rl]"
                      style={{
                        color: config.accent,
                        textShadow: `0 1px 2px rgba(4,6,15,1), 0 2px 12px rgba(4,6,15,.85), 0 0 16px ${config.accent}66`,
                      }}
                    >
                      {config.code}
                    </span>
                  </div>

                  <div
                    className="absolute right-5 top-5 h-14 w-14 opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-0.5"
                    style={{
                      color: config.accent,
                      filter: `drop-shadow(0 2px 5px rgba(4,6,15,.85)) drop-shadow(0 0 12px ${config.accent}55)`,
                    }}
                  >
                    {config.icon}
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-end py-6 pl-16 pr-6">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.35em]"
                      style={{
                        color: config.accent,
                        textShadow:
                          "0 1px 2px rgba(4,6,15,1), 0 2px 12px rgba(4,6,15,.85)",
                      }}
                    >
                      {config.label}
                    </p>
                    <h3 className="mt-2 line-clamp-1 bg-[linear-gradient(115deg,#ffd3cc_0%,#e88b96_16%,#c05e66_30%,#ffe9a8_46%,#c89b4a_60%,#fff3c4_72%,#e6c675_100%)] bg-clip-text text-[26px] font-bold text-transparent [-webkit-text-stroke:0.4px_rgba(70,35,10,.45)] [filter:drop-shadow(0_1px_1px_rgba(4,6,15,.95))_drop-shadow(0_5px_16px_rgba(4,6,15,.75))]">
                      {promo.tieu_de}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm font-normal leading-relaxed text-[#f2ecdf] [text-shadow:0_1px_2px_rgba(4,6,15,.95),0_3px_10px_rgba(4,6,15,.8)]">
                      {promo.mo_ta}
                    </p>

                    {promo.han_su_dung && (
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs font-semibold tracking-[0.12em] text-[#cdbfa4] [text-shadow:0_1px_6px_rgba(4,6,15,.9)]">
                          Áp dụng đến{" "}
                          <span className="font-bold text-[#f8f3e6]">
                            {promo.han_su_dung}
                          </span>
                        </p>
                        <span
                          className="-translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          style={{ color: config.accent }}
                        >
                          →
                        </span>
                      </div>
                    )}
                  </div>

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
