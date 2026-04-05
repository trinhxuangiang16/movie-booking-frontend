import { bebas } from "@/lib";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function CircleRadiusBtn() {
  return (
    <Link className={`ml-5 ${bebas.className} flex items-center`} href={"/"}>
      <svg width="0" height="0">
        {/* Định nghĩa gradient cho icon */}
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#63eaff" />
            <stop offset="100%" stopColor="#ff88e1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="group inline-flex  items-center overflow-hidden rounded-full border border-[#63eaff] transition-all duration-300 w-12 h-12 hover:w-30 px-4 py-3 cursor-pointer hover:shadow-[0_0_20px_#ffafeb7f]">
        <FaAngleRight
          className="shrink-0 flex items-center"
          style={{ fill: "url(#iconGradient)" }}
        />

        <span
          className="
           ml-2 whitespace-nowrap opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-gradient-to-r h-full flex items-center from-[#63eaff] to-[#ff88e1] bg-clip-text text-transparent"
        >
          Xem thêm
        </span>
      </div>
    </Link>
  );
}
