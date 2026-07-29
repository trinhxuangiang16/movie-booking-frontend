"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrderStatus } from "../hooks/useOrderStatus";
import { useCancelOrder } from "@/features/movie/hooks/useCancelOrder";
import { useSearchUser } from "@/features/auth/hooks/useSearchUser";
import type { ISearchUserItem } from "@/features/auth/services/searchUser.service";
import type { IPendingOrderResult } from "@/features/movie/services/booking";



type PayMethod = {
  id: string;
  name: string;
  note: string;
  mark: React.ReactNode;
  accent: string;
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
  },
  {
    id: "card",
    name: "Thẻ quốc tế",
    note: "Visa, Mastercard, JCB",
    accent: "#e8c46a",
    mark: <span className="text-sm font-black tracking-tight">CARD</span>,
  },
];

type Phase = "choose" | "processing" | "qr" | "success" | "failed";

type PaymentModalProps = {
  open: boolean;
  total: number;
  onClose: () => void;

  onConfirm: () => Promise<IPendingOrderResult>;
  onPaid?: () => void;

  onCancelled?: () => void;

  isAdmin?: boolean;

  onGrant?: (emailKhach: string) => Promise<unknown>;

  onGranted?: () => void;
};

const CUT =
  "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]";


const PAYMENT_GRACE_MS = 5000;

function formatCountdown(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PaymentModal({
  open,
  total,
  onClose,
  onConfirm,
  onPaid,
  onCancelled,
  isAdmin = false,
  onGrant,
  onGranted,
}: PaymentModalProps) {
  const [method, setMethod] = useState<string>("momo");
  const [phase, setPhase] = useState<Phase>("choose");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [order, setOrder] = useState<IPendingOrderResult | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(0);


  const [khachChon, setKhachChon] = useState<ISearchUserItem | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [dangCapVe, setDangCapVe] = useState<boolean>(false);

  const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedKeyword(searchKeyword), 300);
    return () => clearTimeout(id);
  }, [searchKeyword]);

  const { data: ketQuaTimKiem = [], isFetching: dangTimKiem } =
    useSearchUser(debouncedKeyword);

  const { mutate: huyGiaoDich } = useCancelOrder();

  const orderStatus = useOrderStatus(order?.ma_hoa_don ?? null, {
    enabled: phase === "qr",
    onPaid: () => {
      setPhase("success");
      onPaid?.();
    },
  });


  useEffect(() => {
    if (phase !== "qr" || !order) return;

    const hetHan = new Date(order.het_han_luc).getTime();

    const tick = () => {
      const remaining = hetHan - Date.now();
      setRemainingMs(remaining);

      const backendExpired =
        orderStatus.data?.trang_thai_thanh_toan === "het_han";

      if (backendExpired) {
        setErrorMsg("Đã hết thời gian giữ ghế. Vui lòng đặt lại vé.");
        setPhase("failed");
        return;
      }


      if (remaining <= -PAYMENT_GRACE_MS) {
        setErrorMsg("Đã hết thời gian giữ ghế. Vui lòng đặt lại vé.");
        setPhase("failed");
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase, order]);


  const dangChoXacNhan =
    phase === "qr" && remainingMs <= 0 && remainingMs > -PAYMENT_GRACE_MS;

  if (!open) return null;

  const handleClose = () => {

    if (phase === "failed") {
      onCancelled?.();
    }

    setPhase("choose");
    setMethod("momo");
    setKhachChon(null);
    setSearchKeyword("");
    setDangCapVe(false);
    setErrorMsg(null);
    setOrder(null);
    setRemainingMs(0);
    onClose();
  };


  const handleCancel = () => {
    if (!order) {
      handleClose();
      return;
    }

    huyGiaoDich(order.ma_hoa_don);

    onCancelled?.();
    handleClose();
  };


  const handleGrant = async () => {
    if (!onGrant) return;
    setDangCapVe(true);
    try {
      await onGrant(khachChon?.email?.trim() ?? "");
      handleClose();
      onGranted?.();
    } catch {
      setDangCapVe(false);
    }
  };

  const confirm = async () => {
    setPhase("processing");
    try {
      const result = await onConfirm();
      setOrder(result);
      setPhase("qr");
    } catch (err) {
      const message = (
        err as { response?: { data?: { message?: string } } }
      )?.response?.data?.message;
      setErrorMsg(message ?? null);
      setPhase("failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Thanh toán"
    >
      <div
        className="absolute inset-0 bg-[#04060f]/85 backdrop-blur-sm"
        onClick={
          phase === "processing" || phase === "qr" ? undefined : handleClose
        }
      />

      <div className="relative w-full max-w-md overflow-hidden bg-gradient-to-b from-[#0d1230] to-[#0a0e24] ring-1 ring-white/12 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
        <div
          className="h-4 w-full opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.8) 0 8px, transparent 8px 20px)",
          }}
        />

        {phase === "choose" && isAdmin && (
          <div className="px-7 pb-7 pt-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ffb27a]">
                  Chế độ quản trị
                </p>
                <p className="mt-2 text-2xl font-bold text-white tabular-nums">
                  {total.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <Button
                type="button"
                onClick={handleClose}
                aria-label="Đóng"
                variant="modalClose"
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
              </Button>
            </div>

            <div className="mt-6 space-y-1.5">
              <label
                htmlFor="tim-khach"
                className="block text-[11px] font-bold uppercase tracking-[0.25em] text-white/55"
              >
                Tài khoản khách nhận vé
              </label>

              {khachChon ? (
                <div className="flex items-center justify-between gap-3 border border-[#63eaff]/40 bg-[#63eaff]/[.06] px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {khachChon.ho_ten || "(không tên)"}
                    </p>
                    <p className="truncate text-xs text-white/50">
                      {khachChon.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setKhachChon(null);
                      setSearchKeyword("");
                    }}
                    className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-[#ff88e1] hover:text-[#ff88e1]/80"
                  >
                    Bỏ chọn
                  </button>
                </div>
              ) : (
                <>
                  <input
                    id="tim-khach"
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Tìm theo tên hoặc email khách..."
                    className="w-full border border-white/12 bg-white/[.03] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#63eaff]/50 focus:outline-none"
                  />

                  {searchKeyword.trim().length >= 2 && (
                    <div className="max-h-40 overflow-y-auto border border-white/10 bg-[#0a0e24]">
                      {dangTimKiem && ketQuaTimKiem.length === 0 ? (
                        <p className="px-3 py-2.5 text-xs text-white/40">
                          Đang tìm...
                        </p>
                      ) : ketQuaTimKiem.length === 0 ? (
                        <p className="px-3 py-2.5 text-xs text-white/40">
                          Không tìm thấy khách phù hợp.
                        </p>
                      ) : (
                        ketQuaTimKiem.map((kh) => (
                          <button
                            key={kh.tai_khoan}
                            type="button"
                            onClick={() => {
                              setKhachChon(kh);
                              setSearchKeyword("");
                            }}
                            className="flex w-full flex-col items-start border-b border-white/[.06] px-3 py-2 text-left last:border-b-0 hover:bg-white/[.04]"
                          >
                            <span className="truncate text-sm font-medium text-white">
                              {kh.ho_ten || "(không tên)"}
                            </span>
                            <span className="truncate text-xs text-white/45">
                              {kh.email}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}

              <p className="text-[11px] font-light leading-relaxed text-white/40">
                Chọn khách để cấp vé thẳng vào lịch sử của họ. Bỏ trống = cấp cho
                chính admin.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button
                type="button"
                onClick={handleGrant}
                disabled={dangCapVe}
                variant="payment"
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10">
                  {dangCapVe ? "Đang cấp vé..." : "Cấp Vé Lại cho User"}
                </span>
              </Button>

              <Button
                type="button"
                disabled
                variant="payMethod"
                className="cursor-not-allowed opacity-40"
                title="Tính năng đang phát triển"
              >
                <span className="text-sm font-bold text-white">
                  Voucher (Marketing)
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-widest text-white/40">
                  Sắp có
                </span>
              </Button>

              <Button
                type="button"
                onClick={handleClose}
                disabled={dangCapVe}
                variant="payDismiss"
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                Hủy giao dịch
              </Button>
            </div>
          </div>
        )}

        {phase === "choose" && !isAdmin && (
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
              <Button
                type="button"
                onClick={handleClose}
                aria-label="Đóng"
                variant="modalClose"
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
              </Button>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {METHODS.map((m) => {
                const active = method === m.id;
                return (
                  <Button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    variant={active ? "payMethodActive" : "payMethod"}
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
                      className={`ml-auto h-2.5 w-2.5 shrink-0 rounded-full transition-all ${active ? "" : "bg-white/15"
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
                  </Button>
                );
              })}
            </div>

            <Button
              type="button"
              onClick={confirm}
              variant="payment"
              className="mt-6"
            >
              <span className="relative z-10">Xác nhận thanh toán</span>
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,.55)_50%,transparent_60%)] transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
            <p className="mt-3 text-center text-[11px] tracking-[0.14em] text-white/35">
              Giao dịch được mã hoá và bảo mật
            </p>
          </div>
        )}

        {phase === "processing" && (
          <div className="flex flex-col items-center px-7 pb-12 pt-10">
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

        {phase === "qr" && order && (
          <div className="flex flex-col items-center px-7 pb-8 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#63eaff]">
              Quét mã để thanh toán
            </p>
            <p className="mt-2 text-2xl font-bold text-white tabular-nums">
              {order.tong_tien.toLocaleString("vi-VN")}đ
            </p>

            <span className="mt-5 inline-block rounded-lg bg-white p-2.5">
              <img
                src={order.qr_url}
                alt="Mã QR VietQR để chuyển khoản thanh toán"
                width={200}
                height={200}
                className="h-[200px] w-[200px]"
              />
            </span>

            <div className="mt-5 w-full space-y-2 border border-white/10 bg-white/[.03] px-4 py-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/45">Nội dung CK</span>
                <span className="font-bold tracking-wide text-[#7fefff]">
                  {order.noi_dung_chuyen_khoan}
                </span>
              </div>
              <p className="text-[11px] font-light leading-relaxed text-white/40">
                Nhập đúng nội dung chuyển khoản ở trên để hệ thống tự động xác
                nhận vé của bạn.
              </p>
            </div>

            {dangChoXacNhan ? (

              <>
                <p className="mt-5 flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-[#63eaff]">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#63eaff]/25 border-t-[#63eaff]" />
                  Đang xác nhận lần cuối
                </p>
                <p className="mt-2 text-xs font-light tracking-wide text-white/45">
                  Vui lòng đợi trong giây lát, đừng đóng cửa sổ...
                </p>
              </>
            ) : (
              <>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                  Còn lại{" "}
                  <span className="text-[#ff88e1] tabular-nums">
                    {formatCountdown(remainingMs)}
                  </span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs font-light tracking-wide text-white/45">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#63eaff]" />
                  Đang chờ xác nhận thanh toán từ ngân hàng...
                </p>
              </>
            )}

            <Button
              type="button"
              onClick={handleCancel}
              variant="payDismiss"
              className="mt-6 w-full"
            >
              Hủy giao dịch
            </Button>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center px-7 pb-8 pt-8">
            <div className="grid h-14 w-14 place-items-center border border-[#63eaff]/50 bg-[#63eaff]/[.08] text-[#7fefff] shadow-[0_0_34px_-6px_rgba(99,234,255,.5)] [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)]">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </div>
            <p className="mt-5 text-base font-bold uppercase tracking-[0.2em] text-white">
              Thanh toán thành công
            </p>
            <p className="mt-2 max-w-xs text-center text-sm font-light leading-relaxed text-white/50">
              Ngân hàng đã xác nhận giao dịch. Vé của bạn đã được chốt.
            </p>
            <Button
              type="button"
              onClick={handleClose}
              variant="payment"
              className="mt-6"
            >
              <span className="relative z-10">Xem vé của tôi</span>
            </Button>
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
              {errorMsg ??
                "Giao dịch bị từ chối bởi cổng thanh toán. Kiểm tra lại thông tin hoặc chọn phương thức khác."}
            </p>

            <div className="mt-6 flex w-full">
              <Button
                type="button"
                onClick={handleClose}
                variant="payDismiss"
                className="w-full"
              >
                Đóng
              </Button>
            </div>
          </div>
        )}

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
