"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheaterSystem } from "../../../hooks/useGetTheaterSystem";
import {
  ISchedule,
  ITheater,
  ITheaterGroup,
  ITheaterSystem,
} from "@/features/movie/index";
import { oswald } from "@/lib";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetSchedule } from "../../../hooks/useGetSchedule";

export function SystemLogo() {
  const router = useRouter();
  const [selectedTheater, setSelectedTheater] = useState<number | undefined>();
  const [selectedCumRap, setSelectedCumRap] = useState<number | undefined>();
  const [selectedRap, setSelectedRap] = useState<number | undefined>();
  const [selectedMovie, setSelectedMovie] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedLichChieu, setSelectedLichChieu] = useState<
    number | undefined
  >();

  const { data: systemTheaters } = useTheaterSystem();

  const activeTheater = selectedTheater ?? systemTheaters?.[0]?.ma_he_thong_rap;

  const { data: findTheaterToSchedule, isLoading: isLoadingSchedule } =
    useGetSchedule(activeTheater);

  const cumRapList: ITheaterGroup[] = Array.isArray(findTheaterToSchedule)
    ? findTheaterToSchedule
    : [];

  const activeCumRap =
    cumRapList.find((c) => c.ma_cum_rap === selectedCumRap) ?? cumRapList[0];

  const activeRap =
    activeCumRap?.RapPhim.find((r) => r.ma_rap === selectedRap) ??
    activeCumRap?.RapPhim[0];

  const lichChieu: ISchedule[] = activeRap?.LichChieu ?? [];

  const movies = [
    ...new Map(
      lichChieu.map((item) => [item.Phim?.ma_phim, item.Phim]),
    ).values(),
  ];

  const activeMovie =
    movies.find((m) => m?.ma_phim === selectedMovie)?.ma_phim ??
    movies[0]?.ma_phim;

  const movieSchedules = lichChieu.filter(
    (item) => item.Phim?.ma_phim === activeMovie,
  );

  const uniqueDates = [
    ...new Set(movieSchedules.map((item) => item.ngay_gio_chieu.split("T")[0])),
  ];

  const activeDate = selectedDate ?? uniqueDates[0];

  const showTimes = movieSchedules.filter(
    (item) => item.ngay_gio_chieu.split("T")[0] === activeDate,
  );

  const formatDate = (date: string) => {
    const d = new Date(date);
    const weekday = d.toLocaleDateString("vi-VN", { weekday: "short" });
    const day = d.toLocaleDateString("vi-VN");

    return `${weekday}${"   "}${day}`;
  };

  const cardBase =
    "h-[64px] shrink-0 cursor-pointer rounded-none border-none bg-gradient-to-b from-[#0d1230] to-[#0a0e24] text-white/80 shadow-none ring-1 ring-inset ring-white/10 outline-none transition-all duration-300 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] hover:text-white hover:ring-white/30 hover:shadow-[inset_0_0_18px_-8px_rgba(99,234,255,.35)]";
  const cardActive =
    "bg-[linear-gradient(90deg,rgba(99,234,255,.16),rgba(99,234,255,.04)_55%,rgba(255,136,225,.07))] text-[#7fefff] ring-[#63eaff]/60 shadow-[inset_3px_0_0_0_#63eaff,inset_0_0_24px_-8px_rgba(99,234,255,.45)] hover:text-[#7fefff] hover:ring-[#63eaff]/60 hover:shadow-[inset_3px_0_0_0_#63eaff,inset_0_0_24px_-8px_rgba(99,234,255,.45)]";

  const columnClass =
    "bg-transparent flex flex-col gap-10 px-6 py-6 border-r border-white/20 pr-6 h-[632px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full";

  return (
    <div className="relative py-20">
      <Tabs
        className={`w-8/9 mx-auto  ${oswald.className}`}
        value={activeTheater ? String(activeTheater) : ""}
        onValueChange={(val) => {
          setSelectedTheater(Number(val));
          setSelectedCumRap(undefined);
          setSelectedRap(undefined);
          setSelectedMovie(undefined);
          setSelectedDate(undefined);
        }}
      >
        <TabsList className="flex flex-col w-[130px] bg-transparent border-r border-white/20 rounded-none items-start gap-2">
          {systemTheaters?.map((theater: ITheaterSystem) => {
            return (
              <TabsTrigger
                value={String(theater.ma_he_thong_rap)}
                key={theater.ma_he_thong_rap}
                className="flex flex-col items-center gap-2 w-full text-white/55 bg-transparent shadow-none rounded-none px-0 pb-3 border-0 border-b-2 border-transparent transition-all duration-300 hover:text-white [&_img]:transition-all [&_img]:duration-300 data-[state=active]:text-[#7fefff] data-[state=active]:drop-shadow-[0_0_14px_rgba(99,234,255,.5)] data-[state=active]:[&_img]:ring-[3px] data-[state=active]:[&_img]:ring-[#63eaff]/60 data-[state=active]:[&_img]:ring-offset-2 data-[state=active]:[&_img]:ring-offset-[#070a1c]"
              >
                <div className="w-[70px] h-[70px]">
                  {theater.logo && (
                    <img
                      src={theater.logo}
                      alt={theater.ten_he_thong_rap}
                      className="object-cover bg-white rounded-full w-full h-full"
                    />
                  )}
                </div>

                <p className="font-bold">{theater.ten_he_thong_rap}</p>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value={activeTheater?.toString() ?? ""}
          className="flex w-full"
        >
          {isLoadingSchedule && <p>Loading schedule...</p>}

          <div className={`cum-rap w-1/5 ${columnClass}`}>
            {cumRapList.map((item) => (
              <Card
                key={item.ma_cum_rap}
                className={`${cardBase} ${activeCumRap?.ma_cum_rap === item.ma_cum_rap && cardActive
                  }`}
                onClick={() => {
                  setSelectedCumRap(item.ma_cum_rap);
                  setSelectedRap(undefined);
                  setSelectedMovie(undefined);
                  setSelectedDate(undefined);
                }}
              >
                <CardHeader className="h-full flex items-center">
                  <CardTitle className="text-[16px] font-bold line-clamp-1">
                    {item.ten_cum_rap}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className={`rap-phim w-1/5 ${columnClass}`}>
            {activeCumRap?.RapPhim.map((item: ITheater) => {
              return (
                <Card
                  key={item.ma_rap}
                  className={`${cardBase} ${activeRap?.ma_rap === item.ma_rap && cardActive
                    }`}
                  onClick={() => {
                    setSelectedRap(item.ma_rap);
                    setSelectedMovie(undefined);
                    setSelectedDate(undefined);
                  }}
                >
                  <CardHeader className="h-full flex items-center">
                    <CardTitle className="text-[16px] font-bold line-clamp-1">
                      {item.ten_rap == "Rạp 1"
                        ? "Rạp T01 - Trệt"
                        : item.ten_rap == "Rạp 2"
                          ? "Rạp L01 - Lầu 1"
                          : "Rạp L02 - Lầu 2"}
                    </CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className={`movies w-2/9 ${columnClass}`}>
            {movies.map(
              (movie) =>
                movie && (
                  <Card
                    key={movie.ma_phim}
                    className={`${cardBase} ${activeMovie === movie.ma_phim && cardActive
                      }`}
                    onClick={() => {
                      setSelectedMovie(movie.ma_phim);
                      setSelectedDate(undefined);
                    }}
                  >
                    <CardHeader className="h-full flex items-center">
                      <CardTitle className="text-[16px] font-bold line-clamp-1">
                        {movie.ten_phim}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ),
            )}
          </div>

          <div className={`dates w-1/5 ${columnClass}`}>
            {uniqueDates.map((date) => (
              <Card
                key={date}
                className={`${cardBase} ${activeDate === date && cardActive}`}
                onClick={() => setSelectedDate(date)}
              >
                <CardHeader className="h-full flex items-center">
                  <CardTitle className="text-[16px] font-bold line-clamp-1">
                    {formatDate(date)}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className={`times w-1/5 ${columnClass}`}>
            {showTimes.map((item) => (
              <Card
                key={item.ma_lich_chieu}
                className={`${cardBase} text-white/90 ring-[#ff88e1]/25 hover:bg-[linear-gradient(90deg,#63eaff,#ff88e1)] hover:text-[#06101c] hover:ring-transparent hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)] ${selectedLichChieu === item.ma_lich_chieu && cardActive
                  }`}
                onClick={() => {
                  setSelectedLichChieu(item.ma_lich_chieu);
                  router.push(
                    `/booking?ma_lich_chieu=${item.ma_lich_chieu}`,
                  );
                }}
              >
                <CardHeader className="h-full flex items-center">
                  <CardTitle className="text-[16px] font-bold line-clamp-1">
                    {new Date(item.ngay_gio_chieu).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
