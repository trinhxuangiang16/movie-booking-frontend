"use client";

import { oswald } from "@/lib";
import { useTheaterSystem } from "@/features/movie/hooks/useGetTheaterSystem";
import { ITheaterSystem } from "@/features/movie/types/typeCommon";
import "./cinemaSystemSection.css";

export default function CinemaSystemSection() {
  const { data: systemTheaters = [] as ITheaterSystem[] } = useTheaterSystem();

  if (systemTheaters.length === 0) return null;

  return (
    <div className={`css-band relative z-10 -mt-8 ${oswald.className}`}>
      <span className="css-line css-line--top" aria-hidden />

      <div className="relative py-14">
        <div className="mb-10 flex items-center justify-center gap-5">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-white/60">
            Đồng hành cùng các cụm rạp uy tín toàn quốc
          </p>
        </div>

        <div className="group relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center py-2 group-hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, i) =>
              systemTheaters.map((theater: ITheaterSystem) => (
                <div
                  key={`${i}-${theater.ma_he_thong_rap}`}
                  className="css-item flex shrink-0 cursor-pointer items-center gap-4"
                >
                  <div className="css-logo shrink-0 overflow-hidden rounded-full bg-white">
                    {theater.logo && (
                      <img
                        src={theater.logo}
                        alt={theater.ten_he_thong_rap}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <p className="css-name whitespace-nowrap text-base font-bold text-white/85">
                    {theater.ten_he_thong_rap}
                  </p>
                </div>
              )),
            )}
          </div>
        </div>
      </div>

      <span className="css-line css-line--bottom" aria-hidden />
    </div>
  );
}
