"use client";

import { Button } from "@/components/ui/button";

/*
  Hoá đơn kiểu vé rạp: đầu vé thông tin suất chiếu,
  đường xé răng cưa, thân vé liệt kê ghế + dịch vụ, chân vé tổng tiền
*/

type TInvoiceLine = { label: string; detail?: string; amount: number };

type TotalServicePaymentProps = {
  movieTitle: string;
  showtime: string;
  room: string;
  seatLines: TInvoiceLine[];
  serviceLines: TInvoiceLine[];
  total: number;
  disabled: boolean;
  onPay: () => void;
};

export function TotalServicePayment({
  movieTitle,
  showtime,
  room,
  seatLines,
  serviceLines,
  total,
  disabled,
  onPay,
}: TotalServicePaymentProps) {
  const empty = seatLines.length === 0 && serviceLines.length === 0;

  return (
    <aside className="relative">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d1230] to-[#0a0e24] ring-1 ring-white/10 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
        {/* ĐẦU VÉ */}
        <div className="relative px-6 pb-5 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#63eaff]">
            Hoá đơn đặt vé
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">{movieTitle}</h3>
          <p className="mt-1 text-sm text-white/55">
            {room}
            <span className="mx-2 text-white/25">|</span>
            {showtime}
          </p>
        </div>

        {/* ĐƯỜNG XÉ răng cưa + 2 lỗ tròn */}
        <div className="relative h-5">
          <span className="absolute left-0 top-1/2 h-5 w-2.5 -translate-y-1/2 rounded-r-full bg-[#070a1c]" />
          <span className="absolute right-0 top-1/2 h-5 w-2.5 -translate-y-1/2 rounded-l-full bg-[#070a1c]" />
          <span
            className="absolute inset-x-4 top-1/2 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 6px, transparent 6px 13px)",
            }}
          />
        </div>

        {/* THÂN VÉ */}
        <div className="max-h-[300px] overflow-y-auto px-6 py-4 [scrollbar-width:thin]">
          {empty ? (
            <p className="py-6 text-center text-sm font-light text-white/35">
              Chọn ghế để bắt đầu
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {seatLines.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                    Ghế
                  </p>
                  {seatLines.map((l) => (
                    <div
                      key={l.label}
                      className="flex items-baseline justify-between py-1 text-sm"
                    >
                      <span className="text-white/80">
                        {l.label}
                        {l.detail && (
                          <span className="ml-2 text-xs text-white/40">
                            {l.detail}
                          </span>
                        )}
                      </span>
                      <span className="tabular-nums text-white/70">
                        {l.amount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {serviceLines.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                    Dịch vụ
                  </p>
                  {serviceLines.map((l) => (
                    <div
                      key={l.label}
                      className="flex items-baseline justify-between py-1 text-sm"
                    >
                      <span className="text-white/80">
                        {l.label}
                        {l.detail && (
                          <span className="ml-2 text-xs text-[#7fefff]/70">
                            {l.detail}
                          </span>
                        )}
                      </span>
                      <span className="tabular-nums text-white/70">
                        {l.amount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CHÂN VÉ: tổng tiền + nút thanh toán */}
        <div className="border-t border-white/[.08] px-6 pb-6 pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-white/45">
              Tổng cộng
            </span>
            <span className="bg-gradient-to-r from-[#63eaff] to-[#ff88e1] bg-clip-text text-2xl font-bold tabular-nums text-transparent">
              {total.toLocaleString("vi-VN")}đ
            </span>
          </div>

          <Button
            type="button"
            disabled={disabled}
            onClick={onPay}
            variant={disabled ? "paymentDisabled" : "payment"}
            className="mt-5"
          >
            <span className="relative z-10">Thanh toán</span>
            {!disabled && (
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,.55)_50%,transparent_60%)] transition-transform duration-700 group-hover:translate-x-full" />
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
