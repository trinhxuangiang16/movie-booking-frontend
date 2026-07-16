import { mockPhongVe } from "../mock/seatMap.mock";

export function parseSeatCode(ten_ghe: string) {
  const row = ten_ghe.match(/[A-Z]+/)?.[0] ?? "";
  const col = Number(ten_ghe.match(/\d+/)?.[0] ?? 0);
  return { row, col };
}

export function getSeatType(row: string): "vip" | "normal" | "couple" {
  if (row === "G" || row === "H") return "couple";
  if (row === "C" || row === "D") return "vip";
  return "normal";
}

export function buildSeatMap(data: typeof mockPhongVe) {
  const datVeIds = new Set(data.DatVe.map((v) => v.ma_ghe));

  const seats = data.RapPhim.Ghe.map((ghe) => {
    const { row, col } = parseSeatCode(ghe.ten_ghe ?? "");
    return {
      ma_ghe: ghe.ma_ghe,
      ten_ghe: ghe.ten_ghe,
      row,
      col,
      type: getSeatType(row),
      status: datVeIds.has(ghe.ma_ghe) ? "booked" : "available",
    };
  });

  const grouped: Record<string, typeof seats> = {};

  for (const seat of seats) {
    if (!grouped[seat.row]) grouped[seat.row] = [];
    grouped[seat.row].push(seat);
  }

  return grouped;
}
