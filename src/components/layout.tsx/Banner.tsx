"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { useHotMovies } from "@/features/movie/hooks/useHotMovies";
import { useEffect, useState } from "react";
import { TMovie } from "@/features/movie/types/typeMovie";
import { FaPlay, FaStar } from "react-icons/fa";
import { ChartTopHot } from "@/features/movie/components/homePage/ChartTopHot";
import { oswald } from "@/lib";
import "./layout.css";
import TrailerPlayer from "@/features/movie/components/homePage/TrailerPlayer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  const indexOfCurrentMovie = movies.findIndex(
    (m: TMovie) => m.ma_phim === activeMovie?.ma_phim,
  );
  return (
    <section
      className={`relative min-h-[92vh] w-full overflow-hidden bg-[#070a1c] ${oswald.className}`}
    >
      {/* ── NỀN: ảnh banner khớp phim active ── */}
      <div
        key={activeMovie?.ma_phim}
        className="absolute inset-0 animate-[heroIn_1.1s_cubic-bezier(.2,.7,.2,1)] bg-cover bg-center"
        style={
          activeMovie?.banner_url
            ? { backgroundImage: `url(${activeMovie.banner_url})` }
            : undefined
        }
      />
      {/* phủ màu ink thay vì đen thuần — ăn theme các section dưới */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070a1c_0%,rgba(7,10,28,.96)_20%,rgba(7,10,28,.72)_42%,rgba(7,10,28,.28)_68%,rgba(7,10,28,.8)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#070a1c] via-[#070a1c]/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070a1c]/90 to-transparent" />

      {/* đèn quét sân khấu — chất điện ảnh, nối mạch với section spotlight */}
      <div className="pointer-events-none absolute -inset-[40%] animate-[heroBeam_8s_ease-in-out_infinite] bg-[linear-gradient(105deg,transparent_44%,rgba(255,255,255,.06)_50%,transparent_56%)] mix-blend-screen" />

      {/* lỗ răng phim dọc mép trái — chữ ký của trang */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-8 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.5)_0_10px,transparent_10px_26px)] opacity-[.08] lg:block" />

      <div className="relative z-10 mx-auto grid min-h-[92vh] w-full max-w-[1800px] grid-cols-1 items-center gap-10 px-8 lg:grid-cols-[minmax(400px,34%)_minmax(0,1fr)] lg:pl-20 lg:pr-10">
        {/* ================= TRÁI ================= */}
        <div className="relative">
          {/* thanh dọc gradient pink→cyan — đồng bộ heading các section dưới */}
          <div className="absolute -left-7 top-1 hidden h-[calc(100%-8px)] w-[3px] rounded-full bg-gradient-to-b from-[#ff88e1] via-[#c0a4ff] to-[#63eaff] lg:block" />

          <div className="mb-5 flex items-center gap-3">
            <span className="bg-gradient-to-r from-[#63eaff] to-[#ff88e1] bg-clip-text text-[10px] font-bold uppercase tracking-[0.35em] text-transparent">
              Đang chiếu
            </span>
            <span className="text-white/30 -mt-[3px]">-</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
              Top {indexOfCurrentMovie + 1} tháng này
            </span>
          </div>

          {/* tên phim */}
          <h1
            key={`title-${activeMovie?.ma_phim}`}
            className="animate-[heroTitle_.7s_cubic-bezier(.2,.7,.2,1)_both] whitespace-nowrap text-[clamp(2rem,2.8vw,4.25rem)] font-bold uppercase leading-[1.06] tracking-tight text-white drop-shadow-[0_6px_34px_rgba(0,0,0,.9)]"
          >
            {activeMovie?.ten_phim}
          </h1>
          <p
            key={`desc-${activeMovie?.ma_phim}`}
            className="mt-5 max-w-md animate-[heroTitle_.7s_.08s_cubic-bezier(.2,.7,.2,1)_both] text-sm font-light leading-relaxed tracking-wide text-white/60"
          >
            {activeMovie?.mo_ta}
          </p>

          <div className="mt-9 flex items-center gap-3">
            <Button asChild variant="bannerCta">
              <Link href="">
                <span className="relative z-10 transition-colors group-hover:text-white">
                  Lịch chiếu
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#63eaff] to-[#ff88e1] transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
            </Button>

            <Button
              onClick={() =>
                setMode((p) => (p === "chart" ? "slide" : "chart"))
              }
              variant={mode === "chart" ? "bannerRatingActive" : "bannerRating"}
            >
              <FaStar
                className={mode === "chart" ? "text-black" : "text-[#ffcf4d]"}
              />
              {activeMovie?.danh_gia}
              <span
                className={mode === "chart" ? "text-black/50" : "text-white/40"}
              >
                /10
              </span>
            </Button>

            <Button
              onClick={() =>
                setMode((p) => (p === "trailer" ? "slide" : "trailer"))
              }
              variant={
                mode === "trailer" ? "bannerTrailerActive" : "bannerTrailer"
              }
            >
              <FaPlay className="ml-0.5 text-[10px] transition-transform group-hover:scale-125" />
            </Button>
          </div>
        </div>

        {/* ================= PHẢI ================= */}
        <div className="relative flex h-[520px] items-center justify-center">
          {/* vũng tối cục bộ giữ poster nổi trên ảnh nền */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(7,10,28,.8),transparent_75%)]" />

          <div
            className={`relative w-full max-w-[1000px] ${
              mode === "slide"
                ? "[mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
                : ""
            }`}
          >
            {mode === "slide" && (
              <Swiper
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                centeredSlides
                slidesPerView="auto"
                spaceBetween={40}
                loop={movies.length >= 6}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 300,
                  modifier: 1.1,
                  slideShadows: false,
                }}
                onSlideChange={(s) =>
                  setActiveMovie(movies[s.realIndex] || null)
                }
                className="w-full !py-12"
              >
                {movies.map((item: TMovie) => (
                  <SwiperSlide key={item.ma_phim} className="!w-[230px]">
                    <div className="group/card relative aspect-[2/3] overflow-hidden opacity-60 brightness-[.3] saturate-50 ring-1 ring-white/10 transition-all duration-500 [.swiper-slide-active_&]:scale-[1.18] [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:brightness-100 [.swiper-slide-active_&]:saturate-100 [.swiper-slide-active_&]:ring-0">
                      <img
                        src={item.hinh_anh}
                        alt={item.ten_phim}
                        className="h-full w-full object-cover"
                      />
                      {/* viền gradient chỉ hiện ở card active */}
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [.swiper-slide-active_&]:opacity-100 [background:linear-gradient(135deg,#63eaff,transparent_30%,transparent_70%,#ff88e1)_border-box] [border:1.5px_solid_transparent] [mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />
                      {/* ánh sáng lướt qua card active */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,.25)_50%,transparent_60%)] transition-transform duration-1000 [.swiper-slide-active_&]:translate-x-full" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {mode === "chart" && (
              <div className="mx-auto w-full max-w-3xl">
                <ChartTopHot activeMovie={activeMovie} movies={movies} />
              </div>
            )}

            {mode === "trailer" && (
              <div className="mx-auto aspect-video w-full max-w-[900px] overflow-hidden ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,1)]">
                <TrailerPlayer
                  videoId={activeMovie?.trailer || ""}
                  title="trailer-banner"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
