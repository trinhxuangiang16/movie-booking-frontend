"use client";

import { oswald } from "@/lib/fonts";
import { TMovie } from "../../types/typeMovie";
import TrailerPlayer from "../homePage/TrailerPlayer";

const CLIP_PANEL =
  "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]";

function PanelHeading({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="h-9 w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff]" />
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
            {index}
          </span>
          <h2 className="text-xl font-bold uppercase leading-tight tracking-wide text-white md:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      {note && (
        <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-white/30 sm:block">
          {note}
        </span>
      )}
    </div>
  );
}

export default function MovieContent({ movie }: { movie?: TMovie }) {
  if (!movie) return null;

  const description = movie.mo_ta?.trim();

  return (
    <section className={`${oswald.className} space-y-10 text-white`}>
      <div id="trailer">
        <PanelHeading index="01" title="Trailer" note="Official trailer" />

        <div
          className={`relative aspect-video overflow-hidden bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,1)] ring-1 ring-white/15 ${CLIP_PANEL}`}
        >
          <TrailerPlayer videoId={movie.trailer} title="trailer-banner" />
        </div>
      </div>

      <div>
        <PanelHeading index="02" title="Nội dung phim" />

        <div
          className={`relative bg-[#141a45] p-6 ring-1 ring-white/15 md:p-8 ${CLIP_PANEL}`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.5)_0_10px,transparent_10px_26px)] opacity-[.08]"
          />

          <span
            aria-hidden
            className="absolute right-6 top-3 select-none text-[110px] leading-none text-white/[.04]"
          >
            &rdquo;
          </span>

          <p className="relative pl-4 text-[1.15rem] font-light leading-[1.95] tracking-wide text-white/80 md:pl-6 md:text-[1.25rem]">
            {description || "Nội dung phim đang được cập nhật."}
          </p>

          <div className="relative mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pl-4 pt-5 md:pl-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                Định dạng
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                2D · 3D · IMAX
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                Ngôn ngữ
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                Tiếng Việt · Phụ đề Anh
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                Phân loại
              </p>
              <p className="mt-1 text-sm font-bold text-white">T13</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
