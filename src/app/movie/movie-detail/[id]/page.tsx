"use client";

import { useMovieDetail, useBanner } from "@/features/movie";
import MovieContent from "@/features/movie/components/movieDetail/MovieContent";
import RelatedMovies from "@/features/movie/components/movieDetail/RelatedMovies";
import ScheduleByFilm from "@/features/movie/components/movieDetail/ScheduleByFilm";
import TopContent from "@/features/movie/components/movieDetail/TopContent";
import { useParams } from "next/navigation";

export default function MovieDetail() {
  const param = useParams();
  const id = Number(param?.id);

  const { data: movie } = useMovieDetail(id);
  const { data: banner } = useBanner(id);

  return (
    <div className="relative min-h-screen w-full bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]">
      <TopContent movie={movie} banner={banner} />
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8">
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)] lg:items-start lg:gap-10 md:mt-12">
          <MovieContent movie={movie} />
          <ScheduleByFilm movie={movie} />
        </div>

        {id ? <RelatedMovies currentId={id} /> : null}
      </div>
    </div>
  );
}
