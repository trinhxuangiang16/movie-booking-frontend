"use client";

import { Button } from "@/components/ui/button";
import { useMovieDetail, useBanner } from "@/features/movie";
import TopContent from "@/features/movie/components/movieDetail/TopContent";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function MovieDetail() {
  const param = useParams();
  const id = Number(param?.id);

  const { data: movie, isLoading, isFetching } = useMovieDetail(id);
  const { data: banner } = useBanner(id);

  useEffect(() => {
    console.log(`📍 ID thay đổi: ${id}`);
  }, [id]);

  useEffect(() => {
    console.log(`🎬 Movie data: ${movie?.ten_phim}, isFetching: ${isFetching}`);
  }, [movie, isFetching]);

  return (
    <div className="relative bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')] h-[4000px]">
      <TopContent movie={movie} banner={banner} />
    </div>
  );
}
