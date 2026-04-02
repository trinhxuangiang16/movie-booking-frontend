"use client";
import { useMovies } from "../hooks/useMovies";

export default function MovieList() {
  const { data: movies = [] as any[], isLoading } = useMovies();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Danh Sách Phim</h1>
      {movies?.map((movie: any) => (
        <div key={movie.ma_phim}>
          <h2>{movie.ten_phim}</h2>
          <img src={movie.hinh_anh} alt={movie.ten_phim} width={200} />
        </div>
      ))}
    </div>
  );
}
