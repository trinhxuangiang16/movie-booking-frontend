"use client";

import { Button } from "@/components/ui/button";
import { useMovieDetail, useBanner } from "@/features/movie";
import MovieContent from "@/features/movie/components/movieDetail/MovieContent";
import ScheduleByFilm from "@/features/movie/components/movieDetail/ScheduleByFilm";
import TopContent from "@/features/movie/components/movieDetail/TopContent";
import { useParams } from "next/navigation";

export default function MovieDetail() {
  const param = useParams();
  const id = Number(param?.id);

  const { data: movie, isLoading, isFetching } = useMovieDetail(id);
  const { data: banner } = useBanner(id);

  return (
    <div className="relative bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')] h-[4000px] w-full">
      <TopContent movie={movie} banner={banner} />
      <div className="w-full">
        <MovieContent movie={movie} />
        <ScheduleByFilm />
      </div>
    </div>
  );
}
