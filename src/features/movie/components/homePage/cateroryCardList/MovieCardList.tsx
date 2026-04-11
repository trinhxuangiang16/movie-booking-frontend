"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { oswald } from "@/lib";
import { IMovieListProps, TMovie } from "@/features/movie/index";
import "./MovieCardList.css";
import Link from "next/link";

export default function MovieCardList({
  status,
  movies,
}: {
  status: IMovieListProps["mode"];
  movies: TMovie[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-10 pb-4 overflow-visible"
    >
      <CarouselContent className="overflow-visible pt-4 pb-4 h-[450px]">
        {movies.map((movie: TMovie) => (
          <CarouselItem
            key={movie.ma_phim}
            className="basis-1/6 overflow-visible"
          >
            <div
              className={`movie-card-wrap ${oswald.className}`}
              key={movie.ma_phim}
            >
              <img
                src={movie.banner_url}
                alt="Banner"
                className="movie-card-bg"
              />
              <div className="movie-card-overlay">
                <div className="movie-card-poster">
                  <img
                    src={movie.hinh_anh}
                    alt="poster"
                    className="aspect-2/3 brightness-110 contrast-90 saturate-85 hue-rotate-[10deg]"
                  />
                </div>
                <div className="movie-card-info">
                  <div className="movie-card-info-content">
                    <h2>
                      {movie.ten_phim
                        ? movie.ten_phim.length > 20
                          ? movie.ten_phim.substring(0, 20) + "..."
                          : movie.ten_phim
                        : ""}
                    </h2>
                    <p>
                      {movie.mo_ta
                        ? movie.mo_ta.length > 100
                          ? movie.mo_ta.substring(0, 100) + "..."
                          : movie.mo_ta
                        : ""}
                    </p>
                    <div className="movie-card-tags">
                      <span>{status}</span>
                      <span>{movie.danh_gia}</span>
                    </div>
                  </div>
                  <div className="movie-card-actions">
                    <Link href={`/movie/movie-detail/${movie.ma_phim}`}>
                      <Button> CHI TIẾT PHIM </Button>
                    </Link>
                    <Heart className="text-red-500" />
                  </div>
                </div>
              </div>
              <p className="ten-phim text-center text-white mt-2 text-lg">
                {movie.ten_phim}
              </p>
            </div>
          </CarouselItem>
        ))}
        <CarouselItem className="basis-1/13 opacity-0 pointer-events-none" />
      </CarouselContent>

      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
