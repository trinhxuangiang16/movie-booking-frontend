import { bebas } from "@/lib";
import Link from "next/link";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function CircleRadiusBtn({ movies }: { movies: TMovie[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link
          className={`ml-5 ${bebas.className} flex items-center`}
          href={"/"}
        >
          <svg width="0" height="0">
            {/* Định nghĩa gradient cho icon */}
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
          <div className="group inline-flex  items-center overflow-hidden rounded-full border border-[#63eaff] transition-all duration-100 w-12 h-12 hover:w-30 px-4 py-3 cursor-pointer hover:shadow-[0_0_20px_#ffafeb7f]">
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
        </Link>
      </DialogTrigger>
      <DialogContent
        className="
    w-[80vw] 
    max-w-[80vw] 
    sm:w-[80vw]       
    sm:max-w-[80vw] 
    h-[90vh] 
    rounded-2xl p-6
    bg-zinc-950/75 
    backdrop-blur-xl 
    border border-white/10
    shadow-2xl shadow-black/80
    flex flex-col justify-between 
    text-white 
    overflow-hidden
  "
      >
        {/* 1. HEADER (Cố định ở trên) */}
        <DialogHeader className="shrink-0 pb-4 border-b border-white/5">
          <DialogTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Danh sách phim
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            Danh sách các phim hiện đang có trên hệ thống để đặt vé trực tuyến.
          </DialogDescription>
        </DialogHeader>

        {/* 2. TABLE BODY (Khu vực cuộn nội dung ở giữa) */}
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
            <TableHeader className="sticky top-0 bg-zinc-950/90 backdrop-blur-md z-10 border-b border-white/10">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="w-[60px] text-zinc-400 font-semibold">
                  STT
                </TableHead>
                <TableHead className="w-[100px] text-zinc-400 font-semibold">
                  Hình ảnh
                </TableHead>
                <TableHead className="text-zinc-400 font-semibold">
                  Tên Phim
                </TableHead>
                <TableHead className="text-zinc-400 font-semibold">
                  Khởi chiếu
                </TableHead>
                <TableHead className="text-center text-zinc-400 font-semibold">
                  Đánh giá
                </TableHead>
                <TableHead className="text-right text-zinc-400 font-semibold">
                  Trạng thái
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {movies?.length > 0 ? (
                movies.map((movie, index) => (
                  <TableRow
                    key={movie.ma_phim}
                    className="group border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    {/* Số thứ tự */}
                    <TableCell className="font-medium text-zinc-400 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </TableCell>

                    {/* Poster phim với hiệu ứng zoom nhẹ khi hover dòng */}
                    <TableCell>
                      <div className="h-16 w-11 rounded-md overflow-hidden border border-white/10 shadow-md shadow-black/50">
                        {movie.hinh_anh && (
                          <img
                            src={movie.hinh_anh}
                            alt={movie.ten_phim}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </div>
                    </TableCell>

                    {/* Tên phim kèm badge HOT nếu có */}
                    <TableCell className="font-semibold text-zinc-100 group-hover:text-yellow-400 transition-colors">
                      <div className="flex items-center gap-2">
                        <span>{movie.ten_phim}</span>
                        {movie.hot && (
                          <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-1.5 py-0 font-bold tracking-wider animate-pulse">
                            HOT
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Ngày khởi chiếu */}
                    <TableCell className="text-zinc-300 text-sm">
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

                    {/* Điểm đánh giá dạng star glow */}
                    <TableCell className="text-center">
                      {movie.danh_gia ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                          ⭐ {movie.danh_gia}/10
                        </div>
                      ) : (
                        <span className="text-zinc-500 text-xs">N/A</span>
                      )}
                    </TableCell>

                    {/* Trạng thái hiển thị theo badge pill border tinh tế giống ảnh mẫu */}
                    <TableCell className="text-right">
                      {movie.dang_chieu ? (
                        <Badge className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-0.5 hover:bg-emerald-500/20">
                          Đang chiếu
                        </Badge>
                      ) : movie.sap_chieu ? (
                        <Badge className="rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-0.5 hover:bg-sky-500/20">
                          Sắp chiếu
                        </Badge>
                      ) : (
                        <Badge className="rounded-full bg-transparent text-zinc-400 border border-white/10 px-3 py-0.5 hover:bg-white/5">
                          Ngừng chiếu
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-48 text-zinc-500"
                  >
                    Không có dữ liệu phim nào trên hệ thống.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* 3. FOOTER (Cố định ở dưới) */}
        <DialogFooter className="shrink-0 pt-4 border-t border-white/5">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-white/10 bg-transparent hover:bg-white/10 text-white hover:text-white transition-colors"
            >
              Đóng bảng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
