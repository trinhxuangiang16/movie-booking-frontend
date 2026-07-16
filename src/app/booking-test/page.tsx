"use client";

import { SeatMap } from "@/features/booking/component/SeatMap";

export default function BookingSeatSelectionPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-[#0c1137] to-transparent">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <h1 className="text-2xl font-bold text-white mb-1">Chọn Ghế</h1>
          <p className="text-gray-400 text-xs">Rạp 1 - Suất chiếu: 19:00</p>
        </div>
      </div>

      {/* Main Content - với padding top để tránh header fixed che nội dung */}
      <div className="pt-24 px-4 pb-16 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="bg-[#1a2847] rounded-lg p-8 border border-gray-700">
            <SeatMap />
          </div>
        </div>
      </div>
    </div>
  );
}
