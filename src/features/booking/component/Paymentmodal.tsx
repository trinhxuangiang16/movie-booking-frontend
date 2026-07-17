"use client";

import { useEffect, useState } from "react";

/*
  Modal thanh toán: các cổng online phổ biến tại Việt Nam.
  Demo: chọn cổng, bấm xác nhận sẽ xử lý giả lập ~2s,
  cổng có failDemo=true trả về thất bại để xem UI lỗi, còn lại thành công.
*/

type PayMethod = {
  id: string;
  name: string;
  note: string;
  mark: React.ReactNode; // chữ ký hiệu thay logo ngoài
  accent: string;
  failDemo?: boolean;
};

const METHODS: PayMethod[] = [
  {
    id: "momo",
    name: "Ví MoMo",
    note: "Quét mã hoặc liên kết ví",
    accent: "#ff88e1",
    mark: <span className="text-sm font-black tracking-tight">MoMo</span>,
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    note: "Thanh toán qua ví ZaloPay",
    accent: "#63eaff",
    mark: <span className="text-sm font-black tracking-tight">ZaloPay</span>,
  },
  {
    id: "vnpay",
    name: "VNPAY QR",
    note: "Quét QR từ app ngân hàng",
    accent: "#c0a4ff",
    mark: <span className="text-sm font-black tracking-tight">VNPAY</span>,
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    note: "Thanh toán qua ví ShopeePay",
    accent: "#ffb27a",
    mark: <span className="text-sm font-black tracking-tight">SPay</span>,
  },
  {
    id: "atm",
    name: "Thẻ ATM nội địa",
    note: "Napas, Internet Banking",
    accent: "#8ff3c8",
    mark: <span className="text-sm font-black tracking-tight">ATM</span>,
    failDemo: true,
  },
  {
    id: "card",
    name: "Thẻ quốc tế",
    note: "Visa, Mastercard, JCB",
    accent: "#e8c46a",
    mark: <span className="text-sm font-black tracking-tight">CARD</span>,
  },
];

type Phase = "choose" | "processing" | "failed";

type PaymentModalProps = {
  open: boolean;
  total: number;
  onClose: () => void;
  onSuccess: () => void;
};

const CUT =
  "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]";

export function PaymentModal({
  open,
  total,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [method, setMethod] = useState<string>("momo");
  const [phase, setPhase] = useState<Phase>("choose");

  useEffect(() => {
    if (open) {
      setPhase("choose");
      setMethod("momo");
    }
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    setPhase("processing");
    const chosen = METHODS.find((m) => m.id === method);
    setTimeout(() => {
      if (chosen?.failDemo) setPhase("failed");
      else onSuccess();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Thanh toán"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[#04060f]/85 backdrop-blur-sm"
        onClick={phase === "processing" ? undefined : onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden bg-gradient-to-b from-[#0d1230] to-[#0a0e24] ring-1 ring-white/12 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
        {/* răng phim mép trên */}
        <div
          className="h-4 w-full opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.8) 0 8px, transparent 8px 20px)",
          }}
        />

        {phase === "choose" && (
          <div className="px-7 pb-7 pt-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#63eaff]">
                  Thanh toán
                </p>
                <p className="mt-2 text-2xl font-bold text-white tabular-nums">
                  {total.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="grid h-8 w-8 place-items-center border border-white/15 text-white/60 transition hover:border-[#ff88e1]/60 hover:text-[#ff88e1] [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {METHODS.map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-4 border px-4 py-3 text-left transition-all ${CUT} ${
                      active
                        ? "border-transparent bg-white/[.05]"
                        : "border-white/10 hover:border-white/25"
                    }`}
                    style={
                      active
                        ? {
                            boxShadow: `inset 0 0 0 1px ${m.accent}90, 0 0 20px -6px ${m.accent}50`,
                          }
                        : undefined
                    }
                  >
                    <span
                      className={`grid h-10 w-16 shrink-0 place-items-center border ${CUT}`}
                      style={{
                        color: m.accent,
                        borderColor: `${m.accent}55`,
                        background: `${m.accent}10`,
                      }}
                    >
                      {m.mark}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-white">
                        {m.name}
                      </span>
                      <span className="block truncate text-xs font-light text-white/45">
                        {m.note}
                      </span>
                    </span>
                    <span
                      className={`ml-auto h-2.5 w-2.5 shrink-0 rounded-full transition-all ${
                        active ? "" : "bg-white/15"
                      }`}
                      style={
                        active
                          ? {
                              background: m.accent,
                              boxShadow: `0 0 10px ${m.accent}`,
                            }
                          : undefined
                      }
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={confirm}
              className="group relative mt-6 w-full overflow-hidden bg-gradient-to-r from-[#63eaff] to-[#ff88e1] py-3.5 text-sm font-bold uppercase tracking-[0.22em] text-[#06101c] transition-all [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)] hover:shadow-[0_10px_34px_-8px_rgba(192,132,252,.7)]"
            >
              <span className="relative z-10">Xác nhận thanh toán</span>
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,.55)_50%,transparent_60%)] transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <p className="mt-3 text-center text-[11px] tracking-[0.14em] text-white/35">
              Giao dịch được mã hoá và bảo mật
            </p>
          </div>
        )}

        {phase === "processing" && (
          <div className="flex flex-col items-center px-7 pb-12 pt-10">
            {/* vòng quay cuộn phim */}
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-[#63eaff]" />
              <span className="absolute inset-2.5 animate-[spin_1.6s_linear_infinite_reverse] rounded-full border-2 border-white/10 border-b-[#ff88e1]" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-white">
              Đang xử lý giao dịch
            </p>
            <p className="mt-2 text-xs font-light tracking-wide text-white/45">
              Vui lòng không đóng cửa sổ này
            </p>
          </div>
        )}

        {phase === "failed" && (
          <div className="flex flex-col items-center px-7 pb-8 pt-8">
            <div className="grid h-14 w-14 place-items-center border border-[#ff6584]/50 bg-[#ff6584]/[.08] text-[#ff8ba1] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </div>
            <p className="mt-5 text-base font-bold uppercase tracking-[0.2em] text-white">
              Thanh toán thất bại
            </p>
            <p className="mt-2 max-w-xs text-center text-sm font-light leading-relaxed text-white/50">
              Giao dịch bị từ chối bởi cổng thanh toán. Kiểm tra lại thông tin
              hoặc chọn phương thức khác.
            </p>
            <div className="mt-6 flex w-full gap-3">
              <button
                type="button"
                onClick={() => setPhase("choose")}
                className="flex-1 border border-[#63eaff]/50 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7fefff] transition hover:bg-[#63eaff]/10 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
              >
                Thử lại
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-white/15 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition hover:border-white/35 hover:text-white [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* răng phim mép dưới */}
        <div
          className="h-4 w-full opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.8) 0 8px, transparent 8px 20px)",
          }}
        />
      </div>
    </div>
  );
}
