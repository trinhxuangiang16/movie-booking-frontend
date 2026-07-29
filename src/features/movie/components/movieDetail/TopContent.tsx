import { TBanner, TMovie } from "@/features/movie/index";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { oswald } from "@/lib/fonts";

const CLIP =
  "[clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)]";

const formatReleaseDate = (value?: string) => {
  if (!value) return "Đang cập nhật";

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) return value;

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
};

const getStatusLabel = (movie: TMovie) => {
  if (movie.hot) return "HOT";
  if (movie.dang_chieu) return "Đang chiếu";
  if (movie.sap_chieu) return "Sắp chiếu";
  return "Đang cập nhật";
};

const getStatusChipClass = (movie: TMovie) => {
  if (movie.hot)
    return "bg-gradient-to-r from-[#ff4d4d] to-[#ff9a3c] text-[#2a0705] shadow-[0_0_28px_-8px_rgba(255,90,60,.9)]";
  if (movie.dang_chieu) return "bg-[#3ddc97] text-[#04231a]";
  if (movie.sap_chieu) return "bg-[#63eaff] text-[#04222b]";
  return "bg-[#161c3f] text-white/70";
};

export default function TopContent({
  movie,
  banner,
}: {
  movie: TMovie | undefined;
  banner: TBanner | undefined;
}) {
  if (!movie) return null;

  return (
    <section
      className={`${oswald.className} relative w-full overflow-hidden bg-[#0c1137]`}
    >
      <div className="absolute inset-0">
        <Image
          src={banner?.hinh_anh || movie.hinh_anh}
          alt=""
          aria-hidden
          fill
          priority
          unoptimized
          sizes="100vw"
          className="animate-[heroIn_1.1s_cubic-bezier(.2,.7,.2,1)] object-cover object-center opacity-70 saturate-[.85]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0c1137_0%,rgba(12,17,55,.96)_26%,rgba(12,17,55,.74)_48%,rgba(12,17,55,.38)_72%,rgba(12,17,55,.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0c1137] via-[#0c1137]/85 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0c1137]/95 to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-8 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.5)_0_10px,transparent_10px_26px)] opacity-[.08] lg:block" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end gap-6 px-4 pb-10 pt-28 md:gap-9 md:px-8 md:pb-12 md:pt-32">
        <div className="relative w-[112px] shrink-0 sm:w-[150px] md:w-[200px]">
          <div
            className={`relative aspect-[2/3] w-full overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,.95)] ring-1 ring-white/15 ${CLIP}`}
          >
            <Image
              src={movie.hinh_anh}
              alt={movie.ten_phim}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 150px, 200px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 animate-[heroTitle_.7s_cubic-bezier(.2,.7,.2,1)_both] pb-1">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
            <Link href="/" className="transition-colors hover:text-white/80">
              Trang chủ
            </Link>
            <span className="text-white/25">/</span>
            <span className="text-white/60">Chi tiết phim</span>
          </nav>

          <div className="relative">
            <div className="absolute -left-5 top-1 hidden h-[calc(100%-8px)] w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff] md:block" />
            <h1 className="text-[clamp(1.5rem,4.2vw,3.5rem)] font-bold uppercase leading-[1.06] tracking-tight text-white drop-shadow-[0_6px_34px_rgba(0,0,0,.9)]">
              {movie.ten_phim}
            </h1>
          </div>

          <dl className="mt-5 flex flex-wrap items-stretch gap-2.5">
            <div
              className={`flex items-center gap-2 px-4 py-2.5 ${CLIP} ${getStatusChipClass(movie)}`}
            >
              <dt className="sr-only">Trạng thái</dt>
              <dd className="text-[11px] font-bold uppercase tracking-[0.18em]">
                {getStatusLabel(movie)}
              </dd>
            </div>

            <div
              className={`flex items-center gap-2 bg-gradient-to-r from-[#63eaff] to-[#ff88e1] px-4 py-2.5 text-[#06101c] shadow-[0_0_28px_-8px_rgba(192,132,252,.8)] ${CLIP}`}
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#06101c]/55">
                Đánh giá
              </dt>
              <dd className="flex items-center gap-1 text-sm font-bold leading-none">
                <FaStar className="text-[11px]" />
                {movie.danh_gia || 0}
                <span className="text-[#06101c]/50">/10</span>
              </dd>
            </div>

            <div
              className={`flex items-center gap-2 bg-[#2b3475] px-4 py-2.5 text-white ring-1 ring-white/20 ${CLIP}`}
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                Khởi chiếu
              </dt>
              <dd className="text-sm font-bold leading-none">
                {formatReleaseDate(movie.ngay_khoi_chieu)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
