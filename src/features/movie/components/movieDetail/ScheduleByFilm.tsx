"use client";

import { Button } from "@/components/ui/button";
import { oswald } from "@/lib/fonts";
import { TMovie } from "../../types/typeMovie";
import { FaStar } from "react-icons/fa";

const CLIP_PANEL =
  "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]";

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

export default function ScheduleByFilm({ movie }: { movie?: TMovie }) {
  const isUpcoming = Boolean(
    movie?.sap_chieu && !movie?.dang_chieu && !movie?.hot,
  );

  const rating = movie?.danh_gia || 0;

  return (
    <aside
      id="lich-chieu"
      className={`${oswald.className} lg:sticky lg:top-24`}
    >
      <div className="mb-4 flex items-center gap-4">
        <span className="h-9 w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff]" />
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
            03
          </span>
          <h2 className="text-xl font-bold uppercase leading-tight tracking-wide text-white md:text-2xl">
            Đặt vé
          </h2>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-[#141a45] ring-1 ring-white/15 ${CLIP_PANEL}`}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#63eaff]/70 to-transparent"
        />

        <div className="p-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                Đánh giá
              </p>
              <p className="mt-1.5 flex items-baseline gap-1 leading-none">
                <span className="text-4xl font-black tabular-nums text-white">
                  {rating}
                </span>
                <span className="text-lg font-bold text-white/35">/10</span>
              </p>
            </div>
            <div
              className="flex gap-0.5 pb-1.5 text-sm"
              aria-label={`Đánh giá ${rating} trên 10`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(rating / 2)
                      ? "text-[#ffcf4d]"
                      : "text-white/15"
                  }
                />
              ))}
            </div>
          </div>

          <dl className="space-y-3.5 border-b border-white/10 py-5 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                Khởi chiếu
              </dt>
              <dd className="font-bold tabular-nums text-white">
                {formatReleaseDate(movie?.ngay_khoi_chieu)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                Suất chiếu
              </dt>
              <dd className="font-bold text-white">
                {isUpcoming ? "Chưa mở" : "Đang cập nhật"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                Giá vé từ
              </dt>
              <dd className="font-bold tabular-nums text-white">
                45.000<span className="text-white/40">đ</span>
              </dd>
            </div>
          </dl>

          <p className="py-5 text-sm font-light leading-relaxed text-white/55">
            {isUpcoming
              ? "Phim chưa mở bán vé. Lịch chiếu sẽ mở khi phim khởi chiếu."
              : "Chọn rạp và suất chiếu ở bước tiếp theo."}
          </p>

          {isUpcoming ? (
            <Button disabled variant="paymentDisabled">
              Chờ ra mắt
            </Button>
          ) : (
            <Button variant="payment">Đặt vé ngay</Button>
          )}

          <p className="mt-3.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            Đổi trả vé trước 30 phút
          </p>
        </div>
      </div>
    </aside>
  );
}
