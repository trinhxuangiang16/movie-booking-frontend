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

function SeatComponent({
  ma_ghe,
  ten_ghe,
  type,
  status,
  isSelected,
  onClick,
}: SeatProps) {
  console.log(`[Seat] Rendered: ${ten_ghe} (ma_ghe: ${ma_ghe}, isSelected: ${isSelected})`);

  const colorByType = {
    normal: "bg-gray-300",
    vip: "bg-yellow-400",
    couple: "bg-pink-400",
  };

  const getBackgroundColor = () => {
    if (status === "booked") return "bg-red-500 opacity-50 cursor-not-allowed";
    if (isSelected) return "bg-blue-500 border-2 border-blue-800";
    return colorByType[type];
  };

  const handleClick = () => {
    if (status !== "booked") {
      onClick(ma_ghe);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-8 h-8 flex items-center justify-center text-xs rounded
        transition-all duration-150
        ${getBackgroundColor()}
        ${status === "booked" ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"}
      `}
    >
      {ten_ghe}
    </div>
  );
}

export const Seat = memo(SeatComponent);
