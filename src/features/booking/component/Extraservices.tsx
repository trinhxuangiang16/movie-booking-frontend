"use client";

import { CupSoda, Popcorn, ShoppingBasket, Sandwich } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ICombo } from "../services/combo";

/*
  Dịch vụ kèm theo: các dòng combo kiểu vé,
  stepper vát góc, accent cyan khi có số lượng.
  Danh sách combo lấy từ API (GET Combo/DanhSachCombo), truyền qua prop.
*/

// Pool icon lucide-react gán xoay vòng theo thứ tự combo (DB chưa có icon riêng)
const COMBO_ICONS = [CupSoda, Popcorn, ShoppingBasket, Sandwich];

// Màu nóng riêng cho icon từng combo — border/text/glow khi active
const ICON_HOT_COLORS = [
  { border: "border-[#ff8a4c]/50", text: "text-[#ffab73]", glow: "rgba(255,138,76,.5)" }, // cam
  { border: "border-[#ffb020]/50", text: "text-[#ffc857]", glow: "rgba(255,176,32,.5)" }, // vàng hổ phách
  { border: "border-[#ff6b4a]/50", text: "text-[#ff9075]", glow: "rgba(255,107,74,.5)" }, // đỏ cam
  { border: "border-[#ff7a9c]/50", text: "text-[#ffa3bb]", glow: "rgba(255,122,156,.5)" }, // hồng cam
];

type ExtraServicesProps = {
  services: ICombo[];
  quantities: Record<number, number>;
  onChange: (ma_combo: number, qty: number) => void;
};

const CUT =
  "[clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]";

export function ExtraServices({
  services,
  quantities,
  onChange,
}: ExtraServicesProps) {
  if (services.length === 0) {
    return (
      <p className="py-5 text-sm font-light text-white/45">
        Chưa có combo nào đang bán
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {services.map((sv, idx) => {
        const qty = quantities[sv.ma_combo] ?? 0;
        const active = qty > 0;
        const Icon = COMBO_ICONS[idx % COMBO_ICONS.length];
        const hot = ICON_HOT_COLORS[idx % ICON_HOT_COLORS.length];
        return (
          <div
            key={sv.ma_combo}
            className={`flex items-center gap-5 py-5 transition-colors duration-300 ${
              idx > 0 ? "border-t border-white/[.07]" : ""
            } ${active ? "bg-[#ff8a4c]/[.03]" : ""}`}
          >
            {/* icon nét mảnh, màu nóng */}
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center border transition-all duration-300 ${CUT} ${
                active
                  ? `${hot.border} ${hot.text}`
                  : "border-white/12 text-white/45"
              }`}
              style={active ? { boxShadow: `0 0 14px -4px ${hot.glow}` } : undefined}
            >
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-3">
                <h4 className="font-bold text-white">{sv.ten_combo}</h4>
                <span
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    active ? "text-[#7fefff]" : "text-white/50"
                  }`}
                >
                  {sv.gia.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <p className="mt-0.5 truncate text-sm font-light text-white/45">
                {sv.mo_ta}
              </p>
            </div>

            {/* stepper */}
            <div className="flex shrink-0 items-center gap-3">
              <Button
                type="button"
                aria-label={`Giảm ${sv.ten_combo}`}
                disabled={qty === 0}
                onClick={() => onChange(sv.ma_combo, Math.max(0, qty - 1))}
                variant={qty === 0 ? "stepperMinusDisabled" : "stepperMinus"}
              >
                −
              </Button>
              <span
                className={`w-6 text-center text-base font-bold tabular-nums ${
                  active ? "text-[#7fefff]" : "text-white/40"
                }`}
              >
                {qty}
              </span>
              <Button
                type="button"
                aria-label={`Thêm ${sv.ten_combo}`}
                onClick={() => onChange(sv.ma_combo, Math.min(10, qty + 1))}
                variant="stepperPlus"
              >
                +
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
