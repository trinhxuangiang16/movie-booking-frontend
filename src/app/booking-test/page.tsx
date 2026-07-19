"use client";

import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { oswald } from "@/lib";
import { Button } from "@/components/ui/button";
import { SeatMap } from "@/features/booking/component/SeatMap";
import { ExtraServices } from "@/features/booking/component/Extraservices";
import { useCombo } from "@/features/booking/hooks/useCombo";
import { TotalServicePayment } from "@/features/booking/component/Totalservicepayment";
import { PaymentModal } from "@/features/booking/component/Paymentmodal";
import { buildSeatMap } from "@/features/booking/utils/seatMap.utils";
import { useGetScheduleByMovieId } from "@/features/movie/hooks/useGetSchedule";
import { useStatusTheater } from "@/features/movie/hooks/useStatusTheater";
import { useBooking } from "@/features/movie/hooks/useBooking";
import { historyPaymentService } from "@/features/booking/services/historyPayment";
import Link from "next/link";

const SEAT_TYPE_LABEL: Record<string, string> = {
  normal: "Thường",
  vip: "VIP",
  couple: "Ghế đôi",
};

const CUT_PANEL =
  "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]";

const PAGE_BG =
  "relative min-h-screen w-full bg-[#0c1137] bg-[url('https://www.transparenttextures.com/patterns/batthern.png')] pt-[80px]";

// vd: "19:00, Thứ Năm ngày 20/08/2026"
function formatShowtime(iso: string) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
  return `${time}, ${weekday} ngày ${d.toLocaleDateString("vi-VN")}`;
}

function CenterNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className={PAGE_BG}>
      <div
        className={`flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center ${oswald.className}`}
      >
        {children}
      </div>
    </div>
  );
}

function BookingSeatSelection() {
  const searchParams = useSearchParams();
  const maLichChieu = Number(searchParams.get("ma_lich_chieu")) || undefined;

  const { data: schedule, isLoading: isLoadingSchedule } =
    useGetScheduleByMovieId(maLichChieu);
  const { data: seatStatus, isLoading: isLoadingSeats } =
    useStatusTheater(maLichChieu);
  const { data: combos = [] } = useCombo();
  const { mutateAsync: datVe } = useBooking();

  const seatMap = useMemo(
    () => buildSeatMap(seatStatus?.danh_sach_ghe ?? []),
    [seatStatus],
  );
  const allSeats = useMemo(() => Object.values(seatMap).flat(), [seatMap]);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [serviceQty, setServiceQty] = useState<Record<number, number>>({});
  const [payOpen, setPayOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [maVeQr, setMaVeQr] = useState<string | null>(null);
  const [pendingHoaDon, setPendingHoaDon] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  // Sau khi webhook xác nhận thanh toán (phase "success" của PaymentModal),
  // vé thật đã tồn tại — lấy mã QR check-in từ lịch sử đặt vé (đơn vừa chốt).
  const handlePaid = useCallback(async () => {
    if (!pendingHoaDon) return;
    try {
      const history = await historyPaymentService.getHistoryPaymentService();
      const hoaDon = history.find((hd) => hd.ma_hoa_don === pendingHoaDon);
      setMaVeQr(hoaDon?.ma_ve_qr ?? null);
    } finally {
      setPurchased(true);
      setPayOpen(false);
    }
  }, [pendingHoaDon]);

  const handleDownloadTicket = useCallback(async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(ticketRef.current, {
        pixelRatio: 2,
        backgroundColor: "#0c1137",
      });
      const link = document.createElement("a");
      link.download = `ve-xem-phim-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }, []);

  const giaVe = schedule?.gia_ve ?? 0;

  // Hệ số VIP 1.2 phải khớp với cách backend tính tiền khi đặt vé (datVe.service.js)
  const priceByType = useMemo(
    () => ({
      normal: giaVe,
      vip: giaVe * 1.2,
      couple: giaVe * 2,
    }),
    [giaVe],
  );

  const toggleSeat = useCallback((ma_ghe: number) => {
    setSelectedSeats((prev) => {
      if (prev.includes(ma_ghe)) return prev.filter((id) => id !== ma_ghe);
      if (prev.length < 8) return [...prev, ma_ghe];
      return prev;
    });
  }, []);

  const chosenSeats = useMemo(
    () => allSeats.filter((s) => selectedSeats.includes(s.ma_ghe)),
    [allSeats, selectedSeats],
  );

  const seatLines = useMemo(
    () =>
      chosenSeats.map((s) => ({
        label: `Ghế ${s.ten_ghe}`,
        detail: SEAT_TYPE_LABEL[s.type],
        amount: priceByType[s.type],
      })),
    [chosenSeats, priceByType],
  );

  const serviceLines = useMemo(
    () =>
      combos
        .filter((sv) => (serviceQty[sv.ma_combo] ?? 0) > 0)
        .map((sv) => ({
          label: sv.ten_combo,
          detail: `x${serviceQty[sv.ma_combo]}`,
          amount: sv.gia * (serviceQty[sv.ma_combo] ?? 0),
        })),
    [combos, serviceQty],
  );

  const total = useMemo(
    () =>
      seatLines.reduce((a, l) => a + l.amount, 0) +
      serviceLines.reduce((a, l) => a + l.amount, 0),
    [seatLines, serviceLines],
  );

  if (!maLichChieu) {
    return (
      <CenterNotice>
        <p className="text-lg text-white/70">
          Không tìm thấy suất chiếu. Vui lòng chọn suất chiếu từ trang chủ.
        </p>
        <Link
          href="/"
          className="border border-[#63eaff]/50 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7fefff] transition hover:bg-[#63eaff]/10 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
        >
          Về trang chủ
        </Link>
      </CenterNotice>
    );
  }

  if (isLoadingSchedule || isLoadingSeats) {
    return (
      <CenterNotice>
        <p className="animate-pulse text-sm font-bold uppercase tracking-[0.4em] text-[#63eaff]">
          Đang tải sơ đồ ghế...
        </p>
      </CenterNotice>
    );
  }

  if (!schedule || !seatStatus) {
    return (
      <CenterNotice>
        <p className="text-lg text-white/70">
          Không tải được thông tin suất chiếu. Vui lòng thử lại.
        </p>
        <Link
          href="/"
          className="border border-[#63eaff]/50 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7fefff] transition hover:bg-[#63eaff]/10 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
        >
          Về trang chủ
        </Link>
      </CenterNotice>
    );
  }

  const movieTitle = schedule.Phim.ten_phim;
  const room = schedule.RapPhim.ten_rap;
  const cinema = schedule.RapPhim.CumRap.ten_cum_rap;
  const showtime = formatShowtime(schedule.ngay_gio_chieu);

  /* ── MÀN HÌNH THÀNH CÔNG: vé xác nhận thay toàn bộ nội dung ── */
  if (purchased) {
    return (
      <div className={PAGE_BG}>
        <div className={`px-4 py-20 md:px-8 ${oswald.className}`}>
          <div className="mx-auto w-full max-w-xl">
            <div
              ref={ticketRef}
              className={`relative overflow-hidden bg-gradient-to-b from-[#0d1230] to-[#0a0e24] ring-1 ring-[#63eaff]/25 ${CUT_PANEL}`}
            >
              <div
                className="h-5 w-full opacity-15"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,.8) 0 8px, transparent 8px 20px)",
                }}
              />

              <div className="px-8 pb-4 pt-6 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center border border-[#63eaff]/50 bg-[#63eaff]/[.08] text-[#7fefff] shadow-[0_0_34px_-6px_rgba(99,234,255,.5)] [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#63eaff]">
                  Đặt vé thành công
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Chúc mừng quý khách đã đặt {chosenSeats.length} vé xem phim
                </h2>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/55">
                  Vé điện tử đã được gửi tới email của bạn. Vui lòng đến trước
                  giờ chiếu 15 phút để nhận vé tại quầy hoặc quét mã tại cổng.
                </p>
              </div>

              {/* đường xé */}
              <div className="relative my-3 h-5">
                <span className="absolute left-0 top-1/2 h-5 w-2.5 -translate-y-1/2 rounded-r-full bg-[#070a1c]" />
                <span className="absolute right-0 top-1/2 h-5 w-2.5 -translate-y-1/2 rounded-l-full bg-[#070a1c]" />
                <span
                  className="absolute inset-x-5 top-1/2 h-px"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 6px, transparent 6px 13px)",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-8 pb-6 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Phim
                  </p>
                  <p className="mt-1 font-bold text-white">{movieTitle}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Suất chiếu
                  </p>
                  <p className="mt-1 font-bold text-white">{showtime}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Phòng chiếu
                  </p>
                  <p className="mt-1 font-bold text-white">
                    {cinema} - {room}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Ghế
                  </p>
                  <p className="mt-1 font-bold text-[#7fefff]">
                    {chosenSeats.map((s) => s.ten_ghe).join(", ")}
                  </p>
                </div>
                {serviceLines.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                      Dịch vụ kèm
                    </p>
                    <p className="mt-1 font-light text-white/75">
                      {serviceLines
                        .map((l) => `${l.label} ${l.detail}`)
                        .join(", ")}
                    </p>
                  </div>
                )}
                <div className="col-span-2 flex items-baseline justify-between border-t border-white/[.08] pt-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Đã thanh toán
                  </span>
                  <span className="bg-gradient-to-r from-[#63eaff] to-[#ff88e1] bg-clip-text text-2xl font-bold tabular-nums text-transparent">
                    {total.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {maVeQr && (
                <div className="flex flex-col items-center gap-2 border-t border-white/[.08] px-8 py-6">
                  <span className="inline-block rounded-lg bg-white p-2.5">
                    <QRCodeSVG value={maVeQr} size={120} />
                  </span>
                  <p className="text-center text-[11px] font-light text-white/45">
                    Đưa mã này cho soát vé tại rạp
                  </p>
                </div>
              )}

              <div
                className="h-5 w-full opacity-15"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,.8) 0 8px, transparent 8px 20px)",
                }}
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                type="button"
                variant="payRetry"
                disabled={downloading}
                onClick={handleDownloadTicket}
                className="w-fit flex-none px-8 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {downloading ? "Đang tạo ảnh..." : "Tải vé về máy"}
              </Button>
              <Link
                href="/"
                className="mx-auto block w-fit border border-[#63eaff]/50 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7fefff] transition hover:bg-[#63eaff]/10 hover:shadow-[0_0_24px_rgba(99,234,255,.3)] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── MÀN HÌNH CHỌN GHẾ + DỊCH VỤ ── */
  return (
    <div className={PAGE_BG}>
      <div className={`px-4 pb-20 pt-10 md:px-8 ${oswald.className}`}>
        <div className="mx-auto w-full max-w-7xl">
          {/* tiêu đề trang */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-9 w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] to-[#63eaff]" />
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide text-white">
                Chọn ghế
              </h1>
              <p className="mt-0.5 text-sm text-white/45">
                {movieTitle}
                <span className="mx-2 text-white/20">|</span>
                {cinema} - {room}
                <span className="mx-2 text-white/20">|</span>
                {showtime}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* CỘT TRÁI: sơ đồ ghế + dịch vụ */}
            <div className="flex flex-col gap-8">
              <section
                className={`bg-[#0a0e24]/70 p-8 ring-1 ring-white/[.08] backdrop-blur-[2px] ${CUT_PANEL}`}
              >
                <SeatMap
                  seatMap={seatMap}
                  selectedSeats={selectedSeats}
                  onToggleSeat={toggleSeat}
                />
              </section>

              <section
                className={`bg-[#0a0e24]/70 px-8 py-6 ring-1 ring-white/[.08] backdrop-blur-[2px] ${CUT_PANEL}`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#63eaff] to-[#c0a4ff]" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white">
                    Bắp nước và dịch vụ
                  </h2>
                </div>
                <ExtraServices
                  services={combos}
                  quantities={serviceQty}
                  onChange={(ma_combo, qty) =>
                    setServiceQty((p) => ({ ...p, [ma_combo]: qty }))
                  }
                />
              </section>
            </div>

            {/* CỘT PHẢI: hoá đơn dính */}
            <div className="lg:sticky lg:top-24">
              <TotalServicePayment
                movieTitle={movieTitle}
                showtime={showtime}
                room={`${cinema} - ${room}`}
                seatLines={seatLines}
                serviceLines={serviceLines}
                total={total}
                disabled={selectedSeats.length === 0}
                onPay={() => setPayOpen(true)}
              />
            </div>
          </div>
        </div>

        <PaymentModal
          open={payOpen}
          total={total}
          onClose={() => setPayOpen(false)}
          onConfirm={async () => {
            const danh_sach_combo = Object.entries(serviceQty)
              .filter(([, qty]) => qty > 0)
              .map(([ma_combo, so_luong]) => ({
                ma_combo: Number(ma_combo),
                so_luong,
              }));

            const result = await datVe({
              ma_lich_chieu: maLichChieu,
              danh_sach_ve: selectedSeats.map((ma_ghe) => ({ ma_ghe })),
              ...(danh_sach_combo.length > 0 && { danh_sach_combo }),
            });
            setPendingHoaDon(result.ma_hoa_don);
            return result;
          }}
          onPaid={handlePaid}
        />
      </div>
    </div>
  );
}

export default function BookingSeatSelectionPage() {
  // useSearchParams bắt buộc nằm trong Suspense boundary khi build production
  return (
    <Suspense
      fallback={
        <CenterNotice>
          <p className="animate-pulse text-sm font-bold uppercase tracking-[0.4em] text-[#63eaff]">
            Đang tải...
          </p>
        </CenterNotice>
      }
    >
      <BookingSeatSelection />
    </Suspense>
  );
}
