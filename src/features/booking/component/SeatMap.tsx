import { buildSeatMap } from "../utils/seatMap.utils";
import { mockPhongVe } from "../mock/seatMap.mock";
import { Seat } from "./Seat";

export function SeatMap() {
  const seatMap = buildSeatMap(mockPhongVe);

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(seatMap).map(([row, seats]) => (
        <div key={row} className="flex gap-2">
          {seats.map((seat) => (
            <Seat
              key={seat.ma_ghe}
              ten_ghe={seat.ten_ghe ?? ""}
              type={seat.type}
              status={seat.status as "available" | "booked"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
