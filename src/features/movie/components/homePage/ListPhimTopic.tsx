"use client";

import MovieCardList from "./cateroryCardList/MovieCardList";
import { TMovie } from "../../types/typeMovie";
import { IMovieListProps } from "../../types/typeCommon";
import TitleSection from "./cateroryCardList/TitleSection";

const SECTION_ID: Partial<Record<IMovieListProps["mode"], string>> = {
  hot: "phim-hot",
  showing: "phim-dang-chieu",
  upcoming: "phim-sap-chieu",
};

export default function ListPhimTopic({
  status,
  movies,
}: {
  status: IMovieListProps["mode"];
  movies: TMovie[];
}) {
  return (
    <div id={SECTION_ID[status]} className="relative scroll-mt-24">
      <TitleSection status={status} movies={movies} />
      <MovieCardList status={status} movies={movies} />
    </div>
  );
}
