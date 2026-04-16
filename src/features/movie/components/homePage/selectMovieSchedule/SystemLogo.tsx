"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheaterSystem } from "../../../hooks/useGetTheaterSystem";
import {
  ISchedule,
  ITheater,
  ITheaterGroup,
  ITheaterSystem,
} from "@/features/movie/index";
import { oswald } from "@/lib";
import { useEffect, useState } from "react";
import { useGetSchedule } from "../../../hooks/useGetSchedule";

export function SystemLogo() {
  const { data: systemTheaters, isLoading: isLoadingSystemTheaters } =
    useTheaterSystem();
  const [selectedTheater, setSelectedTheater] = useState<number | undefined>(0);

  const { data: findTheaterToSchedule, isLoading: isLoadingSchedule } =
    useGetSchedule(selectedTheater);

  const [isActiveCumRap, setIsActiveCumRap] = useState<number | undefined>(
    undefined,
  );
  const [cumRap, setCumRap] = useState<ITheaterGroup[]>([]);

  const [isActiveRapPhim, setIsActiveRapPhim] = useState<number | undefined>(
    undefined,
  );

  const [lichChieu, setLichChieu] = useState<ISchedule[]>([]);
  const [isActiveLichChieu, setIsActiveLichChieu] = useState<
    number | undefined
  >(undefined);

  const [selectedMovie, setSelectedMovie] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  useEffect(() => {
    if (systemTheaters?.length > 0) {
      setSelectedTheater(systemTheaters[0].ma_he_thong_rap);
    }
  }, [systemTheaters]);

  useEffect(() => {
    if (findTheaterToSchedule?.length > 0) {
      setIsActiveCumRap(findTheaterToSchedule[0].ma_cum_rap);
      setCumRap(findTheaterToSchedule);
    }
  }, [findTheaterToSchedule]);

  useEffect(() => {
    const rap = cumRap?.[0]?.RapPhim?.[0];

    if (rap) {
      setIsActiveRapPhim(rap.ma_rap);
      setLichChieu(rap.LichChieu);
    }
  }, [cumRap]);
  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[0].ma_phim);
    }
  }, [lichChieu]);

  useEffect(() => {
    if (uniqueDates.length > 0) {
      setSelectedDate(uniqueDates[0]);
    }
  }, [selectedMovie]);

  //Xử lý phim chiếu
  const movies = [
    ...new Map(
      lichChieu.map((item) => [item.Phim?.ma_phim, item.Phim]),
    ).values(),
  ];

  //filter lịch theo phim
  const movieSchedules = lichChieu.filter(
    (item) => item.Phim.ma_phim === selectedMovie,
  );

  //Xử lý ngày giờ chiếu

  const formatDate = (date: string) => {
    const d = new Date(date);
    const weekday = d.toLocaleDateString("vi-VN", { weekday: "short" });
    const day = d.toLocaleDateString("vi-VN");

    return `${weekday}${"   "}${day}`;
  };

  const uniqueDates = [
    ...new Set(movieSchedules.map((item) => item.ngay_gio_chieu.split("T")[0])),
  ];

  const showTimes = movieSchedules.filter(
    (item) => item.ngay_gio_chieu.split("T")[0] === selectedDate,
  );

  return (
    <div className="relative py-20">
      <Tabs
        defaultValue="overview"
        className={`w-8/9 mx-auto  ${oswald.className}`}
        value={selectedTheater ? String(selectedTheater) : ""}
        onValueChange={(val) => {
          setSelectedTheater(Number(val));
          setCumRap([]);
          setIsActiveCumRap(undefined);
          setIsActiveRapPhim(undefined);
          setLichChieu([]);
        }}
      >
        <TabsList className="flex flex-col w-[130px] bg-transparent border-r border-white/20 rounded-none items-start gap-2">
          {systemTheaters?.map((theater: ITheaterSystem) => {
            return (
              <TabsTrigger
                value={String(theater.ma_he_thong_rap)}
                key={theater.ma_he_thong_rap}
                className="flex flex-col items-center gap-2 w-full text-white bg-transparent shadow-none rounded-none px-0 pb-3 border-0 border-b-2 border-transparent  data-[state=active]:filter data-[state=active]:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] data-[state=active]:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] data-[state=active]:text-[#ff6e6e]"
              >
                <div className="w-[70px] h-[70px]">
                  <img
                    src={theater.logo}
                    alt={theater.ten_he_thong_rap}
                    className="object-cover bg-white rounded-full w-full h-full"
                  />
                </div>

                <p className="font-bold">{theater.ten_he_thong_rap}</p>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value={selectedTheater?.toString() ?? ""}
          className="flex w-full"
        >
          {isLoadingSchedule && <p>Loading schedule...</p>}

          <div className="cum-rap w-1/5 bg-transparent flex flex-col gap-10 px-4 py-6 border-r border-white/20 pr-6">
            {Array.isArray(findTheaterToSchedule) &&
              findTheaterToSchedule.map((item: any) => (
                <Card
                  key={item.ma_cum_rap}
                  className={`cursor-pointer bg-black/30 border-none hover:bg-white/10 transition-300 border-none shadow-none ring-0 outline-none text-white ${
                    isActiveCumRap === item.ma_cum_rap &&
                    `drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] text-[#ff6e6e]`
                  }`}
                  onClick={() => {
                    setIsActiveCumRap(item.ma_cum_rap);
                    setIsActiveLichChieu(undefined);
                    setIsActiveRapPhim(item.RapPhim?.[0]?.ma_rap);
                    setSelectedDate(undefined);
                    setSelectedMovie(undefined);
                    setLichChieu(item.RapPhim?.[0]?.LichChieu || []);
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-[16px] font-bold">
                      {item.ten_cum_rap}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
          </div>

          <div className="rap-phim w-1/5 bg-transparent flex flex-col gap-10 px-6 py-6 border-r border-white/20 pr-6">
            {cumRap
              .find((c) => c.ma_cum_rap === isActiveCumRap)
              ?.RapPhim.map((item: any) => {
                return (
                  <Card
                    key={item.ma_rap}
                    className={`cursor-pointer bg-black/30 border-none text-white hover:bg-white/10 transition-300 border-none shadow-none ring-0 outline-none ${
                      isActiveRapPhim === item.ma_rap &&
                      `drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] text-[#ff6e6e]`
                    }`}
                    onClick={() => {
                      setIsActiveRapPhim(item.ma_rap);
                      setLichChieu(item.LichChieu);
                      setSelectedDate(undefined);
                      setSelectedMovie(undefined);
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-[16px] font-bold">
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

          <div className="movies w-2/9 bg-transparent px-6 py-6 border-r border-white/20 pr-6 h-[600px] overflow-y-auto srollbar-custom">
            {movies.map((movie) => (
              <Card
                key={movie.ma_phim}
                className={`h-fit cursor-pointer bg-black/30 text-white hover:bg-white/10 shadow-none ring-0 outline-none mb-3  ${
                  selectedMovie === movie.ma_phim &&
                  "text-[#ff6e6e] drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                }`}
                onClick={() => {
                  setSelectedMovie(movie.ma_phim);
                  setSelectedDate(undefined);
                }}
              >
                <CardHeader className="p-0 h-full flex items-center px-4">
                  <CardTitle className="text-[16px] font-bold">
                    {movie.ten_phim}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="dates w-1/5 bg-transparent px-6 py-6 border-r border-white/20 pr-6 h-[600px] overflow-y-auto srollbar-custom">
            {uniqueDates.map((date) => (
              <Card
                key={date}
                className={`
                   cursor-pointer bg-black/30 border-none text-white hover:bg-white/10 transition-300 border-none shadow-none ring-0 outline-none h-fit mb-3 ${
                     selectedDate === date &&
                     "text-[#ff6e6e] drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                   }`}
                onClick={() => setSelectedDate(date)}
              >
                <CardHeader>
                  <CardTitle className="text-[16px] font-bold">
                    {formatDate(date)}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="times w-1/5 bg-transparent px-6 py-6 border-r border-white/20 pr-6 h-[600px] overflow-y-auto">
            {showTimes.map((item) => (
              <Card
                key={item.ma_lich_chieu}
                className="cursor-pointer bg-black/30 border-none text-white hover:bg-white/10 transition-300 border-none shadow-none ring-0 outline-none h-fit mb-3"
                onClick={() => {
                  console.log(item);
                }}
              >
                <CardContent className="text-[16px] font-bold">
                  {new Date(item.ngay_gio_chieu).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
