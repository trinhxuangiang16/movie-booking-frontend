import { oswald } from "@/lib";
import { TBanner, TMovie } from "@/features/movie/index";
import { useEffect, useRef, useState } from "react";

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
      <div className="detail-banner relative w-19/20 pt-[80px] h-[450px] mx-auto rounded-4xl overflow-hidden">
        <img
          src={banner?.hinh_anh}
          alt={movie.ten_phim}
          className="w-full h-full object-cover border border-3 border-white/70 rounded-4xl"
        />
        <div className="absolute w-full h-[calc(450px-80px)] mt-[80px] inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent border border-3 border-white/70 rounded-4xl"></div>
      </div>
      <div className="detail-poster absolute w-2/15 left-60 transform -translate-y-1/2 border border-2 border-white rounded-2xl overflow-hidden shadow-lg">
        <img
          src={movie.hinh_anh}
          alt={movie.ten_phim}
          className="w-full h-full rounded-2xl"
        />
      </div>
      <div
        className={`detail-name ${oswald.className} absolute left-60 ml-60  top-[500px] text-4xl text-white font-bold`}
      >
        <h1>{movie.ten_phim}</h1>
      </div>
    </div>
  );
}
