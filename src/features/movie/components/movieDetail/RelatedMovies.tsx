"use client";

import { oswald } from "@/lib/fonts";
import { TMovie } from "../../types/typeMovie";
import { useHotMovies } from "../../hooks/useHotMovies";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const CLIP =
  "[clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)]";

export default function RelatedMovies({ currentId }: { currentId: number }) {
  const { data: movies = [] as TMovie[] } = useHotMovies();

  const suggestions = movies
    .filter((item: TMovie) => item.ma_phim !== currentId)
    .slice(0, 6);

  if (suggestions.length === 0) return null;

  return (
    <section className={`${oswald.className} mt-12 text-white`}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="h-9 w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff]" />
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
              04
            </span>
            <h2 className="text-xl font-bold uppercase leading-tight tracking-wide text-white md:text-2xl">
              Phim đang hot
            </h2>
          </div>
        </div>
        <Link
          href="/"
          className="hidden text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-[#63eaff] sm:block"
        >
          Xem tất cả
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {suggestions.map((item: TMovie) => (
          <li key={item.ma_phim}>
            <Link
              href={`/movie/movie-detail/${item.ma_phim}`}
              className="group block focus-visible:outline-none"
            >
              <div
                className={`relative aspect-[2/3] overflow-hidden bg-[#141a45] ring-1 ring-white/15 transition-all duration-300 group-hover:ring-[#63eaff]/60 group-focus-visible:ring-2 group-focus-visible:ring-[#63eaff] ${CLIP}`}
              >
                <Image
                  src={item.hinh_anh}
                  alt={item.ten_phim}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1137] via-transparent to-transparent opacity-80" />

                {item.danh_gia ? (
                  <span className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#0c1137]/90 px-2 py-1 text-[10px] font-bold text-white ring-1 ring-white/20">
                    <FaStar className="text-[9px] text-[#ffcf4d]" />
                    {item.danh_gia}
                  </span>
                ) : null}
              </div>

              <p className="mt-2.5 line-clamp-2 text-sm font-bold uppercase leading-snug tracking-wide text-white/85 transition-colors group-hover:text-[#63eaff]">
                {item.ten_phim}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
