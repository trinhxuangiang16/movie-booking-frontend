import { TBanner, TMovie } from "@/features/movie/index";
import Link from "next/link";
import Image from "next/image";

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

const getStatusClassName = (movie: TMovie) => {
  if (movie.hot) return "border-[#ff8a6b]/40 bg-[#ff8a6b]/15 text-[#ffd4c9]";
  if (movie.dang_chieu)
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  if (movie.sap_chieu) return "border-sky-400/30 bg-sky-400/10 text-sky-200";
  return "border-white/15 bg-white/10 text-white/80";
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
    <div className="mx-auto w-full max-w-7xl px-4 pt-20 md:px-8">
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="relative h-[260px] md:h-[380px]">
          <Image
            src={banner?.hinh_anh || movie.hinh_anh}
            alt={movie.ten_phim}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_35%),linear-gradient(180deg,transparent_40%,rgba(6,8,20,0.92)_100%)]" />
        </div>

        <div className="relative -mt-20 grid gap-6 px-4 pb-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 md:px-8 md:pb-10">
          <div className="overflow-hidden rounded-[22px] border border-white/20 bg-[#0f153d] shadow-[0_18px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={movie.hinh_anh}
                alt={movie.ten_phim}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 50vw, 220px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 pb-1 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/55">
              <Link href="/" className="transition hover:text-white">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-white/75">Chi tiết phim</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#ffd08a]">
                Phim nổi bật
              </p>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] md:text-5xl">
                {movie.ten_phim}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur ${getStatusClassName(movie)}`}
              >
                {getStatusLabel(movie)}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur">
                Đánh giá: {movie.danh_gia || 0} ★
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur">
                Khởi chiếu: {formatReleaseDate(movie.ngay_khoi_chieu)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
