"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: "faq-1",
    question: "Tôi đã thanh toán thành công nhưng không thấy vé trong Lịch sử mua vé?",
    answer:
      "Trường hợp giao dịch ngân hàng đã trừ tiền nhưng hệ thống chưa kịp nhả vé, bạn hãy chuyển sang tab 'Yêu cầu cấp vé' để tra cứu thông tin hóa đơn hoặc bấm nút 'Yêu cầu kiểm tra giao dịch' để tư vấn viên xử lý trong vòng 5-15 phút.",
  },
  {
    id: "faq-2",
    question: "Tôi có thể hủy vé hoặc đổi suất chiếu sau khi đã thanh toán không?",
    answer:
      "Theo quy định của rạp chiếu phim, vé xem phim đã thanh toán thành công không thể hoàn tiền hoặc đổi suất chiếu trực tuyến. Bạn vui lòng tới trực tiếp rạp chiếu trước giờ chiếu ít nhất 60 phút để nhân viên quầy hỗ trợ kiểm tra điều kiện.",
  },
  {
    id: "faq-3",
    question: "Làm sao để nhận vé khi đến rạp xem phim?",
    answer:
      "Bạn chỉ cần mở trang web Movi.E, truy cập mục 'Lịch sử mua vé' trên tài khoản cá nhân và xuất trình mã QR Code vé cho nhân viên tại quầy soát vé để được quét mã vào phòng chiếu.",
  },
  {
    id: "faq-4",
    question: "Các hình thức thanh toán nào được hỗ trợ trên hệ thống?",
    answer:
      "Hệ thống hiện tại hỗ trợ thanh toán qua chuyển khoản ngân hàng thông minh QR Code (VietQR), thẻ ATM nội địa Napas, thẻ thanh toán quốc tế (Visa/Mastercard) và ví điện tử.",
  },
  {
    id: "faq-5",
    question: "Trẻ em có cần mua vé xem phim không?",
    answer:
      "Trẻ em có chiều cao từ 0.9m trở lên cần mua vé xem phim theo giá vé quy định của rạp. Trẻ em dưới 0.9m được miễn phí vé nhưng phải ngồi chung ghế cùng người lớn đi kèm.",
  },
  {
    id: "faq-6",
    question: "Tôi có thể mua thêm Combo Bắp Nước sau khi đã đặt vé trực tuyến không?",
    answer:
      "Có. Bạn có thể mua trực tiếp bắp nước và các sản phẩm dịch vụ giải khát tại quầy bắp nước của rạp chiếu phim trước khi bước vào phòng chiếu.",
  },
];

export default function FaqSection() {
  const [openIds, setOpenIds] = useState<string[]>(["faq-1"]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center gap-2 text-white/80">
        <HelpCircle className="h-5 w-5 text-[#63eaff]" />
        <p className="text-sm font-light text-white/70">
          Danh sách câu hỏi thường gặp trợ giúp giải đáp các thắc mắc về đặt vé và thanh toán
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_LIST.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="rounded-xl border border-[#2a2f55] bg-[#0a0e24] transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="flex w-full items-center justify-between p-5 text-left transition hover:text-[#63eaff]"
              >
                <span className="text-sm font-bold text-white md:text-base">
                  {item.question}
                </span>
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-[#ff88e1]" />
                  ) : (
                    <Plus className="h-4 w-4 text-[#63eaff]" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-white/10 px-5 pb-5 pt-3">
                  <p className="text-sm leading-relaxed text-white/70">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
