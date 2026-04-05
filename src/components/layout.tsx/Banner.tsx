"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { useHotMovies } from "@/features/movie/hooks/useHotMovies";
import { useEffect, useState } from "react";
import { TMovie } from "@/features/movie/types/typeMovie";
import { FaPlay, FaStar } from "react-icons/fa";
import { ChartTopHot } from "@/features/movie/components/ChartTopHot";
import { oswald } from "@/lib";
import "./layout.css";
import TrailerPlayer from "@/features/movie/components/TrailerPlayer";
import Link from "next/link";

type TBannerMode = "slide" | "chart" | "trailer";

export default function MovieCarousel() {
  const [activeMovie, setActiveMovie] = useState<TMovie | null>(null);
  const [mode, setMode] = useState<TBannerMode>("slide");

  const { data: movies = [] as TMovie[], isLoading: slideLoading } =
    useHotMovies();

  useEffect(() => {
    if (movies.length > 0) {
      setActiveMovie(movies[0]);
    }
  }, [movies]);

  const loading = (
    <div className="w-full h-screen flex items-center justify-center">
      <span className="text-white-500">Loading...</span>
    </div>
  );

  if (slideLoading) return loading;

  return (
    <div
      className={`banner ${oswald.className}`}
      style={
        {
          "--banner-url": `url(${activeMovie?.banner_url})`,
        } as React.CSSProperties
      }
    >
      <div className="banner-content">
        <h1 className="banner-title">{activeMovie?.ten_phim}</h1>
        <p className="banner-description">{activeMovie?.mo_ta}</p>
        <div className="banner-button">
          <div className="showtimes">
            <Link href="">LỊCH CHIẾU</Link>
          </div>
          <div
            className={`grade-banner ${mode === "chart" ? "active-banner" : ""}`}
            onClick={() =>
              setMode((prev) => (prev === "chart" ? "slide" : "chart"))
            }
          >
            <a href="#bxh">
              <p>{activeMovie?.danh_gia}</p>
              <FaStar className="grade-icon"></FaStar>
            </a>
          </div>
          <div
            className={`play-banner ${mode === "trailer" ? "active-banner" : ""}`}
            onClick={() =>
              setMode((prev) => (prev === "trailer" ? "slide" : "trailer"))
            }
          >
            <a href="#trailer">
              <FaPlay></FaPlay>
            </a>
          </div>
        </div>
      </div>

      {mode === "slide" && (
        <div className="slide-banner">
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2.5,
              slideShadows: false,
            }}
            // onSwiper={(swiper) => {
            //   setActiveMovie(movies[swiper.realIndex] || null);
            // }}
            onSlideChange={(swiper) => {
              const realIndex = swiper.realIndex;
              setActiveMovie(movies[realIndex] || null);
            }}
            className="w-full py-10"
          >
            {movies.map((item: TMovie) => (
              <SwiperSlide key={item.ma_phim}>
                <div className="aspect-[2/3] w-full  rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={item.hinh_anh}
                    className="w-full h-full object-cover"
                    alt={`Movie ${item.ten_phim}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {mode === "chart" && (
        <ChartTopHot activeMovie={activeMovie} movies={movies} />
      )}

      {mode === "trailer" && (
        <div className="w-1/2 h-1/2 xep-hang video-wrapper">
          <TrailerPlayer
            videoId={activeMovie?.trailer || ""}
            title="Trailer phim"
          />
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t via-black/70 from-black to-transparent "></div>
    </div>
  );
}
