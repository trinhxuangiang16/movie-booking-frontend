"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Search, CheckCircle2, AlertCircle, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const POPULAR_MOVIES = [
  "Lật Mặt 7: Một Điều Ước",
  "Dune 2: Hành Tinh Cát",
  "Deadpool & Wolverine",
  "Godzilla x Kong: Đế Chế Mới",
  "Inside Out 2: Những Mảnh Ghép Cảm Xúc",
];

export default function TicketRequestForm() {
  const [formData, setFormData] = useState({
    ma_giao_dich: "",
    ma_hoa_don: "",
    ten_phim: POPULAR_MOVIES[0],
    ngay_gio_chieu: "",
  });

  const [isChecking, setIsChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState<"idle" | "success" | "failed">("idle");
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ma_giao_dich.trim()) {
      toast.error("Vui lòng nhập mã giao dịch ngân hàng");
      return;
    }
    if (!formData.ma_hoa_don.trim()) {
      toast.error("Vui lòng nhập mã hóa đơn");
      return;
    }

    setIsChecking(true);
    setCheckStatus("idle");
    setIsRequestSent(false);

    setTimeout(() => {
      setIsChecking(false);
      // Demo logic: If invoice code contains "1" or "8" or "HD" -> Success, otherwise simulate Fail
      const code = formData.ma_hoa_don.toUpperCase();
      if (code.includes("1") || code.includes("8") || code.startsWith("HD")) {
        setCheckStatus("success");
        toast.success("Kiểm tra thành công! Tìm thấy thông tin hóa đơn.");
      } else {
        setCheckStatus("failed");
        toast.warning("Chưa tìm thấy hóa đơn khớp với thông tin đã nhập.");
      }
    }, 800);
  };

  const handleSendManualCheckRequest = () => {
    setIsRequestSent(true);
    toast.success(
      "Yêu cầu kiểm tra giao dịch của bạn đã được gửi thành công! Bộ phận hỗ trợ sẽ xử lý và phản hồi sớm nhất có thể. Bạn hoàn toàn có thể yên tâm."
    );
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">
          Check hóa đơn & Yêu cầu cấp vé
        </h2>
        <p className="mt-1 text-sm text-white/60">
          Nhập thông tin giao dịch để hệ thống tra cứu tự động và cấp vé cho bạn
        </p>
      </div>

      {/* Form Check */}
      <form onSubmit={handleCheckInvoice} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Mã giao dịch ngân hàng */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Mã giao dịch ngân hàng
            </label>
            <input
              type="text"
              name="ma_giao_dich"
              value={formData.ma_giao_dich}
              onChange={handleChange}
              placeholder="VD: FT24072910829..."
              className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60"
            />
          </div>

          {/* Mã hóa đơn */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Mã hóa đơn / Mã đặt vé
            </label>
            <input
              type="text"
              name="ma_hoa_don"
              value={formData.ma_hoa_don}
              onChange={handleChange}
              placeholder="VD: HD10294"
              className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60"
            />
          </div>

          {/* Chọn phim */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Chọn phim
            </label>
            <select
              name="ten_phim"
              value={formData.ten_phim}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60"
            >
              {POPULAR_MOVIES.map((movie) => (
                <option key={movie} value={movie} className="bg-[#070a1c] text-white">
                  {movie}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn ngày giờ chiếu */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Chọn ngày giờ chiếu
            </label>
            <input
              type="datetime-local"
              name="ngay_gio_chieu"
              value={formData.ngay_gio_chieu}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-[#070a1c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#63eaff]/60 [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="payRetry"
            disabled={isChecking}
            className="w-full md:w-auto px-8"
          >
            <Search className="mr-2 h-4 w-4" />
            {isChecking ? "Đang tra cứu hệ thống..." : "Kiểm tra hóa đơn"}
          </Button>
        </div>
      </form>

      {/* Result Case A: Success */}
      {checkStatus === "success" && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-emerald-300">
                Tìm thấy hóa đơn thành công!
              </h3>
              <p className="mt-1 text-sm text-emerald-200/80">
                Vé của bạn đã được hệ thống cấp thành công. Vui lòng truy cập mục Lịch sử mua vé để xem QR vé xem phim.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/history">
              <Button variant="payment" className="w-full md:w-auto px-6">
                Đến Lịch sử mua vé ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Result Case B: Failed / Not Found */}
      {checkStatus === "failed" && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-amber-300">
                Chưa tìm thấy vé khớp với thông tin đã nhập
              </h3>
              <p className="mt-1 text-sm text-amber-200/80">
                Hệ thống chưa tìm thấy giao dịch nhả vé tự động. Vui lòng bấm nút bên dưới để gửi yêu cầu kiểm tra giao dịch cho bộ phận chăm sóc khách hàng.
              </p>
            </div>
          </div>

          {!isRequestSent ? (
            <div className="pt-2">
              <Button
                type="button"
                variant="payment"
                onClick={handleSendManualCheckRequest}
                className="w-full md:w-auto px-6"
              >
                <Send className="mr-2 h-4 w-4" /> Yêu cầu kiểm tra giao dịch
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-[#070a1c] p-4 text-sm text-white/80">
              <span className="font-bold text-[#63eaff]">Trạng thái yêu cầu: </span>
              Đã ghi nhận yêu cầu kiểm tra thủ công. Nhân viên sẽ đối soát sao kê và liên hệ phản hồi cho bạn trong thời gian sớm nhất. Bạn có thể hoàn toàn yên tâm!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
