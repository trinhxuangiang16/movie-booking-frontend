"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useHistoryPayment } from "../hooks/usehistoryPayment";
import { getSeatType } from "../utils/seatMap.utils";
import type { IHistoryPayment } from "../services/historyPayment";

/*
  Lịch sử đặt vé theo giao dịch: mỗi hoá đơn là 1 "vé xé" (ticket stub),
  đường dashed + 2 notch tròn giả lập vé rạp. Depth bằng chênh lệch nền
  và border 1px #2a2f55, không glassmorphism, không glow.
*/

const PAGE_BG =
  "relative min-h-screen w-full bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]";

const SEAT_CHIP: Record<string, string> = {
  normal: "border-[#8b90b5]/40 text-[#e8eaf6]",
  vip: "border-[#e8c46a]/60 text-[#e8c46a]",
  couple: "border-[#ff88e1]/60 text-[#ff9fe7]",
};

type FilterTab = "all" | "thisMonth";

// vd: "07:00, Thứ Năm ngày 1/10/2026"
function formatShowtime(iso: string) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
  return `${time}, ${weekday} ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// vd: "20:31 ngày 17/7/2026"
function formatCreatedAt(iso: string) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${time} ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function formatMoney(n: number) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

/* ── Notch tròn khoét 2 đầu đường dashed ── */
function Notch({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-5 w-5 rounded-full border border-[#2a2f55] bg-[#0c1137] ${className}`}
    />
  );
}

/* ── 1 hoá đơn = 1 ticket stub ── */
function TicketCard({ bill }: { bill: IHistoryPayment }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      onClick={() => setOpen((v) => !v)}
      className="group relative cursor-pointer rounded-2xl border border-[#2a2f55] bg-[#0a0e24] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#454b7d] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto_300px] md:items-stretch">
        {/* ── PHẦN TRÁI: 3 cột — text | QR | badge (luôn hiện) ── */}
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between md:p-7">
          {/* cột 1: tên phim, rạp/giờ, meta */}
          <div className="min-w-0 sm:flex-1">
            <h3 className="truncate text-xl font-bold text-[#e8eaf6] md:text-2xl">
              {bill.ten_phim}
            </h3>
            <p className="mt-1.5 text-sm font-light text-[#8b90b5]">
              {bill.ten_rap}
              <span className="mx-2 text-[#8b90b5]/40">|</span>
              {formatShowtime(bill.ngay_gio_chieu)}
            </p>
            <p className="mt-5 text-[11px] font-light uppercase tracking-[0.3em] text-[#8b90b5]/70">
              {bill.ghe.length} ghế
              {bill.combo.length > 0 && ` cùng ${bill.combo.length} loại combo`}
            </p>
          </div>

          {/* cột 2: QR */}
          {bill.ma_ve_qr && (
            <div
              className="flex shrink-0 flex-col items-center gap-2 sm:mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="inline-block rounded-lg bg-white p-2">
                <QRCodeSVG value={bill.ma_ve_qr} size={96} />
              </span>
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b90b5]">
                {bill.checked_in_at ? "Đã check-in" : "Mã vé"}
              </p>
              <p className="max-w-[120px] text-center text-[11px] font-light leading-relaxed text-[#8b90b5]">
                {bill.checked_in_at
                  ? formatCreatedAt(bill.checked_in_at)
                  : "Đưa mã này cho soát vé tại rạp"}
              </p>
            </div>
          )}

          {/* cột 3: badge mã hóa đơn + đặt lúc */}
          <div className="shrink-0 text-left sm:text-right">
            <span className="inline-block rounded border border-[#c22f4e]/50 px-2 py-0.5 text-xs font-bold tracking-wider text-[#e05658]">
              #{bill.ma_hoa_don}
            </span>
            <p className="mt-1.5 text-[11px] font-light text-[#8b90b5]">
              Đặt lúc {formatCreatedAt(bill.created_at)}
            </p>
          </div>
        </div>

        {/* ── ĐƯỜNG XÉ dọc (desktop) ── */}
        <div className="relative hidden md:block">
          <Notch className="-top-2.5 left-1/2 -translate-x-1/2" />
          <Notch className="-bottom-2.5 left-1/2 -translate-x-1/2" />
          <span
            aria-hidden
            className="absolute inset-y-4 left-1/2 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, #2a2f55 0 6px, transparent 6px 13px)",
            }}
          />
          <span className="block w-8" />
        </div>

        {/* ── ĐƯỜNG XÉ ngang (mobile) ── */}
        <div className="relative h-8 md:hidden">
          <Notch className="-left-2.5 top-1/2 -translate-y-1/2" />
          <Notch className="-right-2.5 top-1/2 -translate-y-1/2" />
          <span
            aria-hidden
            className="absolute inset-x-4 top-1/2 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #2a2f55 0 6px, transparent 6px 13px)",
            }}
          />
        </div>

        {/* ── PHẦN PHẢI: chi tiết ── */}
        <div className="flex flex-col px-6 pb-6 md:py-7 md:pl-0 md:pr-7">
          {/* khối mở rộng: ghế + combo */}
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 motion-reduce:transition-none ${
              open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b90b5]">
              Ghế
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {bill.ghe.map((g) => (
                <span
                  key={g.ma_ghe}
                  className={`inline-flex items-baseline gap-1.5 rounded border px-2 py-1 text-xs font-semibold ${
                    SEAT_CHIP[getSeatType(g.loai_ghe)]
                  }`}
                >
                  {g.ten_ghe}
                  <span className="text-[10px] font-light text-[#8b90b5]">
                    {formatMoney(g.gia_ve)}
                  </span>
                </span>
              ))}
            </div>

            {bill.combo.length > 0 && (
              <>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b90b5]">
                  Combo
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {bill.combo.map((c) => (
                    <li
                      key={c.ma_combo}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span className="font-light text-[#e8eaf6]">
                        {c.ten_combo}{" "}
                        <span className="text-[#8b90b5]">×{c.so_luong}</span>
                      </span>
                      <span className="font-semibold tabular-nums text-[#e8eaf6]">
                        {formatMoney(c.don_gia * c.so_luong)}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <span className="mb-4 mt-4 block h-px w-full bg-[#2a2f55]" />
          </div>

          {/* tổng cộng: luôn hiện */}
          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b90b5]">
                Tổng cộng
              </p>
              <p className="mt-1 bg-gradient-to-r from-[#63eaff] to-[#ff88e1] bg-clip-text text-2xl font-bold tabular-nums text-transparent">
                {formatMoney(bill.tong_tien)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={open}
              aria-label={open ? "Thu gọn chi tiết" : "Xem chi tiết"}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className="text-[#8b90b5] hover:bg-transparent hover:text-[#e8eaf6]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${
                  open ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Skeleton shimmer theo khung ticket ── */
function TicketSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#2a2f55] bg-[#0a0e24]">
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto_300px]">
        <div className="p-6 md:p-7">
          <div className="h-6 w-2/3 rounded bg-white/[.06]" />
          <div className="mt-3 h-4 w-1/2 rounded bg-white/[.04]" />
          <div className="mt-6 h-3 w-24 rounded bg-white/[.04]" />
        </div>
        <div className="hidden w-8 md:block" />
        <div className="px-6 pb-6 md:py-7 md:pl-0 md:pr-7">
          <div className="h-3 w-20 rounded bg-white/[.04]" />
          <div className="mt-3 h-7 w-32 rounded bg-white/[.06]" />
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyHistory() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#2a2f55] bg-[#0a0e24] px-6 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-[#2a2f55] text-[#8b90b5]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8"
        >
          <path d="M3 9V7a1 1 0 011-1h16a1 1 0 011 1v2a2 2 0 100 4v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a2 2 0 100-4z" />
          <path d="M13 6v2M13 11v2M13 16v2" strokeDasharray="1 3" />
        </svg>
      </span>
      <div>
        <p className="text-lg font-bold text-[#e8eaf6]">
          Chưa có lịch sử đặt vé
        </p>
        <p className="mt-1 text-sm font-light text-[#8b90b5]">
          Đặt vé đầu tiên để bắt đầu hành trình điện ảnh của bạn
        </p>
      </div>
      <Button asChild variant="cardCta">
        <Link href="/">Đặt vé ngay</Link>
      </Button>
    </div>
  );
}

/* ── Trang lịch sử đặt vé ── */
export default function HistoryPayment() {
  const { data: bills, isLoading, isError, refetch } = useHistoryPayment();
  const [tab, setTab] = useState<FilterTab>("all");

  const visibleBills = useMemo(() => {
    const sorted = [...(bills ?? [])].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    if (tab === "all") return sorted;

    const now = new Date();
    return sorted.filter((b) => {
      const d = new Date(b.created_at);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
  }, [bills, tab]);

  return (
    <div className={PAGE_BG}>
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 md:px-8">
        {/* tiêu đề trang */}
        <div className="flex items-center gap-4">
          <span className="h-10 w-[3px] rounded-full bg-[#c22f4e]" />
          <h1 className="text-2xl font-bold uppercase tracking-widest text-[#e05658] md:text-3xl">
            Lịch sử đặt vé
          </h1>
        </div>
        <p className="mt-2 pl-[19px] text-sm font-light text-[#8b90b5]">
          Mỗi vé là một giao dịch đã hoàn tất
        </p>

        {/* filter tab underline */}
        <div className="mt-8 flex gap-2 border-b border-[#2a2f55]">
          {(
            [
              { key: "all", label: "Tất cả" },
              { key: "thisMonth", label: "Tháng này" },
            ] as const
          ).map((t) => (
            <Button
              key={t.key}
              type="button"
              variant="ghost"
              onClick={() => setTab(t.key)}
              className={`-mb-px rounded-none border-0 border-b-2 px-4 pb-3 pt-2 text-xs font-bold uppercase tracking-[0.2em] hover:bg-transparent ${
                tab === t.key
                  ? "border-b-[#c22f4e] text-[#e8eaf6]"
                  : "border-b-transparent text-[#8b90b5] hover:text-[#e8eaf6]"
              }`}
            >
              {t.label}
            </Button>
          ))}
        </div>

        {/* danh sách hoá đơn */}
        <div className="mt-8 flex flex-col gap-6">
          {isLoading ? (
            <>
              <TicketSkeleton />
              <TicketSkeleton />
              <TicketSkeleton />
            </>
          ) : isError ? (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#2a2f55] bg-[#0a0e24] px-6 py-14 text-center">
              <p className="text-sm font-light text-[#8b90b5]">
                Không tải được lịch sử đặt vé
              </p>
              <Button
                type="button"
                variant="payRetry"
                className="max-w-[220px]"
                onClick={() => refetch()}
              >
                Thử lại
              </Button>
            </div>
          ) : visibleBills.length === 0 ? (
            tab === "thisMonth" && (bills?.length ?? 0) > 0 ? (
              <div className="rounded-2xl border border-[#2a2f55] bg-[#0a0e24] px-6 py-14 text-center">
                <p className="text-sm font-light text-[#8b90b5]">
                  Không có giao dịch nào trong tháng này
                </p>
              </div>
            ) : (
              <EmptyHistory />
            )
          ) : (
            visibleBills.map((bill) => (
              <TicketCard key={bill.ma_hoa_don} bill={bill} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
