import type { ISeatStatus } from "@/features/movie/services/ticketTheater";
import type { Seat, SeatType } from "../types/typeSeat";

export function parseSeatCode(ten_ghe: string) {
  const row = ten_ghe.match(/[A-Z]+/)?.[0] ?? "";
  const col = Number(ten_ghe.match(/\d+/)?.[0] ?? 0);
  return { row, col };
}

// loai_ghe trong DB: "Thuong" | "VIP" (ghế đôi chưa có, phòng sẵn khi backend thêm)
export function getSeatType(loai_ghe?: string | null): SeatType {
  const t = (loai_ghe ?? "").toLowerCase();
  if (t.includes("vip")) return "vip";
  if (t.includes("doi") || t.includes("couple")) return "couple";
  return "normal";
}

export function buildSeatMap(danh_sach_ghe: ISeatStatus[]) {
  const seats: Seat[] = danh_sach_ghe.map((ghe) => {
    const { row, col } = parseSeatCode(ghe.ten_ghe ?? "");
    return {
      ma_ghe: ghe.ma_ghe,
      ten_ghe: ghe.ten_ghe,
      row,
      col,
      type: getSeatType(ghe.loai_ghe),
      // ghế đang được người khác giữ chỗ cũng không cho chọn
      status: ghe.da_dat || ghe.dang_giu_cho ? "booked" : "available",
    };
  });

  const grouped: Record<string, Seat[]> = {};

  for (const seat of seats) {
    if (!grouped[seat.row]) grouped[seat.row] = [];
    grouped[seat.row].push(seat);
  }

  for (const row of Object.keys(grouped)) {
    grouped[row].sort((a, b) => a.col - b.col);
  }

  return grouped;
}
