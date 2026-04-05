"use client";
import Banner from "@/components/layout.tsx/Banner";
import { TMovie, useHotMovies } from "@/features/movie";
import ListPhimTopic from "@/features/movie/components/ListPhimTopic";
import { useShowingMovies } from "@/features/movie/hooks/useShowingMovies";
import { useUpComingMovies } from "@/features/movie/hooks/useUpComingMovies";

export default function HomePage() {
  const { data: hotMovies = [] as TMovie[] } = useHotMovies();

  const { data: upcomingMovies = [] as TMovie[] } = useUpComingMovies();

  const { data: showingMovies = [] as TMovie[] } = useShowingMovies();
  return (
    <div className="bg-[#0c1137] h-[4000px] bg-[url('http://www.transparenttextures.com/patterns/black-linen.png')]">
      <Banner />
      <ListPhimTopic status="hot" movies={hotMovies} />
      <ListPhimTopic status="upcoming" movies={upcomingMovies} />
      <ListPhimTopic status="showing" movies={showingMovies} />
    </div>
  );
}
