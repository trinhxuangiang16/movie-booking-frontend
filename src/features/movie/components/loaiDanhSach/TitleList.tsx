import "./TitleList.css";
import { oswald } from "@/lib";
import CircleRadiusBtn from "@/components/ui/CircleRadiusBtn";
import { IMovieListProps } from "@/features/movie/index";
import { useEffect, useState } from "react";

export default function PhimHot({
  status,
}: {
  status: IMovieListProps["mode"];
}) {
  const [titleList, setTitleList] = useState("");

  useEffect(() => {
    if (status === "hot") {
      const title = "TOP PHIM HOT TRONG THÁNG";
      setTitleList(title);
    } else if (status === "upcoming") {
      const title = "DANH SÁCH PHIM SẮP CHIẾU";
      setTitleList(title);
    } else {
      const title = "DANH SÁCH PHIM ĐANG CHIẾU";
      setTitleList(title);
    }
  }, []);

  return (
    <div className="absolute phim-hot title-bg-general h-[85px] z-30">
      <div className="phim-hot-wrap flex">
        <h1 className={`${oswald.className} phim-hot-title`}>{titleList}</h1>
        <CircleRadiusBtn />
      </div>
    </div>
  );
}
