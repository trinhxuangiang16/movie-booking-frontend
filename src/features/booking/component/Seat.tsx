"use client";

import { memo } from "react";
import { Button, type ButtonVariant } from "@/components/ui/button";
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

function SeatComponent({
  ma_ghe,
  ten_ghe,
  type,
  status,
  isSelected,
  onClick,
}: SeatProps) {
  const booked = status === "booked";

  const variantByState = (): ButtonVariant => {
    if (booked) return "seatBooked";
    if (isSelected) return "seatSelected";
    if (type === "vip") return "seatVip";
    if (type === "couple") return "seatCouple";
    return "seatStandard";
  };

  return (
    <Button
      type="button"
      disabled={booked}
      onClick={() => !booked && onClick(ma_ghe)}
      aria-pressed={isSelected}
      aria-label={`Ghế ${ten_ghe}${booked ? ", đã đặt" : ""}`}
      variant={variantByState()}
      className={
        type === "couple" && !booked && !isSelected ? "w-9" : undefined
      }
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
    </Button>
  );
}

export const Seat = memo(SeatComponent);
