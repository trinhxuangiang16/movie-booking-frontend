type SeatProps = {
  ten_ghe: string;
  type: "normal" | "vip" | "couple";
  status: "available" | "booked";
};

export function Seat({ ten_ghe, type, status }: SeatProps) {
  const colorByType = {
    normal: "bg-gray-300",
    vip: "bg-yellow-400",
    couple: "bg-pink-400",
  };

  return (
    <div
      className={`
        w-8 h-8 flex items-center justify-center text-xs rounded
        ${status === "booked" ? "bg-red-500 opacity-50 cursor-not-allowed" : colorByType[type]}
      `}
    >
      {ten_ghe}
    </div>
  );
}
