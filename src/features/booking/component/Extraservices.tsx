"use client";

/*
  Dịch vụ kèm theo: các dòng combo kiểu vé,
  stepper vát góc, accent cyan khi có số lượng
*/

export type TExtraService = {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: React.ReactNode;
};

export const EXTRA_SERVICES: TExtraService[] = [
  {
    id: "combo-solo",
    name: "Combo Solo",
    desc: "1 bắp rang vừa cùng 1 nước ngọt size M",
    price: 79000,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 8l1.5 12h9L18 8M5 8h14M8.5 8V6a2 2 0 012-2h3a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    id: "combo-couple",
    name: "Combo Đôi",
    desc: "1 bắp rang lớn cùng 2 nước ngọt size L",
    price: 129000,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 9l1.4 11h5.2L12 9M3 9h10M14 12l1 8h4l1-8M13 12h8M17 12V9a2 2 0 012-2" />
      </svg>
    ),
  },
  {
    id: "combo-family",
    name: "Combo Gia Đình",
    desc: "2 bắp rang lớn cùng 4 nước ngọt tuỳ chọn",
    price: 219000,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 8l1.5 12h15L21 8M2 8h20M8 8V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V8M9 12v4M12 12v4M15 12v4" />
      </svg>
    ),
  },
  {
    id: "snack-mix",
    name: "Khay Snack Mix",
    desc: "Khoai tây, xúc xích và phô mai que",
    price: 95000,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="10" width="18" height="9" />
        <path d="M3 10l2-4h14l2 4M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
  },
];

type ExtraServicesProps = {
  quantities: Record<string, number>;
  onChange: (id: string, qty: number) => void;
};

const CUT =
  "[clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]";

export function ExtraServices({ quantities, onChange }: ExtraServicesProps) {
  return (
    <div className="flex flex-col">
      {EXTRA_SERVICES.map((sv, idx) => {
        const qty = quantities[sv.id] ?? 0;
        const active = qty > 0;
        return (
          <div
            key={sv.id}
            className={`flex items-center gap-5 py-5 transition-colors duration-300 ${
              idx > 0 ? "border-t border-white/[.07]" : ""
            } ${active ? "bg-[#63eaff]/[.03]" : ""}`}
          >
            {/* icon nét mảnh */}
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center border transition-all duration-300 ${CUT} ${
                active
                  ? "border-[#63eaff]/50 text-[#7fefff] shadow-[0_0_14px_-4px_rgba(99,234,255,.5)]"
                  : "border-white/12 text-white/45"
              }`}
            >
              <span className="h-6 w-6">{sv.icon}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-3">
                <h4 className="font-bold text-white">{sv.name}</h4>
                <span
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    active ? "text-[#7fefff]" : "text-white/50"
                  }`}
                >
                  {sv.price.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <p className="mt-0.5 truncate text-sm font-light text-white/45">
                {sv.desc}
              </p>
            </div>

            {/* stepper */}
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label={`Giảm ${sv.name}`}
                disabled={qty === 0}
                onClick={() => onChange(sv.id, Math.max(0, qty - 1))}
                className={`grid h-8 w-8 place-items-center border text-lg leading-none transition-all ${CUT} ${
                  qty === 0
                    ? "cursor-not-allowed border-white/[.08] text-white/20"
                    : "border-white/25 text-white/80 hover:border-[#ff88e1]/60 hover:text-[#ff88e1]"
                }`}
              >
                −
              </button>
              <span
                className={`w-6 text-center text-base font-bold tabular-nums ${
                  active ? "text-[#7fefff]" : "text-white/40"
                }`}
              >
                {qty}
              </span>
              <button
                type="button"
                aria-label={`Thêm ${sv.name}`}
                onClick={() => onChange(sv.id, Math.min(10, qty + 1))}
                className={`grid h-8 w-8 place-items-center border text-lg leading-none transition-all ${CUT} border-white/25 text-white/80 hover:border-[#63eaff]/60 hover:text-[#7fefff] hover:shadow-[0_0_10px_-2px_rgba(99,234,255,.5)]`}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
