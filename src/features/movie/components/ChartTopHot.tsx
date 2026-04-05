"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { TMovie } from "../types/typeMovie";
import { use, useEffect, useState } from "react";
import { ChartData } from "recharts/types/state/chartDataSlice";

export const description = "BXH Phim Hot Nhất Tháng";

const chartConfig = {
  Diem: {
    label: "Diem",
    color: "linear-gradient(90deg, #ffccf2, #97dde8)",
  },
} satisfies ChartConfig;

export function ChartTopHot({
  activeMovie,
  movies,
}: {
  movies: TMovie[];
  activeMovie: TMovie | null;
}) {
  const [currentMovie, setCurrentMovie] = useState<TMovie | null>(activeMovie);
  const [chartData, setChartData] = useState<
    Array<{ hang: number; phim: string; diem: number }>
  >([]);
  const [indexOfCurrentMovie, setIndexOfCurrentMovie] = useState(0);

  useEffect(() => {
    if (activeMovie) {
      const data = [...movies]
        .sort((a, b) => (b.danh_gia ?? 0) - (a.danh_gia ?? 0))
        .map((movie, index) => ({
          hang: index + 1,
          phim: movie.ten_phim,
          diem: movie.danh_gia ?? 0,
        }));
      setChartData(data);
    }
  }, [activeMovie, movies]);

  useEffect(() => {
    if (activeMovie) {
      const index = chartData.findIndex(
        (item) => item.phim === currentMovie?.ten_phim,
      );
      setIndexOfCurrentMovie(index);
    }
  }, [chartData]);

  return (
    <Card className="xep-hang bg-white/15 backdrop-blur-md w-1/2 text-white">
      <CardHeader>
        <CardTitle>
          Phim {currentMovie?.ten_phim} đạt {currentMovie?.danh_gia} điểm đánh
          giá - Xếp hạng {indexOfCurrentMovie + 1}
        </CardTitle>
        <CardDescription className="text-sm italic"></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            {/* Định nghĩa gradient màu */}
            <defs>
              <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d94b4beb" />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.4)"
              strokeDasharray="4 4"
            />
            <YAxis
              tickCount={6}
              tick={{
                fill: "#ffffffde",
                fontSize: 12,
                fontWeight: 400,
              }}
            />
            <XAxis
              dataKey="phim"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              tick={{
                fill: "#ffffff",
                fontSize: 12,
                fontWeight: 400,
              }}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;

                const data = payload[0].payload;
                const index = payload[0].payload.hang;
                return (
                  <div className="bg-black text-white p-2 rounded">
                    {data.phim} đạt {data.diem} điểm - hạng {index}
                  </div>
                );
              }}
            />
            <Bar dataKey="diem" fill="url(#gradientColor)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-[#d94b4beb] font-bold text-sm"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground text-white italic">
          Điểm đánh giá dựa vào người dùng trong tháng.
        </div>
      </CardFooter>
    </Card>
  );
}
