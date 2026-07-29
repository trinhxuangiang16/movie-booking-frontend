"use client";

import { oswald } from "@/lib";
import { useNews } from "@/features/movie/hooks/useNews";
import { TNews } from "@/features/movie/types/typeHomeSections";
import TitleSection from "../cateroryCardList/TitleSection";

export default function NewsSection() {
  const { data: news = [] as TNews[] } = useNews();

  if (news.length === 0) return null;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN");

  const [featured, ...rest] = news;

  return (
    <div className="relative">
      <TitleSection status="news" />
      <div className={`relative py-16 ${oswald.className}`}>
        <div className="w-8/9 mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr]">
            <article className="group relative h-[440px] cursor-pointer overflow-hidden [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
              <img
                src={featured.hinh_anh}
                alt={featured.tieu_de}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a1c] via-[#070a1c]/55 to-[#070a1c]/10" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.7)_0_8px,transparent_8px_22px)] opacity-15" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#c0a4ff]/0 transition-all duration-500 group-hover:ring-[#c0a4ff]/50" />

              <span className="absolute left-7 top-6 z-10 border border-[#ff88e1]/60 bg-[#070a1c]/70 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.3em] text-[#ff88e1]">
                NỔI BẬT
              </span>

              <div className="relative z-10 flex h-full flex-col justify-end p-8 pl-10">
                <p className="text-[11px] tracking-[0.25em] text-[#63eaff]/75">
                  {formatDate(featured.ngay_dang)}
                </p>
                <h3 className="mt-2 line-clamp-2 text-2xl font-bold text-white lg:text-3xl">
                  {featured.tieu_de}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-xl text-sm font-light leading-relaxed text-white/65">
                  {featured.mo_ta}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Xem chi tiết
                  <span className="h-px w-8 bg-gradient-to-r from-[#63eaff] to-[#ff88e1] transition-all duration-300 group-hover:w-14" />
                </span>
              </div>
            </article>

            <div className="flex flex-col justify-center gap-1">
              {rest.map((item) => (
                <article
                  key={item.ma_tin}
                  className="group relative flex cursor-pointer items-center gap-6 border-b border-white/[.07] py-6 pl-6 pr-4 transition-colors duration-300 last:border-b-0 hover:bg-[#c0a4ff]/[.05]"
                >
                  <span className="absolute left-0 top-1/2 h-0 w-[2.5px] -translate-y-1/2 bg-gradient-to-b from-[#63eaff] via-[#c0a4ff] to-[#ff88e1] transition-all duration-300 group-hover:h-2/3" />

                  <div className="relative shrink-0 border border-white/12 bg-white/[.03] px-3.5 py-2.5 text-center [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] transition-colors duration-300 group-hover:border-[#63eaff]/40">
                    <p className="text-2xl font-bold leading-none text-white transition-colors duration-300 group-hover:text-[#7fefff]">
                      {formatDate(item.ngay_dang).split("/")[0]}
                    </p>
                    <p className="mt-1 text-[9px] tracking-[0.2em] text-white/40">
                      {formatDate(item.ngay_dang).split("/").slice(1).join("/")}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <h4 className="line-clamp-1 font-bold text-white transition-colors duration-300 group-hover:text-[#7fefff]">
                      {item.tieu_de}
                    </h4>
                    <p className="mt-1.5 line-clamp-1 text-sm font-light text-white/50">
                      {item.mo_ta}
                    </p>
                  </div>

                  <span className="ml-auto shrink-0 -translate-x-2 self-center text-lg text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#ff88e1]">
                    →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
