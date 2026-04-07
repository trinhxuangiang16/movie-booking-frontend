import React from "react";
import MovieCardList from "./cateroryCardList/MovieCardList";
import { TMovie } from "../types/typeMovie";
import { IMovieListProps } from "../types/typeCommon";
import TitleSection from "./cateroryCardList/TitleSection";

export default function ListPhimTopic({
  status,
  movies,
}: {
  status: IMovieListProps["mode"];
  movies: TMovie[];
}) {
  return (
    <div className="relative">
      <TitleSection status={status} />
      <MovieCardList status={status} movies={movies} />
    </div>
  );
}
