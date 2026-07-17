"use client";

import { memo } from "react";
import type { SeatType, SeatStatus } from "../types/typeSeat";

type SeatProps = {
  ma_ghe: number;
  ten_ghe: string;
  type: SeatType;
  status: SeatStatus;
  isSelected: boolean;
  onClick: (ma_ghe: number) => void;
};

/*
  Ghế kiểu "ô vé" vát góc, mỗi loại 1 accent trong dải theme:
  thường = trắng mờ, VIP = gold, đôi = pink, đang chọn = cyan glow, đã đặt = chìm
*/

const CUT =
  "[clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]";

function SeatComponent({
  ma_ghe,
  ten_ghe,
  type,
  status,
  isSelected,
  onClick,
}: SeatProps) {
  const booked = status === "booked";

  const styleByState = () => {
    if (booked)
      return "bg-white/[.04] text-white/20 border border-white/[.06] cursor-not-allowed";
    if (isSelected)
      return "bg-gradient-to-b from-[#8ff3ff] to-[#4fc9e8] text-[#06202b] border border-transparent shadow-[0_0_14px_rgba(99,234,255,.65)] scale-[1.08]";
    if (type === "vip")
      return "bg-[#e8c46a]/[.09] text-[#e8c46a] border border-[#e8c46a]/45 hover:bg-[#e8c46a]/25 hover:shadow-[0_0_10px_rgba(232,196,106,.4)]";
    if (type === "couple")
      return "bg-[#ff88e1]/[.09] text-[#ff9fe7] border border-[#ff88e1]/45 hover:bg-[#ff88e1]/25 hover:shadow-[0_0_10px_rgba(255,136,225,.4)]";
    return "bg-white/[.06] text-white/75 border border-white/20 hover:bg-white/[.16] hover:border-white/45";
  };

  return (
    <button
      type="button"
      disabled={booked}
      onClick={() => !booked && onClick(ma_ghe)}
      aria-pressed={isSelected}
      aria-label={`Ghế ${ten_ghe}${booked ? ", đã đặt" : ""}`}
      className={`relative flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 ${CUT} ${styleByState()} ${
        type === "couple" && !booked && !isSelected ? "w-9" : ""
      }`}
    >
      {booked ? (
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 opacity-60"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      ) : (
        ten_ghe
      )}
    </button>
  );
}

export const Seat = memo(SeatComponent);
