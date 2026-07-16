export type SeatStatus = "available" | "booked" | "selected";

export type SeatType = "normal" | "vip" | "couple";

export type Seat = {
  ma_ghe: number;
  ten_ghe: string;
  row: string;
  col: number;
  type: SeatType;
  status: SeatStatus;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
