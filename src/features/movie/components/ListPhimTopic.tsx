import React from "react";
import TitleList from "./loaiDanhSach/TitleList";
import MovieCardList from "./loaiDanhSach/MovieCardList";
import { TMovie } from "../types/typeMovie";
import { IMovieListProps } from "../types/typeCommon";

export default function ListPhimTopic({
  status,
  movies,
}: {
  status: IMovieListProps["mode"];
  movies: TMovie[];
}) {
  return (
    <div className="relative">
      <TitleList status={status} />
      <MovieCardList status={status} movies={movies} />
    </div>
  );
}
