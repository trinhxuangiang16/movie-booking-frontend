import { oswald } from "@/lib";
import { TBanner, TMovie } from "@/features/movie/index";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function TopContent({
  movie,
  banner,
}: {
  movie: TMovie | undefined;
  banner: TBanner | undefined;
}) {
  if (!movie) return null;

  return (
    <div className="relative bg-transparent">
      <div className="detail-banner relative w-19/20 pt-[80px] h-[420px] mx-auto rounded-4xl overflow-hidden">
        <img
          src={banner?.hinh_anh}
          alt={movie.ten_phim}
          className="w-full h-full object-cover border border-3 border-white/70 rounded-4xl"
        />
        <div className="absolute w-full h-[calc(420px-80px)] mt-[80px] inset-0 bg-gradient-to-t from-black to-transparent border border-3 border-white/70 rounded-4xl"></div>
      </div>
      <div className="detail-poster absolute aspect-[2/3] w-1/9 left-50 transform -translate-y-1/2 border border-2 border-white rounded-2xl overflow-hidden shadow-lg z-15 drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
        <img
          src={movie.hinh_anh}
          alt={movie.ten_phim}
          className="w-full h-full rounded-2xl"
        />
      </div>
      <div
        className={`detail-name ${oswald.className} absolute z-10 left-42 ml-60  top-[455px] text-4xl text-white`}
      >
        <div className="absolute z-12 italic text-[13px] ">
          <Link href="/" className="cursor-pointer">
            Trang Chủ
          </Link>{" "}
          / <span className="text-gray-400">{movie.ten_phim}</span>
        </div>
        <h1 className="font-bold mt-6">{movie.ten_phim}</h1>
      </div>
    </div>
  );
}
