"use client";

import { useState } from "react";
import { Ticket, HelpCircle } from "lucide-react";
import TicketRequestForm from "./TicketRequestForm";
import FaqSection from "./FaqSection";

type SupportTab = "ticket" | "faq";

export default function SupportDetail() {
  const [activeTab, setActiveTab] = useState<SupportTab>("ticket");

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
      {/* Title section */}
      <div className="mb-8 flex items-center gap-3">
        <span className="h-7 w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff]" />
        <h1 className="text-2xl font-bold uppercase tracking-wider text-white md:text-3xl">
          Yêu cầu hỗ trợ & Giải đáp
        </h1>
      </div>

      {/* Main Container Card */}
      <div className="rounded-2xl border border-[#2a2f55] bg-[#0a0e24] shadow-2xl overflow-hidden">
        {/* Horizontal Tab Header */}
        <div className="flex border-b border-white/10 bg-[#070a1c]/60">
          <button
            type="button"
            onClick={() => setActiveTab("ticket")}
            className={`flex flex-1 items-center justify-center gap-2 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition border-b-2 ${
              activeTab === "ticket"
                ? "border-[#63eaff] text-[#7fefff] bg-white/[0.04]"
                : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
            }`}
          >
            <Ticket className="h-4 w-4" /> Yêu cầu cấp vé
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faq")}
            className={`flex flex-1 items-center justify-center gap-2 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition border-b-2 ${
              activeTab === "faq"
                ? "border-[#63eaff] text-[#7fefff] bg-white/[0.04]"
                : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
            }`}
          >
            <HelpCircle className="h-4 w-4" /> Các câu hỏi thường gặp
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 md:p-8">
          {activeTab === "ticket" ? <TicketRequestForm /> : <FaqSection />}
        </div>
      </div>
    </section>
  );
}
