import { bebas } from "@/lib";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";

export default function CircleRadiusBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link
          className={`ml-5 ${bebas.className} flex items-center`}
          href={"/"}
        >
          <svg width="0" height="0">
            {/* Định nghĩa gradient cho icon */}
            <defs>
              <linearGradient
                id="iconGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#63eaff" />
                <stop offset="100%" stopColor="#ff88e1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="group inline-flex  items-center overflow-hidden rounded-full border border-[#63eaff] transition-all duration-100 w-12 h-12 hover:w-30 px-4 py-3 cursor-pointer hover:shadow-[0_0_20px_#ffafeb7f]">
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content
            scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
