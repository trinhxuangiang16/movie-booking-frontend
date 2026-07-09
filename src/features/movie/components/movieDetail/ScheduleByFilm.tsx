"use client";

import { Button } from "@/components/ui/button";
import { TMovie } from "../../types/typeMovie";
import Link from "next/link";

export default function ScheduleByFilm({ movie }: { movie?: TMovie }) {
  return (
    <aside id="lich-chieu" className="lg:sticky lg:top-24">
      <div className="rounded-[28px] border border-white/15 bg-[#0d1232]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] md:p-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Lịch chiếu
            </p>
            <h3 className="mt-2 text-2xl font-black uppercase text-white">
              Đặt vé ngay
            </h3>
          </div>

          <p className="text-sm leading-7 text-white/75">
            {movie
              ? `Chọn suất chiếu phù hợp cho ${movie.ten_phim}. Khu vực này sẽ được dùng để hiển thị lịch chiếu và cụm rạp.`
              : "Chọn suất chiếu phù hợp. Khu vực này sẽ hiển thị lịch chiếu và cụm rạp."}
          </p>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            <div className="flex items-center justify-between">
              <span>Trạng thái</span>
              <span className="font-semibold text-white">
                {movie?.hot
                  ? "HOT"
                  : movie?.dang_chieu
                    ? "Đang chiếu"
                    : movie?.sap_chieu
                      ? "Sắp chiếu"
                      : "Cập nhật"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Đánh giá</span>
              <span className="font-semibold text-white">
                {movie?.danh_gia || 0}/10
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Khởi chiếu</span>
              <span className="font-semibold text-white">
                {movie?.ngay_khoi_chieu
                  ? new Intl.DateTimeFormat("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(movie.ngay_khoi_chieu))
                  : "Đang cập nhật"}
              </span>
            </div>
          </div>

          <Button
            asChild
            variant="gradient"
            className="w-full rounded-full px-6 py-3 text-base font-semibold text-black shadow-[0_12px_30px_rgba(255,210,120,0.35)]"
          >
            <Link href="#trailer">Đặt vé ngay</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
          >
            <Link href="#trailer">Xem trailer</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
