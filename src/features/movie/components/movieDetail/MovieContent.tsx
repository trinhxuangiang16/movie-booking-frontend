"use client";

import { Button } from "@/components/ui/button";
import { oswald } from "@/lib/fonts";
import { TMovie } from "../../types/typeMovie";
import TrailerPlayer from "../homePage/TrailerPlayer";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function MovieContent({ movie }: { movie?: TMovie }) {
  if (!movie) return null;

  return (
    <section className={`${oswald.className} space-y-8 text-white`}>
      <div
        id="trailer"
        className="overflow-hidden rounded-[28px] border border-white/15 bg-[#0d1232]/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Trailer
            </p>
            <h2 className="mt-1 text-2xl font-bold uppercase md:text-3xl">
              Trailer Phim
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="#lich-chieu">Đặt vé ngay</Link>
          </Button>
        </div>

        <div className="p-4 md:p-6">
          <div className="relative aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-black/40">
            <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.5))] pointer-events-none" />
            <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/80 backdrop-blur">
              Xem trước
            </div>
            <div className="absolute inset-0">
              <TrailerPlayer videoId={movie.trailer} title="trailer-banner" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/15 bg-[#0d1232]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
            Nội dung phim
          </span>
          <span className="rounded-full border border-[#ffd08a]/25 bg-[#ffd08a]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#ffe4b5]">
            {movie.hot
              ? "Hot"
              : movie.dang_chieu
                ? "Đang chiếu"
                : movie.sap_chieu
                  ? "Sắp chiếu"
                  : "Cập nhật"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
            Đánh giá: {movie.danh_gia || 0}
            <FaStar className="text-[#ffe869]" />
          </span>
        </div>

        <p className="mt-5 text-base leading-8 text-white/85 md:text-[1.05rem]">
          {movie.mo_ta || "Nội dung phim đang được cập nhật."}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Ngày khởi chiếu
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {movie.ngay_khoi_chieu
                ? new Intl.DateTimeFormat("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(movie.ngay_khoi_chieu))
                : "Đang cập nhật"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Trạng thái
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {movie.hot
                ? "HOT"
                : movie.dang_chieu
                  ? "Đang chiếu"
                  : movie.sap_chieu
                    ? "Sắp chiếu"
                    : "Đang cập nhật"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-2 xl:col-span-1">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Hành động nhanh
            </p>
            <Button
              asChild
              variant="gradient"
              className="mt-2 w-full rounded-full text-black"
            >
              <Link href="#lich-chieu">Chọn suất chiếu</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
