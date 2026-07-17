"use client";

import { useCallback, useMemo, useState } from "react";
import { oswald } from "@/lib";
import { SeatMap } from "@/features/booking/component/SeatMap";
import {
  ExtraServices,
  EXTRA_SERVICES,
} from "@/features/booking/component/Extraservices";
import { TotalServicePayment } from "@/features/booking/component/Totalservicepayment";
import { PaymentModal } from "@/features/booking/component/Paymentmodal";
import { buildSeatMap } from "@/features/booking/utils/seatMap.utils";
import { mockPhongVe } from "@/features/booking/mock/seatMap.mock";
import Link from "next/link";

const MOVIE = {
  title: "Chị Chị Em Em 2",
  room: "Rạp 1",
  showtime: "19:00, Thứ 5 ngày 20/08/2026",
};

const SEAT_TYPE_LABEL: Record<string, string> = {
  normal: "Thường",
  vip: "VIP",
  couple: "Ghế đôi",
};

const CUT_PANEL =
  "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]";

const PAGE_BG =
  "relative min-h-screen w-full bg-[#0c1137] bg-[url('https://www.transparenttextures.com/patterns/batthern.png')]";

export default function BookingSeatSelectionPage() {
  const seatMap = useMemo(() => buildSeatMap(mockPhongVe), []);
  const allSeats = useMemo(() => Object.values(seatMap).flat(), [seatMap]);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [serviceQty, setServiceQty] = useState<Record<string, number>>({});
  const [payOpen, setPayOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const priceByType = useMemo(
    () => ({
      normal: mockPhongVe.gia_ve,
      vip: mockPhongVe.gia_ve * 1.5,
      couple: mockPhongVe.gia_ve * 2,
    }),
    [],
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
      EXTRA_SERVICES.filter((sv) => (serviceQty[sv.id] ?? 0) > 0).map((sv) => ({
        label: sv.name,
        detail: `x${serviceQty[sv.id]}`,
        amount: sv.price * (serviceQty[sv.id] ?? 0),
      })),
    [serviceQty],
  );

  const total = useMemo(
    () =>
      seatLines.reduce((a, l) => a + l.amount, 0) +
      serviceLines.reduce((a, l) => a + l.amount, 0),
    [seatLines, serviceLines],
  );

  /* ── MÀN HÌNH THÀNH CÔNG: vé xác nhận thay toàn bộ nội dung ── */
  if (purchased) {
    return (
      <div className={PAGE_BG}>
        <div className={`px-4 py-20 md:px-8 ${oswald.className}`}>
          <div className="mx-auto w-full max-w-xl">
            <div
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
                  <p className="mt-1 font-bold text-white">{MOVIE.title}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Suất chiếu
                  </p>
                  <p className="mt-1 font-bold text-white">{MOVIE.showtime}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Phòng chiếu
                  </p>
                  <p className="mt-1 font-bold text-white">{MOVIE.room}</p>
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

              <div
                className="h-5 w-full opacity-15"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,.8) 0 8px, transparent 8px 20px)",
                }}
              />
            </div>

            <Link
              href="/"
              className="mx-auto mt-8 block w-fit border border-[#63eaff]/50 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7fefff] transition hover:bg-[#63eaff]/10 hover:shadow-[0_0_24px_rgba(99,234,255,.3)] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
            >
              Về trang chủ
            </Link>
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
                {MOVIE.title}
                <span className="mx-2 text-white/20">|</span>
                {MOVIE.room}
                <span className="mx-2 text-white/20">|</span>
                {MOVIE.showtime}
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
                  quantities={serviceQty}
                  onChange={(id, qty) =>
                    setServiceQty((p) => ({ ...p, [id]: qty }))
                  }
                />
              </section>
            </div>

            {/* CỘT PHẢI: hoá đơn dính */}
            <div className="lg:sticky lg:top-24">
              <TotalServicePayment
                movieTitle={MOVIE.title}
                showtime={MOVIE.showtime}
                room={MOVIE.room}
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
          onSuccess={() => {
            setPayOpen(false);
            setPurchased(true);
          }}
        />
      </div>
    </div>
  );
}
