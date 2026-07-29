"use client";

import type { Seat as TSeat } from "../types/typeSeat";
import { Seat } from "./Seat";



type SeatMapProps = {
  seatMap: Record<string, TSeat[]>;
  selectedSeats: number[];
  onToggleSeat: (ma_ghe: number) => void;
};

const LEGEND = [
  { label: "Thường", cls: "border border-white/25 bg-white/[.06]" },
  { label: "VIP", cls: "border border-[#e8c46a]/50 bg-[#e8c46a]/[.12]" },
  { label: "Ghế đôi", cls: "border border-[#ff88e1]/50 bg-[#ff88e1]/[.12]" },
  {
    label: "Đang chọn",
    cls: "bg-gradient-to-b from-[#8ff3ff] to-[#4fc9e8] shadow-[0_0_8px_rgba(99,234,255,.6)]",
  },
  { label: "Đã đặt", cls: "border border-white/[.08] bg-white/[.04]" },
];

const CUT_SM =
  "[clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)]";

export function SeatMap({ seatMap, selectedSeats, onToggleSeat }: SeatMapProps) {
  return (
    <div className="flex flex-col gap-8">

      <div className="relative mx-auto w-full max-w-xl">
        <div className="h-10 w-full rounded-[100%_100%_0_0/200%_200%_0_0] border-t-2 border-[#63eaff]/70 shadow-[0_-14px_44px_-8px_rgba(99,234,255,.4)]" />
        <p className="absolute inset-x-0 top-3 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/45">
          Màn hình
        </p>
        <div className="pointer-events-none absolute inset-x-8 top-6 h-24 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(99,234,255,.08),transparent_75%)]" />
      </div>

      <div className="flex flex-col items-center gap-2.5">
        {Object.entries(seatMap).map(([row, seats]) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="w-7 text-center text-[11px] font-bold tracking-widest text-white/35">
              {row}
            </span>
            {seats.map((seat) => (
              <Seat
                key={seat.ma_ghe}
                ma_ghe={seat.ma_ghe}
                ten_ghe={seat.ten_ghe ?? ""}
                type={seat.type}
                status={seat.status === "booked" ? "booked" : "available"}
                isSelected={selectedSeats.includes(seat.ma_ghe)}
                onClick={onToggleSeat}
              />
            ))}
            <span className="w-7 text-center text-[11px] font-bold tracking-widest text-white/35">
              {row}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/[.07] pt-6">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-2.5">
            <span className={`h-4 w-4 ${CUT_SM} ${l.cls}`} />
            <span className="text-xs tracking-[0.08em] text-white/55">
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
