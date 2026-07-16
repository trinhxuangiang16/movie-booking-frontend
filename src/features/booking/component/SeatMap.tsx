"use client";

import { useState, useCallback, useMemo } from "react";
import { buildSeatMap } from "../utils/seatMap.utils";
import { mockPhongVe } from "../mock/seatMap.mock";
import { Seat } from "./Seat";
import type { Seat as SeatType } from "../types/typeSeat";

export function SeatMap() {
  const seatMap = buildSeatMap(mockPhongVe);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Hàm xử lý khi user click 1 ghế
  const handleSelectSeat = useCallback((ma_ghe: number) => {
    setSelectedSeats((prev) => {
      if (prev.includes(ma_ghe)) {
        return prev.filter((id) => id !== ma_ghe);
      }
      if (prev.length < 8) {
        return [...prev, ma_ghe];
      }
      return prev;
    });
  }, []);

  // Tính tổng tiền: duyệt qua các ghế chọn, lấy loại ghế, nhân với giá
  const totalPrice = useMemo(() => {
    const priceByType = {
      normal: mockPhongVe.gia_ve,
      vip: mockPhongVe.gia_ve * 1.5,
      couple: mockPhongVe.gia_ve * 2,
    };

    let total = 0;
    for (const [row, seats] of Object.entries(seatMap)) {
      for (const seat of seats) {
        if (selectedSeats.includes(seat.ma_ghe)) {
          total += priceByType[seat.type];
        }
      }
    }
    return total;
  }, [selectedSeats, seatMap]);

  return (
    <div className="flex flex-col gap-6">
      {/* Legend - Hướng dẫn loại ghế */}
      <div className="flex gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <span className="text-gray-300">Ghế thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded"></div>
          <span className="text-gray-300">Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-pink-400 rounded"></div>
          <span className="text-gray-300">Ghế đôi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded"></div>
          <span className="text-gray-300">Đã đặt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded border-2 border-blue-800"></div>
          <span className="text-gray-300">Đang chọn</span>
        </div>
      </div>

      {/* Màn hình (Screen) */}
      <div className="flex justify-center">
        <div className="text-center text-gray-400 border-t-4 border-gray-500 w-96 py-3">
          📺 MÀN HÌNH 📺
        </div>
      </div>

      {/* Grid ghế */}
      <div className="flex flex-col gap-3 items-center">
        {Object.entries(seatMap).map(([row, seats]) => (
          <div key={row} className="flex gap-1">
            <span className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-gray-400">
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
                onClick={handleSelectSeat}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Info panel: danh sách ghế chọn + tổng tiền */}
      <div className="mt-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Ghế chọn:{" "}
              <span className="text-blue-600">{selectedSeats.length}</span>/8
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {selectedSeats.length > 0
                ? `Ghế: ${selectedSeats
                    .map((id) => {
                      for (const [_, seats] of Object.entries(seatMap)) {
                        const found = seats.find((s) => s.ma_ghe === id);
                        if (found) return found.ten_ghe;
                      }
                      return "";
                    })
                    .join(", ")}`
                : "Chưa chọn ghế nào"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Tổng tiền</p>
            <p className="text-2xl font-bold text-red-600">
              {totalPrice.toLocaleString("vi-VN")} VND
            </p>
          </div>
        </div>
        <button
          disabled={selectedSeats.length === 0}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Tiếp tục ({selectedSeats.length} ghế)
        </button>
      </div>
    </div>
  );
}
