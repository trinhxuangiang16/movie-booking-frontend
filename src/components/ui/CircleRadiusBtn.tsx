"use client";

import { bebas } from "@/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { TMovie } from "@/features/movie/types/typeMovie";
import type { IMovieListProps } from "@/features/movie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


type SectionStatus = IMovieListProps["mode"];

const SECTION_META: Partial<
  Record<NonNullable<SectionStatus>, { title: string; desc: string }>
> = {
  hot: {
    title: "Top phim hot trong tháng",
    desc: "Những phim được khán giả quan tâm nhất, tổng hợp trên toàn hệ thống.",
  },
  showing: {
    title: "Phim đang chiếu",
    desc: "Các phim đang có suất chiếu — chọn phim để đặt vé ngay.",
  },
  upcoming: {
    title: "Phim sắp chiếu",
    desc: "Sắp ra rạp — xem trước để không bỏ lỡ suất chiếu đầu tiên.",
  },
  cinema: {
    title: "Danh sách phim",
    desc: "Toàn bộ phim hiện có trên hệ thống đặt vé trực tuyến.",
  },
};

export default function CircleRadiusBtn({
  movies,
  status,
}: {
  movies: TMovie[];
  status?: SectionStatus;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const meta =
    (status && SECTION_META[status as NonNullable<SectionStatus>]) ||
    SECTION_META.cinema!;


  const goToDetail = (ma_phim: number) => {
    setOpen(false);
    router.push(`/movie/movie-detail/${ma_phim}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Xem thêm: ${meta.title}`}
          className={`ml-5 ${bebas.className} flex items-center`}
        >
          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="iconGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#63eaff" />
                <stop offset="100%" stopColor="#ff88e1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="group inline-flex items-center overflow-hidden rounded-full border border-[#63eaff] transition-all duration-100 w-12 h-12 hover:w-30 px-4 py-3 cursor-pointer hover:shadow-[0_0_20px_#ffafeb7f]">
            <FaAngleRight
              className="shrink-0 flex items-center"
              style={{ fill: "url(#iconGradient)" }}
            />

            <span
              className="
           ml-2 whitespace-nowrap opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-gradient-to-r h-full flex items-center from-[#63eaff] to-[#ff88e1] bg-clip-text text-transparent"
            >
              Xem thêm
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        className="
    w-[92vw]
    max-w-[1100px]
    sm:max-w-[1100px]
    h-[88vh]
    p-0
    gap-0
    bg-[#0a0e24]/95
    backdrop-blur-xl
    border border-white/10
    shadow-2xl shadow-black/80
    flex flex-col
    text-white
    overflow-hidden
    [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]
  "
      >
        <DialogHeader className="shrink-0 space-y-1 px-7 pb-4 pt-6 text-left">
          <div className="flex items-center gap-3">
            <span className="h-7 w-[3px] rounded-full bg-gradient-to-b from-[#63eaff] to-[#ff88e1]" />
            <DialogTitle className="text-xl font-bold uppercase tracking-wide text-white">
              {meta.title}
            </DialogTitle>
          </div>
          <DialogDescription className="pl-[15px] text-sm font-light text-white/45">
            {meta.desc}
          </DialogDescription>
        </DialogHeader>

        <div
          className="
          flex-1 my-4 overflow-y-auto pr-2
          /* Custom thanh cuộn tối giản giống trong ảnh của bạn */
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-white/5
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/20
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-white/40
        "
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-[#0a0e24]/95 backdrop-blur-md">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="w-[56px] text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  STT
                </TableHead>
                <TableHead className="w-[90px] text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Hình ảnh
                </TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Tên phim
                </TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Khởi chiếu
                </TableHead>
                <TableHead className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Đánh giá
                </TableHead>
                <TableHead className="text-right text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Trạng thái
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {movies?.length > 0 ? (
                movies.map((movie, index) => (
                  <TableRow
                    key={movie.ma_phim}
                    onClick={() => goToDetail(movie.ma_phim)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Xem chi tiết phim ${movie.ten_phim}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        goToDetail(movie.ma_phim);
                      }
                    }}
                    className="group cursor-pointer border-b border-white/[.06] transition-colors duration-200 hover:bg-white/[.04] focus-visible:bg-white/[.04] focus-visible:outline-none"
                  >
                    <TableCell className="font-medium tabular-nums text-white/40 transition-colors group-hover:text-[#7fefff]">
                      {String(index + 1).padStart(2, "0")}
                    </TableCell>

                    <TableCell>
                      <div className="h-16 w-11 overflow-hidden border border-white/10 shadow-md shadow-black/50 [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]">
                        {movie.hinh_anh && (
                          <img
                            src={movie.hinh_anh}
                            alt={movie.ten_phim}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold text-white/90 transition-colors group-hover:text-[#7fefff]">
                      <div className="flex items-center gap-2">
                        <span>{movie.ten_phim}</span>
                        {movie.hot && (
                          <Badge className="border border-[#ff88e1]/30 bg-[#ff88e1]/15 px-1.5 py-0 text-[10px] font-bold uppercase tracking-wider text-[#ff88e1]">
                            Hot
                          </Badge>
                        )}
                        <FaAngleRight className="ml-0.5 h-3 w-3 shrink-0 -translate-x-1 text-[#63eaff] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                    </TableCell>

                    <TableCell className="text-sm text-white/55">
                      {movie.ngay_khoi_chieu
                        ? new Date(movie.ngay_khoi_chieu).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )
                        : "Chưa cập nhật"}
                    </TableCell>

                    <TableCell className="text-center">
                      {movie.danh_gia ? (
                        <span className="inline-flex items-center gap-1 border border-[#e8c46a]/25 bg-[#e8c46a]/10 px-2.5 py-1 text-xs font-bold text-[#e8c46a]">
                          ★ {movie.danh_gia}/10
                        </span>
                      ) : (
                        <span className="text-xs text-white/30">N/A</span>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      {movie.dang_chieu ? (
                        <StatusPill color="#8ff3c8" label="Đang chiếu" />
                      ) : movie.sap_chieu ? (
                        <StatusPill color="#63eaff" label="Sắp chiếu" />
                      ) : (
                        <StatusPill color="#ffffff40" label="Ngừng chiếu" muted />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-48 text-center text-white/40"
                  >
                    Chưa có phim nào trong danh sách này.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="shrink-0 items-center justify-between gap-3 border-t border-white/10 px-7 py-4 sm:justify-between">
          <p className="hidden text-xs font-light text-white/35 sm:block">
            Nhấp vào một phim để xem chi tiết và đặt vé.
          </p>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-white/12 bg-transparent text-white transition-colors hover:bg-white/10 hover:text-white"
            >
              Đóng bảng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function StatusPill({
  color,
  label,
  muted = false,
}: {
  color: string;
  label: string;
  muted?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: color,
          boxShadow: muted ? undefined : `0 0 8px ${color}`,
        }}
      />
      <span className={muted ? "text-white/40" : "text-white/75"}>{label}</span>
    </span>
  );
}
