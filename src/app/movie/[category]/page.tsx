import React from "react";

export default function page() {
  return (
    <div className="h-[600px] bg-blue-200 items-center justify-center flex">
      <h1 className="text-4xl font-bold">Movie Category Page</h1>
      <p>
        Các loại danh sách phim sẽ hiển thị tại đây. Thay vì làm sidebar thì làm
        các tab nằm ngang hiển thị các card phim. Sẽ ko có click vào để xem
        trailer trực tiếp mà sẽ navigate tới MovieDetail
      </p>
    </div>
  );
}
