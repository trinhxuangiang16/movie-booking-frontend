import { mockPhongVe } from "../mock/seatMap.mock";

export function parseSeatCode(ten_ghe: string) {
  const row = ten_ghe.match(/[A-Z]+/)?.[0] ?? ""; //này là lấy chữ cái đầu tiên trong tên ghế, ví dụ "A" từ "A1"
  const col = Number(ten_ghe.match(/\d+/)?.[0] ?? 0); // này là lấy số từ tên ghế, ví dụ "1" từ "A1"
  return { row, col };
}

//Này là hàm để xác định loại ghế dựa trên hàng ghế.
export function getSeatType(row: string): "vip" | "normal" | "couple" {
  if (row === "G" || row === "H") return "couple";
  if (row === "C" || row === "D") return "vip";
  return "normal";
}

//dùng để xây dựng bản đồ ghế từ dữ liệu mock
export function buildSeatMap(data: typeof mockPhongVe) {
  const datVeIds = new Set(data.DatVe.map((v) => v.ma_ghe)); // tạo một Set chứa các mã ghế đã được đặt

  //
  const seats = data.RapPhim.Ghe.map((ghe) => {
    const { row, col } = parseSeatCode(ghe.ten_ghe ?? "");
    return {
      ma_ghe: ghe.ma_ghe,
      ten_ghe: ghe.ten_ghe,
      row,
      col,
      type: getSeatType(row),
      status: datVeIds.has(ghe.ma_ghe) ? "booked" : "available", // nếu mã ghế có trong Set thì trạng thái là "booked", ngược lại là "available"
    };
  });

  const grouped: Record<string, typeof seats> = {}; // tạo một đối tượng để nhóm các ghế theo hàng

  for (const seat of seats) {
    if (!grouped[seat.row]) grouped[seat.row] = []; // nếu hàng chưa tồn tại trong grouped thì tạo một mảng rỗng
    grouped[seat.row].push(seat); // thêm ghế vào mảng của hàng tương ứng
  }

  return grouped; // trả về đối tượng grouped chứa các ghế được nhóm theo hàngs
}
console.log(JSON.stringify(buildSeatMap(mockPhongVe), null, 2));
// npx tsx src/features/booking/utils/seatMap.utils.ts
