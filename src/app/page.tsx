"use client";
import Banner from "@/components/layout.tsx/Banner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  TMovie,
  useHotMovies,
  PromotionSection,
  NewsSection,
  CinemaSystemSection,
  NewsletterSection,
} from "@/features/movie";
import ListPhimTopic from "@/features/movie/components/homePage/ListPhimTopic";
import SelectMovieSchedule from "@/features/movie/components/homePage/SelectMovieSchedule";
import { useShowingMovies } from "@/features/movie/hooks/useShowingMovies";
import { useUpComingMovies } from "@/features/movie/hooks/useUpComingMovies";
import { SeatMap } from "@/features/booking/index";
import UpcomingSpotlight from "@/features/movie/components/homePage/upcomingFilm/UpcomingSpotlight";

export default function HomePage() {
  const { data: hotMovies = [] as TMovie[] } = useHotMovies();

  const { data: upcomingMovies = [] as TMovie[] } = useUpComingMovies();

  const { data: showingMovies = [] as TMovie[] } = useShowingMovies();
  return (
    <ProtectedRoute>
      <div className="bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/black-linen.png')]">
        <Banner />
        <CinemaSystemSection />
        <UpcomingSpotlight />
        <ListPhimTopic status="hot" movies={hotMovies} />
        <ListPhimTopic status="upcoming" movies={upcomingMovies} />
        <ListPhimTopic status="showing" movies={showingMovies} />
        <PromotionSection />

        <SelectMovieSchedule status="select" />
        <div className="relative overflow-hidden bg-transparent">
          <div className="absolute inset-0 movie-watermark" />
          <div className="relative">
            <NewsSection />
            <NewsletterSection />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
