"use client";
import "./TitleSection.css";
import { oswald } from "@/lib";
import CircleRadiusBtn from "@/components/ui/CircleRadiusBtn";
import { IMovieListProps } from "@/features/movie/index";
import { useMemo } from "react";

export default function TitleSection({
  status,
}: {
  status: IMovieListProps["mode"];
}) {
  const titleList = useMemo(() => {
    if (status === "hot") return "TOP PHIM HOT TRONG THÁNG";
    if (status === "upcoming") return "DANH SÁCH PHIM SẮP CHIẾU";
    if (status === "showing") return "DANH SÁCH PHIM ĐANG CHIẾU";
    if (status === "select") return "CHỌN RẠP - CHỌN PHIM - CHỌN SUẤT CHIẾU";
    if (status === "promotion") return "ƯU ĐÃI DÀNH CHO BẠN";
    if (status === "cinema") return "HỆ THỐNG RẠP CHIẾU";
    if (status === "news") return "TIN TỨC ĐIỆN ẢNH";
    return "";
  }, [status]);

  return (
    <div className={`absolute phim-hot title-bg-general h-[85px] z-30 w-full`}>
      <div className="phim-hot-wrap flex">
        <h1 className={`${oswald.className} phim-hot-title`}>{titleList}</h1>
        {status != "select" && <CircleRadiusBtn />}
      </div>
    </div>
  );
}
